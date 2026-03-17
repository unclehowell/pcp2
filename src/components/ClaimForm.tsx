import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { generateSessionId, getClientIp } from '../lib/utils';
import kountSDK from '@kount/kount-web-client-sdk';
import { useNavigate } from 'react-router-dom';

const STEPS = [
  { id: 'personal', title: 'Personal Details' },
  { id: 'address', title: 'Address' },
  { id: 'review', title: 'Review' }
];

export const ClaimForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState('');

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    phone: '',
    email: '',
    buildingNumber: '',
    thoroughfare: '',
    townOrCity: '',
    postcode: ''
  });

  useEffect(() => {
    // Initialize Kount Session
    let sid = sessionStorage.getItem('kount_session_id');
    if (!sid) {
      sid = generateSessionId();
      sessionStorage.setItem('kount_session_id', sid);
    }
    setSessionId(sid);

    const kountConfig = {
      clientID: import.meta.env.VITE_KOUNT_CLIENT_ID || '800000', // Fallback for demo
      environment: 'TEST',
      isSinglePageApp: true,
      callbacks: {
        'collect-begin': () => console.log('Kount collection started'),
        'collect-end': () => console.log('Kount collection completed')
      }
    };

    try {
      kountSDK(kountConfig, sid);
    } catch (e) {
      console.error('Kount initialization failed', e);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const clientIp = await getClientIp();
      const userAgent = navigator.userAgent;
      const affiliateId = import.meta.env.VITE_AFFILIATE_ID || 'default';
      const apiKey = import.meta.env.VITE_API_KEY || 'demo-key';

      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        date_of_birth: formData.date_of_birth,
        phone: formData.phone,
        email: formData.email,
        client_ip: clientIp,
        user_agent: userAgent,
        session_id: sessionId,
        addresses: {
          buildingNumber: formData.buildingNumber,
          thoroughfare: formData.thoroughfare,
          townOrCity: formData.townOrCity,
          postcode: formData.postcode
        }
      };

      const response = await fetch(`https://r2r.theclaimsystem.co.uk/api/v1/affiliate/${affiliateId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'API-KEY': apiKey
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        if (result.status === 'authentication-required') {
          // Handle OTP flow if needed
          // For now, redirect to thank you as per simple requirement
          navigate('/thank-you');
        } else {
          navigate('/thank-you');
        }
      } else {
        throw new Error(result.message || 'Submission failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-xl border border-gray-100">
      {/* Progress Indicator */}
      <div className="flex justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
        {STEPS.map((step, index) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                index <= currentStep ? 'bg-brand-primary border-brand-primary text-white' : 'bg-white border-gray-200 text-gray-400'
              }`}
            >
              {index < currentStep ? <CheckCircle2 className="w-6 h-6" /> : index + 1}
            </div>
            <span className={`text-[10px] uppercase tracking-widest mt-2 font-bold ${index <= currentStep ? 'text-brand-primary' : 'text-gray-400'}`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">First Name</label>
                  <input
                    required
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 focus:border-brand-accent outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Last Name</label>
                  <input
                    required
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 focus:border-brand-accent outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Date of Birth</label>
                <input
                  required
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 focus:border-brand-accent outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Phone Number</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 focus:border-brand-accent outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email Address</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 focus:border-brand-accent outline-none"
                />
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Building Number / Name</label>
                <input
                  required
                  name="buildingNumber"
                  value={formData.buildingNumber}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 focus:border-brand-accent outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Street Name</label>
                <input
                  required
                  name="thoroughfare"
                  value={formData.thoroughfare}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 focus:border-brand-accent outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">City / Town</label>
                <input
                  required
                  name="townOrCity"
                  value={formData.townOrCity}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 focus:border-brand-accent outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Postcode</label>
                <input
                  required
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 focus:border-brand-accent outline-none"
                />
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-gray-50 p-6 space-y-4 border border-gray-100">
                <h3 className="font-serif text-xl border-b border-gray-200 pb-2">Summary</h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-gray-500">Name:</span>
                  <span className="font-bold">{formData.first_name} {formData.last_name}</span>
                  <span className="text-gray-500">DOB:</span>
                  <span className="font-bold">{formData.date_of_birth}</span>
                  <span className="text-gray-500">Contact:</span>
                  <span className="font-bold">{formData.email} / {formData.phone}</span>
                  <span className="text-gray-500">Address:</span>
                  <span className="font-bold">
                    {formData.buildingNumber} {formData.thoroughfare}, {formData.townOrCity}, {formData.postcode}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 italic">
                By submitting this form, you agree to our terms and conditions and authorize Jigsaw Claims Ltd to process your enquiry.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 text-brand-danger text-sm border border-red-100">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="flex justify-between pt-8 border-t border-gray-100">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-2 text-gray-500 hover:text-brand-primary transition-colors font-bold uppercase tracking-widest text-xs"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="btn-primary flex items-center gap-2"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary bg-brand-accent hover:bg-brand-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                </>
              ) : (
                <>Submit Claim <CheckCircle2 className="w-4 h-4" /></>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
