import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProfileCard } from "@/components/dashboard/profile-card";
import { ProjectsGrid } from "@/components/dashboard/projects-grid";
import { CommitsChart } from "@/components/dashboard/commits-chart";
import type { Repo, CommitPoint } from "@/types/github";

type PageProps = { params: { username: string } };

// Mocked data; replace with GitHub fetchers.
async function getRecentRepos(username: string): Promise<Repo[]> {
  return [
    {
      id: 1,
      name: "github-dashboard",
      html_url: `https://github.com/${username}/github-dashboard`,
      description: "Personal GitHub analytics dashboard",
      stargazers_count: 12,
      forks_count: 2,
      language: "TypeScript",
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      name: "nextjs-starter",
      html_url: `https://github.com/${username}/nextjs-starter`,
      description: "Next.js + shadcn/ui starter",
      stargazers_count: 7,
      forks_count: 1,
      language: "TypeScript",
      updated_at: new Date().toISOString(),
    },
  ];
}

async function getCommitSeries(): Promise<CommitPoint[]> {
  const today = new Date();
  const weeks = 12;
  return Array.from({ length: weeks }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - 7 * (weeks - 1 - i));
    return {
      date: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      commits: Math.max(0, Math.round(5 + 6 * Math.sin(i / 2))),
    };
  });
}

export default async function UserDashboardPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  // Guard: only allow the owner to view their page (for now)
  const me = session.user.username;
  if (params.username !== me) redirect(`/user/${me}`);

  const [repos, series] = await Promise.all([
    getRecentRepos(me),
    getCommitSeries(),
  ]);

  const avatarUrl =
    session.user.image ??
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(me)}`;
  const name = session.user.name ?? me;

  return (
    <main className="container max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <aside className="lg:col-span-1">
          <ProfileCard
            avatarUrl={avatarUrl}
            name={name}
            username={me}
            bio="Building with Next.js, shadcn/ui & Bun."
            followers={128}
            following={17}
            blog={null}
            company="Solo Builder"
            location="🌍"
          />
        </aside>
        <div className="lg:col-span-2 space-y-6">
          <ProjectsGrid repos={repos} title="Recent projects" />
          <CommitsChart data={series} title="Weekly commits" />
        </div>

      </div>
    </main>
  );
}
