import { useEffect, useState, useCallback, useRef } from 'react';

export function useVoiceNav() {
  const [isListening, setIsListening] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  
  // Ref para controlar o estado real e evitar closures travadas
  const isListeningRef = useRef(false);
  const recognitionRef = useRef<any>(null);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      // Forçamos o encerramento manual para não cair no onend de reinicialização
      recognitionRef.current.onend = null; 
      recognitionRef.current = null;
    }
    setIsListening(false);
    isListeningRef.current = false;
    setFeedbackText('Navegação por voz desativada');
    setTimeout(() => setFeedbackText(''), 2000);
  };

  const startRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setFeedbackText('Navegação por voz não suportada');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setFeedbackText('🎙️ Ouvindo...');
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
      setFeedbackText(`Comando: "${transcript}"`);

      const routes: { [key: string]: string[] } = {
        'home': ['home', 'início', 'topo', 'voltar'],
        'sobre': ['sobre', 'quem é', 'perfil', 'biografia', 'mim'],
        'skills': ['skills', 'habilidades', 'tecnologias', 'conhecimento'],
        'trajetoria': ['trajetória', 'jornada', 'experiência', 'carreira', 'história'],
        'projetos': ['projetos', 'portfólio', 'trabalhos', 'feito'],
        'contato': ['contato', 'falar', 'mensagem', 'email', 'conversar']
      };

      Object.entries(routes).forEach(([id, keywords]) => {
        if (keywords.some(key => transcript.includes(key))) {
          scrollToSection(id);
        }
      });
    };

    recognition.onend = () => {
      // SÓ reinicia se a ref disser que ainda deve estar ligado
      if (isListeningRef.current) {
        recognition.start();
      }
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'no-speech') return;
      console.error('Erro reconhecimento:', event.error);
      stopRecognition();
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    isListeningRef.current = true;
  };

  const toggleListening = () => {
    if (isListeningRef.current) {
      stopRecognition();
    } else {
      startRecognition();
    }
  };

  // Limpeza ao desmontar o componente
  useEffect(() => {
    return () => {
      if (isListeningRef.current) stopRecognition();
    };
  }, []);

  return { isListening, toggleListening, feedbackText };
}