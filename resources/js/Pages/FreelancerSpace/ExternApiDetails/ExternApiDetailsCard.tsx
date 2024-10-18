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
  const hasExpired = !!expiresAt ? expiresAt < new Date() : false

  return (
    <Card.Card key={externApiDetail.id}>
      <Card.CardHeader className='relative'>
        <Button variant={'ghost'} size={'icon'} className='w-5 h-5 absolute right-2 top-2'>
          <Pencil2Icon />
        </Button>

        {hasExpired ? <>
          <Button variant={'secondary'} size={'icon'} className='w-5 h-5 absolute right-2 top-6'>
            <TrashIcon className='text-red-500' />
          </Button>
        </> : null}

        {hasExpired && expiresAt ? <>
          <span className={twMerge([
            "text-xs",
            hasExpired ? "text-red-500" : "",
          ])}>{hasExpired ? "Expired at" : "Expires at"} {format(expiresAt, "d/M/y")}</span>
        </> : null}

        <div className="">
          <div className='flex items-baseline line-clamp-1'>
            <span className='font-semibold'>{externApiDetail.api_name}</span>
            <span>@</span>
            <span className='text-sm text-slate-600'>{externApiDetail.api_username}</span>
          </div>

          {externApiDetail.label ? <>
            <span className='text-xs text-slate-600'>{externApiDetail.label}</span>
          </> : null}
          <div className="text-xs text-slate-500">
          </div>
        </div>
      </Card.CardHeader>

      {externApiDetail.description ? <>
        <Card.CardContent>
          <div className='text-sm text-slate-600 line-clamp-2'>{externApiDetail.description}</div>
        </Card.CardContent>
      </> : null}
    </Card.Card>
  )
}

export default ExternApiDetailsCard