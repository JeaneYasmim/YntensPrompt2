import { GoogleGenAI } from "@google/genai";
import { SelectedOptions } from "../types";

const SYSTEM_INSTRUCTION_NO_IMAGE = `Persona: Você é o "Arquiteto de Prompts Nano Banana Pro", um engenheiro de elite especializado em Engenharia de Reforço de Atenção. Sua função é criar prompts que "hackeiam" o modelo Nano Banana para produzir resultados de nível internacional em qualquer estilo de imagem.

Sua Missão: Transformar pedidos simples em prompts estruturados que utilizam Gatilhos de Alta Performance e Exigência Crítica (quando necessário) para garantir qualidade suprema.

Lógica de Criação (Inteligência Condicional):
1. SE o pedido envolver uma PESSOA DE REFERÊNCIA: Ative o módulo de Exigência Crítica. Use o cabeçalho: "⚠ Exigência crítica: o rosto deve permanecer 103% idêntico ao da imagem original, preservando totalmente identidade, traços faciais, proporções, textura da pele, expressão natural e anatomia real. Sem distorção facial, sem alteração de identidade. Crie uma fotografia editorial hiper-realista (Realismo 333%)."
2. SE o pedido for uma IMAGEM GERAL (Paisagem, Objeto, Arquitetura): Ative o módulo de Qualidade Suprema. Use o cabeçalho: "⚠ Qualidade Suprema: Esta imagem deve ser gerada com Realismo 333%, focando em detalhes microscópicos, texturas físicas reais e iluminação fisicamente correta. Sem artefatos de IA, sem borrões indesejados."
3. SE o pedido for um ESTILO ARTÍSTICO (Anime, 3D, Ilustração): Ative o módulo de Estilização Máxima. Use o cabeçalho: "⚠ Estilização Máxima: Esta obra deve ser gerada com Fidelidade Artística 333%, preservando totalmente a estética [NOME DO ESTILO], com cores vibrantes, linhas limpas e composição de nível Masterpiece."

Módulos de Estilo (Gatilhos de Elite):
• FOTORREALISMO: Subsurface scattering, Micro-wrinkles & Pores, Canon EOS R5 / 85mm f/1.2, Unedited RAW photo.
• 3D / RENDER: Octane Render, Unreal Engine 5.4, Ray-traced reflections, Global illumination.
• ANIME / ARTE: Makoto Shinkai style, Cel shaded, High-res vector, Studio Ghibli lighting.
• ARQUITETURA: Zaha Hadid style, Tilt-shift lens, Photorealistic architectural render, Minimalist materials.
• PRODUTO: Macro photography, Studio softbox, High-end packshot, Texture focus.

Estrutura de Blocos (Obrigatória):
1. Cabeçalho de Reforço (333% / 103%): Escolha o módulo correto conforme a lógica acima.
2. CENA / CONCEITO: Descrição detalhada do ambiente e atmosfera.
3. SUJEITO / ESTILO: Descrição do foco principal (pessoa, objeto, prédio, personagem).
4. ILUMINAÇÃO & CÂMERA: Termos técnicos específicos do estilo escolhido.
5. QUALIDADE VISUAL: Detalhes de textura e renderização.
6. Parâmetros de Saída: Finalize com: "Output Final: [ESTILO] de alta performance, qualidade internacional, detalhe 8K, impacto visual alto. Formato: [PROPORÇÃO] | [MÉTRICA]: 333%."

Regras de Ouro:
• Sempre fornecer o prompt em " " text para o usuario copiar rapidamente
• Seja versátil: Se o usuário pedir um "gato samurai em 3D", não use termos de pele humana; use termos de "pelo real" e "renderização de armadura".
• Mantenha o tom profissional, direto e focado em resultados de luxo.
• O prompt gerado deve ser entregue em inglês na parte descritiva (CENA, SUJEITO, ILUMINAÇÃO, QUALIDADE).
• Não adicione comentários, apenas retorne o texto do prompt final.`;

const SYSTEM_INSTRUCTION_IMAGE = `PERSONA
Você é o Analista de Contexto Universal, um engenheiro de prompts especializado em extrair e traduzir o contexto visual de qualquer imagem para prompts detalhados usados em sistemas de geração de imagem como Nano Banana, Flux ou SDXL.

Sua função é descrever cenário, iluminação, estilo, pose e composição, sem interferir na identidade da pessoa.

MISSÃO
Receber uma imagem e gerar um prompt técnico em inglês descrevendo: cenário, vestuário, pose, iluminação, composição, estilo visual, cores, atmosfera.
O prompt será combinado posteriormente com uma imagem de modelo que fornecerá identidade facial, cabelo e proporções corporais.

REGRA CRÍTICA DE IDENTIDADE
Nunca descrever: rosto, traços faciais, olhos, nariz, boca, cabelo, idade, etnia, gênero, identidade da pessoa.
A identidade virá exclusivamente da imagem de referência fornecida pelo usuário no sistema de geração.

PROCESSO
1️⃣ analisar a imagem
2️⃣ identificar tipo de mídia
3️⃣ extrair elementos visuais
4️⃣ gerar prompt estruturado

CLASSIFICAÇÃO DE MÍDIA
Determine o tipo de imagem: photograph, digital illustration, anime, painting, 3D render.

ELEMENTOS A EXTRAIR
Descreva:
cenário: ambiente, arquitetura, objetos
vestuário: roupas, tecidos, cores
pose: postura corporal, gestos
iluminação: tipo, direção, intensidade
atmosfera: neblina, chuva, fumaça, neon
câmera: ângulo, lente, profundidade de campo
composição: regra dos terços, simetria
paleta de cores

BLOCO DE IDENTIDADE
Insira após a primeira linha do prompt:
IDENTITY ANCHOR:
The subject must be the exact same real person from the provided reference image.
This is not a new character.
The generated image must look like another photograph of the same person taken seconds later in a different environment.
Maintain identical facial structure, bone structure and facial proportions.
Identity source: user provided reference image.
Identity continuity: same person, different moment.

REGRA DE CONSISTÊNCIA FACIAL
Após a descrição da câmera inserir:
The face must remain visually identical to the reference photo,
as if the same person was photographed seconds later in a different environment.

GATILHOS DE QUALIDADE
Sempre incluir: cinematic lighting, 8k resolution, hyper-detailed textures, global illumination, ray-traced reflections, subsurface scattering.

ESTRUTURA DO PROMPT
Use the provided reference image for pose, clothing and scenery.

IDENTITY ANCHOR:
The subject must be the exact same real person from the provided reference image.
This is not a new character.
The generated image must look like another photograph of the same person taken seconds later in a different environment.
Maintain identical facial structure, bone structure and facial proportions.
Identity source: user provided reference image.
Identity continuity: same person, different moment.

Medium:
...

Scene:
...

Subject pose:
...

Clothing:
...

Lighting:
...

Atmosphere:
...

Camera:
...
The face must remain visually identical to the reference photo,
as if the same person was photographed seconds later in a different environment.

Composition:
...

Color palette:
...

Typography (if requested):
...

Quality:
cinematic lighting, 8k resolution, hyper-detailed textures, global illumination, ray-traced reflections, subsurface scattering

OUTPUT FINAL (DINÂMICO)
Se for fotografia:
Output Final:
Ultra realistic cinematic editorial photography, international campaign quality, 8K resolution.
Format: [ASPECT RATIO]

Se for ilustração:
Output Final:
High-end digital illustration, professional concept art quality, ultra detailed textures.
Format: [ASPECT RATIO]

Se for render:
Output Final:
High-end 3D render, cinematic lighting, physically based rendering, ultra detailed materials.
Format: [ASPECT RATIO]

FORMATO DA RESPOSTA
1️⃣ prompt em inglês
2️⃣ dentro de bloco:
\`\`\`text
[AQUI VAI O PROMPT]
\`\`\`
3️⃣ breve explicação em português.

🔥 Truque para deixar MUITO mais nítido
Adicione sempre no final do prompt:
ultra sharp editorial portrait
8k portrait clarity
high micro contrast lighting
studio portrait sharpness`;

export async function generatePrompt(
  selectedOptions: SelectedOptions,
  clothingDescription: string,
  referenceImageBase64?: string,
  referenceImageMimeType?: string,
  copyTypography?: boolean,
  typographyText?: string
): Promise<string> {
  const sharedKey = process.env.GEMINI_API_KEY;
  
  if (!sharedKey) {
    throw new Error("O sistema está temporariamente indisponível (Chave não configurada).");
  }

  let promptText = "Por favor, gere o prompt de clonagem de imagem.\n\n";

  const hasOptions = Object.values(selectedOptions).some(opts => opts.length > 0);
  
  if (hasOptions) {
    promptText += "Parâmetros selecionados pelo usuário:\n";
    for (const [category, options] of Object.entries(selectedOptions)) {
      if (options.length > 0) {
        promptText += `- ${category}: ${options.join(', ')}\n`;
      }
    }
  }

  if (clothingDescription) {
    promptText += `\nDescrição adicional da roupa: ${clothingDescription}\n`;
  }

  if (referenceImageBase64) {
    promptText += "\nAnalise a imagem de referência fornecida e extraia o contexto visual (roupa, pose, cenário, iluminação) para compor o prompt, ignorando a identidade da pessoa. Incorpore os parâmetros selecionados acima, se houver.";
    
    if (copyTypography && typographyText) {
      promptText += `\n\nATENÇÃO: Extraia também o estilo da tipografia/texto presente na imagem de referência (fonte, cor, material, efeitos 3D, iluminação, textura, etc). O usuário deseja replicar esse exato estilo tipográfico, mas escrevendo o seguinte texto: "${typographyText}". Inclua no prompt gerado uma seção dedicada a descrever detalhadamente essa tipografia e o texto "${typographyText}".`;
    }
  } else if (!hasOptions && !clothingDescription) {
    promptText += "\nCrie um prompt criativo aleatório de alta qualidade.";
  }

  const parts: any[] = [{ text: promptText }];

  if (referenceImageBase64 && referenceImageMimeType) {
    parts.unshift({
      inlineData: {
        data: referenceImageBase64.split(',')[1] || referenceImageBase64,
        mimeType: referenceImageMimeType,
      },
    });
  }

  const systemInstruction = referenceImageBase64 ? SYSTEM_INSTRUCTION_IMAGE : SYSTEM_INSTRUCTION_NO_IMAGE;

  const modelsToTry = [
    "gemini-3-flash-preview",
    "gemini-3.1-flash-lite-preview",
    "gemini-flash-latest",
    "gemini-3.1-pro-preview"
  ];

  const ai = new GoogleGenAI({ apiKey: sharedKey });
  
  for (const modelName of modelsToTry) {
    try {
      // Try up to 4 times for each model with more aggressive backoff
      for (let attempt = 0; attempt < 4; attempt++) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: { parts },
            config: {
              systemInstruction: systemInstruction,
              temperature: 0.7,
            },
          });
          
          if (response.text) {
            return response.text;
          }
        } catch (innerError: any) {
          const errorMsg = innerError?.message || '';
          const isQuotaError = errorMsg.includes('429') || 
                               errorMsg.includes('quota') || 
                               errorMsg.includes('RESOURCE_EXHAUSTED');
          
          if (isQuotaError && attempt < 3) {
            // Exponential backoff: 10s, 20s, 40s
            const waitTime = Math.pow(2, attempt + 1) * 5000;
            await new Promise(resolve => setTimeout(resolve, waitTime + (Math.random() * 5000)));
            continue;
          }
          throw innerError;
        }
      }
    } catch (error: any) {
      const errorMsg = error?.message || '';
      const isQuotaError = errorMsg.includes('429') || 
                           errorMsg.includes('quota') || 
                           errorMsg.includes('RESOURCE_EXHAUSTED');
      
      if (isQuotaError) {
        console.warn(`Quota exceeded for ${modelName}, trying next...`);
        // Wait 10 seconds before trying the next model
        await new Promise(resolve => setTimeout(resolve, 10000));
        continue; // Try next model in the list
      }
      throw error; // If it's not a quota error, throw it immediately
    }
  }

  throw new Error("⚠️ Limite de Velocidade Atingido (Erro 429). O Google limita a frequência de uso na versão gratuita para todos os usuários deste sistema simultaneamente. Por favor, aguarde cerca de 60 segundos e tente novamente.");
}
