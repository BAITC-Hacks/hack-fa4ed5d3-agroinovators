// import type { Config } from 'tailwindcss';

// const config: Config = {
//   content: [
//     './app/**/*.{js,ts,jsx,tsx,mdx}',
//     './components/**/*.{js,ts,jsx,tsx,mdx}',
//     './lib/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       colors: {
//         // Фоны
//         background: {
//           DEFAULT: '#0A0618', // Очень темный фиолетово-черный (основной фон)
//           sidebar: '#0F0A1F',  // Чуть светлее для сайдбара
//           card: '#151029',     // Фон карточек
//           hover: '#1E1638',    // Ховер
//         },
//         // Акценты (фиолетовый/синий)
//         accent: {
//           DEFAULT: '#8B5CF6',  // Основной фиолетовый (кнопки, активные элементы)
//           light: '#A78BFA',    // Светлый фиолетовый
//           dark: '#7C3AED',     // Темный фиолетовый
//           glow: '#8B5CF6',     // Для свечения
//         },
//         // Статусы
//         status: {
//           danger: '#EF4444',   // Красный (Опасно)
//           warning: '#F59E0B',  // Желтый (Предупреждение)
//           info: '#3B82F6',     // Синий (Информация)
//           success: '#10B981',  // Зеленый (OK/Online)
//         },
//         // Текст
//         text: {
//           primary: '#F8FAFC',
//           secondary: '#94A3B8',
//           muted: '#64748B',
//         },
//         // Границы
//         border: {
//           DEFAULT: '#2D2445',
//           light: '#3F3461',
//         },
//       },
//       boxShadow: {
//         'glow': '0 0 20px rgba(139, 92, 246, 0.4)',
//         'glow-lg': '0 0 40px rgba(139, 92, 246, 0.6)',
//         'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
//       },
//       backgroundImage: {
//         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//         'glow-gradient': 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15), transparent 70%)',
//       },
//       animation: {
//         'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
//         'glow': 'glow 2s ease-in-out infinite alternate',
//       },
//       keyframes: {
//         glow: {
//           '0%': { boxShadow: '0 0 5px rgba(139, 92, 246, 0.3)' },
//           '100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.6)' },
//         },
//       },
//     },
//   },
//   plugins: [],
// };

// export default config;

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Базовые фоны (глубокий фиолетово-синий)
        background: {
          DEFAULT: '#0A0618',      // Основной фон
          deep: '#050310',          // Ещё глубже (для sidebar)
          card: '#12082A',          // Фон карточек
          surface: '#1A0F35',       // Поверхности/панели
        },
        // Неоновые акценты
        neon: {
          purple: '#A855F7',        // Основной фиолетовый
          violet: '#8B5CF6',        // Фиолетовый
          pink: '#EC4899',          // Розовый
          blue: '#3B82F6',          // Синий
          cyan: '#06B6D4',          // Циан
          green: '#10B981',         // Зелёный (успех)
          yellow: '#F59E0B',        // Жёлтый (предупреждение)
          red: '#EF4444',           // Красный (опасность)
        },
        // Текстовые цвета
        text: {
          primary: '#F5F3FF',
          secondary: '#A78BFA',
          muted: '#6B5B95',
        },
      },
      boxShadow: {
        'neon-purple': '0 0 20px rgba(168, 85, 247, 0.5)',
        'neon-pink': '0 0 20px rgba(236, 72, 153, 0.5)',
        'neon-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'neon-sm': '0 0 10px rgba(168, 85, 247, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-neon': 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
        'gradient-purple-blue': 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(168, 85, 247, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.9)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;