import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import { useToast } from "@/hooks/use-toast";
import fonts from "@/data/fonts.json";
import ColorPicker from "@/components/ui/color-picker";

type Props = {
  theme: App.Http.Resources.ThemeResource;
};

const formSchema = z.object({
  primary_color: z
    .string()
    .regex(/^#([0-9A-F]{3}){1,2}$/i, "Invalid hex color")
    .optional(),
  secondary_color: z
    .string()
    .regex(/^#([0-9A-F]{3}){1,2}$/i, "Invalid hex color")
    .optional(),
  trinary_color: z
    .string()
    .regex(/^#([0-9A-F]{3}){1,2}$/i, "Invalid hex color")
    .optional(),
  primary_text_color: z
    .string()
    .regex(/^#([0-9A-F]{3}){1,2}$/i, "Invalid hex color")
    .optional(),
  secondary_text_color: z
    .string()
    .regex(/^#([0-9A-F]{3}){1,2}$/i, "Invalid hex color")
    .optional(),
  trinary_text_color: z
    .string()
    .regex(/^#([0-9A-F]{3}){1,2}$/i, "Invalid hex color")
    .optional(),
  default_font: z.string().optional(),
  headline_font: z.string().optional(),
});

export default function ThemeColorTypographyForm({ theme }: Props) {
  const route = useRoute();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        <FormField
          name="primary_color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <ColorPicker color={field.value} onSetColor={color => form.setValue("primary_color", color)} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="default_font"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Default font</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" role="combobox" className={cn(" justify-between", !field.value && "text-muted-foreground")}>
                      {field.value && fonts.find(font => font === field.value) ? field.value : "Select font"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className=" p-0">
                  <Command>
                    <CommandInput placeholder="Search font..." />
                    <CommandList>
                      <CommandEmpty>No font found.</CommandEmpty>
                      <CommandGroup>
                        {fonts.map(font => (
                          <CommandItem
                            value={font}
                            key={font}
                            onSelect={() => {
                              form.setValue("default_font", font);
                            }}
                          >
                            <Check className={cn("mr-2 h-4 w-4", font === field.value ? "opacity-100" : "opacity-0")} />
                            {font}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>Select font for paragraphs, labels etc.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="headline_font"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Headline font</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" role="combobox" className={cn(" justify-between", !field && "text-muted-foreground")}>
                      {field.value && fonts.find(font => font === field.value) ? field.value : "Select font"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className=" p-0">
                  <Command>
                    <CommandInput placeholder="Search font..." />
                    <CommandList>
                      <CommandEmpty>No font found.</CommandEmpty>
                      <CommandGroup>
                        {fonts.map(font => (
                          <CommandItem
                            value={font}
                            key={font}
                            onSelect={() => {
                              form.setValue("headline_font", font);
                            }}
                          >
                            <Check className={cn("mr-2 h-4 w-4", font === field.value ? "opacity-100" : "opacity-0")} />
                            {font}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>Select the font for the headlines in your designs.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={!form.formState.isDirty} type="submit">
          Save changes
        </Button>
      </form>
    </Form>
  );
}
