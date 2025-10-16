import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-5xl font-bold mb-8 tracking-tight">ABOUT GRAVIX</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Founded on the principles of minimalism and quality, GRAVIX represents a new approach
              to contemporary fashion. We believe that less is more, and every piece in our collection
              reflects this philosophy.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4">Our Philosophy</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              In a world of fast fashion and fleeting trends, we stand for something different.
              Our designs are timeless, our materials are premium, and our commitment to sustainability
              is unwavering. Each piece is carefully crafted to become a staple in your wardrobe,
              designed to last and transcend seasons.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4">Quality First</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We source only the finest materials and work with skilled artisans to ensure that every
              garment meets our exacting standards. From the initial design to the final stitch,
              quality is our guiding principle.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4">Sustainable Practices</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We are committed to reducing our environmental impact. Our products are made with
              sustainable materials, and we work with partners who share our values of ethical
              production and fair labor practices.
            </p>

            <div className="bg-black text-white p-12 mt-16 text-center">
              <p className="text-2xl font-light italic">
                "Simplicity is the ultimate sophistication."
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
