import { Container } from '@/components/layout/Container';

export default function TeamsPage() {
  return (
    <Container className="py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-3">
        Команды <span className="gradient-text">разработчиков</span>
      </h1>
      <p className="text-text-secondary">Скоро здесь появятся команды.</p>
    </Container>
  );
}