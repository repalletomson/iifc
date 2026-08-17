import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, MapPin, IndianRupee, ArrowLeft,
  QrCode, CheckCircle, Smartphone, Copy, Check, Music,
} from 'lucide-react';
import { Link, useParams } from 'wouter';
import { useTheme } from '@/lib/themeContext';
import { useConfig } from '@/lib/configContext';
import type { Event } from '@/lib/googleSheets';
import {
  DUMMY_EVENTS, APPS_SCRIPT_URL, buildUpiLink,
  extractDriveId, toImgUrl, eventSlug,
} from '@/lib/eventsData';

// ─── QR Image with fallback chain ────────────────────────────────────────────
function QrImage({ fileId, src }: { fileId: string; src: string }) {
  const [strategy, setStrategy] = useState<'thumbnail' | 'iframe' | 'failed'>('thumbnail');
  const thumbnailUrl = fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w600` : src;
  const iframeSrc    = fileId ? `https://drive.google.com/file/d/${fileId}/preview` : '';

  if (strategy === 'thumbnail') {
    return (
      <img src={thumbnailUrl} alt="UPI QR Code"
        className="w-full max-w-sm mx-auto rounded-2xl object-contain"
        onLoad={() => console.log('[QR] loaded ✓')}
        onError={() => { console.warn('[QR] thumbnail failed'); setStrategy(iframeSrc ? 'iframe' : 'failed'); }}
      />
    );
  }
  if (strategy === 'iframe') {
    return (
      <iframe src={iframeSrc} title="UPI QR Code"
        className="w-full max-w-sm mx-auto h-80 rounded-2xl border-0"
        onLoad={() => console.log('[QR] iframe loaded ✓')}
        onError={() => { console.warn('[QR] iframe failed'); setStrategy('failed'); }}
      />
    );
  }
  return (
    <div className="w-full max-w-sm mx-auto h-64 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-3 p-4 text-center">
      <QrCode className="w-10 h-10 text-gray-400" />
      <p className="text-sm text-gray-500">QR could not load</p>
      {fileId && (
        <a href={`https://drive.google.com/file/d/${fileId}/view`} target="_blank" rel="noopener noreferrer"
          className="text-sm text-[#C13584] underline font-medium">Open QR in Drive →</a>
      )}
    </div>
  );
}

// ─── Copy UPI ID ─────────────────────────────────────────────────────────────
function CopyUpiId({ upiId }: { upiId: string }) {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const copy = () => navigator.clipboard.writeText(upiId).then(() => {
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  });
  return (
    <button onClick={copy} className={`flex items-center gap-2 text-sm font-mono px-4 py-3 rounded-xl w-full justify-between transition-colors border ${
      theme === 'light' ? 'bg-muted border-border hover:bg-gray-200 text-foreground' : 'bg-white/8 border-white/10 hover:bg-white/15 text-white'
    }`}>
      <span className="truncate">{upiId}</span>
      {copied ? <Check className="w-4 h-4 text-green-500 shrink-0" /> : <Copy className="w-4 h-4 text-gray-400 shrink-0" />}
    </button>
  );
}

// ─── Description renderer ────────────────────────────────────────────────────
function EventDescription({ text }: { text: string }) {
  const { theme } = useTheme();
  const muted = theme === 'light' ? 'text-muted-foreground' : 'text-gray-300';
  const bold  = theme === 'light' ? 'text-foreground font-bold' : 'text-white font-bold';
  return (
    <div className="space-y-3">
      {text.split('\n').filter(l => l.trim()).map((para, i) => {
        if (para.startsWith('**') && para.endsWith('**'))
          return <p key={i} className={`text-base mt-2 ${bold}`}>{para.slice(2, -2)}</p>;
        if (para.startsWith('- '))
          return (
            <div key={i} className={`flex items-start gap-2.5 text-sm ${muted}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C13584] mt-[7px] shrink-0" />
              <span>{para.slice(2)}</span>
            </div>
          );
        return <p key={i} className={`text-sm leading-relaxed ${muted}`}>{para}</p>;
      })}
    </div>
  );
}

// ─── Registration Steps panel ─────────────────────────────────────────────────
function RegistrationSteps({ event }: { event: Event }) {
  const { theme } = useTheme();
  const [step, setStep]             = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError]   = useState('');
  const [formData, setFormData]     = useState({ email: '', phone: '' });

  const isFree  = !event.price || event.price === '0';
  const upiLink = event.upi_id ? buildUpiLink(event.upi_id, event.price || '0', event.title) : '';

  const muted   = theme === 'light' ? 'text-muted-foreground' : 'text-gray-400';
  const heading = theme === 'light' ? 'text-foreground' : 'text-white';
  const card    = theme === 'light'
    ? 'bg-card border border-border rounded-2xl p-6'
    : 'bg-[#111] border border-white/10 rounded-2xl p-6';
  const inputCls = `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
    theme === 'light'
      ? 'bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-[#C13584]'
      : 'bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#C13584]'
  }`;

  const STEP_LABELS = isFree ? ['Your Details', 'Done'] : ['Your Details', 'Payment'];

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError('');
    if (!formData.phone.trim()) return setFormError('Please enter your WhatsApp number.');
    if (!formData.email.trim()) return setFormError('Please enter your email address.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) return setFormError('Please enter a valid email address.');
    setSubmitting(true);
    try {
      if (APPS_SCRIPT_URL) {
        await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify({
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            event: event.title,
            event_id: event.id,
            timestamp: new Date().toISOString(),
          }),
        });
      }
    } catch (err) {
      console.warn('[Registration] Sheet POST failed:', err);
    } finally {
      setSubmitting(false);
      setStep(2);
    }
  }

  return (
    <div className={card}>
      {/* Price */}
      <div className="mb-5">
        <p className="text-[#C13584] text-xs font-bold uppercase tracking-widest mb-1">Registration Fee</p>
        <p className={`text-4xl font-black ${heading}`}>{isFree ? 'FREE' : `₹${event.price}`}</p>
        {!isFree && <p className={`text-xs mt-1 ${muted}`}>per person · inclusive of all charges</p>}
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-1 mb-6">
        {STEP_LABELS.map((label, idx) => {
          const n       = idx + 1;
          const done    = step > n;
          const current = step === n;
          return (
            <React.Fragment key={n}>
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  done || current ? 'gradient-bg text-white'
                    : theme === 'light' ? 'bg-muted text-muted-foreground border border-border'
                    : 'bg-white/10 text-gray-500 border border-white/10'
                }`}>
                  {done ? <CheckCircle className="w-4 h-4" /> : n}
                </div>
                <span className={`text-[9px] font-semibold uppercase tracking-wide hidden sm:block ${current ? 'text-[#C13584]' : muted}`}>
                  {label}
                </span>
              </div>
              {n < STEP_LABELS.length && (
                <div className={`flex-1 h-px mb-4 ${done ? 'gradient-bg' : theme === 'light' ? 'bg-border' : 'bg-white/10'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── STEP 1: Contact details ── */}
      {step === 1 && (
        <motion.form initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
          onSubmit={handleFormSubmit} className="space-y-4">
          <p className={`text-sm font-bold ${heading}`}>Step 1 — Your Details</p>
          <p className={`text-xs ${muted}`}>Fill in your details to register.</p>

          <div className="space-y-3">
            <div>
              <label className={`text-xs font-semibold block mb-1 ${muted}`}>WhatsApp Number *</label>
              <input type="tel" placeholder="e.g. 9876543210"
                value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                className={inputCls} required />
            </div>
            <div>
              <label className={`text-xs font-semibold block mb-1 ${muted}`}>Email Address *</label>
              <input type="email" placeholder="e.g. rahul@gmail.com"
                value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                className={inputCls} required />
            </div>
          </div>

          {formError && <p className="text-xs text-red-500 font-medium">{formError}</p>}

          <button type="submit" disabled={submitting}
            className="w-full gradient-bg text-white rounded-xl py-3.5 font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2">
            {submitting
              ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</>
              : isFree ? 'Register for Free →' : 'Continue to Payment →'
            }
          </button>
        </motion.form>
      )}

      {/* ── STEP 2: Payment or Done ── */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          {isFree ? (
            <>
              <p className={`text-sm font-bold ${heading}`}>You're Registered! 🎟</p>
              <div className={`rounded-xl p-4 border ${
                theme === 'light' ? 'bg-green-50 border-green-200' : 'bg-green-950/30 border-green-800/40'
              }`}>
                <p className="text-green-600 font-semibold text-sm">Registration confirmed.</p>
                <p className={`text-xs mt-1 ${muted}`}>We've saved your details. See you at the event!</p>
              </div>
            </>
          ) : (
            <>
              <p className={`text-sm font-bold ${heading}`}>Step 2 — Complete Payment</p>

              {upiLink && (
                <a href={upiLink}
                  className="flex items-center gap-3 w-full gradient-bg text-white rounded-xl px-5 py-4 font-semibold hover:opacity-90 transition-opacity">
                  <Smartphone className="w-5 h-5 shrink-0" />
                  <div className="text-left">
                    <p className="font-bold text-sm">Pay ₹{event.price} with UPI</p>
                    <p className="text-xs opacity-80">Opens PhonePe / GPay / Paytm</p>
                  </div>
                </a>
              )}

              {event.upi_id && (
                <div>
                  <p className={`text-xs mb-1.5 ${muted}`}>Or copy UPI ID and pay manually</p>
                  <CopyUpiId upiId={event.upi_id} />
                </div>
              )}

              <p className={`text-xs text-center ${muted}`}>
                On desktop — scan the QR on the left with PhonePe / GPay
              </p>
            </>
          )}

          <button onClick={() => setStep(1)}
            className={`w-full text-xs py-2 rounded-lg transition-colors ${
              theme === 'light' ? 'text-muted-foreground hover:bg-muted' : 'text-gray-500 hover:bg-white/5'
            }`}>
            ← Back
          </button>
        </motion.div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function EventDetail() {
  const { theme }  = useTheme();
  const params     = useParams<{ id: string }>();
  const { events: rawEvents, loading } = useConfig();

  const allEvents = rawEvents.length > 0 ? rawEvents : DUMMY_EVENTS;
  const event     = useMemo(() => allEvents.find(e => eventSlug(e) === params.id), [allEvents, params.id]);

  const heroSrc  = event ? toImgUrl(event.image, 'w1600') : '';
  const isFree   = !event?.price || event.price === '0';
  const qrFileId = extractDriveId(event?.qr_image || '');
  const qrSrc    = event?.qr_image || '';
  const hasQr    = !!(qrSrc || qrFileId);
  const muted    = theme === 'light' ? 'text-muted-foreground' : 'text-gray-400';
  const heading  = theme === 'light' ? 'text-foreground' : 'text-white';

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <div className="w-8 h-8 border-2 border-[#C13584] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center pt-20 gap-4">
        <Calendar className="w-16 h-16 text-[#C13584]/40" />
        <h1 className="font-serif text-2xl font-bold">Event not found</h1>
        <Link href="/events">
          <button className="gradient-bg text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90">
            ← Back to Events
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen pt-20 transition-colors duration-300">

      {/* ── Banner ── */}
      <section className="relative w-full h-60 md:h-80 overflow-hidden">
        {heroSrc ? (
          <img src={heroSrc} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${
            theme === 'light' ? 'from-[#833AB4]/15 via-[#C13584]/10 to-[#E1306C]/8'
                              : 'from-[#833AB4]/40 via-[#C13584]/25 to-[#E1306C]/20'
          } flex items-center justify-center`}>
            <Music className="w-20 h-20 text-[#C13584]/25" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute top-4 left-6 z-10">
          <Link href="/events">
            <button className="flex items-center gap-2 text-white/85 hover:text-white text-sm font-medium bg-black/35 backdrop-blur-sm px-4 py-2 rounded-full transition-colors border border-white/20">
              <ArrowLeft className="w-4 h-4" /> All Events
            </button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto max-w-7xl">
            {event.category && (
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#C13584]/80 text-white mb-2">
                {event.category}
              </span>
            )}
            <h1 className="font-serif text-xl md:text-3xl font-bold text-white leading-tight max-w-2xl">{event.title}</h1>
            <div className="flex flex-wrap gap-4 mt-2 text-white/70 text-xs">
              {event.date   && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#C13584]" />{event.date}</span>}
              {event.venue  && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#833AB4]" />{event.venue}{event.city ? `, ${event.city}` : ''}</span>}
              <span className="font-bold text-white flex items-center gap-1">
                {isFree ? '🎟 Free Entry' : <><IndianRupee className="w-3 h-3" />{event.price} per person</>}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-10">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

            {/* LEFT (2/3): description + quick info + QR */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-8">

              <div>
                <h2 className={`font-serif text-xl font-bold mb-4 ${heading}`}>About this Event</h2>
                <EventDescription text={event.description} />
              </div>

              {/* Quick details */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl p-5 border ${
                theme === 'light' ? 'bg-muted border-border' : 'bg-[#111] border-white/8'
              }`}>
                {[
                  { icon: <Calendar className="w-4 h-4 text-[#C13584]" />,    label: 'Date',  value: event.date },
                  { icon: <MapPin className="w-4 h-4 text-[#833AB4]" />,      label: 'Venue', value: event.venue && `${event.venue}${event.city ? `, ${event.city}` : ''}` },
                  { icon: <IndianRupee className="w-4 h-4 text-[#d4a853]" />, label: 'Fee',   value: isFree ? 'Free Entry' : `₹${event.price} per person` },
                ].filter(d => d.value).map((d, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      theme === 'light' ? 'bg-white border border-border' : 'bg-white/5'
                    }`}>{d.icon}</div>
                    <div>
                      <p className={`text-[10px] uppercase tracking-wider font-semibold ${muted}`}>{d.label}</p>
                      <p className={`text-sm font-medium mt-0.5 ${heading}`}>{d.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* QR — big, bottom of left col */}
              {hasQr && !isFree && (
                <div className={`rounded-2xl p-6 border text-center ${
                  theme === 'light' ? 'bg-muted border-border' : 'bg-[#111] border-white/8'
                }`}>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <QrCode className={`w-4 h-4 ${muted}`} />
                    <p className={`text-sm font-semibold ${heading}`}>Scan to Pay · ₹{event.price}</p>
                  </div>
                  <QrImage fileId={qrFileId} src={qrSrc} />
                  <p className={`text-xs mt-3 ${muted}`}>Open PhonePe / GPay → Scan QR</p>
                </div>
              )}
            </motion.div>

            {/* RIGHT (1/3): registration steps */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="lg:col-span-1 lg:self-end">
              <RegistrationSteps event={event} />
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
