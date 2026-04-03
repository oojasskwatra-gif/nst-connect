import { useState } from 'react';
import { createStudent } from '../lib/api';

function Join() {
  const [formData, setFormData] = useState({
    name: '',
    year: '1',
    techStack: '',
    calendlyLink: '',
    whatsappNumber: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Submitting your profile...' });

    try {
      // Convert comma-separated string into an array before sending
      const formattedData = {
        ...formData,
        techStack: formData.techStack.split(',').map(tech => tech.trim())
      };

      await createStudent(formattedData);
      
      setStatus({ type: 'success', message: 'Profile submitted successfully! You are now listed as a mentor.' });
      setFormData({ name: '', year: '1', techStack: '', calendlyLink: '', whatsappNumber: '' }); // Reset form
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: 'Failed to submit profile. Please try again.' });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-black text-slate-900 mb-4">Become a Mentor</h1>
          <p className="text-slate-600">Help prospective NST students by sharing your experience. Fill out the form below to be listed on the Connect page.</p>
        </header>

        {status.message && (
          <div className={`p-4 mb-8 rounded-xl font-medium text-center ${
            status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 
            status.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 
            'bg-blue-50 text-blue-700 border border-blue-200'
          }`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name *</label>
              <input 
                type="text" name="name" required value={formData.name} onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="e.g., Kushal Rathore"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Year of Study *</label>
              <select 
                name="year" value={formData.year} onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
              >
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Tech Stack / Domains *</label>
            <input 
              type="text" name="techStack" required value={formData.techStack} onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              placeholder="e.g., MERN, AI/ML, UI/UX (Comma separated)"
            />
            <p className="text-xs text-slate-500 mt-2">Separate multiple skills with commas.</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Calendly Link *</label>
            <input 
              type="url" name="calendlyLink" required value={formData.calendlyLink} onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              placeholder="https://calendly.com/your-username"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">WhatsApp Number (Optional)</label>
            <input 
              type="tel" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              placeholder="e.g., 919876543210 (Include country code, no +)"
            />
          </div>

          <button 
            type="submit" 
            disabled={status.type === 'loading'}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-indigo-600 transition-all shadow-lg hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {status.type === 'loading' ? 'Submitting...' : 'Join as Mentor'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Join;