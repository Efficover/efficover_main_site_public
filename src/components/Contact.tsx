import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, FileText, Calendar, Building2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    practice: '',
    phone: '',
    message: '',
    requestType: 'demo',
    practiceSize: '',
    currentPMS: '',
    preferredContact: 'email',
    timeline: '',
    budget: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Netlify Forms will handle the submission automatically
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        practice: '',
        phone: '',
        message: '',
        requestType: 'demo',
        practiceSize: '',
        currentPMS: '',
        preferredContact: 'email',
        timeline: '',
        budget: ''
      });
    }, 5000);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your insurance workflows? Contact us today to schedule a demo 
            or submit a Letter of Intent to get started with Efficover.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Choose Efficover?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Quick Implementation</h4>
                    <p className="text-gray-600">HIPAA-compliant setup with your existing PMS</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Dedicated Support</h4>
                    <p className="text-gray-600">24/7 support from healthcare workflow experts who understand dental practices</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">ROI</h4>
                    <p className="text-gray-600">Staff efficiency gains and better denial management improve practice profitability</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                What We Need for Your LOI
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Practice size and current patient volume</li>
                <li>• Current practice management system</li>
                <li>• Implementation timeline preferences</li>
                <li>• Budget considerations</li>
                <li>• Primary contact information</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            {!isSubmitted ? (
              <form 
                name="contact" 
                method="POST" 
                data-netlify="true" 
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                {/* Netlify Forms hidden fields */}
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <input name="bot-field" />
                </div>

                <div>
                  <label htmlFor="requestType" className="block text-sm font-medium text-gray-700 mb-2">
                    Request Type *
                  </label>
                  <select
                    id="requestType"
                    name="requestType"
                    value={formData.requestType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="demo">Request a Demo</option>
                    <option value="loi">Submit Letter of Intent (LOI)</option>
                    <option value="pricing">Pricing Information</option>
                    <option value="integration">Integration Questions</option>
                    <option value="support">General Support</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Dr. John Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="practice" className="block text-sm font-medium text-gray-700 mb-2">
                      Practice Name *
                    </label>
                    <input
                      type="text"
                      id="practice"
                      name="practice"
                      value={formData.practice}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your Dental Practice"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                {/* LOI-specific fields */}
                {(formData.requestType === 'loi' || formData.requestType === 'demo') && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="practiceSize" className="block text-sm font-medium text-gray-700 mb-2">
                          Practice Size
                        </label>
                        <select
                          id="practiceSize"
                          name="practiceSize"
                          value={formData.practiceSize}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select practice size</option>
                          <option value="1-5">1-5 providers</option>
                          <option value="6-10">6-10 providers</option>
                          <option value="11-20">11-20 providers</option>
                          <option value="20+">20+ providers</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="currentPMS" className="block text-sm font-medium text-gray-700 mb-2">
                          Current PMS
                        </label>
                        <select
                          id="currentPMS"
                          name="currentPMS"
                          value={formData.currentPMS}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select your PMS</option>
                          <option value="Dentrix">Dentrix</option>
                          <option value="Eaglesoft">Eaglesoft</option>
                          <option value="Open Dental">Open Dental</option>
                          <option value="PracticeWorks">PracticeWorks</option>
                          <option value="Carestream">Carestream</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                          Implementation Timeline
                        </label>
                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select timeline</option>
                          <option value="Immediate">Immediate (within 30 days)</option>
                          <option value="1-3 months">1-3 months</option>
                          <option value="3-6 months">3-6 months</option>
                          <option value="6+ months">6+ months</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select budget range</option>
                          <option value="Under $5k">Under $5,000</option>
                          <option value="$5k-$10k">$5,000 - $10,000</option>
                          <option value="$10k-$25k">$10,000 - $25,000</option>
                          <option value="$25k+">$25,000+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Contact Method
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="email"
                            checked={formData.preferredContact === 'email'}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          Email
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="phone"
                            checked={formData.preferredContact === 'phone'}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          Phone
                        </label>
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={formData.requestType === 'loi' 
                      ? "Tell us about your practice's insurance workflow challenges and goals..." 
                      : "Tell us about your practice and how we can help..."}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>
                    {formData.requestType === 'loi' ? 'Submit LOI' : 'Send Request'}
                  </span>
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  {formData.requestType === 'loi' 
                    ? "We've received your Letter of Intent and will contact you within 24 hours to discuss next steps."
                    : "We've received your request and will get back to you within 24 hours."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;