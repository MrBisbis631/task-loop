import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { EmailCell, PhoneCell, TextCell } from "@/components/Cell";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MoreVertical } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import useTypedPage from "@/Hooks/useTypedPage";
import Index from "./Index";
import { useRoute } from "ziggy-js";
import { useToast } from "@/hooks/use-toast";
import { router } from "@inertiajs/react";
import { RequestPayload } from "@inertiajs/core";
import AlertAction from "@/components/AlertAction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";

const formSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  job_title: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
});

export const columns: ColumnDef<App.Http.Resources.CompanyContactResource>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: () => "Name",
    accessorFn: col => `${col.first_name} ${col.last_name}`,
    cell: ({ row }) => <TextCell>{`${row.original.first_name} ${row.original.last_name}`}</TextCell>,
  },
  {
    id: "job_title",
    accessorKey: "job_title",
    header: () => "Job Title",
    cell: ({ row }) => <TextCell>{row.original.job_title}</TextCell>,
  },
  {
    id: "email",
    accessorKey: "email",
    header: () => "Email",
    cell: ({ row }) => <EmailCell email={row.original.email} />,
  },
  {
    id: "phone",
    accessorKey: "phone",
    header: () => "Phone",
    cell: ({ row }) => <PhoneCell phone_rfc3966={row.original.phone_rfc3966}>{row.original.phone_readable}</PhoneCell>,
  },
  {
    id: "tags",
    accessorKey: "tags",
    header: () => "Tags",
    cell: ({ row }) => <Tags companyContact={row.original} />,
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: () => null,
    cell: ({ row }) => <Actions companyContact={row.original} />,
  },
];

function Tags({ companyContact }: { companyContact: App.Http.Resources.CompanyContactResource }) {
  return (
    <div className="gap-1 flex flex-wrap">
      {companyContact.activity_status_readable && <Badge className={cn("text-nowrap", companyContact.activity_status === "active" ? "bg-green-500" : companyContact.activity_status === "inactive" ? "bg-red-500" : companyContact.activity_status === "in_vacation" ? "bg-yellow-500" : null)}>{companyContact.activity_status_readable}</Badge>}
      {companyContact.preferred_contact_method_readable && <Badge variant={"outline"}>{companyContact.preferred_contact_method_readable}</Badge>}
    </div>
  );
}

function Actions({ companyContact }: { companyContact: App.Http.Resources.CompanyContactResource }) {
  const [isOpen, setIsOpen] = useState(false);
  const { props } = useTypedPage<React.ComponentProps<typeof Index>>();

  const route = useRoute();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...companyContact,
      first_name: companyContact.first_name || "",
      last_name: companyContact.last_name || "",
      job_title: companyContact.job_title || "",
      phone: companyContact.phone || "",
      email: companyContact.email || "",
    },
  });

  const updateCompanyContact = (data: RequestPayload, onSuccessTitle: string, onErrorTitle: string, method: "put" | "delete" = "put") => {
    // route is the same for "update", "destroy", - due to `Resource Controller` pattern
    router.visit(route("freelancer-space.company.company-contact.update", [props.company.id, companyContact.id]), {
      method,
      replace: true,
      data,
      onSuccess: () => {
        toast({
          title: onSuccessTitle,
          duration: 1000,
        });
      },
      onError: errBag => {
        toast({
          title: onErrorTitle,
          duration: 2500,
          variant: "destructive",
          description: (
            <ul>
              {Object.entries(errBag).map(([key, value]) => (
                <li key={key}>{value}</li>
              ))}
            </ul>
          ),
        });
      },
    });
  };

  const changeContactMethod = (contactMethod: App.Enums.ContactMethodEnum | "null") => updateCompanyContact({ preferred_contact_method: contactMethod }, "Contact method updated", "Error updating contact method");
  const changeContactActivityStatus = (activityStatus: App.Enums.CompanyContactActivityStatusEnum | "null") => updateCompanyContact({ activity_status: activityStatus }, "Contact activity status updated", "Error updating contact activity status");
  const deleteAction = () => updateCompanyContact({}, "Contact deleted", "Error deleting contact", "delete");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const requestData = {
      ...values,
      first_name: values.first_name || null,
      last_name: values.last_name || null,
      job_title: values.job_title || null,
      phone: values.phone || null,
      email: values.email || null,
    };

    updateCompanyContact(requestData, "Company updated", "Error updating company");
  };

  const handleCancel = () => {
    form.reset();
    setIsOpen(false);
  };

  return (
    <div className="size-6 ml-auto">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"ghost"} size={"icon"} className="size-6 my-auto">
            <MoreVertical width={14} />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="left" align="start" asChild>
          <Card className="p-0">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Edit, change contact's info and notes.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {/* change favorite contact method */}
              <div className="flex flex-col space-y-1.5">
                <Label>Change Status</Label>
                <Select value={companyContact.preferred_contact_method} onValueChange={changeContactMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {props.contactMethodEnumAsArray.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* change activity status */}
              <div className="flex flex-col space-y-1.5">
                <Label>Change Activity Status</Label>
                <Select value={companyContact.activity_status} onValueChange={changeContactActivityStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {props.companyContactActivityStatusEnumAsArray.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              {/* edit button */}
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button type="button" variant="outline">
                    edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update contact details</DialogTitle>
                    <DialogDescription>Update the contact details of the company. such as phone number, email, etc.</DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-6">
                          <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First name</FormLabel>
                                <FormControl>
                                  <Input placeholder="First name" type="" {...field} />
                                </FormControl>
                                <FormDescription>First name of the contact at the company.</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="col-span-6">
                          <FormField
                            control={form.control}
                            name="last_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Last name" type="" {...field} />
                                </FormControl>
                                <FormDescription>Last name of the contact at the company</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="job_title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job title</FormLabel>
                            <FormControl>
                              <Input placeholder="Plant and System Operator" type="" {...field} />
                            </FormControl>
                            <FormDescription>Job title of the contact at the company</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="flex flex-col items-start">
                            <FormLabel>Phone number</FormLabel>
                            <FormControl className="w-full">
                              <PhoneInput placeholder="phone" {...field} defaultCountry="US" />
                            </FormControl>
                            <FormDescription>Phone of the contact at the company</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="" type="email" {...field} />
                            </FormControl>
                            <FormDescription>Email of the contact at the company</FormDescription>
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

              {/* delete button */}
              <AlertAction title="Are you sure you want to delete this contact?" description="This action cannot be undone." buttonContent="delete" action={deleteAction} />
            </CardFooter>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
}
