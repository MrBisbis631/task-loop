import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TooltipProvider } from "@/components/ui/tooltip";

type UpdateTaxDetailsCompanyFormProps = {
  company: App.Http.Resources.CompanyResource;
  companyTypeEnumAsArray: {
    value: string;
    description: string;
    readable: string;
  }[];
};

const formSchema = z.object({
  tax_identification_number: z.string().optional(),
  vat_number: z.string().optional(),
  tax_region_country: z.string().optional(),
  company_type: z.string().optional(),
  tax_documentation_url: z.union([z.string().url(), z.string().max(0)]),
});

export default function UpdateTaxDetailsCompanyForm({ company, companyTypeEnumAsArray }: UpdateTaxDetailsCompanyFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const route = useRoute();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: company,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const requestData = Object.entries(values).reduce(
      (acc, [key, value]) => ({
        ...acc,
        // set `null` where empty to remove from DB
        [key]: value || null,
      }),
      {},
    );

    router.put(route("freelancer-space.company.update", { company: company.id }), requestData, {
      onSuccess: () => {
        toast({
          title: "Company updated",
          description: "The company taxing details have been updated successfully",
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
        <Button variant="outline">Update tax details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update taxing details</DialogTitle>
          <DialogDescription>Update the taxing details for the company, this information is used for invoicing and tax purposes.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="tax_identification_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax identification number (TIN)</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="" {...field} />
                  </FormControl>
                  <FormDescription>Enter your unique tax ID assigned by the tax authority for identification and compliance purposes.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vat_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vat number</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="" {...field} />
                  </FormControl>
                  <FormDescription>Enter your business's Value-Added Tax (VAT) registration number as issued by your tax authority.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tax_region_country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax Region/Country</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="" {...field} />
                  </FormControl>
                  <FormDescription>Select the country or region where your tax obligations apply.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax Filing Category/Company type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <TooltipProvider>
                        {companyTypeEnumAsArray.map(({ value, readable }) => (
                          <SelectItem key={value} value={value}>
                            {readable}
                          </SelectItem>
                        ))}
                      </TooltipProvider>
                    </SelectContent>
                  </Select>
                  <FormDescription>Select the appropriate category that applies to your tax filing status.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tax_documentation_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax Documentation URL</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="" {...field} />
                  </FormControl>
                  <FormDescription>Enter the official website link for accessing tax-related documentation or resources.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 mt-3">
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
