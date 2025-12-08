import { SignedIn, SignedOut, SignInButton, SignUpButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Hero() {
    return (
        <section className="bg-gray-50 lg:grid lg:h-screen lg:place-content-center flex items-center flex-col">
            <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
                <div className="mx-auto max-w-prose text-center">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                        Manage Your Expense
                        <strong className="text-primary"> Control Your Money </strong>
                    </h1>
                    <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                        Start Creating your budget and save ton of money
                    </p>
                    <div className="mt-4">
                        <SignedOut>
                            <SignInButton className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                                Sign In
                            </SignInButton>
                            <SignUpButton className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors">
                                Sign Up
                            </SignUpButton>
                        </SignedOut>
                        <SignedIn>
                            <div className="mt-4 flex justify-center gap-4 sm:mt-6">
                                <Link
                                    className="inline-block rounded border border-primary bg-primary px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-primary/90"
                                    href="/dashboard"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </SignedIn>
                    </div>
                </div>
            </div>
            {/* Dashboard Image */}
            {/* <Image 
                src={"/dashboard.png"}
                alt="dashboard"
                width={1000}
                height={700}
                className="-mt-9 rounded-xl border-2"
            /> */}
        </section>
    )
}
