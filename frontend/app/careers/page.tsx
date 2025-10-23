'use client'


import { useState } from 'react';

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const jobs = [
    {
      title: "Senior Fashion Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
      description: "Lead our design team in creating timeless, minimalist collections that define the GRAVIX aesthetic."
    },
    {
      title: "E-commerce Manager",
      department: "Digital",
      location: "Remote",
      type: "Full-time",
      description: "Drive our online presence and optimize the customer journey across all digital touchpoints."
    },
    {
      title: "Sustainability Coordinator",
      department: "Operations",
      location: "New York, NY",
      type: "Full-time",
      description: "Champion our sustainability initiatives and ensure ethical practices throughout our supply chain."
    },
    {
      title: "Content Creator",
      department: "Marketing",
      location: "Los Angeles, CA",
      type: "Full-time",
      description: "Craft compelling visual stories that bring the GRAVIX brand to life across social and digital platforms."
    },
    {
      title: "Customer Experience Specialist",
      department: "Customer Service",
      location: "Remote",
      type: "Full-time",
      description: "Deliver exceptional service and build lasting relationships with our community of customers."
    },
    {
      title: "Production Coordinator",
      department: "Operations",
      location: "New York, NY",
      type: "Full-time",
      description: "Manage the production process from concept to delivery, ensuring quality and timely execution."
    }
  ];

  const departments = ['all', 'Design', 'Digital', 'Operations', 'Marketing', 'Customer Service'];

  const filteredJobs = selectedDepartment === 'all' 
    ? jobs 
    : jobs.filter(job => job.department === selectedDepartment);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-gravix-gray-900">
          <img 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&q=80" 
            alt="Team collaboration"
            className="object-cover w-full h-full opacity-40"
          />
        </div>
        <div className="relative flex items-center justify-center h-full px-4">
          <div className="max-w-4xl text-center">
            <h1 className="mb-6 text-6xl tracking-tight text-white font-Break md:text-9xl">
              CAREERS
            </h1>
            <p className="mb-8 text-xl font-light leading-relaxed text-white md:text-2xl">
              Join a team that's redefining minimalist fashion and building 
              a more sustainable future
            </p>
            <button className="px-12 py-4 text-sm tracking-widest transition-colors bg-white text-gravix-black hover:bg-gravix-gray-100">
              VIEW OPEN POSITIONS
            </button>
          </div>
        </div>
      </div>

      {/* Culture Section */}
      <div className="container px-4 py-32 mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-20 text-5xl tracking-tight text-center font-Break md:text-7xl">
            LIFE AT GRAVIX
          </h2>
          
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gravix-black"></div>
              <h3 className="mb-4 text-2xl font-light">Creative Freedom</h3>
              <p className="leading-relaxed text-gravix-gray-700">
                We empower our team to take risks, experiment, and push boundaries 
                in pursuit of exceptional design.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gravix-black"></div>
              <h3 className="mb-4 text-2xl font-light">Work-Life Balance</h3>
              <p className="leading-relaxed text-gravix-gray-700">
                We believe in sustainable work practices, flexible schedules, and 
                time to recharge and find inspiration.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gravix-black"></div>
              <h3 className="mb-4 text-2xl font-light">Growth Mindset</h3>
              <p className="leading-relaxed text-gravix-gray-700">
                Continuous learning, mentorship programs, and opportunities to 
                develop new skills are core to our culture.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-32 bg-gravix-gray-50">
        <div className="container px-4 mx-auto">
          <div className="grid items-center max-w-6xl grid-cols-1 gap-16 mx-auto md:grid-cols-2">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" 
                alt="Team meeting"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="space-y-8">
              <h2 className="text-5xl tracking-tight font-Break">
                OUR VALUES
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-xl font-light">Authenticity</h3>
                  <p className="text-gravix-gray-700">
                    We value genuine expression and honest communication in everything we do.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-light">Collaboration</h3>
                  <p className="text-gravix-gray-700">
                    Great ideas come from diverse perspectives working together toward a common goal.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-light">Excellence</h3>
                  <p className="text-gravix-gray-700">
                    We're committed to the highest standards in design, quality, and customer experience.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-light">Sustainability</h3>
                  <p className="text-gravix-gray-700">
                    Environmental and social responsibility guide every decision we make.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container px-4 py-32 mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-20 text-5xl tracking-tight text-center font-Break md:text-6xl">
            BENEFITS & PERKS
          </h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              "Competitive Salary",
              "Health Insurance",
              "401(k) Matching",
              "Unlimited PTO",
              "Remote Work Options",
              "Professional Development",
              "Employee Discount",
              "Wellness Programs",
              "Parental Leave",
              "Commuter Benefits",
              "Team Retreats",
              "Creative Workspace"
            ].map((benefit, index) => (
              <div key={index} className="p-6 text-center bg-gravix-gray-50">
                <p className="text-sm tracking-widest">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="py-32 text-white bg-gravix-black">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="mb-12 text-5xl tracking-tight text-center font-Break md:text-6xl">
              OPEN POSITIONS
            </h2>
            
            {/* Department Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-6 py-2 text-sm tracking-widest transition-colors ${
                    selectedDepartment === dept
                      ? 'bg-white text-gravix-black'
                      : 'bg-transparent border border-white text-white hover:bg-white hover:text-gravix-black'
                  }`}
                >
                  {dept.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Job Listings */}
            <div className="space-y-6">
              {filteredJobs.map((job, index) => (
                <div 
                  key={index}
                  className="p-8 transition-colors bg-white text-gravix-black hover:bg-gravix-gray-50"
                >
                  <div className="flex flex-col mb-4 md:flex-row md:justify-between md:items-start">
                    <div>
                      <h3 className="mb-2 text-2xl font-light">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gravix-gray-600">
                        <span className="tracking-wider">{job.department}</span>
                        <span>•</span>
                        <span className="tracking-wider">{job.location}</span>
                        <span>•</span>
                        <span className="tracking-wider">{job.type}</span>
                      </div>
                    </div>
                    <button className="px-8 py-3 mt-4 text-sm tracking-widest text-white transition-colors md:mt-0 bg-gravix-black hover:bg-gravix-gray-800">
                      APPLY NOW
                    </button>
                  </div>
                  <p className="leading-relaxed text-gravix-gray-700">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container px-4 py-32 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-4xl tracking-tight font-Break md:text-5xl">
            DON'T SEE THE RIGHT ROLE?
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-gravix-gray-700">
            We're always looking for talented individuals who share our passion for 
            minimalist design and sustainable fashion. Send us your resume and portfolio.
          </p>
          <button className="px-12 py-4 text-sm tracking-widest text-white transition-colors bg-gravix-black hover:bg-gravix-gray-800">
            SUBMIT YOUR APPLICATION
          </button>
        </div>
      </div>
    </div>
  );
}