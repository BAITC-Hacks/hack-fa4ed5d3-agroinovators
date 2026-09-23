import type { AgroDemand } from "@/types/agro";

/*
  DEMO DATA

  Coordinates are based on the locations supplied for the MVP.

  Organization names, salaries and demand descriptions below
  are demo placeholders for the hackathon prototype.
*/

export const agroDemands: AgroDemand[] = [
  /* =======================================================
     PETROPAVLOVSK
  ======================================================= */

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
        54.8734,

      longitude:
        69.1507,
    },
  },

  /* =======================================================
     BISHKUL
  ======================================================= */

  {
    id: "bishkul-agronomists",

    title:
      "Агрономы для мониторинга посевов",

    organization:
      "Bishkul Agro Farm",

    specialist:
      "Agronomist",

    requiredCount:
      3,

    employmentType:
      "Seasonal",

    skills: [
      "Crop monitoring",
      "Soil analysis",
      "Crop protection",
    ],

    salary:
      "280 000–360 000 ₸",

    accommodation:
      true,

    contact:
      "bishkul@example.kz",

    readinessScore:
      91,

    demandLevel:
      "high",

    description:
      "Хозяйству нужны агрономы для сезонного мониторинга сельскохозяйственных культур.",

    location: {
      region:
        "Северо-Казахстанская область",

      locality:
        "Бишкуль",

      latitude:
        54.7776,

      longitude:
        69.0995,
    },
  },

  /* =======================================================
     SMIRNOVO
  ======================================================= */

  {
    id: "smirnovo-veterinarian",

    title:
      "Ветеринар для сельскохозяйственного хозяйства",

    organization:
      "Smirnovo Farm",

    specialist:
      "Veterinarian",

    requiredCount:
      1,

    employmentType:
      "Full-time",

    skills: [
      "Animal health",
      "Diagnostics",
      "Farm management",
    ],

    salary:
      "300 000–420 000 ₸",

    accommodation:
      true,

    contact:
      "smirnovo@example.kz",

    readinessScore:
      88,

    demandLevel:
      "high",

    description:
      "Хозяйству требуется ветеринар для контроля состояния животных и профилактических мероприятий.",

    location: {
      region:
        "Северо-Казахстанская область",

      locality:
        "Смирново",

      latitude:
        54.5148,

      longitude:
        69.4273,
    },
  },

  /* =======================================================
     YAVLENKA
  ======================================================= */

  {
    id: "yavlenka-soil-scientist",

    title:
      "Специалист по анализу почвы",

    organization:
      "Yavlenka Agro",

    specialist:
      "Soil scientist",

    requiredCount:
      2,

    employmentType:
      "Research project",

    skills: [
      "Soil sampling",
      "Soil chemistry",
      "GIS",
    ],

    salary:
      "Проектная оплата",

    accommodation:
      false,

    contact:
      "yavlenka@example.kz",

    readinessScore:
      79,

    demandLevel:
      "medium",

    description:
      "Необходим специалист для анализа состояния почв и подготовки рекомендаций для хозяйства.",

    location: {
      region:
        "Северо-Казахстанская область",

      locality:
        "Явленка",

      latitude:
        54.3453,

      longitude:
        68.4574,
    },
  },

  /* =======================================================
     BULAEVO
  ======================================================= */

  {
    id: "bulaevo-agri-engineer",

    title:
      "Агроинженер по сельхозтехнике",

    organization:
      "Bulaevo AgroTech",

    specialist:
      "Agri-engineer",

    requiredCount:
      2,

    employmentType:
      "Full-time",

    skills: [
      "Agricultural machinery",
      "Maintenance",
      "Technical diagnostics",
    ],

    salary:
      "320 000–450 000 ₸",

    accommodation:
      true,

    contact:
      "bulaevo@example.kz",

    readinessScore:
      94,

    demandLevel:
      "high",

    description:
      "Предприятию необходимы специалисты для обслуживания и диагностики сельскохозяйственной техники.",

    location: {
      region:
        "Северо-Казахстанская область",

      locality:
        "Булаево",

      latitude:
        54.906,

      longitude:
        70.4416,
    },
  },

  /* =======================================================
     NOVOISHIMSKOYE
  ======================================================= */

  {
    id: "novoishimskoye-plant-protection",

    title:
      "Специалист по защите растений",

    organization:
      "Novoishim Agro",

    specialist:
      "Plant protection specialist",

    requiredCount:
      3,

    employmentType:
      "Seasonal",

    skills: [
      "Disease identification",
      "Crop protection",
      "Field monitoring",
    ],

    salary:
      "270 000–370 000 ₸",

    accommodation:
      true,

    contact:
      "novoishim@example.kz",

    readinessScore:
      86,

    demandLevel:
      "high",

    description:
      "Хозяйству требуется специалист для обнаружения заболеваний растений и контроля состояния посевов.",

    location: {
      region:
        "Северо-Казахстанская область",

      locality:
        "Новоишимское",

      latitude:
        53.1981,

      longitude:
        66.7694,
    },
  },

  /* =======================================================
     TAIYNSHA
  ======================================================= */

  {
    id: "taiynsha-food-technologist",

    title:
      "Технолог сельскохозяйственной продукции",

    organization:
      "Taiynsha Food Processing",

    specialist:
      "Food technologist",

    requiredCount:
      2,

    employmentType:
      "Internship",

    skills: [
      "Food technology",
      "Quality control",
      "Food safety",
    ],

    salary:
      "180 000–240 000 ₸",

    accommodation:
      false,

    contact:
      "taiynsha@example.kz",

    readinessScore:
      74,

    demandLevel:
      "open",

    description:
      "Предприятие приглашает студентов для работы с контролем качества и переработкой сельскохозяйственной продукции.",

    location: {
      region:
        "Северо-Казахстанская область",

      locality:
        "Тайынша",

      latitude:
        53.848,

      longitude:
        69.7677,
    },
  },

  /* =======================================================
     TIMIRYAZEVO
  ======================================================= */

  {
    id: "timiryazevo-laboratory",

    title:
      "Лабораторный специалист",

    organization:
      "Timiryazevo Agricultural Lab",

    specialist:
      "Laboratory specialist",

    requiredCount:
      1,

    employmentType:
      "Research project",

    skills: [
      "Laboratory analysis",
      "Sample preparation",
      "Plant diagnostics",
    ],

    salary:
      "Проектная оплата",

    accommodation:
      true,

    contact:
      "timiryazevo@example.kz",

    readinessScore:
      77,

    demandLevel:
      "medium",

    description:
      "Лаборатории требуется специалист для проведения анализа аграрных образцов.",

    location: {
      region:
        "Северо-Казахстанская область",

      locality:
        "Тимирязево",

      latitude:
        53.7495,

      longitude:
        66.4885,
    },
  },

  /* =======================================================
     SERGEYEVKA
  ======================================================= */

  {
    id: "sergeyevka-agronomist",

    title:
      "Агроном по управлению урожайностью",

    organization:
      "Sergeyevka Agro",

    specialist:
      "Agronomist",

    requiredCount:
      2,

    employmentType:
      "Full-time",

    skills: [
      "Crop management",
      "Yield monitoring",
      "Field planning",
    ],

    salary:
      "300 000–400 000 ₸",

    accommodation:
      true,

    contact:
      "sergeyevka@example.kz",

    readinessScore:
      89,

    demandLevel:
      "high",

    description:
      "Хозяйству требуется агроном для планирования полевых работ и повышения урожайности.",

    location: {
      region:
        "Северо-Казахстанская область",

      locality:
        "Сергеевка",

      latitude:
        53.8814,

      longitude:
        67.4088,
    },
  },

  /* =======================================================
     TALSHIK
  ======================================================= */

  {
    id: "talshik-veterinarian",

    title:
      "Ветеринар для животноводческого хозяйства",

    organization:
      "Talshik Livestock Farm",

    specialist:
      "Veterinarian",

    requiredCount:
      2,

    employmentType:
      "Full-time",

    skills: [
      "Animal diagnostics",
      "Livestock health",
      "Preventive care",
    ],

    salary:
      "300 000–430 000 ₸",

    accommodation:
      true,

    contact:
      "talshik@example.kz",

    readinessScore:
      84,

    demandLevel:
      "medium",

    description:
      "Животноводческому хозяйству нужны ветеринарные специалисты для постоянной работы.",

    location: {
      region:
        "Северо-Казахстанская область",

      locality:
        "Талшик",

      latitude:
        53.6374,

      longitude:
        71.874,
    },
  },

  /* =======================================================
     SOVETSKOYE
  ======================================================= */

  {
    id: "sovetskoye-agronomists",

    title:
      "Агрономы для мониторинга состояния посевов",

    organization:
      "Сельскохозяйственное предприятие",

    specialist:
      "Agronomist",

    requiredCount:
      3,

    employmentType:
      "Seasonal",

    skills: [
      "Crop protection",
      "Soil analysis",
      "GIS",
      "Crop monitoring",
    ],

    salary:
      "250 000–350 000 ₸",

    accommodation:
      true,

    contact:
      "agro@example.kz",

    readinessScore:
      90,

    demandLevel:
      "high",

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
];