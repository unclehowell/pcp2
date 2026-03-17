import React, { useState, useEffect } from 'react';

interface PasswordGateProps {
  children: React.ReactNode;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ children }) => {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const auth = sessionStorage.getItem('site_auth');
    if (auth === 'true') {
      setIsAuthorized(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'mondaysgrrr') {
      sessionStorage.setItem('site_auth', 'true');
      setIsAuthorized(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  if (isAuthorized) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-primary p-4">
      <div className="max-w-md w-full bg-white p-8 shadow-2xl border-t-4 border-brand-accent">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif mb-2">PCP Refund</h1>
          <p className="text-gray-600">Please enter the password to access the campaign site.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-accent transition-colors"
              autoFocus
            />
          </div>
          {error && <p className="text-brand-danger text-sm">{error}</p>}
          <button type="submit" className="w-full btn-primary">
            Access Site
          </button>
        </form>
      </div>
    </div>
  );
};
