import { supabase } from '../../../lib/supabaseClient'
import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

async function uploadImage({ file, bucket }) {
  try {
    // Convert base64 to buffer if the file is base64 encoded
    let fileData;
    let fileName;

    if (typeof file === 'string' && file.includes('base64')) {
      const base64Data = file.split(',')[1];
      fileData = Buffer.from(base64Data, 'base64');
      // Generate a unique filename
      const fileExt = file.split(';')[0].split('/')[1];
      fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    } else if (file instanceof File || file instanceof Blob) {
      fileData = file;
      fileName = file.name;
    } else {
      throw new Error('Invalid file format');
    }

    console.log('Uploading file:', { fileName, fileType: typeof fileData });

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, fileData, {
        upsert: true,
        contentType: file.type || 'image/jpeg'
      });

    if (error) {
      console.error('Supabase storage upload error:', error);
      throw error;
    }

    console.log('File uploaded successfully:', data);

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    console.log('Generated public URL:', urlData);

    return { imageUrl: urlData.publicUrl, error: null };
  } catch (error) {
    console.error('Upload function error:', error);
    return { imageUrl: null, error };
  }
}

export async function POST(req) {
  console.log('Environment check:', {
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  });
  try {
    console.log('Starting report submission...');
    
    const { userId } = getAuth(req);
    console.log('Auth result:', { userId });
    
    if (!userId) {
      console.error('No user ID found in request');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user details from Clerk
    const user = await clerkClient.users.getUser(userId);
    const userEmail = user.emailAddresses[0]?.emailAddress;
    
    if (!userEmail) {
      console.error('No email address found for user');
      return NextResponse.json({ error: 'User email is required' }, { status: 400 });
    }

    console.log('Clerk user details:', { 
      email: userEmail,
      name: user.firstName
    });
    console.log('User authenticated:', userId);

    const {
      category, title, description, priority,
      location, address, files, images
    } = await req.json();

    console.log('Received form data:', {
      category, title, description, priority,
      location, address,
      filesCount: files?.length,
      imagesCount: images?.length
    });

    // First, check if user exists in our database
    console.log('Checking for existing user with clerk_id:', userId);
    let supabaseUserId;
    
    try {
      const { data: users, error: userCheckError } = await supabase
        .from('users')
        .select('id')
        .eq('clerk_id', userId);

      if (userCheckError) {
        console.error('Error checking for existing user:', userCheckError);
        throw userCheckError;
      }

      const existingUser = users && users.length > 0 ? users[0] : null;

      if (!existingUser) {
        console.log('User not found, creating new user in Supabase...');
        const newUserId = uuidv4();
        const { data: newUser, error: userError } = await supabase
          .from('users')
          .insert([{
            id: newUserId,
            clerk_id: userId,
            email: userEmail,
            name: user.firstName || '',
            created_at: new Date().toISOString()
          }])
          .select()
          .single();

        if (userError) {
          console.error('Error creating user:', userError);
          throw new Error(`Failed to create user: ${userError.message}`);
        }
        console.log('New user created successfully:', newUser);
        supabaseUserId = newUserId;
      } else {
        console.log('Existing user found:', existingUser.id);
        supabaseUserId = existingUser.id;
      }
    } catch (error) {
      console.error('User management error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Upload images to Supabase Storage if present
    let uploadedImageUrls = [];
    if (images && images.length > 0) {
      console.log('Preparing to upload images, count:', images.length);
      console.log('Image data sample:', images[0]?.substring(0, 100));

      for (const image of images) {
        try {
          if (!image.startsWith('data:image/')) {
            console.error('Invalid image format, expected base64');
            continue;
          }

          console.log('Uploading image...');
          const { imageUrl, error } = await uploadImage({ 
            file: image, 
            bucket: 'fixtogether'
          });
          
          if (error) {
            console.error('Error uploading image:', error);
            continue;
          }
          
          if (imageUrl) {
            uploadedImageUrls.push(imageUrl);
            console.log('Image uploaded successfully:', imageUrl);
          }
        } catch (uploadError) {
          console.error('Error in image upload:', uploadError);
          // Continue with other images instead of throwing
          continue;
        }
      }
    }

    console.log('Creating issue record with data:', {
      category,
      title,
      description,
      priority,
      hasLocation: !!location,
      hasAddress: !!address,
      filesCount: files?.length,
      imageUrlsCount: uploadedImageUrls.length
    });

    console.log('Creating issue with user_id:', supabaseUserId);
    const { error: issueError, data: issueData } = await supabase
      .from('issues')
      .insert([{
        user_id: supabaseUserId,  // Use the Supabase user ID instead of Clerk ID
        category,
        title,
        description,
        priority,
        latitude: location?.latitude ?? null,
        longitude: location?.longitude ?? null,
        address: address ?? null,
        files: files?.length ? files : null,
        image_urls: uploadedImageUrls.length > 0 ? uploadedImageUrls : null,
        created_at: new Date().toISOString()
      }])
      .select();

    if (issueError) {
      console.error('Error creating issue:', issueError);
      throw new Error(`Failed to create issue: ${issueError.message}`);
    }

    console.log('Issue created successfully:', issueData[0].id);
    return NextResponse.json(issueData[0], { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ 
      error: error.message || 'Internal server error',
      details: error.details || undefined
    }, { status: 500 });
  }
}