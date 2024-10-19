import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ListPlus, Lock } from 'lucide-react'
import { router } from '@inertiajs/react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'

const CreateExternalApiDetailsFormSchema = z.object({
  api_name: z.string().min(1),
  api_username: z.string().min(1),

  expires_at: z.string().min(1).date().optional(),

  // one of label or description is required 
  label: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(512).optional(),

  api_secret: z.string().min(1).optional(),
  api_token: z.string().min(1),
}).refine(({ label, description }) => {
  return !!label || !!description
});

export default function CreateExternalApiDetailsCard() {
  const { toast } = useToast()

  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  const toastError = () => {
    toast({
      title: 'Error creating API Key',
      description: 'There was an error creating the API key. Please check the form for errors.',
      variant: 'destructive',
    })
  }

  const toastSuccess = () => {
    toast({
      title: 'API Key Created',
      description: 'The API key has been successfully created.',
    })
  }

  const form = useForm<z.infer<typeof CreateExternalApiDetailsFormSchema>>({
    resolver: zodResolver(CreateExternalApiDetailsFormSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    router.post("", data, {
      replace: true,
      preserveState: true,
      onSuccess: () => {
        toastSuccess()
        form.reset()
        setDialogOpen(false)
      },
      onError: (errorBag) => {
        console.log(errorBag);
        toastError()
      }
    })
  });

  const { isLoading, errors } = form.formState

  return (
    <Card className='bg-slate-50'>
      <CardHeader>
        <CardTitle>Add new API Keys</CardTitle>
        <CardDescription>
          Add new API keys to access external services, such as payment gateways, email services, etc.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog defaultOpen open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <ListPlus />
              <span className='ml-2'>Add API Key</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <form action='' onSubmit={onSubmit}>
              <DialogHeader>
                <DialogTitle>
                  Add new API Key
                </DialogTitle>
                <DialogDescription>
                  Fill the form and submit your new API key
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="max-sm:col-span-2">
                  <Label htmlFor='api_name' className='block font-bold capitalize text-slate-800'>API name</Label>
                  <Label htmlFor='api_name' className='block text-slate-500 text-xs mb-1'>Name of the API. eg. Github, Heroku etc.</Label>
                  <Input {...form.register('api_name')} placeholder='API Name' />
                  {!!errors.api_name ? <Label htmlFor='api_name' aria-description='error message' className='block text-red-500 mt-1'>{errors.api_name.message}</Label> : null}
                </div>
                <div className="max-sm:col-span-2">
                  <Label htmlFor='api_username' className='block font-bold capitalize text-slate-800'>Username</Label>
                  <Label htmlFor='api_username' className='block text-slate-500 text-xs mb-1'>Username at the API</Label>
                  <Input {...form.register('api_username')} placeholder='API Username' />
                  {!!errors.api_username ? <Label htmlFor='api_username' aria-description='error message' className='block text-red-500 mt-1'>{errors.api_username.message}</Label> : null}
                </div>
                <div className="max-sm:col-span-2">
                  <Label htmlFor='api_token' className='block font-bold capitalize text-slate-800'>API token</Label>
                  <Label htmlFor='api_token' className='block text-slate-500 text-xs mb-1'>Token given by the API for authentication</Label>
                  <Input {...form.register('api_token')} type='password' autoComplete='off' placeholder='API Token' />
                  {!!errors.api_token ? <Label htmlFor='api_token' aria-description='error message' className='block text-red-500 mt-1'>{errors.api_token.message}</Label> : null}
                </div>
                <div className="max-sm:col-span-2">
                  <Label htmlFor='api_secret' className='block font-bold capitalize text-slate-800'>API secret</Label>
                  <Label htmlFor='api_secret' className='block text-slate-500 text-xs mb-1'>Secret token provided by the API (if given)</Label>
                  <Input {...form.register('api_secret')} type='password' autoComplete='off' placeholder='API Secret' />
                  {!!errors.api_secret ? <Label htmlFor='api_secret' aria-description='error message' className='block text-red-500 mt-1'>{errors.api_secret.message}</Label> : null}
                </div>
                <div className="max-sm:col-span-2">
                  <Label htmlFor='label' className='block font-bold capitalize text-slate-800'>Label</Label>
                  <Label htmlFor='label' className='block text-slate-500 text-xs mb-1'>Label the key with "work", "personal" etc.</Label>
                  <Input {...form.register('label')} placeholder='Label' />
                  {!!errors.label ? <Label htmlFor='label' aria-description='error message' className='block text-red-500 mt-1'>{errors.label.message}</Label> : null}
                </div>
                <div className="max-sm:col-span-2">
                  <Label htmlFor='expires_at' className='block font-bold capitalize text-slate-800'>Exertion date</Label>
                  <Label htmlFor='expires_at' className='block text-slate-500 text-xs mb-1'>Expiration date of the key (optional)</Label>
                  <Input {...form.register('expires_at')} placeholder='Expires At' type='date' />
                  {!!errors.expires_at ? <Label htmlFor='expires_at' aria-description='error message' className='block text-red-500 mt-1'>{errors.expires_at.message}</Label> : null}
                </div>
                <div className="col-span-2">
                  <Label htmlFor='description' className='block font-bold capitalize text-slate-800'>Description</Label>
                  <Label htmlFor='expires_at' className='block text-slate-500 text-xs mb-1'>Describe use, owner or any additional detail (optional)</Label>
                  <Textarea {...form.register('description')} rows={3} className='col-span-2' placeholder='Description' />
                  {!!errors.description ? <Label htmlFor='description' aria-description='error message' className='block text-red-500 mt-1'>{errors.description.message}</Label> : null}
                </div>
              </div>
              <DialogFooter>
                <Button disabled={isLoading} type='submit'>Add key</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className='text-xs space-x-1 text-muted-foreground'>
        <Lock className='size-3' />
        <span>
          Your API keys are securely stored and encrypted.
        </span>
      </CardFooter>
    </Card>
  );
}
