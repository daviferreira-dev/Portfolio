import { useState, useEffect, useRef } from 'react';
import * as handTrack from 'handtrackjs';

export function useVirtualMouse(sensitivity) {
  const [isActive, setIsActive] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const videoRef = useRef(null);
  const modelRef = useRef(null);

  // Configurações do Handtrack
  const modelParams = {
    flipHorizontal: true,   
    maxNumBoxes: 1,        // Detectar apenas uma mão
    iouThreshold: 0.5,     
    scoreThreshold: 0.6,    // Sensibilidade de detecção
  };

  useEffect(() => {
    if (!isActive) {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        stream?.getTracks().forEach(track => track.stop());
      }
      return;
    }

    // Criar elemento de vídeo oculto para processamento
    const video = document.createElement('video');
    videoRef.current = video;

    const startDetection = async () => {
      modelRef.current = await handTrack.load(modelParams);
      
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      video.srcObject = stream;
      video.play();

      const detect = async () => {
        if (!isActive) return;

        const predictions = await modelRef.current.detect(video);
        
        if (predictions.length > 0) {
          const hand = predictions[0].bbox; // [x, y, width, height]
          
          // Mapear coordenadas da câmera para a tela
          const screenX = (hand[0] + hand[2]/2) * (window.innerWidth / 640) * (sensitivity / 50);
          const screenY = (hand[1] + hand[3]/2) * (window.innerHeight / 480) * (sensitivity / 50);

          setCursorPos({ x: screenX, y: screenY });

          // Lógica de "Clique": Se a mão estiver muito fechada (largura pequena)
          // Você pode refinar isso verificando a distância entre dedos com MediaPipe futuramente
          const isClosed = hand[2] < 70; 
          setIsClicking(isClosed);

          if (isClosed) {
            const el = document.elementFromPoint(screenX, screenY);
            el?.click();
          }
        }
        requestAnimationFrame(detect);
      };

      detect();
    };

    startDetection();

    return () => {
      setIsActive(false);
    };
  }, [isActive]);

  return { isActive, setIsActive, cursorPos, isClicking };
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768);
  }, []);
  return isMobile;
}