import { useState, useEffect } from 'react';
import { 
  loginAdmin, getQueries, createFaq, getFaqs, updateQueryStatus, 
  getPendingStudents, getStudents, approveStudent, // Added getStudents here
  deleteFaq, deleteStudent, deleteQuery 
} from '../lib/api';

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [queries, setQueries] = useState([]);
  const [pendingStudents, setPendingStudents] = useState([]);
  const [activeStudents, setActiveStudents] = useState([]); // New state for approved mentors
  const [faqs, setFaqs] = useState([]); 
  
  const [faqForm, setFaqForm] = useState({ category: 'Academics', question: '', answer: '' });

  useEffect(() => {
    // Check if the user is already logged in with a token
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      const [queriesRes, pendingRes, activeRes, faqsRes] = await Promise.all([
        getQueries(),
        getPendingStudents(),
        getStudents(), // Fetch approved mentors
        getFaqs('All') 
      ]);
      setQueries(queriesRes.data);
      setPendingStudents(pendingRes.data);
      setActiveStudents(activeRes.data);
      setFaqs(faqsRes.data);
    } catch (error) {
      console.error("Error fetching admin data", error);
      // If the token is invalid or expired, log them out
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAdmin(password);
      localStorage.setItem('adminToken', response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      alert("Incorrect password or server error!");
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setPassword(''); 
  };

  // --- CREATE & UPDATE HANDLERS ---
  const handleFaqSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createFaq(faqForm);
      setFaqs([...faqs, res.data]); 
      setFaqForm({ category: 'Academics', question: '', answer: '' });
      alert("FAQ successfully added!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusUpdate = async (id) => {
    try {
      await updateQueryStatus(id, 'Resolved');
      setQueries(queries.map(q => q._id === id ? { ...q, status: 'Resolved' } : q));
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleApproveMentor = async (id) => {
    try {
      await approveStudent(id);
      // Move student from pending to active state locally
      const studentToApprove = pendingStudents.find(s => s._id === id);
      setPendingStudents(pendingStudents.filter(s => s._id !== id));
      setActiveStudents([...activeStudents, { ...studentToApprove, isApproved: true }]);
      alert("Mentor approved and live!");
    } catch (error) {
      console.error("Approval failed", error);
    }
  };

  // --- DELETE (GOD MODE) HANDLERS ---
  const handleDeleteFaq = async (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      try {
        await deleteFaq(id);
        setFaqs(faqs.filter(f => f._id !== id));
      } catch (err) { console.error(err); }
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm("Remove this mentor permanently?")) {
      try {
        await deleteStudent(id);
        // Remove from both lists just in case
        setPendingStudents(pendingStudents.filter(s => s._id !== id));
        setActiveStudents(activeStudents.filter(s => s._id !== id));
      } catch (err) { console.error(err); }
    }
  };

  const handleDeleteQuery = async (id) => {
    if (window.confirm("Delete this query history?")) {
      try {
        await deleteQuery(id);
        setQueries(queries.filter(q => q._id !== id));
      } catch (err) { console.error(err); }
    }
  };

  // --- RENDER LOGIN ---
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <form onSubmit={handleLogin} className="p-8 bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-md text-center">
          <h2 className="mb-6 text-2xl font-bold">Admin Login</h2>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg outline-none focus:border-blue-500"
            placeholder="Enter Admin Password"
          />
          <button type="submit" className="w-full bg-slate-900 text-white font-semibold py-3 rounded-lg hover:bg-slate-800 transition">
            Access Dashboard
          </button>
        </form>
      </div>
    );
  }

  // --- RENDER DASHBOARD ---
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-12">
      <div className="flex justify-end">
        <button 
          onClick={handleLogout} 
          className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-100 transition"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* MENTOR MANAGEMENT SECTION */}
        <div className="space-y-8">
          {/* PENDING MENTORS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              Pending Approval <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">{pendingStudents.length}</span>
            </h2>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {pendingStudents.map(s => (
                <div key={s._id} className="p-3 bg-slate-50 rounded-xl border flex justify-between items-center">
                  <div>
                    <p className="font-bold text-sm">{s.name}</p>
                    <p className="text-xs text-slate-500">{s.techStack.join(', ')}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleApproveMentor(s._id)} className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg text-xs font-bold transition">Approve</button>
                    <button onClick={() => handleDeleteStudent(s._id)} className="bg-red-50 text-red-500 hover:bg-red-100 p-2 rounded-lg text-xs transition">🗑️</button>
                  </div>
                </div>
              ))}
              {pendingStudents.length === 0 && <p className="text-gray-400 text-sm italic">No pending requests.</p>}
            </div>
          </div>

          {/* ACTIVE MENTORS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              Active Mentors <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">{activeStudents.length}</span>
            </h2>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {activeStudents.map(s => (
                <div key={s._id} className="p-3 bg-white rounded-xl border flex justify-between items-center shadow-sm">
                  <p className="font-bold text-sm">{s.name}</p>
                  <button onClick={() => handleDeleteStudent(s._id)} className="text-red-400 hover:text-red-600 text-sm font-semibold transition">Remove</button>
                </div>
              ))}
              {activeStudents.length === 0 && <p className="text-gray-400 text-sm italic">No active mentors.</p>}
            </div>
          </div>
        </div>

        {/* SECTION 1: MANAGE FAQS */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-2xl font-bold mb-6">Manage FAQs</h2>
          <form onSubmit={handleFaqSubmit} className="space-y-4 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                <select 
                  className="w-full p-2 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                  value={faqForm.category}
                  onChange={(e) => setFaqForm({...faqForm, category: e.target.value})}
                >
                  <option value="Academics">Academics</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Placements">Placements</option>
                  <option value="Fees">Fees</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Question</label>
                <input 
                  type="text" required value={faqForm.question}
                  onChange={(e) => setFaqForm({...faqForm, question: e.target.value})}
                  className="w-full p-2 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Answer</label>
              <textarea 
                required rows="2" value={faqForm.answer}
                onChange={(e) => setFaqForm({...faqForm, answer: e.target.value})}
                className="w-full p-2 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition text-sm">
              Add FAQ
            </button>
          </form>

          {/* List existing FAQs to delete */}
          <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
            {faqs.map(faq => (
              <div key={faq._id} className="flex justify-between items-start p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase block mb-1">{faq.category}</span>
                  <p className="font-semibold text-slate-800">{faq.question}</p>
                </div>
                <button onClick={() => handleDeleteFaq(faq._id)} className="text-red-400 p-1 hover:bg-red-100 rounded ml-2 transition" title="Delete FAQ">
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SECTION 3: QUERIES */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Parent/Student Queries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {queries.map((query) => (
            <div key={query._id} className="p-5 rounded-xl border border-gray-200 flex flex-col justify-between relative group">
              
              <button 
                onClick={() => handleDeleteQuery(query._id)}
                className="absolute -top-3 -right-3 bg-red-100 text-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-sm hover:bg-red-200"
                title="Delete Query"
              >
                🗑️
              </button>

              <div>
                <div className="flex justify-between mb-3 pr-4">
                  <span className="font-bold">{query.senderName}</span>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${query.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                    {query.status || 'Pending'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg italic">"{query.message}"</p>
              </div>
              <div className="flex gap-2">
                <a href={`mailto:${query.senderEmail}`} className="flex-1 text-center text-xs bg-slate-100 py-2 rounded-lg font-bold hover:bg-slate-200 transition">Email</a>
                {query.status !== 'Resolved' && (
                  <button onClick={() => handleStatusUpdate(query._id)} className="flex-1 text-xs bg-green-50 text-green-600 py-2 rounded-lg font-bold border border-green-100 hover:bg-green-100 transition">
                    Resolve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;