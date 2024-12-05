import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type UpdateGeneralDetailsFormProps = {
  company: App.Http.Resources.CompanyResource;
  companyTypes: { label: string; value: string }[];
};

const formSchema = z.object({
  name: z.string().optional(),
  company_type: z.string().optional(),
  website_url: z.union([z.string().url().optional(), z.string().max(0)]),
  linkedin_url: z.union([z.string().url().optional(), z.string().max(0)]),
  instagram_url: z.union([z.string().url().optional(), z.string().max(0)]),
  activity_status: z.boolean().optional(),
});

export default function UpdateGeneralDetailsForm({ company, companyTypes }: UpdateGeneralDetailsFormProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { toast } = useToast();
  const route = useRoute();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...company,
      instagram_url: company.instagram_url || "",
      linkedin_url: company.linkedin_url || "",
      website_url: company.website_url || "",
      activity_status: company.activity_status === "active" ? true : false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const requestData = {
      ...values,
      instagram_url: values.instagram_url || null,
      linkedin_url: values.linkedin_url || null,
      website_url: values.website_url || null,
      activity_status: values.activity_status ? "active" : "inactive",
    };

    router.put(route("freelancer-space.company.update", { company: company.id }), requestData, {
      onSuccess: () => {
        toast({
          title: "Company updated",
          description: "Company general details has been updated successfully.",
        });
        setIsOpen(false);
      },
      onError: errorEv => {
        toast({
          title: "Failed to update company",
          variant: "destructive",
          description: (
            <ul>
              {Object.entries(errorEv).map(([key, value]) => (
                <li key={key}>{value}</li>
              ))}
            </ul>
          ),
        });
      },
    });
  }

  function handleCancel() {
    form.reset();
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Update general details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update general details</DialogTitle>
          <DialogDescription>Update general details of the company, such as name, type, website, and social media links.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-3xl mx-auto">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company name</FormLabel>
                  <FormControl>
                    <Input placeholder="Fill Ltd" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Name of the company</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company_type"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Company type</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" role="combobox" className={cn("justify-between", !field.value && "text-muted-foreground")}>
                          {field.value ? companyTypes.find(type => type.value === field.value)?.label : "Select type"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" align={"start"}>
                      <Command>
                        <CommandInput placeholder="Search type..." />
                        <CommandList>
                          <CommandEmpty>No type found.</CommandEmpty>
                          <CommandGroup>
                            {companyTypes.map(type => (
                              <CommandItem
                                value={type.label}
                                key={type.value}
                                onSelect={() => {
                                  form.setValue("company_type", type.value);
                                }}
                              >
                                <Check className={cn("mr-2 h-4 w-4", type.value === field.value ? "opacity-100" : "opacity-0")} />
                                {type.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Typically refers to the current state or condition of a company in terms of its operational and legal standing.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Website of the company</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedin_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.linkedin.com/..." type="" {...field} />
                  </FormControl>
                  <FormDescription>LinkedIn account of the company</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagram_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.instagram.com/integram/..." type="text" {...field} />
                  </FormControl>
                  <FormDescription>Instagram account of the company</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="activity_status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Activity Status</FormLabel>
                    <FormDescription>Check if the company is still active and requires your services</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} aria-readonly />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button type="submit">Submit</Button>
              <Button onClick={handleCancel} variant={"outline"} type="button">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
