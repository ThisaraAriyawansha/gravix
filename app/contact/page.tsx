import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-5xl font-bold mb-12 text-center tracking-tight">CONTACT US</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white mb-4">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">EMAIL</h3>
              <p className="text-gray-600">support@gravix.com</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white mb-4">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">PHONE</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">ADDRESS</h3>
              <p className="text-gray-600">
                123 Fashion Street<br />
                New York, NY 10001
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto bg-gray-50 p-12">
            <h2 className="text-2xl font-bold mb-6 text-center">GET IN TOUCH</h2>
            <p className="text-center text-gray-600 mb-8">
              Have a question or need assistance? We're here to help.
            </p>
            <div className="text-center">
              <a
                href="mailto:support@gravix.com"
                className="inline-block px-8 py-4 bg-black text-white hover:bg-gray-800 transition-colors"
              >
                SEND US AN EMAIL
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
