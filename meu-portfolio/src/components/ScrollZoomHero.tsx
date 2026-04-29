import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollZoomHero() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // O movimento da câmera avançando para dentro do túnel
  // Z positivo empurra as paredes para trás de você
  const moveZ = useTransform(scrollYProgress, [0, 1], [0, 2000]);

  // Constantes de estilo para o texto massivo
  const textStyle = "text-[#a855f7] font-black uppercase leading-[0.75] tracking-tighter whitespace-nowrap text-center flex flex-col justify-center items-center";

  return (
    // Altura de 200vh dá tempo suficiente para o usuário fazer o scroll e o túnel passar
    <div ref={containerRef} className="relative h-[200vh] bg-black">
      {/* Container fixo na tela com perspectiva super agressiva (500px) */}
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center" 
        style={{ perspective: '300px' }}
      >
        
        {/* CAIXA IMAGINÁRIA CENTRAL (Fica parada e tapa o fundo do túnel) */}
        <div className="relative z-50 bg-black px-5 py-16 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(0,0,0,1)] max-w-4xl">
          {/* Título Principal */}
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter text-center leading-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Davi Ferreira
          </h1>
          
          {/* Subtítulo */}
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-400 mt-4">
            Full Stack Developer
          </h2>
          
          {/* Linha divisória */}
          <div className="h-1.5 w-32 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full shadow-lg shadow-purple-500/50 mt-8" />
          
          {/* Descrição */}
          <p className="text-lg md:text-xl text-gray-300 mt-8 leading-relaxed max-w-3xl mx-auto font-medium">
            Transformando lógica complexa em experiências digitais eficientes. Especialista em{" "}
            <span className="text-purple-400 font-bold">TypeScript</span>,{" "}
            <span className="text-purple-400 font-bold">React</span> e{" "}
            <span className="text-purple-400 font-bold">Arquiteturas de Dados</span>.
          </p>
          
          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12 flex-wrap">
            <button
              onClick={() => document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold px-10 py-7 rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/60 group text-base flex items-center gap-3 cursor-pointer"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Ver Projetos
            </button>

            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://drive.google.com/uc?export=download&id=1q5vD1hZ-09_VDgyKR9c0cUcybgHv_nOK';
                link.download = 'Davi_Ferreira_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 font-bold px-10 py-7 rounded-lg transition-all duration-300 hover:border-purple-400 group text-base flex items-center gap-3 cursor-pointer"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Baixar CV
            </button>
          </div>
        </div>

        {/* CENA 3D (TÚNEL) - É ela que se move no eixo Z */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            transformStyle: "preserve-3d",
            translateZ: moveZ,
          }}
        >
          {/* PAREDE ESQUERDA (YOUR IDEAS) */}
          {/* Rotacionada no eixo Y para ficar na lateral e movida para a borda esquerda (-50vw) */}
          <div
            className="absolute flex flex-col items-center justify-center w-[4000px] h-[100vh] bg-black"
            style={{ transform: "translateX(-50vw) rotateY(90deg)" }}
          >
            <div className={textStyle}>
              <span className="text-[25vh]">PROJETOS</span>
              <span className="text-[35vh]">IDEAS</span>
            </div>
          </div>

          {/* PAREDE DIREITA (YOUR TOOLS) */}
          {/* Rotacionada no eixo Y ao contrário e movida para a borda direita (50vw) */}
          <div
            className="absolute flex flex-col items-center justify-center w-[4000px] h-[100vh] bg-black"
            style={{ transform: "translateX(50vw) rotateY(-90deg)" }}
          >
            <div className={textStyle}>
              <span className="text-[25vh]">IDEIAS</span>
              <span className="text-[35vh]">TOOL</span>
            </div>
          </div>

          {/* TETO (PORTFOLIO) */}
          {/* Rotacionada no eixo X para ficar virada para baixo e movida para o topo (-50vh) */}
          <div
            className="absolute flex flex-col items-center justify-center w-[100vw] h-[4000px] bg-black"
            style={{ transform: "translateY(-45vh) rotateX(-90deg)" }}
          >
            <div className={textStyle}>
              <span className="text-[15vw]">MEU</span>
              <span className="text-[18vw]">PORTFOLIO</span>
            </div>
          </div>

          {/* CHÃO (YOURS TO CREATE) */}
          {/* Rotacionada no eixo X para ficar virada para cima e movida para a base (50vh) */}
          <div
            className="absolute flex flex-col items-center justify-center w-[100vw] h-[4000px] bg-black"
            style={{ transform: "translateY(50vh) rotateX(90deg)" }}
          >
            <div className={textStyle}>
              <span className="text-[15vw]">PROJETOS</span>
              <span className="text-[20vw]">TO CREATE</span>
            </div>
          </div>
        </motion.div>

        {/* SOMBRA RADIAL NAS BORDAS (Para dar mais profundidade) */}
        <div className="absolute inset-0 z-40 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.9)_100%)]" />
      </div>
    </div>
  );
}
