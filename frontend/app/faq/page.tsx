'use client'


import { useState } from 'react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFAQ = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      category: "ORDERING & PAYMENT",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All payments are processed securely through our encrypted payment gateway."
        },
        {
          question: "Can I modify or cancel my order?",
          answer: "Orders can be modified or cancelled within 1 hour of placement. Please contact our customer service team immediately at support@gravix.com. Once an order has been processed for shipment, we cannot make changes."
        },
        {
          question: "Do you offer gift cards?",
          answer: "Yes, GRAVIX gift cards are available in denominations of $50, $100, $200, and $500. They can be purchased on our website and are delivered via email. Gift cards never expire and can be used for any purchase."
        },
        {
          question: "Is my payment information secure?",
          answer: "Absolutely. We use industry-standard SSL encryption to protect your payment information. We never store your complete credit card details on our servers. All transactions are processed through secure, PCI-compliant payment processors."
        }
      ]
    },
    {
      category: "SHIPPING & DELIVERY",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping within the US takes 3-5 business days. Express shipping (2-3 business days) and overnight shipping are available at checkout. International shipping times vary by destination, typically 7-14 business days."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary by destination. Please note that international customers are responsible for any customs duties, taxes, or fees imposed by their country."
        },
        {
          question: "How can I track my order?",
          answer: "Once your order ships, you'll receive a confirmation email with a tracking number. You can track your package directly through the carrier's website or by logging into your GRAVIX account and viewing your order history."
        },
        {
          question: "What if my package is lost or damaged?",
          answer: "If your package appears lost or arrives damaged, please contact us immediately at support@gravix.com with your order number and photos (if damaged). We'll work with the carrier to resolve the issue and will send a replacement if necessary."
        }
      ]
    },
    {
      category: "RETURNS & EXCHANGES",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy from the date of delivery. Items must be unworn, unwashed, and in original condition with all tags attached. Sale items and final sale items cannot be returned. Return shipping is free for US customers."
        },
        {
          question: "How do I initiate a return?",
          answer: "Log into your account and navigate to your order history. Select the items you wish to return and follow the prompts. You'll receive a prepaid return label via email. Pack your items securely and drop them off at any authorized carrier location."
        },
        {
          question: "Can I exchange an item?",
          answer: "Yes, we offer exchanges for different sizes or colors within 30 days of delivery. To exchange an item, please initiate a return and place a new order for your desired item to ensure fastest delivery of your preferred choice."
        },
        {
          question: "When will I receive my refund?",
          answer: "Refunds are processed within 5-7 business days of receiving your return at our warehouse. The refund will be credited to your original payment method. Please allow an additional 5-10 business days for the refund to appear in your account, depending on your bank."
        }
      ]
    },
    {
      category: "PRODUCTS & SIZING",
      questions: [
        {
          question: "How do I find my size?",
          answer: "Each product page includes a detailed size chart. We recommend measuring yourself and comparing your measurements to our size guide. If you're between sizes, we generally recommend sizing up for a more relaxed fit or sizing down for a more fitted look."
        },
        {
          question: "What materials do you use?",
          answer: "We use premium, sustainable materials including organic cotton, linen, merino wool, and recycled fabrics. Each product page lists the specific material composition and care instructions. We're committed to using ethically sourced, eco-friendly materials."
        },
        {
          question: "How should I care for my GRAVIX garments?",
          answer: "Each garment includes care instructions on the label. Generally, we recommend washing in cold water, using mild detergent, and air drying when possible. Avoid bleach and high heat. Proper care will help your GRAVIX pieces last for years."
        },
        {
          question: "Are your products true to size?",
          answer: "Yes, our products are designed to fit true to size based on standard US sizing. However, some styles are intentionally designed for a relaxed or oversized fit, which is noted in the product description. Always refer to the size chart for specific measurements."
        }
      ]
    },
    {
      category: "SUSTAINABILITY & ETHICS",
      questions: [
        {
          question: "Are your products sustainable?",
          answer: "Sustainability is core to our brand. We use organic and recycled materials, work with ethical manufacturers, minimize waste in production, and use eco-friendly packaging. We're continuously working to reduce our environmental impact."
        },
        {
          question: "Where are your products made?",
          answer: "Our products are manufactured in facilities across Portugal, Turkey, and Peru. We carefully vet all our manufacturing partners to ensure fair labor practices, safe working conditions, and quality craftsmanship. We maintain long-term relationships with our partners."
        },
        {
          question: "Do you use ethical manufacturing practices?",
          answer: "Absolutely. All our manufacturing partners are regularly audited for compliance with fair labor standards. We ensure fair wages, safe working conditions, and no child labor. Transparency and ethics are non-negotiable values for GRAVIX."
        },
        {
          question: "What is your packaging made from?",
          answer: "Our packaging is 100% recyclable and made from recycled materials. We use compostable mailers, recycled paper, and soy-based inks. We've eliminated all single-use plastics from our packaging and continuously seek more sustainable solutions."
        }
      ]
    },
    {
      category: "ACCOUNT & GENERAL",
      questions: [
        {
          question: "Do I need an account to place an order?",
          answer: "No, you can checkout as a guest. However, creating an account allows you to track orders, save your preferences, view order history, and checkout faster in the future. It's free and takes less than a minute to set up."
        },
        {
          question: "How do I reset my password?",
          answer: "Click on 'Sign In' at the top of the page, then select 'Forgot Password'. Enter your email address and we'll send you instructions to reset your password. If you don't receive the email within a few minutes, check your spam folder."
        },
        {
          question: "Can I subscribe to your newsletter?",
          answer: "Yes! Subscribe at the bottom of any page to receive exclusive updates, early access to new collections, styling tips, and special promotions. You can unsubscribe at any time by clicking the link at the bottom of any newsletter."
        },
        {
          question: "Do you have a physical store?",
          answer: "Currently, GRAVIX operates online only, allowing us to offer the best prices and reach customers worldwide. However, we occasionally host pop-up shops in select cities. Follow us on social media for announcements about upcoming events."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-gravix-black">
        <div className="relative flex items-center justify-center h-full px-4">
          <div className="text-center">
            <h1 className="mb-4 text-6xl tracking-tight text-white font-Break md:text-8xl">
              FAQ
            </h1>
            <p className="text-lg font-light tracking-widest text-white md:text-xl">
              FIND ANSWERS TO YOUR QUESTIONS
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="py-12 bg-gravix-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="SEARCH FOR ANSWERS..."
              className="w-full px-6 py-4 tracking-widest text-center transition-colors border-2 border-gravix-gray-300 focus:border-gravix-black focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="container px-4 py-24 mx-auto">
        <div className="max-w-4xl mx-auto space-y-16">
          {faqs.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h2 className="mb-8 text-3xl tracking-tight font-Break md:text-4xl">
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.questions.map((faq, faqIndex) => {
                  const globalIndex = `${sectionIndex}-${faqIndex}`;
                  const isOpen = openIndex === globalIndex;
                  
                  return (
                    <div 
                      key={faqIndex}
                      className="border-b border-gravix-gray-200"
                    >
                      <button
                        onClick={() => toggleFAQ(globalIndex)}
                        className="flex items-center justify-between w-full py-6 text-left transition-colors hover:text-gravix-gray-600"
                      >
                        <span className="pr-8 text-lg font-light">
                          {faq.question}
                        </span>
                        <span className="flex-shrink-0 text-2xl font-light">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="pb-6 leading-relaxed text-gravix-gray-700">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Still Have Questions Section */}
      <div className="py-24 text-white bg-gravix-black">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-6 text-4xl tracking-tight font-Break md:text-5xl">
            STILL HAVE QUESTIONS?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-gravix-gray-400">
            Our customer service team is here to help. Reach out and we'll get back 
            to you within 24 hours.
          </p>
          <button className="px-12 py-4 text-sm tracking-widest transition-colors bg-white text-gravix-black hover:bg-gravix-gray-100">
            CONTACT US
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="py-16 bg-gravix-gray-50">
        <div className="container px-4 mx-auto">
          <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto text-center md:grid-cols-3">
            <div>
              <h3 className="mb-3 text-sm tracking-widest text-gravix-gray-600">
                SHIPPING INFO
              </h3>
              <p className="text-gravix-gray-800">
                Learn about our shipping options and delivery times
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-sm tracking-widest text-gravix-gray-600">
                SIZE GUIDE
              </h3>
              <p className="text-gravix-gray-800">
                Find your perfect fit with our detailed size charts
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-sm tracking-widest text-gravix-gray-600">
                CARE GUIDE
              </h3>
              <p className="text-gravix-gray-800">
                Tips for maintaining your GRAVIX garments
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}