interface Props {
  label: string;
}

export default function TechBadge({ label }: Props) {
  return (
    <span
      className="inline-block font-mono text-xs px-2.5 py-1 rounded-md
                 border border-accent/30 text-accent bg-accent/10
                 transition-colors hover:bg-accent/20"
    >
      {label}
    </span>
  );
}
