import React from 'react';
import { ExternalLink, Globe, Pin, MessageSquare, Key } from 'lucide-react';

const LINKS = [
  {
    title: 'Google AI Studio',
    description: 'Crie sua chave de API gratuita para ter velocidade máxima e sem erros 429.',
    url: 'https://aistudio.google.com/app/apikey',
    icon: <Key className="w-6 h-6 text-amber-500" />,
    color: 'hover:border-amber-500/50 hover:bg-amber-500/5',
    tag: 'API Key'
  },
  {
    title: 'Google Flow',
    description: 'Ferramenta avançada de geração de imagens do Google Labs.',
    url: 'https://labs.google/fx/pt/tools/flow',
    icon: <Globe className="w-6 h-6 text-blue-400" />,
    color: 'hover:border-blue-500/50 hover:bg-blue-500/5',
    tag: 'Google Labs'
  },
  {
    title: 'Pinterest',
    description: 'Encontre inspirações visuais e referências para seus prompts.',
    url: 'https://br.pinterest.com/',
    icon: <Pin className="w-6 h-6 text-red-500" />,
    color: 'hover:border-red-500/50 hover:bg-red-500/5',
    tag: 'Inspiração'
  },
  {
    title: 'Clone Mestre 2.0',
    description: 'GPT especializado em engenharia de prompts e clonagem de estilo.',
    url: 'https://chatgpt.com/g/g-69b5bcc4bd688191bc5b3bd0c9522bc7-clone-mestre-2-0',
    icon: <MessageSquare className="w-6 h-6 text-emerald-500" />,
    color: 'hover:border-emerald-500/50 hover:bg-emerald-500/5',
    tag: 'ChatGPT Custom'
  }
];

export default function LinksPanel() {
  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 bg-zinc-950">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <ExternalLink className="w-6 h-6 text-red-600" />
            Links Úteis
          </h2>
          <p className="text-zinc-400">Acesse ferramentas complementares para potencializar suas criações.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LINKS.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group p-6 bg-zinc-900 border border-zinc-800 rounded-2xl transition-all duration-300 flex flex-col gap-4 ${link.color} shadow-lg hover:shadow-xl hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between">
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                  {link.icon}
                </div>
                <span className="px-2 py-1 bg-zinc-950 text-[10px] font-bold text-zinc-500 rounded-md border border-zinc-800 uppercase tracking-wider">
                  {link.tag}
                </span>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-bold text-zinc-100 group-hover:text-white transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {link.description}
                </p>
              </div>

              <div className="mt-auto pt-4 flex items-center justify-between text-xs font-bold text-zinc-500 group-hover:text-zinc-300 transition-colors">
                <span>Acessar Site</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </div>
            </a>
          ))}
        </div>

        <div className="p-6 bg-red-950/20 border border-red-900/30 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-red-900/40 rounded-lg">
              <Globe className="w-5 h-5 text-red-500" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-red-200">Dica de Fluxo</h4>
              <p className="text-sm text-red-300/70 leading-relaxed">
                Use o <b>Pinterest</b> para referências, o <b>Clone Mestre</b> para refinar sua ideia, e o <b>Google Flow</b> ou nosso gerador interno para o resultado final. 
                <br /><br />
                💡 <b>Novidade:</b> Agora você pode usar a aba <b>"4. Navegador"</b> para abrir esses sites sem sair do aplicativo!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
