import React, { useState, useEffect } from 'react';
import ReservationPage from './ReservationPage';
import { CheckCircle2, ShieldCheck, Mail, ArrowLeft, Heart, Calendar, Lock } from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isSuccessQuery, setIsSuccessQuery] = useState(
    window.location.search.includes('success=true') || 
    window.location.hash === '#thank-you'
  );

  useEffect(() => {
    // Listen to history transitions or manually check window conditions
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      setIsSuccessQuery(
        window.location.search.includes('success=true') || 
        window.location.hash === '#thank-you'
      );
    };

    window.addEventListener('popstate', handleLocationChange);
    
    // Periodically pulse or check to ensure seamless dynamic state transitions
    const interval = setInterval(() => {
      const path = window.location.pathname;
      const success = window.location.search.includes('success=true') || window.location.hash === '#thank-you';
      
      if (path !== currentPath) {
        setCurrentPath(path);
      }
      if (success !== isSuccessQuery) {
        setIsSuccessQuery(success);
      }
    }, 500);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      clearInterval(interval);
    };
  }, [currentPath, isSuccessQuery]);

  // Dynamic Routing Handler
  if (currentPath === '/thank-you' || isSuccessQuery) {
    // Generate a random dynamic validation booking code for extreme realism
    const mockBookingId = `AST-B1-${Math.floor(100000 + Math.random() * 900000)}`;

    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col justify-between font-sans selection:bg-cyan-500/20 text-zinc-900">
        
        {/* Navigation spacer */}
        <header className="bg-white border-b border-zinc-100 py-6">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <span className="font-serif-heading text-xl font-bold tracking-tight text-zinc-900">
              Astrateq <span className="text-cyan-500 font-sans text-xs uppercase font-bold tracking-widest ml-1 relative bottom-0.5">Gadgets</span>
            </span>
            <button 
              onClick={() => {
                window.history.pushState({}, '', '/');
                setCurrentPath('/');
                setIsSuccessQuery(false);
              }} 
              className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </button>
          </div>
        </header>

        {/* Core Message Content Frame */}
        <main className="max-w-xl mx-auto px-6 py-16 text-center flex-1 flex flex-col justify-center items-center">
          <div className="inline-flex items-center justify-center p-3.5 bg-cyan-50 text-cyan-600 rounded-full mb-6">
            <ShieldCheck className="h-10 w-10 stroke-[2.5]" />
          </div>

          <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 rounded text-[10px] font-bold uppercase tracking-wider mb-3">
            Deposit Verified Security Queue Locked
          </span>

          <h1 className="font-serif-heading text-3xl sm:text-4.5xl font-bold leading-tight text-zinc-900 mb-4">
            Welcome to Astrateq Batch 01.
          </h1>

          <p className="text-sm text-zinc-600 leading-relaxed mb-6">
            Your secure deposit has been fully processed via Stripe Elements. Your priority slot for the <strong className="text-black font-semibold">ASTRA-AI Predictive Safety System</strong> is officially locked.
          </p>

          {/* Code Receipt Box */}
          <div className="w-full bg-white rounded border border-zinc-200 p-6 text-left shadow-xs space-y-4 mb-8">
            <div className="flex justify-between items-center text-xs text-zinc-500 border-b border-zinc-100 pb-3">
              <span>Fulfillment Priority Reference</span>
              <span className="font-mono font-bold text-zinc-900 text-sm">{mockBookingId}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-zinc-500 block">Validation Status</span>
                <span className="font-semibold text-emerald-600 uppercase tracking-wider mt-0.5 block">✓ ACTIVE RESERVATION</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Refund Eligibility</span>
                <span className="font-semibold text-zinc-900 mt-0.5 block">100% Fully Guaranteed</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Fulfillment Class</span>
                <span className="font-semibold text-zinc-900 mt-0.5 block">Founder Batch 01 (Priority)</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Data Residency</span>
                <span className="font-semibold text-zinc-900 mt-0.5 block">Ottawa Database Server</span>
              </div>
            </div>
          </div>

          {/* Next timeline steps */}
          <div className="w-full text-left space-y-5 mb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-100 pb-2">
              Chronology of Ownership Events
            </h3>

            {/* Event 1 */}
            <div className="flex items-start space-x-4">
              <div className="h-6 w-6 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                01
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-900">Instant Mail Dispatch</p>
                <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                  A receipt detailing your Canadian validation escrow booking has been sent automatically. If missing, verify your spam tab or ping support@astrateq-gadgets.ca.
                </p>
              </div>
            </div>

            {/* Event 2 */}
            <div className="flex items-start space-x-4">
              <div className="h-6 w-6 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                02
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-900">Companion Application Access (Q3 2025)</p>
                <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                  You will receive secure early credentials to access our private companion-sandbox. Build parents profiles, customize warning voices, and verify diagnostics templates early.
                </p>
              </div>
            </div>

            {/* Event 3 */}
            <div className="flex items-start space-x-4">
              <div className="h-6 w-6 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                03
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-900">Carrier Waybill Dispatch (Q1 2026)</p>
                <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                  As our Canadian manufacturing plants wrap physical system components assembly, you will receive tracking coordinates to follow delivery paths directly.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full">
            <button
              onClick={() => {
                window.history.pushState({}, '', '/');
                setCurrentPath('/');
                setIsSuccessQuery(false);
              }}
              className="flex-1 py-3 text-xs font-bold uppercase tracking-widest text-white bg-zinc-900 hover:bg-cyan-500 hover:dark:shadow-md rounded text-center transition-all duration-300 cursor-pointer"
            >
              Return to Landing Portal
            </button>
            <button
              onClick={() => alert(`Astrateq Support Dispatch: For priority support regarding your order ${mockBookingId}, email support@astrateq-gadgets.ca directly. Our Toronto office is open 9AM - 5PM EST.`)}
              className="flex-1 py-3 text-xs font-bold uppercase tracking-widest text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded text-center transition cursor-pointer"
            >
              Contact Specialist Unit
            </button>
          </div>
        </main>

        {/* Simple footer block for trust reinforcing */}
        <footer className="bg-white border-t border-zinc-200 py-8">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-2 text-[10px] text-zinc-500">
            <p>Astrateq Gadgets Inc. &bull; Yonge Street Office, Toronto, Ontario &bull; Canada</p>
            <p>Security certified Stripe transaction processing layer &bull; Full PIPEDA sovereign privacy active</p>
          </div>
        </footer>

      </div>
    );
  }

  // Fallback to standard Landing Page View
  return <ReservationPage />;
}
