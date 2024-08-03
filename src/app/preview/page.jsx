import {
    SignedIn,
    SignedOut,
} from '@clerk/nextjs'
import { LinkBtn } from '@/components/custom/button';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Logo } from '@/components/custom/logo';
import { Background } from '@/components/custom/ui';

export const metadata = {
    title: 'Split Expense',
    description: 'This tool can help you to settle the expenses made by any people in a group.',
};

const page = async () => {
    // https://clerk.com/docs/references/nextjs/read-session-data
    return (
        <Background className="justify-center items-center">
            <div className="p-20 max-w-2xl text-center bg-sky-50 rounded-xl border shadow-2xl">
                <h1 className="inline-block mr-4 mb-4 text-4xl font-extrabold text-gray-900">Welcome to</h1>
                <Logo className="inline-block my-4" />
                <p className="mb-8 text-lg text-gray-700">
                    Effortlessly split all your expenses among friends and family with ease. Manage your shared costs, track payments, and ensure everyone contributes fairly.
                </p>
                <div className="flex flex-col gap-4 justify-center sm:flex-row">
                    <SignedIn>
                        <LinkBtn href={"/preview/dashboard"} className="flex align-middle" varient="blue">
                            Go to Dashboard
                            <UserCircleIcon className='inline ml-2 font-semibold size-6' />
                        </LinkBtn>
                    </SignedIn>
                    <SignedOut>
                        <LinkBtn href={"/preview/login"} varient="blue">Login</LinkBtn>
                        <LinkBtn href={"/preview/sign-up"} varient="green">Sign Up</LinkBtn>
                        <LinkBtn href={"/preview/create-group"} varient="gray">Proceed without Login</LinkBtn>
                    </SignedOut>
                </div>
            </div>
        </Background>
    )
}

export default page