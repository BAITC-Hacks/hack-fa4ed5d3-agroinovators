import { Container } from '@/components/layout/Container';
import { ChallengeForm } from '@/components/challenge/ChallengeForm';

export default function CreatePage() {
  return (
    <div className="min-h-screen py-12">
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-neon-pink/10 rounded-full blur-[150px]" />
      </div>

      <Container className="max-w-4xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Создать <span className="gradient-text">задачу</span>
          </h1>
          <p className="text-text-secondary text-lg">
            Опишите идею — AI оценит её от 0 до 100 и подскажет, что улучшить
          </p>
        </div>

        <ChallengeForm />
      </Container>
    </div>
  );
}