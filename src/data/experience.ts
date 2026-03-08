export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
}

export const experiences: Experience[] = [
  {
    company: "Empresa tecnológica",
    role: "Desarrollador Flutter Senior",
    period: "2024 — Actualidad",
    description:
      "Liderando el desarrollo móvil en Flutter para una app fintech multiplataforma. Diseñando sistemas de widgets, implementando animaciones complejas y mentorizando a desarrolladores junior.",
    tech: ["Flutter", "Dart", "Riverpod", "Firebase", "CI/CD"],
  },
  {
    company: "Agencia digital",
    role: "Desarrollador Frontend",
    period: "2022 — 2024",
    description:
      "Desarrollé aplicaciones web responsive y landing pages usando Astro y React. Enfocado en optimización de rendimiento, accesibilidad y animaciones interactivas.",
    tech: ["Astro", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    company: "Startup Inc.",
    role: "Desarrollador Mobile",
    period: "2021 — 2022",
    description:
      "Desarrollé y publiqué apps Flutter para iOS y Android desde la idea hasta su envío a las tiendas. Integré sistemas de pago, notificaciones push y analítica.",
    tech: ["Flutter", "Dart", "Firebase", "Stripe", "BLoC"],
  },
  {
    company: "Freelance",
    role: "Desarrollador Full Stack",
    period: "2019 — 2021",
    description:
      "Entregué soluciones web y móviles para pequeñas empresas. Desarrollé sitios personalizados en WordPress, prototipos en Flutter y backends en Node.js.",
    tech: ["Flutter", "Node.js", "React", "PostgreSQL", "WordPress"],
  },
];
