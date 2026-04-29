import { motion } from 'framer-motion';
import { Code2, Terminal, Cpu, Workflow } from 'lucide-react';

const skillGroups = [
  {
    title: "Front-end & Mobile",
    icon: <Code2 className="text-purple-500" />,
    level: "Domínio Especialista",
    description: "Interfaces modernas, visualização de dados e aplicações nativas.",
    skills: [
      { name: "React / Next.js", color: "#61DAFB" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "React Flow", color: "#FF0072" }, 
      { name: "React Native", color: "#61DAFB" },
      { name: "Tailwind CSS", color: "#06B6D4" },
      { name: "HTML5 / CSS3", color: "#E34F26" }
    ]
  },
  {
    title: "Back-end & Infra",
    icon: <Terminal className="text-cyan-500" />,
    level: "Intermédio Avançado",
    description: "Arquitetura de servidores, APIs escaláveis e bancos de dados.",
    skills: [
      { name: "Node.js", color: "#339933" },
      { name: "PHP / Laravel", color: "#FF2D20" },
      { name: "Python", color: "#3776AB" },
      { name: "MySQL", color: "#4479A1" },
      { name: "Supabase", color: "#3ECF8E" }
    ]
  },
  {
    title: "Processos & Ferramentas",
    icon: <Workflow className="text-emerald-500" />,
    level: "Ferramental Profissional",
    description: "Gestão de ciclo de vida de software e metodologias ágeis.",
    skills: [
      { name: "Git / GitHub", color: "#F05032" },
      { name: "Docker", color: "#2496ED" },
      { name: "Scrum / Kanban", color: "#0052CC" },
      { name: "Metodologias Ágeis", color: "#FFA600" }
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-black relative overflow-hidden">
      {/* Background Glow sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Título Padronizado */}
        <div className="mb-20">
          <h4 className="text-purple-500 font-mono text-sm tracking-[0.3em] mb-4 uppercase">
            Competências Técnicas
          </h4>
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            Hard <span className="text-white/10 italic">Skills</span>
          </h2>
        </div>

        {/* Grid de Categorias */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillGroups.map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#0A0A0C] border border-white/5 p-8 rounded-[2rem] hover:border-purple-500/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
                  {group.icon}
                </div>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">
                  {group.level}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{group.title}</h3>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                {group.description}
              </p>

              {/* Badges de Skills */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div 
                      className="w-1.5 h-1.5 rounded-full" 
                      style={{ backgroundColor: skill.color, boxShadow: `0 0 8px ${skill.color}` }} 
                    />
                    <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                  </div>
                ))}
              </div>

              {/* Indicador de Proficiência Visual */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <div className="flex justify-between text-[10px] font-mono text-white/20 mb-2 uppercase tracking-tighter">
                  <span>Proficiência</span>
                  <span>{group.level === "Domínio Especialista" ? "95%" : group.level === "Intermédio Avançado" ? "75%" : "Ferramental"}</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: group.level === "Domínio Especialista" ? "95%" : group.level === "Intermédio Avançado" ? "75%" : "100%" }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className={`h-full ${
                      group.level === "Domínio Especialista" ? "bg-purple-600" : 
                      group.level === "Intermédio Avançado" ? "bg-cyan-600" : "bg-emerald-600"
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}