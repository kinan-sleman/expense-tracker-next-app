import Image from 'next/image'
import React from 'react'
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'

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
                    <SignInButton mode="modal">
                        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                            Sign In
                        </button>
                    </SignInButton>

                    <SignUpButton mode="modal">
                        <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors">
                            Sign Up
                        </button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                userButtonAvatarBox: "w-10 h-10",
                                userButtonTrigger: "hover:bg-gray-100 rounded-full",
                                // You can target other elements here if needed
                            },
                        }}
                    />
                </SignedIn>
            </div>
        </header>
    )
}