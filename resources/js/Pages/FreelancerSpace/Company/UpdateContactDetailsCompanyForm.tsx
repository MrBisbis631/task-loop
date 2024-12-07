import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PhoneInput } from "@/components/ui/phone-input";
import LocationSelector, { CountryProps, StateProps } from "@/components/ui/location-input";
import { getAlpha2Code, getName } from "i18n-iso-countries";
import countries from "@/data/countries.json";
import states from "@/data/states.json";

type UpdateContactDetailsCompanyFormProps = {
  company: App.Http.Resources.CompanyResource;
};

const formSchema = z.object({
  country_state: z.tuple([z.string(), z.string().optional()]).optional(),
  address_1: z.string().optional(),
  phone_1: z.string().optional(),
  email: z.string().optional(),
});

export default function UpdateContactDetailsCompanyForm({ company }: UpdateContactDetailsCompanyFormProps) {
  const [countryName, setCountryName] = useState<string>(getName(company.country, "en") || "");
  const [stateName, setStateName] = useState<string>(company.state || "");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const route = useRoute();

  const initialCountryState = useMemo(
    () => ({
      country: countries.find(country => country.iso2 === company.country) as CountryProps | undefined,
      state: states.find(state => state.name === company.state) as StateProps | undefined,
    }),
    [company.country, company.state],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...company,
      country_state: [getName(company.country, "en") || "", company.state || ""],
      phone_1: company.phone_1 || "",
      email: company.email || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
    const requestData = {
      ...values,
      country: values.country_state && values.country_state?.length > 0 ? getAlpha2Code(values.country_state[0], "en") : null,
      state: values.country_state && values.country_state?.length > 1 ? values.country_state[1] : null,
      phone_1: values.phone_1 || null,
    };

    router.put(route("freelancer-space.company.update", { company: company.id }), requestData, {
      onSuccess: () => {
        toast({
          title: "Company updated",
          description: "The company contact details have been updated successfully",
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
        <Button variant="outline">Update contact details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update contact details</DialogTitle>
          <DialogDescription>Update the contact details of the company. such as phone number, email, etc.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" type="" {...field} />
                  </FormControl>
                  <FormDescription>Primary company email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_1"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Phone number</FormLabel>
                  <FormControl className="w-full">
                    <PhoneInput {...field} defaultCountry="US" />
                  </FormControl>
                  <FormDescription>Enter company phone number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country_state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Country</FormLabel>
                  <FormControl>
                    <LocationSelector
                      defaultValue={initialCountryState}
                      onCountryChange={country => {
                        setCountryName(country?.name || "");
                        form.setValue(field.name, [country?.name || "", stateName || ""]);
                      }}
                      onStateChange={state => {
                        setStateName(state?.name || "");
                        form.setValue(field.name, [countryName || "", state?.name || ""]);
                      }}
                    />
                  </FormControl>
                  <FormDescription>If your country has states, it will be appear after selecting country</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Eiffel Tower, Paris" type="" {...field} />
                  </FormControl>
                  <FormDescription>This is the address in the state above.</FormDescription>
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
