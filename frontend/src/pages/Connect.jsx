import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-50 via-white to-slate-50">
      <section className="pt-32 pb-20 px-4 text-center max-w-4xl mx-auto">
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-indigo-600 uppercase bg-indigo-50 rounded-full border border-indigo-100">
          Official NST Student Support
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
          Your Future at <span className="text-indigo-600">NST</span> <br /> Starts with Clarity.
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          The bridge between prospective students and real campus life. Get unfiltered answers from seniors who are already living the journey.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/faqs" className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:-translate-y-1">
            Browse Knowledge Base
          </Link>
          <Link to="/connect" className="bg-white text-slate-900 border border-slate-200 px-10 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm hover:-translate-y-1">
            Talk to a Senior
          </Link>
        </div>
      </section>

      <section className="py-24 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-white/60 backdrop-blur-md p-10 rounded-3xl border border-white shadow-xl shadow-slate-200/50 transition-all hover:border-indigo-200">
            <div className="bg-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-indigo-200 shadow-lg text-white font-bold text-xl">1</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Search</h3>
            <p className="text-slate-600 leading-relaxed">Access a curated database of common queries about the M4 MacBook, Sonipat hostel, and AI curriculum.</p>
          </div>
          <div className="group bg-white/60 backdrop-blur-md p-10 rounded-3xl border border-white shadow-xl shadow-slate-200/50 transition-all hover:border-indigo-200">
            <div className="bg-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-indigo-200 shadow-lg text-white font-bold text-xl">2</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Connect</h3>
            <p className="text-slate-600 leading-relaxed">Filter seniors by their tech stack or year. Find someone building exactly what you want to learn.</p>
          </div>
          <div className="group bg-white/60 backdrop-blur-md p-10 rounded-3xl border border-white shadow-xl shadow-slate-200/50 transition-all hover:border-indigo-200">
            <div className="bg-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-indigo-200 shadow-lg text-white font-bold text-xl">3</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Succeed</h3>
            <p className="text-slate-600 leading-relaxed">Book a 1-on-1 Calendly session to finalize your decision with confidence and peer-reviewed facts.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;