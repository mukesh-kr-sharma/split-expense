export const Card = (props) => {
    return <div className='max-w-[600px] border border-slate-400 mx-auto p-4 my-4 rounded-sm bg-slate-100 text-slate-950 font-sans'>
        {props.children}
    </div>
}
// export const Card = (props) => {
//     return <div className='max-w-[600px] border border-slate-400 mx-auto p-4 my-4 rounded-sm bg-slate-100 text-slate-950 font-sans'>
//         {props.children}
//     </div>
// }

export const CardTitle = (props) => {
    return <div className='px-4 py-2 text-2xl font-semibold'>
        {props.children}
    </div>
}

export const CardDescription = (props) => {
    return <div className='px-4 my-2 text-gray-700'>
        {props.children}
    </div>
}

export const CardBody = (props) => {
    return <div className='px-4 mt-4 mb-6'>
        {props.children}
    </div>
}