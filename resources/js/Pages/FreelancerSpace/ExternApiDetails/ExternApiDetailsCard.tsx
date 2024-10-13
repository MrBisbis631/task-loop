import React from 'react'
import * as Card from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { twMerge } from 'tailwind-merge'

type Props = {
  externApiDetail: App.Models.ExternApiDetail,
}

function ExternApiDetailsCard({ externApiDetail }: Props) {
  const expiresAt = externApiDetail.expires_at ? new Date(externApiDetail.expires_at) : null

  return (
    <Card.Card key={externApiDetail.id}>
      <Card.CardHeader className='relative'>
        <Button variant={'ghost'} size={'icon'} className='w-5 h-5 absolute right-2 top-2'>
          <Pencil2Icon />
        </Button>
        {externApiDetail.expires_at ? <>
          <Button variant={'secondary'} size={'icon'} className='w-5 h-5 absolute right-2 top-6'>
            <TrashIcon className='text-red-500' />
          </Button></> : null}
        <div className="">
          <div className='flex items-baseline line-clamp-1'>
            <span className='font-semibold'>{externApiDetail.api_name}</span>
            <span>@</span>
            <span className='text-sm text-slate-600'>{externApiDetail.api_username}</span>
          </div>
          <span className='text-xs text-slate-500'>Last update at {format(externApiDetail.created_at, "PPP")}</span>
        </div>
      </Card.CardHeader>

      {externApiDetail.description ? <>
        <Card.CardContent>
          <div className='text-sm text-slate-600 line-clamp-2'>{externApiDetail.description}</div>
        </Card.CardContent>
      </> : null}

      {expiresAt ? <>
        <Card.CardFooter>
          <span className={twMerge([
            "text-xs",
            expiresAt < new Date() ? "text-red-500" : ""
          ])}>{expiresAt < new Date() ? "Expired at" : "Expires at"} {format(expiresAt, "PPP")}</span>
        </Card.CardFooter>
      </> : null}
    </Card.Card>
  )
}

export default ExternApiDetailsCard