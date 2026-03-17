import React from 'react';
import { ClaimForm } from '../components/ClaimForm';
import { ShieldCheck, Clock, CheckCircle } from 'lucide-react';

export const Claim: React.FC = () => {
  return (
    <div className="pb-24">
      {/* Header */}
      <section className="bg-brand-primary text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">Check Your Claim</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Complete our simple enquiry form to see if you are eligible for a PCP car finance refund.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Form Column */}
          <div className="lg:col-span-2">
            <ClaimForm />
          </div>

          {/* Sidebar / Trust Indicators */}
          <div className="space-y-8">
            <div className="p-8 bg-gray-50 border border-gray-100 space-y-6">
              <h3 className="font-serif text-2xl">Why Choose Us?</h3>
              <div className="space-y-6">
                {[
                  { icon: ShieldCheck, title: 'FCA Regulated', desc: 'Authorised and regulated by the Financial Conduct Authority.' },
                  { icon: Clock, title: 'Quick Process', desc: 'Our initial check takes less than 60 seconds to complete.' },
                  { icon: CheckCircle, title: 'Expert Support', desc: 'Dedicated claims handlers to guide you through every step.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <item.icon className="w-6 h-6 text-brand-accent flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-brand-primary text-white space-y-4">
              <h3 className="font-serif text-xl">Next Steps</h3>
              <ol className="space-y-4 text-sm font-light text-gray-300">
                <li className="flex gap-3"><span className="font-bold text-brand-accent">01.</span> Submit your initial enquiry details.</li>
                <li className="flex gap-3"><span className="font-bold text-brand-accent">02.</span> We review your eligibility instantly.</li>
                <li className="flex gap-3"><span className="font-bold text-brand-accent">03.</span> Our team contacts you to finalize the claim.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
