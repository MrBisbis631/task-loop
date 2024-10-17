import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type Props = {
  resourceName: string,
} & App.PaginatedResponse<unknown>
  & React.ComponentProps<"nav">;

function PaginationLinks({ resourceName, prev_page_url, next_page_url, links, total, per_page, ...props }: Props) {
  if (total <= per_page) {
    return null
  }

  return (
    <Pagination {...props}>
      <PaginationContent>
        {/* prev page */}
        <PaginationItem>
          <PaginationPrevious
            href={prev_page_url || ""}
          >
            Previous
          </PaginationPrevious>
        </PaginationItem>

        {/* links */}
        {links.slice(1, -1).map((link) => link.label === "..." ? (
          <PaginationItem key={link.url}>
            <PaginationEllipsis />
          </PaginationItem>
        ) : (
          <PaginationItem key={link.url}>
            <PaginationLink

              href={link.url || ""}
              only={[resourceName]}
              isActive={link.active}
            >
              {link.label}
            </PaginationLink>
          </PaginationItem>
        )
        )}

        {/* next page */}
        <PaginationItem>
          <PaginationNext
            href={next_page_url || ""}
          >
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationLinks
