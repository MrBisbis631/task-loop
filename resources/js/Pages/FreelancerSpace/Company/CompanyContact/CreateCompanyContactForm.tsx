import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRoute } from "ziggy-js";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { router } from "@inertiajs/react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PhoneInput } from "@/components/ui/phone-input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type Props = {
  company: App.Http.Resources.CompanyResource;
  contactMethodEnumAsArray: {
    value: string;
    label: string;
  }[];
};

const formSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  job_title: z.string().optional(),
  preferred_contact_method: z.string(),
});

function CreateCompanyContactForm({ company, contactMethodEnumAsArray }: Props) {
  const { toast } = useToast();
  const route = useRoute();

  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    router.post(route("freelancer-space.company.company-contact.store", { company: company.id }), values, {
      onSuccess: () => {
        toast({
          title: "Contact created",
          description: "The contact has been created successfully.",
        });
        setIsOpen(false);
      },
      onError: errorEv => {
        toast({
          title: "Failed to create contact",
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
  };

  const handleCancel = () => {
    form.reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button>Create new contact</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new contact</DialogTitle>
          <DialogDescription>Create a new contact for the company. such as phone number, email, etc.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                {/* first_name */}
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input placeholder="First" {...field} />
                      </FormControl>
                      <FormDescription>Contact's first name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-6">
                {/* last_name */}
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last" {...field} />
                      </FormControl>
                      <FormDescription>Contact's last name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Phone number</FormLabel>
                  <FormControl className="w-full">
                    <PhoneInput placeholder="" {...field} defaultCountry="US" />
                  </FormControl>
                  <FormDescription>Contact's first phone number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" type="" {...field} />
                  </FormControl>
                  <FormDescription>Contact's email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* job_title */}
            <FormField
              control={form.control}
              name="job_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job title</FormLabel>
                  <FormControl>
                    <Input placeholder="Travel Clerk" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Contact's job title at the company.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* preferred_contact_method */}
            <FormField
              control={form.control}
              name="preferred_contact_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred contact method</FormLabel>
                  <FormControl>
                    <ToggleGroup value={field.value} onValueChange={field.onChange} type="single" className="gap-2">
                      {contactMethodEnumAsArray.map(({ value, label }) => (
                        <ToggleGroupItem key={value} variant={"outline"} value={value} aria-label={`Toggle ${label}`} className="flex-1">
                          {label}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                  <FormDescription>Contact's preferred contact method.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 mt-3">
              <Button type="submit">Create</Button>
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

export default CreateCompanyContactForm;
