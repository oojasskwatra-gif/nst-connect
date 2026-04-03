import { useState, useEffect } from 'react';
import { getStudents } from '../lib/api';

function Connect() {
  const [students, setStudents] = useState([]);

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

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-black text-slate-900 mb-4">Meet Your Mentors</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Get personalized insights into the NST ecosystem. Book a call with students specialized in AI, Full-Stack, and Data Science.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {students.map((student) => (
            <div key={student._id} className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 p-8 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-12 -mt-12 transition-all group-hover:bg-indigo-100"></div>
              
              <div className="relative">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-slate-200">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">{student.name}</h2>
                    <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Batch 202{4+student.year} • Year {student.year}</p>
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

                <a 
                  href={student.calendlyLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 hover:-translate-y-1"
                >
                  <span>Schedule 1-on-1</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {students.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">Seniors are currently in class. Check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Connect;