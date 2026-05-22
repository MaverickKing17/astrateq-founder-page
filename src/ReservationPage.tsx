import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { loadStripe } from '@stripe/stripe-js';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Menu, 
  X, 
  Check, 
  ChevronDown, 
  Smartphone, 
  Shield, 
  Zap, 
  Snowflake, 
  Lock, 
  Eye, 
  AlertTriangle, 
  EyeOff, 
  CheckCircle2, 
  ChevronRight, 
  HelpCircle, 
  Package, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

// Explicit Type Definitions for Tiers
interface PricingTier {
  id: 'earlybird' | 'founding' | 'guardian';
  name: string;
  deposit: number;
  valuePrice: string;
  savings: string | null;
  badge: string | null;
  tagline: string;
  features: string[];
  ctaText: string;
}

// Vehicle Compatibility Database Mapped by Year and Make
const VEHICLE_DATA: Record<string, string[]> = {
  Toyota: ['RAV4', 'Camry', 'Corolla', 'Highlander', 'Prius', 'Sienna', 'Tacoma', 'Tundra'],
  Honda: ['CR-V', 'Civic', 'Accord', 'Pilot', 'Odyssey', 'HR-V', 'Ridgeline'],
  Ford: ['F-150', 'Escape', 'Explorer', 'Focus', 'Fusion', 'Edge', 'Mustang'],
  Chevrolet: ['Equinox', 'Silverado', 'Cruze', 'Malibu', 'Tahoe', 'Suburban', 'Bolt EV'],
  Subaru: ['Outback', 'Forester', 'Crosstrek', 'Impreza', 'Legacy', 'Ascent'],
  Mazda: ['CX-5', 'CX-30', 'CX-9', 'Mazda3', 'Mazda6'],
  Hyundai: ['Tucson', 'Santa Fe', 'Elantra', 'Sonata', 'Kona', 'Ioniq 5'],
  Kia: ['Sportage', 'Sorento', 'Soul', 'Forte', 'Telluride', 'EV6'],
  BMW: ['3 Series', '5 Series', 'X3', 'X5', 'i4'],
  Audi: ['A4', 'A6', 'Q3', 'Q5', 'Q7'],
  Volkswagen: ['Tiguan', 'Jetta', 'Golf', 'Passat', 'ID.4'],
  Tesla: ['Model 3', 'Model Y', 'Model S', 'Model X']
};

export default function ReservationPage() {
  // Navigation State
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hotspot Interactive Screen State (Hero / Architecture Visual Panel)
  const [activeHotspot, setActiveHotspot] = useState<'obd' | 'dashcam' | 'cloud'>('dashcam');

  // Interactive Checklist State (What's in the box hover indices)
  const [activeBoxItem, setActiveBoxItem] = useState<number>(0);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Interactive Compatibility Checker Form State
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [checkingState, setCheckingState] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [scannedResult, setScannedResult] = useState<string>('');

  // Transaction Layer Integration / Simulated Stripe Debug UI States
  const [selectedCheckoutTier, setSelectedCheckoutTier] = useState<'earlybird' | 'founding' | 'guardian'>('founding');
  const [stripeSimulatorOpen, setStripeSimulatorOpen] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);
  const [isProcessingRedirect, setIsProcessingRedirect] = useState(false);

  // Dropdown options arrays
  const yearsList = Array.from({ length: 18 }, (_, i) => String(2025 - i)); // 2025 down to 2008
  const makesList = Object.keys(VEHICLE_DATA).sort();
  const modelsList = selectedMake ? VEHICLE_DATA[selectedMake] : [];

  // Reset models if make changes
  useEffect(() => {
    setSelectedModel('');
  }, [selectedMake]);

  // Handle Compatibility Search Logic
  const handleCompatibilityCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedYear || !selectedMake || !selectedModel) return;

    setCheckingState('scanning');
    
    // Simulate smart diagnostic database polling animation
    setTimeout(() => {
      setCheckingState('success');
      setScannedResult(`${selectedYear} ${selectedMake} ${selectedModel}`);
    }, 1200);
  };

  // Pricing Tiers Definition
  const pricingTiers: PricingTier[] = [
    {
      id: 'earlybird',
      name: 'Early Bird Tier',
      deposit: 25,
      valuePrice: '$249 CAD at shipment',
      savings: null,
      badge: null,
      tagline: 'Standard queue spot to secure initial launch batch priority.',
      features: [
        'Secure Founder Batch 01 spot',
        'Standard hardware launch pricing',
        'OBD-II dongle included',
        'Dual-lens predictive AI dash camera',
        '12 months complete service inclusion',
        'Flexible 100% deposit refunds anytime'
      ],
      ctaText: 'Reserve - Early Bird →'
    },
    {
      id: 'founding',
      name: 'Founding Member Tier',
      deposit: 85,
      valuePrice: '$199 CAD at shipment',
      savings: 'Save $200',
      badge: 'Most Popular',
      tagline: 'High-priority queued slot designed for maximum peace of mind.',
      features: [
        'Save $200 CAD off standard MSRP pricing',
        'Priority queued fulfillment batch 01',
        'Unique Founding Family companion app badge',
        'Premium high-speed micro-SD backup storage card',
        '100% refundable reservation deposit insurance',
        'Astrateq exclusive digital preview access',
        'Direct email channel with development team'
      ],
      ctaText: 'Reserve - Founding Member →'
    },
    {
      id: 'guardian',
      name: 'Guardian Tier',
      deposit: 150,
      valuePrice: '$149 CAD at shipment',
      savings: 'Save $400',
      badge: 'Lifetime Support',
      tagline: 'The ultimate shield. Absolute first production batch priority.',
      features: [
        'Save $400 CAD off standard system MSRP',
        'Absolute priority batch 01 delivery schedule',
        'LIFETIME customer support subscription token',
        'Limited edition titanium series OBD-II housing',
        'Founding Guardian physical certificate card',
        'Bilingual instruction kit detailing vehicle telemetry',
        'Free lifetime premium diagnostic reports'
      ],
      ctaText: 'Reserve - Guardian Protection →'
    }
  ];

  // Secure Stripe Redirection Handler
  const handleReserve = async (tier: 'earlybird' | 'founding' | 'guardian') => {
    setStripeError(null);
    setIsProcessingRedirect(true);

    const publishableKey = (import.meta as any).env.VITE_STRIPE_PUBLISHABLE_KEY;
    const priceIds = {
      earlybird: (import.meta as any).env.VITE_STRIPE_PRICE_EARLYBIRD,
      founding: (import.meta as any).env.VITE_STRIPE_PRICE_FOUNDING || (import.meta as any).env.VITE_PRICE_STRIPE_FOUNDING,
      guardian: (import.meta as any).env.VITE_STRIPE_PRICE_GUARDIAN,
    };

    // If Stripe details are not structured, trigger the premium simulated integration instructions panel (graceful fallback)
    if (!publishableKey || !priceIds[tier]) {
      console.warn('Stripe environment parameters are not configured. Launching simulated user preview overlay.');
      setTimeout(() => {
        setIsProcessingRedirect(false);
        setSelectedCheckoutTier(tier);
        setStripeSimulatorOpen(true);
      }, 800);
      return;
    }

    try {
      const stripe = await loadStripe(publishableKey);
      if (!stripe) {
        throw new Error('Could not initialize Stripe JS elements script engine.');
      }
      
      const { error } = await (stripe as any).redirectToCheckout({
        lineItems: [{ price: priceIds[tier], quantity: 1 }],
        mode: 'payment',
        successUrl: `${window.location.origin}/?success=true`,
        cancelUrl: window.location.href,
      });

      if (error) {
        throw error;
      }
    } catch (err: any) {
      console.error('Stripe element processing exception caught:', err);
      setStripeError(err?.message || 'A transmission state redirection exception has transpired.');
      setIsProcessingRedirect(false);
      // Failover elegantly back to instruction simulator overlay so user flow doesn't hang or look broken
      setSelectedCheckoutTier(tier);
      setStripeSimulatorOpen(true);
    }
  };

  // Smooth Scroll Helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#FCFCFD] font-sans text-zinc-900 selection:bg-cyan-500/10 selection:text-zinc-950 overflow-x-hidden">
      
      {/* SECTION 1: STICKY NAVIGATION BAR */}
      <nav 
        id="navbar" 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled 
            ? 'backdrop-blur-md bg-white/95 border-zinc-100 py-3 shadow-xs' 
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className={`flex items-center space-x-2 cursor-pointer`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="font-serif-heading text-xl md:text-2xl font-bold tracking-tight text-zinc-900">
                Astrateq <span className="text-cyan-500 font-sans text-xs font-bold tracking-widest uppercase ml-1 relative bottom-1">Gadgets</span>
              </span>
            </div>

            {/* Desktop Navigation Link Items */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('how-it-works')} 
                className="text-sm font-medium text-zinc-500 hover:text-zinc-900 hover:underline underline-offset-8 decoration-2 decoration-cyan-500 transition-all"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('compatibility')} 
                className="text-sm font-medium text-zinc-500 hover:text-zinc-900 hover:underline underline-offset-8 decoration-2 decoration-cyan-500 transition-all"
              >
                Compatibility
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="text-sm font-medium text-zinc-500 hover:text-zinc-900 hover:underline underline-offset-8 decoration-2 decoration-cyan-500 transition-all"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('faq')} 
                className="text-sm font-medium text-zinc-500 hover:text-zinc-900 hover:underline underline-offset-8 decoration-2 decoration-cyan-500 transition-all"
              >
                FAQ
              </button>
            </div>

            {/* CTA Button Right */}
            <div className="hidden md:block">
              <button
                onClick={() => scrollToSection('pricing')}
                className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-zinc-950 hover:bg-cyan-500 hover:text-white transition-all duration-300 rounded shadow-xs cursor-pointer"
              >
                Reserve My Spot &rarr;
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-zinc-900 hover:text-cyan-500"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Flyout Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-zinc-100 shadow-md animate-fade-in"
            >
              <div className="px-5 pt-4 pb-6 space-y-4">
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="block w-full text-left py-2 text-base font-medium text-zinc-500 hover:text-zinc-900"
                >
                  How It Works
                </button>
                <button
                  onClick={() => scrollToSection('compatibility')}
                  className="block w-full text-left py-2 text-base font-medium text-zinc-500 hover:text-zinc-900"
                >
                  Compatibility
                </button>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="block w-full text-left py-2 text-base font-medium text-zinc-500 hover:text-zinc-900"
                >
                  Pricing
                </button>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="block w-full text-left py-2 text-base font-medium text-zinc-500 hover:text-zinc-900"
                >
                  FAQ
                </button>
                <div className="pt-2">
                  <button
                    onClick={() => scrollToSection('pricing')}
                    className="w-full text-center py-3 text-sm font-semibold uppercase tracking-wider text-white bg-zinc-950 hover:bg-cyan-500 rounded transition"
                  >
                    Reserve My Spot
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* SECTION 2: SPLIT-SCREEN HERO SECTION (The F-Pattern) */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 bg-linear-to-b from-white to-zinc-50 overflow-hidden">
        {/* Subtle decorative vector mesh backdrops */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[radial-gradient(#06B6D4_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column (Copy and Call to Action elements) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#06B6D4] mb-4">
                <span className="h-1.5 w-1.5 bg-[#06B6D4] rounded-full animate-pulse" />
                <span>FOUNDER BATCH 01</span>
              </span>
              
              <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6.5xl font-extrabold leading-tight text-zinc-900 tracking-tight mb-6">
                Quiet protection for the drivers you love most.
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-zinc-600 leading-relaxed mb-8 max-w-2xl">
                The Canadian &ldquo;Sandwich Generation&rdquo; faces constant, silent anxiety over aging parents on the road. Traditional dashcams only record crashes; Astrateq Gadgets proactive AI predicts disasters before they strike. Our dual-lens systems mount seamlessly inside their vehicle, shielding them when you can&apos;t be there.
              </p>

              {/* Social Proof Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 px-5 bg-white rounded-md sleek-border sleek-shadow mb-8 max-w-3xl">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#06B6D4]/10 p-2 rounded-full text-[#06B6D4]">
                    <ShieldCheck className="h-4 w-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider">247 of 250 spots</p>
                    <p className="text-[11px] text-zinc-500">Remaining in Batch</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 border-t sm:border-t-0 sm:border-l border-zinc-100 sm:pl-4 pt-2 sm:pt-0">
                  <div className="bg-[#06B6D4]/10 p-2 rounded-full text-[#06B6D4]">
                    <MapPin className="h-4 w-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Ships Canada-Wide</p>
                    <p className="text-[11px] text-zinc-500">Secure Carrier Delivery</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 border-t sm:border-t-0 sm:border-l border-zinc-100 sm:pl-4 pt-2 sm:pt-0">
                  <div className="bg-[#06B6D4]/10 p-2 rounded-full text-[#06B6D4]">
                    <Star className="h-4 w-4 fill-amber-400 stroke-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider">4.9/5 Rating</p>
                    <p className="text-[11px] text-zinc-500">From 38 Beta Families</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-3">
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white bg-zinc-950 hover:bg-[#06B6D4] hover:scale-101 hover:shadow-md transition-all duration-300 rounded text-center cursor-pointer"
                >
                  Lock In My Founding Price &rarr;
                </button>
                
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="px-8 py-4 text-sm font-semibold uppercase tracking-wider text-zinc-900 bg-transparent hover:bg-zinc-100 border border-zinc-250 rounded text-center transition"
                >
                  See How It Works
                </button>
              </div>

              {/* Trust micro-copy */}
              <p className="text-[11px] text-zinc-500 tracking-wide mt-2">
                * Fully refundable deposit. No charge until shipment. Cancel anytime.
              </p>
            </div>

            {/* Right Column: Stunning Interactive Device Presentation Mockup */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-xl sleek-shadow sleek-border overflow-hidden transform hover:scale-[1.01] transition-transform duration-300 p-6 md:p-8">
                
                {/* Simulated windscreen rearview viewport representation */}
                <span className="absolute top-2 right-4 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                  ASTRA-AI Engine V1.12
                </span>
                
                {/* Windshield Graphic Window & Hotspot Controller */}
                <div className="relative bg-zinc-950 aspect-16/10 rounded-lg overflow-hidden border border-zinc-800 flex flex-col justify-between p-4 shadow-inner">
                  {/* Glass reflections */}
                  <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                  
                  {/* Top line with active status */}
                  <div className="flex justify-between items-center z-10 font-mono">
                    <span className="flex items-center space-x-1.5 bg-zinc-900/90 backdrop-blur-md px-2.5 py-1 rounded text-[10px] text-[#06B6D4]">
                      <span className="h-1.5 w-1.5 bg-[#06B6D4] rounded-full animate-pulse" />
                      <span>LIVE TELEMETRY COMPLIANT</span>
                    </span>
                    <span className="text-[10px] text-zinc-500">PIPEDA CANADIAN SERVER OK</span>
                  </div>

                  {/* Simulated interactive dashboards with animated alert based on current hotspot */}
                  <div className="my-auto z-10 flex flex-col items-center">
                    <AnimatePresence mode="wait">
                      {activeHotspot === 'dashcam' && (
                        <motion.div 
                          key="dashcam-alert"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="text-center"
                        >
                          <AlertTriangle className="h-12 w-12 text-[#06B6D4] mx-auto mb-2 animate-bounce" />
                          <h4 className="text-white font-semibold text-sm">Predictive Incident Warning</h4>
                          <p className="text-zinc-300 text-xs mt-1 max-w-xs">Sudden road lane drift & tailgating danger thresholds identified ahead (120m).</p>
                        </motion.div>
                      )}

                      {activeHotspot === 'obd' && (
                        <motion.div 
                          key="obd-alert"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="text-center"
                        >
                          <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto mb-2" />
                          <h4 className="text-white font-semibold text-sm">Vehicle OBD-II Scan Status</h4>
                          <p className="text-[#06B6D4] text-xs font-mono mt-1">NO MALFUNCTIONS REPORTED (102 Sensors OK)</p>
                          <p className="text-zinc-400 text-[10px] mt-1 font-mono">Voltage: 14.1V | Powertrain: Balanced</p>
                        </motion.div>
                      )}

                      {activeHotspot === 'cloud' && (
                        <motion.div 
                          key="cloud-alert"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="text-center"
                        >
                          <Smartphone className="h-12 w-12 text-[#06B6D4] mx-auto mb-2" />
                          <h4 className="text-white font-semibold text-sm">Caretaker Companion App</h4>
                          <p className="text-zinc-300 text-xs mt-1">Encrypted GPS update transmitted 2 seconds ago. Parent safe in Edmonton winter blizzard.</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Horizon Line simulation */}
                  <div className="absolute inset-x-0 bottom-8 h-[1px] bg-white/10 border-dashed z-0 pointer-events-none" />
                </div>

                {/* Hardware Toggle Panels */}
                <div className="mt-6">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 text-center mb-3">
                    Click to examine hardware ecosystem triggers:
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setActiveHotspot('dashcam')}
                      className={`py-2 px-1 text-center rounded transition-all ${
                        activeHotspot === 'dashcam'
                          ? 'border-[#06B6D4] bg-[#06B6D4]/5 text-zinc-950 font-bold border-2 shadow-xs'
                          : 'border border-zinc-200 bg-zinc-50 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700'
                      }`}
                    >
                      <span className="block text-[10px] uppercase font-mono tracking-tighter">Dual-Lens AI Camera</span>
                    </button>
                    
                    <button
                      onClick={() => setActiveHotspot('obd')}
                      className={`py-2 px-1 text-center rounded transition-all ${
                        activeHotspot === 'obd'
                          ? 'border-[#06B6D4] bg-[#06B6D4]/5 text-zinc-950 font-bold border-2 shadow-xs'
                          : 'border border-zinc-200 bg-zinc-50 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700'
                      }`}
                    >
                      <span className="block text-[10px] uppercase font-mono tracking-tighter">Smart OBD-II Dongle</span>
                    </button>

                    <button
                      onClick={() => setActiveHotspot('cloud')}
                      className={`py-2 px-1 text-center rounded transition-all ${
                        activeHotspot === 'cloud'
                          ? 'border-[#06B6D4] bg-[#06B6D4]/5 text-zinc-950 font-bold border-2 shadow-xs'
                          : 'border border-zinc-200 bg-zinc-50 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700'
                      }`}
                    >
                      <span className="block text-[10px] uppercase font-mono tracking-tighter">E2E Secure Cloud</span>
                    </button>
                  </div>
                </div>

                {/* Diagnostic specs table beneath the interactive box */}
                <div className="mt-5 pt-4 border-t border-zinc-100 grid grid-cols-2 gap-4 text-left">
                  <div>
                    <h5 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Windshield Unit</h5>
                    <p className="text-xs text-zinc-900 mt-0.5">Dual 1080p Lens + Vision Processing SoC</p>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">OBD Interface Unit</h5>
                    <p className="text-xs text-zinc-900 mt-0.5">High Frequency CAN telemetry reader</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: EMOTIONAL PROOF QUOTE STRIP */}
      <section className="bg-zinc-950 text-white py-16 md:py-20 relative">
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 font-sans">
          <p className="font-serif-heading text-xl sm:text-2xl md:text-3xl font-light italic leading-relaxed text-zinc-100">
            &ldquo;It&apos;s about the quiet peace of mind knowing they&apos;re safe during a dark Calgary winter drive, without worrying. That&apos;s what we built this to help you be. There, even when you can&apos;t be.&rdquo;
          </p>
          <div className="mt-6 flex flex-col items-center">
            <span className="h-px w-12 bg-[#06B6D4] mb-3" />
            <p className="text-[#06B6D4] text-xs font-semibold uppercase tracking-widest">- Damian, Founder, Astrateq Gadgets</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE GUARDIAN FOUNDER'S BUNDLE (id="pricing") */}
      <section id="pricing" className="py-24 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block text-xs font-semibold uppercase text-cyan-600 tracking-widest bg-cyan-50 px-3 py-1 rounded-md mb-4">
              SECURE DEPOSIT &bull; GUARANTEED SPOT
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6">
              The Guardian Founder&apos;s Bundle
            </h2>
            <p className="text-base sm:text-lg text-zinc-500 leading-relaxed">
              Three ways to lock in your founding price before we open to the public. Each model represents a fully refundable validation tier supported by Stripe integrations.
            </p>
          </div>

          {/* Pricing Staggered 3-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch max-w-6xl mx-auto mb-16 px-2 md:px-0">
            
            {pricingTiers.map((tier) => {
               const isFounding = tier.id === 'founding';
               return (
                 <div 
                   key={tier.id}
                   className={`relative flex flex-col justify-between bg-zinc-50/50 p-8 rounded-xl border transition-all duration-300 ${
                     isFounding
                       ? 'border-[#06B6D4] shadow-xl md:scale-105 z-10 bg-white'
                       : 'border-zinc-200/80 shadow-xs hover:border-zinc-300'
                   }`}
                 >
                   {/* Visual Anchor Items */}
                   {isFounding && (
                     <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#06B6D4] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                       {tier.badge}
                     </div>
                   )}

                   {/* Card Header details */}
                   <div>
                     <div className="flex justify-between items-start mb-4">
                       <h3 className="font-serif-heading text-xl md:text-2xl font-bold text-zinc-900">{tier.name}</h3>
                       {tier.savings && (
                         <span className="bg-[#06B6D4]/10 text-cyan-700 text-xs font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-md">
                           {tier.savings}
                         </span>
                       )}
                     </div>
                     
                     <p className="text-xs text-zinc-500 mb-6 leading-relaxed">{tier.tagline}</p>
                     
                     <div className="flex items-baseline mb-1">
                       <span className="text-3xl sm:text-4xl font-serif-heading font-extrabold text-zinc-900">${tier.deposit}</span>
                       <span className="text-sm font-semibold text-zinc-500 ml-2 font-mono">CAD Refundable Deposit</span>
                     </div>
                     <p className="text-xs font-medium text-zinc-500 mb-8 italic">
                       + Only {tier.valuePrice}
                     </p>

                     <div className="border-t border-zinc-100 my-6" />

                     {/* Features checklist */}
                     <ul className="space-y-4 mb-8">
                       {tier.features.map((feat, idx) => (
                         <li key={idx} className="flex items-start text-xs text-zinc-600 leading-relaxed">
                           <Check className="h-4 w-4 text-[#06B6D4] mr-3 shrink-0 stroke-[2.5]" />
                           <span>{feat}</span>
                         </li>
                       ))}
                     </ul>
                   </div>

                   {/* Reserve Action Trigger Button */}
                   <div className="mt-auto pt-4">
                     <button
                       onClick={() => handleReserve(tier.id)}
                       className={`w-full py-3 px-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-md ${
                         isFounding
                           ? 'bg-zinc-950 text-white hover:bg-[#06B6D4] shadow-xs'
                           : 'bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-50'
                       } cursor-pointer text-center flex items-center justify-center space-x-1`}
                     >
                       <span>{tier.ctaText}</span>
                     </button>
                   </div>
                 </div>
               );
            })}

          </div>

          {/* Centered Trust row underneath */}
          <div className="border-t border-zinc-100 pt-10 max-w-3xl mx-auto flex flex-wrap justify-center items-center gap-6 md:gap-12 text-zinc-500 text-xs">
            <span className="flex items-center font-medium">
              <Lock className="h-3.5 w-3.5 text-cyan-600 mr-1.5" /> Stripe Secured Processing
            </span>
            <span className="flex items-center font-medium">
              <CheckCircle2 className="h-3.5 w-3.5 text-cyan-600 mr-1.5" /> Fully Refundable (No Fees)
            </span>
            <span className="flex items-center font-medium">
              <MapPin className="h-3.5 w-3.5 text-cyan-600 mr-1.5" /> Priority Shipping Across Canada
            </span>
          </div>

        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS (id="how-it-works") */}
      <section id="how-it-works" className="py-24 md:py-32 bg-zinc-50/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block text-xs font-semibold uppercase text-cyan-600 tracking-widest mb-4">THE ONLY RISK-FREE ROUTE</span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6">
              The Only Risk-Free Way to Own ASTRA-AI
            </h2>
            <p className="text-base text-zinc-500 leading-relaxed">
              We&apos;re bringing predictive hardware back to life locally. Our 3-step timeline keeps your validation secure from reservation to seamless driveway activation.
            </p>
          </div>

          {/* 3-Step Horizontal Timeline Visual */}
          <div className="relative max-w-5xl mx-auto pt-8">
            {/* Background progress bar */}
            <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-zinc-200 transform -translate-y-1/2 hidden md:block z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              
              {/* Step 1 */}
              <div className="bg-white p-8 rounded-lg sleek-border flex flex-col items-center text-center sleek-shadow">
                <div className="h-10 w-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-xs ring-4 ring-zinc-100 mb-6">
                  01
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-3">60-Second Secure Place</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Choose a Founder tier and place a refundable deposit via legal-compliant Stripe. This locks in your priority queue status of Batch 01.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-8 rounded-lg sleek-border flex flex-col items-center text-center sleek-shadow">
                <div className="h-10 w-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-xs ring-4 ring-zinc-100 mb-6">
                  02
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-3">Priority Canada Build</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Astrateq engineers compile the physical dashcams and OBD-II pods in Canadian labs. Batch manufacturing tracking and previews sent monthly.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-8 rounded-lg sleek-border flex flex-col items-center text-center sleek-shadow">
                <div className="h-10 w-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-xs ring-4 ring-zinc-100 mb-6">
                  03
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-3">10-Min Plug-and-Play</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Your kit arrives directly. Snap the OBD-II adapter in, mount the smart camera adhesive, and secure instant active telemetry tracking.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 6: INTERACTIVE VEHICLE COMPATIBILITY CHECKER */}
      <section id="compatibility" className="py-24 md:py-32 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-zinc-50 rounded-2xl p-8 md:p-12 sleek-border sleek-shadow">
            
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-cyan-600 mb-3 bg-cyan-50 px-2.5 py-1 rounded-md">SECURE OBD-II FITMENT</span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
                Will ASTRA-AI Work With Your Vehicle?
              </h2>
              <p className="text-xs md:text-sm text-zinc-500">
                98.3% of Canadian vehicles built after 2008 are fully compatible. Check your vehicle&apos;s active OBD-II support status below.
              </p>
            </div>

            {/* Dynamic Selector Dropdowns Form */}
            <form onSubmit={handleCompatibilityCheck} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Year Dropdown */}
                <div className="flex flex-col">
                  <label htmlFor="year-select" className="text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wide">Vehicle Year</label>
                  <div className="relative">
                    <select
                      id="year-select"
                      required
                      value={selectedYear}
                      onChange={(e) => {
                        setSelectedYear(e.target.value);
                        if (checkingState === 'success') setCheckingState('idle');
                      }}
                      className="w-full bg-white select-none border border-zinc-200 text-zinc-900 text-sm px-4 py-3.5 pr-10 focus:outline-hidden focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 rounded-md appearance-none transition-all"
                    >
                      <option value="">Select Year</option>
                      {yearsList.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                  </div>
                </div>

                {/* 2. Make Dropdown */}
                <div className="flex flex-col">
                  <label htmlFor="make-select" className="text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wide">Vehicle Make</label>
                  <div className="relative">
                    <select
                      id="make-select"
                      required
                      value={selectedMake}
                      onChange={(e) => {
                        setSelectedMake(e.target.value);
                        if (checkingState === 'success') setCheckingState('idle');
                      }}
                      className="w-full bg-white select-none border border-zinc-200 text-zinc-900 text-sm px-4 py-3.5 pr-10 focus:outline-hidden focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 rounded-md appearance-none transition-all"
                    >
                      <option value="">Select Make</option>
                      {makesList.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                  </div>
                </div>

                {/* 3. Model Dropdown */}
                <div className="flex flex-col">
                  <label htmlFor="model-select" className="text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wide">Vehicle Model</label>
                  <div className="relative">
                    <select
                      id="model-select"
                      required
                      disabled={!selectedMake}
                      value={selectedModel}
                      onChange={(e) => {
                        setSelectedModel(e.target.value);
                        if (checkingState === 'success') setCheckingState('idle');
                      }}
                      className="w-full bg-white select-none border border-zinc-200 text-zinc-900 text-sm px-4 py-3.5 pr-10 focus:outline-hidden focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 rounded-md appearance-none disabled:bg-zinc-100 disabled:text-zinc-400 disabled:cursor-not-allowed transition-all"
                    >
                      <option value="">{selectedMake ? 'Select Model' : 'Select Make First'}</option>
                      {modelsList.map((model) => <option key={model} value={model}>{model}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Submit Trigger Actions Button */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={!selectedYear || !selectedMake || !selectedModel || checkingState === 'scanning'}
                  className="w-full md:w-auto px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white bg-zinc-950 hover:bg-[#06B6D4] disabled:bg-zinc-300 disabled:cursor-not-allowed rounded-md transition-all duration-300 shadow-xs cursor-pointer"
                >
                  {checkingState === 'scanning' ? 'Verifying Hardware System Sync...' : 'Check Compatibility &rarr;'}
                </button>
              </div>
            </form>

            {/* Dynamic Form Completion Verification Alerts Banner */}
            <AnimatePresence>
              {checkingState === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="mt-8 bg-cyan-500/5 border border-cyan-500/20 p-6 rounded-md text-center"
                >
                  <div className="inline-flex items-center justify-center p-2 rounded-full bg-cyan-500/10 text-cyan-600 mb-3">
                    <CheckCircle2 className="h-6 w-6 stroke-[2.5]" />
                  </div>
                  <h4 className="text-base font-bold text-zinc-900">Your Vehicle is Fully Compatible!</h4>
                  <p className="text-xs text-zinc-500 max-w-lg mx-auto leading-relaxed mt-1">
                    Your <strong className="text-black font-semibold">{scannedResult}</strong> supports our high-frequency OBD telemetry parsing and AI-camera triggers. Reserve today to lock in your Founding bundle spot!
                  </p>
                  
                  <button
                    onClick={() => scrollToSection('pricing')}
                    className="inline-flex items-center space-x-1 underline underline-offset-8 font-bold text-xs text-zinc-900 hover:text-cyan-500 transition-all tracking-wider uppercase mt-4 cursor-pointer"
                  >
                    <span>Reserve For This Vehicle</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </section>

      {/* SECTION 7: FEATURE GRID */}
      <section className="py-24 md:py-32 bg-zinc-50/50 relative border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
            <span className="inline-block text-xs font-semibold uppercase text-cyan-600 tracking-widest bg-white px-3 py-1 rounded-md sleek-border sleek-shadow mb-4">
              COMPREHENSIVE ROADSIDE COVERAGE
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
              The New Standard in Automotive <span className="text-[#06B6D4] italic font-serif">Intelligence.</span>
            </h2>
            <p className="text-base text-zinc-500 mt-5 leading-relaxed">
              We did not build another passive camera. ASTRA-AI merges live diagnostic metrics and external computer vision to provide active shield networks.
            </p>
          </div>

          {/* 3x2 Grid containing 6 core features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-white p-6 md:p-8 rounded-lg sleek-border sleek-shadow hover:shadow-md transition duration-300">
              <div className="h-10 w-10 text-white bg-zinc-950 flex items-center justify-center rounded-md mb-6 shadow-xs">
                <AlertCircle className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-3">Predictive Failure Detection</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Plugs under the steering wheel to monitor live diagnostics. Flags transmission fatigue, critical battery falloffs, or braking slippages up to 72 hours before failure.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 md:p-8 rounded-lg sleek-border sleek-shadow hover:shadow-md transition duration-300">
              <div className="h-10 w-10 text-white bg-zinc-950 flex items-center justify-center rounded-md mb-6 shadow-xs">
                <Smartphone className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-3">Real-Time Driver Coaching</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Discreet windshield audio coaches. Soft voices alert older drivers of blind spots, tailgating danger, or sudden speed drift errors without sounding startling.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 md:p-8 rounded-lg sleek-border sleek-shadow hover:shadow-md transition duration-300">
              <div className="h-10 w-10 text-white bg-zinc-950 flex items-center justify-center rounded-md mb-6 shadow-xs">
                <Package className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-3">Live Family Dashboard</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Transmit fully encrypted live updates to family caretakers. Tracks parent driving progress, critical fuel status, or sudden winter pull-overs effortlessly.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 md:p-8 rounded-lg sleek-border sleek-shadow hover:shadow-md transition duration-300">
              <div className="h-10 w-10 text-white bg-zinc-950 flex items-center justify-center rounded-md mb-6 shadow-xs">
                <Snowflake className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-3">Winter Road Intelligence</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Tuned specifically for harsh Canadian winters. Analyzes windshield wiper frequencies, sliding metrics, and local freezing points to adjust braking alerts.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 md:p-8 rounded-lg sleek-border sleek-shadow hover:shadow-md transition duration-300">
              <div className="h-10 w-10 text-white bg-zinc-950 flex items-center justify-center rounded-md mb-6 shadow-xs">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-3">Canadian Data Sovereignty</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                All records host locally on servers inside Toronto and Montreal. Full PIPEDA guidelines compliance ensures no insurance metrics share without consent.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 md:p-8 rounded-lg sleek-border sleek-shadow hover:shadow-md transition duration-300">
              <div className="h-10 w-10 text-white bg-zinc-950 flex items-center justify-center rounded-md mb-6 shadow-xs">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-3">10-Minute Plug-and-Play</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Zero expertise or professional tools. The OBD-II dongle clicks in seconds, and our windshield camera clips seamlessly to complete configuration.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 8: TESTIMONIAL PROOF LAYERS */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
            <span className="inline-block text-xs font-bold uppercase text-[#00D4FF] tracking-widest bg-[#00D4FF]/10 px-3 py-1 rounded mb-4">
              CANADA-WIDE BETA VERIFIED
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A2E]">
              Peace of Mind, Proved.
            </h2>
            <p className="text-base text-[#4B5563] mt-5">
              Read real caregiver accounts using our pre-launch functional units in various Canadian cities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Review Card 1 */}
            <div className="bg-white p-8 rounded-xl border border-zinc-200/80 sleek-shadow hover:ring-1 hover:ring-zinc-300 transition duration-300">
              <div className="flex items-center space-x-1.5 text-amber-500 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 stroke-amber-400" />)}
              </div>
              <p className="text-xs text-zinc-600 italic leading-relaxed mb-6">
                &ldquo;My 78-year-old father drives extensively around Toronto. I used to chew my fingernails with anxiety every evening. The ASTRA-AI companion app sends me a quiet notification confirming his car arrived safely. It&apos;s a total life changer.&rdquo;
              </p>
              <div className="flex items-center justify-between border-t border-zinc-100 pt-4 text-xs font-semibold">
                <span className="text-zinc-900">Eleanor S., Caregiver</span>
                <span className="text-zinc-400">Toronto, ON</span>
              </div>
            </div>

            {/* Review Card 2 */}
            <div className="bg-white p-8 rounded-xl border border-zinc-200/80 sleek-shadow hover:ring-1 hover:ring-zinc-300 transition duration-300">
              <div className="flex items-center space-x-1.5 text-amber-500 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 stroke-amber-400" />)}
              </div>
              <p className="text-xs text-zinc-600 italic leading-relaxed mb-6">
                &ldquo;We recently had a severe winter dip in Calgary. ASTRA-AI flagged critical battery grid weakness on mom&apos;s SUV 48 hours beforehand. We replaced the battery comfortably at home instead of having her stranded on the icy highway.&rdquo;
              </p>
              <div className="flex items-center justify-between border-t border-zinc-100 pt-4 text-xs font-semibold">
                <span className="text-zinc-900">Mark W., Son</span>
                <span className="text-zinc-400">Calgary, AB</span>
              </div>
            </div>

            {/* Review Card 3 */}
            <div className="bg-white p-8 rounded-xl border border-zinc-200/80 sleek-shadow hover:ring-1 hover:ring-zinc-300 transition duration-300">
              <div className="flex items-center space-x-1.5 text-amber-500 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 stroke-amber-400" />)}
              </div>
              <p className="text-xs text-zinc-600 italic leading-relaxed mb-6">
                &ldquo;My mother was resistant to having a &apos;spy camera&apos; inside the car. Turning on the hard privacy shutter disabled internal driver tracking so she feels dignified, yet she still gets active collision security alerts looking at the highway ahead.&rdquo;
              </p>
              <div className="flex items-center justify-between border-t border-zinc-100 pt-4 text-xs font-semibold">
                <span className="text-zinc-900">Nathalie B., Daughter</span>
                <span className="text-zinc-400">Ottawa, ON</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 9: WHAT&apos;S IN THE BOX */}
      <section className="py-24 bg-zinc-50/50 relative border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Box Schematic Graphic Illustration Left */}
            <div>
              <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-md uppercase tracking-widest block mb-3 w-fit">UNBOXING PREMIUM HARDWARE</span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-zinc-900 mb-6">
                What&apos;s inside your Founder Package?
              </h2>
              <p className="text-xs text-zinc-500 leading-relaxed mb-6 max-w-lg">
                We design and ship every item in fully recyclable kraft paper. Rotate elements or hover over list parameters to highlight hardware layouts.
              </p>
 
              {/* Dynamic hardware sketch */}
              <div className="bg-white rounded-xl p-6 border border-zinc-200 aspect-16/10 sleek-shadow relative flex items-center justify-center overflow-hidden">
                <div className="absolute top-3 left-4 text-[9px] font-mono uppercase text-zinc-500">AST-BOX S/P 500</div>
                
                {/* SVG Visual components */}
                <div className="grid grid-cols-2 gap-6 w-full max-w-md items-center z-10 font-sans">
                  <div className={`p-4 rounded border-2 transition ${activeBoxItem === 0 ? 'border-[#06B6D4] bg-[#06B6D4]/5' : 'border-zinc-100'}`}>
                    <div className="h-10 w-16 bg-zinc-950 rounded mx-auto relative flex items-center justify-center text-white text-[9px] font-mono">
                      <span className="absolute top-1 left-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
                      <span className="h-3 w-3 rounded-full bg-[#06B6D4]/30 border border-[#06B6D4] flex items-center justify-center" />
                    </div>
                    <p className="text-center font-mono text-[10px] mt-2 font-bold uppercase text-zinc-900">Dual 1080p Lens Cam</p>
                  </div>

                  <div className={`p-4 rounded border-2 transition ${activeBoxItem === 1 ? 'border-[#06B6D4] bg-[#06B6D4]/5' : 'border-zinc-100'}`}>
                    <div className="h-12 w-12 bg-zinc-800 rounded-sm mx-auto flex flex-col justify-between p-1.5 text-white">
                      <span className="h-1 w-full bg-[#06B6D4] rounded-xs" />
                      <span className="text-[7px] font-mono block text-center leading-none">OBD-II DONGLE</span>
                    </div>
                    <p className="text-center font-mono text-[10px] mt-2 font-bold uppercase text-zinc-900">Smart OBD Plug</p>
                  </div>
                </div>

                {/* Micro highlights overlay */}
                <span className="absolute bottom-3 right-4 text-[9px] font-mono text-cyan-600">
                  {activeBoxItem === 0 ? '✓ High-Definition Optics selected' : '✓ Standard diagnostic CAN-protocol active'}
                </span>
              </div>
            </div>

            {/* List checklist right */}
            <div className="space-y-4">
              <div 
                onMouseEnter={() => setActiveBoxItem(1)}
                className={`p-4 rounded-lg border transition duration-300 ${activeBoxItem === 1 ? 'bg-white border-cyan-500 sleek-shadow' : 'bg-transparent border-transparent'}`}
              >
                <h4 className="font-bold text-sm text-zinc-900 flex items-center">
                  <span className="h-1.5 w-1.5 bg-cyan-500 rounded-full mr-2" />
                  1. Astrateq Smart OBD-II Live Telematics Dongle
                </h4>
                <p className="text-xs text-zinc-500 ml-3.5 mt-1">
                  Connects directly under your parent&apos;s steering wheel. Gathers high-frequency data from engine, brakes, and sensor loops instantly.
                </p>
              </div>

              <div 
                onMouseEnter={() => setActiveBoxItem(0)}
                className={`p-4 rounded-lg border transition duration-300 ${activeBoxItem === 0 ? 'bg-white border-cyan-500 sleek-shadow' : 'bg-transparent border-transparent'}`}
              >
                <h4 className="font-bold text-sm text-zinc-900 flex items-center">
                  <span className="h-1.5 w-1.5 bg-cyan-500 rounded-full mr-2" />
                  2. Windshield Mount Dual-Lens AI Predictive Camera
                </h4>
                <p className="text-xs text-zinc-500 ml-3.5 mt-1">
                  Advanced vision processing chips track lane drifts, forward crashes, tailgating alerts, and optional driver cabin sleep fatigue alerts.
                </p>
              </div>

              <div className="p-4 rounded-lg hover:bg-white border border-transparent hover:border-zinc-200 transition duration-300">
                <h4 className="font-bold text-sm text-zinc-900 flex items-center">
                  <span className="h-1.5 w-1.5 bg-cyan-500 rounded-full mr-2" />
                  3. Hardware Kits & Cable Management Ties
                </h4>
                <p className="text-xs text-zinc-500 ml-3.5 mt-1">
                  High-bond windshield adhesive tape, custom cleaning swipes, and hidden safety cable clips for complete interior integration.
                </p>
              </div>

              <div className="p-4 rounded-lg hover:bg-white border border-transparent hover:border-zinc-200 transition duration-300">
                <h4 className="font-bold text-sm text-zinc-900 flex items-center">
                  <span className="h-1.5 w-1.5 bg-cyan-500 rounded-full mr-2" />
                  4. Astrateq Caretaker Companion Application License
                </h4>
                <p className="text-xs text-zinc-500 ml-3.5 mt-1">
                  Download token for iOS and Android devices, allowing secure family dashboards and smart mechanical reporting access.
                </p>
              </div>

              <div className="p-4 rounded-lg hover:bg-white border border-transparent hover:border-zinc-200 transition duration-300">
                <h4 className="font-bold text-sm text-zinc-900 flex items-center">
                  <span className="h-1.5 w-1.5 bg-cyan-500 rounded-full mr-2" />
                  5. Premium 12-Month Connected Service Suite Token
                </h4>
                <p className="text-xs text-zinc-500 ml-3.5 mt-1">
                  100% active E2E encrypted backups, priority map coordinates routing, and immediate winter slippery detection features.
                </p>
              </div>

              <div className="p-4 rounded-lg hover:bg-white border border-transparent hover:border-zinc-200 transition duration-300">
                <h4 className="font-bold text-sm text-zinc-900 flex items-center">
                  <span className="h-1.5 w-1.5 bg-cyan-500 rounded-full mr-2" />
                  6. English & French Bilingual User Manual
                </h4>
                <p className="text-xs text-zinc-500 ml-3.5 mt-1">
                  Astrateq customized booklet written clearly for older vehicle users. Version française incluse.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 10: PATH TO FOUNDING OWNERSHIP TIMELINE */}
      <section className="py-24 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 font-sans">
            <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-md uppercase tracking-widest inline-block mb-3">Priority Queued Milestones</span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900">
              Path to Founding Ownership Timeline
            </h2>
            <p className="text-xs text-zinc-500 mt-2 leading-relaxed font-sans">
              We operate transparently. Follow each milestone trajectory from your secure Stripe deposit validation down to worldwide doorstep carrier shipping.
            </p>
          </div>

          <div className="relative pt-6">
            {/* Vertical timeline trunk */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-zinc-200 transform -translate-x-1/2 hidden sm:block z-0" />

            <div className="space-y-12 relative z-10 font-sans">
              
              {/* Timeline Item 1 */}
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="w-full sm:w-5/12 text-center sm:text-right">
                  <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">Milestone 01</span>
                  <h4 className="text-base font-bold text-zinc-900 mt-2">Today</h4>
                  <p className="text-xs text-zinc-500 mt-1 pr-0 sm:pr-4 leading-relaxed">
                    Place your $25, $85, or $150 CAD reservation deposit. Secure your guaranteed physical Batch 01 system spot and lock in launch prices.
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-zinc-950 text-white border-2 border-white flex items-center justify-center my-4 sm:my-0 shadow-xs z-20 font-bold text-[11px] ring-4 ring-zinc-50">
                  01
                </div>
                <div className="w-full sm:w-5/12 hidden sm:block" />
              </div>

              {/* Timeline Item 2 */}
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="w-full sm:w-5/12 hidden sm:block" />
                <div className="h-8 w-8 rounded-full bg-zinc-950 text-white border-2 border-white flex items-center justify-center my-4 sm:my-0 shadow-xs z-20 font-bold text-[11px] ring-4 ring-zinc-50">
                  02
                </div>
                <div className="w-full sm:w-5/12 text-center sm:text-left">
                  <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">Milestone 02</span>
                  <h4 className="text-base font-bold text-zinc-900 mt-2">Q3 2025</h4>
                  <p className="text-xs text-zinc-500 mt-1 pl-0 sm:pl-4 leading-relaxed">
                    Companion Application Private Sandbox access opens for members. Custom feedback portals allow founders to configure personalized parental dashboard profiles.
                  </p>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="w-full sm:w-5/12 text-center sm:text-right">
                  <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">Milestone 03</span>
                  <h4 className="text-base font-bold text-zinc-900 mt-2">Q4 2025</h4>
                  <p className="text-xs text-zinc-500 mt-1 pr-0 sm:pr-4 leading-relaxed">
                    Production Stress-testing in extreme cold conditions begins across Canada. Secure monthly engineering bulletins update Batch 1.
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-zinc-950 text-white border-2 border-white flex items-center justify-center my-4 sm:my-0 shadow-xs z-20 font-bold text-[11px] ring-4 ring-zinc-50">
                  03
                </div>
                <div className="w-full sm:w-5/12 hidden sm:block" />
              </div>

              {/* Timeline Item 4 */}
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="w-full sm:w-5/12 hidden sm:block" />
                <div className="h-8 w-8 rounded-full bg-cyan-500 text-white border-2 border-white flex items-center justify-center my-4 sm:my-0 shadow-sm z-20 font-bold text-[11px] ring-4 ring-cyan-50">
                  04
                </div>
                <div className="w-full sm:w-5/12 text-center sm:text-left">
                  <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">Milestone 04</span>
                  <h4 className="text-base font-bold text-zinc-900 mt-2">Q1 2026</h4>
                  <p className="text-xs text-zinc-500 mt-1 pl-0 sm:pl-4 leading-relaxed">
                    Tiered Batch 1 Global carriers shipping starts. Receive tracking details securely. OBD-II telemetry shield activates fully upon plugging inside the dashboard.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: FREQUENTLY ASKED QUESTIONS (id="faq") */}
      <section id="faq" className="py-24 md:py-32 bg-zinc-50/50 relative border-t border-zinc-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-md uppercase tracking-widest block mb-3 w-fit mx-auto">CONQUERING CONCERNS</span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-zinc-900">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
              Find complete detailed answers regarding deposit parameters, mechanical diagnostics, billing sequences, and PIPEDA data protections below.
            </p>
          </div>

          {/* FAQ Collapsible Accordions Block */}
          <div className="space-y-4">
            
            {/* FAQ 1 */}
            <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden sleek-shadow">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}
                className="w-full flex justify-between items-center px-6 py-5 text-left font-bold text-sm md:text-base text-zinc-900 hover:text-[#06B6D4] transition-colors focus:outline-hidden cursor-pointer"
              >
                <span>How does the refundable reservation deposit work?</span>
                <ChevronDown className={`h-4.5 w-4.5 transition-transform duration-300 transform ${openFaqIndex === 0 ? 'rotate-180 text-[#06B6D4]' : 'text-zinc-400'}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {openFaqIndex === 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 text-xs md:text-sm text-zinc-500 leading-relaxed border-t border-zinc-100 pt-4">
                      All reservation deposits are securely locked using Stripe on Astrateq Gadgets&apos; client funds escrow accounts. Your booking is 100% refundable at any moment before physical assembly starts. If you wish to cancel, email <span className="text-zinc-900 font-semibold hover:underline">support@astrateq-gadgets.ca</span> and receive your complete deposit back inside 3 business days.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden sleek-shadow">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}
                className="w-full flex justify-between items-center px-6 py-5 text-left font-bold text-sm md:text-base text-zinc-900 hover:text-[#06B6D4] transition-colors focus:outline-hidden cursor-pointer"
              >
                <span>Do I need a professional mechanic to install this?</span>
                <ChevronDown className={`h-4.5 w-4.5 transition-transform duration-300 transform ${openFaqIndex === 1 ? 'rotate-180 text-[#06B6D4]' : 'text-zinc-400'}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {openFaqIndex === 1 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 text-xs md:text-sm text-zinc-500 leading-relaxed border-t border-zinc-100 pt-4">
                      Absolutely not. The ASTRA-AI system is engineered specifically for non-technical self-installation in under 10 minutes. The Smart OBD-II Dongle simply plugs straight into the OBD diagnostics plug usually located underneath your steering wheel. The Dual-Lens Dash Camera mounts inside the windshield via standard high-grade adhesives with neat cable clips included.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden sleek-shadow">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === 2 ? null : 2)}
                className="w-full flex justify-between items-center px-6 py-5 text-left font-bold text-sm md:text-base text-zinc-900 hover:text-[#06B6D4] transition-colors focus:outline-hidden cursor-pointer"
              >
                <span>How does the system protect the privacy of my older parents?</span>
                <ChevronDown className={`h-4.5 w-4.5 transition-transform duration-300 transform ${openFaqIndex === 2 ? 'rotate-180 text-[#06B6D4]' : 'text-zinc-400'}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {openFaqIndex === 2 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 text-xs md:text-sm text-zinc-500 leading-relaxed border-t border-zinc-100 pt-4">
                      Preserving dignity is our absolute priority. ASTRA-AI incorporates a physical hard slider switch directly on the housing enabling users to disconnect the cabin sensor lens completely whenever they desire. No inward audio or active video transmits continuously. All telemetry updates host on end-to-end encrypted local databases, securing your parents against tracking.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden sleek-shadow">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === 3 ? null : 3)}
                className="w-full flex justify-between items-center px-6 py-5 text-left font-bold text-sm md:text-base text-zinc-900 hover:text-[#06B6D4] transition-colors focus:outline-hidden cursor-pointer"
              >
                <span>Is there a mandatory monthly subscription fee?</span>
                <ChevronDown className={`h-4.5 w-4.5 transition-transform duration-300 transform ${openFaqIndex === 3 ? 'rotate-180 text-[#06B6D4]' : 'text-zinc-400'}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {openFaqIndex === 3 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 text-xs md:text-sm text-zinc-500 leading-relaxed border-t border-zinc-100 pt-4">
                      No. We never lock offline safety features. Your initial pre-launch purchase includes 12 months of secure telematics tracking, emergency alerts, and family dashboards. After year one, you can standardly run basic collision warning systems completely free offline, or upgrade to active secure cloud dashboards for just $9.99 CAD/month.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden sleek-shadow">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === 4 ? null : 4)}
                className="w-full flex justify-between items-center px-6 py-5 text-left font-bold text-sm md:text-base text-zinc-900 hover:text-[#06B6D4] transition-colors focus:outline-hidden cursor-pointer"
              >
                <span>Will ASTRA-AI work on classic or hybrid cars?</span>
                <ChevronDown className={`h-4.5 w-4.5 transition-transform duration-300 transform ${openFaqIndex === 4 ? 'rotate-180 text-[#06B6D4]' : 'text-zinc-400'}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {openFaqIndex === 4 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 text-xs md:text-sm text-zinc-500 leading-relaxed border-t border-zinc-100 pt-4">
                      Yes. Our Smart OBD parameters sync seamlessly with standard SAE diagnostics protocols standard in any hybrid or diesel vehicle built after 2008. The system also monitors electrical parameters unique to hybrid powertrains to predict battery drain events under winter conditions.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 6 */}
            <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden sleek-shadow">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === 5 ? null : 5)}
                className="w-full flex justify-between items-center px-6 py-5 text-left font-bold text-sm md:text-base text-zinc-900 hover:text-[#06B6D4] transition-colors focus:outline-hidden cursor-pointer"
              >
                <span>Can I monitor multiple vehicles from one single dashboard account?</span>
                <ChevronDown className={`h-4.5 w-4.5 transition-transform duration-300 transform ${openFaqIndex === 5 ? 'rotate-180 text-[#06B6D4]' : 'text-zinc-400'}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {openFaqIndex === 5 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 text-xs md:text-sm text-zinc-500 leading-relaxed border-t border-zinc-100 pt-4">
                      Yes. We designed the Astrateq Gadgets ecosystem specifically for Sandwich Generation caretakers. You can link up to 3 individual ASTRA-AI active vehicles under a unified profile on your companion application, ensuring absolute peace of mind for both parents.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 7 */}
            <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden sleek-shadow">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === 6 ? null : 6)}
                className="w-full flex justify-between items-center px-6 py-5 text-left font-bold text-sm md:text-base text-zinc-900 hover:text-[#06B6D4] transition-colors focus:outline-hidden cursor-pointer"
              >
                <span>What are the shipping targets for Founder Batch 01?</span>
                <ChevronDown className={`h-4.5 w-4.5 transition-transform duration-300 transform ${openFaqIndex === 6 ? 'rotate-180 text-[#06B6D4]' : 'text-zinc-400'}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {openFaqIndex === 6 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 text-xs md:text-sm text-zinc-500 leading-relaxed border-t border-zinc-100 pt-4">
                      Our pre-launch market validation batch has limited availability (250 items). Private application sandbox access is planned to deploy around Q3 2025. Production assembly testing occurs in Q4 2025, and shipments are scheduled to land directly at your door in Q1 2026.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 12: FINAL TRANSACTIONAL CTA */}
      <section className="bg-zinc-950 text-white py-24 relative overflow-hidden text-sans">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 bg-[radial-gradient(#06B6D4_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side */}
            <div className="lg:col-span-6">
              <span className="inline-flex text-xs font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-950/50 px-2.5 py-1 rounded-md mb-4">ASTRATEQ RISK-FREE PROMISE</span>
              <h2 className="font-serif-heading text-3xl sm:text-4.5xl font-bold leading-tight tracking-tight mb-6 text-white">
                A Guarantee Built for the North.
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                We believe security begins with absolute integrity. Your prelaunch deposit is processed securely under standard Canadian banking guidelines. By backing our Founder Batch 01, you lock in early-bird prices, back localized hardware growth, and enjoy automatic full refunds at any moment with a single click.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-xs text-zinc-300">
                  <Check className="h-4 w-4 text-cyan-400" />
                  <span>Stripe elements transmission protocol</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-zinc-300">
                  <Check className="h-4 w-4 text-cyan-400" />
                  <span>PIPEDA Canadian residency servers</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-zinc-300">
                  <Check className="h-4 w-4 text-cyan-400" />
                  <span>Bilingual support staff on duty</span>
                </div>
              </div>
            </div>

            {/* Right side with active pricing selection and call-to-action button */}
            <div className="lg:col-span-6">
              <div className="bg-white text-zinc-900 p-8 rounded-xl sleek-shadow border border-zinc-200">
                <h3 className="font-serif-heading text-xl font-bold text-zinc-900 mb-6 text-center">
                  Select Your Backing Priority
                </h3>

                {/* Radio lists */}
                <div className="space-y-4 mb-8">
                  
                  {/* Option 1 */}
                  <label 
                    onClick={() => setSelectedCheckoutTier('earlybird')}
                    className={`block p-4 rounded-lg border transition ${
                      selectedCheckoutTier === 'earlybird' 
                        ? 'border-cyan-500 bg-cyan-500/5' 
                        : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input 
                          type="radio" 
                          name="checkout-tier" 
                          checked={selectedCheckoutTier === 'earlybird'}
                          onChange={() => setSelectedCheckoutTier('earlybird')}
                          className="h-4 w-4 accent-cyan-500" 
                        />
                        <div>
                          <span className="block text-sm font-bold text-zinc-900">Early Bird Tier</span>
                          <span className="block text-[11px] text-zinc-500">Locks Spot &bull; Standard Launch Pricing</span>
                        </div>
                      </div>
                      <span className="text-base font-bold font-serif-heading">$25 CAD</span>
                    </div>
                  </label>

                  {/* Option 2 */}
                  <label 
                    onClick={() => setSelectedCheckoutTier('founding')}
                    className={`block p-4 rounded-lg border transition ${
                      selectedCheckoutTier === 'founding' 
                        ? 'border-cyan-500 bg-cyan-500/5' 
                        : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input 
                          type="radio" 
                          name="checkout-tier" 
                          checked={selectedCheckoutTier === 'founding'}
                          onChange={() => setSelectedCheckoutTier('founding')}
                          className="h-4 w-4 accent-cyan-500" 
                        />
                        <div>
                          <span className="block text-sm font-bold text-zinc-900">Founding Member Tier</span>
                          <span className="block text-[11px] text-[#06B6D4] font-semibold">Priority Batch &bull; Save $200 CAD</span>
                        </div>
                      </div>
                      <span className="text-base font-bold font-serif-heading">$85 CAD</span>
                    </div>
                  </label>

                  {/* Option 3 */}
                  <label 
                    onClick={() => setSelectedCheckoutTier('guardian')}
                    className={`block p-4 rounded-lg border transition ${
                      selectedCheckoutTier === 'guardian' 
                        ? 'border-cyan-500 bg-cyan-500/5' 
                        : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input 
                          type="radio" 
                          name="checkout-tier" 
                          checked={selectedCheckoutTier === 'guardian'}
                          onChange={() => setSelectedCheckoutTier('guardian')}
                          className="h-4 w-4 accent-cyan-500" 
                        />
                        <div>
                          <span className="block text-sm font-bold text-zinc-900">Guardian Tier</span>
                          <span className="block text-[11px] text-zinc-500">Lifetime Support Value &bull; Save $400 CAD</span>
                        </div>
                      </div>
                      <span className="text-base font-bold font-serif-heading">$150 CAD</span>
                    </div>
                  </label>

                </div>

                {/* Submit Action Block */}
                <button
                  type="button"
                  onClick={() => handleReserve(selectedCheckoutTier)}
                  disabled={isProcessingRedirect}
                  className="w-full py-4 text-xs font-bold uppercase tracking-widest text-white bg-zinc-950 hover:bg-[#06B6D4] hover:dark:shadow-md transition-all rounded-lg text-center flex items-center justify-center space-x-2 disabled:bg-neutral-300 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isProcessingRedirect ? (
                    <span>Directing to Checkout...</span>
                  ) : (
                    <span>Lock In My Spot Immediately &rarr;</span>
                  )}
                </button>

                <p className="text-[10px] text-zinc-500 text-center mt-3 tracking-wide">
                  100% Fully Refundable Deposit held securely. Secured via Stripe payments.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 13: CORPORATE COMPLIANCE FOOTER */}
      <footer className="bg-zinc-50 border-t border-zinc-200 text-zinc-900 py-16 text-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Logo box */}
            <div>
              <span className="font-serif-heading text-xl font-bold tracking-tight block mb-4 text-zinc-900">
                Astrateq <span className="text-cyan-600 font-sans text-xs uppercase font-bold tracking-widest ml-1 relative bottom-0.5">Gadgets</span>
              </span>
              <p className="text-[11px] text-zinc-500 leading-relaxed max-w-xs">
                Astrateq Gadgets Inc. designs and deploys next-generation active telematics solutions crafted with complete privacy and integrity in Canada.
              </p>
              <p className="text-[10px] text-zinc-500 mt-4 font-mono">
                Version française disponible sur demande.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-4">Quick Navigation</h5>
              <ul className="space-y-2 text-[11px]">
                <li>
                  <button onClick={() => scrollToSection('how-it-works')} className="text-zinc-500 hover:text-cyan-600 block">How It Works</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('compatibility')} className="text-zinc-500 hover:text-cyan-600 bg-transparent text-left">Compatibility Engine</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('pricing')} className="text-zinc-500 hover:text-cyan-600 block">Pre-Order Pricing</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('faq')} className="text-zinc-500 hover:text-cyan-600 block">FAQ Database</button>
                </li>
              </ul>
            </div>

            {/* Terms / Privacy Links */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-4">Integrity Policy</h5>
              <ul className="space-y-2 text-[11px]">
                <li><a href="#refund" onClick={(e) => { e.preventDefault(); alert('Refund Policy: All pre-launch reservations are 100% refundable at any moment before shipment with a single click. Contact billing@astrateq-gadgets.ca.'); }} className="text-zinc-500 hover:text-cyan-600">Refund Policy</a></li>
                <li><a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Privacy & Data Residency: Fully PIPEDA compliant. Standard E2E encrypted backups with Canadian servers physically located in Toronto and Montreal.'); }} className="text-zinc-500 hover:text-cyan-600">PIPEDA Privacy Rules</a></li>
                <li><a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of Service: Founding validation access operates on standard Stripe redirects. No subscription charges apply during the pilot period.'); }} className="text-zinc-500 hover:text-cyan-600">Validation Terms</a></li>
                <li><a href="#casl" onClick={(e) => { e.preventDefault(); alert('CASL Consent: By backing, you authorize Astrateq Gadgets Inc. to send product updates and manufacturing bulletins. Opt-out at any time.'); }} className="text-zinc-500 hover:text-cyan-600">CASL Compliance</a></li>
              </ul>
            </div>

            {/* Corporate HQ location */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-4">Corporate Office</h5>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Astrateq Gadgets Inc.<br />
                Suite 1200, 250 Yonge Street<br />
                Toronto, Ontario, M5B 2L7<br />
                Canada
              </p>
              <p className="text-[11px] text-zinc-500 mt-3 font-semibold">
                Email: support@astrateq-gadgets.ca
              </p>
            </div>

          </div>

          {/* Sub Row */}
          <div className="border-t border-zinc-200 pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-zinc-500">
            <p>&copy; {new Date().getFullYear()} Astrateq Gadgets Inc. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Designed in Toronto for Canadian Drivers.</p>
          </div>
        </div>
      </footer>

      {/* STRIPE INTEGRATION DETAILED SIMULATOR DIALOG PANEL OVERLAY (For Local Testing/Graceful Fallback) */}
      <AnimatePresence>
        {stripeSimulatorOpen && (
          <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl border border-zinc-200 p-8 max-w-xl w-full text-left overflow-y-auto max-h-[90vh] font-sans"
            >
              <div className="flex items-center justify-between mb-6 outline-hidden">
                <div className="flex items-center space-x-2.5">
                  <span className="p-2 rounded-lg bg-cyan-50 text-cyan-600">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <h3 className="font-serif-heading text-lg font-bold text-zinc-900">
                    Stripe System Credentials Required
                  </h3>
                </div>
                <button 
                  onClick={() => setStripeSimulatorOpen(false)}
                  className="p-1.5 rounded hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Status Indicator */}
              <div className="bg-cyan-50 border-l-4 border-[#06B6D4] p-4 text-xs text-zinc-900 leading-relaxed mb-6">
                <strong>Stripe Core Checkout Mechanics:</strong> Your secure redirect trigger worked, but active Stripe API parameters are omitted from your environmental dictionary. Follow the custom settings checklist below to activate the live Stripe Elements redirect bridge.
              </div>

              {/* Credentials Key Checklist */}
              <div className="space-y-4 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900">Required Environmental Variables</h4>
                
                <div className="p-3 bg-zinc-50 rounded border border-zinc-200 font-mono text-[11px] space-y-1 text-zinc-500">
                  <div>
                    <span className="text-zinc-400"># The Stripe Publishable Key</span>
                    <div><strong className="text-zinc-900 font-semibold">VITE_STRIPE_PUBLISHABLE_KEY</strong>=&quot;pk_live_...&quot;</div>
                  </div>
                  <div className="pt-2">
                    <span className="text-zinc-400"># Stripe product price keys for CAD reservation tiers</span>
                    <div><strong className="text-zinc-900 font-semibold">VITE_STRIPE_PRICE_EARLYBIRD</strong>=&quot;price_...&quot; <span className="text-[10px] italic text-zinc-400">(for Early Bird $25)</span></div>
                    <div><strong className="text-zinc-900 font-semibold">VITE_STRIPE_PRICE_FOUNDING</strong>=&quot;price_...&quot; <span className="text-[10px] italic text-zinc-400">(for Founding $85)</span></div>
                    <div><strong className="text-zinc-900 font-semibold">VITE_STRIPE_PRICE_GUARDIAN</strong>=&quot;price_...&quot; <span className="text-[10px] italic text-zinc-400">(for Guardian $150)</span></div>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  To assign these values, open your **Vercel Settings Dashboard** or update your local `.env` values file. 
                </p>
              </div>

              {/* simulated actions */}
              <div className="pt-4 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setStripeSimulatorOpen(false);
                    // Redirect to simulated thank you page with zero server-side reloads
                    window.history.pushState({}, '', '/?success=true');
                    window.dispatchEvent(new Event('popstate'));
                  }}
                  className="py-3 px-4 text-xs font-bold text-center text-white bg-zinc-950 hover:bg-[#06B6D4] rounded-lg tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer"
                >
                  Simulate Complete Success &rarr;
                </button>
                
                <button
                  onClick={() => setStripeSimulatorOpen(false)}
                  className="py-3 px-4 text-[#06B6D4] bg-cyan-50 hover:bg-cyan-100 rounded-lg text-xs font-bold tracking-widest uppercase text-center transition cursor-pointer"
                >
                  Dismiss Overlay
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
