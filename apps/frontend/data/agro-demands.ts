import type { AgroDemand } from "@/types/agro";

export const agroDemands: AgroDemand[] = [
  {
    id: "sko-sovetskoye-agronomist",
    title: "Agronomists for crop monitoring",
    organization: "Agricultural enterprise",
    location: {
      region: "North Kazakhstan Region",
      district: "Magzhan Zhumabayev District",
      locality: "Советское",
      latitude: 54.430799,
      longitude: 70.341195,
    },
    specialist: "Agronomist",
    requiredCount: 3,
    employmentType: "Seasonal",
    skills: [
      "Crop protection",
      "Soil analysis",
      "GIS",
    ],
    salary: "250 000–350 000 ₸",
    accommodation: true,
    contact: "agro@example.kz",
    readinessScore: 90,
    demandLevel: "high",
    description:
      "The farm requires agronomists for crop monitoring and early detection of plant health problems.",
  },

  {
    id: "petropavlovsk-biotech",
    title: "Biotechnology research assistant",
    organization: "Agricultural laboratory",
    location: {
      region: "North Kazakhstan Region",
      locality: "Петропавловск",
      latitude: 54.861865,
      longitude: 69.139635,
    },
    specialist: "Biotechnologist",
    requiredCount: 2,
    employmentType: "Internship",
    skills: [
      "PCR",
      "Laboratory analysis",
      "Plant biology",
    ],
    accommodation: false,
    contact: "lab@example.kz",
    readinessScore: 82,
    demandLevel: "medium",
    description:
      "Agricultural laboratory is looking for biotechnology students for plant diagnostics research.",
  },
];