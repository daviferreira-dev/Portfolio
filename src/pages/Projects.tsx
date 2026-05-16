import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';

// Importações das Imagens
import mario01 from '@/assets/jogoMario-01.png';
import mario02 from '@/assets/jogoMario-02.png';
import mario03 from '@/assets/jogoMario-03.png';
import mario04 from '@/assets/jogoMario-04.png';

import chatbot01 from '@/assets/autoAbout-01.png';
import chatbot02 from '@/assets/autoAbout-02.png';
import chatbot03 from '@/assets/autoAbout-03.png';
import chatbot04 from '@/assets/autoAbout-04.png';

import todolist00 from '@/assets/todolist-00.png';
import todolist01 from '@/assets/todolist-01.png';

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  challenge: string;
  github?: string;
  imagePreview: string;
  modalImages: string[];
  theme: { primary: string; secondary: string; };
  isEmpty?: boolean;
};

const projects: Project[] = [
  {
    id: 'chatbot',
    title: 'autoAbout (Chatbot No-Code)',
    description: 'Interface drag-and-drop para automação de fluxos de mensagens.',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    challenge: 'Gerenciamento de estado complexo para renderização de diagramas em tempo real.',
    github: 'https://github.com/daviferreira-dev/TCC.git',
    imagePreview: chatbot01,
    modalImages: [chatbot01, chatbot02, chatbot03, chatbot04],
    theme: { primary: '#98B7FB', secondary: '#9370DB' },
  },
  {
    id: 'mario',
    title: 'Super Mario Souls',
    description: 'Motor de jogo customizado em Vanilla JS e Canvas.',
    technologies: ['JavaScript', 'HTML5', 'Game Design'],
    challenge: 'Física de pulo e detecção de colisão por pixel.',
    github: 'https://github.com/daviferreira-dev/jogoMario.git',
    imagePreview: mario01,
    modalImages: [mario01, mario02, mario03, mario04],
    theme: { primary: '#E52521', secondary: '#049CD8' },
  },
  {
    id: 'taskflow',
    title: 'TASK FLOW',
    description: 'Gerenciador de tarefas com filtros e persistência local.',
    technologies: ['React Native', 'AsyncStorage', 'Animated API'],
    challenge: 'Gerenciamento de estado e persistência de dados mobile.',
    github: 'https://github.com/daviferreira-dev/ToDoList.git',
    imagePreview: todolist00,
    modalImages: [todolist00, todolist01],
    theme: { primary: '#7B8CFF', secondary: '#3ECF8E' },
  }
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(carouselRef);

  // Função estável para rodar o carrossel
  const playCarousel = useCallback(() => {
    controls.start({
      x: [0, -1500],
      transition: {
        duration: 40,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls]);

  // Efeito 1: Monitora visibilidade na tela
  useEffect(() => {
    if (isInView && !selectedProject) {
      playCarousel();
    } else {
      controls.stop();
    }
  }, [isInView, selectedProject, playCarousel, controls]);

  // Efeito 2: Reiniciar index da imagem ao trocar de projeto
  useEffect(() => {
    setCurrentImgIndex(0);
  }, [selectedProject]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject) {
      setCurrentImgIndex((prev) => (prev + 1) % selectedProject.modalImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject) {
      setCurrentImgIndex((prev) => (prev - 1 + selectedProject.modalImages.length) % selectedProject.modalImages.length);
    }
  };

  return (
    <section id="projetos" className="relative min-h-screen py-24 bg-black overflow-hidden">
      
      {/* Cabeçalho */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h4 className="text-purple-500 font-mono text-sm tracking-[0.3em] mb-4 uppercase">Projetos de Impacto</h4>
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">
          Soluções <span className="text-white/20 italic">Reais</span>
        </h2>
      </div>

      {/* Carrossel */}
      <div className="relative w-full overflow-hidden flex items-center">
        <motion.div
          ref={carouselRef}
          animate={controls}
          className="flex gap-8 px-6"
          onHoverStart={() => controls.stop()}
          onHoverEnd={() => !selectedProject && playCarousel()}
        >
          {/* Renderiza o dobro de itens para o loop infinito visual parecer contínuo */}
          {[...projects, ...projects, ...projects].map((project, index) => (
            <motion.div
              key={`${project.id}-${index}`}
              className="flex-shrink-0 w-[350px] md:w-[500px] group relative rounded-[2rem] border-2 border-white/10 overflow-hidden cursor-pointer bg-[#111]"
              onClick={() => setSelectedProject(project)}
              whileHover={{ y: -10, borderColor: "rgba(168, 85, 247, 0.4)" }}
            >
              <img 
                src={project.imagePreview} 
                className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105" 
                alt={project.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">{project.title}</h3>
                <p className="text-white/50 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Ver Detalhes +</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[150] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-[#0c0c0e] border border-white/10 rounded-[2.5rem] max-w-5xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              {/* Lado Esquerdo: Galeria */}
              <div className="relative w-full md:w-3/5 bg-black h-[250px] md:h-auto overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImgIndex}
                    src={selectedProject.modalImages[currentImgIndex]}
                    className="w-full h-full object-contain p-4"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  />
                </AnimatePresence>

                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 rounded-full hover:bg-white/20 text-white">←</button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 rounded-full hover:bg-white/20 text-white">→</button>
              </div>

              {/* Lado Direito: Info */}
              <div className="w-full md:w-2/5 p-8 md:p-10 flex flex-col">
                <div className="flex-1">
                  <h2 className="text-3xl font-black uppercase tracking-tighter mb-4" style={{ color: selectedProject.theme.primary }}>
                    {selectedProject.title}
                  </h2>
                  <h4 className="text-white/30 text-[10px] font-mono uppercase tracking-[0.2em] mb-2">Desafio Técnico</h4>
                  <p className="text-gray-400 text-xs leading-relaxed mb-6">{selectedProject.challenge}</p>
                  
                  <h4 className="text-white/30 text-[10px] font-mono uppercase tracking-[0.2em] mb-2">Stack</h4>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.technologies.map(t => (
                      <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] text-white/70">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="block w-full py-4 rounded-2xl font-bold text-center text-black text-sm tracking-widest transition-transform hover:scale-[1.02]" 
                    style={{ background: `linear-gradient(to right, ${selectedProject.theme.primary}, ${selectedProject.theme.secondary})` }}
                  >
                    GITHUB REPO
                  </a>
                  <button 
                    onClick={() => setSelectedProject(null)} 
                    className="w-full py-4 rounded-2xl border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all uppercase font-mono text-[10px]"
                  >
                    Fechar [ESC]
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}