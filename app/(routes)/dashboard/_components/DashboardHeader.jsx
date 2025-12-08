import { UserButton } from '@clerk/nextjs'
import React from 'react'

export default function DashboardHeader() {
    return (
        <div className='p-5 shadow-md border-b flex justify-between fixed w-full'>
            <div>Search Bar</div>
            <div><UserButton /></div>
        </div>
    )
}
