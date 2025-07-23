import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Trigger animations on component mount
    setIsVisible(true);
  }, []);

  const icons = {
    linkedin: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    github: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
    instagram: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
  };

  const teamMembers = [
    {
      name: 'Sarvesh Wani',
      image: 'SARVESH.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/sarvesh-wani-205104297/',
        github: 'https://github.com/sarveshwani0501',
        instagram: 'https://instagram.com/_sarvesh_0501_'
      },
      gradient: 'from-teal-400 to-cyan-500',
      borderColor: 'border-cyan-500'
    },
    {
      name: 'Sarish Sonawane',
      image: 'SARISH.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/sarish-sonawane-6a14b6293',
        github: 'https://github.com/Sarish05',
        instagram: 'https://instagram.com/sarish_5'
      },
      gradient: 'from-blue-400 to-indigo-500',
      borderColor: 'border-indigo-500'
    },
    {
      name: 'Om Gholap',
      image: 'OM.jpg',
      social: {
        linkedin: 'http://www.linkedin.com/in/om-gholap-4b011b293',
        github: 'https://github.com/omgholap11',
        instagram: 'https://instagram.com/omgholap.45'
      },
      gradient: 'from-emerald-400 to-teal-500',
      borderColor: 'border-teal-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header Section */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">Meet Our Team</h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            We've developed an advanced AI-powered platform to detect scams in phone calls and emails. Our system uses cutting-edge technology for real-time protection against fraudulent communications.
          </p>
        </div>

        {/* Team Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-24 lg:gap-24">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl p-4 transition-all duration-300 hover:-translate-y-2 border-t-4 ${member.borderColor} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Profile Image */}
              <div className="w-32 h-32 mx-auto mb-4 rounded-none overflow-hidden shadow-md">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                {/* Fallback for broken image */}
                <div className={`w-full h-full bg-gradient-to-br ${member.gradient} items-center justify-center text-white text-3xl font-bold hidden`}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{member.name}</h3>

              {/* Social Links */}
              <div className="flex justify-center items-center space-x-4 mt-4">
                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transform hover:scale-125 transition-all duration-200">
                  <img src={icons.linkedin} alt="LinkedIn" className="w-6 h-6" />
                </a>
                <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transform hover:scale-125 transition-all duration-200">
                  <img src={icons.github} alt="GitHub" className="w-6 h-6" />
                </a>
                <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transform hover:scale-125 transition-all duration-200">
                  <img src={icons.instagram} alt="Instagram" className="w-6 h-6" />
                </a>
              </div>   
            </div>
          ))}
        </div>
        
        
      </div>
    </div>
  );
};

export default About;
