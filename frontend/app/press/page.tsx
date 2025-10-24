'use client'


export default function PressPage() {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-gravix-black">
        <div className="relative flex items-center justify-center h-full px-4">
          <div className="text-center">
            <h1 className="mb-6 text-6xl tracking-tight text-white font-Break md:text-9xl">
              PRESS
            </h1>
            <p className="text-lg font-light tracking-widest text-white md:text-xl">
              NEWS, MEDIA & BRAND RESOURCES
            </p>
          </div>
        </div>
      </div>

      {/* Press Contact */}
      <div className="py-16 bg-gravix-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6 text-2xl font-light">Media Inquiries</h2>
            <p className="mb-4 text-gravix-gray-700">
              For press inquiries, interview requests, or high-resolution images, please contact:
            </p>
            <a href="mailto:press@gravix.com" className="text-xl transition-colors text-gravix-black hover:text-gravix-gray-600">
              press@gravix.com
            </a>
          </div>
        </div>
      </div>

      {/* Latest Press Releases */}
      <div className="container px-4 py-32 mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-16 text-5xl tracking-tight font-Break md:text-6xl">
            LATEST NEWS
          </h2>
          
          <div className="space-y-12">
            {pressReleases.map((release, index) => (
              <div key={index} className="pb-12 border-b border-gravix-gray-200">
                <div className="mb-3 text-sm tracking-widest text-gravix-gray-600">
                  {release.date}
                </div>
                <h3 className="mb-4 text-3xl font-light transition-colors cursor-pointer hover:text-gravix-gray-600">
                  {release.title}
                </h3>
                <p className="mb-4 text-lg leading-relaxed text-gravix-gray-700">
                  {release.excerpt}
                </p>
                <button className="text-sm tracking-widest transition-colors hover:text-gravix-gray-600">
                  READ FULL RELEASE →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Media Coverage */}
      <div className="py-32 bg-gravix-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="mb-16 text-5xl tracking-tight font-Break md:text-6xl">
              IN THE MEDIA
            </h2>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {mediaFeatures.map((feature, index) => (
                <div key={index} className="p-8 transition-shadow bg-white hover:shadow-lg">
                  <div className="mb-3 text-xs tracking-widest text-gravix-gray-600">
                    {feature.publication}
                  </div>
                  <h3 className="mb-3 text-xl font-light">
                    {feature.title}
                  </h3>
                  <div className="text-sm text-gravix-gray-600">
                    {feature.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Brand Assets */}
      <div className="container px-4 py-32 mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-16 text-5xl tracking-tight font-Break md:text-6xl">
            BRAND ASSETS
          </h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-8 text-center bg-gravix-gray-50">
              <div className="w-20 h-20 mx-auto mb-6 bg-gravix-black"></div>
              <h3 className="mb-3 text-xl font-light">Logo Pack</h3>
              <p className="mb-6 text-sm text-gravix-gray-700">
                Official GRAVIX logos in various formats
              </p>
              <button className="text-sm tracking-widest transition-colors hover:text-gravix-gray-600">
                DOWNLOAD
              </button>
            </div>
            
            <div className="p-8 text-center bg-gravix-gray-50">
              <div className="w-20 h-20 mx-auto mb-6 bg-gravix-black"></div>
              <h3 className="mb-3 text-xl font-light">Brand Guidelines</h3>
              <p className="mb-6 text-sm text-gravix-gray-700">
                Comprehensive brand usage guide
              </p>
              <button className="text-sm tracking-widest transition-colors hover:text-gravix-gray-600">
                DOWNLOAD
              </button>
            </div>
            
            <div className="p-8 text-center bg-gravix-gray-50">
              <div className="w-20 h-20 mx-auto mb-6 bg-gravix-black"></div>
              <h3 className="mb-3 text-xl font-light">Press Kit</h3>
              <p className="mb-6 text-sm text-gravix-gray-700">
                High-resolution images and fact sheet
              </p>
              <button className="text-sm tracking-widest transition-colors hover:text-gravix-gray-600">
                DOWNLOAD
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About GRAVIX Section */}
      <div className="py-32 text-white bg-gravix-black">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-12 text-4xl tracking-tight font-Break md:text-5xl">
              ABOUT GRAVIX
            </h2>
            
            <div className="space-y-6 text-lg leading-relaxed text-gravix-gray-400">
              <p>
                GRAVIX is a contemporary fashion brand founded on the principles of minimalism, 
                quality, and sustainability. Established in 2020, the company has quickly become 
                a leader in timeless, essential clothing designed for modern living.
              </p>
              <p>
                With a commitment to ethical manufacturing and environmental responsibility, 
                GRAVIX partners with certified facilities around the world to create garments 
                that are built to last. The brand's aesthetic is defined by clean lines, neutral 
                palettes, and versatile silhouettes that transcend seasonal trends.
              </p>
              <p>
                GRAVIX operates primarily online, reaching customers in over 50 countries. The 
                brand has been featured in leading publications including Vogue, GQ, and The New 
                York Times, and has received recognition for its sustainable practices and design 
                excellence.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-16 mt-16 border-t md:grid-cols-4 border-gravix-gray-700">
              <div>
                <div className="mb-2 text-3xl font-light">2020</div>
                <p className="text-sm text-gravix-gray-500">Founded</p>
              </div>
              <div>
                <div className="mb-2 text-3xl font-light">50+</div>
                <p className="text-sm text-gravix-gray-500">Countries</p>
              </div>
              <div>
                <div className="mb-2 text-3xl font-light">100%</div>
                <p className="text-sm text-gravix-gray-500">Sustainable</p>
              </div>
              <div>
                <div className="mb-2 text-3xl font-light">B Corp</div>
                <p className="text-sm text-gravix-gray-500">Certified</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Contacts */}
      <div className="container px-4 py-32 mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-16 text-5xl tracking-tight font-Break md:text-6xl">
            KEY CONTACTS
          </h2>
          
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div>
              <h3 className="mb-3 text-sm tracking-widest text-gravix-gray-600">
                PRESS INQUIRIES
              </h3>
              <p className="mb-2 text-xl font-light">Sarah Mitchell</p>
              <p className="mb-1 text-gravix-gray-700">Director of Communications</p>
              <a href="mailto:press@gravix.com" className="transition-colors text-gravix-gray-700 hover:text-gravix-black">
                press@gravix.com
              </a>
            </div>
            
            <div>
              <h3 className="mb-3 text-sm tracking-widest text-gravix-gray-600">
                PARTNERSHIP INQUIRIES
              </h3>
              <p className="mb-2 text-xl font-light">Marcus Chen</p>
              <p className="mb-1 text-gravix-gray-700">Head of Partnerships</p>
              <a href="mailto:partnerships@gravix.com" className="transition-colors text-gravix-gray-700 hover:text-gravix-black">
                partnerships@gravix.com
              </a>
            </div>
            
            <div>
              <h3 className="mb-3 text-sm tracking-widest text-gravix-gray-600">
                GENERAL INQUIRIES
              </h3>
              <p className="mb-2 text-xl font-light">Media Relations</p>
              <p className="mb-1 text-gravix-gray-700">GRAVIX Team</p>
              <a href="mailto:hello@gravix.com" className="transition-colors text-gravix-gray-700 hover:text-gravix-black">
                hello@gravix.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="py-24 bg-gravix-gray-50">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-6 text-4xl tracking-tight font-Break md:text-5xl">
            STAY UPDATED
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-gravix-gray-700">
            Subscribe to receive the latest press releases and brand news
          </p>
          <div className="flex max-w-md gap-4 mx-auto">
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="flex-1 px-6 py-4 transition-colors border border-gravix-gray-300 focus:border-gravix-black focus:outline-none"
            />
            <button className="px-8 py-4 text-sm tracking-widest text-white transition-colors bg-gravix-black hover:bg-gravix-gray-800">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}