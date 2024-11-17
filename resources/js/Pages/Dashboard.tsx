import React from "react";
import Welcome from "@/Components/Welcome";
import AppLayout from "@/Layouts/AppLayout";
import useRoute from "@/Hooks/useRoute";

export default function Dashboard() {
  const route = useRoute();

  const layoutDetails = {
    route: { name: "Dashboard", url: route("dashboard") },
    pageTitle: "Dashboard",
    pageDescription: "Welcome to TaskLoop Dashboard!",
    headTitle: "Dashboard",
  };

  return (
    <AppLayout {...layoutDetails}>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
            <Welcome />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
