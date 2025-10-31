'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function PressPage() {
  const [email, setEmail] = useState('')

  const pressReleases = [
    {
      date: "October 15, 2025",
      title: "GRAVIX Launches Winter 2025 Collection",
      excerpt: "Featuring sustainable merino wool and recycled materials in timeless silhouettes designed for modern living."
    },
    {
      date: "September 8, 2025",
      title: "GRAVIX Achieves B Corp Certification",
      excerpt: "Company recognized for meeting highest standards of social and environmental performance, transparency, and accountability."
    },
    {
      date: "July 22, 2025",
      title: "New Circular Fashion Initiative Announced",
      excerpt: "Revolutionary resale and recycling program aims to eliminate textile waste and extend garment lifecycle."
    },
    {
      date: "May 3, 2025",
      title: "GRAVIX Opens First Pop-Up Experience in Los Angeles",
      excerpt: "Immersive retail space showcases brand's commitment to minimalist design and sustainable practices."
    }
  ];

  const mediaFeatures = [
    {
      publication: "VOGUE",
      title: "The New Wave of Sustainable Minimalism",
      date: "September 2025"
    },
    {
      publication: "GQ",
      title: "GRAVIX: Redefining Men's Essentials",
      date: "August 2025"
    },
    {
      publication: "THE NEW YORK TIMES",
      title: "How This Brand Made Sustainability Stylish",
      date: "July 2025"
    },
    {
      publication: "ELLE",
      title: "10 Brands Leading the Sustainable Fashion Movement",
      date: "June 2025"
    },
    {
      publication: "MONOCLE",
      title: "The Art of Less: Inside GRAVIX's Design Philosophy",
      date: "May 2025"
    },
    {
      publication: "BUSINESS OF FASHION",
      title: "The Economics of Timeless Design",
      date: "April 2025"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-[50vh] md:h-[70vh] bg-gravix-black"
      >
        <div className="relative flex items-center justify-center h-full px-4">
          <div className="text-center">
            <h1 className="mb-4 text-4xl tracking-tight text-white font-Break md:text-7xl lg:text-9xl md:mb-6">
              PRESS
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-sm font-light tracking-widest text-white md:text-lg lg:text-xl"
            >
              NEWS, MEDIA & BRAND RESOURCES
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Press Contact */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-12 bg-gravix-gray-50 md:py-16"
      >
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-4 text-xl font-light md:text-2xl">Media Inquiries</h2>
            <p className="mb-4 text-sm text-gravix-gray-700 md:text-base">
              For press inquiries, interview requests, or high-resolution images, please contact:
            </p>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="mailto:press@gravix.com" 
              className="text-lg transition-colors text-gravix-black hover:text-gravix-gray-600 md:text-xl"
            >
              press@gravix.com
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Latest Press Releases */}
      <div className="container px-4 py-16 mx-auto md:py-32">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-3xl tracking-tight font-Break md:text-5xl lg:text-6xl md:mb-16"
          >
            LATEST NEWS
          </motion.h2>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8 md:space-y-12"
          >
            {pressReleases.map((release, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ x: 10 }}
                className="pb-8 border-b border-gravix-gray-200 md:pb-12"
              >
                <div className="mb-2 text-xs tracking-widest text-gravix-gray-600 md:text-sm">
                  {release.date}
                </div>
                <h3 className="mb-3 text-xl font-light transition-colors cursor-pointer hover:text-gravix-gray-600 md:text-3xl md:mb-4">
                  {release.title}
                </h3>
                <p className="mb-4 text-base leading-relaxed text-gravix-gray-700 md:text-lg">
                  {release.excerpt}
                </p>
                <motion.button 
                  whileHover={{ x: 5 }}
                  className="text-xs tracking-widest transition-colors hover:text-gravix-gray-600 md:text-sm"
                >
                  READ FULL RELEASE →
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Media Coverage */}
      <div className="py-16 bg-gravix-gray-50 md:py-32">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 text-3xl tracking-tight font-Break md:text-5xl lg:text-6xl md:mb-16"
            >
              IN THE MEDIA
            </motion.h2>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
            >
              {mediaFeatures.map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-6 transition-shadow bg-white hover:shadow-lg md:p-8"
                >
                  <div className="mb-2 text-xs tracking-widest text-gravix-gray-600 md:text-sm">
                    {feature.publication}
                  </div>
                  <h3 className="mb-2 text-lg font-light md:text-xl md:mb-3">
                    {feature.title}
                  </h3>
                  <div className="text-xs text-gravix-gray-600 md:text-sm">
                    {feature.date}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Brand Assets */}
      <div className="container px-4 py-16 mx-auto md:py-32">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-3xl tracking-tight font-Break md:text-5xl lg:text-6xl md:mb-16"
          >
            BRAND ASSETS
          </motion.h2>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
          >
            {[
              {
                title: "Logo Pack",
                description: "Official GRAVIX logos in various formats"
              },
              {
                title: "Brand Guidelines",
                description: "Comprehensive brand usage guide"
              },
              {
                title: "Press Kit",
                description: "High-resolution images and fact sheet"
              }
            ].map((asset, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 text-center bg-gravix-gray-50 md:p-8"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-gravix-black md:w-20 md:h-20 md:mb-6"></div>
                <h3 className="mb-2 text-lg font-light md:text-xl md:mb-3">{asset.title}</h3>
                <p className="mb-4 text-xs text-gravix-gray-700 md:text-sm md:mb-6">
                  {asset.description}
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-xs tracking-widest transition-colors hover:text-gravix-gray-600 md:text-sm"
                >
                  DOWNLOAD
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* About GRAVIX Section */}
      <div className="py-16 text-white bg-gravix-black md:py-32">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8 text-2xl tracking-tight font-Break md:text-4xl lg:text-5xl md:mb-12"
            >
              ABOUT GRAVIX
            </motion.h2>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4 text-base leading-relaxed text-gravix-gray-400 md:text-lg md:space-y-6"
            >
              <motion.p variants={itemVariants}>
                GRAVIX is a contemporary fashion brand founded on the principles of minimalism, 
                quality, and sustainability. Established in 2020, the company has quickly become 
                a leader in timeless, essential clothing designed for modern living.
              </motion.p>
              <motion.p variants={itemVariants}>
                With a commitment to ethical manufacturing and environmental responsibility, 
                GRAVIX partners with certified facilities around the world to create garments 
                that are built to last. The brand's aesthetic is defined by clean lines, neutral 
                palettes, and versatile silhouettes that transcend seasonal trends.
              </motion.p>
              <motion.p variants={itemVariants}>
                GRAVIX operates primarily online, reaching customers in over 50 countries. The 
                brand has been featured in leading publications including Vogue, GQ, and The New 
                York Times, and has received recognition for its sustainable practices and design 
                excellence.
              </motion.p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6 pt-12 mt-12 border-t md:grid-cols-4 md:gap-8 md:pt-16 md:mt-16 border-gravix-gray-700"
            >
              {[
                { number: "2020", label: "Founded" },
                { number: "50+", label: "Countries" },
                { number: "100%", label: "Sustainable" },
                { number: "B Corp", label: "Certified" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="mb-1 text-2xl font-light md:text-3xl md:mb-2">{stat.number}</div>
                  <p className="text-xs text-gravix-gray-500 md:text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Key Contacts */}
      <div className="container px-4 py-16 mx-auto md:py-32">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-3xl tracking-tight font-Break md:text-5xl lg:text-6xl md:mb-16"
          >
            KEY CONTACTS
          </motion.h2>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12"
          >
            {[
              {
                category: "PRESS INQUIRIES",
                name: "Sarah Mitchell",
                role: "Director of Communications",
                email: "press@gravix.com"
              },
              {
                category: "PARTNERSHIP INQUIRIES",
                name: "Marcus Chen",
                role: "Head of Partnerships",
                email: "partnerships@gravix.com"
              },
              {
                category: "GENERAL INQUIRIES",
                name: "Media Relations",
                role: "GRAVIX Team",
                email: "hello@gravix.com"
              }
            ].map((contact, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="p-6 transition-shadow hover:shadow-lg md:p-8"
              >
                <h3 className="mb-2 text-xs tracking-widest text-gravix-gray-600 md:text-sm">
                  {contact.category}
                </h3>
                <p className="mb-1 text-lg font-light md:text-xl md:mb-2">{contact.name}</p>
                <p className="mb-2 text-sm text-gravix-gray-700 md:text-base md:mb-3">{contact.role}</p>
                <motion.a 
                  whileHover={{ x: 5 }}
                  href={`mailto:${contact.email}`} 
                  className="text-sm transition-colors text-gravix-gray-700 hover:text-gravix-black md:text-base"
                >
                  {contact.email}
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 bg-gravix-gray-50 md:py-24"
      >
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-4 text-2xl tracking-tight font-Break md:text-4xl lg:text-5xl md:mb-6">
            STAY UPDATED
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-sm text-gravix-gray-700 md:text-lg md:mb-8">
            Subscribe to receive the latest press releases and brand news
          </p>
          <div className="flex flex-col max-w-md gap-4 mx-auto md:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="YOUR EMAIL"
              className="flex-1 px-4 py-3 transition-colors border border-gravix-gray-300 focus:border-gravix-black focus:outline-none md:px-6 md:py-4"
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 text-xs tracking-widest text-white transition-colors bg-gravix-black hover:bg-gravix-gray-800 md:px-8 md:py-4 md:text-sm"
            >
              SUBSCRIBE
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}