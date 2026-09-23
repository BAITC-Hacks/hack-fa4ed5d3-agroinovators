"use client";

import {
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useRouter } from "next/navigation";

import {
  AlertCircle,
  ArrowRight,
  BedDouble,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  Contact,
  HelpCircle,
  MapPin,
  MessageSquareText,
  Send,
  Sparkles,
  Sprout,
  Users,
  WandSparkles,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type AccommodationValue =
  | ""
  | "yes"
  | "no";

type SpecialistType =
  | ""
  | "Agronomist"
  | "Veterinarian"
  | "Biotechnologist"
  | "Agri-engineer"
  | "Soil scientist"
  | "Plant protection specialist"
  | "Food technologist"
  | "Laboratory specialist";

type EmploymentType =
  | ""
  | "Internship"
  | "Full-time"
  | "Part-time"
  | "Seasonal"
  | "Research project";

/* =========================================================
   LOCATIONS
========================================================= */

const locations = [
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
];

/* =========================================================
   SCORE CONFIGURATION
========================================================= */

const MAX_SCORE = 100;

export function ChallengeForm() {
  const router = useRouter();

  /* =======================================================
     BASIC INFORMATION
  ======================================================= */

  const [
    rawNeed,
    setRawNeed,
  ] = useState("");

  const [
    organization,
    setOrganization,
  ] = useState("");

  const [
    locality,
    setLocality,
  ] = useState("");

  const [
    district,
    setDistrict,
  ] = useState("");

  /* =======================================================
     CLARIFICATION INFORMATION
  ======================================================= */

  const [
    specialist,
    setSpecialist,
  ] = useState<SpecialistType>("");

  const [
    requiredCount,
    setRequiredCount,
  ] = useState("");

  const [
    skills,
    setSkills,
  ] = useState("");

  const [
    employmentType,
    setEmploymentType,
  ] = useState<EmploymentType>("");

  const [
    employmentPeriod,
    setEmploymentPeriod,
  ] = useState("");

  const [
    salary,
    setSalary,
  ] = useState("");

  const [
    accommodation,
    setAccommodation,
  ] = useState<AccommodationValue>("");

  const [
    contact,
    setContact,
  ] = useState("");

  const [
    applicationProcedure,
    setApplicationProcedure,
  ] = useState("");

  const [
    productionType,
    setProductionType,
  ] = useState("");

  /* =======================================================
     UI STATE
  ======================================================= */

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    analyzed,
    setAnalyzed,
  ] = useState(false);

  const [
    confirmed,
    setConfirmed,
  ] = useState(false);

  const [
    published,
    setPublished,
  ] = useState(false);

  /* =======================================================
     SIMPLE AI SUGGESTION

     MVP version:
     We only suggest something when there is a clear keyword.
     Nothing is silently added to the demand card.
  ======================================================= */

  const aiSuggestedSpecialist =
    useMemo(() => {
      const text =
        rawNeed.toLowerCase();

      if (
        text.includes("wheat disease") ||
        text.includes("plant disease") ||
        text.includes("болезн") ||
        text.includes("защит")
      ) {
        return "Plant protection specialist";
      }

      if (
        text.includes("agronom") ||
        text.includes("агроном")
      ) {
        return "Agronomist";
      }

      if (
        text.includes("veter") ||
        text.includes("ветерин")
      ) {
        return "Veterinarian";
      }

      if (
        text.includes("biotech") ||
        text.includes("биотех")
      ) {
        return "Biotechnologist";
      }

      if (
        text.includes("engineer") ||
        text.includes("инженер")
      ) {
        return "Agri-engineer";
      }

      if (
        text.includes("soil") ||
        text.includes("почв")
      ) {
        return "Soil scientist";
      }

      if (
        text.includes("laboratory") ||
        text.includes("лаборатор")
      ) {
        return "Laboratory specialist";
      }

      return null;
    }, [rawNeed]);

  /* =======================================================
     READINESS SCORE
  ======================================================= */

  const scoreBreakdown =
    useMemo(() => {
      return [
        {
          id: "location",
          label:
            "Локация указана",
          points: 15,
          complete:
            Boolean(locality),
        },

        {
          id: "count",
          label:
            "Количество специалистов",
          points: 15,
          complete:
            Number(requiredCount) > 0,
        },

        {
          id: "specialist",
          label:
            "Специальность",
          points: 15,
          complete:
            Boolean(specialist),
        },

        {
          id: "skills",
          label:
            "Требуемые навыки",
          points: 15,
          complete:
            Boolean(
              skills.trim(),
            ),
        },

        {
          id: "conditions",
          label:
            "Условия / период работы",
          points: 10,
          complete:
            Boolean(
              employmentType &&
                employmentPeriod.trim(),
            ),
        },

        {
          id: "salary",
          label:
            "Зарплата / компенсация",
          points: 10,
          complete:
            Boolean(
              salary.trim(),
            ),
        },

        {
          id: "accommodation",
          label:
            "Информация о проживании",
          points: 5,
          complete:
            accommodation !== "",
        },

        {
          id: "contact",
          label:
            "Контактное лицо",
          points: 10,
          complete:
            Boolean(
              contact.trim(),
            ),
        },

        {
          id: "application",
          label:
            "Процедура отклика",
          points: 5,
          complete:
            Boolean(
              applicationProcedure.trim(),
            ),
        },
      ];
    }, [
      locality,
      requiredCount,
      specialist,
      skills,
      employmentType,
      employmentPeriod,
      salary,
      accommodation,
      contact,
      applicationProcedure,
    ]);

  const readinessScore =
    scoreBreakdown.reduce(
      (total, item) =>
        total +
        (item.complete
          ? item.points
          : 0),
      0,
    );

  const missingItems =
    scoreBreakdown.filter(
      (item) => !item.complete,
    );

  /* =======================================================
     AI QUESTIONS
  ======================================================= */

  const aiQuestions =
    useMemo(() => {
      const questions: string[] =
        [];

      if (!productionType.trim()) {
        questions.push(
          "Какой тип сельскохозяйственного производства у вашей организации?",
        );
      }

      if (!specialist) {
        questions.push(
          "Какой именно специалист вам требуется?",
        );
      }

      if (
        Number(requiredCount) <= 0
      ) {
        questions.push(
          "Сколько специалистов необходимо?",
        );
      }

      if (!skills.trim()) {
        questions.push(
          "Какие навыки или знания обязательны для кандидата?",
        );
      }

      if (
        !employmentType ||
        !employmentPeriod.trim()
      ) {
        questions.push(
          "Какой формат и период работы вы предлагаете?",
        );
      }

      if (!salary.trim()) {
        questions.push(
          "Какая зарплата или компенсация предусмотрена?",
        );
      }

      if (
        accommodation === ""
      ) {
        questions.push(
          "Предоставляется ли проживание?",
        );
      }

      if (!contact.trim()) {
        questions.push(
          "Как кандидат сможет связаться с организацией?",
        );
      }

      return questions;
    }, [
      productionType,
      specialist,
      requiredCount,
      skills,
      employmentType,
      employmentPeriod,
      salary,
      accommodation,
      contact,
    ]);

  /* =======================================================
     ACTIONS
  ======================================================= */

  function runAiAnalysis(
    event:
      React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (
      !rawNeed.trim() ||
      !organization.trim() ||
      !locality
    ) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setAnalyzed(true);
      setLoading(false);

      window.setTimeout(() => {
        document
          .getElementById(
            "ai-analysis",
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    }, 900);
  }

  function useAiSuggestion() {
    if (
      aiSuggestedSpecialist
    ) {
      setSpecialist(
        aiSuggestedSpecialist,
      );
    }
  }

  function publishDemand() {
    if (
      readinessScore < 70 ||
      !confirmed
    ) {
      return;
    }

    const demand = {
      rawNeed,
      organization,
      region:
        "Северо-Казахстанская область",
      district,
      locality,
      specialist,
      requiredCount:
        Number(requiredCount),
      skills: skills
        .split(",")
        .map((skill) =>
          skill.trim(),
        )
        .filter(Boolean),
      employmentType,
      employmentPeriod,
      salary,
      accommodation,
      contact,
      applicationProcedure,
      productionType,
      readinessScore,
      createdAt:
        new Date().toISOString(),
    };

    localStorage.setItem(
      "taskatlas-last-published-demand",
      JSON.stringify(demand),
    );

    setPublished(true);

    setTimeout(() => {
      router.push(
        "/challenges?published=true",
      );
    }, 900);
  }

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div
      className="
        mx-auto
        grid
        max-w-7xl
        gap-6
        xl:grid-cols-[minmax(0,1fr)_390px]
      "
    >
      {/* ===================================================
          MAIN FORM
      =================================================== */}

      <div className="space-y-6">
        {/* =================================================
            STEP 1
        ================================================= */}

        <form
          onSubmit={runAiAnalysis}
          className="
            rounded-3xl
            border
            border-violet-400/15
            bg-[#0d0918]
            p-5
            shadow-[0_30px_100px_rgba(0,0,0,.25)]
            sm:p-7
          "
        >
          <StepHeader
            number="01"
            eyebrow="Initial need"
            title="Опишите потребность"
            description="Не нужно заполнять идеальную форму. Начните с того, что реально знаете."
          />

          <div className="mt-7 space-y-6">
            {/* ORGANIZATION */}

            <Field>
              <Label>
                Организация
              </Label>

              <div className="relative">
                <Building2
                  size={17}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-violet-400
                  "
                />

                <input
                  type="text"
                  value={organization}
                  onChange={(event) =>
                    setOrganization(
                      event.target.value,
                    )
                  }
                  placeholder="Например: Север Агро"
                  className={`${inputClassName} pl-11`}
                  required
                />
              </div>
            </Field>

            {/* RAW NEED */}

            <Field>
              <Label>
                Что вам нужно?
              </Label>

              <textarea
                value={rawNeed}
                onChange={(event) =>
                  setRawNeed(
                    event.target.value,
                  )
                }
                rows={6}
                placeholder='Например: "Нашему хозяйству в Северо-Казахстанской области нужны специалисты, которые разбираются в болезнях пшеницы. Площадь хозяйства — 500 гектаров."'
                className={`
                  ${inputClassName}
                  min-h-[170px]
                  resize-none
                  leading-6
                `}
                required
              />

              <div
                className="
                  mt-2
                  flex
                  items-start
                  gap-2
                  text-xs
                  leading-5
                  text-[#70697c]
                "
              >
                <Sparkles
                  size={13}
                  className="
                    mt-0.5
                    shrink-0
                    text-violet-400
                  "
                />

                AI использует только
                предоставленную информацию.
                Неизвестные данные будут
                отмечены как отсутствующие.
              </div>
            </Field>

            {/* LOCATION */}

            <div
              className="
                grid
                gap-5
                md:grid-cols-2
              "
            >
              <Field>
                <Label>
                  Населённый пункт
                </Label>

                <SelectWrapper>
                  <select
                    value={locality}
                    onChange={(event) =>
                      setLocality(
                        event.target
                          .value,
                      )
                    }
                    className={
                      selectClassName
                    }
                    required
                  >
                    <option value="">
                      Выберите локацию
                    </option>

                    {locations.map(
                      (location) => (
                        <option
                          key={
                            location
                          }
                          value={
                            location
                          }
                        >
                          {location}
                        </option>
                      ),
                    )}
                  </select>
                </SelectWrapper>
              </Field>

              <Field>
                <Label>
                  Район
                  <Optional />
                </Label>

                <input
                  type="text"
                  value={district}
                  onChange={(event) =>
                    setDistrict(
                      event.target.value,
                    )
                  }
                  placeholder="Например: район Магжана Жумабаева"
                  className={
                    inputClassName
                  }
                />
              </Field>
            </div>

            {/* ANALYZE */}

            <button
              type="submit"
              disabled={loading}
              className="
                flex
                min-h-14
                w-full
                items-center
                justify-center
                gap-3
                rounded-xl
                bg-gradient-to-r
                from-violet-600
                to-purple-600
                px-6
                text-base
                font-semibold
                text-white
                shadow-[0_0_35px_rgba(139,92,246,.20)]
                transition
                hover:from-violet-500
                hover:to-purple-500
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? (
                <>
                  <span
                    className="
                      h-5
                      w-5
                      animate-spin
                      rounded-full
                      border-2
                      border-white/30
                      border-t-white
                    "
                  />

                  AI анализирует запрос...
                </>
              ) : (
                <>
                  <WandSparkles
                    size={18}
                  />

                  Запустить AI-анализ
                </>
              )}
            </button>
          </div>
        </form>

        {/* =================================================
            AI ANALYSIS
        ================================================= */}

        {analyzed && (
          <section
            id="ai-analysis"
            className="
              scroll-mt-24
              rounded-3xl
              border
              border-violet-400/20
              bg-[#0d0918]
              p-5
              sm:p-7
            "
          >
            <StepHeader
              number="02"
              eyebrow="AI clarification"
              title="AI нашёл недостающую информацию"
              description="Ответьте на вопросы, чтобы сделать запрос понятным для студентов и специалистов."
            />

            {/* AI RESULT */}

            <div
              className="
                mt-7
                grid
                gap-4
                lg:grid-cols-2
              "
            >
              <div
                className="
                  rounded-2xl
                  border
                  border-violet-400/15
                  bg-violet-500/[0.05]
                  p-5
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
                  <Sparkles
                    size={16}
                    className="text-violet-400"
                  />

                  AI Analysis
                </div>

                <div
                  className="
                    mt-4
                    text-4xl
                    font-bold
                    text-violet-300
                  "
                >
                  {readinessScore}

                  <span
                    className="
                      ml-1
                      text-base
                      font-normal
                      text-[#726a80]
                    "
                  >
                    /100
                  </span>
                </div>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-[#837b8f]
                  "
                >
                  Текущий Agricultural
                  Demand Readiness.
                </p>

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
                      transition-all
                      duration-500
                    "
                    style={{
                      width: `${readinessScore}%`,
                    }}
                  />
                </div>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-amber-400/10
                  bg-amber-500/[0.035]
                  p-5
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
                  <AlertCircle
                    size={16}
                    className="text-amber-400"
                  />

                  Что ещё нужно
                </div>

                <div className="mt-4 space-y-2">
                  {missingItems.length >
                  0 ? (
                    missingItems.map(
                      (item) => (
                        <div
                          key={item.id}
                          className="
                            flex
                            items-center
                            justify-between
                            gap-3
                            text-xs
                          "
                        >
                          <span className="text-[#9b929f]">
                            {item.label}
                          </span>

                          <span className="text-amber-300">
                            +{item.points}
                          </span>
                        </div>
                      ),
                    )
                  ) : (
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-emerald-300
                      "
                    >
                      <CheckCircle2
                        size={16}
                      />

                      Все ключевые поля
                      заполнены
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* AI QUESTIONS */}

            {aiQuestions.length > 0 && (
              <div
                className="
                  mt-5
                  rounded-2xl
                  border
                  border-violet-400/10
                  bg-[#110d1e]
                  p-5
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
                  <HelpCircle
                    size={16}
                    className="text-violet-400"
                  />

                  Уточняющие вопросы AI
                </div>

                <div
                  className="
                    mt-4
                    grid
                    gap-2
                  "
                >
                  {aiQuestions.map(
                    (question, index) => (
                      <div
                        key={question}
                        className="
                          flex
                          items-start
                          gap-3
                          rounded-xl
                          bg-white/[0.025]
                          px-4
                          py-3
                        "
                      >
                        <span
                          className="
                            flex
                            h-6
                            w-6
                            shrink-0
                            items-center
                            justify-center
                            rounded-md
                            bg-violet-500/10
                            text-[10px]
                            font-semibold
                            text-violet-300
                          "
                        >
                          {index + 1}
                        </span>

                        <span
                          className="
                            text-sm
                            leading-6
                            text-[#a69eae]
                          "
                        >
                          {question}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* AI SPECIALIST SUGGESTION */}

            {aiSuggestedSpecialist &&
              !specialist && (
                <div
                  className="
                    mt-5
                    flex
                    flex-col
                    justify-between
                    gap-4
                    rounded-2xl
                    border
                    border-violet-400/15
                    bg-violet-500/[0.05]
                    p-5
                    sm:flex-row
                    sm:items-center
                  "
                >
                  <div>
                    <div
                      className="
                        text-xs
                        uppercase
                        tracking-[0.12em]
                        text-violet-400
                      "
                    >
                      AI suggestion
                    </div>

                    <div
                      className="
                        mt-1
                        font-semibold
                        text-white
                      "
                    >
                      {
                        specialistLabel(
                          aiSuggestedSpecialist,
                        )
                      }
                    </div>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-[#81798c]
                      "
                    >
                      Это предложение AI.
                      Оно будет добавлено
                      только после вашего
                      подтверждения.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={
                      useAiSuggestion
                    }
                    className="
                      rounded-xl
                      border
                      border-violet-400/20
                      bg-violet-500/10
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      text-violet-200
                      transition
                      hover:bg-violet-500/15
                    "
                  >
                    Использовать
                    предложение
                  </button>
                </div>
              )}

            {/* =================================================
                CLARIFICATION FORM
            ================================================= */}

            <div
              className="
                mt-8
                border-t
                border-violet-400/10
                pt-7
              "
            >
              <div
                className="
                  mb-6
                  flex
                  items-center
                  gap-3
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
                  <MessageSquareText
                    size={18}
                  />
                </div>

                <div>
                  <h3
                    className="
                      font-semibold
                      text-white
                    "
                  >
                    Ответьте на уточнения
                  </h3>

                  <p
                    className="
                      mt-0.5
                      text-xs
                      text-[#777081]
                    "
                  >
                    Readiness обновляется
                    автоматически.
                  </p>
                </div>
              </div>

              <div
                className="
                  grid
                  gap-5
                  md:grid-cols-2
                "
              >
                {/* PRODUCTION */}

                <Field>
                  <Label>
                    Тип производства
                  </Label>

                  <input
                    value={productionType}
                    onChange={(event) =>
                      setProductionType(
                        event.target
                          .value,
                      )
                    }
                    placeholder="Например: растениеводство, пшеница"
                    className={
                      inputClassName
                    }
                  />
                </Field>

                {/* SPECIALIST */}

                <Field>
                  <Label>
                    Требуемый специалист
                  </Label>

                  <SelectWrapper>
                    <select
                      value={specialist}
                      onChange={(event) =>
                        setSpecialist(
                          event.target
                            .value as SpecialistType,
                        )
                      }
                      className={
                        selectClassName
                      }
                    >
                      <option value="">
                        Выберите специальность
                      </option>

                      <option value="Agronomist">
                        Агроном
                      </option>

                      <option value="Biotechnologist">
                        Биотехнолог
                      </option>

                      <option value="Veterinarian">
                        Ветеринар
                      </option>

                      <option value="Agri-engineer">
                        Агроинженер
                      </option>

                      <option value="Soil scientist">
                        Почвовед
                      </option>

                      <option value="Plant protection specialist">
                        Специалист по защите растений
                      </option>

                      <option value="Food technologist">
                        Пищевой технолог
                      </option>

                      <option value="Laboratory specialist">
                        Лабораторный специалист
                      </option>
                    </select>
                  </SelectWrapper>
                </Field>

                {/* NUMBER */}

                <Field>
                  <Label>
                    Количество специалистов
                  </Label>

                  <div className="relative">
                    <Users
                      size={17}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-violet-400
                      "
                    />

                    <input
                      type="number"
                      min="1"
                      value={requiredCount}
                      onChange={(event) =>
                        setRequiredCount(
                          event.target
                            .value,
                        )
                      }
                      placeholder="Например: 3"
                      className={`${inputClassName} pl-11`}
                    />
                  </div>
                </Field>

                {/* EMPLOYMENT */}

                <Field>
                  <Label>
                    Формат работы
                  </Label>

                  <SelectWrapper>
                    <select
                      value={
                        employmentType
                      }
                      onChange={(event) =>
                        setEmploymentType(
                          event.target
                            .value as EmploymentType,
                        )
                      }
                      className={
                        selectClassName
                      }
                    >
                      <option value="">
                        Выберите формат
                      </option>

                      <option value="Internship">
                        Стажировка
                      </option>

                      <option value="Full-time">
                        Полная занятость
                      </option>

                      <option value="Part-time">
                        Частичная занятость
                      </option>

                      <option value="Seasonal">
                        Сезонная работа
                      </option>

                      <option value="Research project">
                        Исследовательский проект
                      </option>
                    </select>
                  </SelectWrapper>
                </Field>

                {/* PERIOD */}

                <Field>
                  <Label>
                    Период работы
                  </Label>

                  <input
                    value={
                      employmentPeriod
                    }
                    onChange={(event) =>
                      setEmploymentPeriod(
                        event.target
                          .value,
                      )
                    }
                    placeholder="Например: июнь–август 2027"
                    className={
                      inputClassName
                    }
                  />
                </Field>

                {/* SALARY */}

                <Field>
                  <Label>
                    Зарплата / компенсация
                  </Label>

                  <div className="relative">
                    <CircleDollarSign
                      size={17}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-violet-400
                      "
                    />

                    <input
                      value={salary}
                      onChange={(event) =>
                        setSalary(
                          event.target
                            .value,
                        )
                      }
                      placeholder="250 000–350 000 ₸"
                      className={`${inputClassName} pl-11`}
                    />
                  </div>
                </Field>

                {/* ACCOMMODATION */}

                <Field>
                  <Label>
                    Проживание
                  </Label>

                  <SelectWrapper>
                    <select
                      value={
                        accommodation
                      }
                      onChange={(event) =>
                        setAccommodation(
                          event.target
                            .value as AccommodationValue,
                        )
                      }
                      className={
                        selectClassName
                      }
                    >
                      <option value="">
                        Не указано
                      </option>

                      <option value="yes">
                        Предоставляется
                      </option>

                      <option value="no">
                        Не предоставляется
                      </option>
                    </select>
                  </SelectWrapper>
                </Field>

                {/* CONTACT */}

                <Field>
                  <Label>
                    Контакт
                  </Label>

                  <div className="relative">
                    <Contact
                      size={17}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-violet-400
                      "
                    />

                    <input
                      value={contact}
                      onChange={(event) =>
                        setContact(
                          event.target
                            .value,
                        )
                      }
                      placeholder="+7 777 ... / hr@company.kz"
                      className={`${inputClassName} pl-11`}
                    />
                  </div>
                </Field>
              </div>

              {/* SKILLS */}

              <Field className="mt-5">
                <Label>
                  Требуемые навыки
                </Label>

                <textarea
                  value={skills}
                  onChange={(event) =>
                    setSkills(
                      event.target.value,
                    )
                  }
                  rows={3}
                  placeholder="Crop protection, soil analysis, GIS, plant diagnostics..."
                  className={`
                    ${inputClassName}
                    resize-none
                  `}
                />
              </Field>

              {/* APPLICATION */}

              <Field className="mt-5">
                <Label>
                  Как кандидат должен откликнуться?
                </Label>

                <textarea
                  value={
                    applicationProcedure
                  }
                  onChange={(event) =>
                    setApplicationProcedure(
                      event.target.value,
                    )
                  }
                  rows={3}
                  placeholder="Например: отправить краткое предложение, CV и указать доступный период работы."
                  className={`
                    ${inputClassName}
                    resize-none
                  `}
                />
              </Field>
            </div>
          </section>
        )}

        {/* =================================================
            CARD PREVIEW
        ================================================= */}

        {analyzed && (
          <section
            className="
              rounded-3xl
              border
              border-violet-400/15
              bg-[#0d0918]
              p-5
              sm:p-7
            "
          >
            <StepHeader
              number="03"
              eyebrow="Human review"
              title="Проверьте карточку перед публикацией"
              description="AI помогает структурировать данные, но финальное решение всегда принимает организация."
            />

            <div
              className="
                mt-7
                rounded-2xl
                border
                border-violet-400/15
                bg-[#100c1c]
                p-5
                sm:p-6
              "
            >
              <div
                className="
                  flex
                  flex-col
                  justify-between
                  gap-5
                  sm:flex-row
                  sm:items-start
                "
              >
                <div>
                  <div
                    className="
                      inline-flex
                      rounded-full
                      bg-violet-500/10
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-violet-300
                    "
                  >
                    {specialist
                      ? specialistLabel(
                          specialist,
                        )
                      : "Специальность не указана"}
                  </div>

                  <h3
                    className="
                      mt-4
                      text-2xl
                      font-bold
                      text-white
                    "
                  >
                    {specialist
                      ? `${specialistLabel(
                          specialist,
                        )} — ${locality}`
                      : rawNeed}
                  </h3>

                  <div
                    className="
                      mt-2
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-[#8c8597]
                    "
                  >
                    <Building2
                      size={15}
                      className="text-violet-400"
                    />

                    {organization}
                  </div>

                  <div
                    className="
                      mt-2
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-[#8c8597]
                    "
                  >
                    <MapPin
                      size={15}
                      className="text-violet-400"
                    />

                    {locality},{" "}
                    Северо-Казахстанская
                    область
                  </div>
                </div>

                <div
                  className="
                    rounded-xl
                    border
                    border-violet-400/15
                    bg-violet-500/[0.05]
                    px-4
                    py-3
                  "
                >
                  <div
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.12em]
                      text-[#736b7e]
                    "
                  >
                    Readiness
                  </div>

                  <div
                    className="
                      mt-1
                      text-2xl
                      font-bold
                      text-violet-300
                    "
                  >
                    {readinessScore}/100
                  </div>
                </div>
              </div>

              <p
                className="
                  mt-5
                  text-sm
                  leading-6
                  text-[#948ca0]
                "
              >
                {rawNeed}
              </p>

              <div
                className="
                  mt-6
                  grid
                  gap-3
                  sm:grid-cols-2
                  lg:grid-cols-3
                "
              >
                <PreviewItem
                  icon={
                    <Users size={15} />
                  }
                  label="Требуется"
                  value={
                    requiredCount
                      ? `${requiredCount} специалистов`
                      : "Не указано"
                  }
                />

                <PreviewItem
                  icon={
                    <BriefcaseBusiness
                      size={15}
                    />
                  }
                  label="Формат"
                  value={
                    employmentType
                      ? employmentLabel(
                          employmentType,
                        )
                      : "Не указано"
                  }
                />

                <PreviewItem
                  icon={
                    <CircleDollarSign
                      size={15}
                    />
                  }
                  label="Оплата"
                  value={
                    salary ||
                    "Не указано"
                  }
                />

                <PreviewItem
                  icon={
                    <BedDouble
                      size={15}
                    />
                  }
                  label="Проживание"
                  value={
                    accommodation ===
                    "yes"
                      ? "Предоставляется"
                      : accommodation ===
                          "no"
                        ? "Не предоставляется"
                        : "Не указано"
                  }
                />

                <PreviewItem
                  icon={
                    <Contact size={15} />
                  }
                  label="Контакт"
                  value={
                    contact ||
                    "Не указано"
                  }
                />

                <PreviewItem
                  icon={
                    <ClipboardCheck
                      size={15}
                    />
                  }
                  label="Период"
                  value={
                    employmentPeriod ||
                    "Не указано"
                  }
                />
              </div>

              {skills.trim() && (
                <div
                  className="
                    mt-6
                    border-t
                    border-violet-400/10
                    pt-5
                  "
                >
                  <div
                    className="
                      text-xs
                      uppercase
                      tracking-[0.12em]
                      text-[#716979]
                    "
                  >
                    Навыки
                  </div>

                  <div
                    className="
                      mt-3
                      flex
                      flex-wrap
                      gap-2
                    "
                  >
                    {skills
                      .split(",")
                      .map((skill) =>
                        skill.trim(),
                      )
                      .filter(Boolean)
                      .map((skill) => (
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
                            text-[#b9b1c6]
                          "
                        >
                          {skill}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* HUMAN CONFIRMATION */}

            <label
              className="
                mt-5
                flex
                cursor-pointer
                items-start
                gap-3
                rounded-2xl
                border
                border-violet-400/10
                bg-white/[0.02]
                p-4
              "
            >
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(event) =>
                  setConfirmed(
                    event.target
                      .checked,
                  )
                }
                className="
                  mt-0.5
                  h-4
                  w-4
                  accent-violet-500
                "
              />

              <span>
                <span
                  className="
                    block
                    text-sm
                    font-medium
                    text-white
                  "
                >
                  Я подтверждаю
                  корректность данных
                </span>

                <span
                  className="
                    mt-1
                    block
                    text-xs
                    leading-5
                    text-[#777081]
                  "
                >
                  Организация проверила
                  информацию, предложенную
                  AI, перед публикацией.
                </span>
              </span>
            </label>

            {/* PUBLISH */}

            <button
              type="button"
              onClick={publishDemand}
              disabled={
                readinessScore < 70 ||
                !confirmed ||
                published
              }
              className="
                mt-5
                flex
                min-h-14
                w-full
                items-center
                justify-center
                gap-3
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
                disabled:cursor-not-allowed
                disabled:opacity-35
              "
            >
              {published ? (
                <>
                  <Check size={18} />

                  Опубликовано
                </>
              ) : (
                <>
                  <Send size={18} />

                  Опубликовать потребность
                </>
              )}
            </button>

            {readinessScore < 70 && (
              <p
                className="
                  mt-3
                  text-center
                  text-xs
                  text-[#756e81]
                "
              >
                Для публикации заполните
                карточку минимум до
                Readiness 70/100.
              </p>
            )}
          </section>
        )}
      </div>

      {/* ===================================================
          STICKY READINESS PANEL
      =================================================== */}

      <aside>
        <div
          className="
            sticky
            top-24
            rounded-3xl
            border
            border-violet-400/15
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
              <div
                className="
                  text-xs
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
                  text-lg
                  font-semibold
                  text-white
                "
              >
                Readiness
              </div>
            </div>

            <Sprout
              size={22}
              className="text-violet-400"
            />
          </div>

          <div
            className="
              mt-6
              flex
              items-end
              gap-1
            "
          >
            <span
              className="
                text-5xl
                font-bold
                text-white
              "
            >
              {readinessScore}
            </span>

            <span
              className="
                mb-1.5
                text-sm
                text-[#6f6879]
              "
            >
              /{MAX_SCORE}
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
                via-purple-500
                to-fuchsia-400
                transition-all
                duration-500
              "
              style={{
                width: `${readinessScore}%`,
              }}
            />
          </div>

          <div
            className="
              mt-2
              text-xs
              font-medium
              text-violet-300
            "
          >
            {readinessLabel(
              readinessScore,
            )}
          </div>

          {/* BREAKDOWN */}

          <div
            className="
              mt-6
              border-t
              border-violet-400/10
              pt-5
            "
          >
            <div
              className="
                mb-3
                text-xs
                uppercase
                tracking-[0.12em]
                text-[#6e6779]
              "
            >
              Как начисляются баллы
            </div>

            <div className="space-y-2">
              {scoreBreakdown.map(
                (item) => (
                  <div
                    key={item.id}
                    className="
                      flex
                      items-center
                      justify-between
                      gap-3
                      rounded-lg
                      bg-white/[0.02]
                      px-3
                      py-2.5
                    "
                  >
                    <div
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-2
                      "
                    >
                      <span
                        className={`
                          flex
                          h-5
                          w-5
                          shrink-0
                          items-center
                          justify-center
                          rounded-full

                          ${
                            item.complete
                              ? "bg-emerald-500/10 text-emerald-300"
                              : "bg-white/[0.04] text-[#5f5868]"
                          }
                        `}
                      >
                        {item.complete ? (
                          <Check
                            size={11}
                          />
                        ) : (
                          <span
                            className="
                              h-1.5
                              w-1.5
                              rounded-full
                              bg-current
                            "
                          />
                        )}
                      </span>

                      <span
                        className={`
                          truncate
                          text-xs

                          ${
                            item.complete
                              ? "text-[#b1a9bc]"
                              : "text-[#716a7d]"
                          }
                        `}
                      >
                        {item.label}
                      </span>
                    </div>

                    <span
                      className={`
                        shrink-0
                        text-xs
                        font-medium

                        ${
                          item.complete
                            ? "text-emerald-300"
                            : "text-[#625b6d]"
                        }
                      `}
                    >
                      +{item.points}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* LEVELS */}

          <div
            className="
              mt-6
              border-t
              border-violet-400/10
              pt-5
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
              Уровни готовности
            </div>

            <div
              className="
                mt-3
                grid
                grid-cols-2
                gap-2
                text-[11px]
              "
            >
              <LevelBadge
                label="Draft"
                range="0–39"
              />

              <LevelBadge
                label="Working"
                range="40–69"
              />

              <LevelBadge
                label="Ready"
                range="70–89"
              />

              <LevelBadge
                label="Priority"
                range="90–100"
              />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* =========================================================
   SHARED UI
========================================================= */

const inputClassName = `
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
  transition
  placeholder:text-[#5e5768]
  focus:border-violet-400/50
  focus:ring-2
  focus:ring-violet-500/10
`;

const selectClassName = `
  w-full
  appearance-none
  rounded-xl
  border
  border-violet-400/15
  bg-[#151124]
  px-4
  py-3.5
  pr-10
  text-sm
  text-white
  outline-none
  transition
  focus:border-violet-400/50
  focus:ring-2
  focus:ring-violet-500/10
`;

function Field({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

function Label({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <label
      className="
        mb-2
        block
        text-sm
        font-medium
        text-[#b5adbf]
      "
    >
      {children}
    </label>
  );
}

function Optional() {
  return (
    <span
      className="
        ml-2
        text-[10px]
        font-normal
        uppercase
        text-[#665f70]
      "
    >
      optional
    </span>
  );
}

function SelectWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative">
      {children}

      <ChevronDown
        size={16}
        className="
          pointer-events-none
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-[#746d7f]
        "
      />
    </div>
  );
}

function StepHeader({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        flex
        items-start
        gap-4
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
          text-sm
          font-bold
          text-violet-300
        "
      >
        {number}
      </div>

      <div>
        <div
          className="
            text-[10px]
            font-medium
            uppercase
            tracking-[0.14em]
            text-violet-400
          "
        >
          {eyebrow}
        </div>

        <h2
          className="
            mt-1
            text-xl
            font-bold
            text-white
            sm:text-2xl
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-1
            max-w-2xl
            text-sm
            leading-6
            text-[#7f788b]
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}

function PreviewItem({
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
        rounded-xl
        bg-white/[0.025]
        p-3
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          text-xs
          text-[#716a7c]
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
          text-[#c0b8ca]
        "
      >
        {value}
      </div>
    </div>
  );
}

function LevelBadge({
  label,
  range,
}: {
  label: string;
  range: string;
}) {
  return (
    <div
      className="
        rounded-lg
        border
        border-white/[0.05]
        bg-white/[0.02]
        px-3
        py-2
      "
    >
      <div className="text-[#aaa3b5]">
        {label}
      </div>

      <div
        className="
          mt-0.5
          text-[#625b6d]
        "
      >
        {range}
      </div>
    </div>
  );
}

/* =========================================================
   LABEL HELPERS
========================================================= */

function readinessLabel(
  score: number,
) {
  if (score >= 90) {
    return "Priority — запрос полностью готов";
  }

  if (score >= 70) {
    return "Ready — можно публиковать";
  }

  if (score >= 40) {
    return "Working — нужно дополнить";
  }

  return "Draft — данных пока недостаточно";
}

function specialistLabel(
  specialist: Exclude<
    SpecialistType,
    ""
  >,
) {
  switch (specialist) {
    case "Agronomist":
      return "Агроном";

    case "Veterinarian":
      return "Ветеринар";

    case "Biotechnologist":
      return "Биотехнолог";

    case "Agri-engineer":
      return "Агроинженер";

    case "Soil scientist":
      return "Почвовед";

    case "Plant protection specialist":
      return "Специалист по защите растений";

    case "Food technologist":
      return "Пищевой технолог";

    case "Laboratory specialist":
      return "Лабораторный специалист";
  }
}

function employmentLabel(
  employment: Exclude<
    EmploymentType,
    ""
  >,
) {
  switch (employment) {
    case "Internship":
      return "Стажировка";

    case "Full-time":
      return "Полная занятость";

    case "Part-time":
      return "Частичная занятость";

    case "Seasonal":
      return "Сезонная работа";

    case "Research project":
      return "Исследовательский проект";
  }
}