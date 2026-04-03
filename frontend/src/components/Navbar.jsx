import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            {/* Subtle glow effect behind the logo on hover */}
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative w-11 h-11 bg-slate-950 rounded-xl flex items-center justify-center overflow-hidden shadow-lg shadow-slate-200 transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-0.5 group-active:scale-95">
              <img 
                src="://www.tribuneindia.com/sortd-servichttpse/imaginary/v22-01/jpg/large/high?url=dGhldHJpYnVuZS1zb3J0ZC1wcm8tcHJvZC1zb3J0ZC9tZWRpYWVkNmQxYzUwLTE1M2ItMTFmMC05YzRkLWExYjFjMjMzZTcyMi5qcGc=" 
                alt="NST Logo" 
                className="w-full h-full object-cover p-1.5" 
              />
            </div>
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              NST <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Connect</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-0.5">
              Student Gateway
            </span>
          </div>
        </Link>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Knowledge Base', 'Talk to Seniors'].map((item) => (
            <Link 
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`} 
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          
          <Link 
            to="/admin" 
            className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 active:scale-95"
          >
            Admin Portal
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;