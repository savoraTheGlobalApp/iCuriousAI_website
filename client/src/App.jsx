import React, { useState, useEffect, useRef} from 'react';
import { Menu, X, Sparkles, GraduationCap, Lightbulb, Wand2, BarChart3, Rocket, Bell, Gift, Users, Linkedin, Twitter, Instagram, Youtube, ChevronRight, Send, Heart } from 'lucide-react';
import ReCAPTCHA from "react-google-recaptcha";
import confetti from 'canvas-confetti';

const colors = {
  primary: '#ffde59',
  accent: '#fea1f7',
  dark: '#000000',
  light: '#ffffff',
  neutral: '#d4d2d5'
};

export const Navigation = ({ onJumpTo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mobileLinks = (
    <div className="md:hidden bg-white border-t">
      <div className="px-4 py-4 space-y-3">
        <a href="#home" onClick={() => setIsOpen(false)} className="block py-2 text-gray-700 hover:text-gray-900">Home</a>
        <a href="#products" onClick={() => setIsOpen(false)} className="block py-2 text-gray-700 hover:text-gray-900">Products</a>
        <a href="#vision" onClick={() => setIsOpen(false)} className="block py-2 text-gray-700 hover:text-gray-900">Vision</a>
        <a href="#features" onClick={() => setIsOpen(false)} className="block py-2 text-gray-700 hover:text-gray-900">Features</a>
        <a href="#contact" onClick={() => setIsOpen(false)} className="block py-2 text-gray-700 hover:text-gray-900">Contact</a>
        <button
          className="w-full px-6 py-2 rounded-lg font-semibold text-gray-900"
          style={{ backgroundColor: colors.primary }}
          onClick={() => { setIsOpen(false); onJumpTo?.('waitlist'); }}
        >
          Join Waitlist
        </button>
      </div>
    </div>
  );

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white/90 backdrop-blur-md'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }} />
            <span className="font-bold text-xl" style={{ color: colors.dark }}>iCurious AI</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Home</a>
            <a href="#products" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Products</a>
            <a href="#vision" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Vision</a>
            <a href="#features" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Features</a>
            <a href="#contact" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Contact</a>
            <button
              className="px-6 py-2 rounded-lg font-semibold text-gray-900 transition-all hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: colors.primary }}
              onClick={() => onJumpTo?.('waitlist')}
            >
              Join Waitlist
            </button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && mobileLinks}
    </nav>
  );
};

export const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20" style={{ background: `linear-gradient(135deg, ${colors.primary}15, ${colors.accent}15)` }}>
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-30 top-20 left-10" style={{ backgroundColor: colors.primary }} />
        <div className="absolute w-80 h-80 rounded-full blur-3xl opacity-30 bottom-20 right-10" style={{ backgroundColor: colors.accent }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 backdrop-blur-sm" style={{ backgroundColor: `${colors.primary}20`, border: `1px solid ${colors.primary}40` }}>
          <Sparkles size={16} style={{ color: colors.accent }} />
          <span className="font-semibold text-sm">AI-Powered Learning Companion</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          <span className="block animate-fade-in" style={{ color: colors.dark }}>Play, Explore & Learn</span>
          <span className="block animate-fade-in-delay" style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>with your AI buddy</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto font-medium">
          Reduces Screen Time • Nurtures Curiosity • Prepares for AI Era
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#products" className="px-8 py-4 rounded-xl font-bold text-lg text-gray-900 transition-all hover:scale-105 hover:shadow-2xl flex items-center gap-2" style={{ backgroundColor: colors.primary }}>
            Explore AI Buddy
            <ChevronRight size={20} />
          </a>
          <a href="#waitlist" className="px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 border-2" style={{
            borderColor: colors.accent,
            color: colors.accent
          }}>
            Join Waitlist
          </a>
        </div>
      </div>
    </section>
  );
};

export const Vision = () => {
  return (
    <section id="vision" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.dark }}>Our Vision</h2>
          <p className="text-xl font-semibold" style={{ color: colors.accent }}>Intelligent Play. Intuitive Learning.</p>
        </div>

        <div className="relative max-w-4xl mx-auto p-8 rounded-3xl" style={{
          background: `linear-gradient(135deg, ${colors.primary}15, ${colors.accent}15)`,
          border: `1px solid ${colors.neutral}30`
        }}>
          <div className="absolute -top-4 left-8 w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
            <span className="text-2xl">✨</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-center leading-relaxed" style={{ color: colors.dark }}>
            To create a world where learning is an act of pure delight, and curiosity is the only interface you'll ever need.
          </p>
        </div>
      </div>
    </section>
  );
};

export const Features = () => {
  const features = [
    { icon: <GraduationCap size={32} />, title: 'Educational Support', description: 'Age-appropriate answers to academic questions that support structured learning and homework assistance.' },
    { icon: <Lightbulb size={32} />, title: 'Discovery & Curiosity', description: 'Encourages natural scientific inquiry and exploration beyond formal education boundaries.' },
    { icon: <Wand2 size={32} />, title: 'Entertainment', description: 'Creative content delivery including stories, poems, and entertainment tailored to individual interests.' },
    { icon: <BarChart3 size={32} />, title: 'Parent Dashboard', description: 'Conversation analytics and personalized activity recommendations based on child\'s interaction patterns.' }
  ];

  return (
    <section id="features" className="py-20" style={{ background: `linear-gradient(180deg, white, ${colors.primary}10)` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.dark }}>How the AI Buddy Works</h2>
          <p className="text-xl text-gray-600">Intelligent conversations that spark curiosity and learning</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border-t-4"
              style={{ borderTopColor: index % 2 === 0 ? colors.primary : colors.accent }}
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
                <div style={{ color: colors.dark }}>{feature.icon}</div>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.dark }}>{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Products = () => {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: `${colors.accent}20` }}>
            <Heart size={16} style={{ color: colors.accent }} />
            <span className="font-semibold text-sm">Coming Soon</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.dark }}>iCurious AI Buddy</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A conversational companion that listens, chats, and encourages creative play—built with privacy-first controls for families.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-linear-to-br from-white to-gray-50 p-8 rounded-3xl shadow-xl border" style={{ borderColor: colors.neutral }}>
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                  <span className="text-2xl">🎤</span>
                </div>
                <span className="font-semibold">Wake Word & Chat</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                  <span className="text-2xl">🔊</span>
                </div>
                <span className="font-semibold">Kid-Friendly Voices</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                  <span className="text-2xl">🛡️</span>
                </div>
                <span className="font-semibold">Parental Controls</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#waitlist" className="px-8 py-4 rounded-xl font-bold text-gray-900 transition-all hover:scale-105 hover:shadow-xl" style={{ backgroundColor: colors.primary }}>
                Join Waitlist
              </a>
              <a href="#contact" className="px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 border-2" style={{
                borderColor: colors.accent,
                color: colors.accent
              }}>
                Partner With Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const scrollToThankYouAndCelebrate = (delay = 150) => {
  setTimeout(() => {
    const el = document.getElementById('thankyou');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });

    try {
      confetti({ particleCount: 80, spread: 60, origin: { x: 0.5, y: 0.2 } });
      confetti({ particleCount: 60, spread: 90, origin: { x: 0.2, y: 0.3 } });
      confetti({ particleCount: 60, spread: 90, origin: { x: 0.8, y: 0.3 } });
    } catch (err) {
      console.warn('Confetti failed', err);
    }
  }, delay);
};

export const Waitlist = () => {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      alert('Please enter your email.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/.netlify/functions/waitlist-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to join waitlist");
      }
      scrollToThankYouAndCelebrate();
      setFormData({ name: '', email: '', mobile: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to submit. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="py-20" style={{ background: `linear-gradient(135deg, ${colors.primary}20, ${colors.accent}20)` }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: colors.primary }}>
          <Rocket size={32} style={{ color: colors.dark }} />
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.dark }}>Join the Waitlist</h2>
        <p className="text-xl text-gray-600 mb-8">Be first to meet our AI buddy—updates, early offers, and pilot invites</p>

        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name (optional)"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-current transition-colors"
              style={{ accentColor: colors.primary }}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-current transition-colors"
              style={{ accentColor: colors.primary }}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Mobile Number (optional)"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-current transition-colors"
              style={{ accentColor: colors.primary }}
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full px-6 py-4 rounded-lg font-bold text-gray-900 transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
              style={{ backgroundColor: colors.primary }}
            >
              <Send size={20} />
              {submitting ? 'Joining…' : 'Join Waitlist'}
            </button>
          </form>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Bell size={16} style={{ color: colors.accent }} />
              <span>Early Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift size={16} style={{ color: colors.accent }} />
              <span>Exclusive Offers</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} style={{ color: colors.accent }} />
              <span>Join Community</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", role: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const recaptchaRef = useRef(null);

  const SITE_KEY = "6LcEV6YrAAAAAEL5ODYA_oSSprvXuKYqutm8fpHZ";
;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email) {
      alert("Please enter your email.");
      return;
    }

    setSubmitting(true);

    try {
      const recaptchaToken = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();

      const payload = {
        ...form,
        "g-recaptcha-response": recaptchaToken
      };

      const res = await fetch("/.netlify/functions/submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to submit contact form");
      }

      scrollToThankYouAndCelebrate();
      setForm({ name: "", email: "", role: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to send your message. Try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Say hello to iCurious AI</h1>
          <p className="text-gray-600">For demos, partnerships, and press—let's chat</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-2">Talk to the Founders</h3>
            <p className="text-gray-600 mb-4">
              We're building an AI buddy that makes play smarter and kinder.
              Reach out for pilots, retail and school partnerships, or media.
            </p>
            <p className="text-sm">
              <strong>Email us directly:</strong>{" "}
              <a className="text-yellow-400" href="mailto:hello@icurious.ai">
                hello@icurious.ai
              </a>
            </p>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Our Founders</h4>
              <div className="space-y-4">
                <div>
                  <div className="font-semibold">Rajan Kumar</div>
                  <div className="text-sm text-gray-500">Co-Founder & CEO</div>
                </div>
                <div>
                  <div className="font-semibold">Shorya Kumar</div>
                  <div className="text-sm text-gray-500">Co-Founder & CPO</div>
                </div>
                <div>
                  <div className="font-semibold">Piyush Kumar</div>
                  <div className="text-sm text-gray-500">Co-Founder & CTO</div>
                </div>
              </div>
            </div>
          </div>

          {/* FORM WITH INVISIBLE CAPTCHA */}
          <div className="bg-white p-8 rounded-2xl shadow">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  required
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <input
                  required
                  type="email"
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <select
                  required
                  className="w-full px-4 py-3 border rounded-lg"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="">I am a...</option>
                  <option value="learner">Learner</option>
                  <option value="parent">Parent</option>
                  <option value="educator">Educator</option>
                  <option value="school-partner">School Partner</option>
                  <option value="retail-partner">Retail Partner</option>
                  <option value="investor">Investor</option>
                  <option value="media">Media/Press</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <textarea
                  className="w-full px-4 py-3 border rounded-lg"
                  rows="4"
                  placeholder="Tell us about your interest..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                ></textarea>
              </div>

              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={SITE_KEY}
                size="invisible"
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-4 py-3 rounded-lg bg-yellow-300 font-semibold"
              >
                {submitting ? "Sending…" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ThankYou = () => {
  return (
    <section id="thankyou" className="py-20 bg-gradient-to-b from-white to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="celebrate relative">
          <div aria-hidden className="absolute -z-10" style={{ inset: 0 }}>
          </div>

          <div className="card bg-white/90 p-8 rounded-3xl shadow-xl mx-auto" style={{ border: '1px solid rgba(0,0,0,0.04)' }}>
            <div className="icon-wrap w-20 h-20 rounded-full mx-auto mb-4 grid place-items-center" style={{ background: 'conic-gradient(from 180deg, #6d5efc, #a855f7, #22d3ee)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <h1 className="text-3xl font-extrabold mb-2">Thanks — we got your message!</h1>
            <p className="text-gray-600 mb-6">We appreciate your interest in iCurious AI. We'll review your message and get back soon.</p>

            <div className="flex justify-center gap-3">
              <a href="#products" className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold">Explore Products</a>
              <a href="#home" className="px-4 py-2 rounded-lg border">Back to Home</a>
            </div>

            <p className="text-xs text-gray-400 mt-6">You can always email us at <a href="mailto:hello@icurious.ai" className="text-yellow-400">hello@icurious.ai</a></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`
                }}
              />
              <span className="font-bold text-xl">iCurious AI</span>
            </div>
            <p className="text-gray-400">
              Playful AI companion that sparks curiosity and creativity while reducing screen time.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#products" className="text-gray-400 hover:text-white transition-colors">Products</a></li>
              <li><a href="#vision" className="text-gray-400 hover:text-white transition-colors">Vision</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Connect</h4>
            <p className="text-gray-400 mb-4">
              <a href="mailto:hello@icurious.ai" className="hover:text-white transition-colors">
                hello@icurious.ai
              </a>
            </p>
            <div className="flex gap-4">
              <a href="https://x.com/iCuriousAI" className="w-10 h-10 bg-white/10 rounded-full grid place-items-center hover:bg-white/20 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.linkedin.com/company/icurious-ai/" className="w-10 h-10 bg-white/10 rounded-full grid place-items-center hover:bg-white/20 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/iCuriousAI/" className="w-10 h-10 bg-white/10 rounded-full grid place-items-center hover:bg-white/20 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@iCuriousAI" className="w-10 h-10 bg-white/10 rounded-full grid place-items-center hover:bg-white/20 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 iCurious AI. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};


export default function App() {
  const handleJumpTo = (section) => {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.3s both;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <Navigation onJumpTo={handleJumpTo} />

      <Hero />
      <Vision />
      <Features />
      <Products />
      <Waitlist />
      <Contact />
      <ThankYou />
      <Footer />
    </div>
  );
}
