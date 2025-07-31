import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Github, Link as LinkIcon, Users } from "lucide-react";
import Link from "next/link";

type Props = {
  avatarUrl: string;
  name: string;
  username: string;
  bio?: string;
  followers?: number;
  following?: number;
  blog?: string | null;
  company?: string | null;
  location?: string | null;
};

export function ProfileCard({
  avatarUrl,
  name,
  username,
  bio,
  followers,
  following,
  blog,
  company,
  location,
}: Props) {
  const initials = (name || username).slice(0, 2).toUpperCase();

  return (
    <Card className="sticky top-4">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-lg font-semibold">{name}</div>
            <div className="text-sm text-muted-foreground">@{username}</div>
          </div>
        </div>

        {bio ? <p className="mt-4 text-sm">{bio}</p> : null}

        <Separator className="my-4" />

        <div className="flex items-center gap-4 text-sm">
          <Badge variant="secondary" className="gap-1">
            <Users className="h-3.5 w-3.5" />
            {followers ?? 0} followers
          </Badge>
          <Badge variant="secondary">{following ?? 0} following</Badge>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          {company ? <div>🏢 {company}</div> : null}
          {location ? <div>📍 {location}</div> : null}
          {blog ? (
            <div className="flex items-center gap-2">
              <LinkIcon className="h-3.5 w-3.5" />
              <Link href={blog} className="truncate hover:underline">
                {blog}
              </Link>
            </div>
          ) : null}
          <div className="flex items-center gap-2">
            <Github className="h-3.5 w-3.5" />
            <Link
              href={`https://github.com/${username}`}
              className="hover:underline"
            >
              github.com/{username}
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
