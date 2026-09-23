import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import AiChat from "@/components/ai/AiChat";

export default function HomePage() {
  return (
    <>
    <AiChat />
      <div className="relative min-h-screen flex flex-col">
        {/* Фоновое свечение */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-neon-pink/15 rounded-full blur-[120px]" />
        </div>

        <Container className="relative z-10 flex-1 flex flex-col items-center justify-center py-20 text-center">

          {/* Заголовок */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-5xl">
            Черновик идеи.{' '}
            <br className="hidden md:block" />
            Карточка с{' '}
            <span className="gradient-text neon-text">рейтингом 0–100</span>.
            <br />
            Команда, которая возьмётся.
          </h1>

          {/* Подзаголовок */}
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mb-12">
            TaskAtlas AI помогает бизнесу превратить обрывок текста в конкретную задачу — и честно показывает, чего в ней ещё не хватает.
          </p>

          {/* CTA кнопки */}
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <Link
              href="/create"
              className="px-8 py-3.5 rounded-lg bg-gradient-neon text-white font-bold text-lg shadow-neon-purple hover:shadow-neon-pink transition-all hover:scale-105"
            >
              Разместить задачу
            </Link>
            <Link
              href="/challenges"
              className="px-8 py-3.5 rounded-lg glass glass-hover text-white font-bold text-lg transition-all"
            >
              Смотреть каталог
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
            {[
              { value: '87', label: 'Средний рейтинг', color: 'neon-purple' },
              { value: '1.2K+', label: 'Активных задач', color: 'neon-pink' },
              { value: '340', label: 'Команд', color: 'neon-blue' },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-6 glass-hover transition-all">
                <div className={`text-3xl font-bold text-${stat.color} neon-text mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}