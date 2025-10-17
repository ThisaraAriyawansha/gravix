export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-light text-center mb-8">About GRAVIX</h1>
          
          <div className="prose prose-lg mx-auto">
            <p className="text-xl text-gravix-gray-700 text-center mb-12 leading-relaxed">
              Founded on the principles of minimalism and quality, GRAVIX brings you 
              clothing that transcends trends and focuses on timeless design.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-2xl font-light mb-4">Our Philosophy</h2>
                <p className="text-gravix-gray-700 mb-4">
                  At GRAVIX, we believe that great clothing should be simple, comfortable, 
                  and built to last. We strip away the unnecessary to focus on what truly 
                  matters: exceptional materials, perfect fit, and timeless design.
                </p>
                <p className="text-gravix-gray-700">
                  Every piece in our collection is carefully crafted to become a staple 
                  in your wardrobe, designed to be worn and loved for years to come.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-light mb-4">Quality Craftsmanship</h2>
                <p className="text-gravix-gray-700 mb-4">
                  We partner with ethical manufacturers who share our commitment to 
                  quality and sustainability. Each garment undergoes rigorous quality 
                  control to ensure it meets our high standards.
                </p>
                <p className="text-gravix-gray-700">
                  From the selection of fabrics to the final stitch, every detail is 
                  considered to deliver clothing that not only looks good but feels 
                  exceptional to wear.
                </p>
              </div>
            </div>
            
            <div className="bg-gravix-gray-50 p-8 text-center">
              <h2 className="text-2xl font-light mb-4">Our Commitment</h2>
              <p className="text-gravix-gray-700">
                We're committed to creating clothing that respects both people and the planet. 
                This means fair working conditions, sustainable materials, and a transparent 
                supply chain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}