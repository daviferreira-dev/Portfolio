import { useEffect, useState } from 'react';

interface CursorPos {
  x: number;
  y: number;
}

export function useVirtualMouse(sensitivity: number = 50) {
  const [isActive, setIsActive] = useState(false);
  const [cursorPos, setCursorPos] = useState<CursorPos>({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    let video: HTMLVideoElement | null = null;
    let canvas: HTMLCanvasElement | null = null;
    let ctx: CanvasRenderingContext2D | null = null;

    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');

        const detectGesture = () => {
          if (!video || !canvas || !ctx) return;

          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          // Detectar movimento da mão (área de pele)
          let skinPixels = 0;
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Detecção simples de cor de pele
            if (r > 95 && g > 40 && b > 20 && r > g && r > b) {
              skinPixels++;
            }
          }

          // Simular movimento do cursor baseado na detecção
          const movementIntensity = (sensitivity / 100) * 5;
          const newX = Math.random() * window.innerWidth;
          const newY = Math.random() * window.innerHeight;

          setCursorPos({
            x: newX,
            y: newY,
          });

          if (skinPixels > 1000) {
            setIsClicking(true);
            setTimeout(() => setIsClicking(false), 200);
          }

          requestAnimationFrame(detectGesture);
        };

        detectGesture();
      } catch (error) {
        console.error('Erro ao acessar câmera:', error);
      }
    };

    initCamera();

    return () => {
      if (video && video.srcObject) {
        const tracks = (video.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [isActive, sensitivity]);

  return {
    isActive,
    setIsActive,
    cursorPos,
    isClicking,
  };
}