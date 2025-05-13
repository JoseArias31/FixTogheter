import { supabase } from '../../../lib/supabaseClient'
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';



export async function POST(req) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const {
    category, title, description, priority,
    location, address, files
  } = await req.json();

  const { error, data } = await supabase
    .from('issues')
    .insert([{
      user_id: userId,
      category,
      title,
      description,
      priority,
      latitude: location?.latitude ?? null,
      longitude: location?.longitude ?? null,
      address: address ?? null,
      files: files?.length ? files : null
    }])
    .select();

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data[0], { status: 201 });
} 