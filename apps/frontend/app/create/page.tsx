import {
  BrainCircuit,
  CheckCircle2,
  MapPinned,
  Sparkles,
} from "lucide-react";

import { ChallengeForm } from "@/components/challenge/ChallengeForm";

export default function CreatePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070611] pb-24">
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div className="pointer-events-none fixed inset-0">
        <div
          className="
            absolute
            left-1/2
            top-[-260px]
            h-[700px]
            w-[1000px]
            -translate-x-1/2
            rounded-full
            bg-violet-600/[0.11]
            blur-[170px]
          "
        />

        <div
          className="
            absolute
            right-[-250px]
            top-[450px]
            h-[550px]
            w-[550px]
            rounded-full
            bg-fuchsia-600/[0.05]
            blur-[160px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 pt-14 sm:px-6 lg:px-10">
        {/* ===================================================
            HERO
        =================================================== */}

        <section className="mx-auto mb-10 max-w-5xl text-center">
          <div
            className="
              mx-auto
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-violet-400/20
              bg-violet-500/[0.07]
              px-4
              py-2
              text-xs
              font-medium
              uppercase
              tracking-[0.16em]
              text-violet-300
            "
          >
            <Sparkles size={14} />

            AI Demand Builder
          </div>

          <h1
            className="
              text-4xl
              font-bold
              leading-tight
              tracking-[-0.035em]
              text-white
              sm:text-5xl
              lg:text-6xl
            "
          >
            Создайте{" "}
            <span
              className="
                bg-gradient-to-r
                from-violet-300
                via-purple-400
                to-fuchsia-400
                bg-clip-text
                text-transparent
              "
            >
              аграрную потребность
            </span>
          </h1>

          <p
            className="
              mx-auto
              mt-5
              max-w-3xl
              text-base
              leading-7
              text-[#91899d]
              sm:text-lg
            "
          >
            Опишите потребность обычными словами.
            TaskAtlas AI определит, какой информации
            не хватает, задаст уточняющие вопросы и
            поможет подготовить структурированную
            карточку для публикации.
          </p>
        </section>

        {/* ===================================================
            FLOW EXPLANATION
        =================================================== */}

        <section
          className="
            mx-auto
            mb-8
            grid
            max-w-6xl
            gap-3
            md:grid-cols-3
          "
        >
          <FeatureCard
            icon={<BrainCircuit size={19} />}
            number="01"
            title="AI анализирует"
            description="Проверяет исходное описание и не придумывает отсутствующие факты."
          />

          <FeatureCard
            icon={<CheckCircle2 size={19} />}
            number="02"
            title="Readiness растёт"
            description="Каждое заполненное поле прозрачно добавляет баллы к оценке 0–100."
          />

          <FeatureCard
            icon={<MapPinned size={19} />}
            number="03"
            title="Запрос публикуется"
            description="После подтверждения человеком потребность может появиться в каталоге и на карте."
          />
        </section>

        {/* ===================================================
            FORM
        =================================================== */}

        <ChallengeForm />
      </div>
    </main>
  );
}

/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({
  icon,
  number,
  title,
  description,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-violet-400/10
        bg-white/[0.018]
        p-5
      "
    >
      <div className="flex items-center justify-between">
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-violet-500/10
            text-violet-300
          "
        >
          {icon}
        </div>

        <span
          className="
            text-[10px]
            font-semibold
            tracking-[0.16em]
            text-[#625b70]
          "
        >
          {number}
        </span>
      </div>

      <div className="mt-4 font-semibold text-white">
        {title}
      </div>

      <p
        className="
          mt-1
          text-sm
          leading-6
          text-[#777081]
        "
      >
        {description}
      </p>
    </div>
  );
}