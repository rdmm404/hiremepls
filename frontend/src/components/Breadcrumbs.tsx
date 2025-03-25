import { useMatches, isMatch, Link } from "@tanstack/react-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function Breadcrumbs() {
  const matches = useMatches();

  if (matches.some((match) => match.status === "pending")) return null;

  const matchesWithCrumbs = matches.filter((match) =>
    isMatch(match, "loaderData.crumb")
  );

  console.log(matches);
  console.log(matchesWithCrumbs);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {matchesWithCrumbs.map((match, i) => (
          <>
            <BreadcrumbItem key={i}>
              <BreadcrumbLink asChild>
                <Link from={match.fullPath}>{match.loaderData?.crumb}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {i + 1 < matchesWithCrumbs.length ? <BreadcrumbSeparator /> : null}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
