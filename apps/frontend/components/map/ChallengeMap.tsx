"use client";

import Link from "next/link";

import {
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import Map, {
  Marker,
  NavigationControl,
  type MapRef,
} from "react-map-gl/maplibre";

import { setWorkerUrl } from "maplibre-gl";

import {
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronDown,
  FlaskConical,
  GraduationCap,
  Home,
  MapPin,
  Microscope,
  Navigation,
  RotateCcw,
  Sprout,
  Stethoscope,
  Users,
  Wheat,
  Wrench,
} from "lucide-react";

import { agroDemands } from "@/data/agro-demands";

import type {
  AgroDemand,
  DemandLevel,
  EmploymentType,
  SpecialistType,
} from "@/types/agro";

/* =========================================================
   MAPLIBRE WORKER
========================================================= */

setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");

/* =========================================================
   DATA
========================================================= */

const demands = agroDemands;

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

      attribution: "© OpenStreetMap contributors",
    },
  },

  layers: [
    {
      id: "osm",

      type: "raster" as const,

      source: "osm",

      paint: {
        "raster-brightness-min": 0.16,
        "raster-brightness-max": 0.62,
        "raster-contrast": 0.22,
        "raster-saturation": -0.42,
      },
    },
  ],
};

/* =========================================================
   OPTIONS
========================================================= */

const specialistOptions: Array<
  SpecialistType | "all"
> = [
  "all",
  "Agronomist",
  "Veterinarian",
  "Biotechnologist",
  "Agri-engineer",
  "Soil scientist",
  "Plant protection specialist",
  "Food technologist",
  "Laboratory specialist",
];

const employmentOptions: Array<
  EmploymentType | "all"
> = [
  "all",
  "Internship",
  "Full-time",
  "Part-time",
  "Seasonal",
  "Research project",
];

const localityOptions = Array.from(
  new Set(
    demands.map(
      (demand) => demand.location.locality,
    ),
  ),
).sort((a, b) =>
  a.localeCompare(b, "ru"),
);

/* =========================================================
   COMPONENT
========================================================= */

export default function ChallengeMap() {
  const mapRef =
    useRef<MapRef | null>(null);

  const [
    selectedSpecialist,
    setSelectedSpecialist,
  ] = useState<SpecialistType | "all">(
    "all",
  );

  const [
    selectedEmployment,
    setSelectedEmployment,
  ] = useState<EmploymentType | "all">(
    "all",
  );

  const [
    selectedLocality,
    setSelectedLocality,
  ] = useState<string>("all");

  const [
    selectedDemand,
    setSelectedDemand,
  ] = useState<AgroDemand | null>(
    demands[0] ?? null,
  );

  /* =======================================================
     FILTERING
  ======================================================= */

  const filteredDemands = useMemo(() => {
    return demands.filter((demand) => {
      const specialistMatches =
        selectedSpecialist === "all" ||
        demand.specialist ===
          selectedSpecialist;

      const employmentMatches =
        selectedEmployment === "all" ||
        demand.employmentType ===
          selectedEmployment;

      const localityMatches =
        selectedLocality === "all" ||
        demand.location.locality ===
          selectedLocality;

      return (
        specialistMatches &&
        employmentMatches &&
        localityMatches
      );
    });
  }, [
    selectedSpecialist,
    selectedEmployment,
    selectedLocality,
  ]);

  const totalSpecialists =
    filteredDemands.reduce(
      (sum, demand) =>
        sum + demand.requiredCount,
      0,
    );

  const uniqueLocations = new Set(
    filteredDemands.map(
      (demand) => demand.location.locality,
    ),
  ).size;

  const uniqueSpecialties = new Set(
    filteredDemands.map(
      (demand) => demand.specialist,
    ),
  ).size;

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
          demand.location.longitude,
      );

    const latitudes =
      filteredDemands.map(
        (demand) =>
          demand.location.latitude,
      );

    mapRef.current?.fitBounds(
      [
        [
          Math.min(...longitudes),
          Math.min(...latitudes),
        ],

        [
          Math.max(...longitudes),
          Math.max(...latitudes),
        ],
      ],

      {
        padding: 80,
        duration: 1000,
      },
    );

    setSelectedDemand(null);
  }

  function resetFilters() {
    setSelectedSpecialist("all");

    setSelectedEmployment("all");

    setSelectedLocality("all");

    setSelectedDemand(
      demands[0] ?? null,
    );

    setTimeout(() => {
      mapRef.current?.fitBounds(
        [
          [66.0, 52.9],
          [72.2, 55.15],
        ],

        {
          padding: 70,
          duration: 900,
        },
      );
    }, 50);
  }

  function clearSelection() {
    setSelectedDemand(null);

    showAllDemands();
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
            gap-5
            xl:flex-row
            xl:items-end
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
                max-w-sm
                text-xs
                leading-5
                text-[#756e83]
              "
            >
              Найдите потребность по
              специальности, формату работы
              или населённому пункту.
            </div>
          </div>

          <div
            className="
              grid
              gap-3
              sm:grid-cols-2
              xl:flex
              xl:flex-wrap
            "
          >
            {/* SPECIALIST */}

            <SelectWrapper>
              <select
                value={selectedSpecialist}
                onChange={(event) => {
                  setSelectedSpecialist(
                    event.target.value as
                      | SpecialistType
                      | "all",
                  );

                  setSelectedDemand(null);
                }}
                className={selectClassName}
              >
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
              </select>
            </SelectWrapper>

            {/* EMPLOYMENT */}

            <SelectWrapper>
              <select
                value={selectedEmployment}
                onChange={(event) => {
                  setSelectedEmployment(
                    event.target.value as
                      | EmploymentType
                      | "all",
                  );

                  setSelectedDemand(null);
                }}
                className={selectClassName}
              >
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
              </select>
            </SelectWrapper>

            {/* LOCALITY */}

            <SelectWrapper>
              <select
                value={selectedLocality}
                onChange={(event) => {
                  const locality =
                    event.target.value;

                  setSelectedLocality(
                    locality,
                  );

                  setSelectedDemand(null);

                  if (
                    locality !== "all"
                  ) {
                    const firstDemand =
                      demands.find(
                        (demand) =>
                          demand.location
                            .locality ===
                          locality,
                      );

                    if (firstDemand) {
                      setTimeout(
                        () =>
                          selectDemand(
                            firstDemand,
                          ),
                        50,
                      );
                    }
                  }
                }}
                className={selectClassName}
              >
                <option value="all">
                  Все локации
                </option>

                {localityOptions.map(
                  (locality) => (
                    <option
                      key={locality}
                      value={locality}
                    >
                      {locality}
                    </option>
                  ),
                )}
              </select>
            </SelectWrapper>

            {/* SHOW ALL */}

            <button
              type="button"
              onClick={showAllDemands}
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
              <Navigation size={16} />

              Показать все
            </button>

            {/* RESET */}

            <button
              type="button"
              onClick={resetFilters}
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
              <RotateCcw size={15} />

              Сбросить
            </button>
          </div>
        </div>

        {/* RESULTS */}

        <div
          className="
            mt-5
            flex
            flex-wrap
            items-center
            gap-x-5
            gap-y-3
            border-t
            border-white/[0.05]
            pt-4
            text-xs
          "
        >
          <span className="text-[#716a7e]">
            Найдено:
          </span>

          <ResultStat
            value={uniqueLocations}
            label="локаций"
          />

          <DividerDot />

          <ResultStat
            value={totalSpecialists}
            label="специалистов"
            accent
          />

          <DividerDot />

          <ResultStat
            value={uniqueSpecialties}
            label="специальностей"
          />
        </div>
      </div>

      {/* ===================================================
          MAP + DETAILS
      =================================================== */}

      <div
        className="
          grid
          lg:grid-cols-[minmax(0,1fr)_390px]
        "
      >
        {/* =================================================
            MAP
        ================================================= */}

        <div
          className="
            relative
            min-h-[680px]
            overflow-hidden
            border-b
            border-violet-400/10
            lg:border-b-0
            lg:border-r
          "
        >
          <Map
            ref={mapRef}
            initialViewState={{
              longitude: 69.0,
              latitude: 54.05,
              zoom: 5.8,
            }}
            mapStyle={mapStyle}
            style={{
              width: "100%",
              height: "680px",
            }}
          >
            <NavigationControl
              position="bottom-right"
            />

            {filteredDemands.map(
              (demand) => (
                <Marker
                  key={demand.id}
                  longitude={
                    demand.location
                      .longitude
                  }
                  latitude={
                    demand.location
                      .latitude
                  }
                  anchor="center"
                >
                  <DemandMarker
                    demand={demand}
                    selected={
                      selectedDemand
                        ?.id === demand.id
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

          {/* MAP TITLE */}

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
                className="text-violet-400"
              />

              Северо-Казахстанская область
            </div>

            <div
              className="
                mt-1
                text-[11px]
                text-[#777081]
              "
            >
              Agricultural workforce demand map
            </div>
          </div>

          {/* LEGEND */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-4
              left-4
              hidden
              rounded-xl
              border
              border-violet-400/10
              bg-[#0b0816]/90
              p-3
              backdrop-blur-xl
              sm:block
            "
          >
            <MapLegendRow
              color="bg-violet-600"
              label="Высокий спрос"
            />

            <MapLegendRow
              color="bg-amber-500"
              label="Средний спрос"
            />

            <MapLegendRow
              color="bg-orange-500"
              label="Открытая позиция"
            />
          </div>

          {/* EMPTY STATE */}

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
                p-7
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
                Нет активного спроса
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-[#81798d]
                "
              >
                Для выбранной комбинации
                специальности, формата и
                локации пока нет
                опубликованных запросов.
              </p>

              <button
                type="button"
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
                  transition
                  hover:bg-violet-500
                "
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>

        {/* =================================================
            DETAILS PANEL
        ================================================= */}

        <aside
          className="
            max-h-[680px]
            overflow-y-auto
            bg-[#0c0917]
            p-5
            sm:p-6
          "
        >
          {selectedDemand ? (
            <DemandDetails
              demand={selectedDemand}
              onBack={clearSelection}
            />
          ) : (
            <MapDemandList
              demands={filteredDemands}
              onSelect={selectDemand}
            />
          )}
        </aside>
      </div>
    </div>
  );
}

/* =========================================================
   SELECT WRAPPER
========================================================= */

const selectClassName = `
  h-12
  w-full
  min-w-[190px]
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
`;

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
          text-[#7b7488]
        "
      />
    </div>
  );
}

/* =========================================================
   FILTER RESULT
========================================================= */

function ResultStat({
  value,
  label,
  accent = false,
}: {
  value: number;
  label: string;
  accent?: boolean;
}) {
  return (
    <span
      className={
        accent
          ? "font-medium text-violet-300"
          : "font-medium text-white"
      }
    >
      {value} {label}
    </span>
  );
}

function DividerDot() {
  return (
    <span
      className="
        h-1
        w-1
        rounded-full
        bg-[#50495c]
      "
    />
  );
}

/* =========================================================
   MAP LEGEND
========================================================= */

function MapLegendRow({
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
        py-1
        text-[11px]
        text-[#918a9e]
      "
    >
      <span
        className={`
          h-2
          w-2
          rounded-full
          ${color}
        `}
      />

      {label}
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
      onClick={onClick}
      aria-label={`Открыть спрос в ${demand.location.locality}`}
      title={`${demand.location.locality}: ${specialistLabel(
        demand.specialist,
      )}`}
      className={`
        relative
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        border-[3px]
        border-white
        text-white
        shadow-lg
        transition-all
        duration-200
        hover:z-50
        hover:scale-125

        ${colors}

        ${
          selected
            ? "z-40 scale-125 ring-4 ring-violet-400/25"
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
        {demand.requiredCount}
      </span>
    </button>
  );
}

/* =========================================================
   DETAILS
========================================================= */

function DemandDetails({
  demand,
  onBack,
}: {
  demand: AgroDemand;
  onBack: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="
          mb-5
          text-xs
          text-[#777081]
          transition
          hover:text-violet-300
        "
      >
        ← Все локации
      </button>

      {/* SPECIALIST + DEMAND */}

      <div
        className="
          flex
          items-start
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

          {specialistLabel(
            demand.specialist,
          )}
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

      {/* LOCATION */}

      <div
        className="
          mt-4
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

          <span
            className="
              mt-1
              block
              text-xs
              text-[#686273]
            "
          >
            {
              demand.location
                .region
            }
          </span>
        </span>
      </div>

      {/* ORGANIZATION */}

      <div
        className="
          mt-3
          flex
          items-center
          gap-2
          text-sm
          text-[#8e8799]
        "
      >
        <Building2
          size={15}
          className="text-violet-400"
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
            <Users size={16} />
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
          value={employmentLabel(
            demand.employmentType,
          )}
        />

        <DetailRow
          icon={
            <GraduationCap
              size={16}
            />
          }
          label="Оплата"
          value={
            demand.salary ??
            "Не указана"
          }
        />

        <DetailRow
          icon={
            <Home size={16} />
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
                key={skill}
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
              Agricultural Demand Readiness
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
            className="text-violet-400"
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
            text-[#746d80]
          "
        >
          Контакт организации
        </div>

        <div
          className="
            mt-2
            text-sm
            text-[#c3bbce]
          "
        >
          {demand.contact}
        </div>
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
            text-center
            text-sm
            font-medium
            text-violet-200
            transition
            hover:bg-violet-500/10
          "
        >
          Смотреть запрос
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
            text-center
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
   DEMAND LIST
========================================================= */

function MapDemandList({
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
        Нажмите на маркер карты или
        выберите одну из потребностей
        ниже.
      </p>

      <div
        className="
          mt-6
          space-y-3
        "
      >
        {demands.length > 0 ? (
          demands.map(
            (demand) => (
              <button
                key={demand.id}
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
                        demand.location
                          .locality
                      }
                    </div>

                    <div
                      className="
                        mt-1
                        flex
                        items-center
                        gap-1.5
                        text-xs
                        text-[#746d80]
                      "
                    >
                      <SpecialistIcon
                        specialist={
                          demand.specialist
                        }
                        size={12}
                      />

                      {specialistLabel(
                        demand.specialist,
                      )}
                    </div>
                  </div>

                  <span
                    className="
                      whitespace-nowrap
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

                <div
                  className="
                    mt-3
                    flex
                    items-center
                    justify-between
                    gap-3
                    border-t
                    border-white/[0.05]
                    pt-3
                    text-[11px]
                  "
                >
                  <span className="text-[#716a7e]">
                    {employmentLabel(
                      demand.employmentType,
                    )}
                  </span>

                  <span className="text-[#938b9e]">
                    {
                      demand.readinessScore
                    }
                    /100
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
            Нет подходящих результатов.
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
  icon: ReactNode;
  label: string;
  value: string;
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
        <span className="text-violet-400">
          {icon}
        </span>

        {label}
      </div>

      <div
        className="
          max-w-[55%]
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
   DEMAND BADGE
========================================================= */

function DemandBadge({
  level,
}: {
  level: DemandLevel;
}) {
  const styles: Record<
    DemandLevel,
    string
  > = {
    high:
      "bg-violet-500/10 text-violet-300",

    medium:
      "bg-amber-500/10 text-amber-300",

    open:
      "bg-orange-500/10 text-orange-300",
  };

  const labels: Record<
    DemandLevel,
    string
  > = {
    high: "Высокий спрос",
    medium: "Средний спрос",
    open: "Открыто",
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
  specialist: SpecialistType;
  size?: number;
}) {
  switch (specialist) {
    case "Agronomist":
      return (
        <Sprout size={size} />
      );

    case "Veterinarian":
      return (
        <Stethoscope size={size} />
      );

    case "Biotechnologist":
      return (
        <FlaskConical size={size} />
      );

    case "Agri-engineer":
      return (
        <Wrench size={size} />
      );

    case "Soil scientist":
      return (
        <Wheat size={size} />
      );

    case "Plant protection specialist":
      return (
        <Sprout size={size} />
      );

    case "Food technologist":
      return (
        <BriefcaseBusiness
          size={size}
        />
      );

    case "Laboratory specialist":
      return (
        <Microscope size={size} />
      );

    default:
      return (
        <BriefcaseBusiness
          size={size}
        />
      );
  }
}

/* =========================================================
   HELPERS
========================================================= */

function demandColorClasses(
  level: DemandLevel,
) {
  if (level === "high") {
    return `
      bg-violet-600
      shadow-[0_0_30px_rgba(139,92,246,.65)]
    `;
  }

  if (level === "medium") {
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
  switch (specialist) {
    case "Agronomist":
      return "Агрономы";

    case "Veterinarian":
      return "Ветеринары";

    case "Biotechnologist":
      return "Биотехнологи";

    case "Agri-engineer":
      return "Агроинженеры";

    case "Soil scientist":
      return "Почвоведы";

    case "Plant protection specialist":
      return "Защита растений";

    case "Food technologist":
      return "Пищевые технологи";

    case "Laboratory specialist":
      return "Лабораторные специалисты";

    default:
      return "Все специалисты";
  }
}

function employmentLabel(
  employment:
    EmploymentType | "all",
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

    default:
      return "Все форматы";
  }
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