import { Container } from '@/components/layout/Container';

export default function BusinessPage() {
  return (
    <Container className="py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-3">
        Для <span className="gradient-text">бизнеса</span>
      </h1>
      <p className="text-text-secondary">Панель управления задачами бизнеса.</p>
    </Container>
  );
}