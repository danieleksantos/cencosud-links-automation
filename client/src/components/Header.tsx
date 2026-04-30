const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 pb-6 mb-12 relative w-full">
      <div className="flex items-center">
        <img
          src="/cencosud-links-logo.png"
          alt="Cencosud Links Logo"
          className="h-15 w-auto object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        />
      </div>

      <div className="text-center">
        <p className="text-slate-600 text-[10px] md:text-[12px] uppercase font-black tracking-[0.4em] italic opacity-80">
          Content and Campaign Builder
        </p>
      </div>

      <div className="flex items-center">
        <img
          src="/just-logo.png"
          alt="Just Logo"
          className="h-7.5 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
        />
      </div>

      <div className="absolute bottom-0 left-6 right-6 h-px bg-slate-800/40"></div>
    </header>
  );
};

export default Header;
