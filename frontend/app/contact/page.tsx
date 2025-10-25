'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ContactUs from '../../public/assets/images/photo-1423666639041-f56000c27a9a.jpeg'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Message sent! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

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

  const linkVariants = {
    hover: { y: -2, transition: { duration: 0.2 } },
    tap: { y: 2 },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.div
        className="relative h-[60vh] bg-gravix-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0">
          <motion.img
            src={ContactUs.src}
            alt="Contact"
            className="object-cover w-full h-full opacity-30"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          />
        </div>
        <div className="relative flex items-center justify-center h-full px-4">
          <motion.div
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="mb-4 text-5xl tracking-tight text-white font-Break sm:text-6xl md:text-7xl lg:text-8xl"
              variants={itemVariants}
            >
              GET IN TOUCH
            </motion.h1>
            <motion.p
              className="text-base font-light tracking-widest text-white sm:text-lg md:text-xl"
              variants={itemVariants}
            >
              WE'D LOVE TO HEAR FROM YOU
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Contact Content */}
      <motion.div
        className="container px-4 py-16 mx-auto sm:py-20 md:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="grid max-w-6xl grid-cols-1 gap-12 mx-auto sm:gap-16 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div variants={containerVariants}>
            <motion.h2
              className="mb-8 text-3xl tracking-tight font-Corigo sm:text-4xl"
              variants={itemVariants}
            >
              SEND US A MESSAGE
            </motion.h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label className="block mb-2 text-sm tracking-widest text-gravix-gray-700">
                  NAME *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 transition-colors border border-gravix-gray-300 focus:border-gravix-black focus:outline-none"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block mb-2 text-sm tracking-widest text-gravix-gray-700">
                  EMAIL *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 transition-colors border border-gravix-gray-300 focus:border-gravix-black focus:outline-none"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block mb-2 text-sm tracking-widest text-gravix-gray-700">
                  SUBJECT *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 transition-colors border border-gravix-gray-300 focus:border-gravix-black focus:outline-none"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block mb-2 text-sm tracking-widest text-gravix-gray-700">
                  MESSAGE *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                  className="w-full px-4 py-3 transition-colors border resize-none border-gravix-gray-300 focus:border-gravix-black focus:outline-none"
                />
              </motion.div>

              <motion.button
                type="submit"
                className="w-full py-4 text-sm tracking-widest text-white transition-colors bg-gravix-black hover:bg-gravix-gray-800"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label="Send message"
              >
                SEND MESSAGE
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div className="space-y-12" variants={containerVariants}>
            <motion.div variants={containerVariants}>
              <motion.h2
                className="mb-8 text-3xl tracking-tight font-Corigo sm:text-4xl"
                variants={itemVariants}
              >
                CONTACT INFO
              </motion.h2>
              <motion.div className="space-y-8" variants={containerVariants}>
                <motion.div variants={itemVariants}>
                  <h3 className="mb-3 text-sm tracking-widest text-gravix-gray-600">
                    CUSTOMER SERVICE
                  </h3>
                  <p className="text-lg text-gravix-gray-800">support@gravix.com</p>
                  <p className="text-gravix-gray-600">Mon - Fri: 9:00 AM - 6:00 PM EST</p>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="mb-3 text-sm tracking-widest text-gravix-gray-600">
                    PRESS INQUIRIES
                  </h3>
                  <p className="text-lg text-gravix-gray-800">press@gravix.com</p>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="mb-3 text-sm tracking-widest text-gravix-gray-600">
                    WHOLESALE
                  </h3>
                  <p className="text-lg text-gravix-gray-800">wholesale@gravix.com</p>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="mb-3 text-sm tracking-widest text-gravix-gray-600">
                    ADDRESS
                  </h3>
                  <p className="text-gravix-gray-800">
                    123 Fashion Avenue
                    <br />
                    Colombo, NY 10001
                    <br />
                    Sri Lanka
                  </p>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="mb-3 text-sm tracking-widest text-gravix-gray-600">
                    PHONE
                  </h3>
                  <p className="text-lg text-gravix-gray-800">+94 11 2345 678</p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Social Media */}
            <motion.div variants={containerVariants}>
              <motion.h3
                className="mb-4 text-sm tracking-widest text-gravix-gray-600"
                variants={itemVariants}
              >
                FOLLOW US
              </motion.h3>
              <motion.div className="flex gap-6" variants={containerVariants}>
                <motion.a
                  href="#"
                  className="transition-colors text-gravix-gray-800 hover:text-gravix-black"
                  variants={linkVariants}
                  whileHover="hover"
                  whileTap="tap"
                  aria-label="Follow us on Instagram"
                >
                  <span className="text-lg tracking-wider">INSTAGRAM</span>
                </motion.a>
                <motion.a
                  href="#"
                  className="transition-colors text-gravix-gray-800 hover:text-gravix-black"
                  variants={linkVariants}
                  whileHover="hover"
                  whileTap="tap"
                  aria-label="Follow us on Twitter"
                >
                  <span className="text-lg tracking-wider">TWITTER</span>
                </motion.a>
                <motion.a
                  href="#"
                  className="transition-colors text-gravix-gray-800 hover:text-gravix-black"
                  variants={linkVariants}
                  whileHover="hover"
                  whileTap="tap"
                  aria-label="Follow us on Facebook"
                >
                  <span className="text-lg tracking-wider">FACEBOOK</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        className="py-16 sm:py-20 md:py-24 bg-gravix-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="mb-12 text-3xl tracking-tight text-center font-Break sm:text-4xl md:text-5xl"
              variants={itemVariants}
            >
              FREQUENTLY ASKED
            </motion.h2>
            <motion.div className="space-y-8" variants={containerVariants}>
              <motion.div className="p-8 bg-white" variants={itemVariants}>
                <h3 className="mb-3 text-lg font-light sm:text-xl">
                  What is your return policy?
                </h3>
                <p className="text-sm leading-relaxed text-gravix-gray-700 sm:text-base">
                  We offer a 30-day return policy for all unworn items with original tags
                  attached. Please contact our customer service team to initiate a return.
                </p>
              </motion.div>

              <motion.div className="p-8 bg-white" variants={itemVariants}>
                <h3 className="mb-3 text-lg font-light sm:text-xl">
                  How long does shipping take?
                </h3>
                <p className="text-sm leading-relaxed text-gravix-gray-700 sm:text-base">
                  Standard shipping typically takes 3-5 business days within the US.
                  International shipping times vary by location. Express shipping options
                  are available at checkout.
                </p>
              </motion.div>

              <motion.div className="p-8 bg-white" variants={itemVariants}>
                <h3 className="mb-3 text-lg font-light sm:text-xl">
                  Do you offer international shipping?
                </h3>
                <p className="text-sm leading-relaxed text-gravix-gray-700 sm:text-base">
                  Yes, we ship worldwide. Shipping costs and delivery times vary by
                  destination. All applicable customs fees are the responsibility of the
                  customer.
                </p>
              </motion.div>

              <motion.div className="p-8 bg-white" variants={itemVariants}>
                <h3 className="mb-3 text-lg font-light sm:text-xl">
                  How do I care for my GRAVIX garments?
                </h3>
                <p className="text-sm leading-relaxed text-gravix-gray-700 sm:text-base">
                  Each garment comes with specific care instructions on the label.
                  Generally, we recommend cold water washing and air drying to maintain
                  the quality and longevity of your pieces.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Map Section */}
      <motion.div
        className="h-[300px] sm:h-[400px] md:h-[500px] bg-gravix-gray-200 hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={imageVariants}
      >
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80"
          alt="Location map"
          className="object-cover w-full h-full"
        />
      </motion.div>
    </div>
  )
}