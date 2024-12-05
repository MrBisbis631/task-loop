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

// Register the locale for the country names
registerLocale(en);

// lazy load the toaster component
const Toaster = lazy(() => import("@/components/ui/toaster").then(module => ({ default: module.Toaster })));

export default function AppLayout({ children }: PropsWithChildren) {
  const { head, title, route, description, pageItems, subRoute } = usePageDetails();

  return (
    <>
      <Head title={head} />

      {/* useToast to trigger and edit `@/component/toast` to costume */}
      <Toaster />

      {/* Toaster for jetstream, TODO integrate in `Toaster` */}
      <Banner />

      <SidebarProvider>
        <AppSidebar pageItems={pageItems} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
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
          <div className="container px-1 py-2 mx-auto min-h-screen transition">
            <PageTitle pageTitle={title} pageDescription={description} />
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
