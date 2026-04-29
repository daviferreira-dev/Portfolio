import { useState } from 'react';
import { Mail, MessageSquare, Copy, Check, Coffee, Send, ExternalLink } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");

  const email = "fdavi07@gmail.com";
  const whatsappLink = "https://wa.me/5512988326980";
  const githubLink = "https://github.com/daviferreira-dev";
  const linkedinLink = "https://www.linkedin.com/in/davi-ferreira-dev/";

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${whatsappLink}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    setStatus("enviando");

    const response = await fetch("https://formspree.io/f/mgodwkzd", {
      method: "POST",
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      setStatus("sucesso");
      form.reset();
      setTimeout(() => setStatus(""), 5000);
    } else {
      setStatus("erro");
    }
  };

  return (
    <section id="contato" className="w-full min-h-screen bg-black py-20 px-6 flex flex-col items-center justify-center relative overflow-hidden">

      {/* Brilho de Fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl w-full relative z-10 space-y-12">

        <div className="text-center space-y-4">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">
            VAMOS <span className="text-purple-600">CONVERSAR?</span>
          </h2>
          <p className="text-gray-400 text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
            Procurando um <span className="text-white font-semibold">Desenvolvedor Full Stack</span> para tirar seu projeto do papel? <br /> Escolha sua plataforma preferida:
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* COLUNA 1: Links e QR Code */}
          <div className="space-y-4 max-w-sm mx-auto md:mx-0 w-full">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-purple-500"></span> Contatos rápidos
            </h3>

            {/* GitHub */}
            <a href={githubLink} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-cyan-500/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-600/10 rounded-lg text-cyan-500">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path></svg>
                </div>
                <span className="text-gray-300 text-sm font-medium">GitHub</span>
              </div>
              <ExternalLink size={14} className="text-gray-700 group-hover:text-cyan-500" />
            </a>

            {/* LinkedIn */}
            <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-blue-500/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600/10 rounded-lg text-blue-500">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </div>
                <span className="text-gray-300 text-sm font-medium">LinkedIn</span>
              </div>
              <ExternalLink size={14} className="text-gray-700 group-hover:text-blue-500" />
            </a>

            {/* E-mail (Abaixo do LinkedIn) */}
            <button onClick={copyToClipboard} className="w-full group flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-emerald-500/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-600/10 rounded-lg text-emerald-500"><Mail size={18} /></div>
                <span className="text-gray-300 text-sm font-medium">{email}</span>
              </div>
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} className="text-gray-700" />}
            </button>

            {/* QR Code centralizado na coluna */}
            <div className="mt-8 flex flex-col items-center p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
              <div className="bg-white p-2 rounded-lg mb-3">
                <img src={qrCodeUrl} alt="WhatsApp QR Code" className="w-24 h-24" />
              </div>
              <p className="text-[15px] font-mono text-purple-500 uppercase tracking-widest mb-1">Fale pelo WhatsApp!</p>
              <p className="text-gray-500 text-[13px] text-center">Escaneie para abrir o chat</p>
            </div>
          </div>

          {/* COLUNA 2: Formulário Compacto */}
          <div className="w-full max-w-md mx-auto md:ml-auto">
            <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">Nome</label>
                <input required name="name" type="text" placeholder="Seu nome" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-all" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">E-mail</label>
                <input required name="email" type="email" placeholder="seu@email.com" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-all" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">Mensagem</label>
                <textarea required name="message" rows="3" placeholder="Como posso ajudar?" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-all resize-none"></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "enviando"}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 text-sm"
              >
                {status === "enviando" ? "Enviando..." : status === "sucesso" ? "Mensagem Enviada! ✅" : "Enviar Mensagem"}
                <Send size={16} />
              </button>

              {status === "erro" && <p className="text-red-500 text-[10px] text-center">Erro ao enviar. Tente novamente.</p>}
            </form>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-10 flex flex-col items-center gap-4">
          <div className="h-px w-24 bg-white/10"></div>
          <p className="text-white/20 font-mono text-[9px] tracking-widest uppercase flex items-center gap-2">
            Davi Ferreira <span className="text-purple-600">•</span> 2026 <span className="text-purple-600">•</span> <Coffee size={10} />
          </p>
        </div>
      </div>
    </section>
  );
}