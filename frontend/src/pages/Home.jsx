import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Magnetic from '../components/Magnetic'; 
import LiveActivity from '../components/LiveActivity';

function Home() {
  const nstLogo = "https://www.tribuneindia.com/sortd-service/imaginary/v22-01/jpg/large/high?url=dGhldHJpYnVuZS1zb3J0ZC1wcm8tcHJvZC1zb3J0ZC9tZWRpYWVkNmQxYzUwLTE1M2ItMTFmMC05YzRkLWExYjFjMjMzZTcyMi5qcGc=";
  const nsatLink = "https://www.newtonschool.co/newton-school-of-technology-nst/apply-referral/?utm_source=referral&utm_medium=kushalrathore19&utm_campaign=btech-computer-science-nst-students-referral-invite-your-junior--portal-referral";

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100 overflow-x-hidden">
      <LiveActivity />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Subtle Backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[45%] rounded-full bg-blue-100 blur-[140px]"></div>
          <div className="absolute bottom-[15%] right-[-5%] w-[35%] h-[35%] rounded-full bg-indigo-50 blur-[120px]"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-5 py-2 mb-10 rounded-full bg-white border border-slate-200 text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] shadow-sm"
          >
            <img src={nstLogo} alt="NST Logo" className="w-6 h-6 object-contain" />
            Institutional Mentorship Portal
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-10"
          >
            Academic Insight. <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-indigo-600">
              Peer Driven.
            </span>
          </motion.h1>

          <motion.p 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto mb-14 leading-relaxed font-medium"
          >
            A strategic gateway for NSAT aspirants and parents to access authentic perspectives on the Newton School of Technology curriculum, culture, and career trajectory.
          </motion.p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
            <Magnetic>
              <Link 
                to="/connect" 
                className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all block"
              >
                Connect with Batch Leads
              </Link>
            </Magnetic>
            
            <Magnetic>
              <a 
                href={nsatLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-sm block"
              >
                Apply for NSAT 2026
              </a>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* --- STRATEGIC PILLARS --- */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 mb-32"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16 border-y border-slate-100">
          <div className="text-center md:text-left">
            <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4">Curriculum</p>
            <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">AI-First Foundation</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Direct guidance on navigating the advanced CS syllabus and the M4-optimized development environment.</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4">Mentorship</p>
            <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Batch Intelligence</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Connect with students specialized in System Design, Competitive Programming, and Full-Stack Development.</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4">Integration</p>
            <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Campus Ecosystem</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Understanding the professional lifestyle, Sonipat residency, and the collaborative NST culture.</p>
          </div>
        </div>
      </motion.section>

      {/* --- SERVICES SECTION --- */}
      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black tracking-tight mb-4 text-slate-900">Student Resources</h2>
              <p className="text-slate-500 font-medium">Expert-led support designed to provide clarity for every stage of your NST journey.</p>
            </div>
            <Link to="/faqs" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 underline underline-offset-8">Explore Knowledge Base</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 group transition-all"
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-slate-900 transition-colors">
                <svg className="w-6 h-6 text-slate-900 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">1:1 Strategic Calls</h3>
              <p className="text-slate-500 leading-relaxed font-medium mb-6">Schedule personalized sessions via Calendly to discuss academic fit, NSAT preparation, and placement objectives.</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 group transition-all"
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-slate-900 transition-colors">
                <svg className="w-6 h-6 text-slate-900 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">Interview Vault</h3>
              <p className="text-slate-500 leading-relaxed font-medium mb-6">Access a centralized repository of student-led insights regarding the NST interview process and technical evaluations.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <motion.div 
          initial={{ scale: 0.98, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10 tracking-tighter">
            Architect your tech <br /> career with NST.
          </h2>
          <p className="text-slate-400 mb-12 max-w-lg mx-auto relative z-10 font-medium">
            Join the community of developers, engineers, and visionaries. Your seat at the AI-first revolution is ready.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Magnetic>
              <a 
                href={nsatLink}
                className="inline-block bg-white text-slate-900 px-12 py-5 rounded-2xl font-black text-xl hover:bg-slate-100 transition-all"
              >
                Start Your Application
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;