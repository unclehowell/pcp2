import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'News & Updates', path: '/news' },
    { name: 'About Campaign', path: '/about' },
    { name: 'Claim Now', path: '/claim', highlight: true },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-brand-accent" />
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold leading-tight tracking-tight">PCP REFUND</span>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Reclaiming mis-sold car finance</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                    link.highlight
                      ? 'bg-brand-primary text-white px-4 py-2 hover:bg-brand-accent'
                      : 'text-gray-600 hover:text-brand-accent'
                  } ${location.pathname === link.path && !link.highlight ? 'text-brand-accent' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-serif"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">{children}</main>

      {/* Global CTA */}
      <section className="bg-brand-primary text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif">Start Your Claim Today</h2>
          <p className="text-xl text-gray-400 font-light">
            Don't let mis-sold car finance go unchallenged. Join thousands of others in the fight for justice.
          </p>
          <Link to="/claim" className="inline-block btn-primary bg-brand-accent hover:bg-white hover:text-brand-primary">
            Claim Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-brand-accent" />
                <span className="text-lg font-serif font-bold">PCP REFUND</span>
              </div>
              <p className="text-sm text-gray-600 max-w-md">
                Dedicated to helping UK consumers recover compensation for mis-sold PCP and Hire Purchase agreements.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold uppercase tracking-widest text-xs mb-4">Campaign</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/news">Latest News</Link></li>
                  <li><Link to="/claim">Check Eligibility</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-widest text-xs mb-4">Contact</h4>
                <p className="text-sm text-gray-500">info@jigsawclaims.co.uk</p>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200">
            <p className="text-[11px] leading-relaxed text-gray-500 text-justify md:text-left">
              PCP Refund is a trading name of Jigsaw Claims Ltd, authorised and regulated by the Financial Conduct Authority (FCA) for claims management activities (FRN: 912323). Registered Address: 66 Seymour Grove, Manchester, M16 0LN. Contact: info@jigsawclaims.co.uk. We will receive referral fees from third parties for successful claims at no cost to you. Using our service does not guarantee a faster or better outcome. You can also claim for free through your lender, the Financial Ombudsman Service, or the FCA compensation scheme launching in 2026.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
