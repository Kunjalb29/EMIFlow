import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail,
  Calendar,
  KeyRound,
  LogOut,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Edit2,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import type { SavedPlan } from '../types/auth';
import { formatPrice } from '../utils/format';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ProfilePage() {
  const { user, logout, updateName } = useAuth();
  const navigate = useNavigate();

  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);

  // Edit name state
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name || '');
  const [nameLoading, setNameLoading] = useState(false);
  const [nameSuccess, setNameSuccess] = useState(false);

  // Change password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdError, setPwdError] = useState<string | null>(null);
  const [pwdSuccess, setPwdSuccess] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setNameInput(user.name);
    }
  }, [user]);

  useEffect(() => {
    async function loadPlans() {
      try {
        setPlansLoading(true);
        const data = await api.getSavedPlans();
        setSavedPlans(data);
      } catch (e) {
        console.error('Failed to load saved plans:', e);
      } finally {
        setPlansLoading(false);
      }
    }
    loadPlans();
  }, []);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    try {
      setNameLoading(true);
      await updateName(nameInput);
      setIsEditingName(false);
      setNameSuccess(true);
      setTimeout(() => setNameSuccess(false), 3000);
    } catch (e: any) {
      alert(e?.message || 'Failed to update name');
    } finally {
      setNameLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError(null);
    setPwdSuccess(false);

    if (newPassword.length < 8) {
      setPwdError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPwdError('New passwords do not match.');
      return;
    }

    try {
      setPwdLoading(true);
      await api.changePassword({ currentPassword, newPassword });
      setPwdSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setTimeout(() => setPwdSuccess(false), 4000);
    } catch (e: any) {
      setPwdError(e?.message || 'Failed to change password');
    } finally {
      setPwdLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) return null;

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'My Account' }, { label: 'Profile' }]} />

      {/* Header Profile Banner */}
      <div className="mt-6 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-orange-500 shadow-md"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center font-black text-2xl shadow-md">
                {initials}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {user.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 mt-1.5">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-slate-400" /> {user.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" /> Member since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left Column: Account Details & Password (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Personal Info Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">Personal Information</h2>
              {!isEditingName && (
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit Name
                </button>
              )}
            </div>

            {nameSuccess && (
              <div className="mb-4 p-2.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Name updated successfully!
              </div>
            )}

            {isEditingName ? (
              <form onSubmit={handleUpdateName} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={nameLoading}
                    className="px-4 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold"
                  >
                    {nameLoading ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingName(false);
                      setNameInput(user.name);
                    }}
                    className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Full Name</span>
                  <span className="text-slate-800 font-semibold">{user.name}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Email Address</span>
                  <span className="text-slate-800 font-semibold">{user.email}</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Email address is permanently linked to your KYC record.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Change Password Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-orange-500" /> Security & Password
            </h2>

            {pwdSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Password changed successfully.</span>
              </div>
            )}

            {pwdError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{pwdError}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  required
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                disabled={pwdLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all disabled:bg-slate-400"
              >
                {pwdLoading ? 'Updating Password...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Submitted Applications & Saved Plans (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-black text-slate-900">My Applications & Saved Plans</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  View your submitted device financing selections and approvals.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 font-bold text-xs">
                {savedPlans.length} {savedPlans.length === 1 ? 'Plan' : 'Plans'}
              </span>
            </div>

            {plansLoading && (
              <div className="py-12 flex flex-col items-center justify-center">
                <div className="w-8 h-8 border-3 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
                <p className="text-xs text-slate-400 mt-3">Loading your applications...</p>
              </div>
            )}

            {!plansLoading && savedPlans.length === 0 && (
              <div className="py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-800">No EMI applications yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
                  Browse our smartphone catalog, pick a phone, select an EMI plan, and click "Proceed with EMI" to submit your application.
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all"
                >
                  Browse Smartphones <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {!plansLoading && savedPlans.length > 0 && (
              <div className="space-y-4">
                {savedPlans.map((item) => {
                  const isApproved = item.status === 'APPROVED';
                  return (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                            isApproved ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}>
                            {isApproved ? '✓ Approved' : '• Under Review'}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">
                            Submitted on {new Date(item.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>

                        <h3 className="font-extrabold text-base text-slate-900">
                          {item.product.name}
                        </h3>

                        <p className="text-xs text-slate-500 mt-0.5">
                          Variant: <strong className="text-slate-700">{item.variant.color}</strong> • <strong className="text-slate-700">{item.variant.storage}</strong>
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                          <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200 font-bold text-slate-800">
                            {formatPrice(item.emiPlan.monthlyAmount)} / month
                          </span>
                          <span className="text-slate-500 font-medium">
                            {item.emiPlan.tenureMonths} Months
                          </span>
                          {item.emiPlan.interestRate === 0 ? (
                            <span className="text-emerald-600 font-bold">
                              0% No-Cost EMI
                            </span>
                          ) : (
                            <span className="text-slate-500">
                              {item.emiPlan.interestRate}% Interest
                            </span>
                          )}
                          <span className="text-amber-600 font-medium">
                            ₹{item.emiPlan.cashback.toLocaleString('en-IN')} Cashback
                          </span>
                        </div>
                      </div>

                      <div className="sm:text-right shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                        <span className="text-[11px] text-slate-400 block font-medium">Total Payout</span>
                        <span className="text-base font-black text-slate-900 block">
                          {formatPrice(item.emiPlan.totalAmount)}
                        </span>
                        <Link
                          to={`/product/${item.product.slug}`}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700"
                        >
                          View Phone <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
