import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Logo } from "./logo"
import { LinkBtn } from "./button"

export const Header = (props) => {
    return (
        <header className='p-4 align-middle shadow-md bg-gray-100/30'>
            <div className='container flex justify-between align-middle'>
                <div className='px-4 align-middle'>
                    <Link href={"/preview"}>
                        <Logo />
                    </Link>
                </div>
                <SignedIn>
                    <div className='mt-2 scale-150'>
                        <UserButton />
                    </div>
                </SignedIn>
                <SignedOut>
                    <LinkBtn varient="blue" href="/preview/login">Login</LinkBtn>
                </SignedOut>
            </div>
        </header>
    )
}