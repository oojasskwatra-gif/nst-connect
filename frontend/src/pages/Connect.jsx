import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStudents } from '../lib/api';

function Connect() {
  const [students, setStudents] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All'); // NEW: Filter state

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // NEW: Categories for the filter chips
  const categories = ['All', 'MERN', 'AI/ML', 'UI/UX', 'Python', 'Data Science'];

  // NEW: Filter logic
  const filteredStudents = activeFilter === 'All' 
    ? students 
    : students.filter(student => 
        student.techStack.some(tech => tech.toLowerCase().includes(activeFilter.toLowerCase()))
      );

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-4">Meet Your Mentors</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Get personalized insights into the NST ecosystem. Book a call with students specialized in your field of interest.
          </p>
        </header>

        {/* NEW: Filter Buttons */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-4 justify-center hide-scrollbar">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
                activeFilter === cat 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Change students.map to filteredStudents.map */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudents.map((student) => (
            <div key={student._id} className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 p-8 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-12 -mt-12 transition-all group-hover:bg-indigo-100"></div>
              
              <div className="relative">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-slate-200">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">{student.name}</h2>
                    <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Year {student.year}</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Domain Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {student.techStack.map((tech, index) => (
                      <span key={index} className="bg-slate-50 text-slate-600 text-xs px-3 py-1.5 rounded-lg border border-slate-100 font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <a href={student.calendlyLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-3 rounded-2xl hover:bg-indigo-600 transition-all shadow-lg hover:-translate-y-1">
                    <span>Schedule</span>
                  </a>
                  {student.whatsappNumber && (
                    <a href={`https://wa.me/${student.whatsappNumber.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 rounded-2xl hover:bg-[#128C7E] transition-all shadow-lg hover:-translate-y-1">
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* If a filter yields no results */}
        {filteredStudents.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No mentors found for this category yet.</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Connect;