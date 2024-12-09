import useRoute from "@/Hooks/useRoute";
import useTypedPage from "@/Hooks/useTypedPage";
import freelancerRoutes from "@/page-details/freelancer";
import adminRoutes from "@/page-details/admin";
import commonRoutes from "@/page-details/common";
import clientRoutes from "@/page-details/client";
import superAdminRoutes from "@/page-details/super-admin";
import { route } from "ziggy-js";

const pagesDetails = {
  ...freelancerRoutes,
  ...adminRoutes,
  ...clientRoutes,
  ...superAdminRoutes,
  ...commonRoutes,
};

export function usePageDetails(): Page.PageDetails {
  const { props } = useTypedPage();
  const router = useRoute();
  const currentRoute = pagesDetails[route().current() || ""];

  if (!currentRoute) {
    throw new Error(`No layout details found for route: ${route().current()}`);
  }

  const mainRoute = currentRoute.getRoute(props);
  const subRoute = currentRoute.getSubroute?.(props);
  return {
    head: currentRoute.head,
    title: currentRoute.title(props),
    description: currentRoute.description(props),
    route: { name: mainRoute.name, url: Array.isArray(mainRoute.url) ? router(...(mainRoute.url as [string])) : router(mainRoute.url) },
    subRoute: subRoute ? { name: subRoute.name, url: router(...(subRoute.url as [string])) } : undefined,
    pageItems: currentRoute.pageItems
      ? currentRoute.pageItems(props).map(({ name, url, isActive }) => ({
          title: name,
          url: router(...(url as [string])),
          isActive,
        }))
      : undefined,
  };
}
