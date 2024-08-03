import Link from "next/link"

export const Button = (props) => {
    return <button className='font-semibold py-2.5 min-w-24 px-2 bg-teal-800 text-white border border-teal-800 rounded-md'>
        {props.children}
    </button>
}

const varientClassNames = {
    "blue": " bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 ",
    "green": " bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 ",
    "gray": " bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 "
}

export const Btn = (props) => (
    <button
        type={props?.type}
        aria-disabled={props?.ariaDisabled}
        className={"inline-block px-6 py-3 transition duration-200 " +
            varientClassNames[props.varient] + props?.className}>
        {props.children}
    </button>)

export const LinkBtn = (props) => (
    <Link
        href={props?.href}
        className={"inline-block px-6 py-3 transition duration-200 " +
            varientClassNames[props.varient] + props?.className}>
        {props.children}
    </Link>
)