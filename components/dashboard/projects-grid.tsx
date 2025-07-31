import { ProjectCard } from "./project-card";
import type { Repo } from "@/types/github";

type Props = { repos: Repo[]; title?: string };

export function ProjectsGrid({ repos, title = "Recent projects" }: Props) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((r) => (
          <ProjectCard key={r.id} repo={r} />
        ))}
      </div>
    </section>
  );
}
