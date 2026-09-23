import Link from 'next/link';

interface Challenge {
  id: string;
  title: string;
  category: string;
  score: number;
  status: string;
  location: string;
}

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const statusStyles = {
    READY: { bg: 'bg-neon-green/20', text: 'text-neon-green', border: 'border-neon-green/50', label: 'Готова' },
    IN_PROGRESS: { bg: 'bg-neon-yellow/20', text: 'text-neon-yellow', border: 'border-neon-yellow/50', label: 'Рабочая' },
    DRAFT: { bg: 'bg-text-muted/20', text: 'text-text-muted', border: 'border-text-muted/50', label: 'Черновик' },
  };

  const status = statusStyles[challenge.status as keyof typeof statusStyles] || statusStyles.DRAFT;

  // Цвет рейтинга
  const scoreColor = challenge.score >= 85 ? 'neon-green' : challenge.score >= 70 ? 'neon-yellow' : 'neon-red';

  return (
    <Link href={`/challenges/${challenge.id}`}>
      <div className="group glass rounded-2xl p-6 glass-hover transition-all cursor-pointer h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-mono text-neon-purple uppercase tracking-wider bg-neon-purple/10 px-3 py-1 rounded-full border border-neon-purple/30">
            {challenge.category}
          </span>
          <span className={`text-xs px-3 py-1 rounded-full ${status.bg} ${status.text} border ${status.border}`}>
            {status.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-neon-purple transition-colors">
          {challenge.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {challenge.location}
        </div>

        {/* Score — прогресс-бар */}
        <div className="mt-auto pt-5 border-t border-neon-purple/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-muted uppercase tracking-wider">AI Рейтинг</span>
            <span className={`text-2xl font-bold text-${scoreColor} neon-text`}>
              {challenge.score}
              <span className="text-sm text-text-muted font-normal">/100</span>
            </span>
          </div>
          <div className="w-full h-2 bg-background-deep rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-neon rounded-full transition-all`}
              style={{ width: `${challenge.score}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}