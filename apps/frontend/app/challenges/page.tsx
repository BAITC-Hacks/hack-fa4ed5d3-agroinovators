import { Container } from '@/components/layout/Container';
import { ChallengeCard } from '@/components/challenge/ChallengeCard';

// Mock данные (позже заменим на API)
const mockChallenges = [
  { id: '1', title: 'Рекомендации маркетплейса', category: 'e-commerce', score: 87, status: 'READY', location: 'Петропавловск' },
  { id: '2', title: 'Отток клиентов SaaS', category: 'saas', score: 92, status: 'IN_PROGRESS', location: 'Астана' },
  { id: '3', title: 'Учёт склада мебели', category: 'production', score: 65, status: 'DRAFT', location: 'Алматы' },
  { id: '4', title: 'AI-ассистент для ЖКХ', category: 'govtech', score: 78, status: 'READY', location: 'Шымкент' },
  { id: '5', title: 'Мониторинг водных ресурсов', category: 'ecology', score: 95, status: 'READY', location: 'Петропавловск' },
  { id: '6', title: 'Логистика для малого бизнеса', category: 'logistics', score: 71, status: 'DRAFT', location: 'Караганда' },
];

export default function ChallengesPage() {
  return (
    <div className="min-h-screen py-12">
      {/* Фоновое свечение */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-neon-pink/10 rounded-full blur-[150px]" />
      </div>

      <Container>
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Каталог <span className="gradient-text">задач</span>
          </h1>
          <p className="text-text-secondary text-lg">
            Найдено {mockChallenges.length} активных задач от бизнеса
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </Container>
    </div>
  );
}