'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  const jobs = [
    {
      title: 'Senior Fashion Designer',
      department: 'Design',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Lead our design team in creating timeless, minimalist collections that define the GRAVIX aesthetic.',
    },
    {
      title: 'E-commerce Manager',
      department: 'Digital',
      location: 'Remote',
      type: 'Full-time',
      description: 'Drive our online presence and optimize the customer journey across all digital touchpoints.',
    },
    {
      title: 'Sustainability Coordinator',
      department: 'Operations',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Champion our sustainability initiatives and ensure ethical practices throughout our supply chain.',
    },
    {
      title: 'Content Creator',
      department: 'Marketing',
      location: 'Los Angeles, CA',
      type: 'Full-time',
      description: 'Craft compelling visual stories that bring the GRAVIX brand to life across social and digital platforms.',
    },
    {
      title: 'Customer Experience Specialist',
      department: 'Customer Service',
      location: 'Remote',
      type: 'Full-time',
      description: 'Deliver exceptional service and build lasting relationships with our community of customers.',
    },
    {
      title: 'Production Coordinator',
      department: 'Operations',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Manage the production process from concept to delivery, ensuring quality and timely execution.',
    },
  ]

  const departments = ['all', 'Design', 'Digital', 'Operations', 'Marketing', 'Customer Service']

  const filteredJobs = selectedDepartment === 'all'
    ? jobs
    : jobs.filter((job) => job.department === selectedDepartment)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  }

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  }

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
          <motion.div
            className="max-w-4xl text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="mb-6 text-5xl tracking-tight text-white font-Break sm:text-6xl md:text-7xl lg:text-9xl"
              variants={itemVariants}
            >
              CAREERS
            </motion.h1>
            <motion.p
              className="mb-8 text-base font-light leading-relaxed text-white sm:text-lg md:text-xl lg:text-2xl"
              variants={itemVariants}
            >
              Join a team that's redefining minimalist fashion and building a more sustainable future
            </motion.p>
            <motion.button
              className="px-8 py-3 text-sm tracking-widest transition-colors bg-white text-gravix-black hover:bg-gravix-gray-100 sm:px-10 sm:py-4"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              aria-label="View open positions"
            >
              VIEW OPEN POSITIONS
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Culture Section */}
      <motion.div
        className="container px-4 py-16 mx-auto sm:py-24 md:py-32"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="mb-12 text-3xl tracking-tight text-center font-Break sm:text-4xl md:text-5xl lg:text-7xl"
            variants={itemVariants}
          >
            LIFE AT GRAVIX
          </motion.h2>
          <motion.div className="grid grid-cols-1 gap-12 md:grid-cols-3" variants={containerVariants}>
            <motion.div className="text-center" variants={itemVariants}>
              <div className="w-20 h-20 mx-auto mb-6 bg-gravix-black"></div>
              <h3 className="mb-4 text-xl font-light sm:text-2xl">Creative Freedom</h3>
              <p className="text-sm leading-relaxed text-gravix-gray-700 sm:text-base">
                We empower our team to take risks, experiment, and push boundaries in pursuit of exceptional design.
              </p>
            </motion.div>
            <motion.div className="text-center" variants={itemVariants}>
              <div className="w-20 h-20 mx-auto mb-6 bg-gravix-black"></div>
              <h3 className="mb-4 text-xl font-light sm:text-2xl">Work-Life Balance</h3>
              <p className="text-sm leading-relaxed text-gravix-gray-700 sm:text-base">
                We believe in sustainable work practices, flexible schedules, and time to recharge and find inspiration.
              </p>
            </motion.div>
            <motion.div className="text-center" variants={itemVariants}>
              <div className="w-20 h-20 mx-auto mb-6 bg-gravix-black"></div>
              <h3 className="mb-4 text-xl font-light sm:text-2xl">Growth Mindset</h3>
              <p className="text-sm leading-relaxed text-gravix-gray-700 sm:text-base">
                Continuous learning, mentorship programs, and opportunities to develop new skills are core to our culture.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Values Section */}
      <motion.div
        className="py-16 sm:py-24 md:py-32 bg-gravix-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container px-4 mx-auto">
          <div className="grid items-center max-w-6xl grid-cols-1 gap-12 mx-auto sm:gap-16 md:grid-cols-2">
            <motion.div variants={imageVariants}>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Team meeting"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
              />
            </motion.div>
            <motion.div className="space-y-8" variants={containerVariants}>
              <motion.h2
                className="text-3xl tracking-tight font-Break sm:text-4xl md:text-5xl"
                variants={itemVariants}
              >
                OUR VALUES
              </motion.h2>
              <motion.div className="space-y-6" variants={containerVariants}>
                <motion.div variants={itemVariants}>
                  <h3 className="mb-2 text-lg font-light sm:text-xl">Authenticity</h3>
                  <p className="text-sm text-gravix-gray-700 sm:text-base">
                    We value genuine expression and honest communication in everything we do.
                  </p>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <h3 className="mb-2 text-lg font-light sm:text-xl">Collaboration</h3>
                  <p className="text-sm text-gravix-gray-700 sm:text-base">
                    Great ideas come from diverse perspectives working together toward a common goal.
                  </p>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <h3 className="mb-2 text-lg font-light sm:text-xl">Excellence</h3>
                  <p className="text-sm text-gravix-gray-700 sm:text-base">
                    We're committed to the highest standards in design, quality, and customer experience.
                  </p>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <h3 className="mb-2 text-lg font-light sm:text-xl">Sustainability</h3>
                  <p className="text-sm text-gravix-gray-700 sm:text-base">
                    Environmental and social responsibility guide every decision we make.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div
        className="container px-4 py-16 mx-auto sm:py-24 md:py-32"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="mb-12 text-3xl tracking-tight text-center font-Break sm:text-4xl md:text-5xl lg:text-6xl"
            variants={itemVariants}
          >
            BENEFITS & PERKS
          </motion.h2>
          <motion.div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4" variants={containerVariants}>
            {[
              'Competitive Salary',
              'Health Insurance',
              '401(k) Matching',
              'Unlimited PTO',
              'Remote Work Options',
              'Professional Development',
              'Employee Discount',
              'Wellness Programs',
              'Parental Leave',
              'Commuter Benefits',
              'Team Retreats',
              'Creative Workspace',
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="p-6 text-center bg-gravix-gray-50"
                variants={itemVariants}
              >
                <p className="text-sm tracking-widest sm:text-base">{benefit}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Open Positions */}
      <motion.div
        className="py-16 text-white sm:py-24 md:py-32 bg-gravix-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="mb-12 text-3xl tracking-tight text-center font-Break sm:text-4xl md:text-5xl lg:text-6xl"
              variants={itemVariants}
            >
              OPEN POSITIONS
            </motion.h2>
            {/* Department Filter */}
            <motion.div className="flex flex-wrap justify-center gap-4 mb-12 sm:mb-16" variants={containerVariants}>
              {departments.map((dept) => (
                <motion.button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 text-sm tracking-widest transition-colors sm:px-6 ${
                    selectedDepartment === dept
                      ? 'bg-white text-gravix-black'
                      : 'bg-transparent border border-white text-white hover:bg-white hover:text-gravix-black'
                  }`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {dept.toUpperCase()}
                </motion.button>
              ))}
            </motion.div>
            {/* Job Listings */}
            <motion.div className="space-y-6" variants={containerVariants}>
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={index}
                  className="p-6 transition-colors bg-white text-gravix-black hover:bg-gravix-gray-50 sm:p-8"
                  variants={itemVariants}
                >
                  <div className="flex flex-col mb-4 md:flex-row md:justify-between md:items-start">
                    <div>
                      <h3 className="mb-2 text-xl font-light sm:text-2xl">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gravix-gray-600">
                        <span className="tracking-wider">{job.department}</span>
                        <span>•</span>
                        <span className="tracking-wider">{job.location}</span>
                        <span>•</span>
                        <span className="tracking-wider">{job.type}</span>
                      </div>
                    </div>
                    <motion.button
                      className="px-6 py-2 mt-4 text-sm tracking-widest text-white transition-colors md:mt-0 bg-gravix-black hover:bg-gravix-gray-800 sm:px-8 sm:py-3"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      aria-label={`Apply for ${job.title}`}
                    >
                      APPLY NOW
                    </motion.button>
                  </div>
                  <p className="text-sm leading-relaxed text-gravix-gray-700 sm:text-base">
                    {job.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="container px-4 py-16 mx-auto sm:py-24 md:py-32"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="mb-6 text-3xl tracking-tight font-Break sm:text-4xl md:text-5xl"
            variants={itemVariants}
          >
            DON'T SEE THE RIGHT ROLE?
          </motion.h2>
          <motion.p
            className="mb-8 text-sm leading-relaxed text-gravix-gray-700 sm:text-base md:text-lg"
            variants={itemVariants}
          >
            We're always looking for talented individuals who share our passion for minimalist
            design and sustainable fashion. Send us your resume and portfolio.
          </motion.p>
          <motion.button
            className="px-8 py-3 text-sm tracking-widest text-white transition-colors bg-gravix-black hover:bg-gravix-gray-800 sm:px-10 sm:py-4"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="Submit your application"
          >
            SUBMIT YOUR APPLICATION
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}