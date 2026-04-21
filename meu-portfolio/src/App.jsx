import { useContext, useState } from 'react';
import { ThemeContext } from './contexts/ThemeContext';
import { useVoiceNav } from './hooks/useVoiceNav';
import { useVirtualMouse, useIsMobile } from './hooks/useVirtualMouse';

export default function App() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { isListening, toggleListening, feedbackText } = useVoiceNav();
  const isMobile = useIsMobile();
  const [sensitivity, setSensitivity] = useState(50);
  const { isActive: mouseActive, setIsActive: setMouseActive, cursorPos, isClicking } = useVirtualMouse(sensitivity);

  return (
    <div>
      {/* OVERLAY DE ACESSIBILIDADE E FEEDBACK */}
      <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 100, display: 'flex', gap: '10px' }}>
        <button 
          onClick={toggleListening} 
          style={{ animation: isListening ? 'pulse 1.5s infinite' : 'none' }}>
          🎤 {isListening ? 'Ouvindo...' : 'Voz Off'}
        </button>
        {feedbackText && <span style={{ background: '#333', color: '#fff', padding: '10px', borderRadius: '5px' }}>{feedbackText}</span>}
      </div>

      {/* OVERLAY DO MOUSE VIRTUAL (Só renderiza se mobile e ativo) */}
      {mouseActive && (
        <div style={{
          position: 'fixed',
          left: cursorPos.x,
          top: cursorPos.y,
          width: '20px', height: '20px',
          backgroundColor: isClicking ? 'red' : 'blue',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'background-color 0.2s'
        }} />
      )}

      {/* HERO SECTION */}
      <section id="home" onMouseEnter={() => setTheme('standard')}>
        <h1>Davi Ferreira</h1>
        <h2>Desenvolvedor Full Stack JR</h2>
        <p>Portfólio interativo com navegação por gestos, voz e design mutável.</p>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={() => document.getElementById('projetos').scrollIntoView()}>Ver Projetos</button>
          
          {isMobile ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <button onClick={() => setMouseActive(!mouseActive)}>
                ✋ {mouseActive ? 'Desativar' : 'Ativar'} Mouse Virtual
              </button>
              {mouseActive && (
                <input 
                  type="range" min="10" max="100" 
                  value={sensitivity} 
                  onChange={(e) => setSensitivity(e.target.value)} 
                  title="Sensibilidade do Gesto"
                />
              )}
            </div>
          ) : (
            <button disabled title="Indisponível em Desktop" style={{ opacity: 0.5 }}>✋ Mouse Virtual (Só Mobile)</button>
          )}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="sobre" onMouseEnter={() => setTheme('standard')}>
        <h3>Sobre mim</h3>
        <p>Formado em bootcamp pela Kenzie, sou um desenvolvedor Junior Full Stack apaixonado por resolver problemas com código. Tenho forte interesse em Inteligência Artificial, Visão Computacional e eventos STEM. Amando resolver problemas com código, hardware e participação em eventos de ciência e tecnologia!</p>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projetos">
        <h3>Projetos</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          
          {/* PROJETO 1: Terminal Theme Trigger */}
          <div className="card" 
               onMouseEnter={() => setTheme('terminal')}
               onMouseLeave={() => setTheme('standard')}>
            <h4>Mouse Virtual – Navegação por Gestos</h4>
            <p>Controle de navegação usando a câmera e reconhecimento de gestos da mão. (Mobile only).</p>
            <small>Techs: JS, MediaPipe, Canvas</small><br/>
            <i>Aviso: Este desenvolvedor entende de APIs de hardware e performance.</i>
          </div>

          {/* PROJETO 2 */}
          <div className="card">
            <h4>Navegação por Voz (Web Speech API)</h4>
            <p>Acessibilidade multimodal para navegação sem as mãos.</p>
            <small>Techs: React Hooks, SpeechRecognition API</small>
          </div>

        </div>
      </section>

      {/* EVENTS SECTION (Creative Theme Trigger) */}
      <section id="eventos" onMouseEnter={() => setTheme('creative')}>
        <h3>Eventos & Competições STEM</h3>
        <div className="card">
          <h4>Hackathon IA 2023</h4>
          <p><strong>Papel:</strong> Desenvolvedor Full Stack (Finalista)</p>
          <p>Integração de LLMs para resolver problemas de mobilidade urbana em 24h.</p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contato" onMouseEnter={() => setTheme('standard')}>
        <h3>Contato</h3>
        <p>Email: davi@email.com</p>
        <p>GitHub: github.com/daviferreira</p>
        {isMobile && (
          <button onClick={() => window.open('https://wa.me/5511999999999', '_blank')}>
            📱 Chamar no WhatsApp
          </button>
        )}
      </section>
    </div>
  );
}