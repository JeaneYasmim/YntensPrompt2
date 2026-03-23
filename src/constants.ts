import { Category, Conflict } from './types';

export const CONFLICTS: Conflict[] = [
  {
    options: ['Sol do Meio-Dia (Harsh Sunlight)', 'Dia Nublado (Overcast)'],
    message: 'Iluminação: Sol do Meio-Dia (luz dura) e Dia Nublado (luz difusa) são opostos.'
  },
  {
    options: ['Ultra-realista', 'Pixel Art'],
    message: 'Estilo: Ultra-realista e Pixel Art geram resultados visuais contraditórios.'
  },
  {
    options: ['Preto e Branco Dramático', 'Cores Vibrantes'],
    message: 'Cor: Preto e Branco Dramático e Cores Vibrantes não podem ser aplicados juntos.'
  },
  {
    options: ['Close-up Extremo', 'Plano Geral Extremo'],
    message: 'Câmera: Close-up Extremo e Plano Geral Extremo são distâncias focais opostas.'
  },
  {
    options: ['Profundidade de Campo Curta', 'Profundidade de Campo Longa'],
    message: 'Lente: Profundidade Curta (fundo desfocado) e Longa (tudo em foco) são opostos.'
  },
  {
    options: ['High Key', 'Low Key'],
    message: 'Iluminação: High Key (muito claro) e Low Key (muito escuro) são técnicas opostas.'
  },
  {
    options: ['Sorriso Aberto', 'Chorando'],
    message: 'Expressão: Sorriso Aberto e Chorando são emoções conflitantes.'
  },
  {
    options: ['Olhar Furioso', 'Rosto Sereno'],
    message: 'Expressão: Olhar Furioso e Rosto Sereno transmitem sentimentos opostos.'
  },
  {
    options: ['Rosto Aterrorizado', 'Expressão Confiante'],
    message: 'Expressão: Rosto Aterrorizado e Expressão Confiante são estados mentais opostos.'
  }
];

export const CATEGORIES: Category[] = [
  {
    id: 'estilos_fotograficos',
    label: '📷 Estilos Fotográficos',
    subcategories: [
      {
        label: 'Fotografia Profissional',
        options: [
          { id: 'ultra_realista', label: 'Ultra-realista', description: 'Extremamente detalhado, parecendo uma foto real de alta resolução.' },
          { id: 'cinematografico', label: 'Cinematográfico', description: 'Estilo de filme de Hollywood, com cores ricas e iluminação dramática.' },
          { id: 'moda_editorial', label: 'Moda Editorial', description: 'Estilo de revista de moda (Vogue, Harper\'s Bazaar), poses elegantes e foco nas roupas.' },
          { id: 'retrato_classico', label: 'Retrato Clássico', description: 'Foco no rosto e expressão, fundo neutro ou desfocado, iluminação suave.' },
          { id: 'fotojornalismo', label: 'Fotojornalismo', description: 'Estilo documental, capturando um momento real e espontâneo sem pose ensaiada.' },
          { id: 'preto_e_branco', label: 'Preto e Branco Dramático', description: 'Sem cores, com forte contraste entre luz e sombra para criar drama.' },
          { id: 'fine_art', label: 'Fine Art', description: 'Fotografia com intenção artística, muitas vezes surreal ou poética.' },
          { id: 'comercial', label: 'Comercial / Publicidade', description: 'Iluminação perfeita, cores vibrantes, feito para vender um produto ou ideia.' },
          { id: 'macro', label: 'Macro Fotografia', description: 'Foco extremo em detalhes muito pequenos, como texturas ou insetos.' },
          { id: 'fotografia_rua', label: 'Fotografia de Rua (Street)', description: 'Cenas urbanas cotidianas, pessoas em movimento, estilo cru e real.' }
        ]
      },
      {
        label: 'Estilos Analógicos e Retrô',
        options: [
          { id: 'polaroid', label: 'Polaroid', description: 'Estilo de foto instantânea, com bordas brancas, cores levemente desbotadas e vinheta.' },
          { id: 'filme_35mm', label: 'Filme 35mm', description: 'Estilo clássico de câmera analógica, com granulação natural e cores nostálgicas.' },
          { id: 'lomografia', label: 'Lomografia', description: 'Cores saturadas, alto contraste, vinheta escura e foco suave nas bordas.' },
          { id: 'kodachrome', label: 'Kodachrome', description: 'Estilo de filme antigo famoso por seus vermelhos e amarelos vibrantes.' },
          { id: 'vhs', label: 'Estilo VHS', description: 'Qualidade de fita de vídeo antiga, com falhas na imagem (glitch) e cores borradas.' },
          { id: 'sepia', label: 'Sépia', description: 'Tons de marrom envelhecido, como fotos do início do século XX.' },
          { id: 'cyanotype', label: 'Cianotipia', description: 'Processo fotográfico antigo que resulta em imagens em tons de azul.' },
          { id: 'disposable_camera', label: 'Câmera Descartável', description: 'Flash forte direto, granulação, cores levemente lavadas.' },
          { id: 'daguerreotype', label: 'Daguerreótipo', description: 'Estilo do século 19, muito detalhado, tons prateados e bordas desgastadas.' },
          { id: 'pinhole', label: 'Câmera Pinhole', description: 'Foco muito suave, longa exposição, bordas escuras.' }
        ]
      },
      {
        label: 'Técnicas Específicas',
        options: [
          { id: 'longa_exposicao', label: 'Longa Exposição', description: 'Captura o movimento ao longo do tempo (ex: faróis de carros como linhas de luz).' },
          { id: 'tilt_shift', label: 'Tilt-Shift', description: 'Faz cenas reais parecerem maquetes em miniatura através de desfoque seletivo.' },
          { id: 'dupla_exposicao', label: 'Dupla Exposição', description: 'Duas imagens sobrepostas em uma só (ex: um rosto misturado com uma floresta).' },
          { id: 'infravermelho', label: 'Infravermelho', description: 'Folhagens ficam brancas ou rosas, céu escuro, visual surreal.' },
          { id: 'light_painting', label: 'Light Painting', description: 'Desenhos feitos com luzes em movimento em um ambiente escuro.' },
          { id: 'bokeh', label: 'Bokeh Intenso', description: 'Fundo extremamente desfocado com pontos de luz circulares e suaves.' },
          { id: 'high_key', label: 'High Key', description: 'Imagem muito clara, quase sem sombras, transmitindo leveza e pureza.' },
          { id: 'low_key', label: 'Low Key', description: 'Imagem muito escura, com apenas partes do sujeito iluminadas, muito dramático.' },
          { id: 'panning', label: 'Panning', description: 'Sujeito nítido com o fundo borrado na horizontal, dando forte sensação de velocidade.' },
          { id: 'hdr', label: 'HDR (High Dynamic Range)', description: 'Detalhes visíveis tanto nas áreas muito claras quanto nas muito escuras.' }
        ]
      },
      {
        label: 'Câmeras e Lentes Específicas',
        options: [
          { id: 'gopro', label: 'Estilo GoPro', description: 'Lente super grande angular (olho de peixe), cores vibrantes, ação.' },
          { id: 'drone', label: 'Fotografia de Drone', description: 'Visão aérea de alta altitude, mostrando padrões no solo.' },
          { id: 'fisheye', label: 'Lente Olho de Peixe', description: 'Distorção circular extrema, capturando um campo de visão enorme.' },
          { id: 'teleobjetiva', label: 'Lente Teleobjetiva (Compressão)', description: 'Faz o fundo parecer muito grande e próximo do sujeito.' },
          { id: 'polaroid_sx70', label: 'Polaroid SX-70', description: 'Cores quentes específicas e suavidade vintage.' },
          { id: 'leica', label: 'Estilo Leica', description: 'Preto e branco de altíssimo contraste e nitidez, clássico do fotojornalismo.' },
          { id: 'cctv', label: 'Câmera de Segurança (CCTV)', description: 'Baixa resolução, preto e branco ou cores lavadas, ângulo alto no canto.' },
          { id: 'disposable_flash', label: 'Flash de Câmera Descartável', description: 'Luz dura frontal, fundo escuro, pele brilhante.' },
          { id: 'medium_format', label: 'Médio Formato', description: 'Qualidade absurda de detalhes, transição de foco muito suave e natural.' },
          { id: 'astrophotography', label: 'Astrofotografia', description: 'Céu noturno estrelado, Via Láctea visível, cores cósmicas.' }
        ]
      },
      {
        label: 'Estilos de Processamento',
        options: [
          { id: 'cross_processing', label: 'Processamento Cruzado', description: 'Cores alteradas quimicamente, geralmente com tons esverdeados ou amarelados.' },
          { id: 'bleach_bypass', label: 'Bleach Bypass', description: 'Contraste alto e saturação muito baixa, visual de filmes de guerra.' },
          { id: 'matte_finish', label: 'Acabamento Fosco (Matte)', description: 'Pretos lavados (cinza escuro), visual suave e moderno.' },
          { id: 'vibrant_colors', label: 'Cores Vibrantes', description: 'Saturação alta, cores que saltam aos olhos.' },
          { id: 'pastel_tones', label: 'Tons Pastel', description: 'Cores suaves, claras e delicadas, sem contraste forte.' },
          { id: 'neon_noir', label: 'Neon Noir', description: 'Escuro com luzes neon fortes (rosa, azul, roxo), estilo cyberpunk.' },
          { id: 'sepia_toned', label: 'Tons Quentes (Golden)', description: 'Imagens banhadas em luz dourada e quente.' },
          { id: 'cool_tones', label: 'Tons Frios (Cyan/Blue)', description: 'Imagens com predominância de azul e ciano, sensação de frio ou melancolia.' },
          { id: 'high_contrast', label: 'Alto Contraste', description: 'Diferença extrema entre luz e sombra, cores muito marcadas.' },
          { id: 'faded_film', label: 'Filme Desbotado', description: 'Visual de foto antiga que perdeu a cor com o tempo.' }
        ]
      }
    ]
  },
  {
    id: 'estilos_artisticos',
    label: '🎨 Estilos Artísticos',
    subcategories: [
      {
        label: 'Pintura Tradicional',
        options: [
          { id: 'oleo', label: 'Pintura a Óleo', description: 'Textura grossa de tinta, cores ricas e misturas suaves (estilo Renascimento ou Barroco).' },
          { id: 'aquarela', label: 'Aquarela', description: 'Tinta translúcida à base de água, bordas suaves, visual leve e fluido.' },
          { id: 'acrilico', label: 'Pintura Acrílica', description: 'Cores vibrantes, secagem rápida, visual moderno e nítido.' },
          { id: 'guache', label: 'Guache', description: 'Tinta opaca à base de água, cores sólidas e foscas.' },
          { id: 'pastel', label: 'Giz Pastel', description: 'Textura seca e empoeirada, cores suaves e esfumadas.' },
          { id: 'carvao', label: 'Desenho a Carvão', description: 'Preto e branco, traços rústicos, forte contraste e sombras esfumadas.' },
          { id: 'nanquim', label: 'Tinta Nanquim (Ink)', description: 'Linhas pretas precisas, alto contraste, estilo de caligrafia ou quadrinhos.' },
          { id: 'lapis_cor', label: 'Lápis de Cor', description: 'Textura de papel visível, traços finos sobrepostos.' },
          { id: 'fresco', label: 'Afresco', description: 'Pintura em parede de gesso, cores levemente desbotadas, visual antigo.' },
          { id: 'impasto', label: 'Impasto', description: 'Tinta aplicada em camadas muito grossas, textura 3D visível (estilo Van Gogh).' }
        ]
      },
      {
        label: 'Movimentos de Arte',
        options: [
          { id: 'impressionismo', label: 'Impressionismo', description: 'Pinceladas curtas e visíveis, foco na luz e cor em vez de detalhes (ex: Monet).' },
          { id: 'surrealismo', label: 'Surrealismo', description: 'Cenas de sonho, elementos ilógicos e bizarros misturados com realidade (ex: Dalí).' },
          { id: 'cubismo', label: 'Cubismo', description: 'Formas geométricas quebradas e múltiplas perspectivas ao mesmo tempo (ex: Picasso).' },
          { id: 'pop_art', label: 'Pop Art', description: 'Cores primárias fortes, pontilhismo de quadrinhos, cultura pop (ex: Andy Warhol).' },
          { id: 'art_nouveau', label: 'Art Nouveau', description: 'Linhas curvas e orgânicas, inspiração na natureza, ornamentos florais (ex: Mucha).' },
          { id: 'art_deco', label: 'Art Déco', description: 'Geometria elegante, linhas retas, dourado e preto, glamour dos anos 1920.' },
          { id: 'expressionismo', label: 'Expressionismo', description: 'Cores irreais e formas distorcidas para expressar emoção forte (ex: O Grito).' },
          { id: 'minimalismo', label: 'Minimalismo', description: 'O mínimo de elementos possíveis, muito espaço vazio, formas simples.' },
          { id: 'barroco', label: 'Barroco', description: 'Muito drama, contraste extremo de luz e sombra, detalhes luxuosos (ex: Rembrandt).' },
          { id: 'renascimento', label: 'Renascimento', description: 'Proporções perfeitas, perspectiva realista, temas clássicos (ex: Da Vinci).' }
        ]
      },
      {
        label: 'Arte Digital e Ilustração',
        options: [
          { id: 'concept_art', label: 'Arte Conceitual', description: 'Ilustração digital detalhada usada para criar mundos de filmes e jogos.' },
          { id: 'vetor', label: 'Ilustração Vetorial', description: 'Linhas perfeitamente lisas, cores sólidas sem textura, visual de design gráfico.' },
          { id: 'pixel_art', label: 'Pixel Art', description: 'Arte feita bloco por bloco, visual de videogames antigos (8-bit ou 16-bit).' },
          { id: 'low_poly', label: 'Low Poly', description: 'Modelos 3D formados por poucos polígonos visíveis, visual geométrico.' },
          { id: 'voxel_art', label: 'Voxel Art', description: 'Arte 3D feita de cubos (estilo Minecraft).' },
          { id: 'cel_shading', label: 'Cel Shading', description: 'Renderização 3D que imita desenho 2D com sombras duras (estilo Zelda Breath of the Wild).' },
          { id: 'matte_painting', label: 'Matte Painting', description: 'Pintura digital hiper-realista usada como fundo em filmes.' },
          { id: 'digital_watercolor', label: 'Aquarela Digital', description: 'Simula aquarela no computador, mas com cores mais vibrantes e controle perfeito.' },
          { id: 'speed_painting', label: 'Speed Painting', description: 'Pinceladas digitais rápidas e soltas, focando na ideia geral e não nos detalhes.' },
          { id: 'isometric', label: 'Arte Isométrica', description: 'Perspectiva 3D vista de cima em um ângulo sem ponto de fuga (estilo jogos de estratégia).' }
        ]
      },
      {
        label: 'Estilos de Animação e Quadrinhos',
        options: [
          { id: 'anime_90s', label: 'Anime (Anos 90)', description: 'Traço clássico japonês, cores em tons pastel, brilho suave (estilo Sailor Moon/Evangelion).' },
          { id: 'studio_ghibli', label: 'Estilo Studio Ghibli', description: 'Cenários de natureza exuberante, nuvens fofas, traço acolhedor e mágico.' },
          { id: 'comic_book', label: 'Quadrinhos Americanos', description: 'Linhas pretas fortes, cores vibrantes, sombras hachuradas (estilo Marvel/DC).' },
          { id: 'manga', label: 'Mangá (Preto e Branco)', description: 'Quadrinho japonês, preto e branco com retículas (pontinhos) para sombras.' },
          { id: 'pixar', label: 'Animação 3D (Estilo Pixar)', description: 'Personagens expressivos, texturas realistas mas formas caricatas, iluminação perfeita.' },
          { id: 'spider_verse', label: 'Estilo Aranhaverso', description: 'Mistura de 3D com texturas de quadrinhos 2D, cores neon, falhas de impressão propositais.' },
          { id: 'cartoon_network', label: 'Cartoon Moderno', description: 'Traços grossos, formas geométricas simples, cores chapadas (estilo Hora de Aventura).' },
          { id: 'vintage_cartoon', label: 'Cartoon Anos 30 (Rubber Hose)', description: 'Personagens com braços de "mangueira", preto e branco, olhos de torta (estilo Cuphead/Mickey antigo).' },
          { id: 'ligne_claire', label: 'Linha Clara (Tintin)', description: 'Linhas de espessura uniforme, sem hachuras, cores sólidas (estilo Tintin).' },
          { id: 'webtoon', label: 'Webtoon Coreano', description: 'Cores digitais brilhantes, personagens esguios, foco em romance ou ação.' }
        ]
      },
      {
        label: 'Estéticas da Internet e Subculturas',
        options: [
          { id: 'cyberpunk', label: 'Cyberpunk', description: 'Alta tecnologia e baixa qualidade de vida. Neon, chuva, cibernética, cidades escuras.' },
          { id: 'steampunk', label: 'Steampunk', description: 'Tecnologia a vapor da era vitoriana, engrenagens, latão, couro, óculos de aviador.' },
          { id: 'synthwave', label: 'Synthwave / Retrowave', description: 'Estética dos anos 80, grades de neon rosa e azul, pores do sol digitais, palmeiras.' },
          { id: 'vaporwave', label: 'Vaporwave', description: 'Estátuas gregas, computadores antigos, tons de rosa e ciano, nostalgia irônica.' },
          { id: 'cottagecore', label: 'Cottagecore', description: 'Vida idílica no campo, vestidos florais, piqueniques, natureza romântica.' },
          { id: 'dark_academia', label: 'Dark Academia', description: 'Bibliotecas antigas, roupas de tweed, tons de marrom e preto, mistério e estudo.' },
          { id: 'gothic', label: 'Gótico', description: 'Sombrio, romântico, arquitetura pontiaguda, preto, veludo, melancolia.' },
          { id: 'solarpunk', label: 'Solarpunk', description: 'Futuro otimista, tecnologia verde, cidades integradas com a natureza, energia solar.' },
          { id: 'dieselpunk', label: 'Dieselpunk', description: 'Tecnologia movida a diesel dos anos 1920-1940, máquinas pesadas, visual de guerra.' },
          { id: 'biopunk', label: 'Biopunk', description: 'Foco em biotecnologia, mutações, laboratórios orgânicos, visual visceral.' }
        ]
      },
      {
        label: 'Animação & Cartoon',
        options: [
          { id: 'animacao_3d_pixar', label: 'Animação 3D Pixar', description: 'Personagens expressivos, texturas realistas e iluminação cinematográfica.' },
          { id: 'cartoon_classico_90s', label: 'Cartoon Clássico 90s', description: 'Traços nostálgicos, cores vibrantes e estilo de animação dos anos 90.' },
          { id: 'comic_book_style', label: 'Comic Book Style', description: 'Arte de quadrinhos com contornos fortes, hachuras e cores dinâmicas.' }
        ]
      },
      {
        label: 'Manga & Anime',
        options: [
          { id: 'anime_studio_ghibli', label: 'Anime Studio Ghibli', description: 'Cenários mágicos, natureza exuberante e traço acolhedor.' },
          { id: 'manga_profissional', label: 'Manga Profissional', description: 'Arte em preto e branco com retículas detalhadas e traços precisos.' }
        ]
      },
      {
        label: 'Pintura & Aquarela',
        options: [
          { id: 'pintura_oleo_digital', label: 'Pintura a Óleo Digital', description: 'Textura rica de tinta a óleo simulada digitalmente com pinceladas visíveis.' },
          { id: 'aquarela_premium', label: 'Aquarela Premium', description: 'Manchas de tinta translúcidas, bordas suaves e mistura de cores fluida.' },
          { id: 'expressionismo_abstrato', label: 'Expressionismo Abstrato', description: 'Formas não representacionais, respingos de tinta e forte expressão emocional.' }
        ]
      },
      {
        label: 'Design & Arte Gráfica',
        options: [
          { id: 'arte_conceitual_aaa', label: 'Arte Conceitual AAA', description: 'Ilustração de altíssima qualidade usada em produções de grandes estúdios.' },
          { id: 'ilustracao_vetorial', label: 'Ilustração Vetorial', description: 'Linhas limpas, formas geométricas e cores sólidas sem textura.' },
          { id: 'art_deco_geometrico', label: 'Art Deco Geométrico', description: 'Padrões elegantes, simetria, linhas retas e estética dos anos 1920.' }
        ]
      },
      {
        label: 'Arte Pop & Fantasia',
        options: [
          { id: 'arte_pop_vibrante', label: 'Arte Pop Vibrante', description: 'Cores primárias intensas, estética de quadrinhos e cultura de massa.' },
          { id: 'surrealismo_digital', label: 'Surrealismo Digital', description: 'Cenas oníricas e ilógicas renderizadas com precisão digital.' },
          { id: 'realismo_fantastico', label: 'Realismo Fantástico', description: 'Elementos mágicos ou sobrenaturais pintados com técnica hiper-realista.' }
        ]
      },
      {
        label: 'Estilos Temáticos',
        options: [
          { id: 'estilo_steampunk', label: 'Estilo Steampunk', description: 'Estética retro-futurista com engrenagens, vapor, latão e moda vitoriana.' }
        ]
      }
    ]
  },
  {
    id: 'temas_cenarios',
    label: '🌍 Temas e Cenários',
    subcategories: [
      {
        label: 'Ambientes Urbanos',
        options: [
          { id: 'cidade_cyberpunk', label: 'Cidade Cyberpunk Noturna', description: 'Ruas chuvosas iluminadas por letreiros de neon gigantes, arranha-céus futuristas.' },
          { id: 'metropole_moderna', label: 'Metrópole Moderna', description: 'Prédios de vidro espelhado, trânsito movimentado, dia ensolarado.' },
          { id: 'beco_escuro', label: 'Beco Escuro e Nebuloso', description: 'Rua estreita, vapor saindo de bueiros, iluminação precária, clima de suspense.' },
          { id: 'rua_parisiense', label: 'Rua Parisiense Clássica', description: 'Cafés com mesas na calçada, arquitetura europeia antiga, clima romântico.' },
          { id: 'favela_futurista', label: 'Favela Futurista', description: 'Casas empilhadas caoticamente, cabos pendurados, tecnologia improvisada.' },
          { id: 'ruinas_urbanas', label: 'Ruínas Urbanas (Pós-Apocalíptico)', description: 'Prédios destruídos tomados por vegetação, carros abandonados, desolação.' },
          { id: 'suburbio_americano', label: 'Subúrbio Americano (Anos 50)', description: 'Casas idênticas com gramados perfeitos, cercas brancas, carros clássicos.' },
          { id: 'mercado_asiatico', label: 'Mercado de Rua Asiático', description: 'Barracas de comida, lanternas vermelhas, multidão, vapor de panelas.' },
          { id: 'estacao_trem', label: 'Estação de Trem Antiga', description: 'Teto de vidro e ferro, trens a vapor, relógio gigante, fumaça.' },
          { id: 'telhado_cidade', label: 'Telhado de Arranha-céu', description: 'Visão panorâmica da cidade abaixo, beirada perigosa, vento.' }
        ]
      },
      {
        label: 'Natureza e Paisagens',
        options: [
          { id: 'floresta_encantada', label: 'Floresta Encantada', description: 'Árvores gigantes, musgo brilhante, fadas, névoa mágica, raios de luz.' },
          { id: 'praia_tropical', label: 'Praia Tropical Paradisíaca', description: 'Areia branca, água cristalina azul-turquesa, palmeiras, sol forte.' },
          { id: 'montanhas_nevadas', label: 'Montanhas Nevadas', description: 'Picos cobertos de gelo, vento cortante, céu azul escuro.' },
          { id: 'deserto_dunas', label: 'Deserto de Dunas', description: 'Ondas de areia dourada intermináveis, sol escaldante, oásis distante.' },
          { id: 'caverna_cristais', label: 'Caverna de Cristais', description: 'Subterrâneo iluminado por cristais gigantes brilhantes, lago subterrâneo.' },
          { id: 'fundo_mar', label: 'Fundo do Mar (Recife de Coral)', description: 'Peixes coloridos, corais vibrantes, raios de sol penetrando a água.' },
          { id: 'pantano_sombrio', label: 'Pântano Sombrio', description: 'Árvores mortas, água turva, névoa espessa, clima assustador.' },
          { id: 'campo_flores', label: 'Campo de Flores Infinito', description: 'Milhões de flores coloridas até o horizonte, céu de primavera.' },
          { id: 'tundra_congelada', label: 'Tundra Congelada', description: 'Planície de gelo rachado, aurora boreal no céu, frio extremo.' },
          { id: 'vulcao_ativo', label: 'Vulcão Ativo', description: 'Rios de lava brilhante, fumaça escura, pedras derretidas, calor intenso.' }
        ]
      },
      {
        label: 'Ficção Científica e Espaço',
        options: [
          { id: 'nave_espacial', label: 'Interior de Nave Espacial', description: 'Corredores metálicos brancos, painéis de controle brilhantes, gravidade zero.' },
          { id: 'planeta_alienigena', label: 'Planeta Alienígena', description: 'Céu de cor estranha (ex: roxo), duas luas, plantas bizarras e bioluminescentes.' },
          { id: 'estacao_espacial', label: 'Estação Espacial Orbital', description: 'Vista da Terra pela janela, estruturas de painéis solares, flutuando no vácuo.' },
          { id: 'laboratorio_futurista', label: 'Laboratório Futurista', description: 'Tubos de ensaio brilhantes, hologramas, ambiente estéril e limpo.' },
          { id: 'cidade_marte', label: 'Colônia em Marte', description: 'Domes de vidro na areia vermelha, trajes espaciais, rovers de exploração.' },
          { id: 'buraco_negro', label: 'Perto de um Buraco Negro', description: 'Distorção do espaço-tempo, disco de luz ao redor de uma esfera negra.' },
          { id: 'megastructure', label: 'Megaestrutura Alienígena', description: 'Construção colossal no espaço, escala incompreensível, anéis gigantes.' },
          { id: 'cyber_dojo', label: 'Dojo Cibernético', description: 'Sala de treinamento tradicional japonesa misturada com hologramas e neon.' },
          { id: 'mecha_hangar', label: 'Hangar de Robôs Gigantes', description: 'Robôs enormes sendo consertados, faíscas de solda, escala massiva.' },
          { id: 'matrix_construct', label: 'O Constructo (Matrix)', description: 'Espaço branco infinito sem chão ou teto visíveis.' }
        ]
      },
      {
        label: 'Fantasia e História',
        options: [
          { id: 'castelo_medieval', label: 'Castelo Medieval', description: 'Paredes de pedra, tochas, tapeçarias, armaduras, salão de banquetes.' },
          { id: 'taverna', label: 'Taverna Aconchegante', description: 'Fogo na lareira, canecas de cerveja, bardos tocando, luz quente.' },
          { id: 'ruinas_antigas', label: 'Ruínas de Templo Antigo', description: 'Colunas gregas quebradas, estátuas cobertas de hera, mistério.' },
          { id: 'biblioteca_magica', label: 'Biblioteca Mágica', description: 'Livros voando, poeira brilhante, estantes infinitas, grimórios antigos.' },
          { id: 'campo_batalha', label: 'Campo de Batalha Épico', description: 'Exércitos colidindo, fumaça, bandeiras rasgadas, clima de guerra.' },
          { id: 'palacio_elfico', label: 'Palácio Élfico', description: 'Arquitetura orgânica elegante integrada às árvores, luz prateada.' },
          { id: 'covil_dragao', label: 'Covil do Dragão', description: 'Montanhas de moedas de ouro, ossos, calor, olhos brilhando na escuridão.' },
          { id: 'piramide_egipcia', label: 'Interior de Pirâmide', description: 'Hieróglifos nas paredes, tochas, armadilhas, sarcófago dourado.' },
          { id: 'navio_pirata', label: 'Convés de Navio Pirata', description: 'Velas rasgadas, canhões, tempestade no mar, bandeira de caveira.' },
          { id: 'cidade_voadora', label: 'Cidade Flutuante', description: 'Ilhas de terra flutuando no céu, cachoeiras caindo no vazio, dirigíveis.' }
        ]
      },
      {
        label: 'Interiores e Estúdios',
        options: [
          { id: 'estudio_fotografico', label: 'Estúdio Fotográfico Fundo Infinito', description: 'Fundo branco ou cinza perfeitamente liso, sem distrações.' },
          { id: 'quarto_gamer', label: 'Quarto Gamer', description: 'Luzes LED RGB, múltiplos monitores, posters, ambiente escuro.' },
          { id: 'sala_luxo', label: 'Sala de Estar de Luxo', description: 'Móveis de grife, lareira moderna, vista para a cidade, mármore.' },
          { id: 'cafe_lofi', label: 'Café Lo-Fi', description: 'Plantas, luz de fim de tarde entrando pela janela, xícara fumegante, gato dormindo.' },
          { id: 'quarto_baguncado', label: 'Quarto Adolescente Bagunçado', description: 'Roupas no chão, posters de bandas, cama desarrumada, luz de abajur.' },
          { id: 'galeria_arte', label: 'Galeria de Arte Branca', description: 'Paredes brancas, quadros minimalistas, piso de cimento queimado, luzes direcionadas.' },
          { id: 'igreja_gotica', label: 'Interior de Catedral Gótica', description: 'Vitrais coloridos, teto altíssimo, raios de luz divina, bancos de madeira.' },
          { id: 'sala_aula', label: 'Sala de Aula Japonesa', description: 'Carteiras alinhadas, quadro negro, janela com vista para cerejeiras, luz do sol.' },
          { id: 'bar_clandestino', label: 'Bar Speakeasy (Anos 20)', description: 'Luz fraca, fumaça de charuto, jazz, móveis de couro, copos de cristal.' },
          { id: 'estufa_plantas', label: 'Estufa de Vidro', description: 'Cheio de plantas exóticas, umidade no vidro, luz do sol filtrada pelas folhas.' }
        ]
      }
    ]
  },
  {
    id: 'iluminacao',
    label: '💡 Iluminação',
    subcategories: [
      {
        label: 'Luz Natural',
        options: [
          { id: 'golden_hour', label: 'Golden Hour (Hora Dourada)', description: 'Luz quente, suave e dourada do amanhecer ou entardecer. Sombras longas.' },
          { id: 'blue_hour', label: 'Blue Hour (Hora Azul)', description: 'Luz azulada e suave logo antes do nascer do sol ou após o pôr do sol.' },
          { id: 'meio_dia', label: 'Sol do Meio-Dia (Harsh Sunlight)', description: 'Luz dura vindo de cima, sombras curtas e escuras, alto contraste.' },
          { id: 'nublado', label: 'Dia Nublado (Overcast)', description: 'Luz muito suave e difusa, sem sombras duras, cores fiéis.' },
          { id: 'luz_janela', label: 'Luz de Janela', description: 'Luz suave entrando por uma janela, iluminando apenas um lado do sujeito.' },
          { id: 'raios_sol', label: 'Raios de Sol (God Rays)', description: 'Feixes de luz visíveis cortando a poeira ou névoa.' },
          { id: 'luz_lunar', label: 'Luz do Luar', description: 'Luz prateada/azulada fraca, sombras escuras, clima noturno misterioso.' },
          { id: 'sombra_arvore', label: 'Luz Filtrada por Árvores (Dappled Light)', description: 'Manchas de luz e sombra criadas por folhas.' },
          { id: 'crepusculo', label: 'Crepúsculo', description: 'Céu com gradiente de cores (rosa, roxo, laranja), pouca luz no chão.' },
          { id: 'luz_tempestade', label: 'Luz de Tempestade', description: 'Céu cinza escuro, mas com uma luz dramática iluminando o sujeito.' }
        ]
      },
      {
        label: 'Luz de Estúdio',
        options: [
          { id: 'tres_pontos', label: 'Iluminação de Três Pontos', description: 'Padrão clássico: luz principal, luz de preenchimento e luz de cabelo.' },
          { id: 'rembrandt', label: 'Iluminação Rembrandt', description: 'Cria um pequeno triângulo de luz na bochecha do lado escuro do rosto.' },
          { id: 'butterfly', label: 'Iluminação Borboleta (Paramount)', description: 'Luz de cima e de frente, cria uma sombra em forma de borboleta sob o nariz.' },
          { id: 'split', label: 'Iluminação Dividida (Split)', description: 'Metade do rosto iluminada, a outra metade na escuridão total.' },
          { id: 'rim_light', label: 'Luz de Recorte (Rim Light)', description: 'Luz forte vindo de trás, criando um contorno brilhante ao redor do sujeito.' },
          { id: 'softbox', label: 'Luz de Softbox', description: 'Luz de estúdio muito suave, sombras com bordas borradas, lisonjeira para a pele.' },
          { id: 'ring_light', label: 'Ring Light', description: 'Luz circular frontal, elimina sombras, cria um reflexo redondo nos olhos.' },
          { id: 'hard_light', label: 'Luz Dura (Hard Light)', description: 'Luz direta sem difusor, sombras com bordas afiadas e escuras.' },
          { id: 'gel_colors', label: 'Géis de Cor (Color Gels)', description: 'Luzes de estúdio com cores fortes (ex: vermelho de um lado, azul do outro).' },
          { id: 'beauty_dish', label: 'Beauty Dish', description: 'Luz focada mas suave, muito usada em fotografia de moda e maquiagem.' }
        ]
      },
      {
        label: 'Luzes Artificiais e Práticas',
        options: [
          { id: 'neon', label: 'Luz Neon', description: 'Luzes brilhantes de letreiros (rosa, ciano, verde), reflexos na pele molhada.' },
          { id: 'fogo', label: 'Luz de Fogo / Fogueira', description: 'Luz quente, laranja e tremeluzente, vindo de baixo.' },
          { id: 'velas', label: 'Luz de Velas', description: 'Luz muito fraca, quente e intimista, sombras profundas.' },
          { id: 'lanterna', label: 'Luz de Lanterna (Flashlight)', description: 'Feixe de luz duro e focado cortando a escuridão.' },
          { id: 'tela_pc', label: 'Luz de Tela de Computador', description: 'Luz azulada ou esverdeada iluminando o rosto em um quarto escuro.' },
          { id: 'poste_luz', label: 'Luz de Poste de Rua', description: 'Luz amarelada (sódio) ou branca caindo de cima em uma rua escura.' },
          { id: 'farol_carro', label: 'Faróis de Carro', description: 'Luz branca e forte vindo de trás ou de lado, criando silhuetas.' },
          { id: 'pisca_pisca', label: 'Luzes de Fada (Fairy Lights)', description: 'Pequenos pontos de luz quente desfocados no fundo ou perto do rosto.' },
          { id: 'sirene', label: 'Luz de Sirene (Polícia)', description: 'Luzes vermelhas e azuis piscando, criando um clima de tensão.' },
          { id: 'geladeira', label: 'Luz de Geladeira Aberta', description: 'Luz fria iluminando o sujeito em uma cozinha escura.' }
        ]
      },
      {
        label: 'Efeitos de Iluminação',
        options: [
          { id: 'chiaroscuro', label: 'Chiaroscuro', description: 'Contraste extremo entre luz e escuridão, estilo pintura renascentista.' },
          { id: 'silhueta', label: 'Silhueta', description: 'Sujeito totalmente escuro contra um fundo muito claro.' },
          { id: 'lens_flare', label: 'Lens Flare (Reflexo de Lente)', description: 'Círculos ou linhas de luz causados pelo sol batendo direto na lente.' },
          { id: 'volumetric', label: 'Luz Volumétrica', description: 'Quando a luz ganha volume no ar devido a fumaça ou poeira.' },
          { id: 'bioluminescencia', label: 'Bioluminescência', description: 'Luz emitida por seres vivos (ex: cogumelos brilhantes, águas-vivas).' },
          { id: 'gobo', label: 'Sombras Projetadas (Gobo)', description: 'Sombras de persianas, grades ou folhas projetadas no sujeito.' },
          { id: 'cinematic_teal_orange', label: 'Teal and Orange (Cinematográfico)', description: 'Contraste de cores: sombras azuladas/esverdeadas e luzes laranjas.' },
          { id: 'underlighting', label: 'Luz de Baixo (Underlighting)', description: 'Luz vindo de baixo do rosto, cria um visual assustador ou misterioso.' },
          { id: 'strobe', label: 'Luz Estroboscópica', description: 'Flashes rápidos congelando o movimento, visual de balada.' },
          { id: 'holographic', label: 'Luz Holográfica', description: 'Luz iridescente, mudando de cor conforme o ângulo, visual futurista.' }
        ]
      },
      {
        label: 'Atmosfera Luminosa',
        options: [
          { id: 'ethereal', label: 'Luz Etérea', description: 'Luz branca, brilhante e difusa, parecendo um sonho ou o paraíso.' },
          { id: 'gloomy', label: 'Luz Sombria (Gloomy)', description: 'Pouca luz, tons acinzentados, sensação de tristeza ou opressão.' },
          { id: 'radiant', label: 'Luz Radiante', description: 'Luz que parece emanar do próprio sujeito, brilhante e cheia de energia.' },
          { id: 'moody', label: 'Luz Moody', description: 'Sombria, com sombras ricas e cores profundas, muito emocional.' },
          { id: 'harsh_flash', label: 'Flash Direto (Paparazzi)', description: 'Flash forte direto na cara, fundo escuro, sombras duras atrás.' },
          { id: 'subaquatica', label: 'Luz Subaquática', description: 'Luz azulada, filtrada pela água, com reflexos ondulantes (caustics).' },
          { id: 'disco', label: 'Luz de Globo de Espelhos', description: 'Pequenos pontos de luz girando pelo ambiente.' },
          { id: 'laser', label: 'Feixes de Laser', description: 'Linhas de luz colorida cortando o ar cheio de fumaça.' },
          { id: 'aurora', label: 'Luz de Aurora Boreal', description: 'Luzes verdes e roxas dançando no céu noturno, refletindo no chão.' },
          { id: 'magical_glow', label: 'Brilho Mágico', description: 'Luz suave e colorida emanando de um objeto mágico (ex: varinha, poção).' }
        ]
      }
    ]
  },
  {
    id: 'angulos_camera',
    label: '📐 Ângulos de Câmera',
    subcategories: [
      {
        label: 'Enquadramento (Distância)',
        options: [
          { id: 'extreme_close_up', label: 'Close-up Extremo', description: 'Foco em um detalhe muito específico (ex: apenas um olho, lábios).' },
          { id: 'close_up', label: 'Close-up (Primeiro Plano)', description: 'Enquadra o rosto e os ombros. Foco na expressão facial.' },
          { id: 'medium_close_up', label: 'Plano Médio Curto', description: 'Enquadra do peito para cima.' },
          { id: 'medium_shot', label: 'Plano Médio', description: 'Enquadra da cintura para cima. Mostra linguagem corporal.' },
          { id: 'cowboy_shot', label: 'Plano Americano (Cowboy Shot)', description: 'Enquadra do joelho para cima (usado em faroestes para mostrar a arma).' },
          { id: 'full_shot', label: 'Plano Inteiro', description: 'Mostra o corpo inteiro da pessoa, da cabeça aos pés.' },
          { id: 'wide_shot', label: 'Plano Geral (Wide Shot)', description: 'Mostra a pessoa inteira e bastante do cenário ao redor.' },
          { id: 'extreme_wide_shot', label: 'Plano Geral Extremo', description: 'A pessoa é um ponto pequeno na paisagem. Foco total no cenário.' },
          { id: 'establishing_shot', label: 'Plano de Estabelecimento', description: 'Mostra o local onde a cena vai acontecer (ex: a fachada de um prédio).' },
          { id: 'macro_shot', label: 'Plano Macro', description: 'Extremamente próximo, mostrando texturas microscópicas.' }
        ]
      },
      {
        label: 'Ângulos Verticais',
        options: [
          { id: 'eye_level', label: 'Nível dos Olhos', description: 'Câmera na mesma altura dos olhos do sujeito. Neutro e natural.' },
          { id: 'low_angle', label: 'Contra-plongée (Low Angle)', description: 'Câmera olhando de baixo para cima. Faz o sujeito parecer poderoso ou ameaçador.' },
          { id: 'high_angle', label: 'Plongée (High Angle)', description: 'Câmera olhando de cima para baixo. Faz o sujeito parecer vulnerável ou pequeno.' },
          { id: 'birds_eye', label: 'Visão de Pássaro (Bird\'s Eye)', description: 'Câmera exatamente acima do sujeito, olhando reto para baixo.' },
          { id: 'worms_eye', label: 'Visão de Verme (Worm\'s Eye)', description: 'Câmera no nível do chão, olhando para cima.' },
          { id: 'overhead', label: 'Overhead Shot', description: 'Câmera acima da cabeça, mas não tão alta quanto a visão de pássaro.' },
          { id: 'ground_level', label: 'Nível do Chão', description: 'Câmera encostada no chão, mostrando os pés ou o piso.' },
          { id: 'knee_level', label: 'Nível do Joelho', description: 'Câmera na altura dos joelhos, comum em filmes do Ozu.' },
          { id: 'hip_level', label: 'Nível do Quadril', description: 'Câmera na altura da cintura, comum em filmes de faroeste.' },
          { id: 'shoulder_level', label: 'Nível do Ombro', description: 'Câmera na altura dos ombros, um pouco mais baixa que o nível dos olhos.' }
        ]
      },
      {
        label: 'Ângulos e Movimentos Especiais',
        options: [
          { id: 'dutch_angle', label: 'Plano Holandês (Dutch Angle)', description: 'Câmera inclinada para o lado. Causa sensação de desorientação, loucura ou tensão.' },
          { id: 'over_the_shoulder', label: 'Over the Shoulder (Por cima do ombro)', description: 'Câmera atrás de uma pessoa, olhando por cima do ombro dela para outra pessoa.' },
          { id: 'pov', label: 'POV (Ponto de Vista)', description: 'A câmera é os olhos do personagem. Vemos o que ele vê.' },
          { id: 'profile', label: 'Perfil', description: 'O sujeito é visto exatamente de lado.' },
          { id: 'three_quarter', label: 'Três Quartos (3/4)', description: 'O sujeito está levemente virado, mostrando parte do rosto e ombro.' },
          { id: 'from_behind', label: 'De Trás', description: 'Vemos as costas do sujeito, geralmente olhando para a paisagem.' },
          { id: 'selfie', label: 'Estilo Selfie', description: 'Parece que o próprio sujeito está segurando a câmera.' },
          { id: 'security_cam', label: 'Ângulo de Câmera de Segurança', description: 'No alto do canto da sala, visão ampla e distorcida.' },
          { id: 'drone_angle', label: 'Ângulo de Drone', description: 'Visão aérea em movimento, geralmente em ângulo de 45 graus para baixo.' },
          { id: 'reflection', label: 'Através de Reflexo', description: 'Vemos o sujeito através de um espelho, poça d\'água ou vidro.' }
        ]
      },
      {
        label: 'Lentes e Efeitos Ópticos',
        options: [
          { id: 'wide_angle_lens', label: 'Lente Grande Angular', description: 'Captura muito do ambiente, distorce as bordas, faz o espaço parecer maior.' },
          { id: 'telephoto_lens', label: 'Lente Teleobjetiva', description: 'Achata a perspectiva, faz o fundo parecer colado no sujeito.' },
          { id: 'fisheye_lens', label: 'Lente Olho de Peixe', description: 'Distorção extrema, imagem circular, efeito de "olho mágico".' },
          { id: 'macro_lens', label: 'Lente Macro', description: 'Permite focar extremamente perto para detalhes minúsculos.' },
          { id: 'shallow_dof', label: 'Profundidade de Campo Curta', description: 'Sujeito nítido, fundo completamente desfocado (Bokeh forte).' },
          { id: 'deep_dof', label: 'Profundidade de Campo Longa', description: 'Tudo está em foco, desde o sujeito até o fundo distante.' },
          { id: 'tilt_shift_lens', label: 'Lente Tilt-Shift', description: 'Cria uma faixa de foco estreita, fazendo o mundo parecer uma maquete.' },
          { id: 'anamorphic', label: 'Lente Anamórfica', description: 'Formato de cinema ultra-largo, reflexos de luz horizontais (lens flares azuis).' },
          { id: 'kaleidoscope', label: 'Filtro Caleidoscópio', description: 'A imagem se multiplica em padrões geométricos.' },
          { id: 'split_diopter', label: 'Split Diopter', description: 'Metade da lente foca perto, a outra foca longe. Dois planos em foco ao mesmo tempo.' }
        ]
      },
      {
        label: 'Composição',
        options: [
          { id: 'rule_of_thirds', label: 'Regra dos Terços', description: 'O sujeito está posicionado em um dos cantos da imagem, não no centro.' },
          { id: 'symmetry', label: 'Simetria Central', description: 'Sujeito exatamente no meio, imagem espelhada (estilo Wes Anderson).' },
          { id: 'leading_lines', label: 'Linhas Guia', description: 'Linhas no cenário (estradas, cercas) que apontam para o sujeito.' },
          { id: 'framing', label: 'Moldura Natural (Framing)', description: 'O sujeito é emoldurado por portas, janelas ou galhos de árvores.' },
          { id: 'negative_space', label: 'Espaço Negativo', description: 'Muito espaço vazio ao redor do sujeito, criando sensação de isolamento ou paz.' },
          { id: 'golden_ratio', label: 'Proporção Áurea', description: 'Composição em espiral perfeita, muito agradável aos olhos.' },
          { id: 'dynamic_angles', label: 'Ângulos Dinâmicos', description: 'Composição diagonal, cheia de movimento e energia (estilo quadrinhos).' },
          { id: 'claustrophobic', label: 'Composição Claustrofóbica', description: 'Sujeito espremido pelas bordas do quadro, sensação de aperto.' },
          { id: 'voyeuristic', label: 'Visão Voyeurista', description: 'Parece que estamos espiando o sujeito através de uma fresta ou arbustos.' },
          { id: 'forced_perspective', label: 'Perspectiva Forçada', description: 'Ilusão de ótica que faz algo parecer maior ou menor do que é (ex: segurando a Torre Eiffel).' }
        ]
      }
    ]
  },
  {
    id: 'estilo_roupa',
    label: '👗 Estilo de Roupa',
    subcategories: [
      {
        label: 'Moda Contemporânea',
        options: [
          { id: 'casual_chic', label: 'Casual Chic', description: 'Roupas do dia a dia, mas elegantes e bem cortadas (jeans, blazer, camiseta básica).' },
          { id: 'streetwear', label: 'Streetwear', description: 'Moda urbana, tênis de marca, moletons largos, bonés, estilo skatista/hip-hop.' },
          { id: 'haute_couture', label: 'Alta Costura (Haute Couture)', description: 'Vestidos de passarela extravagantes, design único, materiais luxuosos.' },
          { id: 'business_formal', label: 'Terno / Business Formal', description: 'Terno completo, gravata, sapato social. Visual corporativo.' },
          { id: 'athleisure', label: 'Athleisure (Esportivo Casual)', description: 'Roupas de academia usadas no dia a dia (leggings, tops, jaquetas corta-vento).' },
          { id: 'boho_chic', label: 'Boho Chic', description: 'Estilo boêmio, vestidos longos e fluidos, franjas, chapéus, estampas florais.' },
          { id: 'minimalist', label: 'Minimalista', description: 'Cores neutras (preto, branco, bege), cortes retos, sem estampas ou logos.' },
          { id: 'preppy', label: 'Preppy (Colegial)', description: 'Suéteres amarrados no ombro, camisas polo, saias plissadas, visual de universidade de elite.' },
          { id: 'grunge', label: 'Grunge Moderno', description: 'Camisas de flanela xadrez, jeans rasgado, coturnos, visual desleixado intencional.' },
          { id: 'techwear', label: 'Techwear', description: 'Roupas utilitárias pretas, muitos bolsos, tiras, tecidos impermeáveis, visual ninja urbano.' }
        ]
      },
      {
        label: 'Moda Histórica e Vintage',
        options: [
          { id: 'victorian', label: 'Vitoriano (Séc. 19)', description: 'Espartilhos, vestidos volumosos, golas altas, cartolas, rendas.' },
          { id: 'roaring_20s', label: 'Anos 1920 (Flapper)', description: 'Vestidos curtos com franjas, faixas na cabeça, pérolas, ternos risca-de-giz.' },
          { id: 'fifties', label: 'Anos 1950 (Pin-up / Rockabilly)', description: 'Saias rodadas de bolinhas, jaquetas de couro, topetes, óculos gatinho.' },
          { id: 'sixties', label: 'Anos 1960 (Mod)', description: 'Vestidos tubulares curtos, botas de cano alto, estampas geométricas, cores vibrantes.' },
          { id: 'seventies', label: 'Anos 1970 (Disco / Hippie)', description: 'Calças boca de sino, camisas com golas enormes, lantejoulas, plataformas.' },
          { id: 'eighties', label: 'Anos 1980', description: 'Ombreiras gigantes, cores neon, polainas, jeans lavado com ácido.' },
          { id: 'nineties', label: 'Anos 1990', description: 'Jardineiras jeans, camisetas de banda, gargantilhas (chokers), camisas de flanela.' },
          { id: 'y2k', label: 'Y2K (Anos 2000)', description: 'Calças de cintura super baixa, tops curtos, veludo cotele, óculos coloridos.' },
          { id: 'medieval', label: 'Medieval / Renascentista', description: 'Túnicas, vestidos longos com mangas sino, capas de veludo.' },
          { id: 'ancient_rome', label: 'Roma / Grécia Antiga', description: 'Togas brancas, sandálias de couro, coroas de louros, drapeados.' }
        ]
      },
      {
        label: 'Fantasia e Ficção Científica',
        options: [
          { id: 'cyberpunk_fashion', label: 'Moda Cyberpunk', description: 'Jaquetas de couro com luzes neon, implantes cibernéticos visíveis, óculos futuristas.' },
          { id: 'steampunk_fashion', label: 'Moda Steampunk', description: 'Corsets de couro, engrenagens, óculos de aviador (goggles), cartolas com relógios.' },
          { id: 'post_apocalyptic', label: 'Pós-Apocalíptico (Mad Max)', description: 'Roupas rasgadas, remendos de couro e metal, muita poeira, óculos de proteção.' },
          { id: 'space_suit', label: 'Traje Espacial', description: 'Roupa de astronauta, capacete de vidro, tubos de oxigênio.' },
          { id: 'fantasy_armor', label: 'Armadura de Fantasia', description: 'Placas de metal ornamentadas, ombreiras gigantes, capas esvoaçantes.' },
          { id: 'mage_robes', label: 'Vestes de Mago', description: 'Túnicas longas e misteriosas, capuzes profundos, runas brilhantes.' },
          { id: 'elven_clothing', label: 'Roupas Élficas', description: 'Tecidos leves e esvoaçantes, cores da natureza, detalhes em folhas de prata.' },
          { id: 'sci_fi_uniform', label: 'Uniforme Sci-Fi (Star Trek)', description: 'Uniformes justos e limpos, cores sólidas indicando patentes, emblemas.' },
          { id: 'wasteland_scavenger', label: 'Catador do Deserto', description: 'Mantos esfarrapados, máscaras de gás, mochilas cheias de sucata.' },
          { id: 'mecha_pilot', label: 'Traje de Piloto de Mecha', description: 'Traje colado ao corpo (plugsuit), conectores neurais, capacete tecnológico.' }
        ]
      },
      {
        label: 'Uniformes e Profissões',
        options: [
          { id: 'military', label: 'Uniforme Militar', description: 'Camuflagem, colete tático, coturnos, capacete.' },
          { id: 'doctor', label: 'Médico / Cientista', description: 'Jaleco branco, estetoscópio, óculos de proteção.' },
          { id: 'police', label: 'Uniforme Policial', description: 'Farda azul ou preta, distintivo, cinto de utilidades.' },
          { id: 'chef', label: 'Chef de Cozinha', description: 'Dólmã branco, chapéu de chef (toque blanche), avental.' },
          { id: 'astronaut', label: 'Astronauta (Casual)', description: 'Macacão azul da NASA, patches de missões.' },
          { id: 'mechanic', label: 'Mecânico', description: 'Macacão sujo de graxa, cinto de ferramentas, boné.' },
          { id: 'pilot', label: 'Piloto de Avião', description: 'Camisa branca, dragonas nos ombros, quepe, óculos aviador.' },
          { id: 'maid', label: 'Uniforme de Empregada (Maid)', description: 'Vestido preto, avental branco com babados, tiara.' },
          { id: 'school_uniform', label: 'Uniforme Escolar Japonês', description: 'Estilo marinheiro (seifuku) ou blazer com gravata e saia xadrez.' },
          { id: 'monk', label: 'Monge', description: 'Túnica laranja ou marrom simples, cabeça raspada, colar de contas.' }
        ]
      },
      {
        label: 'Trajes Culturais e Específicos',
        options: [
          { id: 'kimono', label: 'Kimono Tradicional', description: 'Veste japonesa de seda, estampas florais, faixa obi larga.' },
          { id: 'hanbok', label: 'Hanbok', description: 'Traje tradicional coreano, cores vibrantes, saia volumosa de cintura alta.' },
          { id: 'sari', label: 'Sari Indiano', description: 'Longo tecido drapeado pelo corpo, cores ricas, bordados dourados.' },
          { id: 'qipao', label: 'Qipao / Cheongsam', description: 'Vestido chinês justo, gola alta, fenda lateral.' },
          { id: 'mariachi', label: 'Traje de Mariachi', description: 'Terno bordado com prata, sombrero grande, gravata borboleta.' },
          { id: 'cowboy', label: 'Cowboy / Cowgirl', description: 'Chapéu de vaqueiro, camisa xadrez, calça jeans, botas de couro com esporas.' },
          { id: 'ninja', label: 'Traje Ninja (Shinobi)', description: 'Roupas pretas justas, rosto coberto, faixas nos braços.' },
          { id: 'samurai', label: 'Armadura Samurai', description: 'Placas de laca vermelha ou preta, capacete com chifres (kabuto).' },
          { id: 'goth_lolita', label: 'Gothic Lolita', description: 'Vestidos estilo vitoriano escuros, muitos babados, sombrinhas de renda.' },
          { id: 'swimwear', label: 'Traje de Banho', description: 'Biquíni, maiô ou sunga, óculos de sol, canga.' }
        ]
      }
    ]
  },
  {
    id: 'parametros_avancados',
    label: '⚙️ Parâmetros Avançados',
    subcategories: [
      {
        label: 'Qualidade e Resolução',
        options: [
          { id: '8k', label: '8K Resolution', description: 'Garante que a IA tente gerar o máximo de detalhes possível.' },
          { id: 'masterpiece', label: 'Masterpiece', description: 'Palavra-chave forte em modelos de anime para forçar a melhor qualidade.' },
          { id: 'best_quality', label: 'Best Quality', description: 'Reforça a ausência de defeitos na imagem.' },
          { id: 'ultra_detailed', label: 'Ultra-detailed', description: 'Força a geração de texturas finas (fios de cabelo, poros, tecidos).' },
          { id: 'hyper_realistic', label: 'Hyper-realistic', description: 'Faz a imagem parecer uma foto real, afastando de estilos de desenho.' },
          { id: 'award_winning', label: 'Award-winning Photography', description: 'Faz a IA imitar a composição e iluminação de fotos premiadas.' },
          { id: 'sharp_focus', label: 'Sharp Focus', description: 'Garante que o sujeito principal não fique borrado.' },
          { id: 'intricate_details', label: 'Intricate Details', description: 'Adiciona complexidade a joias, armaduras e arquitetura.' },
          { id: 'high_res', label: 'Highres', description: 'Aumenta a nitidez geral da imagem.' },
          { id: 'raw_photo', label: 'RAW Photo', description: 'Simula uma foto sem edição de Photoshop, cores mais naturais e realistas.' }
        ]
      },
      {
        label: 'Renderização e Iluminação 3D',
        options: [
          { id: 'unreal_engine_5', label: 'Unreal Engine 5', description: 'Visual de videogame de última geração, iluminação hiper-realista.' },
          { id: 'octane_render', label: 'Octane Render', description: 'Motor de renderização famoso por materiais brilhantes e iluminação perfeita.' },
          { id: 'ray_tracing', label: 'Ray Tracing', description: 'Reflexos fisicamente precisos em espelhos, água e metal.' },
          { id: 'global_illumination', label: 'Global Illumination', description: 'A luz rebate nas paredes e colore o ambiente de forma realista.' },
          { id: 'subsurface_scattering', label: 'Subsurface Scattering (SSS)', description: 'A luz penetra levemente na pele/cera, dando um aspecto translúcido e vivo.' },
          { id: 'ambient_occlusion', label: 'Ambient Occlusion', description: 'Sombras de contato muito realistas onde os objetos se tocam.' },
          { id: 'physically_based', label: 'PBR (Physically Based Rendering)', description: 'Materiais (metal, madeira, plástico) reagem à luz como no mundo real.' },
          { id: 'volumetric_lighting', label: 'Volumetric Lighting', description: 'Raios de luz visíveis no ar (névoa iluminada).' },
          { id: 'caustics', label: 'Caustics', description: 'Padrões de luz dançantes criados quando a luz passa pela água ou vidro.' },
          { id: 'cinematic_lighting', label: 'Cinematic Lighting', description: 'Iluminação dramática e planejada como em um filme de alto orçamento.' }
        ]
      },
      {
        label: 'Estilos de Câmera e Filme',
        options: [
          { id: 'kodak_portra', label: 'Kodak Portra 400', description: 'Filme famoso por tons de pele perfeitos e cores suaves.' },
          { id: 'fujifilm_superia', label: 'Fujifilm Superia', description: 'Filme com tons levemente esverdeados nas sombras, visual nostálgico.' },
          { id: 'cinestill_800t', label: 'CineStill 800T', description: 'Filme noturno, faz as luzes neon terem um brilho vermelho/alaranjado ao redor.' },
          { id: 'ilford_hp5', label: 'Ilford HP5', description: 'Filme preto e branco clássico, com granulação bonita e alto contraste.' },
          { id: 'polaroid_sx70_film', label: 'Polaroid SX-70', description: 'Cores quentes, bordas borradas, visual vintage autêntico.' },
          { id: 'canon_eos_r5', label: 'Canon EOS R5', description: 'Câmera digital moderna, cores vibrantes e nitidez extrema.' },
          { id: 'sony_a7siii', label: 'Sony A7S III', description: 'Famosa por vídeos noturnos, gera imagens limpas em ambientes escuros.' },
          { id: 'arri_alexa', label: 'ARRI Alexa 65', description: 'Câmera de cinema de Hollywood, alcance dinâmico perfeito.' },
          { id: 'imax_70mm', label: 'IMAX 70mm', description: 'Formato de filme gigante, resolução absurda (estilo filmes do Nolan).' },
          { id: 'gopro_hero', label: 'GoPro Hero 12', description: 'Visual de câmera de ação, grande angular, cores saturadas.' }
        ]
      },
      {
        label: 'Efeitos de Lente e Pós-Produção',
        options: [
          { id: 'film_grain', label: 'Film Grain (Granulação)', description: 'Adiciona textura de filme antigo, tira o aspecto "plástico" da IA.' },
          { id: 'chromatic_aberration', label: 'Aberração Cromática', description: 'Bordas coloridas (vermelho/azul) nos contornos, simula lente imperfeita.' },
          { id: 'vignette', label: 'Vignette (Vinheta)', description: 'Bordas da imagem escurecidas, focando a atenção no centro.' },
          { id: 'motion_blur', label: 'Motion Blur', description: 'Borrão de movimento, dá sensação de velocidade.' },
          { id: 'depth_of_field', label: 'Depth of Field (DoF)', description: 'Desfoque realista de fundo e primeiro plano.' },
          { id: 'lens_flare_effect', label: 'Lens Flare', description: 'Reflexos de luz na lente da câmera.' },
          { id: 'bloom', label: 'Bloom', description: 'As luzes brilhantes "vazam" suavemente para as áreas escuras.' },
          { id: 'color_grading', label: 'Color Grading', description: 'Correção de cor profissional, unificando os tons da imagem.' },
          { id: 'halftone', label: 'Halftone', description: 'Efeito de impressão de quadrinhos antigos (pontinhos).' },
          { id: 'glitch_art', label: 'Glitch Effect', description: 'Falhas digitais, pixels corrompidos, visual cyberpunk.' }
        ]
      },
      {
        label: 'Modificadores de Estilo Artístico',
        options: [
          { id: 'trending_artstation', label: 'Trending on ArtStation', description: 'Força um estilo de ilustração digital de altíssima qualidade.' },
          { id: 'concept_art_modifier', label: 'Concept Art', description: 'Visual de design de produção de filmes/jogos.' },
          { id: 'matte_painting_modifier', label: 'Matte Painting', description: 'Pintura de cenários hiper-realista.' },
          { id: 'cel_shaded_modifier', label: 'Cel-shaded', description: 'Sombras duras estilo anime/quadrinhos em modelos 3D.' },
          { id: 'impasto_modifier', label: 'Thick Impasto', description: 'Tinta a óleo muito grossa, textura 3D na tela.' },
          { id: 'watercolor_modifier', label: 'Watercolor Wash', description: 'Manchas de aquarela fluidas e transparentes.' },
          { id: 'ink_wash', label: 'Ink Wash (Sumi-e)', description: 'Pintura tradicional asiática com tinta preta e água.' },
          { id: 'stippling', label: 'Stippling (Pontilhismo)', description: 'Imagem feita inteiramente de pequenos pontos.' },
          { id: 'linocut', label: 'Linocut (Xilogravura)', description: 'Estilo de impressão em bloco de madeira, traços grossos e rústicos.' },
          { id: 'stained_glass', label: 'Stained Glass', description: 'Estilo de vitral de igreja, cores divididas por linhas pretas.' }
        ]
      }
    ]
  },
  {
    id: 'pose_posicao',
    label: '🧍 Pose & Posição',
    subcategories: [
      {
        label: 'Em Pé',
        options: [
          { id: 'em_pe_parado', label: 'Em Pé Parado', description: 'Postura neutra, de pé sem movimento.' },
          { id: 'caminhando', label: 'Caminhando', description: 'Capturado no meio de um passo, movimento natural.' },
          { id: 'correndo', label: 'Correndo', description: 'Ação rápida, postura inclinada para frente.' },
          { id: 'pose_modelo', label: 'Pose de Modelo', description: 'Postura elegante, ângulos corporais acentuados, estilo passarela.' },
          { id: 'encostado_parede', label: 'Encostado na Parede', description: 'Postura relaxada, costas ou ombro apoiados em uma superfície.' },
          { id: 'saltando', label: 'Saltando no Ar', description: 'Ambos os pés fora do chão, sensação de leveza ou energia.' },
          { id: 'marchando', label: 'Marchando', description: 'Passos firmes e sincronizados, postura ereta.' },
          { id: 'dancando', label: 'Dançando', description: 'Movimento fluido, pose expressiva e rítmica.' },
          { id: 'pose_luta', label: 'Pose de Luta', description: 'Guarda alta, pernas flexionadas, pronto para combate.' },
          { id: 'alongando', label: 'Alongando', description: 'Esticando os braços ou pernas, postura esportiva.' }
        ]
      },
      {
        label: 'Sentado',
        options: [
          { id: 'sentado_chao', label: 'Sentado no Chão', description: 'Postura casual, diretamente no solo.' },
          { id: 'sentado_cadeira', label: 'Sentado na Cadeira', description: 'Postura formal ou relaxada em um assento.' },
          { id: 'pernas_cruzadas', label: 'Pernas Cruzadas', description: 'Sentado no chão com as pernas cruzadas (estilo índio).' },
          { id: 'agachado', label: 'Agachado', description: 'Joelhos dobrados, peso nos pés, postura de espera ou descanso.' },
          { id: 'ajoelhado', label: 'Ajoelhado', description: 'Um ou ambos os joelhos no chão, postura de reverência ou foco.' },
          { id: 'sentado_beirada', label: 'Sentado na Beirada', description: 'Pernas penduradas em um muro, telhado ou penhasco.' },
          { id: 'posicao_lotus', label: 'Posição de Lótus', description: 'Postura de meditação, costas retas, pernas entrelaçadas.' },
          { id: 'relaxado_sofa', label: 'Relaxado no Sofá', description: 'Postura despojada, afundado em almofadas.' },
          { id: 'sentado_degraus', label: 'Sentado em Degraus', description: 'Postura urbana, sentado em uma escadaria.' },
          { id: 'abracando_joelhos', label: 'Abraçando os Joelhos', description: 'Sentado, encolhido, transmitindo vulnerabilidade ou frio.' }
        ]
      },
      {
        label: 'Deitado',
        options: [
          { id: 'de_costas', label: 'Deitado de Costas', description: 'Olhando para cima, postura aberta e relaxada.' },
          { id: 'de_brucos', label: 'Deitado de Bruços', description: 'Rosto para baixo ou de lado, postura de descanso.' },
          { id: 'de_lado', label: 'Deitado de Lado', description: 'Apoiado em um dos ombros, postura casual ou sensual.' },
          { id: 'flutuando', label: 'Flutuando', description: 'Suspenso no ar ou na água, sem gravidade aparente.' },
          { id: 'caindo', label: 'Caindo', description: 'Movimento descendente no ar, roupas esvoaçantes, tensão.' },
          { id: 'dormindo', label: 'Dormindo', description: 'Olhos fechados, expressão serena, corpo relaxado.' },
          { id: 'esticado', label: 'Totalmente Esticado', description: 'Braços e pernas estendidos ao máximo.' },
          { id: 'encolhido', label: 'Encolhido (Posição Fetal)', description: 'Joelhos no peito, postura de proteção.' },
          { id: 'deitado_grama', label: 'Deitado na Grama', description: 'Integrado à natureza, clima bucólico.' },
          { id: 'deitado_agua', label: 'Deitado na Água', description: 'Parcialmente submerso, reflexos, clima etéreo.' }
        ]
      },
      {
        label: 'Ação e Dinâmica',
        options: [
          { id: 'chutando', label: 'Chutando', description: 'Perna estendida no ar, movimento de artes marciais ou esporte.' },
          { id: 'socando', label: 'Socando', description: 'Braço estendido com força, impacto iminente.' },
          { id: 'esquivando', label: 'Esquivando', description: 'Corpo inclinado para evitar algo, movimento rápido.' },
          { id: 'girando', label: 'Girando', description: 'Movimento circular, roupas e cabelos acompanhando a inércia.' },
          { id: 'equilibrando', label: 'Equilibrando-se', description: 'Andando em uma linha fina, braços abertos para estabilidade.' },
          { id: 'escalando', label: 'Escalando', description: 'Agarrado a uma parede ou rocha, tensão muscular.' },
          { id: 'deslizando', label: 'Deslizando', description: 'Movimento rente ao chão, levantando poeira ou água.' },
          { id: 'arremessando', label: 'Arremessando', description: 'Braço projetado para frente, soltando um objeto.' },
          { id: 'pegando', label: 'Pegando algo no ar', description: 'Mãos estendidas para agarrar um objeto em movimento.' },
          { id: 'pousando', label: 'Pousando (Superhero Landing)', description: 'Impacto no chão após um salto, um joelho e uma mão no solo.' }
        ]
      },
      {
        label: 'Expressões e Gestos',
        options: [
          { id: 'bracos_cruzados', label: 'Braços Cruzados', description: 'Postura defensiva, confiante ou impaciente.' },
          { id: 'maos_bolsos', label: 'Mãos nos Bolsos', description: 'Postura casual, relaxada ou descolada.' },
          { id: 'apontando', label: 'Apontando', description: 'Dedo estendido indicando uma direção ou pessoa.' },
          { id: 'mao_queixo', label: 'Mão no Queixo', description: 'Postura pensativa, analítica ou curiosa.' },
          { id: 'acenando', label: 'Acenando', description: 'Mão levantada em cumprimento ou despedida.' },
          { id: 'segurando_objeto', label: 'Segurando Objeto', description: 'Interagindo com um item (arma, flor, livro, etc).' },
          { id: 'olhando_tras', label: 'Olhando por cima do Ombro', description: 'Corpo de costas, mas rosto virado para a câmera.' },
          { id: 'maos_cintura', label: 'Mãos na Cintura', description: 'Postura de autoridade, prontidão ou desafio.' },
          { id: 'ajustando_oculos', label: 'Ajustando Óculos/Roupa', description: 'Gesto sutil e elegante com as mãos no rosto ou colarinho.' },
          { id: 'cobrindo_rosto', label: 'Cobrindo o Rosto', description: 'Mãos escondendo a expressão, mistério ou choro.' }
        ]
      }
    ]
  },
  {
    id: 'expressoes_faciais',
    label: '😊 Expressões Faciais',
    subcategories: [
      {
        label: 'Alegria e Positividade',
        options: [
          { id: 'sorriso_aberto', label: 'Sorriso Aberto', description: 'Sorriso largo e genuíno, mostrando os dentes.' },
          { id: 'sorriso_timido', label: 'Sorriso Tímido', description: 'Sorriso pequeno e contido, transmitindo doçura ou vergonha.' },
          { id: 'gargalhada', label: 'Gargalhada', description: 'Rindo alto, boca aberta, expressão de extrema felicidade.' },
          { id: 'sorriso_olhos', label: 'Sorriso com os Olhos', description: 'Sorriso genuíno (Duchenne) onde os olhos se contraem levemente.' },
          { id: 'expressao_radiante', label: 'Expressão Radiante', description: 'Rosto iluminado de felicidade, transmitindo paz e alegria.' },
          { id: 'sorriso_canto', label: 'Sorriso de Canto de Boca', description: 'Sorriso assimétrico, transmitindo ironia, charme ou confiança.' },
          { id: 'rosto_aliviado', label: 'Rosto Aliviado', description: 'Expressão de quem acabou de se livrar de um peso ou tensão.' },
          { id: 'expressao_encantada', label: 'Expressão Encantada', description: 'Olhar maravilhado e sorriso leve, como quem vê algo mágico.' },
          { id: 'rosto_brincalhao', label: 'Rosto Brincalhão', description: 'Expressão travessa, divertida, às vezes com a língua de fora.' },
          { id: 'sorriso_terno', label: 'Sorriso Terno', description: 'Sorriso suave e afetuoso, cheio de compaixão e amor.' }
        ]
      },
      {
        label: 'Tristeza e Melancolia',
        options: [
          { id: 'olhar_melancolico', label: 'Olhar Melancólico', description: 'Olhar distante e triste, transmitindo saudade ou reflexão profunda.' },
          { id: 'chorando', label: 'Chorando', description: 'Lágrimas visíveis escorrendo pelo rosto, expressão de dor.' },
          { id: 'expressao_luto', label: 'Expressão de Luto', description: 'Tristeza profunda e pesada, rosto abatido.' },
          { id: 'rosto_decepcionado', label: 'Rosto Decepcionado', description: 'Olhar baixo, lábios levemente caídos, frustração contida.' },
          { id: 'olhar_vazio', label: 'Olhar Vazio', description: 'Olhar sem foco, transmitindo apatia, choque ou exaustão mental.' },
          { id: 'expressao_arrependimento', label: 'Expressão de Arrependimento', description: 'Rosto contraído, olhar culpado ou doloroso.' },
          { id: 'rosto_desolado', label: 'Rosto Desolado', description: 'Expressão de quem perdeu as esperanças, tristeza extrema.' },
          { id: 'segurando_choro', label: 'Segurando o Choro', description: 'Olhos marejados, lábios trêmulos, tentando manter a compostura.' },
          { id: 'expressao_dor', label: 'Expressão de Dor', description: 'Olhos fechados com força, rosto contraído em sofrimento físico ou emocional.' },
          { id: 'rosto_exausto', label: 'Rosto Exausto', description: 'Olheiras fundas, expressão pesada de cansaço extremo.' }
        ]
      },
      {
        label: 'Raiva e Tensão',
        options: [
          { id: 'olhar_furioso', label: 'Olhar Furioso', description: 'Olhar fixo e intenso, transmitindo raiva pura e direta.' },
          { id: 'dentes_cerrados', label: 'Dentes Cerrados', description: 'Mandíbula tensa, dentes à mostra em sinal de agressividade contida.' },
          { id: 'expressao_frustracao', label: 'Expressão de Frustração', description: 'Rosto tenso, sobrancelhas unidas, impaciência visível.' },
          { id: 'rosto_ameacador', label: 'Rosto Ameaçador', description: 'Expressão intimidadora, olhar de predador.' },
          { id: 'sobrancelhas_franzidas', label: 'Sobrancelhas Franzidas', description: 'Testa enrugada, sinal de descontentamento ou irritação.' },
          { id: 'grito_raiva', label: 'Grito de Raiva', description: 'Boca escancarada em um grito furioso, veias saltadas.' },
          { id: 'olhar_desprezo', label: 'Olhar de Desprezo', description: 'Olhar superior, lábio levemente torcido em desgosto.' },
          { id: 'expressao_vingativa', label: 'Expressão Vingativa', description: 'Sorriso frio e olhar cortante, planejando retaliação.' },
          { id: 'rosto_irritado', label: 'Rosto Irritado', description: 'Expressão de aborrecimento com algo inconveniente.' },
          { id: 'expressao_nojo', label: 'Expressão de Nojo', description: 'Nariz enrugado, lábio superior levantado, aversão forte.' }
        ]
      },
      {
        label: 'Surpresa e Medo',
        options: [
          { id: 'olhos_arregalados', label: 'Olhos Arregalados', description: 'Olhos bem abertos em sinal de choque ou surpresa extrema.' },
          { id: 'queixo_caido', label: 'Queixo Caído', description: 'Boca aberta em incredulidade ou espanto.' },
          { id: 'expressao_choque', label: 'Expressão de Choque', description: 'Rosto paralisado por uma revelação ou evento inesperado.' },
          { id: 'rosto_aterrorizado', label: 'Rosto Aterrorizado', description: 'Medo extremo, olhos arregalados e rosto pálido.' },
          { id: 'olhar_assustado', label: 'Olhar Assustado', description: 'Expressão de apreensão, como quem prevê um perigo.' },
          { id: 'expressao_panico', label: 'Expressão de Pânico', description: 'Desespero visível, perda de controle emocional.' },
          { id: 'sobrancelhas_levantadas', label: 'Sobrancelhas Levantadas', description: 'Sinal de surpresa leve, curiosidade ou questionamento.' },
          { id: 'paralisado_medo', label: 'Paralisado de Medo', description: 'Corpo e rosto tensos, incapaz de reagir ao perigo.' },
          { id: 'expressao_maravilha', label: 'Expressão de Maravilha', description: 'Surpresa positiva, encantamento com algo grandioso (Awestruck).' },
          { id: 'olhar_desconfiado', label: 'Olhar Desconfiado', description: 'Olhos semicerrados, analisando algo ou alguém com suspeita.' }
        ]
      },
      {
        label: 'Confiança e Sedução',
        options: [
          { id: 'olhar_penetrante', label: 'Olhar Penetrante', description: 'Olhar profundo e fixo que parece ler a alma do observador.' },
          { id: 'sorriso_sedutor', label: 'Sorriso Sedutor', description: 'Sorriso charmoso e convidativo, cheio de segundas intenções.' },
          { id: 'expressao_confiante', label: 'Expressão Confiante', description: 'Queixo levemente erguido, olhar seguro de si.' },
          { id: 'mordendo_labio', label: 'Mordendo o Lábio', description: 'Gesto sensual ou de antecipação, mordendo o lábio inferior.' },
          { id: 'olhar_misterioso', label: 'Olhar Misterioso', description: 'Expressão enigmática, escondendo segredos.' },
          { id: 'expressao_arrogante', label: 'Expressão Arrogante', description: 'Olhar de superioridade, desdém orgulhoso.' },
          { id: 'rosto_desafiador', label: 'Rosto Desafiador', description: 'Expressão de quem não tem medo de um confronto, provocativa.' },
          { id: 'olhar_intenso', label: 'Olhar Intenso', description: 'Foco absoluto e inabalável, transmitindo forte presença.' },
          { id: 'expressao_charmosa', label: 'Expressão Charmosa', description: 'Rosto amigável, atraente e carismático.' },
          { id: 'piscadela', label: 'Piscadela', description: 'Piscando um olho de forma cúmplice ou flertando.' }
        ]
      },
      {
        label: 'Neutras e Focadas',
        options: [
          { id: 'rosto_neutro', label: 'Rosto Neutro', description: 'Nenhuma emoção aparente, expressão completamente relaxada e vazia.' },
          { id: 'expressao_concentracao', label: 'Expressão de Concentração', description: 'Foco total em uma tarefa, testa levemente franzida.' },
          { id: 'olhar_contemplativo', label: 'Olhar Contemplativo', description: 'Perdido em pensamentos profundos, refletindo.' },
          { id: 'rosto_sereno', label: 'Rosto Sereno', description: 'Expressão de paz interior, calma e tranquilidade.' },
          { id: 'expressao_analitica', label: 'Expressão Analítica', description: 'Olhar calculista, avaliando uma situação ou pessoa.' },
          { id: 'olhar_distante', label: 'Olhar Distante', description: 'Olhando para o horizonte, sem focar em nada específico.' },
          { id: 'rosto_entediado', label: 'Rosto Entediado', description: 'Expressão de desinteresse, olhos pesados, falta de energia.' },
          { id: 'expressao_estoica', label: 'Expressão Estóica', description: 'Rosto firme, não demonstrando dor ou emoção diante de adversidades.' },
          { id: 'olhar_determinado', label: 'Olhar Determinado', description: 'Foco inabalável em um objetivo, transmitindo força de vontade.' },
          { id: 'rosto_relaxado', label: 'Rosto Relaxado', description: 'Músculos faciais soltos, transmitindo conforto e ausência de estresse.' }
        ]
      }
    ]
  },
  {
    id: 'elementos_cena',
    label: '✨ Elementos da Cena',
    subcategories: [
      {
        label: 'Clima e Tempo',
        options: [
          { id: 'chuva_forte', label: 'Chuva Forte', description: 'Gotas visíveis, roupas molhadas, reflexos no chão.' },
          { id: 'neve_caindo', label: 'Neve Caindo', description: 'Flocos brancos no ar, acúmulo de neve nos ombros e cabelos.' },
          { id: 'vento_forte', label: 'Vento Forte', description: 'Cabelos e roupas esvoaçantes em uma direção, árvores curvadas.' },
          { id: 'tempestade_areia', label: 'Tempestade de Areia', description: 'Ar alaranjado/marrom, visibilidade reduzida, poeira voando.' },
          { id: 'nevoa_densa', label: 'Névoa Densa', description: 'Fundo obscurecido por neblina branca ou cinza, clima misterioso.' },
          { id: 'garoa', label: 'Garoa Fina', description: 'Chuva leve, umidade no ar, clima melancólico.' },
          { id: 'granizo', label: 'Granizo', description: 'Pedras de gelo caindo, impacto visível.' },
          { id: 'tempestade_eletrica', label: 'Tempestade Elétrica', description: 'Raios cortando o céu escuro, iluminação dramática intermitente.' },
          { id: 'clima_ensolarado', label: 'Clima Ensolarado', description: 'Céu azul limpo, sol brilhante, clima alegre e claro.' },
          { id: 'furacao_fundo', label: 'Furacão/Tornado ao Fundo', description: 'Funil de vento gigante no horizonte, destruição iminente.' }
        ]
      },
      {
        label: 'Efeitos Visuais',
        options: [
          { id: 'faiscas_voando', label: 'Faíscas Voando', description: 'Partículas de fogo brilhantes no ar, efeito de solda ou magia.' },
          { id: 'petalas_caindo', label: 'Pétalas Caindo', description: 'Pétalas de flores (ex: cerejeira) flutuando suavemente ao vento.' },
          { id: 'fumaca_colorida', label: 'Fumaça Colorida', description: 'Nuvens de fumaça em tons vibrantes (rosa, azul, verde).' },
          { id: 'bolhas_sabao', label: 'Bolhas de Sabão', description: 'Esferas translúcidas com reflexos iridescentes flutuando.' },
          { id: 'poeira_magica', label: 'Poeira Mágica (Pixie Dust)', description: 'Pequenos pontos de luz brilhante flutuando ao redor do sujeito.' },
          { id: 'confetes', label: 'Confetes Caindo', description: 'Pedaços de papel colorido no ar, clima de festa ou celebração.' },
          { id: 'fumaca_densa', label: 'Fumaça Densa Escura', description: 'Fumaça preta ou cinza espessa, efeito de incêndio ou explosão.' },
          { id: 'brilho_neon', label: 'Brilho Neon Flutuante', description: 'Linhas ou formas geométricas de luz neon no ar.' },
          { id: 'hologramas', label: 'Hologramas Flutuantes', description: 'Telas ou projeções digitais translúcidas no ambiente.' },
          { id: 'distorcao_calor', label: 'Distorção de Calor', description: 'Ondulações no ar causadas por temperatura extrema.' }
        ]
      },
      {
        label: 'Objetos de Fundo',
        options: [
          { id: 'carros_antigos', label: 'Carros Antigos', description: 'Veículos clássicos estacionados ou passando ao fundo.' },
          { id: 'naves_espaciais', label: 'Naves Espaciais', description: 'Veículos futuristas voando no céu ou pousados.' },
          { id: 'ruinas_concreto', label: 'Ruínas de Concreto', description: 'Pedaços de prédios destruídos, vergalhões expostos.' },
          { id: 'moveis_luxuosos', label: 'Móveis Luxuosos', description: 'Sofás de veludo, lustres de cristal, decoração rica.' },
          { id: 'telas_computador', label: 'Telas de Computador', description: 'Múltiplos monitores exibindo códigos ou gráficos.' },
          { id: 'estatuas_quebradas', label: 'Estátuas Quebradas', description: 'Esculturas clássicas em ruínas, cobertas de musgo.' },
          { id: 'livros_empilhados', label: 'Livros Empilhados', description: 'Pilhas de livros antigos, ambiente de biblioteca ou estudo.' },
          { id: 'garrafas_vidro', label: 'Garrafas de Vidro', description: 'Garrafas coloridas refletindo luz em um bar ou mesa.' },
          { id: 'engrenagens', label: 'Engrenagens Gigantes', description: 'Mecanismos industriais ou steampunk ao fundo.' },
          { id: 'placas_neon', label: 'Placas de Neon', description: 'Letreiros luminosos com textos ou símbolos em ruas noturnas.' }
        ]
      },
      {
        label: 'Elementos Naturais',
        options: [
          { id: 'folhas_secas', label: 'Folhas Secas Voando', description: 'Folhas de outono sendo levadas pelo vento.' },
          { id: 'agua_espirrando', label: 'Água Espirrando (Splash)', description: 'Gotas de água congeladas no ar após um impacto.' },
          { id: 'chamas_fogo', label: 'Chamas / Fogo', description: 'Fogo real queimando ao redor ou no fundo da cena.' },
          { id: 'relampagos', label: 'Relâmpagos', description: 'Arcos de eletricidade visíveis na cena.' },
          { id: 'cristais_brilhantes', label: 'Cristais Brilhantes', description: 'Formações minerais emitindo luz própria.' },
          { id: 'pedras_flutuantes', label: 'Pedras Flutuantes', description: 'Rochas suspensas no ar por magia ou anti-gravidade.' },
          { id: 'raizes_retorcidas', label: 'Raízes Retorcidas', description: 'Raízes de árvores gigantes dominando o cenário.' },
          { id: 'flores_desabrochando', label: 'Flores Desabrochando', description: 'Vegetação viva e colorida em primeiro plano ou fundo.' },
          { id: 'gelo_rachado', label: 'Gelo Rachado', description: 'Superfície congelada com fissuras visíveis.' },
          { id: 'lava_escorrendo', label: 'Lava Escorrendo', description: 'Rocha derretida brilhante e quente fluindo.' }
        ]
      },
      {
        label: 'Multidão e Extras',
        options: [
          { id: 'multidao_borrada', label: 'Multidão Borrada', description: 'Pessoas em movimento desfocadas ao fundo (motion blur).' },
          { id: 'pessoas_caminhando', label: 'Pessoas Caminhando', description: 'Transeuntes normais compondo o cenário urbano.' },
          { id: 'animais_fundo', label: 'Animais ao Fundo', description: 'Cachorros, gatos ou animais selvagens na cena.' },
          { id: 'passaros_voando', label: 'Pássaros Voando', description: 'Bando de pássaros cruzando o céu.' },
          { id: 'silhuetas_escuras', label: 'Silhuetas Escuras', description: 'Figuras humanas sem detalhes, apenas contornos escuros.' },
          { id: 'exercito_fundo', label: 'Exército ao Fundo', description: 'Muitos soldados em formação distante.' },
          { id: 'transito_veiculos', label: 'Trânsito de Veículos', description: 'Carros em movimento, faróis borrados.' },
          { id: 'sombras_alongadas', label: 'Sombras Alongadas', description: 'Sombras de pessoas ou objetos projetadas no chão.' },
          { id: 'espectadores', label: 'Espectadores', description: 'Pessoas assistindo ou olhando para o sujeito principal.' },
          { id: 'criaturas_magicas', label: 'Criaturas Mágicas', description: 'Fadas, dragões distantes ou monstros compondo o fundo.' }
        ]
      }
    ]
  }
];
