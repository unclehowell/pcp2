import React from 'react';
import { Shield, Info, HelpCircle, Scale } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="pb-24">
      {/* Header */}
      <section className="bg-brand-primary text-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">About the Campaign</h1>
          <p className="text-xl text-gray-400 max-w-2xl font-light">
            Understanding the PCP mis-selling scandal and why we are fighting for consumer rights.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-24 space-y-24">
        {/* What is PCP */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 text-brand-accent">
            <Info className="w-8 h-8" />
            <h2 className="text-3xl font-serif text-brand-primary">What is PCP Finance?</h2>
          </div>
          <div className="prose prose-lg text-gray-600 max-w-none space-y-6">
            <p>
              Personal Contract Purchase (PCP) is a type of hire purchase agreement for vehicles. It's popular because it offers lower monthly payments by deferring a large portion of the car's value to a "balloon payment" at the end of the term.
            </p>
            <p>
              While the product itself is legitimate, the way it was sold to millions of UK consumers was often unfair and lacked transparency.
            </p>
          </div>
        </section>

        {/* How Mis-selling Occurred */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 text-brand-accent">
            <Scale className="w-8 h-8" />
            <h2 className="text-3xl font-serif text-brand-primary">How Mis-selling Occurred</h2>
          </div>
          <div className="prose prose-lg text-gray-600 max-w-none space-y-6">
            <p>
              The core of the scandal lies in "Discretionary Commission Arrangements" (DCAs). Lenders allowed car dealers to set the interest rate for the customer. The higher the interest rate the dealer could convince the customer to pay, the more commission the dealer received.
            </p>
            <p>
              This created a massive incentive for dealers to overcharge customers, often without disclosing that they were receiving a commission at all, let alone one tied to the interest rate.
            </p>
          </div>
        </section>

        {/* Why Consumers Were Affected */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 text-brand-accent">
            <Users className="w-8 h-8" />
            <h2 className="text-3xl font-serif text-brand-primary">Why Consumers Were Affected</h2>
          </div>
          <div className="prose prose-lg text-gray-600 max-w-none space-y-6">
            <p>
              Millions of people across the UK took out car finance between 2007 and 2021. Many of these people were hard-working individuals who trusted their local car dealers to provide a fair deal.
            </p>
            <p>
              Instead, they were often treated as profit centers, with hidden fees and inflated rates adding thousands of pounds to the cost of their vehicles. This campaign is about reclaiming that money and ensuring it goes back to the people it was taken from.
            </p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="bg-gray-50 p-12 text-center space-y-6 border border-gray-100">
          <Shield className="w-16 h-16 mx-auto text-brand-accent" />
          <h2 className="text-3xl font-serif">Our Mission</h2>
          <p className="text-xl text-gray-600 italic font-light">
            "To provide every mis-sold consumer with the tools, information, and legal support needed to reclaim what is rightfully theirs, while driving systemic change in the UK finance industry."
          </p>
        </section>
      </div>
    </div>
  );
};

const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);
