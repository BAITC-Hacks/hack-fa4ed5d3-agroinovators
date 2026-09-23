export type SpecialistType =
  | "Agronomist"
  | "Veterinarian"
  | "Agri-engineer"
  | "Biotechnologist"
  | "Soil scientist"
  | "Plant protection";

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
  location: {
    region: string;
    district?: string;
    locality: string;
    latitude: number;
    longitude: number;
  };
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
}