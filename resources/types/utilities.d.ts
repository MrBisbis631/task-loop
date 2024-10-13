declare namespace App {
  interface Link {
    url: string | null;  // URL for the link (null if there's no link, e.g., for the current page)
    label: string;       // The text or number for the link (e.g., "Next", "1", "2")
    active: boolean;     // Whether this link represents the current page
  }

  interface PaginatedResponse<T> {
    data: T[];              // The array of the paginated data
    current_page: number;    // The current page number
    per_page: number;        // Number of items per page
    total: number;           // Total number of items across all pages
    last_page: number;       // The last page number
    next_page_url?: string;  // URL to the next page, optional
    prev_page_url?: string;  // URL to the previous page, optional
    from?: number;           // Starting item index on the current page
    to?: number;             // Ending item index on the current page

    // List of pagination links
    links: Link[];           // Array of pagination links (first, previous, next, etc.)
  }
}
