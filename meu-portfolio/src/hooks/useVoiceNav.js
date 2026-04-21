import { useState, useEffect } from 'react';

export function useVoiceNav() {
  const [isListening, setIsListening] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech API não suportada neste navegador.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript.toLowerCase().trim();
      setFeedbackText(`Comando: "${transcript}"`);

      // Lógica de roteamento/scroll
      if (transcript.includes('projetos')) document.getElementById('projetos')?.scrollIntoView();
      else if (transcript.includes('eventos')) document.getElementById('eventos')?.scrollIntoView();
      else if (transcript.includes('contato')) document.getElementById('contato')?.scrollIntoView();
      else if (transcript.includes('sobre')) document.getElementById('sobre')?.scrollIntoView();
      else if (transcript.includes('home') || transcript.includes('topo')) window.scrollTo(0, 0);
      
      setTimeout(() => setFeedbackText(''), 3000);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => recognition.stop();
  }, [isListening]);

  const toggleListening = () => setIsListening(!isListening);

  return { isListening, toggleListening, feedbackText };
}