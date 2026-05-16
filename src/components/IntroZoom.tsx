import { useEffect, useState } from 'react';

interface IntroZoomProps {
  onComplete: () => void;
  mainTitle: string;
  subtitle: string;
  description: string;
  tunnelWords: string[];
}

export default function IntroZoom({ onComplete, mainTitle, subtitle, description, tunnelWords }: IntroZoomProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % tunnelWords.length);
    }, 800);

    const timer = setTimeout(() => {
      setShowMainContent(true);
      clearInterval(interval);
    }, 4000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [tunnelWords.length, onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      {!showMainContent ? (
        <div className="text-center">
          <div className="text-6xl font-bold text-purple-400 mb-8 animate-pulse">
            {tunnelWords[currentWordIndex]}
          </div>
          <div className="w-16 h-1 bg-purple-400 mx-auto animate-pulse"></div>
        </div>
      ) : (
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl font-bold text-purple-400 mb-4">
            {mainTitle}
          </h1>
          <h2 className="text-2xl text-purple-300 mb-6">
            {subtitle}
          </h2>
          <p className="text-lg text-purple-200 max-w-md mx-auto">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}
