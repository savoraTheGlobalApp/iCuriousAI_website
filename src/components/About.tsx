import { GraduationCap, Heart, School, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import RajanPhoto from '../assets/Rajan_photograph.jpg';
import ShoryaPhoto from '../assets/Shorya_photo.jpg';
import PiyushPhoto from '../assets/Piyush_photo.jpg';

export function About() {
  const founders = [
    {
      name: 'Dr. Rajan Kumar',
      role: 'Co-Founder & CEO',
      education: 'MBBS, AIIMS Delhi',
      image: RajanPhoto
    },
    {
      name: 'Shorya Kumar',
      role: 'Co-Founder & CPO',
      education: 'B.Tech, IIT Kanpur',
      image: ShoryaPhoto
    },
    {
      name: 'Piyush Kumar',
      role: 'Co-Founder & CTO',
      education: 'B.Tech, IIT Kanpur',
      image: PiyushPhoto
    }
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl mb-6 text-black">
            Mission-Driven Team
          </h2>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Designed by alums from <span className="text-black font-semibold">AIIMS Delhi</span> and <span className="text-black font-semibold">IIT Kanpur</span>
          </p>
        </div>

        {/* Founders */}
        <div className="mb-20">
          <h3 className="text-3xl mb-10 text-center text-black">Meet Our Founders</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className="mb-6 overflow-hidden rounded-2xl">
                  <ImageWithFallback
                    src={founder.image}
                    alt={founder.name}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-2xl mb-2 text-black">{founder.name}</h4>
                <p className="text-lg text-gray-600 mb-1">{founder.role}</p>
                <p className="text-base text-gray-500">{founder.education}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-8 rounded-2xl bg-[#FFD93D]/10 hover:bg-[#FFD93D]/20 transition-colors">
            <div className="w-16 h-16 bg-[#FFD93D] rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap size={32} className="text-black" />
            </div>
            <h3 className="text-2xl mb-3 text-black">World-Class Expertise</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Combining medical insights with engineering excellence to create technology that truly serves children's development.
            </p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-[#FFD93D]/10 hover:bg-[#FFD93D]/20 transition-colors">
            <div className="w-16 h-16 bg-[#FFD93D] rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-black" />
            </div>
            <h3 className="text-2xl mb-3 text-black">Child-First Approach</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Every feature is designed with children's cognitive and emotional growth at the center of our decisions.
            </p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-[#FFD93D]/10 hover:bg-[#FFD93D]/20 transition-colors">
            <div className="w-16 h-16 bg-[#FFD93D] rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-black" />
            </div>
            <h3 className="text-2xl mb-3 text-black">Parent Partnership</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              We enhance quality family time, working alongside parents rather than replacing their irreplaceable role.
            </p>
          </div>
        </div>


      </div>
    </section>
  );
}
