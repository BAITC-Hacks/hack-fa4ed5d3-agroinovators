import { Container } from "@/components/layout/Container";

export default async function ChallengeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Container className="py-12">
      <div className="glass rounded-2xl p-8">
        <div className="mb-2 text-sm text-neon-purple">
          Задача #{id}
        </div>

        <h1 className="mb-4 text-4xl font-bold">
          Название задачи
        </h1>

        <p className="text-text-secondary">
          Детали задачи будут здесь.
        </p>
      </div>
    </Container>
  );
}