export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-gravix-gray-900">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80" 
            alt="Fashion atelier"
            className="object-cover w-full h-full opacity-40"
          />
        </div>
        <div className="relative flex items-center justify-center h-full px-4">
          <div className="text-center">
            <h1 className="mb-6 tracking-tight text-white font-Break text-7xl md:text-9xl">
              GRAVIX
            </h1>
            <p className="text-xl font-light tracking-widest text-white md:text-2xl">
              REDEFINING MINIMALISM
            </p>
          </div>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="container px-4 py-32 mx-auto">
        <div className="grid items-center max-w-6xl grid-cols-1 gap-16 mx-auto md:grid-cols-2">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80" 
              alt="Fabric detail"
              className="w-full h-[600px] object-cover"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-5xl tracking-tight font-Break md:text-6xl">
              OUR<br/>PHILOSOPHY
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-gravix-gray-700">
              <p>
                At GRAVIX, we believe that great clothing should be simple, comfortable, 
                and built to last. We strip away the unnecessary to focus on what truly 
                matters: exceptional materials, perfect fit, and timeless design.
              </p>
              <p>
                Every piece in our collection is carefully crafted to become a staple 
                in your wardrobe, designed to be worn and loved for years to come.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Image Break */}
      <div className="w-full h-[70vh]">
        <img 
          src="https://images.unsplash.com/photo-1558769132-cb1aea18f4d8?w=1600&q=80" 
          alt="Craftsmanship"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Craftsmanship Section */}
      <div className="container px-4 py-32 mx-auto">
        <div className="grid items-center max-w-6xl grid-cols-1 gap-16 mx-auto md:grid-cols-2">
          <div className="order-2 space-y-8 md:order-1">
            <h2 className="text-5xl tracking-tight font-Break md:text-6xl">
              QUALITY<br/>CRAFTSMANSHIP
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-gravix-gray-700">
              <p>
                We partner with ethical manufacturers who share our commitment to 
                quality and sustainability. Each garment undergoes rigorous quality 
                control to ensure it meets our high standards.
              </p>
              <p>
                From the selection of fabrics to the final stitch, every detail is 
                considered to deliver clothing that not only looks good but feels 
                exceptional to wear.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80" 
              alt="Design process"
              className="w-full h-[600px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Values Grid */}
      <div className="py-32 text-white bg-gravix-black">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="mb-20 text-5xl tracking-tight text-center font-Break md:text-7xl">
              OUR VALUES
            </h2>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              <div className="space-y-4">
                <div className="text-6xl font-light">01</div>
                <h3 className="text-2xl font-light tracking-wide">SUSTAINABILITY</h3>
                <p className="leading-relaxed text-gravix-gray-400">
                  We're committed to creating clothing that respects both people and the planet 
                  through sustainable materials and transparent supply chains.
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-6xl font-light">02</div>
                <h3 className="text-2xl font-light tracking-wide">TIMELESSNESS</h3>
                <p className="leading-relaxed text-gravix-gray-400">
                  Our designs transcend fleeting trends, focusing on pieces that remain 
                  relevant and elegant season after season.
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-6xl font-light">03</div>
                <h3 className="text-2xl font-light tracking-wide">EXCELLENCE</h3>
                <p className="leading-relaxed text-gravix-gray-400">
                  Every detail matters. From fabric selection to the final stitch, 
                  we maintain uncompromising standards of quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Commitment Section */}
      <div className="relative h-[80vh]">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80" 
            alt="Nature"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="relative flex items-center justify-center h-full px-4">
          <div className="max-w-3xl p-12 text-center bg-white/95">
            <h2 className="mb-6 text-4xl tracking-tight font-Break md:text-5xl">
              OUR COMMITMENT
            </h2>
            <p className="text-lg leading-relaxed text-gravix-gray-700">
              We're committed to creating clothing that respects both people and the planet. 
              This means fair working conditions, sustainable materials, and a transparent 
              supply chain. Every piece tells a story of conscious creation.
            </p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-24 bg-gravix-gray-50">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-6 text-4xl tracking-tight font-Break md:text-5xl">
            DISCOVER THE COLLECTION
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-gravix-gray-600">
            Experience minimalism redefined. Explore our carefully curated selection 
            of timeless essentials.
          </p>
          <button className="px-12 py-4 text-sm tracking-widest text-white transition-colors bg-gravix-black hover:bg-gravix-gray-800">
            SHOP NOW
          </button>
        </div>
      </div>
    </div>
  )
}