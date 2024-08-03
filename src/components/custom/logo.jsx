import { EllipsisVerticalIcon } from "@heroicons/react/24/solid"

export const Logo = (props) => {
    return <div className={"font-extrabold text-4xl " + props?.className}>
        {/* <span className='text-sky-400'>{"{ "}</span> */}
         <span className="text-blue-600">Split</span>
        {/* <EllipsisVerticalIcon className="inline text-orange-600 align-middle size-8" /> */}
        {/* <span className="mx-2 text-orange-600">ɸϴΦϵ֍⁞Ξ  ϴ Φ ϵ ֍ ⁞ Ξ ╬ ║ ‖ ╟ Ɛ Ψ ₹ ░ ▒ ▓ </span> */}
        <span className="mx-2 font-semibold text-orange-500">₹</span>
        <span className='text-amber-500'>Expense</span>
        {/* <span className='text-sky-400'>{" }"}</span> */}
    </div>
}