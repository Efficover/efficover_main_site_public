import React from 'react';
import { Play, Calendar, Bell, Sparkles } from 'lucide-react';
import InteractiveAudioPlayer from './VOCDemo.tsx';

const Demo = () => {
  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              See Efficover in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how Efficover automates routine tasks and provides intelligent tools for complex case management
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8">
            <div className="relative">
              <div className="bg-gray-100 rounded-xl p-16 mb-8 flex items-center justify-center">
              <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Automated VOC Demo
              </h3>
              <div className="flex items-center justify-center space-x-2 text-blue-600 mb-4">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">See our agents quickly getting a VOC for a patient</span>
              </div>
              <div className="flex items-center justify-center">
                <InteractiveAudioPlayer audioFile='/public/voc_agent_demo.wav'/>
              </div>
            </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Scheduled Demo Sessions
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Book a personalized demo with our team to see Efficover tailored to your practice's needs
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-lg p-3">
                  <Bell className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Demo Notifications
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Get notified when our interactive demo goes live and be the first to experience it
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Want to See It Now?
            </h3>
            <p className="text-blue-100 mb-6 text-lg">
              Schedule a live demo with our team to see Efficover in action and discover how it can transform your practice
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold text-lg"
              >
                Schedule Live Demo
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200 font-semibold text-lg"
              >
                Get Notified
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;