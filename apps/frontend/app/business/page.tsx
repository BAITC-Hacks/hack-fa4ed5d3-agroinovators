"use client";

import Link from "next/link";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  MapPin,
  Plus,
  Sparkles,
  Users,
} from "lucide-react";

type ApplicationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "CONTACTED";

type StoredApplication = {
  id: string;
  challengeId: string;
  challengeTitle: string;
  organization: string;
  applicantName: string;
  applicantRole: string;
  skills: string[];
  availability: string;
  proposal: string;
  status: ApplicationStatus;
  createdAt: string;
};

type StoredDemand = {
  rawNeed?: string;
  organization?: string;
  locality?: string;
  district?: string;
  specialist?: string;
  requiredCount?: number;
  readinessScore?: number;
};

type BusinessDemand = {
  id: string;
  title: string;
  location: string;
  specialist: string;
  requiredCount: number;
  score: number;
  applications: number;
};

const demoDemands: BusinessDemand[] = [
  {
    id: "sovetskoye-agronomists",
    title:
      "Агрономы для мониторинга состояния посевов",
    location: "Советское",
    specialist: "Agronomist",
    requiredCount: 3,
    score: 90,
    applications: 4,
  },
  {
    id: "petropavlovsk-biotechnology",
    title:
      "Стажировка по агробиотехнологиям",
    location: "Петропавловск",
    specialist: "Biotechnologist",
    requiredCount: 2,
    score: 82,
    applications: 3,
  },
];

export default function BusinessPage() {
  const [
    applications,
    setApplications,
  ] = useState<StoredApplication[]>(
    [],
  );

  const [
    publishedDemand,
    setPublishedDemand,
  ] = useState<BusinessDemand | null>(
    null,
  );

  useEffect(() => {
    try {
      const storedApplications =
        localStorage.getItem(
          "taskatlas-applications",
        );

      if (storedApplications) {
        setApplications(
          JSON.parse(
            storedApplications,
          ) as StoredApplication[],
        );
      }

      const storedDemand =
        localStorage.getItem(
          "taskatlas-last-published-demand",
        );

      if (storedDemand) {
        const demand =
          JSON.parse(
            storedDemand,
          ) as StoredDemand;

        if (
          demand.locality &&
          demand.organization
        ) {
          setPublishedDemand({
            id: "published-demand",

            title:
              demand.specialist
                ? `${specialistLabel(
                    demand.specialist,
                  )} — ${
                    demand.locality
                  }`
                : `Аграрная потребность — ${demand.locality}`,

            location:
              demand.locality,

            specialist:
              demand.specialist ||
              "Не указано",

            requiredCount:
              demand.requiredCount ??
              0,

            score:
              demand.readinessScore ??
              0,

            applications:
              applications.filter(
                (application) =>
                  application.challengeId ===
                  "published-demand",
              ).length,
          });
        }
      }
    } catch {
      console.warn(
        "Unable to load business dashboard data.",
      );
    }
  }, []);

  const demands = useMemo(() => {
    if (!publishedDemand) {
      return demoDemands;
    }

    return [
      publishedDemand,
      ...demoDemands,
    ];
  }, [publishedDemand]);

  const acceptedApplications =
    applications.filter(
      (application) =>
        application.status ===
        "ACCEPTED",
    ).length;

  const pendingApplications =
    applications.filter(
      (application) =>
        application.status ===
        "PENDING",
    ).length;

  const averageReadiness =
    Math.round(
      demands.reduce(
        (sum, demand) =>
          sum + demand.score,
        0,
      ) / demands.length,
    );

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
      <div className="pointer-events-none fixed inset-0">
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
        {/* HEADER */}

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
          <div className="max-w-3xl">
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
              <BriefcaseBusiness
                size={14}
              />

              Business Workspace
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
              Панель{" "}
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
                организации
              </span>
            </h1>

            <p
              className="
                mt-4
                max-w-2xl
                text-base
                leading-7
                text-[#91899d]
              "
            >
              Управляйте аграрными
              потребностями, отслеживайте
              readiness score и вручную
              рассматривайте заявки
              студентов и специалистов.
            </p>
          </div>

          <Link
            href="/create"
            className="
              flex
              min-h-12
              w-fit
              items-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-violet-600
              to-purple-600
              px-5
              text-sm
              font-semibold
              text-white
              transition
              hover:from-violet-500
              hover:to-purple-500
            "
          >
            <Plus size={17} />

            Создать потребность
          </Link>
        </section>

        {/* STATS */}

        <section
          className="
            mt-9
            grid
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          <DashboardStat
            icon={
              <BriefcaseBusiness
                size={19}
              />
            }
            label="Активные запросы"
            value={demands.length}
            description="опубликовано"
          />

          <DashboardStat
            icon={<Users size={19} />}
            label="Заявки"
            value={applications.length}
            description={`${pendingApplications} ожидают решения`}
          />

          <DashboardStat
            icon={
              <Sparkles size={19} />
            }
            label="Средний Readiness"
            value={averageReadiness}
            description="из 100"
            suffix="/100"
          />

          <DashboardStat
            icon={
              <CheckCircle2
                size={19}
              />
            }
            label="Принято"
            value={acceptedApplications}
            description="кандидатов"
            accent
          />
        </section>

        {/* CONTENT */}

        <div
          className="
            mt-8
            grid
            gap-6
            xl:grid-cols-[minmax(0,1fr)_420px]
          "
        >
          {/* MY DEMANDS */}

          <section
            className="
              rounded-3xl
              border
              border-violet-400/10
              bg-[#0d0918]
              p-5
              sm:p-6
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-4
              "
            >
              <div>
                <h2
                  className="
                    text-xl
                    font-semibold
                    text-white
                  "
                >
                  Мои потребности
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-[#777081]
                  "
                >
                  Опубликованные запросы
                  организации.
                </p>
              </div>

              <Link
                href="/create"
                className="
                  text-sm
                  text-violet-300
                  hover:text-violet-200
                "
              >
                + Добавить
              </Link>
            </div>

            <div
              className="
                mt-6
                space-y-3
              "
            >
              {demands.map(
                (demand) => (
                  <DemandRow
                    key={demand.id}
                    demand={demand}
                  />
                ),
              )}
            </div>
          </section>

          {/* APPLICATIONS */}

          <section
            className="
              rounded-3xl
              border
              border-violet-400/10
              bg-[#0d0918]
              p-5
              sm:p-6
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-4
              "
            >
              <div>
                <h2
                  className="
                    text-xl
                    font-semibold
                    text-white
                  "
                >
                  Последние заявки
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-[#777081]
                  "
                >
                  Кандидаты, которые
                  откликнулись на запросы.
                </p>
              </div>

              <Link
                href="/business/applications"
                className="
                  flex
                  items-center
                  gap-1
                  text-sm
                  text-violet-300
                "
              >
                Все

                <ArrowRight
                  size={14}
                />
              </Link>
            </div>

            <div
              className="
                mt-6
                space-y-3
              "
            >
              {applications.length >
              0 ? (
                applications
                  .slice(0, 4)
                  .map(
                    (
                      application,
                    ) => (
                      <ApplicationPreview
                        key={
                          application.id
                        }
                        application={
                          application
                        }
                      />
                    ),
                  )
              ) : (
                <div
                  className="
                    rounded-2xl
                    border
                    border-violet-400/10
                    bg-white/[0.02]
                    p-6
                    text-center
                  "
                >
                  <Clock3
                    size={22}
                    className="
                      mx-auto
                      text-violet-400
                    "
                  />

                  <div
                    className="
                      mt-3
                      font-medium
                      text-white
                    "
                  >
                    Пока нет заявок
                  </div>

                  <div
                    className="
                      mt-1
                      text-sm
                      text-[#777081]
                    "
                  >
                    Новые отклики
                    появятся здесь.
                  </div>

                  <Link
                    href="/business/applications"
                    className="
                      mt-4
                      inline-flex
                      text-sm
                      text-violet-300
                    "
                  >
                    Открыть центр заявок
                  </Link>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* WORKFLOW */}

        <section
          className="
            mt-8
            rounded-3xl
            border
            border-violet-400/10
            bg-[#0d0918]
            p-6
          "
        >
          <div
            className="
              text-xs
              uppercase
              tracking-[0.14em]
              text-violet-400
            "
          >
            Business workflow
          </div>

          <h2
            className="
              mt-2
              text-2xl
              font-bold
              text-white
            "
          >
            Решение всегда остаётся за
            организацией
          </h2>

          <p
            className="
              mt-2
              max-w-3xl
              text-sm
              leading-6
              text-[#81798c]
            "
          >
            TaskAtlas AI помогает создать
            качественный запрос и найти
            подходящих кандидатов, но система
            не назначает специалистов
            автоматически. Организация сама
            принимает, отклоняет или связывается
            с кандидатами.
          </p>
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   DASHBOARD STAT
========================================================= */

function DashboardStat({
  icon,
  label,
  value,
  description,
  suffix,
  accent = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  description: string;
  suffix?: string;
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
          flex
          items-center
          justify-between
        "
      >
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

        <div
          className="
            text-xs
            text-[#6d6678]
          "
        >
          {label}
        </div>
      </div>

      <div
        className={`
          mt-5
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

        {suffix && (
          <span
            className="
              ml-1
              text-sm
              font-normal
              text-[#696273]
            "
          >
            {suffix}
          </span>
        )}
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
   DEMAND ROW
========================================================= */

function DemandRow({
  demand,
}: {
  demand: BusinessDemand;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-violet-400/10
        bg-white/[0.02]
        p-4
      "
    >
      <div
        className="
          flex
          flex-col
          justify-between
          gap-4
          md:flex-row
          md:items-center
        "
      >
        <div className="min-w-0">
          <div
            className="
              truncate
              font-semibold
              text-white
            "
          >
            {demand.title}
          </div>

          <div
            className="
              mt-2
              flex
              flex-wrap
              gap-x-4
              gap-y-2
              text-xs
              text-[#7c7587]
            "
          >
            <span
              className="
                flex
                items-center
                gap-1.5
              "
            >
              <MapPin
                size={12}
              />

              {demand.location}
            </span>

            <span
              className="
                flex
                items-center
                gap-1.5
              "
            >
              <Users
                size={12}
              />

              {demand.requiredCount} мест
            </span>

            <span>
              {demand.applications} заявок
            </span>
          </div>
        </div>

        <div
          className="
            flex
            items-center
            gap-4
          "
        >
          <div
            className="
              min-w-[100px]
              text-right
            "
          >
            <div
              className="
                text-lg
                font-bold
                text-violet-300
              "
            >
              {demand.score}/100
            </div>

            <div
              className="
                text-[10px]
                uppercase
                text-[#6d6678]
              "
            >
              readiness
            </div>
          </div>

          <Link
            href={`/challenges/${demand.id}`}
            className="
              rounded-xl
              border
              border-violet-400/15
              px-4
              py-2
              text-sm
              text-violet-200
              transition
              hover:bg-violet-500/10
            "
          >
            Открыть
          </Link>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   APPLICATION PREVIEW
========================================================= */

function ApplicationPreview({
  application,
}: {
  application: StoredApplication;
}) {
  return (
    <Link
      href="/business/applications"
      className="
        block
        rounded-2xl
        border
        border-violet-400/10
        bg-white/[0.02]
        p-4
        transition
        hover:border-violet-400/25
        hover:bg-violet-500/[0.04]
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-3
        "
      >
        <div>
          <div
            className="
              font-medium
              text-white
            "
          >
            {application.applicantName}
          </div>

          <div
            className="
              mt-1
              text-xs
              text-[#7d7589]
            "
          >
            {application.applicantRole}
          </div>
        </div>

        <StatusBadge
          status={
            application.status
          }
        />
      </div>

      <div
        className="
          mt-3
          line-clamp-2
          text-xs
          leading-5
          text-[#8a8294]
        "
      >
        {application.proposal}
      </div>
    </Link>
  );
}

/* =========================================================
   STATUS
========================================================= */

function StatusBadge({
  status,
}: {
  status: ApplicationStatus;
}) {
  const styles = {
    PENDING:
      "bg-amber-500/10 text-amber-300",
    ACCEPTED:
      "bg-emerald-500/10 text-emerald-300",
    REJECTED:
      "bg-red-500/10 text-red-300",
    CONTACTED:
      "bg-violet-500/10 text-violet-300",
  };

  const labels = {
    PENDING: "Новая",
    ACCEPTED: "Принята",
    REJECTED: "Отклонена",
    CONTACTED: "Связались",
  };

  return (
    <span
      className={`
        rounded-full
        px-2.5
        py-1
        text-[10px]
        font-medium
        ${styles[status]}
      `}
    >
      {labels[status]}
    </span>
  );
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
    Biotechnologist:
      "Биотехнолог",
    "Agri-engineer":
      "Агроинженер",
    "Soil scientist":
      "Почвовед",
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