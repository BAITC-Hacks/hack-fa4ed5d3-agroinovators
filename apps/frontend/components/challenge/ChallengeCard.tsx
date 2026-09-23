import Link from "next/link";

import {
  BedDouble,
  BriefcaseBusiness,
  Building2,
  CircleDollarSign,
  MapPin,
  Sprout,
  Users,
} from "lucide-react";

export interface CatalogChallenge {
  id: string;

  title: string;
  description: string;

  organization: string;

  specialist: string;

  requiredCount: number;

  employmentType: string;

  employmentPeriod?: string;

  skills: string[];

  salary?: string;

  accommodation: boolean | null;

  contact: string;

  score: number;

  location: string;

  district?: string;

  region: string;

  demandLevel:
    | "high"
    | "medium"
    | "open";

  applicationProcedure?: string;

  productionType?: string;

  isNew?: boolean;
}

export function ChallengeCard({
  challenge,
}: {
  challenge: CatalogChallenge;
}) {
  const readiness =
    getReadinessMeta(
      challenge.score,
    );

  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-violet-400/10
        bg-[#0d0a17]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-violet-400/30
        hover:shadow-[0_24px_70px_rgba(76,29,149,.16)]
      "
    >
      {/* ================================================
          TOP
      ================================================ */}

      <div className="p-5 sm:p-6">
        <div
          className="
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
          "
        >
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-violet-500/10
              px-3
              py-1.5
              text-xs
              font-medium
              text-violet-300
            "
          >
            <Sprout size={13} />

            {specialistLabel(
              challenge.specialist,
            )}
          </div>

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            {challenge.isNew && (
              <span
                className="
                  rounded-full
                  border
                  border-fuchsia-400/20
                  bg-fuchsia-500/10
                  px-2.5
                  py-1
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.1em]
                  text-fuchsia-300
                "
              >
                New
              </span>
            )}

            <span
              className={`
                rounded-full
                border
                px-2.5
                py-1
                text-[10px]
                font-medium
                ${readiness.badge}
              `}
            >
              {readiness.label}
            </span>
          </div>
        </div>

        {/* ================================================
            TITLE
        ================================================ */}

        <h2
          className="
            mt-5
            text-xl
            font-bold
            leading-snug
            text-white
            transition-colors
            group-hover:text-violet-200
          "
        >
          {challenge.title}
        </h2>

        <p
          className="
            mt-3
            line-clamp-2
            text-sm
            leading-6
            text-[#888191]
          "
        >
          {challenge.description}
        </p>

        {/* ================================================
            ORGANIZATION
        ================================================ */}

        <div
          className="
            mt-5
            space-y-2
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              text-sm
              text-[#a39baa]
            "
          >
            <Building2
              size={15}
              className="
                shrink-0
                text-violet-400
              "
            />

            <span className="truncate">
              {
                challenge.organization
              }
            </span>
          </div>

          <div
            className="
              flex
              items-start
              gap-2
              text-sm
              text-[#81798b]
            "
          >
            <MapPin
              size={15}
              className="
                mt-0.5
                shrink-0
                text-violet-400
              "
            />

            <span>
              {challenge.location}

              {challenge.district &&
                ` · ${challenge.district}`}
            </span>
          </div>
        </div>

        {/* ================================================
            QUICK INFORMATION
        ================================================ */}

        <div
          className="
            mt-5
            grid
            grid-cols-2
            gap-2
          "
        >
          <InfoBox
            icon={
              <Users size={14} />
            }
            label="Требуется"
            value={`${challenge.requiredCount} ${specialistCountLabel(
              challenge.requiredCount,
            )}`}
          />

          <InfoBox
            icon={
              <BriefcaseBusiness
                size={14}
              />
            }
            label="Формат"
            value={employmentLabel(
              challenge.employmentType,
            )}
          />

          <InfoBox
            icon={
              <CircleDollarSign
                size={14}
              />
            }
            label="Оплата"
            value={
              challenge.salary ||
              "Не указана"
            }
          />

          <InfoBox
            icon={
              <BedDouble
                size={14}
              />
            }
            label="Проживание"
            value={
              challenge.accommodation ===
              true
                ? "Есть"
                : challenge.accommodation ===
                    false
                  ? "Нет"
                  : "Не указано"
            }
          />
        </div>

        {/* ================================================
            SKILLS
        ================================================ */}

        {challenge.skills.length >
          0 && (
          <div
            className="
              mt-5
              flex
              flex-wrap
              gap-2
            "
          >
            {challenge.skills
              .slice(0, 3)
              .map((skill) => (
                <span
                  key={skill}
                  className="
                    rounded-lg
                    border
                    border-violet-400/10
                    bg-violet-500/[0.05]
                    px-2.5
                    py-1.5
                    text-[11px]
                    text-[#aaa2b5]
                  "
                >
                  {skill}
                </span>
              ))}

            {challenge.skills.length >
              3 && (
              <span
                className="
                  rounded-lg
                  bg-white/[0.03]
                  px-2.5
                  py-1.5
                  text-[11px]
                  text-[#746d7e]
                "
              >
                +
                {challenge.skills
                  .length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* ================================================
          READINESS
      ================================================ */}

      <div
        className="
          mt-auto
          border-t
          border-violet-400/10
          px-5
          py-5
          sm:px-6
        "
      >
        <div
          className="
            flex
            items-end
            justify-between
            gap-4
          "
        >
          <div>
            <div
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.14em]
                text-[#6f687a]
              "
            >
              Agricultural Demand Readiness
            </div>

            <div
              className="
                mt-1
                text-xs
                text-[#746d80]
              "
            >
              {readiness.description}
            </div>
          </div>

          <div
            className={`
              text-2xl
              font-bold
              ${readiness.score}
            `}
          >
            {challenge.score}

            <span
              className="
                ml-0.5
                text-xs
                font-normal
                text-[#665f70]
              "
            >
              /100
            </span>
          </div>
        </div>

        <div
          className="
            mt-3
            h-1.5
            overflow-hidden
            rounded-full
            bg-white/[0.06]
          "
        >
          <div
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-violet-600
              via-purple-500
              to-fuchsia-400
            "
            style={{
              width: `${challenge.score}%`,
            }}
          />
        </div>

        {/* ================================================
            ACTIONS
        ================================================ */}

        <div
          className="
            mt-5
            grid
            grid-cols-2
            gap-2
          "
        >
          <Link
            href={`/map`}
            className="
              flex
              min-h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-violet-400/15
              text-sm
              font-medium
              text-violet-200
              transition
              hover:bg-violet-500/10
            "
          >
            <MapPin size={14} />

            На карте
          </Link>

          <Link
            href={`/challenges/${challenge.id}`}
            className="
              flex
              min-h-11
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-r
              from-violet-600
              to-purple-600
              px-3
              text-sm
              font-semibold
              text-white
              transition
              hover:from-violet-500
              hover:to-purple-500
            "
          >
            Подробнее
          </Link>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   INFO
========================================================= */

function InfoBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        min-w-0
        rounded-xl
        bg-white/[0.025]
        p-3
      "
    >
      <div
        className="
          flex
          items-center
          gap-1.5
          text-[10px]
          uppercase
          tracking-[0.08em]
          text-[#696273]
        "
      >
        <span className="text-violet-400">
          {icon}
        </span>

        {label}
      </div>

      <div
        className="
          mt-1.5
          truncate
          text-xs
          font-medium
          text-[#bbb3c5]
        "
        title={value}
      >
        {value}
      </div>
    </div>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function getReadinessMeta(
  score: number,
) {
  if (score >= 90) {
    return {
      label: "Priority",
      description:
        "Полностью готов к откликам",
      badge:
        "border-violet-400/20 bg-violet-500/10 text-violet-300",
      score: "text-violet-300",
    };
  }

  if (score >= 70) {
    return {
      label: "Ready",
      description:
        "Готов к публикации",
      badge:
        "border-emerald-400/20 bg-emerald-500/10 text-emerald-300",
      score: "text-emerald-300",
    };
  }

  if (score >= 40) {
    return {
      label: "Working",
      description:
        "Нужно дополнить данные",
      badge:
        "border-amber-400/20 bg-amber-500/10 text-amber-300",
      score: "text-amber-300",
    };
  }

  return {
    label: "Draft",
    description:
      "Информации недостаточно",
    badge:
      "border-white/10 bg-white/[0.04] text-[#8d8698]",
    score: "text-[#8d8698]",
  };
}

function specialistLabel(
  specialist: string,
) {
  const labels: Record<
    string,
    string
  > = {
    Agronomist: "Агроном",
    Veterinarian: "Ветеринар",
    Biotechnologist: "Биотехнолог",
    "Agri-engineer": "Агроинженер",
    "Soil scientist": "Почвовед",
    "Plant protection specialist":
      "Защита растений",
    "Food technologist":
      "Пищевой технолог",
    "Laboratory specialist":
      "Лабораторный специалист",
  };

  return (
    labels[specialist] ||
    specialist ||
    "Специалист"
  );
}

function employmentLabel(
  employment: string,
) {
  const labels: Record<
    string,
    string
  > = {
    Internship: "Стажировка",
    "Full-time": "Полная занятость",
    "Part-time":
      "Частичная занятость",
    Seasonal: "Сезонная работа",
    "Research project":
      "Исследовательский проект",
  };

  return (
    labels[employment] ||
    employment ||
    "Не указано"
  );
}

function specialistCountLabel(
  count: number,
) {
  if (count === 1) {
    return "специалист";
  }

  if (
    count >= 2 &&
    count <= 4
  ) {
    return "специалиста";
  }

  return "специалистов";
}