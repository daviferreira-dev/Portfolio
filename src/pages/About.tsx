import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/useIsMobile';
// Ícones do lucide-react para os botões e detalhes (instale se não tiver: npm install lucide-react)
import { Zap, Target, BookOpen } from 'lucide-react';

export default function About() {
    const { setPortfolioTheme } = useTheme();
    const isMobile = useIsMobile();

    return (
        <section
            className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden"
            onMouseEnter={() => setPortfolioTheme('standard')}
        >
            {/* FUNDO LIMPO 
        Removemos todo o túnel de texto caótico. Fundo preto puro para foco máximo.
        Pode-se adicionar um gradiente radial roxo bem sutil no centro para dar profundidade.
      */}
            <div className="absolute inset-0 z-0 bg-black">
                {/* Gradiente radial muito sutil para profundidade, se desejado */}
                {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#a855f710_0%,_transparent_70%)]"></div> */}
            </div>

            {/* BLOCO DE CONTEÚDO CENTRAL (Flutuando limpo no centro) */}
            <div className="relative z-10 flex flex-col items-center justify-center max-w-5xl px-8 py-16 text-center space-y-16">

                {/* Cabeçalho do Bloco (Sutil e Clean) */}
                <div className="space-y-6">
                    <h2 className="text-sm font-mono text-cyan-400 tracking-widest uppercase flex items-center justify-center gap-2">
                        <BookOpen size={16} /> Sobre Mim
                    </h2>
                    {/* Tipografia Bold e tracking-tighter como o design inicial */}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter leading-tight max-w-2xl mx-auto">
                        Precisão da Engenharia, <br /> Resiliência do Software
                    </h1>
                    {/* Acentos Ciano exatos do design inicial */}
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-[2px] w-16 bg-cyan-400 rounded-full"></div>
                        <div className="h-[2px] w-4 bg-cyan-400 rounded-full"></div>
                    </div>
                </div>

                {/* BLOCO DE STORYTELLING (A sua história, limpa e legível) */}
                <div className="max-w-3xl mx-auto space-y-8 text-gray-300 leading-relaxed">
                    {/* Bloco 1: Introdução */}
                    <p className="text-lg md:text-xl">
                        Minha base foi moldada na engenharia e robótica, onde aprendi que cada milissegundo e cada linha de código contam. Como <span className="text-white font-bold">medalhista da MOBFOG</span> e mentor na FLL, desenvolvi uma mentalidade de resolução de problemas que hoje aplico ao <span className="text-purple-400 font-bold">Desenvolvimento Full Stack</span>.
                    </p>

                    {/* Bloco 2: Diferenciais (Bullet Points) */}
                    <div className="bg-white/5 border-l-4 border-purple-500 p-6 rounded-r-xl space-y-4">
                        <h4 className="text-white font-mono text-xs uppercase tracking-widest mb-2">Destaques Técnicos</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <li className="flex items-start gap-2">
                                <span className="text-purple-500">✔</span>
                                <span><strong className="text-white">+2 anos</strong> de experiência prática (cpi /Tegus)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-500">✔</span>
                                <span>Background sólido em <strong className="text-white">lógica e hardware</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-500">✔</span>
                                <span>Especialista em <strong className="text-white">sistemas escaláveis</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-500">✔</span>
                                <span>Projetos reais de <strong className="text-white">Visão Computacional</strong></span>
                            </li>
                        </ul>
                    </div>

                    {/* Bloco 3: Fechamento */}
                    <p className="text-sm italic text-gray-500">
                        Atualmente cursando ADS no SENAI Taubaté, focado em transformar lógica complexa em experiências digitais eficientes.
                    </p>
                </div>

                {/* BOTÕES DE CHAMADA PARA AÇÃO (CTAs) (Réplica exata da tela inicial) */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12 mt-12 w-full max-w-2xl">
                    {/* Botão 1: Direciona para a seção de Projetos */}
                    <button
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 text-xl font-bold text-white bg-purple-600 rounded-2xl shadow-lg transition-transform hover:-translate-y-1 hover:shadow-purple-500/30"
                        onClick={() => {
                            const section = document.getElementById('projetos');
                            section?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <Zap size={24} /> Ver Projetos
                    </button>

                    {/* Botão 2: Direciona para a seção de Skills */}
                    <button
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 text-xl font-bold text-purple-600 border-2 border-purple-600 rounded-2xl bg-black/10 backdrop-blur-sm transition-colors hover:bg-purple-600 hover:text-white"
                        onClick={() => {
                            // Certifique-se que o id da sua seção de skills seja 'skills'
                            const section = document.getElementById('skills');
                            section?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <Target size={24} /> Ver Habilidades
                    </button>
                </div>

            </div>
        </section>
    );
}