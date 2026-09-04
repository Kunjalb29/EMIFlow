import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  Calculator,
  FileCheck,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Lock,
  Percent,
  Layers,
  AlertCircle
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const steps = [
    {
      step: '01',
      title: 'Choose your product',
      desc: 'Browse our curated catalog of flagship smartphones. Pick your preferred model, colorway, and storage tier with real-time stock and MRP breakdown.',
      icon: Smartphone,
      color: 'from-orange-500 to-amber-500',
    },
    {
      step: '02',
      title: 'Choose your EMI',
      desc: 'Compare available EMI plans ranging from 3 to 36 months. See transparent interest rates, zero processing fees on promotional tenures, and instant cashback rewards.',
      icon: Calculator,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      step: '03',
      title: 'Review your plan',
      desc: 'Carefully verify your monthly installment, total payable amount, interest breakdown, and net savings after factoring in your instant cashback credit.',
      icon: FileCheck,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      step: '04',
      title: 'Proceed securely',
      desc: 'Log in to your account, verify your details, and submit your paperless application. Your plan is saved directly to your profile for ongoing tracking.',
      icon: ShieldCheck,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const benefits = [
    {
      icon: Percent,
      title: 'Transparent Pricing',
      desc: 'No hidden convenience charges or surprise fees. Every rupee of interest and processing cost is displayed upfront before you proceed.',
    },
    {
      icon: Calculator,
      title: 'Flexible EMI Plans',
      desc: 'Select from 3, 6, 12, or extended 24-month tenures. Enjoy genuine 0% No-Cost EMI options on top flagship models.',
    },
    {
      icon: Layers,
      title: 'Multiple Products',
      desc: 'Choose from the latest releases by Apple, Samsung, and OnePlus, complete with multiple color and storage specifications.',
    },
    {
      icon: Lock,
      title: 'Secure Account',
      desc: 'Enterprise-grade authentication with hashed passwords, JWT security, and personal profile management for your saved applications.',
    },
    {
      icon: Sparkles,
      title: 'Simple Experience',
      desc: 'A seamless, friction-free interface designed to get you from browsing to verified plan selection in under two minutes.',
    },
  ];

  const faqs = [
    {
      q: 'What is an EMI?',
      a: 'EMI stands for Equated Monthly Installment. It is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs allow you to purchase high-value products like smartphones without paying the full lump sum upfront.',
    },
    {
      q: 'How do I select an EMI plan?',
      a: 'Navigate to any smartphone product page. Below the color and storage selectors, you will find available EMI cards displaying monthly installments, tenures (e.g. 3, 6, 12 months), interest rates, and total payable amounts. Simply click any card to select that plan.',
    },
    {
      q: 'Can I change my plan before proceeding?',
      a: 'Yes, absolutely. You can freely switch between tenures, colors, and storage configurations at any time on the product page. The price and monthly EMI will update in real time.',
    },
    {
      q: 'What happens after I click "Proceed with EMI"?',
      a: 'If you are signed in, an Order Summary drawer will open displaying your complete financial breakdown. Clicking "Submit EMI Application" records the application directly in your account profile. If you are not signed in, you will be prompted to log in or create an account, after which your selection will be restored.',
    },
    {
      q: 'Is real payment processed on EMIFlow?',
      a: 'No. EMIFlow is a showcase and portfolio demonstration platform designed to illustrate modern fintech e-commerce flows. No real credit checks, debit transactions, or banking charges occur on this application.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'How It Works' }]} />

      {/* Hero Section */}
      <div className="mt-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs sm:text-sm font-bold mb-4">
          <Sparkles className="w-4 h-4 text-orange-600" />
          Streamlined Financing
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          How EMIFlow Works
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          Get the product you want and choose an EMI plan that fits your budget. Transparent interest, zero paperwork, and full clarity every step of the way.
        </p>
      </div>

      {/* 4-Step Flow */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-200 tracking-wider">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-orange-600">
                <span>Step {idx + 1} of 4</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Why Choose EMIFlow */}
      <div className="mt-20 bg-slate-900 text-white rounded-3xl p-8 sm:p-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Our Edge</span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight mt-1">Why Choose EMIFlow?</h2>
          <p className="text-slate-300 text-sm mt-2">
            Built from the ground up to eliminate the friction, hidden fees, and confusion of traditional credit financing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6 hover:border-orange-500/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{b.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-20 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600">Got Questions?</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Everything you need to know about our financing terms and demo platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.q}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-orange-600"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                    openFaq === index ? 'rotate-180 text-orange-600' : ''
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Demo Disclosure Box */}
      <div className="mt-16 bg-amber-50 border border-amber-200 rounded-2xl p-5 sm:p-6 flex items-start gap-4">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          <strong>Important Demonstration Notice:</strong> EMIFlow is an educational, portfolio full-stack application created to showcase modern fintech and e-commerce design and architecture. All product pricing, EMI numbers, interest rates, and approval confirmations are simulated. No real money or financial liabilities are involved.
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-lg shadow-orange-500/30 transition-all group"
        >
          <span>Explore Smartphone Catalog</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
