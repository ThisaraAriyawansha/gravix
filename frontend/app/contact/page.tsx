'use client'


import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gravix-gray-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80" 
            alt="Contact"
            className="object-cover w-full h-full opacity-30"
          />
        </div>
        <div className="relative flex items-center justify-center h-full px-4">
          <div className="text-center">
            <h1 className="mb-4 text-6xl tracking-tight text-white font-Break md:text-8xl">
              GET IN TOUCH
            </h1>
            <p className="text-lg font-light tracking-widest text-white md:text-xl">
              WE'D LOVE TO HEAR FROM YOU
            </p>
          </div>
        </div>
      </div>

      {/* Contact Content */}
      <div className="container px-4 py-24 mx-auto">
        <div className="grid max-w-6xl grid-cols-1 gap-16 mx-auto lg:grid-cols-2">
          {/* Contact Form */}
          <div>
            <h2 className="mb-8 text-4xl tracking-tight font-Break">
              SEND US A MESSAGE
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
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
              </div>

              <div>
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
              </div>

              <div>
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
              </div>

              <div>
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
              </div>

              <button
                type="submit"
                className="w-full py-4 text-sm tracking-widest text-white transition-colors bg-gravix-black hover:bg-gravix-gray-800"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-12">
            <div>
              <h2 className="mb-8 text-4xl tracking-tight font-Break">
                CONTACT INFO
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 text-sm tracking-widest text-gravix-gray-600">
                    CUSTOMER SERVICE
                  </h3>
                  <p className="text-lg text-gravix-gray-800">
                    support@gravix.com
                  </p>
                  <p className="text-gravix-gray-600">
                    Mon - Fri: 9:00 AM - 6:00 PM EST
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-sm tracking-widest text-gravix-gray-600">
                    PRESS INQUIRIES
                  </h3>
                  <p className="text-lg text-gravix-gray-800">
                    press@gravix.com
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-sm tracking-widest text-gravix-gray-600">
                    WHOLESALE
                  </h3>
                  <p className="text-lg text-gravix-gray-800">
                    wholesale@gravix.com
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-sm tracking-widest text-gravix-gray-600">
                    ADDRESS
                  </h3>
                  <p className="text-gravix-gray-800">
                    123 Fashion Avenue<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-sm tracking-widest text-gravix-gray-600">
                    PHONE
                  </h3>
                  <p className="text-lg text-gravix-gray-800">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="mb-4 text-sm tracking-widest text-gravix-gray-600">
                FOLLOW US
              </h3>
              <div className="flex gap-6">
                <a href="#" className="transition-colors text-gravix-gray-800 hover:text-gravix-black">
                  <span className="text-lg tracking-wider">INSTAGRAM</span>
                </a>
                <a href="#" className="transition-colors text-gravix-gray-800 hover:text-gravix-black">
                  <span className="text-lg tracking-wider">TWITTER</span>
                </a>
                <a href="#" className="transition-colors text-gravix-gray-800 hover:text-gravix-black">
                  <span className="text-lg tracking-wider">FACEBOOK</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-gravix-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-16 text-4xl tracking-tight text-center font-Break md:text-5xl">
              FREQUENTLY ASKED
            </h2>
            
            <div className="space-y-8">
              <div className="p-8 bg-white">
                <h3 className="mb-3 text-xl font-light">What is your return policy?</h3>
                <p className="leading-relaxed text-gravix-gray-700">
                  We offer a 30-day return policy for all unworn items with original tags attached. 
                  Please contact our customer service team to initiate a return.
                </p>
              </div>

              <div className="p-8 bg-white">
                <h3 className="mb-3 text-xl font-light">How long does shipping take?</h3>
                <p className="leading-relaxed text-gravix-gray-700">
                  Standard shipping typically takes 3-5 business days within the US. International 
                  shipping times vary by location. Express shipping options are available at checkout.
                </p>
              </div>

              <div className="p-8 bg-white">
                <h3 className="mb-3 text-xl font-light">Do you offer international shipping?</h3>
                <p className="leading-relaxed text-gravix-gray-700">
                  Yes, we ship worldwide. Shipping costs and delivery times vary by destination. 
                  All applicable customs fees are the responsibility of the customer.
                </p>
              </div>

              <div className="p-8 bg-white">
                <h3 className="mb-3 text-xl font-light">How do I care for my GRAVIX garments?</h3>
                <p className="leading-relaxed text-gravix-gray-700">
                  Each garment comes with specific care instructions on the label. Generally, we 
                  recommend cold water washing and air drying to maintain the quality and longevity 
                  of your pieces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="h-[500px] bg-gravix-gray-200">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80" 
          alt="Location map"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}