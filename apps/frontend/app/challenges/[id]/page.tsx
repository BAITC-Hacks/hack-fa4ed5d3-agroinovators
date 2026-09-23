"use client";

import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import {
  useParams,
} from "next/navigation";

import Link from "next/link";

import {
  ArrowLeft,
  BedDouble,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Contact,
  MapPin,
  Send,
  Sparkles,
  Sprout,
  Users,
} from "lucide-react";

import { agroDemands } from "@/data/agro-demands";

import type {
  CatalogChallenge,
} from "@/components/challenge/ChallengeCard";

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

  status: "PENDING";

  createdAt: string;
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

export default function ChallengeDetailPage() {
  const params =
    useParams<{
      id: string;
    }>();

  const id =
    params.id;

  const [
    localChallenge,
    setLocalChallenge,
  ] =
    useState<CatalogChallenge | null>(
      null,
    );

  const [
    hydrated,
    setHydrated,
  ] =
    useState(false);

  const [
    showApply,
    setShowApply,
  ] =
    useState(false);

  const [
    applicantName,
    setApplicantName,
  ] =
    useState("");

  const [
    applicantRole,
    setApplicantRole,
  ] =
    useState("");

  const [
    applicantSkills,
    setApplicantSkills,
  ] =
    useState("");

  const [
    availability,
    setAvailability,
  ] =
    useState("");

  const [
    proposal,
    setProposal,
  ] =
    useState("");

  const [
    applicationSent,
    setApplicationSent,
  ] =
    useState(false);

  /* =======================================================
     STATIC CHALLENGE
  ======================================================= */

  const staticChallenge =
    useMemo(
      () =>
        staticChallenges.find(
          (challenge) =>
            challenge.id === id,
        ) ?? null,
      [id],
    );

  /* =======================================================
     LOAD PUBLISHED CHALLENGE
  ======================================================= */

  useEffect(() => {
    if (
      id !==
      "published-demand"
    ) {
      setHydrated(true);
      return;
    }

    try {
      const stored =
        localStorage.getItem(
          "taskatlas-last-published-demand",
        );

      if (!stored) {
        setHydrated(true);
        return;
      }

      const demand =
        JSON.parse(
          stored,
        ) as StoredDemand;

      const score =
        demand.readinessScore ??
        0;

      setLocalChallenge({
        id:
          "published-demand",

        title:
          demand.specialist
            ? `${specialistLabel(
                demand.specialist,
              )} — ${
                demand.locality ||
                "СКО"
              }`
            : `Аграрная потребность — ${
                demand.locality ||
                "СКО"
              }`,

        description:
          demand.rawNeed ||
          "Описание отсутствует.",

        organization:
          demand.organization ||
          "Организация",

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
          demand.skills ?? [],

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
          demand.locality ||
          "Не указано",

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
      });
    } catch {
      console.warn(
        "Unable to load demand",
      );
    } finally {
      setHydrated(true);
    }
  }, [id]);

  /* =======================================================
     APPLY QUERY
  ======================================================= */

  useEffect(() => {
    const query =
      new URLSearchParams(
        window.location.search,
      );

    if (
      query.get("apply") ===
      "true"
    ) {
      setShowApply(true);
    }
  }, []);

  const challenge =
    id === "published-demand"
      ? localChallenge
      : staticChallenge;

  /* =======================================================
     SEND APPLICATION
  ======================================================= */

  function submitApplication(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!challenge) {
      return;
    }

    const application:
      StoredApplication = {
      id:
        crypto.randomUUID(),

      challengeId:
        challenge.id,

      challengeTitle:
        challenge.title,

      organization:
        challenge.organization,

      applicantName,

      applicantRole,

      skills: applicantSkills
        .split(",")
        .map((skill) =>
          skill.trim(),
        )
        .filter(Boolean),

      availability,

      proposal,

      status: "PENDING",

      createdAt:
        new Date().toISOString(),
    };

    const existingRaw =
      localStorage.getItem(
        "taskatlas-applications",
      );

    let existing:
      StoredApplication[] = [];

    if (existingRaw) {
      try {
        existing =
          JSON.parse(
            existingRaw,
          ) as StoredApplication[];
      } catch {
        existing = [];
      }
    }

    localStorage.setItem(
      "taskatlas-applications",
      JSON.stringify([
        application,
        ...existing,
      ]),
    );

    setApplicationSent(true);
  }

  /* =======================================================
     LOADING
  ======================================================= */

  if (!hydrated) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#070611]
        "
      >
        <div
          className="
            h-8
            w-8
            animate-spin
            rounded-full
            border-2
            border-violet-400/20
            border-t-violet-400
          "
        />
      </main>
    );
  }

  /* =======================================================
     NOT FOUND
  ======================================================= */

  if (!challenge) {
    return (
      <main
        className="
          min-h-screen
          bg-[#070611]
          px-5
          py-20
        "
      >
        <div
          className="
            mx-auto
            max-w-xl
            rounded-3xl
            border
            border-violet-400/10
            bg-[#0d0918]
            p-8
            text-center
          "
        >
          <h1
            className="
              text-2xl
              font-bold
              text-white
            "
          >
            Запрос не найден
          </h1>

          <Link
            href="/challenges"
            className="
              mt-6
              inline-flex
              rounded-xl
              bg-violet-600
              px-4
              py-2.5
              text-sm
              font-medium
              text-white
            "
          >
            Вернуться в каталог
          </Link>
        </div>
      </main>
    );
  }

  const readiness =
    readinessMeta(
      challenge.score,
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
            top-[-250px]
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
          max-w-[1350px]
          px-5
          pt-10
          sm:px-6
          lg:px-10
        "
      >
        {/* BACK */}

        <Link
          href="/challenges"
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

          Каталог потребностей
        </Link>

        {/* ===============================================
            MAIN GRID
        =============================================== */}

        <div
          className="
            mt-7
            grid
            gap-6
            lg:grid-cols-[minmax(0,1fr)_370px]
          "
        >
          {/* =============================================
              MAIN INFORMATION
          ============================================= */}

          <div className="space-y-6">
            <section
              className="
                rounded-3xl
                border
                border-violet-400/15
                bg-[#0d0918]
                p-6
                sm:p-8
              "
            >
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-3
                "
              >
                <span
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
                </span>

                <span
                  className={`
                    rounded-full
                    border
                    px-3
                    py-1.5
                    text-xs
                    ${readiness.badge}
                  `}
                >
                  {readiness.label}
                </span>

                {challenge.isNew && (
                  <span
                    className="
                      rounded-full
                      bg-fuchsia-500/10
                      px-3
                      py-1.5
                      text-xs
                      text-fuchsia-300
                    "
                  >
                    Новый запрос
                  </span>
                )}
              </div>

              <h1
                className="
                  mt-6
                  max-w-4xl
                  text-3xl
                  font-bold
                  leading-tight
                  tracking-[-0.025em]
                  text-white
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                {challenge.title}
              </h1>

              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  gap-x-6
                  gap-y-3
                  text-sm
                  text-[#928a9e]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Building2
                    size={16}
                    className="text-violet-400"
                  />

                  {
                    challenge.organization
                  }
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <MapPin
                    size={16}
                    className="text-violet-400"
                  />

                  {challenge.location}

                  {challenge.district &&
                    ` · ${challenge.district}`}
                </div>
              </div>

              <div
                className="
                  mt-7
                  border-t
                  border-violet-400/10
                  pt-6
                "
              >
                <div
                  className="
                    text-xs
                    font-medium
                    uppercase
                    tracking-[0.14em]
                    text-[#6f687a]
                  "
                >
                  О потребности
                </div>

                <p
                  className="
                    mt-3
                    max-w-4xl
                    text-base
                    leading-8
                    text-[#aaa2b3]
                  "
                >
                  {challenge.description}
                </p>
              </div>
            </section>

            {/* =============================================
                DETAILS
            ============================================= */}

            <section
              className="
                rounded-3xl
                border
                border-violet-400/10
                bg-[#0d0918]
                p-6
              "
            >
              <h2
                className="
                  text-xl
                  font-semibold
                  text-white
                "
              >
                Условия и требования
              </h2>

              <div
                className="
                  mt-5
                  grid
                  gap-3
                  sm:grid-cols-2
                "
              >
                <DetailItem
                  icon={
                    <Users size={17} />
                  }
                  label="Требуется"
                  value={`${challenge.requiredCount} ${specialistCountLabel(
                    challenge.requiredCount,
                  )}`}
                />

                <DetailItem
                  icon={
                    <BriefcaseBusiness
                      size={17}
                    />
                  }
                  label="Формат работы"
                  value={employmentLabel(
                    challenge.employmentType,
                  )}
                />

                <DetailItem
                  icon={
                    <CircleDollarSign
                      size={17}
                    />
                  }
                  label="Зарплата / компенсация"
                  value={
                    challenge.salary ||
                    "Не указана"
                  }
                />

                <DetailItem
                  icon={
                    <BedDouble
                      size={17}
                    />
                  }
                  label="Проживание"
                  value={
                    challenge.accommodation ===
                    true
                      ? "Предоставляется"
                      : challenge.accommodation ===
                          false
                        ? "Не предоставляется"
                        : "Не указано"
                  }
                />

                {challenge.employmentPeriod && (
                  <DetailItem
                    icon={
                      <CheckCircle2
                        size={17}
                      />
                    }
                    label="Период"
                    value={
                      challenge.employmentPeriod
                    }
                  />
                )}

                {challenge.productionType && (
                  <DetailItem
                    icon={
                      <Sprout size={17} />
                    }
                    label="Производство"
                    value={
                      challenge.productionType
                    }
                  />
                )}
              </div>

              {/* SKILLS */}

              <div
                className="
                  mt-7
                  border-t
                  border-violet-400/10
                  pt-6
                "
              >
                <div
                  className="
                    text-xs
                    font-medium
                    uppercase
                    tracking-[0.14em]
                    text-[#6f687a]
                  "
                >
                  Требуемые навыки
                </div>

                <div
                  className="
                    mt-4
                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  {challenge.skills.length >
                  0 ? (
                    challenge.skills.map(
                      (skill) => (
                        <span
                          key={skill}
                          className="
                            rounded-xl
                            border
                            border-violet-400/10
                            bg-violet-500/[0.06]
                            px-3
                            py-2
                            text-sm
                            text-[#b6aec1]
                          "
                        >
                          {skill}
                        </span>
                      ),
                    )
                  ) : (
                    <span
                      className="
                        text-sm
                        text-[#746d80]
                      "
                    >
                      Навыки не указаны
                    </span>
                  )}
                </div>
              </div>

              {challenge.applicationProcedure && (
                <div
                  className="
                    mt-7
                    border-t
                    border-violet-400/10
                    pt-6
                  "
                >
                  <div
                    className="
                      text-xs
                      uppercase
                      tracking-[0.14em]
                      text-[#6f687a]
                    "
                  >
                    Как откликнуться
                  </div>

                  <p
                    className="
                      mt-3
                      text-sm
                      leading-6
                      text-[#aaa2b3]
                    "
                  >
                    {
                      challenge.applicationProcedure
                    }
                  </p>
                </div>
              )}
            </section>

            {/* =============================================
                APPLICATION FORM
            ============================================= */}

            {showApply && (
              <section
                id="apply"
                className="
                  rounded-3xl
                  border
                  border-violet-400/20
                  bg-[#0d0918]
                  p-6
                  sm:p-7
                "
              >
                {!applicationSent ? (
                  <>
                    <div
                      className="
                        flex
                        items-start
                        gap-3
                      "
                    >
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-violet-500/10
                          text-violet-300
                        "
                      >
                        <Send
                          size={18}
                        />
                      </div>

                      <div>
                        <div
                          className="
                            text-xs
                            uppercase
                            tracking-[0.14em]
                            text-violet-400
                          "
                        >
                          Student / Specialist
                        </div>

                        <h2
                          className="
                            mt-1
                            text-2xl
                            font-bold
                            text-white
                          "
                        >
                          Отправить отклик
                        </h2>

                        <p
                          className="
                            mt-1
                            text-sm
                            text-[#81798c]
                          "
                        >
                          Организация сама
                          рассмотрит заявку и
                          примет решение:
                          Accept / Reject /
                          Contact.
                        </p>
                      </div>
                    </div>

                    <form
                      onSubmit={
                        submitApplication
                      }
                      className="
                        mt-7
                        space-y-5
                      "
                    >
                      <div
                        className="
                          grid
                          gap-5
                          md:grid-cols-2
                        "
                      >
                        <FormField
                          label="Имя"
                          value={
                            applicantName
                          }
                          onChange={
                            setApplicantName
                          }
                          placeholder="Например: Aruzhan Tolebay"
                        />

                        <FormField
                          label="Профиль / специальность"
                          value={
                            applicantRole
                          }
                          onChange={
                            setApplicantRole
                          }
                          placeholder="Biotechnology student"
                        />

                        <FormField
                          label="Навыки"
                          value={
                            applicantSkills
                          }
                          onChange={
                            setApplicantSkills
                          }
                          placeholder="PCR, plant biology, laboratory analysis"
                        />

                        <FormField
                          label="Доступность"
                          value={
                            availability
                          }
                          onChange={
                            setAvailability
                          }
                          placeholder="June–August"
                        />
                      </div>

                      <div>
                        <label
                          className="
                            mb-2
                            block
                            text-sm
                            font-medium
                            text-[#b5adbf]
                          "
                        >
                          Предложение
                        </label>

                        <textarea
                          required
                          rows={5}
                          value={proposal}
                          onChange={(
                            event,
                          ) =>
                            setProposal(
                              event.target
                                .value,
                            )
                          }
                          placeholder="I can assist with plant disease diagnostics..."
                          className="
                            w-full
                            resize-none
                            rounded-xl
                            border
                            border-violet-400/15
                            bg-[#151124]
                            px-4
                            py-3.5
                            text-sm
                            text-white
                            outline-none
                            placeholder:text-[#5e5768]
                            focus:border-violet-400/50
                          "
                        />
                      </div>

                      <button
                        type="submit"
                        className="
                          flex
                          min-h-13
                          w-full
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          bg-gradient-to-r
                          from-violet-600
                          to-purple-600
                          px-5
                          font-semibold
                          text-white
                          transition
                          hover:from-violet-500
                          hover:to-purple-500
                        "
                      >
                        <Send
                          size={17}
                        />

                        Отправить заявку
                      </button>
                    </form>
                  </>
                ) : (
                  <div
                    className="
                      py-8
                      text-center
                    "
                  >
                    <div
                      className="
                        mx-auto
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-full
                        bg-emerald-500/10
                        text-emerald-300
                      "
                    >
                      <Check
                        size={24}
                      />
                    </div>

                    <h2
                      className="
                        mt-4
                        text-2xl
                        font-bold
                        text-white
                      "
                    >
                      Заявка отправлена
                    </h2>

                    <p
                      className="
                        mx-auto
                        mt-2
                        max-w-md
                        text-sm
                        leading-6
                        text-[#81798c]
                      "
                    >
                      Организация получит
                      ваш отклик и сможет
                      вручную принять,
                      отклонить или связаться
                      с вами.
                    </p>
                  </div>
                )}
              </section>
            )}
          </div>

          {/* =============================================
              SIDEBAR
          ============================================= */}

          <aside>
            <div
              className="
                sticky
                top-24
                space-y-4
              "
            >
              {/* READINESS */}

              <div
                className="
                  rounded-3xl
                  border
                  border-violet-400/15
                  bg-[#0d0918]
                  p-6
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div>
                    <div
                      className="
                        text-[10px]
                        uppercase
                        tracking-[0.14em]
                        text-[#71697d]
                      "
                    >
                      Agricultural Demand
                    </div>

                    <div
                      className="
                        mt-1
                        font-semibold
                        text-white
                      "
                    >
                      Readiness
                    </div>
                  </div>

                  <Sparkles
                    size={20}
                    className="text-violet-400"
                  />
                </div>

                <div
                  className="
                    mt-5
                    text-5xl
                    font-bold
                    text-violet-300
                  "
                >
                  {challenge.score}

                  <span
                    className="
                      ml-1
                      text-base
                      font-normal
                      text-[#6e6778]
                    "
                  >
                    /100
                  </span>
                </div>

                <div
                  className="
                    mt-4
                    h-2
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
                      to-fuchsia-400
                    "
                    style={{
                      width: `${challenge.score}%`,
                    }}
                  />
                </div>

                <div
                  className="
                    mt-3
                    text-sm
                    text-[#898294]
                  "
                >
                  {readiness.description}
                </div>
              </div>

              {/* CONTACT */}

              <div
                className="
                  rounded-3xl
                  border
                  border-violet-400/10
                  bg-[#0d0918]
                  p-6
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
                  <Contact
                    size={16}
                    className="text-violet-400"
                  />

                  Организация
                </div>

                <div
                  className="
                    mt-4
                    font-medium
                    text-[#c0b8cb]
                  "
                >
                  {
                    challenge.organization
                  }
                </div>

                <div
                  className="
                    mt-2
                    text-sm
                    text-[#81798b]
                  "
                >
                  {challenge.contact}
                </div>
              </div>

              {/* ACTIONS */}

              <div
                className="
                  rounded-3xl
                  border
                  border-violet-400/10
                  bg-[#0d0918]
                  p-5
                "
              >
                <button
                  type="button"
                  onClick={() => {
                    setShowApply(true);

                    setTimeout(() => {
                      document
                        .getElementById(
                          "apply",
                        )
                        ?.scrollIntoView({
                          behavior:
                            "smooth",
                        });
                    }, 50);
                  }}
                  className="
                    flex
                    min-h-13
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-violet-600
                    to-purple-600
                    px-4
                    font-semibold
                    text-white
                    transition
                    hover:from-violet-500
                    hover:to-purple-500
                  "
                >
                  <Send size={17} />

                  Откликнуться
                </button>

                <Link
                  href="/map"
                  className="
                    mt-3
                    flex
                    min-h-12
                    w-full
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
                  <MapPin size={15} />

                  Показать на карте
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   DETAIL ITEM
========================================================= */

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        bg-white/[0.025]
        p-4
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          text-xs
          text-[#716a7d]
        "
      >
        <span className="text-violet-400">
          {icon}
        </span>

        {label}
      </div>

      <div
        className="
          mt-2
          text-sm
          font-medium
          text-[#c2bacd]
        "
      >
        {value}
      </div>
    </div>
  );
}

/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (
    value: string,
  ) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label
        className="
          mb-2
          block
          text-sm
          font-medium
          text-[#b5adbf]
        "
      >
        {label}
      </label>

      <input
        required
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-violet-400/15
          bg-[#151124]
          px-4
          py-3.5
          text-sm
          text-white
          outline-none
          placeholder:text-[#5e5768]
          focus:border-violet-400/50
        "
      />
    </div>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function readinessMeta(
  score: number,
) {
  if (score >= 90) {
    return {
      label: "Priority",
      description:
        "Запрос полностью готов и содержит ключевую информацию для кандидатов.",
      badge:
        "border-violet-400/20 bg-violet-500/10 text-violet-300",
    };
  }

  if (score >= 70) {
    return {
      label: "Ready",
      description:
        "Запрос достаточно заполнен и готов принимать отклики.",
      badge:
        "border-emerald-400/20 bg-emerald-500/10 text-emerald-300",
    };
  }

  if (score >= 40) {
    return {
      label: "Working",
      description:
        "Организации рекомендуется дополнить информацию.",
      badge:
        "border-amber-400/20 bg-amber-500/10 text-amber-300",
    };
  }

  return {
    label: "Draft",
    description:
      "Для публикации необходимо добавить больше информации.",
    badge:
      "border-white/10 bg-white/[0.04] text-[#8d8698]",
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

function employmentLabel(
  employment: string,
) {
  const labels: Record<
    string,
    string
  > = {
    Internship:
      "Стажировка",
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