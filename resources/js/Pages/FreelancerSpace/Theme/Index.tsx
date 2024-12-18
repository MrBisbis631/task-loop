import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import ThemeCustomCssForm from "./ThemeCustomCssForm";
import ThemeColorTypographyForm from "./ThemeColorTypographyForm";

type Props = {
  theme: App.Http.Resources.ThemeResource;
};

export default function Index({ theme }: Props) {
  return (
    <div>
      <Tabs defaultValue="colors-typography" className="flex flex-col max-w-xl">
        <TabsList>
          <TabsTrigger value="colors-typography" className="flex-1">
            Colors & Typography
          </TabsTrigger>
          <TabsTrigger value="custom-css" className="flex-1">
            Custom CSS
          </TabsTrigger>
        </TabsList>

        {/* colors */}
        <TabsContent value="colors-typography">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Colors & Typography</CardTitle>
              <CardDescription>Set your theme colors and typography</CardDescription>
            </CardHeader>
            <CardContent>
              <ThemeColorTypographyForm theme={theme} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* custom-css */}
        <TabsContent value="custom-css">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Custom CSS</CardTitle>
              <CardDescription>Set your custom CSS variables</CardDescription>
            </CardHeader>
            <CardContent>
              <ThemeCustomCssForm theme={theme} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
