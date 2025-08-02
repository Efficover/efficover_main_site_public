import React, { useState } from 'react';
import { Calendar, Bell, Sparkles, FileText, CheckCircle } from 'lucide-react';
import VOCVisualizer from './VOCDemoVisualizer.tsx';
import EOBDemoProcessor from './EOBDemoProcessor.tsx';

const Demo = () => {
  const [activeDemo, setActiveDemo] = useState<'voc' | 'eob'>('voc');

  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              See Efficover in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              See how Efficover automates routine tasks and provides intelligent tools for complex case management
            </p>
          </div>

          {/* Demo Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-xl p-2 shadow-lg">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveDemo('voc')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    activeDemo === 'voc'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Sparkles className="h-5 w-5" />
                  VOC Visualizer
                </button>
                <button
                  onClick={() => setActiveDemo('eob')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    activeDemo === 'eob'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <FileText className="h-5 w-5" />
                  EOB Processor
                </button>
              </div>
            </div>
          </div>

          {/* Demo Content */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8">
            <div className="relative">
              {activeDemo === 'voc' ? (
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    VOC Status Visualizer
                  </h3>
                  <div className="flex items-center justify-center space-x-2 text-green-600 mb-4">
                    <Sparkles className="h-5 w-5" />
                    <span className="font-semibold">Live patient electronic record updates with VOC status tracking</span>
                  </div>
                  <VOCVisualizer />
                </div>
              ) : (
                <div>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      EOB Processor & Reconciler
                    </h3>
                    <div className="flex items-center justify-center space-x-2 text-green-600 mb-4">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-semibold">AI-powered EOB processing with intelligent reconciliation</span>
                    </div>
                  </div>
                  <EOBDemoProcessor />
                </div>
              )}
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