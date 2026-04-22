import { useEffect, useState } from 'react';

export function useVoiceNav() {
  const [isListening, setIsListening] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  useEffect(() => {
    if (!isListening) return;

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
      setFeedbackText('Ouvindo...');
    };

    recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      const lowerTranscript = transcript.toLowerCase();
      setFeedbackText(`Detectado: ${transcript}`);

      // Navegação por voz
      if (lowerTranscript.includes('projetos')) {
        document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' });
      } else if (lowerTranscript.includes('sobre')) {
        document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' });
      } else if (lowerTranscript.includes('contato')) {
        document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
      } else if (lowerTranscript.includes('eventos')) {
        document.getElementById('eventos')?.scrollIntoView({ behavior: 'smooth' });
      } else if (lowerTranscript.includes('home') || lowerTranscript.includes('início')) {
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
      }

      setTimeout(() => setFeedbackText(''), 3000);
    };

    recognition.onerror = (event: any) => {
      setFeedbackText(`Erro: ${event.error}`);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return { isListening, toggleListening, feedbackText };
}