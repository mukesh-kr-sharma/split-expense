import { XCircleIcon } from "@heroicons/react/24/solid"

export const UList = (props) => (
    <ul className='px-4'>
        {props.children}
    </ul>
)


export const ListItemWC = (props) => (
    <li className='flex justify-between px-2 py-3 border-b-2'>
        <p className="font-semibold">
            {props.children}
        </p>
        <button>
            <XCircleIcon className="text-orange-600 size-7" />
        </button>
    </li>
)