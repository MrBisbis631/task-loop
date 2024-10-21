import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { route } from "ziggy-js";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { router } from "@inertiajs/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type Props = {
  externApiDetail: App.Models.ExternApiDetail;
};

function ExternApiDetailsCard({ externApiDetail }: Props) {
  const expiresAt = externApiDetail.expires_at ? new Date(externApiDetail.expires_at) : null;
  const hasExpired = !!expiresAt ? expiresAt < new Date() : false;

  return (
    <Card key={externApiDetail.id}>
      <CardHeader className="relative">
        <UpdateForm externApiDetail={externApiDetail} />

        {hasExpired ? (
          <>
            <ConfirmDelete id={externApiDetail.id} />
          </>
        ) : null}

        {hasExpired && expiresAt ? (
          <>
            <span className={twMerge(["text-xs", hasExpired ? "text-red-500" : ""])}>
              {hasExpired ? "Expired at" : "Expires at"} {format(expiresAt, "d/M/y")}
            </span>
          </>
        ) : null}

        <div className="">
          <div className="flex items-baseline line-clamp-1">
            <span className="font-semibold">{externApiDetail.api_name}</span>
            <span>@</span>
            <span className="text-sm text-slate-600">{externApiDetail.api_username}</span>
          </div>

          {externApiDetail.label ? (
            <>
              <span className="text-xs text-slate-600">{externApiDetail.label}</span>
            </>
          ) : null}
          <div className="text-xs text-slate-500"></div>
        </div>
      </CardHeader>

      {externApiDetail.description ? (
        <>
          <CardContent>
            <div className="text-sm text-slate-600 line-clamp-2">{externApiDetail.description}</div>
          </CardContent>
        </>
      ) : null}
    </Card>
  );
}

type ConfirmDeleteProps = {
  id: string | number;
};

function ConfirmDelete({ id }: ConfirmDeleteProps) {
  const { toast } = useToast();

  const handleDelete = () => {
    router.delete(route("freelancer-space.external-api-details.destroy", [id]), {
      preserveState: true,
      onSuccess: () => {
        toast({
          title: "API key deleted",
        });
      },
      onError: () => {
        toast({
          title: "Failed to delete key",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"secondary"} size={"icon"} className="w-5 h-5 absolute right-2 top-6">
          <TrashIcon className="text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone. This will permanently delete your key permanently and may brake functionalities depending on this key.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delate</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

type UpdateFormProps = {
  externApiDetail: App.Models.ExternApiDetail;
};

const UpdateExternalApiDetailsFormSchema = z
  .object({
    api_name: z.string().min(1),
    api_username: z.string().min(1),

    expires_at: z.string().date().nullable().default(null),

    // one of label or description is required
    label: z.string().min(1).max(255).optional().nullable(),
    description: z.string().min(1).max(512).optional().nullable(),
  })
  .refine(({ label, description }) => {
    return !!label || !!description;
  });

function UpdateForm({ externApiDetail }: UpdateFormProps) {
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof UpdateExternalApiDetailsFormSchema>>({
    resolver: zodResolver(UpdateExternalApiDetailsFormSchema),
    defaultValues: {
      ...externApiDetail,
      expires_at: externApiDetail.expires_at ? format(externApiDetail.expires_at, "yyyy-MM-dd") : null,
    },
  });

  const { isLoading, isDirty, errors } = form.formState;

  const toastError = () => {
    toast({
      title: "Error updating API Key",
      description: "There was an error updating the API key. Please check the form for errors.",
      variant: "destructive",
    });
  };

  const toastSuccess = () => {
    toast({
      title: "API Key Updated",
      description: "The API key has been successfully updated.",
    });
  };

  const onSubmit = form.handleSubmit(data => {
    if (!isDirty) {
      return;
    }

    router.visit(route("freelancer-space.external-api-details.update", [externApiDetail.id]), {
      method: "put",
      data,
      replace: true,
      onSuccess: () => {
        toastSuccess();
        form.reset();
        setDialogOpen(false);
      },
      onError: () => {
        toastError();
      },
    });
  });

  const handleCloseDialog = (close: boolean) => {
    if (!close) {
      form.clearErrors();
    }
    setDialogOpen(close);
  };

  const handleCancelUpdate = () => {
    form.reset();
    setDialogOpen(false);
  };

  return (
    <Dialog defaultOpen open={dialogOpen} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="w-5 h-5 absolute right-2 top-2">
          <Pencil2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <form action="" onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Update Key</DialogTitle>
            <DialogDescription>Fill the form and update your key</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="max-sm:col-span-2">
              <Label htmlFor="api_name" className="block font-bold capitalize text-slate-800">
                API name
              </Label>
              <Label htmlFor="api_name" className="block text-slate-500 text-xs mb-1">
                Name of the API. eg. Github, Heroku etc.
              </Label>
              <Input {...form.register("api_name")} placeholder="API Name" />
              {!!errors.api_name ? (
                <Label htmlFor="api_name" aria-description="error message" className="block text-red-500 mt-1">
                  {errors.api_name.message}
                </Label>
              ) : null}
            </div>
            <div className="max-sm:col-span-2">
              <Label htmlFor="api_username" className="block font-bold capitalize text-slate-800">
                Username
              </Label>
              <Label htmlFor="api_username" className="block text-slate-500 text-xs mb-1">
                Username at the API
              </Label>
              <Input {...form.register("api_username")} placeholder="API Username" />
              {!!errors.api_username ? (
                <Label htmlFor="api_username" aria-description="error message" className="block text-red-500 mt-1">
                  {errors.api_username.message}
                </Label>
              ) : null}
            </div>
            <div className="max-sm:col-span-2">
              <Label htmlFor="label" className="block font-bold capitalize text-slate-800">
                Label
              </Label>
              <Label htmlFor="label" className="block text-slate-500 text-xs mb-1">
                Label the key with "work", "personal" etc.
              </Label>
              <Input {...form.register("label")} placeholder="Label" />
              {!!errors.label ? (
                <Label htmlFor="label" aria-description="error message" className="block text-red-500 mt-1">
                  {errors.label.message}
                </Label>
              ) : null}
            </div>
            <div className="max-sm:col-span-2">
              <Label htmlFor="expires_at" className="block font-bold capitalize text-slate-800">
                Exertion date
              </Label>
              <Label htmlFor="expires_at" className="block text-slate-500 text-xs mb-1">
                Expiration date of the key (optional)
              </Label>
              <Input {...form.register("expires_at")} placeholder="Expires At" type="date" />
              {!!errors.expires_at ? (
                <Label htmlFor="expires_at" aria-description="error message" className="block text-red-500 mt-1">
                  {errors.expires_at.message}
                </Label>
              ) : null}
            </div>
            <div className="col-span-2">
              <Label htmlFor="description" className="block font-bold capitalize text-slate-800">
                Description
              </Label>
              <Label htmlFor="expires_at" className="block text-slate-500 text-xs mb-1">
                Describe use, owner or any additional detail (optional)
              </Label>
              <Textarea {...form.register("description")} rows={3} className="col-span-2" placeholder="Description" />
              {!!errors.description ? (
                <Label htmlFor="description" aria-description="error message" className="block text-red-500 mt-1">
                  {errors.description.message}
                </Label>
              ) : null}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCancelUpdate} type="button" variant={"destructive"}>
              Cancel
            </Button>
            <Button disabled={isLoading || !isDirty} type="submit">
              Update key
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ExternApiDetailsCard;
