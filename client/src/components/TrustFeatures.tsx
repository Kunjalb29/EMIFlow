import { Truck, Clock, RefreshCw, Shield, BadgeCheck } from 'lucide-react';

const features = [
  { icon: Truck, title: 'Free Delivery', desc: 'Pan-India free shipping', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Clock, title: 'Fast Dispatch', desc: 'Ships within 48 hours', color: 'text-primary', bg: 'bg-primary-light' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '7-day replacement', color: 'text-purple-600', bg: 'bg-purple-50' },
  { icon: Shield, title: 'Secure Payments', desc: 'Bank-grade encryption', color: 'text-success', bg: 'bg-success-light' },
  { icon: BadgeCheck, title: 'Verified Sellers', desc: 'Trusted partners only', color: 'text-navy', bg: 'bg-slate-100' },
];

export default function TrustFeatures() {
  return (
    <section className="mt-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white rounded-xl border border-border p-4 text-center hover:shadow-sm transition-shadow"
          >
            <div className={`w-10 h-10 ${f.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
              <f.icon size={20} className={f.color} />
            </div>
            <h3 className="text-sm font-semibold text-text-primary">{f.title}</h3>
            <p className="text-xs text-text-muted mt-1">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
