"use client"

import { Heart, Users, Globe, Lightbulb, Award, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About FixTogether</h1>
            <p className="text-xl">
              Empowering communities to identify, fund, and fix local issues together.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600">
              FixTogether is built on a simple but powerful idea: when communities work together, we can solve local problems faster and more effectively than waiting for traditional solutions.
            </p>
          </div>
          
          <div className="prose prose-lg mx-auto text-gray-700">
            <p>
              We believe that every community has the knowledge, skills, and passion needed to address its own challenges. Our platform connects those who identify issues with those who can fund solutions and those who have the skills to implement them.
            </p>
            <p>
              By creating this three-way connection, we're able to bypass bureaucracy and lengthy approval processes, getting straight to what matters: fixing problems and improving communities.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community First</h3>
              <p className="text-gray-600">
                We believe in the power of local knowledge and community-driven solutions. The people who live in a neighborhood know best what needs to be fixed.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
              <p className="text-gray-600">
                By connecting reporters, funders, and fixers, we create a collaborative ecosystem where everyone contributes what they can to improve their community.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to creating lasting positive change in communities by addressing issues at their source and building local capacity to maintain improvements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We're Different Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">How We're Different</h2>

          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                <Lightbulb className="h-8 w-8 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Direct Action</h3>
                <p className="text-gray-600">
                  Unlike platforms that only report issues to authorities, FixTogether enables communities to take direct action. We connect the dots between identifying problems, funding solutions, and implementing fixes.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="h-8 w-8 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Skill Recognition</h3>
                <p className="text-gray-600">
                  We recognize and reward the skills within communities. Fixers can build their reputation, showcase their work, and earn compensation for applying their talents to community improvement.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="h-8 w-8 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Speed and Efficiency</h3>
                <p className="text-gray-600">
                  By cutting out middlemen and bureaucracy, we help communities solve problems faster. Issues that might take months or years through traditional channels can be addressed in days or weeks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src="/Profile Picture2.jpg" 
                  alt="Team Member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">José Arias</h3>
              <p className="text-emerald-600 mb-3">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                Passionate about community development and using technology to solve local problems.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src="/placeholder.svg?height=128&width=128" 
                  alt="Team Member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Maria Rodriguez</h3>
              <p className="text-emerald-600 mb-3">Community Director</p>
              <p className="text-gray-600 text-sm">
                Expert in community organizing with a background in urban planning and development.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src="/placeholder.svg?height=128&width=128" 
                  alt="Team Member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">David Chen</h3>
              <p className="text-emerald-600 mb-3">Technical Lead</p>
              <p className="text-gray-600 text-sm">
                Software engineer with a passion for creating technology that makes a positive social impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Ready to make a difference in your neighborhood? Join FixTogether today and be part of the community-driven solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/report"
              className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              Report an Issue <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/fix"
              className="bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-800 transition-colors"
            >
              Donate to a Cause
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
