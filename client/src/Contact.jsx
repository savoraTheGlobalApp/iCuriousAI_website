// Contact.jsx - Add this as a new component
import React, { useState } from 'react';
import { Mail, Send, User, MessageSquare } from 'lucide-react';

const colors = {
  primary: '#ffde59',
  accent: '#fea1f7',
  dark: '#000000',
  light: '#ffffff',
  neutral: '#d4d2d5'
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/.netlify/functions/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        window.location.href = '/thank-you';
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: `linear-gradient(135deg, ${colors.primary}10, ${colors.accent}10)` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.dark }}>
            Say hello to iCurious AI
          </h1>
          <p className="text-xl text-gray-600">For demos, partnerships, and press—let's chat</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.dark }}>
                Talk to the Founders
              </h3>
              <p className="text-gray-600 mb-4">
                We're building an AI buddy that makes play smarter and kinder
              </p>
              <p className="text-gray-600 mb-6">
                Reach out for pilots, retail and school partnerships, or media. We'll get back quickly.
              </p>
              <div className="flex items-center gap-3 p-4 rounded-lg" style={{ backgroundColor: `${colors.primary}20` }}>
                <Mail size={24} style={{ color: colors.accent }} />
                <div>
                  <p className="font-semibold">Email us directly:</p>
                  <a href="mailto:hello@icurious.ai" className="text-lg font-bold hover:underline" style={{ color: colors.accent }}>
                    hello@icurious.ai
                  </a>
                </div>
              </div>
            </div>

            {/* Founders Preview */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h4 className="text-xl font-bold mb-4" style={{ color: colors.dark }}>Our Founders</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }} />
                  <div>
                    <p className="font-semibold">Rajan Kumar</p>
                    <p className="text-sm text-gray-600">CEO & Co-Founder</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full" style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})` }} />
                  <div>
                    <p className="font-semibold">Shorya Kumar</p>
                    <p className="text-sm text-gray-600">CPO & Co-Founder</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }} />
                  <div>
                    <p className="font-semibold">Piyush Kumar</p>
                    <p className="text-sm text-gray-600">CTO & Co-Founder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
                  Your Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-current transition-colors"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{ accentColor: colors.primary }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
                  Your Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-current transition-colors"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    style={{ accentColor: colors.primary }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
                  I am a... *
                </label>
                <select
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-current transition-colors"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  style={{ accentColor: colors.primary }}
                >
                  <option value="">Select your role</option>
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

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <textarea
                    rows="4"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-current transition-colors resize-none"
                    placeholder="Tell us about your interest..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    style={{ accentColor: colors.primary }}
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full px-6 py-4 rounded-lg font-bold text-gray-900 transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: colors.primary }}
              >
                <Send size={20} />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;