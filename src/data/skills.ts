export interface SkillCategory {
  name: string;
  icon: string;
  color: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Flutter & Mobile",
    icon: "mobile",
    color: "from-accent to-emerald-300",
    skills: [
      "Flutter",
      "Dart",
      "Riverpod",
      "BLoC",
      "Firebase",
      "Material 3",
      "Custom Widgets",
      "Platform Channels",
    ],
  },
  {
    name: "Astro & Web",
    icon: "globe",
    color: "from-accent-secondary to-blue-300",
    skills: [
      "Astro",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "HTML/CSS",
      "SEO",
      "Web Performance",
    ],
  },
  {
    name: "Backend & APIs",
    icon: "server",
    color: "from-accent-purple to-purple-300",
    skills: [
      "Node.js",
      "REST APIs",
      "GraphQL",
      "PostgreSQL",
      "Firebase",
      "Supabase",
      "Docker",
    ],
  },
  {
    name: "Tools & Workflow",
    icon: "terminal",
    color: "from-orange-400 to-amber-300",
    skills: [
      "Git",
      "GitHub Actions",
      "VS Code",
      "Figma",
      "CI/CD",
      "Testing",
      "Agile",
    ],
  },
];
