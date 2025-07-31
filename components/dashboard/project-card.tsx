import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, GitFork, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Repo } from "@/types/github";

type Props = { repo: Repo };

export function ProjectCard({ repo }: Props) {
  return (
    <Link href={repo.html_url} target="_blank">
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center justify-between">
            <span className="truncate">{repo.name}</span>
            {repo.language ? <Badge variant="secondary">{repo.language}</Badge> : null}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {repo.description ?? "No description provided."}
          </p>
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <Star className="h-4 w-4" /> {repo.stargazers_count}
              </span>
              <span className="inline-flex items-center gap-1">
                <GitFork className="h-4 w-4" /> {repo.forks_count}
              </span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
