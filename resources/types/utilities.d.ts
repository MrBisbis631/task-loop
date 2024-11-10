declare namespace App {
  interface Link {
    url: string | null;  // URL for the link (null if there's no link, e.g., for the current page)
    label: string;       // The text or number for the link (e.g., "Next", "1", "2")
    active: boolean;     // Whether this link represents the current page
  }

  interface ResourceCollection<T = unknown> {
    data: T[];
    links?: {
      first?: string;
      last?: string;
      prev?: string | null;
      next?: string | null;
    } | null;
    meta?: {
      current_page: number;
      from: number | null;
      last_page: number;
      links: Link[];
      path: string;
      per_page: number;
      to: number | null;
      total: number;
    } | null;
  };
}
