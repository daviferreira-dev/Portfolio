import { useState } from 'react';
import IntroZoom from '@/components/IntroZoom';
import GitHubStats from '@/components/GitHubStats';
import ScrollZoomHero from '@/components/ScrollZoomHero'; //
import { useTheme } from '@/contexts/ThemeContext'; //
import { useVoiceNav } from '@/hooks/useVoiceNav'; //
import { useVirtualMouse } from '@/hooks/useVirtualMouse'; //
import { useIsMobile } from '@/hooks/useIsMobile'; //



export default function Home() {
  const [showIntro, setShowIntro] = useState(true); //
  const { setPortfolioTheme } = useTheme(); //
  const { isListening, toggleListening, feedbackText } = useVoiceNav(); //
  const isMobile = useIsMobile(); //
  const [sensitivity, setSensitivity] = useState(50); //
  const { isActive: mouseActive, setIsActive: setMouseActive, cursorPos, isClicking } = useVirtualMouse(sensitivity); //

  const handleIntroComplete = () => {
    setShowIntro(false); //
  };

  if (showIntro) {
    return (
      <IntroZoom
        onComplete={handleIntroComplete}
        mainTitle="Davi Ferreira"
        subtitle="Desenvolvedor Full Stack JR"
        description="Portfólio interativo."
        tunnelWords={["Suas", "Ideias", "Projetos", "Soluções"]}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* OVERLAY DE ACESSIBILIDADE E FEEDBACK */}
      <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 100, display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <button 
          onClick={toggleListening}
          style={{
            padding: '10px 15px',
            background: isListening ? '#a855f7' : '#3d3d54',
            color: '#f5f3ff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 500
          }}>
          🎤 {isListening ? 'Ouvindo...' : 'Voz Off'}
        </button>
        {feedbackText && (
          <span style={{ background: '#3d3d54', color: '#e9d5ff', padding: '10px', borderRadius: '5px', fontSize: '0.85rem' }}>
            {feedbackText}
          </span>
        )}
      </div>

      {/* OVERLAY DO MOUSE VIRTUAL */}
      {mouseActive && (
        <div style={{
          position: 'fixed',
          left: cursorPos.x,
          top: cursorPos.y,
          width: '20px',
          height: '20px',
          backgroundColor: isClicking ? '#ef4444' : '#a855f7',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 15px ${isClicking ? '#ef4444' : '#a855f7'}`
        }} />
      )}

      {/* NOVO HERO SECTION COM ZOOM NO SCROLL */}
      {/* Substituímos a section estática pelo componente ScrollZoomHero */}
      <div onMouseEnter={() => setPortfolioTheme('standard')}>
        <ScrollZoomHero />
      </div>
      {/* GITHUB STATS SECTION */}
      <div onMouseEnter={() => setPortfolioTheme('standard')}>
        <GitHubStats />
      </div>

      {/* ... Restante das seções (Projetos, Eventos, Contato) ... */}
    </div>
  );
}