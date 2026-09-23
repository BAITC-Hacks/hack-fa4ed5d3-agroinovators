export type SpecialistType =
  | "Agronomist"
  | "Veterinarian"
  | "Biotechnologist"
  | "Agri-engineer"
  | "Soil scientist"
  | "Plant protection specialist"
  | "Food technologist"
  | "Laboratory specialist";

export type EmploymentType =
  | "Internship"
  | "Full-time"
  | "Part-time"
  | "Seasonal"
  | "Research project";

export type DemandLevel =
  | "high"
  | "medium"
  | "open";

export interface AgroDemand {
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