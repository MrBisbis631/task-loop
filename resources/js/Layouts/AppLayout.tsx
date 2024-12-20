import { Head, Link } from "@inertiajs/react";
import React, { lazy, PropsWithChildren } from "react";
import Banner from "@/Components/Banner";
import { AppSidebar } from "@/components/navbar/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { usePageDetails } from "@/hooks/use-page-details";
import PageTitle from "@/components/PageTitle";
import { registerLocale } from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import useTypedPage from "@/Hooks/useTypedPage";

// Register the locale for the country names
registerLocale(en);

// lazy load the toaster component
const Toaster = lazy(() => import("@/components/ui/toaster").then(module => ({ default: module.Toaster })));

export default function AppLayout({ children }: PropsWithChildren) {
  const { head, title, route, description, pageItems, subRoute } = usePageDetails();
  const {
    props: {
      auth: { user },
    },
  } = useTypedPage();

  return (
    <>
      <Head title={head} />

      {/* useToast to trigger and edit `@/component/toast` to costume */}
      <Toaster />

      {/* Toaster for jetstream, TODO integrate in `Toaster` */}
      <Banner />

      <SidebarProvider>
        {user ? <AppSidebar pageItems={pageItems} /> : null}
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            {user ? (
              <>
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
              </>
            ) : null}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link href={route.url} className="capitalize">
                      {route.name}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {subRoute ? (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        <Link href={subRoute.url} className="capitalize">
                          {subRoute.name}
                        </Link>
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                ) : null}
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          {/* screen - width of upper navbar */}
          <div className="container px-1 py-2 mx-auto min-h-[100vh-4rem] transition">
            <PageTitle pageTitle={title} pageDescription={description} />
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
