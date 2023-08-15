'use client'
import {useAuth, UserButton} from "@clerk/nextjs";
import Link from "next/link";

export default async function Nav() {
    return (
        <div>
            <div className="bg-slate-800 shadow-sm">
                <div className="px-6">
                    <div className="flex items-center h-16 justify-between">
                        <div className="flex flex-shrink-0 items-center">
                            <Link href="/">
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    className="text-gray-100"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        width="100%"
                                        height="100%"
                                        rx="16"
                                        fill="currentColor"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                                        fill="black"
                                    />
                                </svg>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <Link className="underline" href="/generateImg"> images </Link>
                            <User/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function User() {
    const {isSignedIn} = useAuth()
    return (
        <>
            {isSignedIn ? <UserButton afterSignOutUrl="/"/> : (
                <div className="space-y-1">
                    <Link href="/sign-in">
                        <button
                            className="flex w-full px-4 py-2 text-base rounded-lg font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                        >
                            Sign in
                        </button>
                    </Link>
                </div>
            )}
        </>
    )
}