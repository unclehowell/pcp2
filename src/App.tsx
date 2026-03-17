/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PasswordGate } from './components/PasswordGate';
import { Home } from './pages/Home';
import { News } from './pages/News';
import { About } from './pages/About';
import { Claim } from './pages/Claim';
import { ThankYou } from './pages/ThankYou';

export default function App() {
  return (
    <PasswordGate>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/about" element={<About />} />
            <Route path="/claim" element={<Claim />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
        </Layout>
      </Router>
    </PasswordGate>
  );
}
