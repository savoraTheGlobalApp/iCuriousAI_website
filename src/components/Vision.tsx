import { AlertCircle, Target, Lightbulb, Shield } from 'lucide-react';

export function Vision() {
  const problems = [
    {
      title: 'Screen Addiction',
      description: 'Screens are turning active minds into passive consumers'
    },
    {
      title: 'Mental Health Crisis',
      description: 'Kids are more anxious and isolated than ever'
    },
    {
      title: 'Cognitive Decline',
      description: 'Constant scrolling is shrinking attention spans'
    },
    {
      title: 'AI Dependency',
      description: 'Instant answers from AI stop kids from thinking deeply'
    },
    {
      title: 'Declining Creativity',
      description: 'Passive entertainment kills the imagination needed for play'
    },
    {
      title: 'Rote Learning',
      description: 'Schools focus on memorizing facts, not sparking curiosity'
    }
  ];

  const solutions = [
    {
      icon: Target,
      title: 'Better Technology',
      description: 'Screen-free interfaces that promote active engagement and natural interaction'
    },
    {
      icon: Lightbulb,
      title: 'Critical Thinking',
      description: 'AI that questions, challenges, and encourages independent thought'
    },
    {
      icon: Shield,
      title: 'Privacy-First',
      description: 'Built with security and privacy as foundational principles'
    }
  ];

  return (
    <section id="vision" className="py-24 bg-gradient-to-br from-gray-50 to-[#FFD93D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl mb-6 text-black">
            Our Vision
          </h2>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Reimagining how we interact with technology
          </p>
        </div>

        {/* The Problem */}
        <div className="mb-20">
          <div className="flex items-center justify-center gap-3 mb-10">
            <AlertCircle size={36} className="text-red-500" />
            <h3 className="text-4xl text-black">The Problem Today</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-2xl border-2 border-red-100 hover:border-red-300 hover:shadow-lg transition-all text-center"
              >
                <h4 className="text-2xl mb-3 text-red-600">{problem.title}</h4>
                <p className="text-lg text-gray-700 leading-relaxed">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Approach */}
        <div className="mb-20">
          <h3 className="text-4xl mb-10 text-center text-black">
            Our Approach
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="p-10 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="w-16 h-16 bg-[#FFD93D] rounded-2xl flex items-center justify-center mb-6">
                  <solution.icon size={32} className="text-black" />
                </div>
                <h4 className="text-2xl mb-4 text-black">{solution.title}</h4>
                <p className="text-lg text-gray-700 leading-relaxed">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
