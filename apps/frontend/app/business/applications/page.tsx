import { Container } from '@/components/layout/Container';

export default function ApplicationsPage() {
  return (
    <Container className="py-12">
      <h1 className="text-4xl font-bold mb-3">Заявки</h1>
      <p className="text-text-secondary">Входящие заявки от команд.</p>
    </Container>
  );
}