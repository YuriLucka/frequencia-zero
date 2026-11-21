// PROTOTYPE - NOT FOR PRODUCTION
// Question: Ao chegar no Continua…, o jogador pensa quero jogar o resto?
// Date: 2026-11-21
// Todas as falas e textos do prólogo, num só lugar, para revisão (design 5.6).
// Regras: ninguém nomeia irmã, ponte, acidente ou morte; nenhuma fala de Arthur pelo rádio
// contém o nome dele; Clara tem no máximo 8 falas; Arthur tem no máximo 6 pensamentos.
// "|" marca um corte com chiado. Voz gravada: audio/clara/<id>.mp3 (ou .ogg) toca no lugar
// da respiração procedural e a legenda continua.
window.FALAS = {
  titulo: 'FREQUÊNCIA ZERO',
  comecar: 'Toque para começar',
  continuar_jogo: 'Continuar',
  novo_jogo: 'Novo plantão',
  controles: ['Arraste para olhar em volta', 'Toque num objeto para usar', 'Use fone de ouvido'],
  pausado: 'Pausado',
  continuar: 'Toque para continuar',
  continua: 'Continua…',
  recomecar: 'Recomeçar',

  terminal: ['ESTACAO DE RADIO KR-7', 'TURNO 23:00 - 07:00', 'OPERADOR: ARTHUR'],
  terminal_bateria: ['ENERGIA: NOBREAK', 'AUTONOMIA 00:38'],
  terminal_rede: ['ENERGIA: REDE', 'CHUVA  ALERTA NIV.2'],

  prancheta_titulo: 'PLANTÃO 23:00–07:00',
  prancheta_estacao: 'ESTAÇÃO KR-7',
  checklist: ['verificar câmeras 1–4', 'testar rádio', 'registrar no livro'],

  cameras: ['CAM 01 ANTENA', 'CAM 02 PORTÃO', 'CAM 03 TRILHA', 'CAM 04 ESTR. DA REPRESA'],
  sinal_fraco: 'SINAL FRACO',
  placa_represa: 'REPRESA',

  livro_antigas: ['23:00 — início do turno', '23:31 — gerador ok'],
  livro_opcoes: ['00:20 — tudo normal', '00:20 — chuva forte, sem ocorrências'],
  livro_vazio: '00:20 —',

  cracha_cargo: 'SOCORRISTA',
  cracha_nome: 'ARTHUR',
  cracha_numero: 'Nº 0417',

  boletim: '...Defesa Civil informa: | chuva forte em toda a região até o amanhecer. | ...alerta de cheia na represa... | evitem a estrada da represa. | Repetindo...',

  // Gravações de Clara presentes em audio/clara/: liste os ids (ex.: ['clara_01', 'clara_05'])
  // ou use 'todas'. Só os ids listados são procurados, para que arquivos ausentes não
  // gerem erros de rede no console. Vazio: tudo em texto.
  gravacoes: [],

  // Clara (clara_01 … clara_06; o limite é 8). A mesma resposta para qualquer escolha.
  clara: [
    { id: 'clara_01', texto: 'Alguém me ouve? | ...Tá escuro... | a água tá subindo... | eu não consigo soltar...' },
    { id: 'clara_02', texto: '...tem alguém aí? | Eu ouvi... | eu ouvi uma voz...' },
    { id: 'clara_03', texto: '...eu não sei. | Tá tudo escuro. | Só a chuva, | muito forte...' },
    { id: 'clara_04', texto: '...tá frio. | Não desliga, | por favor... | não desliga.' },
    { id: 'clara_05', texto: 'Meu nome é Clara.' },
    { id: 'clara_06', texto: '...Arthur?' },
  ],

  // Respostas de Arthur pelo botão Falar (nunca com o nome dele).
  respostas: ['Aqui é a estação KR-7. Onde você está?', 'Calma. Me diga o que você está vendo.'],

  // Os 6 pensamentos de Arthur (só aparecem como dica, depois de 40 s parado).
  pensamentos: {
    cameras: 'Primeiro as câmeras. Uma por uma.',
    radio: 'O boletim costuma ficar perto dos 92.',
    caneta: 'A caneta deve estar na gaveta.',
    energia: 'A lanterna fica na mesa. O quadro de luz, no corredor.',
    zero: 'O ponteiro está indo sozinho para o fim da escala.',
    alarme: 'Movimento na câmera três.',
  },
};
