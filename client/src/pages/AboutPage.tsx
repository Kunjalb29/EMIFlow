import { Link } from 'react-router-dom';
import {
  Code2,
  Database,
  Server,
  Zap,
  HeartHandshake,
  Eye,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Cpu
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

export default function AboutPage() {
  const techStack = [
    { name: 'React 19', desc: 'Modern reactive component UI with hooks and state management', icon: Code2, color: 'text-sky-500 bg-sky-50' },
    { name: 'TypeScript', desc: 'Strict end-to-end type safety across client and backend contracts', icon: Terminal, color: 'text-blue-600 bg-blue-50' },
    { name: 'Node.js & Express', desc: 'Modular REST API server with JWT auth and rate limiting', icon: Server, color: 'text-emerald-600 bg-emerald-50' },
    { name: 'PostgreSQL 17', desc: 'Relational data store for users, devices, variants, and EMI plans', icon: Database, color: 'text-indigo-600 bg-indigo-50' },
    { name: 'Prisma ORM', desc: 'Declarative database schema modeling and automated migrations', icon: Cpu, color: 'text-purple-600 bg-purple-50' },
    { name: 'Tailwind CSS v4', desc: 'Fine-tuned token design system with glassmorphism and animations', icon: Zap, color: 'text-amber-500 bg-amber-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'About' }]} />

      {/* Hero Section */}
      <div className="mt-6 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-orange-600">The EMIFlow Story</span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mt-2">
          Making flexible payments easier to understand.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          EMIFlow was built to reimagine smartphone e-commerce by putting clear financing calculators, transparent interest terms, and instant cashback directly at the center of the shopping experience.
        </p>
      </div>

      {/* Narrative Cards: Mission & Approach */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-6">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            In modern retail, device financing is often shrouded in complicated fine print, hidden processing charges, and ambiguous monthly breakdowns. Our mission is to demonstrate how consumer fintech platforms can provide 100% upfront transparency—allowing shoppers to calculate exact payouts before committing to a purchase.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Why Transparency Matters</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Consumers should never need a spreadsheet to figure out how much their smartphone will truly cost over a 12-month tenure. By dynamically recalculating interest, upfront cashback, and net monthly commitments when switching variants, EMIFlow empowers users with complete financial confidence.
          </p>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600">Engineering</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Built with Modern Technology
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Architected as a production-quality full-stack system designed to withstand rigorous code reviews and real-world scale.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((tech) => {
            const Icon = tech.icon;
            return (
              <div key={tech.name} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-xl ${tech.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-1">{tech.name}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{tech.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Architecture Highlights */}
      <div className="mt-20 bg-slate-900 text-white rounded-3xl p-8 sm:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Architecture</span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Full-Stack Architecture Highlights</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              EMIFlow adheres to industry clean code principles with distinct architectural boundaries:
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Relational Normalization</strong>: Products, Variants, Images, EMI Plans, and Users linked via foreign keys</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Security-First Authentication</strong>: Bcrypt password hashing, JWT in HttpOnly cookies, and route guards</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Context-Aware AI Assistant</strong>: Grounded Gemini LLM queries tied directly to PostgreSQL data</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Mobile-First Design</strong>: Seamless responsive breakpoints across 375px, 768px, 1024px, and 1440px</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 bg-slate-800/90 rounded-2xl p-6 border border-slate-700 font-mono text-xs text-slate-300 space-y-3">
            <div className="text-orange-400 font-bold border-b border-slate-700 pb-2 flex items-center justify-between">
              <span>SYSTEM SPECS</span>
              <span className="text-[10px] text-emerald-400">ONLINE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Runtime:</span>
              <span>Node.js v20+ / Vite 8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Database:</span>
              <span>PostgreSQL 17.x</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">ORM:</span>
              <span>Prisma v5.22</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Auth:</span>
              <span>JWT + Bcrypt (HttpOnly)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">AI Model:</span>
              <span>Gemini 2.5 Flash / Catalog Engine</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="mt-16 text-center">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-lg shadow-orange-500/30 transition-all group"
        >
          <span>Explore Smartphones</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
