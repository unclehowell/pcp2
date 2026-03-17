import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Scale, Gavel, Users, Newspaper } from 'lucide-react';
import { NEWS_ITEMS } from '../constants';

export const Home: React.FC = () => {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-brand-primary">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2070" 
            alt="Car Finance" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/80 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight">
              Were You Mis-Sold <span className="text-brand-accent">Car Finance?</span>
            </h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed">
              Join thousands of motorists reclaiming what they're owed. The FCA is investigating secret commissions—you could be entitled to thousands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/claim" className="btn-primary bg-brand-accent hover:bg-white hover:text-brand-primary">
                Check Your Claim
              </Link>
              <Link to="/about" className="btn-outline border-white text-white hover:bg-white hover:text-brand-primary">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is PCP Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif">What is PCP Mis-selling?</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Personal Contract Purchase (PCP) is the most common way to finance a car in the UK. However, many lenders and dealers used "discretionary commission arrangements" to inflate interest rates without telling customers.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              This meant the more interest you paid, the more commission the dealer earned. This conflict of interest was hidden from you, and now the FCA is stepping in to ensure justice is served.
            </p>
            <ul className="space-y-4">
              {[
                'Hidden commissions paid to dealers',
                'Inflated interest rates to boost profits',
                'Lack of transparency in contract terms',
                'Unfair financial burden on consumers'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle2 className="text-brand-accent w-5 h-5" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2070" 
              alt="Legal Documentation" 
              className="shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-8 -left-8 bg-brand-accent p-8 text-white hidden md:block">
              <p className="text-3xl font-serif">£1,100</p>
              <p className="text-xs uppercase tracking-widest font-bold">Average Claim Value</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters (Campaign Tone) */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif">Why This Matters</h2>
            <p className="text-gray-600">This isn't just about money—it's about corporate accountability and consumer justice.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Scale, title: 'Justice for All', desc: 'Holding multi-billion pound lenders accountable for unfair practices.' },
              { icon: Gavel, title: 'Legal Precedent', desc: 'Setting a standard that protects future car buyers from hidden fees.' },
              { icon: Users, title: 'Community Power', desc: 'Joining a collective movement of thousands seeking what they are owed.' }
            ].map((item, i) => (
              <div key={i} className="space-y-4 p-8 bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <item.icon className="w-12 h-12 mx-auto text-brand-accent" />
                <h3 className="text-xl font-serif">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News & Updates */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <h2 className="text-4xl font-serif">Latest Updates</h2>
            <p className="text-gray-500">Stay informed with the latest campaign news.</p>
          </div>
          <Link to="/news" className="text-brand-accent font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:gap-4 transition-all">
            View All News <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_ITEMS.map((item) => (
            <article key={item.id} className="group cursor-pointer">
              <div className="aspect-video bg-gray-100 mb-6 overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/${item.slug}/800/450`} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent px-2 py-1 bg-brand-accent/10">
                  {item.category}
                </span>
                <h3 className="text-xl font-serif group-hover:text-brand-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">{item.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Real Stories / Case Studies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=2000" 
                alt="Consumer Success" 
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute top-8 right-8 bg-white p-6 shadow-xl max-w-xs">
              <p className="italic text-gray-600 mb-4">"I had no idea I was being overcharged. PCP Refund helped me get back £2,400 I didn't even know was missing."</p>
              <p className="font-bold text-sm">— David S., Manchester</p>
            </div>
          </div>
          <div className="space-y-8 order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-serif">Real Stories</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Thousands of people have already started their journey to reclaiming their money. Each case is a step towards a fairer financial system for everyone.
            </p>
            <div className="space-y-6">
              {[
                { name: 'Sarah L.', amount: '£1,850', story: 'Mis-sold commission on a 2018 BMW finance deal.' },
                { name: 'Mark T.', amount: '£3,100', story: 'Overcharged interest on two consecutive car agreements.' }
              ].map((story, i) => (
                <div key={i} className="flex gap-4 p-6 bg-gray-50 border-l-4 border-brand-accent">
                  <div className="flex-grow">
                    <p className="font-bold text-lg">{story.name} recovered {story.amount}</p>
                    <p className="text-sm text-gray-500">{story.story}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
