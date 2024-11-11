import * as React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { CaretSortIcon, PlusIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Link, router } from "@inertiajs/react";
import useTypedPage from "@/Hooks/useTypedPage";
import { useRoute } from "ziggy-js";
import { Team } from "@/types";
import { GalleryVerticalEnd } from "lucide-react";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();
  const page = useTypedPage();
  const route = useRoute();

  if (!page.props.jetstream.hasTeamFeatures) {
    return null;
  }

  function switchToTeam(e: React.FormEvent, team: Team) {
    e.preventDefault();
    router.put(
      route("current-team.update"),
      {
        team_id: team.id,
      },
      {
        preserveState: false,
      },
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{page.props.auth.user?.current_team?.name}</span>
                {page.props.auth.user?.current_team?.personal_team && <span className="truncate text-xs">Personal team</span>}
              </div>
              <CaretSortIcon className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" align="start" side={isMobile ? "bottom" : "right"} sideOffset={4}>
            <DropdownMenuLabel className="text-xs text-muted-foreground">Teams</DropdownMenuLabel>

            {/* switch team  */}
            {page.props.auth.user?.all_teams?.map(team => (
              <DropdownMenuItem key={team.name} className="gap-2 p-2" asChild>
                <form onSubmit={e => switchToTeam(e, team)} key={team.name}>
                  <button>{team.name}</button>
                  <DropdownMenuShortcut>
                    <Link href={route("teams.show", [page.props.auth.user?.current_team!])}>
                      <DotsHorizontalIcon />
                    </Link>
                  </DropdownMenuShortcut>
                </form>
              </DropdownMenuItem>
            ))}

            {/* create new  team */}
            {page.props.jetstream.canCreateTeams ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <PlusIcon className="size-4" />
                  </div>
                  <Link className="font-medium text-muted-foreground" href={route("teams.create")}>
                    Add team
                  </Link>
                </DropdownMenuItem>
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
