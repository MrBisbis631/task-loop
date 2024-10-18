import React, { useEffect, useState, useRef } from 'react'
import useTypedPage from '@/Hooks/useTypedPage'
import AppLayout from '@/Layouts/AppLayout'
import ExternApiDetailsCard from './ExternApiDetailsCard'
import PaginationLinks from '@/components/PaginationLinks'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { ListPlus, Lock } from 'lucide-react'
import { useDebounceValue } from 'usehooks-ts'
import { router } from '@inertiajs/react'

type Props = {
  externApiDetails: App.PaginatedResponse<App.Models.ExternApiDetail>,
  query: string | null,
}

function Index() {
  const { props: { externApiDetails, query }, url } = useTypedPage<Props>()

  const [search, setSearch] = useState(query ?? "")
  const [debouncedSearch, _] = useDebounceValue(search, 400)
  const searchRef = useRef<React.ElementRef<typeof Input>>(null)

  useEffect(() => {
    if (search !== query) {
      router.visit(url, {
        method: "get",
        only: ["externApiDetails", "query"],
        preserveState: true,
        replace: true,
        data: { query: search, page: 1 },
      })
    }
  }, [debouncedSearch])

  return (
    <AppLayout title='Extern API Details'>
      <div className='flex flex-col justify-between gap-2 p-2 min-h-[calc(100vh-80px)]'>
        <div className="">
          <div className="mb-4">
            <h1 className='text-2xl font-semibold'>Extern API Keys & Details</h1>
            <p className='text-slate-600 text-sm'>
              Manage your Extern API keys and details.
            </p>
          </div>
          <label className="block mb-2 relative md:max-w-sm group">
            <MagnifyingGlassIcon className='absolute size-4 left-2 top-1/2 -translate-y-1/2 transform text-muted-foreground group-has-[:focus-visible]:text-slate-700' />
            <Input ref={searchRef} type='search' placeholder='Search' className='pl-7' value={search} onChange={e => setSearch(e.target.value)} />
          </label>
          <div className="grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            <CreateExternalApiDetailsCard />

            {externApiDetails.data.map((externApiDetail) => (
              <ExternApiDetailsCard key={externApiDetail.id} externApiDetail={externApiDetail} />
            ))}
          </div>
        </div>
        <PaginationLinks {...externApiDetails} resourceName="externApiDetails" />
      </div>
    </AppLayout>
  )
}

function CreateExternalApiDetailsCard() {
  return (
    <Card className='bg-slate-50'>
      <CardHeader>
        <CardTitle>Add new API Keys</CardTitle>
        <CardDescription>
          Add new API keys to access external services, such as payment gateways, email services, etc.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button>
          <ListPlus />
          <span className='ml-2'>Add API Key</span>
        </Button>
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

export default Index
