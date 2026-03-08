export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
}

export const experiences: Experience[] = [
  {
    company: "Freelance",
    role: "Desarrollador Flutter y Astro para clientes",
    period: "Actualidad",
    description:
      "Desarrollo proyectos para clientes de forma independiente, encargándome yo solo de la implementación con Flutter y Astro, desde la interfaz hasta los detalles de rendimiento y acabado final.",
    tech: ["Flutter", "Dart", "Astro", "TypeScript", "Tailwind CSS"],
  },
];
