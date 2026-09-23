import ChallengeMap from "@/components/map/ChallengeMap";

export default function MapPage() {
  return (
    <main className="min-h-screen bg-[#070611] pb-24">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="
            absolute
            left-1/2
            top-[-220px]
            h-[600px]
            w-[900px]
            -translate-x-1/2
            rounded-full
            bg-violet-600/[0.10]
            blur-[150px]
          "
        />

        <div
          className="
            absolute
            right-[-200px]
            top-[400px]
            h-[500px]
            w-[500px]
            rounded-full
            bg-purple-600/[0.06]
            blur-[140px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-[1450px] px-5 pt-14 sm:px-6 lg:px-10">
        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <section
          className="
            mb-10
            flex
            flex-col
            justify-between
            gap-8
            lg:flex-row
            lg:items-end
          "
        >
          <div className="max-w-4xl">
            <div
              className="
                mb-4
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
              Agricultural Workforce Platform
            </div>

            <h1
              className="
                text-4xl
                font-bold
                leading-tight
                tracking-[-0.03em]
                text-white
                sm:text-5xl
                lg:text-6xl
              "
            >
              Где нужны{" "}
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
                аграрные специалисты?
              </span>
            </h1>

            <p
              className="
                mt-5
                max-w-3xl
                text-base
                leading-7
                text-[#928b9f]
                sm:text-lg
              "
            >
              Интерактивная карта TaskAtlas AI показывает,
              где сельскохозяйственным организациям нужны
              специалисты, какие навыки требуются и сколько
              человек необходимо.
            </p>
          </div>

          {/* Pilot badge */}
          <div
            className="
              shrink-0
              rounded-2xl
              border
              border-violet-400/15
              bg-[#100c1c]/80
              px-5
              py-4
              backdrop-blur-xl
            "
          >
            <div
              className="
                text-[11px]
                uppercase
                tracking-[0.16em]
                text-[#6f687d]
              "
            >
              Первый пилот
            </div>

            <div className="mt-1 font-semibold text-white">
              Северо-Казахстанская область
            </div>

            <div className="mt-1 text-sm text-violet-300">
              Петропавловск · Советское
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* SMALL EXPLANATION */}
        {/* ================================================= */}

        <section
          className="
            mb-7
            grid
            gap-3
            md:grid-cols-3
          "
        >
          <MiniFeature
            number="01"
            title="Найдите спрос"
            description="Смотрите, в каком городе или селе нужны специалисты."
          />

          <MiniFeature
            number="02"
            title="Изучите требования"
            description="Специальность, навыки, условия работы и readiness score."
          />

          <MiniFeature
            number="03"
            title="Откликнитесь"
            description="Студент или команда отправляет предложение организации."
          />
        </section>

        {/* ================================================= */}
        {/* MAP */}
        {/* ================================================= */}

        <section>
          <div
            className="
              mb-4
              flex
              flex-col
              justify-between
              gap-3
              sm:flex-row
              sm:items-center
            "
          >
            <div>
              <h2 className="text-xl font-semibold text-white">
                Карта открытого спроса
              </h2>

              <p className="mt-1 text-sm text-[#777081]">
                Нажмите на населённый пункт, чтобы увидеть
                информацию о потребности.
              </p>
            </div>

            <div
              className="
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-full
                border
                border-emerald-400/15
                bg-emerald-500/[0.06]
                px-3
                py-1.5
                text-xs
                text-emerald-300
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-400
                  shadow-[0_0_12px_rgba(52,211,153,.8)]
                "
              />

              Live demand map
            </div>
          </div>

          <ChallengeMap />
        </section>

        {/* ================================================= */}
        {/* LEGEND / STATS */}
        {/* ================================================= */}

        <section className="mt-6">
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-8
              gap-y-3
              rounded-2xl
              border
              border-violet-400/10
              bg-[#0d0a17]
              px-5
              py-4
            "
          >
            <LegendDot
              color="bg-violet-500"
              label="Высокий спрос"
            />

            <LegendDot
              color="bg-amber-500"
              label="Средний спрос"
            />

            <LegendDot
              color="bg-orange-500"
              label="Открытая позиция"
            />
          </div>

          <div
            className="
              mt-4
              grid
              gap-4
              sm:grid-cols-3
            "
          >
            <StatCard
              label="Открытый спрос"
              value="5"
              unit="специалистов"
            />

            <StatCard
              label="Локации"
              value="2"
              unit="населённых пункта"
            />

            <StatCard
              label="Специальности"
              value="2"
              unit="категории"
            />
          </div>
        </section>

        {/* ================================================= */}
        {/* HOW IT CONNECTS TO PLATFORM */}
        {/* ================================================= */}

        <section
          className="
            mt-16
            overflow-hidden
            rounded-3xl
            border
            border-violet-400/15
            bg-[#0d0917]
            p-6
            sm:p-8
          "
        >
          <div className="max-w-3xl">
            <div
              className="
                text-xs
                font-medium
                uppercase
                tracking-[0.16em]
                text-violet-400
              "
            >
              End-to-end workflow
            </div>

            <h2
              className="
                mt-3
                text-2xl
                font-bold
                text-white
                sm:text-3xl
              "
            >
              Карта — часть полного сценария TaskAtlas AI
            </h2>

            <p
              className="
                mt-3
                leading-7
                text-[#8d869b]
              "
            >
              Организация создаёт потребность, AI помогает
              дополнить данные, readiness score растёт, после
              публикации карточка появляется на карте, а
              студент или команда может отправить предложение.
            </p>
          </div>

          <div
            className="
              mt-8
              grid
              gap-3
              md:grid-cols-4
            "
          >
            <WorkflowStep
              number="1"
              title="Создать"
              description="Организация описывает свою потребность."
            />

            <WorkflowStep
              number="2"
              title="AI уточняет"
              description="Система находит недостающую информацию."
            />

            <WorkflowStep
              number="3"
              title="Опубликовать"
              description="Готовая карточка появляется на карте."
            />

            <WorkflowStep
              number="4"
              title="Получить отклик"
              description="Студент или команда отправляет предложение."
            />
          </div>
        </section>
      </div>
    </main>
  );
}

/* ================================================= */
/* MINI FEATURE */
/* ================================================= */

function MiniFeature({
  number,
  title,
  description,
}: {
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
        p-4
      "
    >
      <div
        className="
          text-[10px]
          font-semibold
          tracking-[0.16em]
          text-violet-400
        "
      >
        {number}
      </div>

      <div className="mt-2 font-semibold text-white">
        {title}
      </div>

      <div
        className="
          mt-1
          text-sm
          leading-5
          text-[#777081]
        "
      >
        {description}
      </div>
    </div>
  );
}

/* ================================================= */
/* LEGEND */
/* ================================================= */

function LegendDot({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        text-sm
        text-[#aaa4b5]
      "
    >
      <span
        className={`
          h-3
          w-3
          rounded-full
          ${color}
        `}
      />

      {label}
    </div>
  );
}

/* ================================================= */
/* STATS */
/* ================================================= */

function StatCard({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-violet-400/10
        bg-[#0d0a17]
        p-5
      "
    >
      <div className="text-sm text-[#777081]">
        {label}
      </div>

      <div
        className="
          mt-2
          text-4xl
          font-bold
          text-white
        "
      >
        {value}
      </div>

      <div className="mt-1 text-sm text-[#696273]">
        {unit}
      </div>
    </div>
  );
}

/* ================================================= */
/* WORKFLOW */
/* ================================================= */

function WorkflowStep({
  number,
  title,
  description,
}: {
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
        bg-[#110d1e]
        p-4
      "
    >
      <div
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-lg
          bg-violet-500/10
          text-sm
          font-semibold
          text-violet-300
        "
      >
        {number}
      </div>

      <div className="mt-4 font-semibold text-white">
        {title}
      </div>

      <div
        className="
          mt-1
          text-sm
          leading-5
          text-[#777081]
        "
      >
        {description}
      </div>
    </div>
  );
}