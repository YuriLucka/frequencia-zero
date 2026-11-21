// PROTOTYPE - NOT FOR PRODUCTION
// Question: Ao chegar no Continua…, o jogador pensa quero jogar o resto?
// Date: 2026-11-21
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html); the tweak panel, an add-on, writes them back here.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address)
  volume: { value: 0.6, min: 0, max: 1, step: 0.05 },

  // --- Rádio (design 5.7) ---
  tune_tolerance: { value: 0.3, min: 0.1, max: 0.8, step: 0.05 },   // MHz: margem para "sintonizado"
  tune_pull_radius: { value: 0.6, min: 0, max: 1.5, step: 0.05 },   // MHz: raio do "puxão" para a estação
  tune_pull_rate: { value: 3, min: 0, max: 10, step: 0.5 },         // por segundo, quando o dial está solto
  dial_sweep: { value: 1.1, min: 0.4, max: 3, step: 0.1 },          // larguras de tela para varrer a escala inteira
  station_bulletin: { value: 92.5, min: 88, max: 107, step: 0.1 },  // MHz
  station_music: { value: 101.1, min: 88, max: 107, step: 0.1 },    // MHz
  zero_mark: { value: 86.4, min: 85.5, max: 87.2, step: 0.1 },      // posição do "0" abaixo do 87.5
  zero_drift: { value: 0.06, min: 0, max: 0.5, step: 0.01 },        // MHz/s: o ponteiro desliza sozinho no passo 6
  zero_hold: { value: 0.8, min: 0, max: 3, step: 0.1 },             // s parado no "0" antes de Clara falar
  start_freq: { value: 96.3, min: 87.5, max: 108, step: 0.1 },      // MHz

  // --- Ritmo (design 5.4 e 5.7) ---
  hint_after: { value: 40, min: 10, max: 120, step: 5 },            // s sem avançar até o pensamento-dica
  hint_repeat: { value: 60, min: 20, max: 180, step: 5 },           // s até repetir a dica
  cam_view_time: { value: 1.2, min: 0.3, max: 4, step: 0.1 },       // s olhando um canal para contar como verificado
  power_cut_delay: { value: 5, min: 1, max: 20, step: 0.5 },        // s depois do registro até a luz cair
  breaker_return: { value: 1.6, min: 0.5, max: 4, step: 0.1 },      // s olhando o quadro depois do disjuntor
  signal_delay: { value: 4, min: 1, max: 15, step: 0.5 },           // s de volta à mesa até o chiado no "0"
  clara_gap: { value: 1.8, min: 0.5, max: 5, step: 0.1 },           // s entre falas de Clara
  arthur_line_time: { value: 2.6, min: 1, max: 6, step: 0.1 },      // s da fala de Arthur na tela
  silence_before_alarm: { value: 3, min: 0.5, max: 8, step: 0.5 },  // s de silêncio antes do alarme
  figure_time: { value: 2.2, min: 1, max: 5, step: 0.1 },           // s da figura olhando a lente
  silence_before_whisper: { value: 5, min: 1, max: 12, step: 0.5 }, // s de silêncio antes do "...Arthur?"
  end_hold: { value: 3, min: 1, max: 8, step: 0.5 },                // s depois do sussurro até o preto
  type_cps: { value: 18, min: 6, max: 60, step: 1 },                // letras por segundo nas falas
  whisper_cps: { value: 5, min: 2, max: 20, step: 1 },              // letras por segundo no sussurro
  cut_pause: { value: 0.7, min: 0.1, max: 2, step: 0.1 },           // s de corte com chiado em cada "|"
  thought_time: { value: 4.5, min: 2, max: 10, step: 0.5 },         // s do pensamento de Arthur na tela
  clock_rate: { value: 0.1, min: 0.02, max: 1, step: 0.01 },        // minutos do mundo por segundo real

  // --- Clima ---
  lightning_min: { value: 9, min: 3, max: 40, step: 1 },            // s entre relâmpagos (mínimo)
  lightning_max: { value: 22, min: 5, max: 60, step: 1 },           // s entre relâmpagos (máximo)
  flicker_chance: { value: 0.012, min: 0, max: 0.1, step: 0.002 },  // chance por passo de a fluorescente falhar
  rain_level: { value: 0.32, min: 0, max: 1, step: 0.02 },          // volume base da chuva

  // --- Visual (design 5.1) ---
  render_long: { value: 320, min: 160, max: 640, step: 16 },        // px do lado maior da cena (PS1)
  color_levels: { value: 9, min: 3, max: 32, step: 1 },             // níveis por canal no dithering
  exposure: { value: 1.5, min: 0.5, max: 3, step: 0.05 },
  fog_room: { value: 0.22, min: 0, max: 0.6, step: 0.01 },
  fog_corridor: { value: 0.14, min: 0, max: 0.6, step: 0.01 },
  flashlight_power: { value: 34, min: 5, max: 120, step: 1 },
  flashlight_angle: { value: 0.33, min: 0.15, max: 0.8, step: 0.01 }, // rad: cone estreito
  look_speed: { value: 0.006, min: 0.002, max: 0.02, step: 0.001 },   // rad por px arrastado
  key_turn: { value: 1.4, min: 0.3, max: 4, step: 0.1 },              // rad/s com as setas
  zoom_time: { value: 0.5, min: 0.1, max: 1.5, step: 0.05 },          // s do zoom em equipamento
};
