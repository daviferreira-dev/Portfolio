import { useTheme } from '@/contexts/ThemeContext';
import { 
  Briefcase, 
  Trophy, 
  GraduationCap, 
  Award,
  Calendar,
  Users,
  Cloud,
  Rocket,
  Bot,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

export default function Experience() {
  const { setPortfolioTheme } = useTheme();

  const timeline = [
    {
      year: "2025 — 2027 (Atualmente)",
      title: "Graduação em ADS",
      company: "SENAI Taubaté",
      description: "Análise e Desenvolvimento de Sistemas. Foco em engenharia de software, gestão de projetos ágeis e arquitetura de sistemas.",
      icon: <BookOpen className="text-cyan-400" size={22} />,
      tech: ["Engenharia de Software", "Sistemas Distribuídos", "Agile"]
    },
    {
      year: "2024 — Dez 2025",
      title: "Jovem Aprendiz de TI",
      company: "CPI / Tegus",
      impact: "Reduzi o tempo de resposta a chamados em 10%",
      description: "Monitoramento e manutenção de sistemas críticos da infra da empresa.",
      star: {
        action: "Análise de logs de produção e debugging preventivo de gargalos sistêmicos.",
        result: "Identifiquei e mitiguei falhas, melhorando a estabilidade geral da operação."
      },
      icon: <Briefcase className="text-purple-500" size={22} />,
      tech: ["Python", "SQL", "Linux", "Análise de Dados", "Gestão de Chamados"]
    },
    {
      year: "2024 — 2025",
      title: "Técnico em ADS",
      company: "SENAI Cruzeiro",
      impact: "Consolidação prática em arquitetura Full Stack",
      description: "Formação técnica intensiva com foco na aplicação de conceitos teóricos em projetos de software ponta a ponta.",
      star: {
        action: "Construção de laboratórios práticos e projetos acadêmicos integrando Front-end, Back-end e modelagem de dados.",
        result: "Transição bem-sucedida da lógica de programação estruturada para o desenvolvimento de sistemas web completos e funcionais."
      },
      icon: <GraduationCap className="text-cyan-400" size={22} />,
      tech: ["HTML5/CSS3", "Node.js", "PHP", "MySQL", "Redes", "Git", "GitHub"]
    },
    {
      year: "2024",
      title: "Google Cloud Engine",
      company: "Certificação Profissional",
      description: "Implement Load Balancing on Compute Engine. Configuração de infraestrutura escalável na nuvem.",
      icon: <Cloud className="text-purple-500" size={22} />,
      tech: ["GCP", "Cloud Computing", "Load Balancing"]
    },
    {
      year: "2023 — 2024",
      title: "Jovem Mentor FLL",
      company: "Temporada Masterpiece",
      impact: "Liderança de equipe de inovação tecnológica",
      description: "Mentoria técnica para equipe de robótica, focado em estratégia de mesa e desenvolvimento de projeto de inovação.",
      icon: <Users className="text-cyan-400" size={22} />,
      tech: ["Liderança Técnica", "Scrum", "Estratégia"]
    },
    {
      year: "2023",
      title: "Medalhista MOBFOG",
      company: "Mostra Bras. de Foguetes",
      description: "Medalha de Bronze conquistada na OBA (Olimpíada Brasileira de Astronomia e Astronáutica) em 2023.",
      icon: <Rocket className="text-purple-500" size={22} />,
      tech: ["Física Aplicada", "Projetos STEM"]
    },
    {
      year: "2023",
      title: "Competidor OBR",
      company: "Olimpíada Bras. de Robótica",
      description: "Participação ativa na modalidade prática, desenvolvendo robôs autônomos para resgate em ambientes de desastre.",
      icon: <Bot className="text-cyan-400" size={22} />,
      tech: ["Robótica", "Lógica C/C++", "Sensores"]
    },
    {
      year: "2022 — 2023",
      title: "Competidor FLL",
      company: "Temporada Superpowered",
      description: "Desenvolvimento de robôs e pesquisa sobre energia renovável. Foco em engenharia mecânica e programação.",
      icon: <ShieldCheck className="text-purple-500" size={22} />,
      tech: ["Engenharia", "Pesquisa", "Inovação"]
    },
    {
      year: "2022 — 2023",
      title: "Avaliador Voluntário TBR",
      company: "Torneio Brasil de Robótica",
      description: "Atuei como juiz voluntário avaliando o desempenho e a ética de equipes competidoras em nível regional.",
      icon: <Trophy className="text-cyan-400" size={22} />,
      tech: ["Avaliação Analítica", "Comunicação"]
    },
    {
      year: "Diversos",
      title: "Qualificações Profissionais",
      company: "SENAI",
      description: "Série de certificações técnicas focadas em hardware, redes e fundamentos de TI.",
      icon: <Award className="text-purple-500" size={22} />,
      tech: ["Hardware", "Redes", "Infraestrutura"]
    }
  ];

  return (
    <section 
      id="trajetoria"
      className="min-h-screen bg-black flex flex-col items-center py-24 px-6 overflow-hidden"
      onMouseEnter={() => setPortfolioTheme('standard')}
    >
      <div className="text-center mb-24 space-y-4">
        <h2 className="text-sm font-mono text-cyan-400 tracking-widest uppercase flex items-center justify-center gap-2">
          <Calendar size={16} /> Trajetória
        </h2>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter uppercase">
          Experiência <span className="text-white/20 italic">& Jornada</span>
        </h1>
        <div className="flex items-center justify-center gap-3">
           <div className="h-[2px] w-16 bg-purple-600 rounded-full"></div>
           <div className="h-[2px] w-4 bg-purple-600 rounded-full"></div>
        </div>
      </div>

      <div className="relative max-w-6xl w-full">
        {/* Linha Central Vertical */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-600 via-cyan-400 to-purple-600 hidden md:block -translate-x-1/2"></div>

        <div className="space-y-12">
          {timeline.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-col md:flex-row items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-[45%] group">
                <div className={`p-8 bg-secondary/5 border border-white/5 rounded-3xl backdrop-blur-md transition-all duration-500 hover:border-purple-500/40 hover:bg-white/5 shadow-xl shadow-purple-950/5 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  
                  {/* Cabeçalho do Card */}
                  <div className={`flex items-center gap-3 mb-4 text-cyan-400 font-mono text-sm ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="p-2 bg-white/5 rounded-xl text-purple-400 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="font-bold tracking-widest">{item.year}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-purple-500/80 font-medium mb-4 text-lg">{item.company}</p>
                  
                  {/* Badge de Impacto (Se existir) */}
                  {item.impact && (
                    <div className={`inline-block mb-4 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-lg text-purple-300 font-bold text-xs tracking-wide`}>
                      ⚡ {item.impact}
                    </div>
                  )}

                  <p className="text-white/60 text-base leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Detalhamento STAR (Se existir) */}
                  {item.star && (
                    <div className="mb-6 p-4 bg-black/40 rounded-xl border border-white/5 text-left text-sm space-y-2">
                      <p className="text-gray-400"><strong className="text-purple-400 uppercase text-[10px] tracking-widest block mb-1">Ação</strong> {item.star.action}</p>
                      <p className="text-gray-400"><strong className="text-cyan-400 uppercase text-[10px] tracking-widest block mb-1">Resultado</strong> {item.star.result}</p>
                    </div>
                  )}

                  {/* Tags de Tecnologia (Se existir) */}
                  {item.tech && (
                    <div className={`flex flex-wrap gap-2 mt-4 ${index % 2 === 0 ? 'justify-start' : 'md:justify-end justify-start'}`}>
                      {item.tech.map(t => (
                        <span key={t} className="text-[10px] px-2 py-1 bg-white/5 text-white/50 rounded-md border border-white/10 uppercase font-mono transition-colors hover:text-white hover:border-white/30">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                </div>
              </div>

              {/* Ponto Central Animado */}
              <div className="relative flex items-center justify-center w-full md:w-[10%] py-6 md:py-0">
                <div className="w-5 h-5 rounded-full bg-black border-4 border-purple-600 z-10 shadow-[0_0_15px_#a855f7] group-hover:scale-125 group-hover:bg-purple-500 transition-all duration-300"></div>
              </div>

              <div className="hidden md:block w-[45%]"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}