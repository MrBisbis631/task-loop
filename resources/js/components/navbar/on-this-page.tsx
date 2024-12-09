import React from "react";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Link, usePage } from "@inertiajs/react";

type Props = {
  items?: {
    title: string;
    url: string;
  }[];
};

export default function OnThisPage({ items }: Props) {
  const { url } = usePage();

  if (!items?.length) {
    return null;
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>On this page</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(item => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton asChild isActive={new URL(item.url).pathname === url}>
                <Link href={item.url}>{item.title}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
