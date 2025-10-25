"use client";


import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Banner from '../../public/assets/images/sikora-interiors-minimalist-boutique-shops-archello.1671563227.7366.webp';
import Hero from '../../public/assets/images/photo-1490481651871-ab68de25d43d.jpeg';
import Philosophy from '../../public/assets/images/photo-1434389677669-e08b4cac3105.jpeg';
import Craftsmanship from '../../public/assets/images/photo-1515886657613-9f3515b0c78f.jpeg';
import Commitment from '../../public/assets/images/pexels-photo-1536619.jpeg';



export default function AboutPage() {
  // Variants for container staggering
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  // Variants for individual items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  // Variants for images
  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  }

  // Variants for button
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.div
        className="relative h-[60vh] sm:h-[80vh] md:h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gravix-gray-900">
          <motion.img
            src={Hero.src}
            alt="Fashion atelier"
            className="object-cover w-full h-full opacity-40"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
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
              className="mb-4 text-5xl tracking-tight text-white font-Break sm:text-6xl md:text-7xl lg:text-9xl"
              variants={itemVariants}
            >
              GRAVIX
            </motion.h1>
            <motion.p
              className="text-base font-light tracking-widest text-white sm:text-lg md:text-xl lg:text-2xl"
              variants={itemVariants}
            >
              REDEFINING MINIMALISM
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Philosophy Section */}
      <motion.div
        className="container px-4 py-16 mx-auto sm:py-24 md:py-32"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="grid items-center max-w-6xl grid-cols-1 gap-8 mx-auto sm:gap-12 md:gap-16 md:grid-cols-2">
          <motion.div variants={imageVariants}>
            <img
              src={Philosophy.src}
              alt="Fabric detail"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
            />
          </motion.div>
          <motion.div className="space-y-6 sm:space-y-8" variants={containerVariants}>
            <motion.h2
              className="text-3xl tracking-tight font-Break sm:text-4xl md:text-5xl lg:text-6xl"
              variants={itemVariants}
            >
              OUR<br />PHILOSOPHY
            </motion.h2>
            <motion.div className="space-y-4 text-base leading-relaxed text-gravix-gray-700 sm:text-lg" variants={containerVariants}>
              <motion.p variants={itemVariants}>
                At GRAVIX, we believe that great clothing should be simple, comfortable,
                and built to last. We strip away the unnecessary to focus on what truly
                matters: exceptional materials, perfect fit, and timeless design.
              </motion.p>
              <motion.p variants={itemVariants}>
                Every piece in our collection is carefully crafted to become a staple
                in your wardrobe, designed to be worn and loved for years to come.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Full Width Image Break */}
      <div
        className="relative w-full h-[70vh] bg-fixed bg-center bg-cover hidden sm:block"
        style={{
          backgroundImage: `url(${Banner.src})`
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div> {/* optional overlay */}
      </div>


      {/* Craftsmanship Section */}
      <motion.div
        className="container px-4 py-16 mx-auto sm:py-24 md:py-32"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="grid items-center max-w-6xl grid-cols-1 gap-8 mx-auto sm:gap-12 md:gap-16 md:grid-cols-2">
          <motion.div className="order-2 space-y-6 sm:space-y-8 md:order-1" variants={containerVariants}>
            <motion.h2
              className="text-3xl tracking-tight font-Break sm:text-4xl md:text-5xl lg:text-6xl"
              variants={itemVariants}
            >
              QUALITY<br />CRAFTSMANSHIP
            </motion.h2>
            <motion.div className="space-y-4 text-base leading-relaxed text-gravix-gray-700 sm:text-lg" variants={containerVariants}>
              <motion.p variants={itemVariants}>
                We partner with ethical manufacturers who share our commitment to
                quality and sustainability. Each garment undergoes rigorous quality
                control to ensure it meets our high standards.
              </motion.p>
              <motion.p variants={itemVariants}>
                From the selection of fabrics to the final stitch, every detail is
                considered to deliver clothing that not only looks good but feels
                exceptional to wear.
              </motion.p>
            </motion.div>
          </motion.div>
          <motion.div className="order-1 md:order-2" variants={imageVariants}>
            <img
              src={Craftsmanship.src}
              alt="Design process"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Values Grid */}
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
              className="mb-12 text-3xl tracking-tight text-center font-Break sm:text-4xl md:text-5xl lg:text-7xl"
              variants={itemVariants}
            >
              OUR VALUES
            </motion.h2>
            <motion.div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-3" variants={containerVariants}>
              <motion.div className="space-y-4" variants={itemVariants}>
                <div className="text-4xl font-light sm:text-5xl md:text-6xl">01</div>
                <h3 className="text-xl font-light tracking-wide sm:text-2xl">SUSTAINABILITY</h3>
                <p className="text-sm leading-relaxed text-gravix-gray-400 sm:text-base">
                  We're committed to creating clothing that respects both people and the planet
                  through sustainable materials and transparent supply chains.
                </p>
              </motion.div>
              <motion.div className="space-y-4" variants={itemVariants}>
                <div className="text-4xl font-light sm:text-5xl md:text-6xl">02</div>
                <h3 className="text-xl font-light tracking-wide sm:text-2xl">TIMELESSNESS</h3>
                <p className="text-sm leading-relaxed text-gravix-gray-400 sm:text-base">
                  Our designs transcend fleeting trends, focusing on pieces that remain
                  relevant and elegant season after season.
                </p>
              </motion.div>
              <motion.div className="space-y-4" variants={itemVariants}>
                <div className="text-4xl font-light sm:text-5xl md:text-6xl">03</div>
                <h3 className="text-xl font-light tracking-wide sm:text-2xl">EXCELLENCE</h3>
                <p className="text-sm leading-relaxed text-gravix-gray-400 sm:text-base">
                  Every detail matters. From fabric selection to the final stitch,
                  we maintain uncompromising standards of quality.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Commitment Section */}
      <motion.div
        className="relative h-[60vh] sm:h-[70vh] md:h-[80vh]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="absolute inset-0">
          <motion.img
            src={Commitment.src}
            alt="Nature"
            className="object-cover w-full h-full"
            variants={imageVariants}
          />
          {/* Matte layer */}
          <motion.div
            className="absolute inset-0 bg-black/30" // Adjust opacity and color for matte effect
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <div className="relative flex items-center justify-center h-full px-4">
          <motion.div
            className="max-w-3xl p-8 text-center bg-white/95 sm:p-12"
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
            }}
          >
            <motion.h2
              className="mb-4 text-2xl tracking-tight font-Break sm:text-3xl md:text-4xl lg:text-5xl"
              variants={itemVariants}
            >
              OUR PROMISE
            </motion.h2>
            <motion.p
              className="text-sm leading-relaxed text-gravix-gray-700 sm:text-base md:text-lg"
              variants={itemVariants}
            >
              Every garment we craft reflects a deep respect for the artisans behind it and the
              environment around us. Through fair trade, mindful sourcing, and lasting quality, we aim
              to create fashion that truly makes a difference.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer CTA */}
      <motion.div
        className="py-16 sm:py-20 md:py-24 bg-gravix-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container px-4 mx-auto text-center">
          <motion.h2
            className="mb-6 text-2xl tracking-tight font-Break sm:text-3xl md:text-4xl lg:text-5xl"
            variants={itemVariants}
          >
            DISCOVER THE COLLECTION
          </motion.h2>
          <motion.p
            className="max-w-2xl mx-auto mb-8 text-sm text-gravix-gray-600 sm:text-base md:text-lg"
            variants={itemVariants}
          >
            Experience minimalism redefined. Explore our carefully curated selection
            of timeless essentials.
          </motion.p>
          <Link href="/products">
            <motion.button
              className="px-8 py-3 text-sm tracking-widest text-white transition-colors bg-gravix-black hover:bg-gravix-gray-800 sm:px-10 sm:py-4"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              SHOP NOW
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}