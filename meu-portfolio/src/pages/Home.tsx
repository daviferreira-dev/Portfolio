import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useVoiceNav } from '@/hooks/useVoiceNav';

// Componentes
import Navbar from '@/components/Navbar';
import ParticlesBackground from '@/components/ParticlesBackground';
import IntroZoom from '@/components/IntroZoom';
import ScrollZoomHero from '@/components/ScrollZoomHero';
import About from '@/pages/About';
import Skills from '@/pages/Skills';
import Experience from '@/pages/Experience';
import Projects from '@/pages/Projects';
import Contact from '@/pages/Contact';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [eyeScrollActive, setEyeScrollActive] = useState(false);
  
  const { setPortfolioTheme } = useTheme();
  const { isListening, toggleListening, feedbackText } = useVoiceNav();
  
  // Hook de Íris com sistema de calibração e scroll automático

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return (
      <IntroZoom
        onComplete={handleIntroComplete}
        mainTitle="Davi Ferreira"
        subtitle="Desenvolvedor Full Stack"
        description="Transformando lógica complexa em experiências digitais."
        tunnelWords={["Lógica", "Código", "Sistemas", "Full Stack", "Inovação"]}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white scroll-smooth relative">
      {/* 1. FUNDO DE PARTÍCULAS INFINITO 
          Ele renderiza atrás de tudo devido ao z-0 e fixed no componente */}
      <ParticlesBackground />

      {/* 2. NAVBAR */}
      <Navbar />

      {/* 3. PAINEL DE COMANDOS (Voz + Íris) */}
      <div className="fixed top-6 right-6 z-[100] flex flex-col items-end gap-3">
        {/* Botão de Voz */}
        <button
          onClick={toggleListening}
          className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-300 font-mono text-[10px] font-bold tracking-widest ${
            isListening
              ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]'
              : 'bg-black/60 backdrop-blur-md border-white/10 text-white/50 hover:border-white/30'
          }`}
        >
          <span className={isListening ? 'animate-pulse' : ''}>
            {isListening ? '● ESCUTANDO' : '🎤 VOZ OFF'}
          </span>
        </button>

        {/* Feedback de Voz */}
        {feedbackText && (
          <div className="bg-purple-900/80 backdrop-blur-md border border-purple-500/50 px-4 py-2 rounded-xl text-[10px] font-mono text-white uppercase animate-in slide-in-from-right-4">
            {feedbackText}
          </div>
        )}
      </div>


      {/* 5. CONTEÚDO PRINCIPAL (Z-10 para ficar acima das partículas) */}
      <main className="relative z-10">
        <div id="home">
          <ScrollZoomHero />
        </div>

        <div id="sobre">
          <About />
        </div>

        <div id="skills">
          <Skills />
        </div>

        <div id="trajetoria">
          <Experience />
        </div>

        <div id="projetos">
          <Projects />
        </div>

        <div id="contato">
          <Contact />
        </div>
      </main>
    </div>
  );
}