import React from "react";
import APITokenManager from "@/Pages/API/Partials/APITokenManager";
import AppLayout from "@/Layouts/AppLayout";
import { ApiToken } from "@/types";
import useRoute from "@/Hooks/useRoute";

interface Props {
  tokens: ApiToken[];
  availablePermissions: string[];
  defaultPermissions: string[];
}

export default function ApiTokenIndex({ tokens, availablePermissions, defaultPermissions }: Props) {
  const route = useRoute();

  const RouteDetails = {name: "API Tokens", url: route("api-tokens.index")};
  const pageDescription = "API tokens allow third-party services to authenticate with our application on your behalf.";
  return (
    <AppLayout pageTitle={"API Tokens"} pageDescription={pageDescription} route={RouteDetails} >
      <div>
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
          <APITokenManager tokens={tokens} availablePermissions={availablePermissions} defaultPermissions={defaultPermissions} />
        </div>
      </div>
    </AppLayout>
  );
}
