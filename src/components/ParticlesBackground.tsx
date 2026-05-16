import React, { useEffect, useState, useMemo } from 'react';

export default function ParticlesBackground() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Usamos requestAnimationFrame para um scroll mais fluido
      window.requestAnimationFrame(() => {
        setOffsetY(window.scrollY);
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // useMemo é essencial aqui: evita que as partículas mudem de posição 
  // toda vez que o componente re-renderizar pelo scroll
  const particles = useMemo(() => 
    Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      initialTop: Math.random() * 100, // Posição inicial em %
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.3 + 0.1, // Velocidade reduzida para um efeito elegante
      opacity: Math.random() * 0.5 + 0.1,
    })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white transition-transform duration-75 ease-out"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            boxShadow: p.size > 2 ? `0 0 10px rgba(168, 85, 247, 0.4)` : 'none',
            /* O SEGREDO: 
               Usamos o cálculo ((p.initialTop + (offsetY * p.speed * 0.05)) % 100)
               Isso faz com que a partícula, ao sair da tela, "reapareça" no topo ou fundo,
               criando um loop infinito de estrelas enquanto você navega.
            */
            top: `${(p.initialTop + (offsetY * p.speed * 0.1)) % 100}%`,
          }}
        />
      ))}
      
      {/* Nebulosas Estáticas (ou com parallax muito lento) */}
      <div 
        className="absolute top-[10%] left-[-10%] w-[60%] h-[60%] bg-purple-900/10 blur-[120px] rounded-full mix-blend-screen"
        style={{ transform: `translateY(${offsetY * 0.02}px)` }}
      />
      <div 
        className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/10 blur-[120px] rounded-full mix-blend-screen"
        style={{ transform: `translateY(${offsetY * -0.02}px)` }}
      />
    </div>
  );
}