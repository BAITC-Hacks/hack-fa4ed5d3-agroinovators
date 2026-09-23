'use client';

import { useState } from 'react';

export function ChallengeForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: отправка на API
    setTimeout(() => {
      setLoading(false);
      alert('Задача создана! AI-анализ запущен.');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
      {/* Название */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Название задачи
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Например: Рекомендации маркетплейса"
          className="w-full px-4 py-3 rounded-lg bg-background-deep border border-neon-purple/30 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-purple focus:shadow-neon-sm transition-all"
          required
        />
      </div>

      {/* Описание */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Описание (свободный текст)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Опишите идею своими словами — AI поможет структурировать..."
          rows={6}
          className="w-full px-4 py-3 rounded-lg bg-background-deep border border-neon-purple/30 text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-purple focus:shadow-neon-sm transition-all resize-none"
          required
        />
      </div>

      {/* Индустрия и Локация */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Индустрия
          </label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-background-deep border border-neon-purple/30 text-text-primary focus:outline-none focus:border-neon-purple focus:shadow-neon-sm transition-all"
            required
          >
            <option value="">Выберите индустрию</option>
            <option value="ecommerce">E-commerce</option>
            <option value="saas">SaaS</option>
            <option value="logistics">Логистика</option>
            <option value="govtech">GovTech</option>
            <option value="ecology">Экология</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Локация
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-background-deep border border-neon-purple/30 text-text-primary focus:outline-none focus:border-neon-purple focus:shadow-neon-sm transition-all"
            required
          >
            <option value="">Выберите локацию</option>
            <option value="petropavlovsk">Петропавловск</option>
            <option value="astana">Астана</option>
            <option value="almaty">Алматы</option>
            <option value="shymkent">Шымкент</option>
          </select>
        </div>
      </div>

      {/* Кнопка */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-lg bg-gradient-neon text-white font-bold text-lg shadow-neon-purple hover:shadow-neon-pink transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-3">
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            AI анализирует...
          </span>
        ) : (
          'Запустить AI-анализ'
        )}
      </button>
    </form>
  );
}