export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
}

export const experiences: Experience[] = [
  {
    company: "Tech Company",
    role: "Senior Flutter Developer",
    period: "2024 — Present",
    description:
      "Leading Flutter mobile development for a cross-platform fintech app. Architecting widget systems, implementing complex animations, and mentoring junior developers.",
    tech: ["Flutter", "Dart", "Riverpod", "Firebase", "CI/CD"],
  },
  {
    company: "Digital Agency",
    role: "Frontend Developer",
    period: "2022 — 2024",
    description:
      "Built responsive web applications and landing pages using Astro and React. Focused on performance optimization, accessibility, and interactive animations.",
    tech: ["Astro", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    company: "Startup Inc.",
    role: "Mobile Developer",
    period: "2021 — 2022",
    description:
      "Developed and shipped Flutter apps for iOS and Android from concept to App Store submission. Integrated payment systems, push notifications, and analytics.",
    tech: ["Flutter", "Dart", "Firebase", "Stripe", "BLoC"],
  },
  {
    company: "Freelance",
    role: "Full Stack Developer",
    period: "2019 — 2021",
    description:
      "Delivered web and mobile solutions for small businesses. Built custom WordPress sites, Flutter prototypes, and Node.js backends.",
    tech: ["Flutter", "Node.js", "React", "PostgreSQL", "WordPress"],
  },
];
