import ChallengeMap from "@/components/map/ChallengeMap";
import { agroDemands } from "@/data/agro-demands";

/* =========================================================
   CALCULATED MAP STATS
========================================================= */

const totalSpecialists = agroDemands.reduce(
  (sum, demand) => sum + demand.requiredCount,
  0,
);

const totalLocations = new Set(
  agroDemands.map(
    (demand) => demand.location.locality,
  ),
).size;

const totalSpecialties = new Set(
  agroDemands.map(
    (demand) => demand.specialist,
  ),
).size;

const highDemandLocations =
  agroDemands.filter(
    (demand) =>
      demand.demandLevel === "high",
  ).length;

/* =========================================================
   PAGE
========================================================= */

export default function MapPage() {
  return (
    <main
      className="
        min-h-screen
        bg-[#070611]
        pb-24
      "
    >
      {/* ===================================================
          BACKGROUND GLOW
      =================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-[-220px]
            h-[650px]
            w-[950px]
            -translate-x-1/2
            rounded-full
            bg-violet-600/[0.10]
            blur-[160px]
          "
        />

        <div
          className="
            absolute
            right-[-220px]
            top-[420px]
            h-[520px]
            w-[520px]
            rounded-full
            bg-purple-600/[0.07]
            blur-[150px]
          "
        />

        <div
          className="
            absolute
            bottom-[-250px]
            left-[-180px]
            h-[500px]
            w-[500px]
            rounded-full
            bg-fuchsia-600/[0.04]
            blur-[150px]
          "
        />
      </div>

      <div
        className="
          relative
          mx-auto
          max-w-[1450px]
          px-5
          pt-14
          sm:px-6
          lg:px-10
        "
      >
        {/* =================================================
            HERO
        ================================================= */}

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
            {/* Badge */}

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
              TaskAtlas Geo Intelligence
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
              TaskAtlas AI показывает спрос на
              аграрных специалистов по населённым
              пунктам Северо-Казахстанской области:
              кто нужен, сколько специалистов
              требуется, какие навыки ожидаются и
              какие условия предлагает организация.
            </p>
          </div>

          {/* Pilot info */}

          <div
            className="
              shrink-0
              rounded-2xl
              border
              border-violet-400/15
              bg-[#100c1c]/85
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
              Pilot Region
            </div>

            <div
              className="
                mt-1
                font-semibold
                text-white
              "
            >
              Северо-Казахстанская область
            </div>

            <div
              className="
                mt-2
                flex
                items-center
                gap-2
                text-sm
                text-violet-300
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-violet-400
                  shadow-[0_0_10px_rgba(167,139,250,.8)]
                "
              />

              {totalLocations} пилотных локаций
            </div>
          </div>
        </section>

        {/* =================================================
            REGIONAL OVERVIEW
        ================================================= */}

        <section
          className="
            mb-7
            grid
            gap-3
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          <OverviewCard
            label="Открытый спрос"
            value={totalSpecialists.toString()}
            description="специалиста требуется"
          />

          <OverviewCard
            label="Локации"
            value={totalLocations.toString()}
            description="городов и сёл"
          />

          <OverviewCard
            label="Специальности"
            value={totalSpecialties.toString()}
            description="аграрных направлений"
          />

          <OverviewCard
            label="Высокий спрос"
            value={highDemandLocations.toString()}
            description="приоритетных запросов"
            accent
          />
        </section>

        {/* =================================================
            SMALL EXPLANATION
        ================================================= */}

        <section
          className="
            mb-8
            grid
            gap-3
            md:grid-cols-3
          "
        >
          <MiniFeature
            number="01"
            title="Найдите спрос"
            description="Выберите специальность, формат работы или конкретный населённый пункт."
          />

          <MiniFeature
            number="02"
            title="Изучите требования"
            description="Посмотрите количество специалистов, навыки, зарплату, проживание и readiness."
          />

          <MiniFeature
            number="03"
            title="Откликнитесь"
            description="Студент, специалист или команда может перейти к запросу и отправить предложение."
          />
        </section>

        {/* =================================================
            MAP HEADER
        ================================================= */}

        <section>
          <div
            className="
              mb-4
              flex
              flex-col
              justify-between
              gap-4
              sm:flex-row
              sm:items-center
            "
          >
            <div>
              <div
                className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.16em]
                  text-violet-400
                "
              >
                Regional Demand Map
              </div>

              <h2
                className="
                  mt-1
                  text-xl
                  font-semibold
                  text-white
                  sm:text-2xl
                "
              >
                Карта открытого аграрного спроса
              </h2>

              <p
                className="
                  mt-1
                  max-w-2xl
                  text-sm
                  leading-6
                  text-[#777081]
                "
              >
                Нажмите на маркер или воспользуйтесь
                фильтрами, чтобы увидеть конкретную
                потребность организации.
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
                  animate-pulse
                  rounded-full
                  bg-emerald-400
                  shadow-[0_0_12px_rgba(52,211,153,.8)]
                "
              />

              Live demand map
            </div>
          </div>

          {/* MAIN MAP */}

          <ChallengeMap />
        </section>

        {/* =================================================
            DEMAND LEGEND
        ================================================= */}

        <section className="mt-6">
          <div
            className="
              flex
              flex-col
              justify-between
              gap-4
              rounded-2xl
              border
              border-violet-400/10
              bg-[#0d0a17]
              px-5
              py-4
              sm:flex-row
              sm:items-center
            "
          >
            <div>
              <div
                className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.14em]
                  text-[#696273]
                "
              >
                Demand Level
              </div>

              <div
                className="
                  mt-1
                  text-sm
                  text-[#aaa4b5]
                "
              >
                Цвет маркера показывает приоритет
                потребности.
              </div>
            </div>

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-x-7
                gap-y-3
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
          </div>
        </section>

        {/* =================================================
            CURRENT PILOT LOCATIONS
        ================================================= */}

        <section className="mt-14">
          <div
            className="
              flex
              flex-col
              justify-between
              gap-4
              md:flex-row
              md:items-end
            "
          >
            <div>
              <div
                className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.16em]
                  text-violet-400
                "
              >
                Pilot coverage
              </div>

              <h2
                className="
                  mt-2
                  text-2xl
                  font-bold
                  text-white
                  sm:text-3xl
                "
              >
                11 пилотных локаций СКО
              </h2>

              <p
                className="
                  mt-2
                  max-w-2xl
                  text-sm
                  leading-6
                  text-[#837c8f]
                "
              >
                В MVP мы показываем региональную сеть
                сельскохозяйственного спроса на примере
                нескольких городов и сёл Северного
                Казахстана.
              </p>
            </div>

            <div
              className="
                text-sm
                text-[#6f687b]
              "
            >
              {totalSpecialists} открытых мест
            </div>
          </div>

          <div
            className="
              mt-6
              grid
              gap-3
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >
            {[
              "Петропавловск",
              "Бишкуль",
              "Смирново",
              "Явленка",
              "Булаево",
              "Новоишимское",
              "Тайынша",
              "Тимирязево",
              "Сергеевка",
              "Талшик",
              "Советское",
            ].map((location) => (
              <LocationChip
                key={location}
                name={location}
              />
            ))}
          </div>
        </section>

        {/* =================================================
            WORKFLOW
        ================================================= */}

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
          <div
            className="
              flex
              flex-col
              justify-between
              gap-6
              lg:flex-row
              lg:items-end
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
                Карта — только часть TaskAtlas AI
              </h2>

              <p
                className="
                  mt-3
                  leading-7
                  text-[#8d869b]
                "
              >
                Сельскохозяйственная организация
                сначала описывает свою потребность.
                AI выявляет недостающую информацию,
                помогает повысить Agricultural Demand
                Readiness, после чего запрос
                публикуется в каталоге и появляется
                на карте.
              </p>
            </div>

            <div
              className="
                rounded-xl
                border
                border-violet-400/15
                bg-violet-500/[0.06]
                px-4
                py-3
                text-sm
                text-violet-200
              "
            >
              Need → AI → Readiness → Publish → Apply
            </div>
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
              title="Создать потребность"
              description="Организация описывает проблему или нехватку специалистов."
            />

            <WorkflowStep
              number="2"
              title="AI уточняет"
              description="Система находит недостающие сведения и задаёт вопросы."
            />

            <WorkflowStep
              number="3"
              title="Опубликовать"
              description="Готовый запрос появляется в каталоге и на карте."
            />

            <WorkflowStep
              number="4"
              title="Получить отклик"
              description="Студент или специалист отправляет предложение организации."
            />
          </div>
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   OVERVIEW CARD
========================================================= */

function OverviewCard({
  label,
  value,
  description,
  accent = false,
}: {
  label: string;
  value: string;
  description: string;
  accent?: boolean;
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
      <div
        className="
          text-xs
          uppercase
          tracking-[0.12em]
          text-[#6f687b]
        "
      >
        {label}
      </div>

      <div
        className={`
          mt-2
          text-4xl
          font-bold

          ${
            accent
              ? "text-violet-300"
              : "text-white"
          }
        `}
      >
        {value}
      </div>

      <div
        className="
          mt-1
          text-sm
          text-[#777081]
        "
      >
        {description}
      </div>
    </div>
  );
}

/* =========================================================
   MINI FEATURE
========================================================= */

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
        transition
        hover:border-violet-400/20
        hover:bg-violet-500/[0.025]
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

      <div
        className="
          mt-2
          font-semibold
          text-white
        "
      >
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

/* =========================================================
   LEGEND
========================================================= */

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

/* =========================================================
   LOCATION CHIP
========================================================= */

function LocationChip({
  name,
}: {
  name: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        rounded-xl
        border
        border-violet-400/10
        bg-[#0d0a17]
        px-4
        py-3
      "
    >
      <span
        className="
          h-2
          w-2
          shrink-0
          rounded-full
          bg-violet-500
          shadow-[0_0_9px_rgba(139,92,246,.65)]
        "
      />

      <span
        className="
          text-sm
          font-medium
          text-[#b6afc1]
        "
      >
        {name}
      </span>
    </div>
  );
}

/* =========================================================
   WORKFLOW
========================================================= */

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

      <div
        className="
          mt-4
          font-semibold
          text-white
        "
      >
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