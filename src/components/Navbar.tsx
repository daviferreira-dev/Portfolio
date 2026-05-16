import { useState, useEffect } from 'react';

// Tipagem para as seções (IDs do HTML)
type NavItem = {
  id: string;
  label: string;
};

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(false);

  const navItems: NavItem[] = [
    { id: 'sobre', label: 'Sobre' },
    { id: 'skills', label: 'Skills' },
    { id: 'trajetoria', label: 'Jornada' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'contato', label: 'Contato' },
  ];

  useEffect(() => {
    // Lógica para detecção de scroll
    const handleScroll = () => {
      // Pega a altura total da janela (viewport)
      const viewportHeight = window.innerHeight;
      // Define o ponto exato onde a Nav deve aparecer (um pouco antes do fim da intro)
      const triggerPoint = viewportHeight * 0.9; 

      if (window.scrollY > triggerPoint) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Função para scroll suave (Native JavaScript)
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Ajuste de offset se necessário (normalmente 80-100px para NavBars)
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0'
      }`}
    >
      {/* Container Principal da Nav (Vidro + Borda) */}
      <div className="max-w-7xl mx-auto px-6 py-4 mt-4">
        <div className="bg-black/50 backdrop-blur-lg border border-white/5 rounded-full flex items-center justify-between px-8 py-3 shadow-2xl shadow-purple-950/20">
          
          {/* Logo / Nome Minimalista */}
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-6 h-6 rounded-full bg-purple-600 border border-purple-500 shadow-lg shadow-purple-600/30"></div>
            <span className="text-xl font-extrabold text-white tracking-tighter uppercase">Davi Ferreira</span>
          </div>

          {/* Links de Navegação */}
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="px-5 py-2.5 font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-white/70 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-all"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Ícone sutil de "Contato Rápido" */}
          <div className="flex items-center gap-3">
             <a href="https://www.linkedin.com/in/davi-ferreira-dev/" target="_blank" className="text-white/30 hover:text-white transition-colors">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
             </a>
             <a href="#contato" className="px-5 py-2.5 text-xs font-bold bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
                Fale Comigo! 
             </a>
          </div>

        </div>
      </div>
    </nav>
  );
}