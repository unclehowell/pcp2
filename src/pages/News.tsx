import React from 'react';
import { NEWS_ITEMS } from '../constants';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

export const News: React.FC = () => {
  return (
    <div className="pb-24">
      {/* Header */}
      <section className="bg-brand-primary text-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">News & Updates</h1>
          <p className="text-xl text-gray-400 max-w-2xl font-light">
            Stay up to date with the latest FCA investigations, court rulings, and campaign milestones.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-16">
            {NEWS_ITEMS.map((item) => (
              <article key={item.id} className="group">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                  <div className="md:col-span-2 aspect-video md:aspect-square bg-gray-100 overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/${item.slug}/800/800`} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="md:col-span-3 space-y-4">
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.date}</span>
                      <span className="flex items-center gap-1 text-brand-accent"><Tag className="w-3 h-3" /> {item.category}</span>
                    </div>
                    <h2 className="text-3xl font-serif group-hover:text-brand-accent transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {item.excerpt}
                    </p>
                    <button className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                      Read Full Article <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="space-y-12">
            {/* Categories */}
            <div className="p-8 bg-gray-50 border border-gray-100">
              <h3 className="font-serif text-xl mb-6">Categories</h3>
              <ul className="space-y-4">
                {['FCA Updates', 'Court Rulings', 'Consumer Stories', 'Campaign News'].map((cat) => (
                  <li key={cat}>
                    <button className="text-sm text-gray-500 hover:text-brand-accent flex justify-between w-full group">
                      <span>{cat}</span>
                      <span className="text-xs text-gray-300 group-hover:text-brand-accent">(12)</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Twitter Feed Simulation */}
            <div className="p-8 bg-white border border-gray-100 shadow-sm">
              <h3 className="font-serif text-xl mb-6">Campaign Feed</h3>
              <div className="space-y-6">
                {[
                  { user: '@PCPRefund', text: 'BREAKING: New evidence suggests over 90% of car finance deals between 2007-2021 were mis-sold. #PCPClaims #Justice', time: '2h ago' },
                  { user: '@PCPRefund', text: 'Join the thousands already reclaiming. Check your eligibility in 60 seconds on our site.', time: '5h ago' }
                ].map((tweet, i) => (
                  <div key={i} className="space-y-2 pb-6 border-b border-gray-100 last:border-0">
                    <p className="text-xs font-bold text-brand-primary">{tweet.user}</p>
                    <p className="text-sm text-gray-600">{tweet.text}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">{tweet.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
