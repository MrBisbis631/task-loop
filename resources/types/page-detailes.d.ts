declare namespace Page {
  type PageDetailsBuilder<T = {}> = {
    head: string;
    title: (props: T | undefined) => React.ReactNode;
    description: (props: T | undefined) => React.ReactNode;

    route: {
      name: string;
      routeName: string;
    };

    getSubroute?: (props: T) => {
      name: string;
      url: (string | number)[];
    };
    pageItems?: (props: T) => { name: string; url: (string | number)[]; isActive?: boolean }[];
    canAccess?: (user: App.Models.User) => boolean;
  };

  interface PageDetails {
    head: string;
    title?: React.ReactNode;
    description?: React.ReactNode;

    route: {
      name: string;
      url: string;
    };

    subRoute?: {
      name: string;
      url: string;
    };

    pageItems?: { title: string; url: string; isActive?: boolean }[];
  }
}
