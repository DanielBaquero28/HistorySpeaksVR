'use client'; 

import React, { useState, FormEvent } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { ArrowRight } from 'lucide-react'; 

interface FormDataState {
    name: string;
    email: string;
    school: string;
    students: string;
    message: string;
}

export default function DemoContactForm() {
  const FORMSPREE_ID = "mvgwgwpk"; // 👈 IMPORTANT: Use your actual ID
  const [state, formspreeHandleSubmit] = useForm(FORMSPREE_ID);
  
  const [formData, setFormData] = useState<FormDataState>({ name: '', email: '', school: '', students: '', message: '' });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Prepare data for Formspree
    // const submissionData = new FormData(e.currentTarget);
    // Alternatively, use the formData state if you prefer:
    /*
    const submissionData = new FormData();
    submissionData.append('name', formData.name);
    submissionData.append('email', formData.email);
    submissionData.append('school', formData.school);
    submissionData.append('students', formData.students);
    submissionData.append('message', formData.message);
    */

    formspreeHandleSubmit(e);
  };
  
  // Renders the success message upon successful submission
  if (state.succeeded) {
      return (
        <div className="text-center p-8 bg-green-900/50 rounded-lg text-white">
            <h3 className="text-2xl font-bold mb-2">Demo Request Sent! 🎉</h3>
            <p className="text-lg">Thank you! We&apos;ll contact your school within 24 hours to schedule the session.</p>
        </div>
      );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        
        {(state.errors && Object.keys(state.errors).length > 0) && (
            <div className="p-3 text-red-400 border border-red-700 rounded-lg">
                Submission failed. Please check your inputs and try again.
            </div>
        )}

        {/* --- Full Name Field --- */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Full Name *
          </label>
          <input 
            type="text" 
            id="name"
            name="name" 
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
            required
          />
          <ValidationError field="name" prefix="Name" errors={state.errors} className="text-red-400 mt-1 text-sm" />
        </div>

        {/* --- School Email Field --- */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            School Email *
          </label>
          <input 
            type="email" 
            id="email"
            name="email" 
            value={formData.email}
            onChange={handleInputChange}
            placeholder="yourname@school.edu"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
            required
          />
          <ValidationError field="email" prefix="Email" errors={state.errors} className="text-red-400 mt-1 text-sm" />
        </div>
        
        {/* --- School/Institution Name Field --- */}
        <div>
          <label htmlFor="school" className="block text-sm font-medium text-gray-300 mb-2">
            School/Institution Name *
          </label>
          <input 
            type="text" 
            id="school"
            name="school"
            value={formData.school}
            onChange={handleInputChange}
            placeholder="Your School Name"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
            required
          />
          <ValidationError field="school" prefix="School" errors={state.errors} className="text-red-400 mt-1 text-sm" />
        </div>
        
        {/* --- Number of Students Field (Select) --- */}
        <div>
          <label htmlFor="students" className="block text-sm font-medium text-gray-300 mb-2">
            Number of Students
          </label>
          <select 
            id="students"
            name="students"
            value={formData.students}
            onChange={handleInputChange}
            // Ensure select has styling for text color
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
          >
            <option value="" disabled hidden>Select range</option>
            <option value="1-50">1-50 students</option>
            <option value="51-200">51-200 students</option>
            <option value="201-500">201-500 students</option>
            <option value="500+">500+ students</option>
          </select>
          <ValidationError field="students" prefix="Students" errors={state.errors} className="text-red-400 mt-1 text-sm" />
        </div>

        {/* --- Additional Information (Textarea) --- */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Additional Information
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={3}
            placeholder="Tell us about your specific needs or questions..."
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
          />
          <ValidationError field="message" prefix="Message" errors={state.errors} className="text-red-400 mt-1 text-sm" />
        </div>

        {/* --- Submit Button --- */}
        <button 
          type="submit"
          disabled={state.submitting} 
          className={`w-full px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
            state.submitting 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
          }`}
        >
          {state.submitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Submitting...
            </>
          ) : (
            <>
              Request Free Demo
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>
  );
}