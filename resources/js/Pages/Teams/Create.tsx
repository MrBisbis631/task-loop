import CreateTeamForm from "@/Pages/Teams/Partials/CreateTeamForm";
import AppLayout from "@/Layouts/AppLayout";
import React from "react";
import useRoute from "@/Hooks/useRoute";

export default function Create() {
  const route = useRoute();

  const appLayoutRoute = { name: "Teams", url: route("teams.create") };
  const pageDescription = "Create a new team to collaborate with your team members.";
  return (
    <AppLayout pageTitle="Create Team" pageDescription={pageDescription} route={appLayoutRoute}>
      <div>
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
          <CreateTeamForm />
        </div>
      </div>
    </AppLayout>
  );
}
