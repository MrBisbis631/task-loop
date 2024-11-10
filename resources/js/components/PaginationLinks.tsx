import React from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

type Props = {
  resourceName: string;
  compact?: boolean;
} & Pick<App.ResourceCollection, "meta" | "links">
  & React.ComponentProps<"nav">;

function PaginationLinks({ resourceName, meta, links, ...props }: Props) {
  if (!meta || meta.total <= meta.per_page) {
    return null;
  }

  return (
    <Pagination {...props}>
      <PaginationContent>
        {/* prev page */}
        <PaginationItem>
          <PaginationPrevious href={links?.prev || ""} compact={props.compact} />
        </PaginationItem>

        {/* links */}
        {meta.links.slice(1, -1).map(link =>
          link.label === "..." ? (
            <PaginationItem key={link.url}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={link.url}>
              <PaginationLink
                href={link.url || ""}
                only={[resourceName]}
                isActive={link.active}
                compact={props.compact}
              >
                {link.label}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {/* next page */}
        <PaginationItem>
          <PaginationNext href={links?.last || ""} compact={props.compact} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationLinks;
