import React from 'react'
import useTypedPage from '@/Hooks/useTypedPage'
import AppLayout from '@/Layouts/AppLayout'
import ExternApiDetailsCard from './ExternApiDetailsCard'
import PaginationLinks from '@/components/PaginationLinks'


type Props = {
  externApiDetails: App.PaginatedResponse<App.Models.ExternApiDetail>
}

function Index() {
  const { props: { externApiDetails } } = useTypedPage<Props>()

  return (
    <AppLayout title='Extern API Details'>
      <div className=''>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {externApiDetails.data.map((externApiDetail) => (
            <ExternApiDetailsCard key={externApiDetail.id} externApiDetail={externApiDetail} />
          ))}
        </div>
        <PaginationLinks {...externApiDetails} resourceName="externApiDetails" />
      </div>
    </AppLayout>
  )
}

export default Index
