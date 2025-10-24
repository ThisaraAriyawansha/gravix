'use client'


export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-gravix-gray-900">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80" 
            alt="Sustainable materials"
            className="object-cover w-full h-full opacity-50"
          />
        </div>
        <div className="relative flex items-center justify-center h-full px-4">
          <div className="max-w-4xl text-center">
            <h1 className="mb-6 text-6xl tracking-tight text-white font-Break md:text-9xl">
              SUSTAINABILITY
            </h1>
            <p className="text-xl font-light leading-relaxed text-white md:text-2xl">
              Our commitment to creating fashion that respects people and planet
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="container px-4 py-32 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-8 text-4xl tracking-tight font-Break md:text-6xl">
            OUR MISSION
          </h2>
          <p className="text-xl leading-relaxed text-gravix-gray-700">
            At GRAVIX, sustainability isn't an afterthought—it's the foundation of everything 
            we do. We believe that timeless design and environmental responsibility go hand in hand, 
            creating clothing that's built to last and made with care for our planet.
          </p>
        </div>
      </div>

      {/* Materials Section */}
      <div className="py-32 bg-gravix-gray-50">
        <div className="container px-4 mx-auto">
          <div className="grid items-center max-w-6xl grid-cols-1 gap-16 mx-auto md:grid-cols-2">
            <div className="order-2 md:order-1">
              <h2 className="mb-8 text-5xl tracking-tight font-Break">
                SUSTAINABLE<br/>MATERIALS
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-gravix-gray-700">
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
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-6 bg-white">
                  <div className="mb-2 text-4xl font-light">85%</div>
                  <p className="text-sm tracking-wider">Organic Materials</p>
                </div>
                <div className="p-6 bg-white">
                  <div className="mb-2 text-4xl font-light">100%</div>
                  <p className="text-sm tracking-wider">Recycled Packaging</p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" 
                alt="Organic cotton"
                className="w-full h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ethical Manufacturing */}
      <div className="container px-4 py-32 mx-auto">
        <div className="grid items-center max-w-6xl grid-cols-1 gap-16 mx-auto md:grid-cols-2">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&q=80" 
              alt="Manufacturing"
              className="w-full h-[600px] object-cover"
            />
          </div>
          <div>
            <h2 className="mb-8 text-5xl tracking-tight font-Break">
              ETHICAL<br/>MANUFACTURING
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-gravix-gray-700">
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
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-gravix-black"></div>
                <span className="text-sm tracking-wider">Fair Labor Association Certified</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-gravix-black"></div>
                <span className="text-sm tracking-wider">SA8000 Social Accountability</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-gravix-black"></div>
                <span className="text-sm tracking-wider">WRAP Certified Facilities</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="py-32 text-white bg-gravix-black">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="mb-20 text-5xl tracking-tight text-center font-Break md:text-6xl">
              ENVIRONMENTAL IMPACT
            </h2>
            
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-4 text-6xl font-light">-40%</div>
                <h3 className="mb-4 text-xl font-light tracking-wide">Water Usage</h3>
                <p className="leading-relaxed text-gravix-gray-400">
                  Compared to conventional cotton production through our sustainable sourcing practices
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-4 text-6xl font-light">-65%</div>
                <h3 className="mb-4 text-xl font-light tracking-wide">Carbon Emissions</h3>
                <p className="leading-relaxed text-gravix-gray-400">
                  Reduction through renewable energy use and optimized logistics
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-4 text-6xl font-light">0</div>
                <h3 className="mb-4 text-xl font-light tracking-wide">Plastic Packaging</h3>
                <p className="leading-relaxed text-gravix-gray-400">
                  All packaging is recyclable, compostable, or made from recycled materials
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Circular Fashion */}
      <div className="container px-4 py-32 mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-12 text-5xl tracking-tight text-center font-Break md:text-6xl">
            CIRCULAR FASHION
          </h2>
          <p className="max-w-3xl mx-auto mb-20 text-xl leading-relaxed text-center text-gravix-gray-700">
            We're building a circular model where nothing goes to waste
          </p>
          
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="p-12 bg-gravix-gray-50">
              <h3 className="mb-4 text-2xl font-light">Repair & Care</h3>
              <p className="mb-6 leading-relaxed text-gravix-gray-700">
                We offer free repairs for the lifetime of your garment. Our detailed care 
                guides help you maintain your pieces for years to come.
              </p>
              <button className="text-sm tracking-widest transition-colors hover:text-gravix-gray-600">
                LEARN MORE →
              </button>
            </div>
            
            <div className="p-12 bg-gravix-gray-50">
              <h3 className="mb-4 text-2xl font-light">Resale Program</h3>
              <p className="mb-6 leading-relaxed text-gravix-gray-700">
                Trade in your pre-loved GRAVIX pieces for store credit. We'll clean, 
                repair, and resell them, extending their life cycle.
              </p>
              <button className="text-sm tracking-widest transition-colors hover:text-gravix-gray-600">
                LEARN MORE →
              </button>
            </div>
            
            <div className="p-12 bg-gravix-gray-50">
              <h3 className="mb-4 text-2xl font-light">Recycling Initiative</h3>
              <p className="mb-6 leading-relaxed text-gravix-gray-700">
                Send back worn-out garments (any brand) for responsible recycling. 
                We'll ensure they're processed into new materials.
              </p>
              <button className="text-sm tracking-widest transition-colors hover:text-gravix-gray-600">
                LEARN MORE →
              </button>
            </div>
            
            <div className="p-12 bg-gravix-gray-50">
              <h3 className="mb-4 text-2xl font-light">Design for Longevity</h3>
              <p className="mb-6 leading-relaxed text-gravix-gray-700">
                Every piece is designed with durability in mind—timeless styles, 
                reinforced construction, and quality materials that last.
              </p>
              <button className="text-sm tracking-widest transition-colors hover:text-gravix-gray-600">
                LEARN MORE →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transparency Section */}
      <div className="py-32 bg-gravix-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-8 text-4xl tracking-tight font-Break md:text-5xl">
              TRANSPARENCY
            </h2>
            <p className="mb-12 text-lg leading-relaxed text-gravix-gray-700">
              We believe in complete transparency about our practices, supply chain, 
              and impact. Every quarter, we publish detailed sustainability reports 
              covering our progress, challenges, and goals.
            </p>
            <button className="px-12 py-4 text-sm tracking-widest text-white transition-colors bg-gravix-black hover:bg-gravix-gray-800">
              READ OUR LATEST REPORT
            </button>
          </div>
        </div>
      </div>

      {/* Future Goals */}
      <div className="container px-4 py-32 mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-20 text-5xl tracking-tight text-center font-Break md:text-6xl">
            OUR 2030 GOALS
          </h2>
          
          <div className="space-y-8">
            <div className="py-4 pl-8 border-l-4 border-gravix-black">
              <h3 className="mb-3 text-2xl font-light">100% Renewable Energy</h3>
              <p className="leading-relaxed text-gravix-gray-700">
                Power all our operations and partner facilities with renewable energy sources
              </p>
            </div>
            
            <div className="py-4 pl-8 border-l-4 border-gravix-black">
              <h3 className="mb-3 text-2xl font-light">Carbon Neutral Supply Chain</h3>
              <p className="leading-relaxed text-gravix-gray-700">
                Achieve net-zero carbon emissions across our entire supply chain
              </p>
            </div>
            
            <div className="py-4 pl-8 border-l-4 border-gravix-black">
              <h3 className="mb-3 text-2xl font-light">Zero Waste to Landfill</h3>
              <p className="leading-relaxed text-gravix-gray-700">
                Ensure no textile waste from production goes to landfills through recycling and upcycling
              </p>
            </div>
            
            <div className="py-4 pl-8 border-l-4 border-gravix-black">
              <h3 className="mb-3 text-2xl font-light">Regenerative Agriculture</h3>
              <p className="leading-relaxed text-gravix-gray-700">
                Source 100% of natural fibers from regenerative farming practices
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 text-white bg-gravix-black">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-6 text-4xl tracking-tight font-Break md:text-5xl">
            JOIN OUR JOURNEY
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-gravix-gray-400">
            Every purchase supports our mission to create a more sustainable fashion industry. 
            Together, we can make a difference.
          </p>
          <button className="px-12 py-4 text-sm tracking-widest transition-colors bg-white text-gravix-black hover:bg-gravix-gray-100">
            SHOP SUSTAINABLE COLLECTION
          </button>
        </div>
      </div>
    </div>
  );
}