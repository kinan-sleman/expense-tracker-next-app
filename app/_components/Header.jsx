import { Button } from '../../components/ui/button'
import Image from 'next/image'
import React from 'react'
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import Link from 'next/link'

export default function Header() {
    return (
        <header className="flex justify-between items-center p-4 h-16 bg-background/80 backdrop-blur-sm shadow-md">
            <div className="flex items-center gap-4">
                <Image
                    src={'./logo.svg'}
                    alt="logo"
                    width={160}
                    height={160}
                    className="rounded-lg"
                />
            </div>

            <div className="flex items-center gap-4">
                <SignedOut>
                    <SignInButton className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                        Sign In
                    </SignInButton>
                    <SignUpButton className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors">
                        Sign Up
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                    <UserButton
                        afterSignOutUrl="/"
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                    />
                </SignedIn>
            </div>
        </header>
    )
}
