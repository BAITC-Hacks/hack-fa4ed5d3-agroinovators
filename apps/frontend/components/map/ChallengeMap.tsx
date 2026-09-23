"use client";

import Link from "next/link";

import {
  useMemo,
  useRef,
  useState,
} from "react";

import Map, {
  Marker,
  NavigationControl,
  type MapRef,
} from "react-map-gl/maplibre";

import {
  setWorkerUrl,
} from "maplibre-gl";

import {
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronDown,
  FlaskConical,
  GraduationCap,
  Home,
  MapPin,
  Navigation,
  RotateCcw,
  Sprout,
  Users,
  Wrench,
} from "lucide-react";

/*
  Если ты уже настроил worker через public/maplibre,
  оставляем это.
*/
setWorkerUrl(
  "/maplibre/maplibre-gl-worker.mjs",
);

/* =========================================================
   TYPES
========================================================= */

type SpecialistType =
  | "Agronomist"
  | "Veterinarian"
  | "Biotechnologist"
  | "Agri-engineer";

type EmploymentType =
  | "Internship"
  | "Full-time"
  | "Part-time"
  | "Seasonal"
  | "Research project";

type DemandLevel =
  | "high"
  | "medium"
  | "open";

interface AgroDemand {
  id: string;

  title: string;

  organization: string;

  specialist: SpecialistType;

  requiredCount: number;

  employmentType: EmploymentType;

  skills: string[];

  salary?: string;

  accommodation: boolean;

  contact: string;

  readinessScore: number;

  demandLevel: DemandLevel;

  description: string;

  location: {
    region: string;
    district?: string;
    locality: string;

    latitude: number;
    longitude: number;
  };
}

/* =========================================================
   DEMO DATA
========================================================= */

/*
  Сейчас используем 2 известные точки.

  3 agronomists + 2 biotechnology specialists
  = 5 специалистов.

  Именно поэтому статистика на map/page.tsx
  сейчас показывает 5 специалистов / 2 локации /
  2 специальности.
*/

const demands: AgroDemand[] = [
  {
    id: "sovetskoye-agronomists",

    title:
      "Агрономы для мониторинга состояния посевов",

    organization:
      "Сельскохозяйственное предприятие",

    specialist: "Agronomist",

    requiredCount: 3,

    employmentType: "Seasonal",

    skills: [
      "Crop protection",
      "Soil analysis",
      "GIS",
      "Crop monitoring",
    ],

    salary: "250 000–350 000 ₸",

    accommodation: true,

    contact: "agro@example.kz",

    readinessScore: 90,

    demandLevel: "high",

    description:
      "Хозяйству нужны специалисты для мониторинга состояния посевов, раннего выявления проблем и оценки здоровья сельскохозяйственных культур.",

    location: {
      region:
        "Северо-Казахстанская область",

      district:
        "район Магжана Жумабаева",

      locality:
        "Советское",

      latitude:
        54.430799,

      longitude:
        70.341195,
    },
  },

  {
    id: "petropavlovsk-biotechnology",

    title:
      "Стажировка по агробиотехнологиям",

    organization:
      "Агробиотехнологическая лаборатория",

    specialist:
      "Biotechnologist",

    requiredCount:
      2,

    employmentType:
      "Internship",

    skills: [
      "PCR",
      "Laboratory analysis",
      "Plant biology",
      "Plant diagnostics",
    ],

    salary:
      "По результатам собеседования",

    accommodation:
      false,

    contact:
      "biolab@example.kz",

    readinessScore:
      82,

    demandLevel:
      "medium",

    description:
      "Лаборатория приглашает студентов и молодых специалистов для участия в диагностике заболеваний растений и лабораторных исследованиях.",

    location: {
      region:
        "Северо-Казахстанская область",

      locality:
        "Петропавловск",

      latitude:
        54.861865,

      longitude:
        69.139635,
    },
  },
];

/* =========================================================
   MAP STYLE
========================================================= */

const mapStyle = {
  version: 8 as const,

  sources: {
    osm: {
      type: "raster" as const,

      tiles: [
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      ],

      tileSize: 256,

      attribution:
        "© OpenStreetMap contributors",
    },
  },

  layers: [
    {
      id: "osm",

      type: "raster" as const,

      source: "osm",

      paint: {
        "raster-brightness-min": 0.18,
        "raster-brightness-max": 0.63,
        "raster-contrast": 0.22,
        "raster-saturation": -0.4,
      },
    },
  ],
};

/* =========================================================
   OPTIONS
========================================================= */

const specialistOptions:
  Array<SpecialistType | "all"> = [
    "all",
    "Agronomist",
    "Veterinarian",
    "Biotechnologist",
    "Agri-engineer",
  ];

const employmentOptions:
  Array<EmploymentType | "all"> = [
    "all",
    "Internship",
    "Full-time",
    "Part-time",
    "Seasonal",
    "Research project",
  ];

/* =========================================================
   COMPONENT
========================================================= */

export default function ChallengeMap() {
  const mapRef =
    useRef<MapRef | null>(null);

  const [
    selectedSpecialist,
    setSelectedSpecialist,
  ] =
    useState<
      SpecialistType | "all"
    >("all");

  const [
    selectedEmployment,
    setSelectedEmployment,
  ] =
    useState<
      EmploymentType | "all"
    >("all");

  const [
    selectedDemand,
    setSelectedDemand,
  ] =
    useState<AgroDemand | null>(
      demands[0],
    );

  /* =======================================================
     FILTERING
  ======================================================= */

  const filteredDemands =
    useMemo(() => {
      return demands.filter(
        (demand) => {
          const specialistMatches =
            selectedSpecialist ===
              "all" ||
            demand.specialist ===
              selectedSpecialist;

          const employmentMatches =
            selectedEmployment ===
              "all" ||
            demand.employmentType ===
              selectedEmployment;

          return (
            specialistMatches &&
            employmentMatches
          );
        },
      );
    }, [
      selectedSpecialist,
      selectedEmployment,
    ]);

  const totalSpecialists =
    filteredDemands.reduce(
      (sum, demand) =>
        sum +
        demand.requiredCount,

      0,
    );

  /* =======================================================
     MAP ACTIONS
  ======================================================= */

  function selectDemand(
    demand: AgroDemand,
  ) {
    setSelectedDemand(demand);

    mapRef.current?.flyTo({
      center: [
        demand.location.longitude,
        demand.location.latitude,
      ],

      zoom: 10.5,

      duration: 1000,
    });
  }

  function showAllDemands() {
    if (
      filteredDemands.length === 0
    ) {
      return;
    }

    if (
      filteredDemands.length === 1
    ) {
      selectDemand(
        filteredDemands[0],
      );

      return;
    }

    const longitudes =
      filteredDemands.map(
        (demand) =>
          demand.location
            .longitude,
      );

    const latitudes =
      filteredDemands.map(
        (demand) =>
          demand.location
            .latitude,
      );

    mapRef.current?.fitBounds(
      [
        [
          Math.min(
            ...longitudes,
          ),

          Math.min(
            ...latitudes,
          ),
        ],

        [
          Math.max(
            ...longitudes,
          ),

          Math.max(
            ...latitudes,
          ),
        ],
      ],

      {
        padding: 110,
        duration: 1000,
      },
    );

    setSelectedDemand(null);
  }

  function resetFilters() {
    setSelectedSpecialist(
      "all",
    );

    setSelectedEmployment(
      "all",
    );

    setSelectedDemand(
      demands[0],
    );

    setTimeout(
      () => {
        mapRef.current?.fitBounds(
          [
            [68.9, 54.25],
            [70.55, 55.0],
          ],

          {
            padding: 90,
            duration: 900,
          },
        );
      },

      50,
    );
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-violet-400/15
        bg-[#0a0714]
        shadow-[0_30px_100px_rgba(0,0,0,.35)]
      "
    >
      {/* ===================================================
          FILTER BAR
      =================================================== */}

      <div
        className="
          border-b
          border-violet-400/10
          bg-[#0d0918]
          p-4
          sm:p-5
        "
      >
        <div
          className="
            flex
            flex-col
            gap-4
            xl:flex-row
            xl:items-center
            xl:justify-between
          "
        >
          <div>
            <div
              className="
                text-sm
                font-semibold
                text-white
              "
            >
              Фильтры спроса
            </div>

            <div
              className="
                mt-1
                text-xs
                text-[#756e83]
              "
            >
              Найдите подходящую
              аграрную специальность
              и формат работы
            </div>
          </div>

          <div
            className="
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:flex-wrap
            "
          >
            {/* SPECIALIST */}

            <div
              className="
                relative
                min-w-[220px]
              "
            >
              <select
                value={
                  selectedSpecialist
                }
                onChange={(
                  event,
                ) => {
                  setSelectedSpecialist(
                    event.target
                      .value as
                      | SpecialistType
                      | "all",
                  );

                  setSelectedDemand(
                    null,
                  );
                }}
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
                  transition
                  focus:border-violet-400/50
                "
              >
                {specialistOptions.map(
                  (option) => (
                    <option
                      key={
                        option
                      }
                      value={
                        option
                      }
                    >
                      {specialistLabel(
                        option,
                      )}
                    </option>
                  ),
                )}
              </select>

              <ChevronDown
                size={16}
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-[#7b7488]
                "
              />
            </div>

            {/* EMPLOYMENT */}

            <div
              className="
                relative
                min-w-[190px]
              "
            >
              <select
                value={
                  selectedEmployment
                }
                onChange={(
                  event,
                ) => {
                  setSelectedEmployment(
                    event.target
                      .value as
                      | EmploymentType
                      | "all",
                  );

                  setSelectedDemand(
                    null,
                  );
                }}
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
                  transition
                  focus:border-violet-400/50
                "
              >
                {employmentOptions.map(
                  (option) => (
                    <option
                      key={
                        option
                      }
                      value={
                        option
                      }
                    >
                      {employmentLabel(
                        option,
                      )}
                    </option>
                  ),
                )}
              </select>

              <ChevronDown
                size={16}
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-[#7b7488]
                "
              />
            </div>

            {/* SHOW ALL */}

            <button
              type="button"
              onClick={
                showAllDemands
              }
              className="
                flex
                h-12
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-violet-400/15
                bg-violet-500/[0.06]
                px-4
                text-sm
                text-violet-200
                transition
                hover:bg-violet-500/[0.12]
              "
            >
              <Navigation
                size={16}
              />

              Показать все
            </button>

            {/* RESET */}

            <button
              type="button"
              onClick={
                resetFilters
              }
              className="
                flex
                h-12
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-white/[0.06]
                px-4
                text-sm
                text-[#8e879a]
                transition
                hover:bg-white/[0.04]
                hover:text-white
              "
            >
              <RotateCcw
                size={15}
              />

              Сбросить
            </button>
          </div>
        </div>

        {/* FILTER RESULT */}

        <div
          className="
            mt-4
            flex
            flex-wrap
            items-center
            gap-x-5
            gap-y-2
            border-t
            border-white/[0.05]
            pt-4
            text-xs
          "
        >
          <span
            className="
              text-[#716a7e]
            "
          >
            Найдено:
          </span>

          <span
            className="
              font-medium
              text-white
            "
          >
            {
              filteredDemands.length
            }{" "}
            локации
          </span>

          <span
            className="
              h-1
              w-1
              rounded-full
              bg-[#50495c]
            "
          />

          <span
            className="
              font-medium
              text-violet-300
            "
          >
            {
              totalSpecialists
            }{" "}
            специалистов
          </span>
        </div>
      </div>

      {/* ===================================================
          MAP + DETAILS
      =================================================== */}

      <div
        className="
          grid
          lg:grid-cols-[minmax(0,1fr)_380px]
        "
      >
        {/* =================================================
            MAP
        ================================================= */}

        <div
          className="
            relative
            min-h-[650px]
            overflow-hidden
            border-b
            border-violet-400/10
            lg:border-b-0
            lg:border-r
          "
        >
          <Map
            ref={
              mapRef
            }
            initialViewState={{
              longitude:
                69.72,

              latitude:
                54.64,

              zoom:
                7.4,
            }}
            mapStyle={
              mapStyle
            }
            style={{
              width:
                "100%",

              height:
                "650px",
            }}
          >
            <NavigationControl
              position="bottom-right"
            />

            {filteredDemands.map(
              (demand) => (
                <Marker
                  key={
                    demand.id
                  }
                  longitude={
                    demand
                      .location
                      .longitude
                  }
                  latitude={
                    demand
                      .location
                      .latitude
                  }
                  anchor="center"
                >
                  <DemandMarker
                    demand={
                      demand
                    }
                    selected={
                      selectedDemand
                        ?.id ===
                      demand.id
                    }
                    onClick={() =>
                      selectDemand(
                        demand,
                      )
                    }
                  />
                </Marker>
              ),
            )}
          </Map>

          {/* MAP LABEL */}

          <div
            className="
              pointer-events-none
              absolute
              left-4
              top-4
              rounded-xl
              border
              border-violet-400/15
              bg-[#0b0816]/90
              px-4
              py-3
              backdrop-blur-xl
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
                text-sm
                font-medium
                text-white
              "
            >
              <MapPin
                size={15}
                className="
                  text-violet-400
                "
              />

              North Kazakhstan
            </div>

            <div
              className="
                mt-1
                text-[11px]
                text-[#777081]
              "
            >
              Agricultural demand
              map
            </div>
          </div>

          {/* EMPTY */}

          {filteredDemands.length ===
            0 && (
            <div
              className="
                absolute
                left-1/2
                top-1/2
                w-[90%]
                max-w-md
                -translate-x-1/2
                -translate-y-1/2
                rounded-2xl
                border
                border-violet-400/20
                bg-[#0b0816]/95
                p-6
                text-center
                backdrop-blur-xl
              "
            >
              <div
                className="
                  mx-auto
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
                <BriefcaseBusiness
                  size={22}
                />
              </div>

              <h3
                className="
                  mt-4
                  font-semibold
                  text-white
                "
              >
                Нет активного
                спроса
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-[#81798d]
                "
              >
                Для выбранной
                специальности и
                формата работы пока
                нет опубликованных
                потребностей.
              </p>

              <button
                type="button"
                onClick={
                  resetFilters
                }
                className="
                  mt-4
                  rounded-xl
                  bg-violet-600
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                "
              >
                Показать все
              </button>
            </div>
          )}
        </div>

        {/* =================================================
            DETAILS PANEL
        ================================================= */}

        <aside
          className="
            min-h-[650px]
            bg-[#0c0917]
            p-5
            sm:p-6
          "
        >
          {selectedDemand ? (
            <DemandDetails
              demand={
                selectedDemand
              }
            />
          ) : (
            <MapEmptyDetails
              demands={
                filteredDemands
              }
              onSelect={
                selectDemand
              }
            />
          )}
        </aside>
      </div>
    </div>
  );
}

/* =========================================================
   MARKER
========================================================= */

function DemandMarker({
  demand,
  selected,
  onClick,
}: {
  demand: AgroDemand;
  selected: boolean;
  onClick: () => void;
}) {
  const colors =
    demandColorClasses(
      demand.demandLevel,
    );

  return (
    <button
      type="button"
      onClick={
        onClick
      }
      aria-label={`Открыть спрос в ${demand.location.locality}`}
      className={`
        relative
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border-[3px]
        border-white
        text-white
        shadow-lg
        transition-all
        duration-200
        hover:scale-110

        ${colors}

        ${
          selected
            ? "scale-110 ring-4 ring-violet-400/20"
            : ""
        }
      `}
    >
      <SpecialistIcon
        specialist={
          demand.specialist
        }
      />

      <span
        className="
          absolute
          -right-2
          -top-2
          flex
          h-6
          min-w-6
          items-center
          justify-center
          rounded-full
          border
          border-white/20
          bg-[#0b0816]
          px-1
          text-[10px]
          font-bold
          text-white
        "
      >
        {
          demand.requiredCount
        }
      </span>
    </button>
  );
}

/* =========================================================
   DETAILS
========================================================= */

function DemandDetails({
  demand,
}: {
  demand: AgroDemand;
}) {
  return (
    <div>
      {/* TYPE */}

      <div
        className="
          flex
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
          <SpecialistIcon
            specialist={
              demand.specialist
            }
            size={14}
          />

          {
            demand.specialist
          }
        </div>

        <DemandBadge
          level={
            demand.demandLevel
          }
        />
      </div>

      {/* TITLE */}

      <h2
        className="
          mt-5
          text-2xl
          font-bold
          leading-tight
          text-white
        "
      >
        {demand.title}
      </h2>

      <div
        className="
          mt-3
          flex
          items-start
          gap-2
          text-sm
          leading-5
          text-[#8e8799]
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
          {
            demand.location
              .locality
          }

          {demand.location
            .district &&
            ` · ${demand.location.district}`}
        </span>
      </div>

      <div
        className="
          mt-2
          flex
          items-center
          gap-2
          text-sm
          text-[#8e8799]
        "
      >
        <Building2
          size={15}
          className="
            text-violet-400
          "
        />

        {
          demand.organization
        }
      </div>

      <p
        className="
          mt-5
          text-sm
          leading-6
          text-[#8d8698]
        "
      >
        {
          demand.description
        }
      </p>

      {/* INFORMATION */}

      <div
        className="
          mt-6
          space-y-2
        "
      >
        <DetailRow
          icon={
            <Users
              size={16}
            />
          }
          label="Требуется"
          value={`${demand.requiredCount} ${specialistCountLabel(
            demand.requiredCount,
          )}`}
        />

        <DetailRow
          icon={
            <BriefcaseBusiness
              size={16}
            />
          }
          label="Формат"
          value={
            demand.employmentType
          }
        />

        <DetailRow
          icon={
            <GraduationCap
              size={16}
            />
          }
          label="Зарплата"
          value={
            demand.salary ??
            "Не указана"
          }
        />

        <DetailRow
          icon={
            <Home
              size={16}
            />
          }
          label="Проживание"
          value={
            demand.accommodation
              ? "Предоставляется"
              : "Не предоставляется"
          }
        />
      </div>

      {/* SKILLS */}

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
            font-medium
            uppercase
            tracking-[0.12em]
            text-[#6f687a]
          "
        >
          Требуемые навыки
        </div>

        <div
          className="
            flex
            flex-wrap
            gap-2
          "
        >
          {demand.skills.map(
            (skill) => (
              <span
                key={
                  skill
                }
                className="
                  rounded-lg
                  border
                  border-violet-400/10
                  bg-violet-500/[0.06]
                  px-2.5
                  py-1.5
                  text-xs
                  text-[#b9b1c7]
                "
              >
                {skill}
              </span>
            ),
          )}
        </div>
      </div>

      {/* READINESS */}

      <div
        className="
          mt-6
          rounded-2xl
          border
          border-violet-400/15
          bg-violet-500/[0.05]
          p-4
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
                text-[11px]
                uppercase
                tracking-[0.14em]
                text-[#797184]
              "
            >
              Demand Readiness
            </div>

            <div
              className="
                mt-1
                text-3xl
                font-bold
                text-violet-300
              "
            >
              {
                demand.readinessScore
              }

              <span
                className="
                  ml-1
                  text-sm
                  font-normal
                  text-[#706979]
                "
              >
                /100
              </span>
            </div>
          </div>

          <CheckCircle2
            size={24}
            className="
              text-violet-400
            "
          />
        </div>

        <div
          className="
            mt-4
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
              to-fuchsia-400
            "
            style={{
              width: `${demand.readinessScore}%`,
            }}
          />
        </div>
      </div>

      {/* CONTACT */}

      <div
        className="
          mt-5
          text-xs
          text-[#746d80]
        "
      >
        Контакт организации
      </div>

      <div
        className="
          mt-1
          text-sm
          text-[#b2aabd]
        "
      >
        {
          demand.contact
        }
      </div>

      {/* ACTIONS */}

      <div
        className="
          mt-6
          grid
          gap-3
          sm:grid-cols-2
          lg:grid-cols-1
          xl:grid-cols-2
        "
      >
        <Link
          href={`/challenges/${demand.id}`}
          className="
            flex
            min-h-12
            items-center
            justify-center
            rounded-xl
            border
            border-violet-400/20
            px-4
            text-sm
            font-medium
            text-violet-200
            transition
            hover:bg-violet-500/10
          "
        >
          Смотреть задачу
        </Link>

        <Link
          href={`/challenges/${demand.id}?apply=true`}
          className="
            flex
            min-h-12
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-r
            from-violet-600
            to-purple-600
            px-4
            text-sm
            font-semibold
            text-white
            shadow-[0_0_25px_rgba(139,92,246,.20)]
            transition
            hover:from-violet-500
            hover:to-purple-500
          "
        >
          Откликнуться
        </Link>
      </div>
    </div>
  );
}

/* =========================================================
   EMPTY / LOCATION LIST
========================================================= */

function MapEmptyDetails({
  demands,
  onSelect,
}: {
  demands: AgroDemand[];
  onSelect: (
    demand: AgroDemand,
  ) => void;
}) {
  return (
    <div>
      <div
        className="
          text-xs
          font-medium
          uppercase
          tracking-[0.15em]
          text-violet-400
        "
      >
        Открытый спрос
      </div>

      <h2
        className="
          mt-2
          text-2xl
          font-bold
          text-white
        "
      >
        Выберите локацию
      </h2>

      <p
        className="
          mt-2
          text-sm
          leading-6
          text-[#817a8c]
        "
      >
        Нажмите на маркер
        карты или выберите
        карточку ниже.
      </p>

      <div
        className="
          mt-6
          space-y-3
        "
      >
        {demands.length >
        0 ? (
          demands.map(
            (demand) => (
              <button
                key={
                  demand.id
                }
                type="button"
                onClick={() =>
                  onSelect(
                    demand,
                  )
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-violet-400/10
                  bg-white/[0.02]
                  p-4
                  text-left
                  transition
                  hover:border-violet-400/30
                  hover:bg-violet-500/[0.05]
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
                      {
                        demand
                          .location
                          .locality
                      }
                    </div>

                    <div
                      className="
                        mt-1
                        text-xs
                        text-[#746d80]
                      "
                    >
                      {
                        demand.specialist
                      }
                    </div>
                  </div>

                  <span
                    className="
                      text-sm
                      font-semibold
                      text-violet-300
                    "
                  >
                    {
                      demand.requiredCount
                    }{" "}
                    needed
                  </span>
                </div>
              </button>
            ),
          )
        ) : (
          <div
            className="
              rounded-xl
              border
              border-violet-400/10
              bg-white/[0.02]
              p-4
              text-sm
              text-[#777080]
            "
          >
            Нет подходящих
            результатов.
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   DETAIL ROW
========================================================= */

function DetailRow({
  icon,
  label,
  value,
}: {
  icon:
    React.ReactNode;

  label:
    string;

  value:
    string;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        rounded-xl
        bg-white/[0.025]
        px-3
        py-3
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          text-xs
          text-[#756e81]
        "
      >
        <span
          className="
            text-violet-400
          "
        >
          {icon}
        </span>

        {label}
      </div>

      <div
        className="
          text-right
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
   BADGE
========================================================= */

function DemandBadge({
  level,
}: {
  level: DemandLevel;
}) {
  const styles = {
    high:
      "bg-violet-500/10 text-violet-300",

    medium:
      "bg-amber-500/10 text-amber-300",

    open:
      "bg-orange-500/10 text-orange-300",
  };

  const labels = {
    high:
      "Высокий спрос",

    medium:
      "Средний спрос",

    open:
      "Открыто",
  };

  return (
    <span
      className={`
        rounded-full
        px-2.5
        py-1
        text-[10px]
        font-medium

        ${styles[level]}
      `}
    >
      {labels[level]}
    </span>
  );
}

/* =========================================================
   SPECIALIST ICON
========================================================= */

function SpecialistIcon({
  specialist,
  size = 18,
}: {
  specialist:
    SpecialistType;

  size?: number;
}) {
  if (
    specialist ===
    "Agronomist"
  ) {
    return (
      <Sprout
        size={size}
      />
    );
  }

  if (
    specialist ===
    "Biotechnologist"
  ) {
    return (
      <FlaskConical
        size={size}
      />
    );
  }

  if (
    specialist ===
    "Agri-engineer"
  ) {
    return (
      <Wrench
        size={size}
      />
    );
  }

  return (
    <BriefcaseBusiness
      size={size}
    />
  );
}

/* =========================================================
   HELPERS
========================================================= */

function demandColorClasses(
  level: DemandLevel,
) {
  if (
    level === "high"
  ) {
    return `
      bg-violet-600
      shadow-[0_0_30px_rgba(139,92,246,.65)]
    `;
  }

  if (
    level === "medium"
  ) {
    return `
      bg-amber-500
      shadow-[0_0_30px_rgba(245,158,11,.55)]
    `;
  }

  return `
    bg-orange-500
    shadow-[0_0_30px_rgba(249,115,22,.55)]
  `;
}

function specialistLabel(
  specialist:
    SpecialistType | "all",
) {
  switch (
    specialist
  ) {
    case "Agronomist":
      return "Агрономы";

    case "Veterinarian":
      return "Ветеринары";

    case "Biotechnologist":
      return "Биотехнологи";

    case "Agri-engineer":
      return "Агроинженеры";

    default:
      return "Все специалисты";
  }
}

function employmentLabel(
  employment:
    EmploymentType | "all",
) {
  switch (
    employment
  ) {
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

    default:
      return "Все форматы";
  }
}

function specialistCountLabel(
  count: number,
) {
  if (
    count === 1
  ) {
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