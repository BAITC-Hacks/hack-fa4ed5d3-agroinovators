"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowLeft,
  Check,
  Clock3,
  Mail,
  Search,
  UserRound,
  Users,
  X,
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

/* =========================================================
   DEMO APPLICATIONS
========================================================= */

const demoApplications:
  StoredApplication[] = [
    {
      id: "demo-aruzhan",

      challengeId:
        "petropavlovsk-biotechnology",

      challengeTitle:
        "Стажировка по агробиотехнологиям",

      organization:
        "Агробиотехнологическая лаборатория",

      applicantName:
        "Aruzhan Tolebay",

      applicantRole:
        "Biotechnology student",

      skills: [
        "PCR",
        "Laboratory analysis",
        "Plant biology",
      ],

      availability:
        "June–August",

      proposal:
        "I can assist with plant disease diagnostics, laboratory analysis and biological sample preparation.",

      status:
        "PENDING",

      createdAt:
        new Date().toISOString(),
    },

    {
      id: "demo-dias",

      challengeId:
        "sovetskoye-agronomists",

      challengeTitle:
        "Агрономы для мониторинга состояния посевов",

      organization:
        "Сельскохозяйственное предприятие",

      applicantName:
        "Dias Sarsenov",

      applicantRole:
        "Agronomy student",

      skills: [
        "GIS",
        "Crop monitoring",
        "Soil analysis",
      ],

      availability:
        "May–September",

      proposal:
        "I have experience with field monitoring and GIS-based crop analysis and would like to join the seasonal field team.",

      status:
        "PENDING",

      createdAt:
        new Date().toISOString(),
    },
  ];

/* =========================================================
   PAGE
========================================================= */

export default function ApplicationsPage() {
  const [
    applications,
    setApplications,
  ] =
    useState<StoredApplication[]>(
      [],
    );

  const [
    search,
    setSearch,
  ] =
    useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] =
    useState<
      ApplicationStatus | "ALL"
    >("ALL");

  /* =======================================================
     LOAD + SEED
  ======================================================= */

  useEffect(() => {
    try {
      const raw =
        localStorage.getItem(
          "taskatlas-applications",
        );

      let stored:
        StoredApplication[] = [];

      if (raw) {
        stored =
          JSON.parse(
            raw,
          ) as StoredApplication[];
      }

      const ids =
        new Set(
          stored.map(
            (application) =>
              application.id,
          ),
        );

      const missingDemo =
        demoApplications.filter(
          (application) =>
            !ids.has(
              application.id,
            ),
        );

      const merged = [
        ...stored,
        ...missingDemo,
      ];

      setApplications(merged);

      localStorage.setItem(
        "taskatlas-applications",
        JSON.stringify(merged),
      );
    } catch {
      setApplications(
        demoApplications,
      );
    }
  }, []);

  /* =======================================================
     STATUS ACTION
  ======================================================= */

  function updateStatus(
    id: string,
    status: ApplicationStatus,
  ) {
    setApplications(
      (current) => {
        const updated =
          current.map(
            (application) =>
              application.id === id
                ? {
                    ...application,
                    status,
                  }
                : application,
          );

        localStorage.setItem(
          "taskatlas-applications",
          JSON.stringify(updated),
        );

        return updated;
      },
    );
  }

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredApplications =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return applications.filter(
        (application) => {
          const matchesSearch =
            !query ||
            application.applicantName
              .toLowerCase()
              .includes(query) ||
            application.applicantRole
              .toLowerCase()
              .includes(query) ||
            application.challengeTitle
              .toLowerCase()
              .includes(query) ||
            application.skills.some(
              (skill) =>
                skill
                  .toLowerCase()
                  .includes(query),
            );

          const matchesStatus =
            statusFilter ===
              "ALL" ||
            application.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        },
      );
    }, [
      applications,
      search,
      statusFilter,
    ]);

  const pending =
    applications.filter(
      (application) =>
        application.status ===
        "PENDING",
    ).length;

  const accepted =
    applications.filter(
      (application) =>
        application.status ===
        "ACCEPTED",
    ).length;

  const contacted =
    applications.filter(
      (application) =>
        application.status ===
        "CONTACTED",
    ).length;

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
            top-[-230px]
            h-[620px]
            w-[900px]
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
          max-w-[1400px]
          px-5
          pt-10
          sm:px-6
          lg:px-10
        "
      >
        <Link
          href="/business"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            text-[#81798c]
            transition
            hover:text-violet-300
          "
        >
          <ArrowLeft size={15} />

          Панель организации
        </Link>

        {/* HEADER */}

        <section
          className="
            mt-7
            flex
            flex-col
            justify-between
            gap-6
            lg:flex-row
            lg:items-end
          "
        >
          <div>
            <div
              className="
                text-xs
                uppercase
                tracking-[0.16em]
                text-violet-400
              "
            >
              Candidate Management
            </div>

            <h1
              className="
                mt-2
                text-4xl
                font-bold
                text-white
                sm:text-5xl
              "
            >
              Входящие{" "}
              <span
                className="
                  bg-gradient-to-r
                  from-violet-300
                  to-fuchsia-400
                  bg-clip-text
                  text-transparent
                "
              >
                заявки
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
              Сравнивайте навыки,
              предложения и доступность
              кандидатов. Решение принимает
              сама организация.
            </p>
          </div>
        </section>

        {/* STATS */}

        <section
          className="
            mt-8
            grid
            gap-3
            sm:grid-cols-3
          "
        >
          <ApplicationStat
            value={pending}
            label="Ожидают решения"
          />

          <ApplicationStat
            value={accepted}
            label="Принято"
            accent
          />

          <ApplicationStat
            value={contacted}
            label="Связались"
          />
        </section>

        {/* FILTERS */}

        <section
          className="
            mt-7
            flex
            flex-col
            gap-3
            rounded-2xl
            border
            border-violet-400/10
            bg-[#0d0918]
            p-4
            md:flex-row
          "
        >
          <div
            className="
              relative
              flex-1
            "
          >
            <Search
              size={16}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-[#70697c]
              "
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Имя, специальность, навык..."
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
                placeholder:text-[#5d5667]
                focus:border-violet-400/50
              "
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target
                  .value as
                  | ApplicationStatus
                  | "ALL",
              )
            }
            className="
              h-12
              min-w-[210px]
              rounded-xl
              border
              border-violet-400/15
              bg-[#151124]
              px-4
              text-sm
              text-white
              outline-none
            "
          >
            <option value="ALL">
              Все статусы
            </option>

            <option value="PENDING">
              Новые
            </option>

            <option value="ACCEPTED">
              Принятые
            </option>

            <option value="CONTACTED">
              Связались
            </option>

            <option value="REJECTED">
              Отклонённые
            </option>
          </select>
        </section>

        {/* APPLICATIONS */}

        <section
          className="
            mt-6
            space-y-4
          "
        >
          {filteredApplications.length >
          0 ? (
            filteredApplications.map(
              (application) => (
                <ApplicationCard
                  key={
                    application.id
                  }
                  application={
                    application
                  }
                  onStatusChange={
                    updateStatus
                  }
                />
              ),
            )
          ) : (
            <div
              className="
                rounded-3xl
                border
                border-violet-400/10
                bg-[#0d0918]
                py-16
                text-center
              "
            >
              <Users
                size={28}
                className="
                  mx-auto
                  text-violet-400
                "
              />

              <div
                className="
                  mt-4
                  text-lg
                  font-semibold
                  text-white
                "
              >
                Заявки не найдены
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   APPLICATION CARD
========================================================= */

function ApplicationCard({
  application,
  onStatusChange,
}: {
  application: StoredApplication;

  onStatusChange: (
    id: string,
    status: ApplicationStatus,
  ) => void;
}) {
  return (
    <article
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
          grid
          gap-6
          lg:grid-cols-[220px_minmax(0,1fr)_220px]
        "
      >
        {/* CANDIDATE */}

        <div>
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-violet-500/10
              text-violet-300
            "
          >
            <UserRound size={21} />
          </div>

          <h2
            className="
              mt-4
              text-lg
              font-bold
              text-white
            "
          >
            {application.applicantName}
          </h2>

          <div
            className="
              mt-1
              text-sm
              text-violet-300
            "
          >
            {application.applicantRole}
          </div>

          <div className="mt-4">
            <StatusBadge
              status={
                application.status
              }
            />
          </div>
        </div>

        {/* DETAILS */}

        <div
          className="
            border-y
            border-violet-400/10
            py-5
            lg:border-x
            lg:border-y-0
            lg:px-6
            lg:py-0
          "
        >
          <div
            className="
              text-xs
              uppercase
              tracking-[0.12em]
              text-[#6e6779]
            "
          >
            Отклик на запрос
          </div>

          <div
            className="
              mt-1
              font-medium
              text-white
            "
          >
            {application.challengeTitle}
          </div>

          <div
            className="
              mt-5
              text-xs
              uppercase
              tracking-[0.12em]
              text-[#6e6779]
            "
          >
            Навыки
          </div>

          <div
            className="
              mt-2
              flex
              flex-wrap
              gap-2
            "
          >
            {application.skills.map(
              (skill) => (
                <span
                  key={skill}
                  className="
                    rounded-lg
                    border
                    border-violet-400/10
                    bg-violet-500/[0.06]
                    px-2.5
                    py-1.5
                    text-xs
                    text-[#b6aec1]
                  "
                >
                  {skill}
                </span>
              ),
            )}
          </div>

          <div
            className="
              mt-5
              text-xs
              text-[#6e6779]
            "
          >
            Доступность
          </div>

          <div
            className="
              mt-1
              text-sm
              text-[#bcb4c7]
            "
          >
            {application.availability}
          </div>

          <div
            className="
              mt-5
              text-xs
              text-[#6e6779]
            "
          >
            Предложение
          </div>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-[#9890a2]
            "
          >
            {application.proposal}
          </p>
        </div>

        {/* ACTIONS */}

        <div>
          <div
            className="
              text-xs
              uppercase
              tracking-[0.12em]
              text-[#6e6779]
            "
          >
            Решение бизнеса
          </div>

          <div
            className="
              mt-4
              space-y-2
            "
          >
            <ActionButton
              icon={<Check size={15} />}
              label="Принять"
              onClick={() =>
                onStatusChange(
                  application.id,
                  "ACCEPTED",
                )
              }
              className="
                bg-emerald-500/10
                text-emerald-300
                hover:bg-emerald-500/15
              "
            />

            <ActionButton
              icon={<Mail size={15} />}
              label="Связаться"
              onClick={() =>
                onStatusChange(
                  application.id,
                  "CONTACTED",
                )
              }
              className="
                bg-violet-500/10
                text-violet-300
                hover:bg-violet-500/15
              "
            />

            <ActionButton
              icon={<X size={15} />}
              label="Отклонить"
              onClick={() =>
                onStatusChange(
                  application.id,
                  "REJECTED",
                )
              }
              className="
                bg-red-500/[0.07]
                text-red-300
                hover:bg-red-500/10
              "
            />
          </div>

          <div
            className="
              mt-5
              flex
              items-center
              gap-2
              text-xs
              text-[#6f687b]
            "
          >
            <Clock3 size={13} />

            Решение сохраняется
            автоматически
          </div>
        </div>
      </div>
    </article>
  );
}

function ActionButton({
  icon,
  label,
  onClick,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        min-h-11
        w-full
        items-center
        justify-center
        gap-2
        rounded-xl
        text-sm
        font-medium
        transition
        ${className}
      `}
    >
      {icon}

      {label}
    </button>
  );
}

function ApplicationStat({
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
        bg-[#0d0918]
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
          text-[#777081]
        "
      >
        {label}
      </div>
    </div>
  );
}

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
    CONTACTED:
      "bg-violet-500/10 text-violet-300",
    REJECTED:
      "bg-red-500/10 text-red-300",
  };

  const labels = {
    PENDING: "Ожидает решения",
    ACCEPTED: "Принята",
    CONTACTED: "Связались",
    REJECTED: "Отклонена",
  };

  return (
    <span
      className={`
        inline-flex
        rounded-full
        px-3
        py-1.5
        text-xs
        font-medium
        ${styles[status]}
      `}
    >
      {labels[status]}
    </span>
  );
}