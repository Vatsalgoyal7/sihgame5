/* ============================================================
   Bhinno Ke? (Which Is Different?) — Game 5, SmritiSetu
   Selective Attention / Distractor Discrimination Task
   Vanilla JavaScript (No TypeScript)
   Strictly adheres to SmritiSetu UI/UX doc & Friend Game design:
   - No timers, no scores, no failure buzzers / red-X
   - Gentle, warm positive reinforcement
   - Persistent Avatar (gentle during play, happy on complete)
   - ElevenLabs "Zara" voice cues with audio fallback
   - Silent caregiver telemetry
   ============================================================ */

const IMG_DIR = 'Assets/';
const AUD_DIR = 'Assets/Audios/';

/* ---------- Voice Cues (ElevenLabs Zara voice) ---------- */
const CUES = {
  intro:         { as: 'g5_intro_welcome.mp3',   en: 'g5_intro_welcome_en.mp3' },
  roundPrompt:   { as: 'g5_round_prompt.mp3',    en: 'g5_round_prompt_en.mp3' },
  correct:       { as: 'g5_correct.mp3',         en: 'g5_correct_en.mp3' },
  retryGentle:   { as: 'g5_retry_gentle.mp3',    en: 'g5_retry_gentle_en.mp3' },
  levelComplete: { as: 'g5_level_complete.mp3',  en: 'g5_level_complete_en.mp3' },
  helpPrompt:    { as: 'g5_help_prompt.mp3',     en: 'g5_help_prompt_en.mp3' },
};

/* Avatar assets */
const AVATAR = {
  gentle: { img: 'avatar_gentle.png', as: 'অৱতাৰ' },
  happy:  { img: 'avatar_happy.png',  as: 'অৱতাৰ' }
};

/* ---------- Selective Attention Rounds Data ---------- */
const ROUNDS_DATA = [
  /* Round 1: Gamosa (Border Color Discrimination) */
  {
    categoryAs: 'গামোচা',
    categoryEn: 'Gamosa',
    items: [
      {
        id: 'gamosa_red_1',
        as: 'ৰঙা গামোচা',
        en: 'Red Gamosa',
        isDifferent: false,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="18" y="16" width="64" height="68" rx="6" fill="#FFFDF8" stroke="#D8C79E" stroke-width="2.5"/>
          <!-- Red Woven Border -->
          <rect x="22" y="22" width="56" height="14" fill="#C1522F"/>
          <path d="M25 29L32 24L39 29L46 24L53 29L60 24L67 29L74 24" stroke="#FFF" stroke-width="2"/>
          <rect x="22" y="64" width="56" height="14" fill="#C1522F"/>
          <path d="M25 71L32 66L39 71L46 66L53 71L60 66L67 71L74 66" stroke="#FFF" stroke-width="2"/>
          <!-- Traditional Floral motif -->
          <circle cx="50" cy="50" r="5" fill="#C1522F"/>
          <circle cx="43" cy="50" r="3.5" fill="#C1522F"/>
          <circle cx="57" cy="50" r="3.5" fill="#C1522F"/>
          <circle cx="50" cy="43" r="3.5" fill="#C1522F"/>
          <circle cx="50" cy="57" r="3.5" fill="#C1522F"/>
        </svg>`
      },
      {
        id: 'gamosa_green',
        as: 'সেউজীয়া গামোচা',
        en: 'Green Gamosa',
        isDifferent: true, /* THE ODD ONE OUT */
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="18" y="16" width="64" height="68" rx="6" fill="#FFFDF8" stroke="#D8C79E" stroke-width="2.5"/>
          <!-- Green Woven Border (DIFFERENT COLOR) -->
          <rect x="22" y="22" width="56" height="14" fill="#5E7A57"/>
          <path d="M25 29L32 24L39 29L46 24L53 29L60 24L67 29L74 24" stroke="#FFF" stroke-width="2"/>
          <rect x="22" y="64" width="56" height="14" fill="#5E7A57"/>
          <path d="M25 71L32 66L39 71L46 66L53 71L60 66L67 71L74 66" stroke="#FFF" stroke-width="2"/>
          <!-- Green motif -->
          <circle cx="50" cy="50" r="5" fill="#5E7A57"/>
          <circle cx="43" cy="50" r="3.5" fill="#5E7A57"/>
          <circle cx="57" cy="50" r="3.5" fill="#5E7A57"/>
          <circle cx="50" cy="43" r="3.5" fill="#5E7A57"/>
          <circle cx="50" cy="57" r="3.5" fill="#5E7A57"/>
        </svg>`
      },
      {
        id: 'gamosa_red_2',
        as: 'ৰঙা গামোচা',
        en: 'Red Gamosa',
        isDifferent: false,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="18" y="16" width="64" height="68" rx="6" fill="#FFFDF8" stroke="#D8C79E" stroke-width="2.5"/>
          <rect x="22" y="22" width="56" height="14" fill="#C1522F"/>
          <path d="M25 29L32 24L39 29L46 24L53 29L60 24L67 29L74 24" stroke="#FFF" stroke-width="2"/>
          <rect x="22" y="64" width="56" height="14" fill="#C1522F"/>
          <path d="M25 71L32 66L39 71L46 66L53 71L60 66L67 71L74 66" stroke="#FFF" stroke-width="2"/>
          <circle cx="50" cy="50" r="5" fill="#C1522F"/>
          <circle cx="43" cy="50" r="3.5" fill="#C1522F"/>
          <circle cx="57" cy="50" r="3.5" fill="#C1522F"/>
          <circle cx="50" cy="43" r="3.5" fill="#C1522F"/>
          <circle cx="50" cy="57" r="3.5" fill="#C1522F"/>
        </svg>`
      },
      {
        id: 'gamosa_red_3',
        as: 'ৰঙা গামোচা',
        en: 'Red Gamosa',
        isDifferent: false,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="18" y="16" width="64" height="68" rx="6" fill="#FFFDF8" stroke="#D8C79E" stroke-width="2.5"/>
          <rect x="22" y="22" width="56" height="14" fill="#C1522F"/>
          <path d="M25 29L32 24L39 29L46 24L53 29L60 24L67 29L74 24" stroke="#FFF" stroke-width="2"/>
          <rect x="22" y="64" width="56" height="14" fill="#C1522F"/>
          <path d="M25 71L32 66L39 71L46 66L53 71L60 66L67 71L74 66" stroke="#FFF" stroke-width="2"/>
          <circle cx="50" cy="50" r="5" fill="#C1522F"/>
          <circle cx="43" cy="50" r="3.5" fill="#C1522F"/>
          <circle cx="57" cy="50" r="3.5" fill="#C1522F"/>
          <circle cx="50" cy="43" r="3.5" fill="#C1522F"/>
          <circle cx="50" cy="57" r="3.5" fill="#C1522F"/>
        </svg>`
      }
    ]
  },

  /* Round 2: Jaapi (Traditional Conical Hat vs Decorated Jaapi) */
  {
    categoryAs: 'জাপি',
    categoryEn: 'Jaapi',
    items: [
      {
        id: 'jaapi_trad_1',
        as: 'পৰম্পৰাগত জাপি',
        en: 'Traditional Jaapi',
        isDifferent: false,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="44" fill="#EFE4C6" stroke="#7A5835" stroke-width="2.5"/>
          <!-- Conical peak -->
          <circle cx="50" cy="50" r="16" fill="#C1522F"/>
          <!-- Traditional Red triangles felt border -->
          <circle cx="50" cy="50" r="32" stroke="#3A2A1D" stroke-width="2" stroke-dasharray="6 4"/>
          <path d="M50 10L54 26H46L50 10Z" fill="#C1522F"/>
          <path d="M90 50L74 54V46L90 50Z" fill="#C1522F"/>
          <path d="M50 90L46 74H54L50 90Z" fill="#C1522F"/>
          <path d="M10 50L26 46V54L10 50Z" fill="#C1522F"/>
        </svg>`
      },
      {
        id: 'jaapi_trad_2',
        as: 'পৰম্পৰাগত জাপি',
        en: 'Traditional Jaapi',
        isDifferent: false,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="44" fill="#EFE4C6" stroke="#7A5835" stroke-width="2.5"/>
          <circle cx="50" cy="50" r="16" fill="#C1522F"/>
          <circle cx="50" cy="50" r="32" stroke="#3A2A1D" stroke-width="2" stroke-dasharray="6 4"/>
          <path d="M50 10L54 26H46L50 10Z" fill="#C1522F"/>
          <path d="M90 50L74 54V46L90 50Z" fill="#C1522F"/>
          <path d="M50 90L46 74H54L50 90Z" fill="#C1522F"/>
          <path d="M10 50L26 46V54L10 50Z" fill="#C1522F"/>
        </svg>`
      },
      {
        id: 'jaapi_trad_3',
        as: 'পৰম্পৰাগত জাপি',
        en: 'Traditional Jaapi',
        isDifferent: false,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="44" fill="#EFE4C6" stroke="#7A5835" stroke-width="2.5"/>
          <circle cx="50" cy="50" r="16" fill="#C1522F"/>
          <circle cx="50" cy="50" r="32" stroke="#3A2A1D" stroke-width="2" stroke-dasharray="6 4"/>
          <path d="M50 10L54 26H46L50 10Z" fill="#C1522F"/>
          <path d="M90 50L74 54V46L90 50Z" fill="#C1522F"/>
          <path d="M50 90L46 74H54L50 90Z" fill="#C1522F"/>
          <path d="M10 50L26 46V54L10 50Z" fill="#C1522F"/>
        </svg>`
      },
      {
        id: 'jaapi_floral',
        as: 'ফুল বচা জাপি',
        en: 'Decorated Jaapi',
        isDifferent: true, /* THE ODD ONE OUT */
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="44" fill="#F4E8D0" stroke="#7A5835" stroke-width="2.5"/>
          <!-- Golden Center -->
          <circle cx="50" cy="50" r="16" fill="#D9A441"/>
          <!-- Green leaf garland surrounding (DIFFERENT PATTERN) -->
          <circle cx="50" cy="50" r="32" stroke="#5E7A57" stroke-width="4" stroke-linecap="round" stroke-dasharray="8 6"/>
          <circle cx="50" cy="20" r="6" fill="#D9A441"/>
          <circle cx="80" cy="50" r="6" fill="#D9A441"/>
          <circle cx="50" cy="80" r="6" fill="#D9A441"/>
          <circle cx="20" cy="50" r="6" fill="#D9A441"/>
        </svg>`
      }
    ]
  },

  /* Round 3: Utensils (Brass Bowl vs Earthen Clay Pot) */
  {
    categoryAs: 'বাটি আৰু পাত্ৰ',
    categoryEn: 'Utensils',
    items: [
      {
        id: 'kahor_bati_1',
        as: 'কাঁহৰ বাটি',
        en: 'Brass Bowl',
        isDifferent: false,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Golden Bell Metal Bowl -->
          <ellipse cx="50" cy="68" rx="24" ry="7" fill="#B28020"/>
          <path d="M18 42C18 68 82 68 82 42" fill="#D9A441" stroke="#9F6E1D" stroke-width="3"/>
          <ellipse cx="50" cy="42" rx="32" ry="12" fill="#F3D58C" stroke="#9F6E1D" stroke-width="3"/>
          <!-- Subtle brass shine -->
          <path d="M30 44C40 50 60 50 70 44" stroke="#FFF" stroke-width="2" stroke-linecap="round"/>
        </svg>`
      },
      {
        id: 'matir_koli',
        as: 'মাটিৰ পাত্ৰ',
        en: 'Clay Pot',
        isDifferent: true, /* THE ODD ONE OUT */
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Earthen Clay Pot (DIFFERENT MATERIAL & SHAPE) -->
          <ellipse cx="50" cy="74" rx="20" ry="6" fill="#72321B"/>
          <path d="M22 48C18 72 82 72 78 48C74 38 64 36 64 30H36C36 36 26 38 22 48Z" fill="#C1522F" stroke="#72321B" stroke-width="3"/>
          <ellipse cx="50" cy="30" rx="16" ry="6" fill="#E89B84" stroke="#72321B" stroke-width="2.5"/>
          <!-- Tribal neck band -->
          <path d="M32 40H68" stroke="#FFF8EE" stroke-width="2.5" stroke-dasharray="4 3"/>
        </svg>`
      },
      {
        id: 'kahor_bati_2',
        as: 'কাঁহৰ বাটি',
        en: 'Brass Bowl',
        isDifferent: false,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="68" rx="24" ry="7" fill="#B28020"/>
          <path d="M18 42C18 68 82 68 82 42" fill="#D9A441" stroke="#9F6E1D" stroke-width="3"/>
          <ellipse cx="50" cy="42" rx="32" ry="12" fill="#F3D58C" stroke="#9F6E1D" stroke-width="3"/>
          <path d="M30 44C40 50 60 50 70 44" stroke="#FFF" stroke-width="2" stroke-linecap="round"/>
        </svg>`
      },
      {
        id: 'kahor_bati_3',
        as: 'কাঁহৰ বাটি',
        en: 'Brass Bowl',
        isDifferent: false,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="68" rx="24" ry="7" fill="#B28020"/>
          <path d="M18 42C18 68 82 68 82 42" fill="#D9A441" stroke="#9F6E1D" stroke-width="3"/>
          <ellipse cx="50" cy="42" rx="32" ry="12" fill="#F3D58C" stroke="#9F6E1D" stroke-width="3"/>
          <path d="M30 44C40 50 60 50 70 44" stroke="#FFF" stroke-width="2" stroke-linecap="round"/>
        </svg>`
      }
    ]
  },

  /* Round 4: Bihu Musical Instruments (Pepa vs Dhol) */
  {
    categoryAs: 'বিহু বাদ্যযন্ত্র',
    categoryEn: 'Bihu Instruments',
    items: [
      {
        id: 'pepa_1',
        as: 'ম\'হৰ শিঙৰ পেঁপা',
        en: 'Buffalo Horn Pepa',
        isDifferent: false,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 68C26 40 48 30 76 24C68 36 50 48 42 72C36 74 26 74 22 68Z" fill="#2A2017" stroke="#18120B" stroke-width="2.5"/>
          <path d="M38 52L46 54M48 40L56 43M60 32L68 35" stroke="#D9A441" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M74 24L84 18M76 26L86 24" stroke="#C1522F" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`
      },
      {
        id: 'bihu_dhol',
        as: 'অসমীয়া ঢোল',
        en: 'Assamese Dhol',
        isDifferent: true,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="26" cy="50" rx="8" ry="24" fill="#F4E8D0" stroke="#7A5835" stroke-width="2.5"/>
          <path d="M26 26C42 22 58 22 74 26V74C58 78 42 78 26 74V26Z" fill="#9F3F22" stroke="#5C2413" stroke-width="2.5"/>
          <ellipse cx="74" cy="50" rx="8" ry="24" fill="#EFE4C6" stroke="#7A5835" stroke-width="2.5"/>
          <path d="M26 32L74 44M26 44L74 56M26 56L74 68M26 68L74 32" stroke="#EFE4C6" stroke-width="1.8"/>
          <path d="M18 50C10 26 90 26 82 50" stroke="#C1522F" stroke-width="3" stroke-linecap="round"/>
        </svg>`
      },
      {
        id: 'pepa_2',
        as: 'ম\'হৰ শিঙৰ পেঁপা',
        en: 'Buffalo Horn Pepa',
        isDifferent: false,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 68C26 40 48 30 76 24C68 36 50 48 42 72C36 74 26 74 22 68Z" fill="#2A2017" stroke="#18120B" stroke-width="2.5"/>
          <path d="M38 52L46 54M48 40L56 43M60 32L68 35" stroke="#D9A441" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M74 24L84 18M76 26L86 24" stroke="#C1522F" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`
      },
      {
        id: 'pepa_3',
        as: 'ম\'হৰ শিঙৰ পেঁপা',
        en: 'Buffalo Horn Pepa',
        isDifferent: false,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 68C26 40 48 30 76 24C68 36 50 48 42 72C36 74 26 74 22 68Z" fill="#2A2017" stroke="#18120B" stroke-width="2.5"/>
          <path d="M38 52L46 54M48 40L56 43M60 32L68 35" stroke="#D9A441" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M74 24L84 18M76 26L86 24" stroke="#C1522F" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`
      }
    ]
  },

  /* Round 5: Assamese Jolpan (Til Pitha vs Ghila Pitha) */
  {
    categoryAs: 'অসমীয়া পিঠা',
    categoryEn: 'Assamese Pitha',
    items: [
      {
        id: 'til_pitha_1',
        as: 'তিল পিঠা',
        en: 'Til Pitha',
        isDifferent: false,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="38" width="60" height="24" rx="12" fill="#FFFDF8" stroke="#D8C79E" stroke-width="2.5"/>
          <ellipse cx="25" cy="50" rx="3.5" ry="8" fill="#3A2A1D"/>
          <line x1="38" y1="44" x2="44" y2="44" stroke="#D8C79E" stroke-width="2" stroke-linecap="round"/>
          <line x1="52" y1="52" x2="60" y2="52" stroke="#D8C79E" stroke-width="2" stroke-linecap="round"/>
        </svg>`
      },
      {
        id: 'til_pitha_2',
        as: 'তিল পিঠা',
        en: 'Til Pitha',
        isDifferent: false,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="38" width="60" height="24" rx="12" fill="#FFFDF8" stroke="#D8C79E" stroke-width="2.5"/>
          <ellipse cx="25" cy="50" rx="3.5" ry="8" fill="#3A2A1D"/>
          <line x1="38" y1="44" x2="44" y2="44" stroke="#D8C79E" stroke-width="2" stroke-linecap="round"/>
          <line x1="52" y1="52" x2="60" y2="52" stroke="#D8C79E" stroke-width="2" stroke-linecap="round"/>
        </svg>`
      },
      {
        id: 'ghila_pitha',
        as: 'ঘিলা পিঠা',
        en: 'Ghila Pitha',
        isDifferent: true,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="28" fill="#C1522F" stroke="#9F3F22" stroke-width="3"/>
          <circle cx="50" cy="50" r="22" fill="#D9A441" stroke="#C1522F" stroke-width="2"/>
          <circle cx="44" cy="44" r="3" fill="#FFF8EE" opacity="0.6"/>
        </svg>`
      },
      {
        id: 'til_pitha_3',
        as: 'তিল পিঠা',
        en: 'Til Pitha',
        isDifferent: false,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="38" width="60" height="24" rx="12" fill="#FFFDF8" stroke="#D8C79E" stroke-width="2.5"/>
          <ellipse cx="25" cy="50" rx="3.5" ry="8" fill="#3A2A1D"/>
          <line x1="38" y1="44" x2="44" y2="44" stroke="#D8C79E" stroke-width="2" stroke-linecap="round"/>
          <line x1="52" y1="52" x2="60" y2="52" stroke="#D8C79E" stroke-width="2" stroke-linecap="round"/>
        </svg>`
      }
    ]
  },

  /* Round 6: Assamese Flowers (Kopou Orchid vs Lotus) */
  {
    categoryAs: 'অসমৰ ফুল',
    categoryEn: 'Assamese Flowers',
    items: [
      {
        id: 'kopou_1',
        as: 'কপৌ ফুল',
        en: 'Kopou Orchid',
        isDifferent: false,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M75 22C60 35 45 55 35 78" stroke="#5E7A57" stroke-width="3" stroke-linecap="round"/>
          <circle cx="68" cy="30" r="5.5" fill="#E89B84"/>
          <circle cx="60" cy="38" r="6" fill="#C1522F"/>
          <circle cx="52" cy="48" r="6.5" fill="#E89B84"/>
          <circle cx="45" cy="58" r="7" fill="#C1522F"/>
          <circle cx="38" cy="70" r="6" fill="#E89B84"/>
        </svg>`
      },
      {
        id: 'podum_phool',
        as: 'পদুম ফুল',
        en: 'Lotus Flower',
        isDifferent: true,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="68" rx="32" ry="9" fill="#7C9473" stroke="#5E7A57" stroke-width="2.5"/>
          <path d="M30 60C26 48 42 42 45 58Z" fill="#E89B84" stroke="#C1522F" stroke-width="2"/>
          <path d="M70 60C74 48 58 42 55 58Z" fill="#E89B84" stroke="#C1522F" stroke-width="2"/>
          <path d="M50 32C44 42 46 54 50 58C54 54 56 42 50 32Z" fill="#FFF0ED" stroke="#C1522F" stroke-width="2.5"/>
          <ellipse cx="50" cy="55" rx="5" ry="3" fill="#D9A441"/>
        </svg>`
      },
      {
        id: 'kopou_2',
        as: 'কপৌ ফুল',
        en: 'Kopou Orchid',
        isDifferent: false,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M75 22C60 35 45 55 35 78" stroke="#5E7A57" stroke-width="3" stroke-linecap="round"/>
          <circle cx="68" cy="30" r="5.5" fill="#E89B84"/>
          <circle cx="60" cy="38" r="6" fill="#C1522F"/>
          <circle cx="52" cy="48" r="6.5" fill="#E89B84"/>
          <circle cx="45" cy="58" r="7" fill="#C1522F"/>
          <circle cx="38" cy="70" r="6" fill="#E89B84"/>
        </svg>`
      },
      {
        id: 'kopou_3',
        as: 'কপৌ ফুল',
        en: 'Kopou Orchid',
        isDifferent: false,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M75 22C60 35 45 55 35 78" stroke="#5E7A57" stroke-width="3" stroke-linecap="round"/>
          <circle cx="68" cy="30" r="5.5" fill="#E89B84"/>
          <circle cx="60" cy="38" r="6" fill="#C1522F"/>
          <circle cx="52" cy="48" r="6.5" fill="#E89B84"/>
          <circle cx="45" cy="58" r="7" fill="#C1522F"/>
          <circle cx="38" cy="70" r="6" fill="#E89B84"/>
        </svg>`
      }
    ]
  },

  /* Round 7: Traditional Crafts (Hand Fan vs Xorai) */
  {
    categoryAs: 'পৰম্পৰাগত সামগ্ৰী',
    categoryEn: 'Traditional Crafts',
    items: [
      {
        id: 'bishoni_1',
        as: 'বাঁহৰ বিচনী',
        en: 'Bamboo Hand Fan',
        isDifferent: false,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 22C44 14 68 18 76 34C82 48 74 66 58 70L30 22Z" fill="#EFE4C6" stroke="#7A5835" stroke-width="2.5"/>
          <line x1="30" y1="22" x2="20" y2="82" stroke="#3A2A1D" stroke-width="4" stroke-linecap="round"/>
          <path d="M36 26C46 22 62 25 70 36C74 46 68 58 56 62" stroke="#C1522F" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`
      },
      {
        id: 'bishoni_2',
        as: 'বাঁহৰ বিচনী',
        en: 'Bamboo Hand Fan',
        isDifferent: false,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 22C44 14 68 18 76 34C82 48 74 66 58 70L30 22Z" fill="#EFE4C6" stroke="#7A5835" stroke-width="2.5"/>
          <line x1="30" y1="22" x2="20" y2="82" stroke="#3A2A1D" stroke-width="4" stroke-linecap="round"/>
          <path d="M36 26C46 22 62 25 70 36C74 46 68 58 56 62" stroke="#C1522F" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`
      },
      {
        id: 'bishoni_3',
        as: 'বাঁহৰ বিচনী',
        en: 'Bamboo Hand Fan',
        isDifferent: false,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 22C44 14 68 18 76 34C82 48 74 66 58 70L30 22Z" fill="#EFE4C6" stroke="#7A5835" stroke-width="2.5"/>
          <line x1="30" y1="22" x2="20" y2="82" stroke="#3A2A1D" stroke-width="4" stroke-linecap="round"/>
          <path d="M36 26C46 22 62 25 70 36C74 46 68 58 56 62" stroke="#C1522F" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`
      },
      {
        id: 'xorai_tray',
        as: 'কাঁহৰ শৰাই',
        en: 'Brass Xorai',
        isDifferent: true,
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="80" rx="22" ry="6" fill="#B28020"/>
          <path d="M46 54H54V76H46V54Z" fill="#D9A441" stroke="#9F6E1D" stroke-width="2"/>
          <ellipse cx="50" cy="54" rx="34" ry="10" fill="#F3D58C" stroke="#9F6E1D" stroke-width="2.5"/>
          <path d="M26 52C26 34 74 34 74 52" fill="#D9A441" stroke="#9F6E1D" stroke-width="2.5"/>
          <circle cx="50" cy="30" r="4.5" fill="#B28020"/>
        </svg>`
      }
    ]
  }
];

/* ============ Game State ============ */
let currentRoundIndex = 0;
let currentRoundItems = [];
let roundAttempts = 0;
let lastScreenCue = null;
let translationOn = false;
let audioUnlocked = false;

/* ============ Helpers ============ */
function shuffle(arr){
  const a = arr.slice();
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const targetScreen = document.getElementById(id);
  if(targetScreen) targetScreen.classList.add('active');

  const onHome = (id === 'screen-home');
  document.getElementById('btnHome').style.display = onHome ? 'none' : '';
  document.getElementById('btnHelp').style.display = onHome ? 'none' : '';
}

function playCue(cue){
  if(!cue) return;
  lastScreenCue = cue;
  const filename = (translationOn && cue.en) ? cue.en : cue.as;
  const player = document.getElementById('player');
  player.src = AUD_DIR + filename;

  player.onerror = () => {
    // If translation toggle is on but English clip is missing, fallback to Assamese audio clip
    if(translationOn && filename !== cue.as && cue.as){
      player.src = AUD_DIR + cue.as;
      player.play().catch(() => {});
    }
  };

  const p = player.play();
  if(p && p.then){
    p.then(() => { audioUnlocked = true; })
     .catch(() => {
       /* Handled by unlockAudioOnFirstTouch */
     });
  }
}

function setAvatar(el, item){
  if(!el) return;
  el.innerHTML = '';
  const img = document.createElement('img');
  img.className = 'avatar-img';
  img.alt = item.as;
  img.src = IMG_DIR + item.img;
  img.onerror = () => {
    el.innerHTML = `<div style="font-size:22px; font-weight:800; color:var(--terracotta);">${item.as}</div>`;
  };
  el.appendChild(img);
}

function applyTranslation(){
  document.querySelectorAll('.translatable').forEach(el => {
    if(el.dataset.as && el.dataset.en){
      el.textContent = translationOn ? el.dataset.en : el.dataset.as;
    }
  });

  // Re-label active cards
  document.querySelectorAll('.odd-card').forEach(card => {
    const labelEl = card.querySelector('.card-label');
    if(labelEl){
      labelEl.textContent = translationOn ? labelEl.dataset.en : labelEl.dataset.as;
    }
  });
}

function updateRoundIndicator(){
  const roundText = document.getElementById('roundLabel');
  const asR = `পৰ্যায় ${currentRoundIndex + 1} / ${ROUNDS_DATA.length}`;
  const enR = `Round ${currentRoundIndex + 1} of ${ROUNDS_DATA.length}`;
  roundText.dataset.as = asR;
  roundText.dataset.en = enR;
  roundText.textContent = translationOn ? enR : asR;

  const dots = document.querySelectorAll('#roundDots .round-dot');
  dots.forEach((dot, idx) => {
    if(idx <= currentRoundIndex){
      dot.classList.add('completed');
    } else {
      dot.classList.remove('completed');
    }
  });
}

function showToast(asMsg, enMsg){
  const toast = document.getElementById('gentleToast');
  toast.dataset.as = asMsg;
  toast.dataset.en = enMsg;
  toast.textContent = translationOn ? enMsg : asMsg;
  toast.classList.add('visible');
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 2600);
}



/* Caregiver background telemetry */
function logToCaregiver(entry){
  console.log('[SmritiSetu-Game5 Caregiver Telemetry]:', entry);
}

/* ============ Round Flow Engine ============ */

function startRound(index){
  currentRoundIndex = index;
  roundAttempts = 0;
  updateRoundIndicator();

  const roundData = ROUNDS_DATA[currentRoundIndex];
  // Shuffle cards so odd one isn't always in same position
  currentRoundItems = shuffle(roundData.items);

  const grid = document.getElementById('cardsGrid');
  grid.innerHTML = '';

  currentRoundItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'odd-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', translationOn ? item.en : item.as);

    // Badge for selected state
    const badge = document.createElement('div');
    badge.className = 'card-badge translatable';
    badge.dataset.as = 'বাছিলে';
    badge.dataset.en = 'Selected';
    badge.textContent = translationOn ? 'Selected' : 'বাছিলে';
    card.appendChild(badge);

    // Card Thumbnail & SVG
    const thumb = document.createElement('div');
    thumb.className = 'card-thumb';
    thumb.innerHTML = item.svg;
    card.appendChild(thumb);

    // Card Label
    const label = document.createElement('div');
    label.className = 'card-label translatable';
    label.dataset.as = item.as;
    label.dataset.en = item.en;
    label.textContent = translationOn ? item.en : item.as;
    card.appendChild(label);

    // Tap Handler
    const handleTap = () => {
      onCardTapped(item, card);
    };

    card.addEventListener('click', handleTap);
    card.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        handleTap();
      }
    });

    grid.appendChild(card);
  });

  showScreen('screen-game');
  playCue(CUES.roundPrompt);
}

function onCardTapped(item, cardEl){
  roundAttempts++;

  // Caregiver Telemetry
  logToCaregiver({
    action: 'card_selected',
    round: currentRoundIndex + 1,
    itemId: item.id,
    isDifferent: item.isDifferent,
    attempts: roundAttempts,
    timestamp: new Date().toISOString()
  });

  if(item.isDifferent){
    // CORRECT! (Found the odd one out)
    cardEl.classList.add('correct');
    
    // Disable other cards temporarily
    document.querySelectorAll('.odd-card').forEach(c => {
      c.style.pointerEvents = 'none';
    });

    playCue(CUES.correct);
    showToast('একদম শুদ্ধ! বৰ ধুনীয়া হৈছে, এইটোৱেই বেলেগ আছিল।', 'Exactly right! Very well done, this was the different one.');

    setTimeout(() => {
      if(currentRoundIndex + 1 < ROUNDS_DATA.length){
        startRound(currentRoundIndex + 1);
      } else {
        finishGame();
      }
    }, 1800);

  } else {
    // WRONG (Tapped one of the identical ones)
    // Dementia-Friendly Rule: NO RED X, NO BUZZER, NO PENALTY!
    cardEl.classList.add('gentle-retry');
    setTimeout(() => {
      cardEl.classList.remove('gentle-retry');
    }, 500);

    playCue(CUES.retryGentle);
    showToast('এইবোৰ একেই আছে, বাকী কেইটাও ভালদৰে চাওকচোন।', 'These are the same, take another close look at the rest.');
  }
}

function startGame(){
  currentRoundIndex = 0;
  startRound(0);
}

function finishGame(){
  setAvatar(document.getElementById('heroImageComplete'), AVATAR.happy);
  showScreen('screen-complete');
  playCue(CUES.levelComplete);

  logToCaregiver({
    action: 'game5_completed',
    totalRounds: ROUNDS_DATA.length,
    timestamp: new Date().toISOString()
  });
}

function resetToHome(){
  currentRoundIndex = 0;
  showScreen('screen-home');
  setAvatar(document.getElementById('heroImage'), AVATAR.gentle);
  playCue(CUES.intro);
}

/* ============ Wiring ============ */

document.getElementById('btnPlay').addEventListener('click', () => {
  startGame();
});

document.getElementById('btnPlayAgain').addEventListener('click', () => {
  startGame();
});

document.getElementById('btnGoHome').addEventListener('click', () => {
  resetToHome();
});

document.getElementById('btnHome').addEventListener('click', () => {
  resetToHome();
});

document.getElementById('btnRepeat').addEventListener('click', () => {
  if(lastScreenCue) playCue(lastScreenCue);
});

document.getElementById('btnHelp').addEventListener('click', () => {
  document.getElementById('helpModal').classList.add('open');
  playCue(CUES.helpPrompt);
});

document.getElementById('btnCloseHelp').addEventListener('click', () => {
  document.getElementById('helpModal').classList.remove('open');
  // Restore screen prompt as active cue
  const isGameActive = document.getElementById('screen-game').classList.contains('active');
  const isComplete = document.getElementById('screen-complete').classList.contains('active');
  lastScreenCue = isComplete ? CUES.levelComplete : (isGameActive ? CUES.roundPrompt : CUES.intro);
});

document.getElementById('btnSpeakHelp').addEventListener('click', () => {
  playCue(CUES.helpPrompt);
});

/* Translation Toggle (EN / AS) */
document.getElementById('btnTranslate').addEventListener('click', () => {
  translationOn = !translationOn;
  const btn = document.getElementById('btnTranslate');
  btn.textContent = translationOn ? 'AS' : 'EN';
  btn.classList.toggle('translation-on', translationOn);
  applyTranslation();

  // Instantly replay narration in the newly toggled language
  const isHelpOpen = document.getElementById('helpModal').classList.contains('open');
  if (isHelpOpen) {
    playCue(CUES.helpPrompt);
  } else if (lastScreenCue) {
    playCue(lastScreenCue);
  }
});

/* Audio Autoplay unlock on first touch */
function unlockAudioOnFirstTouch(){
  if(audioUnlocked) return;
  const player = document.getElementById('player');
  if(player.src){
    player.play().then(() => { audioUnlocked = true; }).catch(() => {});
  }
}
document.addEventListener('pointerdown', unlockAudioOnFirstTouch, { once: true });
document.addEventListener('keydown', unlockAudioOnFirstTouch, { once: true });

/* Init */
window.addEventListener('load', () => {
  resetToHome();
});
