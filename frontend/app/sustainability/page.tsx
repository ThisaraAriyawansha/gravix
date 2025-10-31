'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import img1 from '../../public/assets/images/photo-1542601906990-b4d3fb778b09.jpeg'
import img2 from '../../public/assets/images/photo-1558618666-fcd25c85cd64.jpeg'
import img3 from '../../public/assets/images/photo-1595341888016-a392ef81b7de.jpeg'



export default function SustainabilityPage() {
  // Hero section animation
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  // Stats counter animation
  const statsRef = useRef(null)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        initial={{ opacity: 0, y: 50 }}
        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="relative h-screen"
      >
        <div className="absolute inset-0 bg-gravix-gray-900">
          <img 
            src={img1.src}
            alt="Sustainable materials"
            className="object-cover w-full h-full opacity-50"
          />
        </div>
        <div className="relative flex items-center justify-center h-full px-4">
          <div className="max-w-4xl text-center">
            <h1 className="mb-4 text-4xl tracking-tight text-white font-Break md:text-7xl lg:text-9xl md:mb-6">
              SUSTAINABILITY
            </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-sm font-light leading-relaxed text-white md:text-base lg:text-base font-kugile"
              >
                Our commitment to creating fashion that respects people and planet
              </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Mission Statement */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container px-4 py-16 mx-auto md:py-32"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-3xl tracking-tight font-Break md:text-5xl lg:text-6xl md:mb-8">
            OUR MISSION
          </h2>
          <p className="text-base leading-relaxed text-gravix-gray-700 md:text-lg lg:text-xl">
            At GRAVIX, sustainability isn't an afterthought—it's the foundation of everything 
            we do. We believe that timeless design and environmental responsibility go hand in hand, 
            creating clothing that's built to last and made with care for our planet.
          </p>
        </div>
      </motion.div>

      {/* Materials Section */}
      <div className="py-16 bg-gravix-gray-50 md:py-32">
        <div className="container px-4 mx-auto">
          <div className="grid items-center max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-2 md:gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <h2 className="mb-6 text-3xl tracking-tight font-Break md:text-5xl">
                SUSTAINABLE<br/>MATERIALS
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gravix-gray-700 md:text-lg md:space-y-6">
                <p>
                  We carefully select materials that minimize environmental impact while 
                  maintaining exceptional quality. Our fabrics include organic cotton, 
                  recycled polyester, Tencel, and other eco-friendly alternatives.
                </p>
                <p>
                  Every material is chosen for its durability, comfort, and reduced 
                  environmental footprint. We're constantly researching and testing 
                  innovative sustainable fabrics for future collections.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6 md:gap-4 md:mt-8">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-white md:p-6"
                >
                  <div className="mb-1 text-2xl font-light md:text-4xl md:mb-2">85%</div>
                  <p className="text-xs tracking-wider md:text-sm">Organic Materials</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-white md:p-6"
                >
                  <div className="mb-1 text-2xl font-light md:text-4xl md:mb-2">100%</div>
                  <p className="text-xs tracking-wider md:text-sm">Recycled Packaging</p>
                </motion.div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <img 
                src={img2.src}
                alt="Organic cotton"
                className="w-full h-[300px] md:h-[600px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ethical Manufacturing */}
      <div className="container px-4 py-16 mx-auto md:py-32">
        <div className="grid items-center max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-2 md:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img 
              src={img3.src}
              alt="Manufacturing"
              className="w-full h-[300px] md:h-[600px] object-cover"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-3xl tracking-tight font-Break md:text-5xl">
              ETHICAL<br/>MANUFACTURING
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-gravix-gray-700 md:text-lg md:space-y-6">
              <p>
                We partner with certified facilities that uphold the highest standards 
                of worker welfare. Fair wages, safe conditions, and respect for workers' 
                rights are non-negotiable.
              </p>
              <p>
                Our manufacturing partners undergo regular third-party audits to ensure 
                compliance with international labor standards. We maintain transparent, 
                long-term relationships built on mutual respect and shared values.
              </p>
            </div>
            <div className="mt-6 space-y-3 md:mt-8 md:space-y-4">
              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-center gap-3 md:gap-4"
              >
                <div className="w-2 h-2 bg-gravix-black md:w-3 md:h-3"></div>
                <span className="text-xs tracking-wider md:text-sm">Fair Labor Association Certified</span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-center gap-3 md:gap-4"
              >
                <div className="w-2 h-2 bg-gravix-black md:w-3 md:h-3"></div>
                <span className="text-xs tracking-wider md:text-sm">SA8000 Social Accountability</span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-center gap-3 md:gap-4"
              >
                <div className="w-2 h-2 bg-gravix-black md:w-3 md:h-3"></div>
                <span className="text-xs tracking-wider md:text-sm">WRAP Certified Facilities</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Environmental Impact */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 text-white bg-gravix-black md:py-32"
      >
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="mb-12 text-3xl tracking-tight text-center font-Break md:text-5xl lg:text-6xl md:mb-20">
              ENVIRONMENTAL IMPACT
            </h2>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="mb-3 text-4xl font-light md:text-6xl">-40%</div>
                <h3 className="mb-3 text-lg font-light tracking-wide md:text-xl md:mb-4">Water Usage</h3>
                <p className="text-sm leading-relaxed text-gravix-gray-400 md:text-base">
                  Compared to conventional cotton production through our sustainable sourcing practices
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="mb-3 text-4xl font-light md:text-6xl">-65%</div>
                <h3 className="mb-3 text-lg font-light tracking-wide md:text-xl md:mb-4">Carbon Emissions</h3>
                <p className="text-sm leading-relaxed text-gravix-gray-400 md:text-base">
                  Reduction through renewable energy use and optimized logistics
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="mb-3 text-4xl font-light md:text-6xl">0</div>
                <h3 className="mb-3 text-lg font-light tracking-wide md:text-xl md:mb-4">Plastic Packaging</h3>
                <p className="text-sm leading-relaxed text-gravix-gray-400 md:text-base">
                  All packaging is recyclable, compostable, or made from recycled materials
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Circular Fashion */}
      <div className="container px-4 py-16 mx-auto md:py-32">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 text-3xl tracking-tight text-center font-Break md:text-5xl lg:text-6xl md:mb-12"
          >
            CIRCULAR FASHION
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-12 text-base leading-relaxed text-center text-gravix-gray-700 md:text-lg lg:text-xl md:mb-20"
          >
            We're building a circular model where nothing goes to waste
          </motion.p>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
            {[
              {
                title: "Repair & Care",
                description: "We offer free repairs for the lifetime of your garment. Our detailed care guides help you maintain your pieces for years to come.",
              },
              {
                title: "Resale Program",
                description: "Trade in your pre-loved GRAVIX pieces for store credit. We'll clean, repair, and resell them, extending their life cycle.",
              },
              {
                title: "Recycling Initiative",
                description: "Send back worn-out garments (any brand) for responsible recycling. We'll ensure they're processed into new materials.",
              },
              {
                title: "Design for Longevity",
                description: "Every piece is designed with durability in mind—timeless styles, reinforced construction, and quality materials that last.",
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="p-6 bg-gravix-gray-50 md:p-12"
              >
                <h3 className="mb-3 text-xl font-light md:text-2xl">{item.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-gravix-gray-700 md:text-base md:mb-6">
                  {item.description}
                </p>
                <motion.button 
                  whileHover={{ x: 5 }}
                  className="text-xs tracking-widest transition-colors hover:text-gravix-gray-600 md:text-sm"
                >
                  LEARN MORE →
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Transparency Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 bg-gravix-gray-50 md:py-32"
      >
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6 text-2xl tracking-tight font-Break md:text-4xl lg:text-5xl md:mb-8">
              TRANSPARENCY
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-gravix-gray-700 md:text-base lg:text-lg md:mb-12">
              We believe in complete transparency about our practices, supply chain, 
              and impact. Every quarter, we publish detailed sustainability reports 
              covering our progress, challenges, and goals.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 text-xs tracking-widest text-white transition-colors bg-gravix-black hover:bg-gravix-gray-800 md:px-12 md:py-4 md:text-sm"
            >
              READ OUR LATEST REPORT
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Future Goals */}
      <div className="container px-4 py-16 mx-auto md:py-32">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-3xl tracking-tight text-center font-Break md:text-5xl lg:text-6xl md:mb-20"
          >
            OUR 2030 GOALS
          </motion.h2>
          
          <div className="space-y-6 md:space-y-8">
            {[
              {
                title: "100% Renewable Energy",
                description: "Power all our operations and partner facilities with renewable energy sources"
              },
              {
                title: "Carbon Neutral Supply Chain",
                description: "Achieve net-zero carbon emissions across our entire supply chain"
              },
              {
                title: "Zero Waste to Landfill",
                description: "Ensure no textile waste from production goes to landfills through recycling and upcycling"
              },
              {
                title: "Regenerative Agriculture",
                description: "Source 100% of natural fibers from regenerative farming practices"
              }
            ].map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 10 }}
                className="py-3 pl-6 border-l-4 border-gravix-black md:py-4 md:pl-8"
              >
                <h3 className="mb-2 text-lg font-light md:text-2xl">{goal.title}</h3>
                <p className="text-sm leading-relaxed text-gravix-gray-700 md:text-base">
                  {goal.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 text-white bg-gravix-black md:py-24"
      >
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-4 text-2xl tracking-tight font-Break md:text-4xl lg:text-5xl md:mb-6">
            JOIN OUR JOURNEY
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-sm text-gravix-gray-400 md:text-base lg:text-lg md:mb-8">
            Every purchase supports our mission to create a more sustainable fashion industry. 
            Together, we can make a difference.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 text-xs tracking-widest transition-colors bg-white text-gravix-black hover:bg-gravix-gray-100 md:px-12 md:py-4 md:text-sm"
          >
            SHOP SUSTAINABLE COLLECTION
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}