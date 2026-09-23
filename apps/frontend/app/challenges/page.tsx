"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  ChevronDown,
  Filter,
  Map,
  RotateCcw,
  Search,
  Sparkles,
  Sprout,
  Users,
} from "lucide-react";

import {
  ChallengeCard,
  type CatalogChallenge,
} from "@/components/challenge/ChallengeCard";

import { agroDemands } from "@/data/agro-demands";

/* =========================================================
   TYPES
========================================================= */

type StoredDemand = {
  rawNeed?: string;
  organization?: string;

  region?: string;
  district?: string;
  locality?: string;

  specialist?: string;

  requiredCount?: number;

  skills?: string[];

  employmentType?: string;
  employmentPeriod?: string;

  salary?: string;

  accommodation?:
    | "yes"
    | "no"
    | "";

  contact?: string;

  applicationProcedure?: string;

  productionType?: string;

  readinessScore?: number;
};

/* =========================================================
   STATIC DATA
========================================================= */

const staticChallenges:
  CatalogChallenge[] =
  agroDemands.map((demand) => ({
    id: demand.id,

    title: demand.title,

    description:
      demand.description,

    organization:
      demand.organization,

    specialist:
      demand.specialist,

    requiredCount:
      demand.requiredCount,

    employmentType:
      demand.employmentType,

    skills:
      demand.skills,

    salary:
      demand.salary,

    accommodation:
      demand.accommodation,

    contact:
      demand.contact,

    score:
      demand.readinessScore,

    location:
      demand.location.locality,

    district:
      demand.location.district,

    region:
      demand.location.region,

    demandLevel:
      demand.demandLevel,
  }));

/* =========================================================
   PAGE
========================================================= */

export default function ChallengesPage() {
  const [
    publishedChallenge,
    setPublishedChallenge,
  ] =
    useState<CatalogChallenge | null>(
      null,
    );

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    specialistFilter,
    setSpecialistFilter,
  ] = useState("all");

  const [
    locationFilter,
    setLocationFilter,
  ] = useState("all");

  const [
    employmentFilter,
    setEmploymentFilter,
  ] = useState("all");

  const [
    readinessFilter,
    setReadinessFilter,
  ] = useState("all");

  /* =======================================================
     LOAD NEWLY PUBLISHED DEMAND
  ======================================================= */

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(
          "taskatlas-last-published-demand",
        );

      if (!stored) {
        return;
      }

      const demand =
        JSON.parse(
          stored,
        ) as StoredDemand;

      if (
        !demand.organization ||
        !demand.locality
      ) {
        return;
      }

      const score =
        demand.readinessScore ??
        0;

      const challenge:
        CatalogChallenge = {
        id: "published-demand",

        title: demand.specialist
          ? `${specialistLabel(
              demand.specialist,
            )} — ${demand.locality}`
          : `Аграрная потребность — ${demand.locality}`,

        description:
          demand.rawNeed ||
          "Новая потребность сельскохозяйственной организации.",

        organization:
          demand.organization,

        specialist:
          demand.specialist ||
          "Не указано",

        requiredCount:
          demand.requiredCount ??
          0,

        employmentType:
          demand.employmentType ||
          "Не указано",

        employmentPeriod:
          demand.employmentPeriod,

        skills:
          Array.isArray(
            demand.skills,
          )
            ? demand.skills
            : [],

        salary:
          demand.salary,

        accommodation:
          demand.accommodation ===
          "yes"
            ? true
            : demand.accommodation ===
                "no"
              ? false
              : null,

        contact:
          demand.contact ||
          "Не указано",

        score,

        location:
          demand.locality,

        district:
          demand.district,

        region:
          demand.region ||
          "Северо-Казахстанская область",

        demandLevel:
          score >= 90
            ? "high"
            : score >= 70
              ? "medium"
              : "open",

        applicationProcedure:
          demand.applicationProcedure,

        productionType:
          demand.productionType,

        isNew: true,
      };

      setPublishedChallenge(
        challenge,
      );
    } catch {
      console.warn(
        "Could not load published demand",
      );
    }
  }, []);

  /* =======================================================
     ALL CHALLENGES
  ======================================================= */

  const allChallenges =
    useMemo(() => {
      if (!publishedChallenge) {
        return staticChallenges;
      }

      return [
        publishedChallenge,
        ...staticChallenges,
      ];
    }, [publishedChallenge]);

  /* =======================================================
     OPTIONS
  ======================================================= */

  const specialistOptions =
    useMemo(
      () =>
        Array.from(
          new Set(
            allChallenges
              .map(
                (challenge) =>
                  challenge.specialist,
              )
              .filter(
                (value) =>
                  value &&
                  value !==
                    "Не указано",
              ),
          ),
        ).sort(),
      [allChallenges],
    );

  const locationOptions =
    useMemo(
      () =>
        Array.from(
          new Set(
            allChallenges.map(
              (challenge) =>
                challenge.location,
            ),
          ),
        ).sort((a, b) =>
          a.localeCompare(
            b,
            "ru",
          ),
        ),
      [allChallenges],
    );

  const employmentOptions =
    useMemo(
      () =>
        Array.from(
          new Set(
            allChallenges
              .map(
                (challenge) =>
                  challenge.employmentType,
              )
              .filter(
                (value) =>
                  value &&
                  value !==
                    "Не указано",
              ),
          ),
        ).sort(),
      [allChallenges],
    );

  /* =======================================================
     FILTERING
  ======================================================= */

  const filteredChallenges =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return allChallenges.filter(
        (challenge) => {
          const matchesSearch =
            !query ||
            challenge.title
              .toLowerCase()
              .includes(query) ||
            challenge.organization
              .toLowerCase()
              .includes(query) ||
            challenge.location
              .toLowerCase()
              .includes(query) ||
            challenge.skills.some(
              (skill) =>
                skill
                  .toLowerCase()
                  .includes(
                    query,
                  ),
            );

          const matchesSpecialist =
            specialistFilter ===
              "all" ||
            challenge.specialist ===
              specialistFilter;

          const matchesLocation =
            locationFilter ===
              "all" ||
            challenge.location ===
              locationFilter;

          const matchesEmployment =
            employmentFilter ===
              "all" ||
            challenge.employmentType ===
              employmentFilter;

          const matchesReadiness =
            readinessMatches(
              challenge.score,
              readinessFilter,
            );

          return (
            matchesSearch &&
            matchesSpecialist &&
            matchesLocation &&
            matchesEmployment &&
            matchesReadiness
          );
        },
      );
    }, [
      allChallenges,
      search,
      specialistFilter,
      locationFilter,
      employmentFilter,
      readinessFilter,
    ]);

  /* =======================================================
     STATS
  ======================================================= */

  const totalSpecialists =
    allChallenges.reduce(
      (sum, challenge) =>
        sum +
        challenge.requiredCount,
      0,
    );

  const totalLocations =
    new Set(
      allChallenges.map(
        (challenge) =>
          challenge.location,
      ),
    ).size;

  const priorityCount =
    allChallenges.filter(
      (challenge) =>
        challenge.score >= 90,
    ).length;

  function resetFilters() {
    setSearch("");
    setSpecialistFilter("all");
    setLocationFilter("all");
    setEmploymentFilter("all");
    setReadinessFilter("all");
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#070611]
        pb-24
      "
    >
      {/* BACKGROUND */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-[-240px]
            h-[650px]
            w-[950px]
            -translate-x-1/2
            rounded-full
            bg-violet-600/[0.10]
            blur-[160px]
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
        {/* ===============================================
            HEADER
        =============================================== */}

        <section
          className="
            flex
            flex-col
            justify-between
            gap-7
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
              <Sprout size={14} />

              Agricultural Demand Catalog
            </div>

            <h1
              className="
                text-4xl
                font-bold
                tracking-[-0.03em]
                text-white
                sm:text-5xl
              "
            >
              Открытые{" "}
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
                аграрные потребности
              </span>
            </h1>

            <p
              className="
                mt-4
                max-w-3xl
                text-base
                leading-7
                text-[#91899d]
              "
            >
              Найдите организацию, которой
              нужны ваши навыки. Изучите
              требования, условия, readiness
              score и отправьте предложение
              напрямую через TaskAtlas AI.
            </p>
          </div>

          <div
            className="
              flex
              flex-wrap
              gap-3
            "
          >
            <Link
              href="/map"
              className="
                flex
                min-h-11
                items-center
                gap-2
                rounded-xl
                border
                border-violet-400/15
                px-4
                text-sm
                font-medium
                text-violet-200
                transition
                hover:bg-violet-500/10
              "
            >
              <Map size={16} />

              Открыть карту
            </Link>

            <Link
              href="/create"
              className="
                flex
                min-h-11
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-violet-600
                to-purple-600
                px-4
                text-sm
                font-semibold
                text-white
                transition
                hover:from-violet-500
                hover:to-purple-500
              "
            >
              <Sparkles size={16} />

              Создать запрос
            </Link>
          </div>
        </section>

        {/* ===============================================
            STATS
        =============================================== */}

        <section
          className="
            mt-8
            grid
            gap-3
            sm:grid-cols-3
          "
        >
          <StatCard
            value={
              allChallenges.length
            }
            label="активных запросов"
          />

          <StatCard
            value={totalSpecialists}
            label="открытых мест"
          />

          <StatCard
            value={priorityCount}
            label="Priority запросов"
            accent
          />
        </section>

        {/* ===============================================
            FILTERS
        =============================================== */}

        <section
          className="
            mt-8
            rounded-2xl
            border
            border-violet-400/10
            bg-[#0d0918]
            p-4
            sm:p-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-white
            "
          >
            <Filter
              size={16}
              className="text-violet-400"
            />

            Найти подходящую потребность
          </div>

          <div
            className="
              mt-4
              grid
              gap-3
              md:grid-cols-2
              xl:grid-cols-5
            "
          >
            {/* SEARCH */}

            <div className="relative">
              <Search
                size={16}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-[#716a7e]
                "
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value,
                  )
                }
                placeholder="Поиск..."
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-violet-400/15
                  bg-[#151124]
                  pl-11
                  pr-4
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-[#5e5768]
                  focus:border-violet-400/50
                "
              />
            </div>

            <FilterSelect
              value={specialistFilter}
              onChange={
                setSpecialistFilter
              }
            >
              <option value="all">
                Все специальности
              </option>

              {specialistOptions.map(
                (option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {specialistLabel(
                      option,
                    )}
                  </option>
                ),
              )}
            </FilterSelect>

            <FilterSelect
              value={locationFilter}
              onChange={
                setLocationFilter
              }
            >
              <option value="all">
                Все локации
              </option>

              {locationOptions.map(
                (option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                ),
              )}
            </FilterSelect>

            <FilterSelect
              value={employmentFilter}
              onChange={
                setEmploymentFilter
              }
            >
              <option value="all">
                Все форматы
              </option>

              {employmentOptions.map(
                (option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {employmentLabel(
                      option,
                    )}
                  </option>
                ),
              )}
            </FilterSelect>

            <FilterSelect
              value={readinessFilter}
              onChange={
                setReadinessFilter
              }
            >
              <option value="all">
                Любой Readiness
              </option>

              <option value="priority">
                Priority · 90–100
              </option>

              <option value="ready">
                Ready · 70–89
              </option>

              <option value="working">
                Working · 40–69
              </option>

              <option value="draft">
                Draft · 0–39
              </option>
            </FilterSelect>
          </div>

          <div
            className="
              mt-4
              flex
              flex-wrap
              items-center
              justify-between
              gap-3
              border-t
              border-white/[0.05]
              pt-4
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
                text-xs
                text-[#777081]
              "
            >
              <Users size={14} />

              Найдено{" "}
              <span className="font-semibold text-white">
                {
                  filteredChallenges.length
                }
              </span>{" "}
              запросов в{" "}
              <span className="font-semibold text-white">
                {totalLocations}
              </span>{" "}
              локациях
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="
                flex
                items-center
                gap-2
                text-xs
                text-[#81798d]
                transition
                hover:text-violet-300
              "
            >
              <RotateCcw size={13} />

              Сбросить фильтры
            </button>
          </div>
        </section>

        {/* ===============================================
            GRID
        =============================================== */}

        {filteredChallenges.length >
        0 ? (
          <section
            className="
              mt-7
              grid
              gap-5
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {filteredChallenges.map(
              (challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={
                    challenge
                  }
                />
              ),
            )}
          </section>
        ) : (
          <section
            className="
              mt-7
              rounded-3xl
              border
              border-violet-400/10
              bg-[#0d0918]
              px-6
              py-16
              text-center
            "
          >
            <Search
              size={28}
              className="
                mx-auto
                text-violet-400
              "
            />

            <h2
              className="
                mt-4
                text-xl
                font-semibold
                text-white
              "
            >
              Подходящих запросов нет
            </h2>

            <p
              className="
                mx-auto
                mt-2
                max-w-md
                text-sm
                leading-6
                text-[#777081]
              "
            >
              Попробуйте изменить
              специальность, формат работы
              или населённый пункт.
            </p>

            <button
              onClick={resetFilters}
              className="
                mt-5
                rounded-xl
                bg-violet-600
                px-4
                py-2.5
                text-sm
                font-medium
                text-white
              "
            >
              Показать все
            </button>
          </section>
        )}
      </div>
    </main>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function StatCard({
  value,
  label,
  accent = false,
}: {
  value: number;
  label: string;
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
        className={`
          text-3xl
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
          text-[#746d80]
        "
      >
        {label}
      </div>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (
    value: string,
  ) => void;
  children:
    React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        className="
          h-12
          w-full
          appearance-none
          rounded-xl
          border
          border-violet-400/15
          bg-[#151124]
          px-4
          pr-10
          text-sm
          text-white
          outline-none
          focus:border-violet-400/50
        "
      >
        {children}
      </select>

      <ChevronDown
        size={15}
        className="
          pointer-events-none
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-[#746d80]
        "
      />
    </div>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function readinessMatches(
  score: number,
  filter: string,
) {
  if (filter === "priority") {
    return score >= 90;
  }

  if (filter === "ready") {
    return (
      score >= 70 &&
      score <= 89
    );
  }

  if (filter === "working") {
    return (
      score >= 40 &&
      score <= 69
    );
  }

  if (filter === "draft") {
    return score <= 39;
  }

  return true;
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
    "Agri-engineer":
      "Агроинженер",
    "Soil scientist": "Почвовед",
    "Plant protection specialist":
      "Специалист по защите растений",
    "Food technologist":
      "Пищевой технолог",
    "Laboratory specialist":
      "Лабораторный специалист",
  };

  return (
    labels[specialist] ||
    specialist
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
    "Full-time":
      "Полная занятость",
    "Part-time":
      "Частичная занятость",
    Seasonal:
      "Сезонная работа",
    "Research project":
      "Исследовательский проект",
  };

  return (
    labels[employment] ||
    employment
  );
}