const { Loading, LoadingOval, LoadingDots, LoadingExamples } = require("@/components/custom/ui")

const page = () => {
    return <div>
        <Loading />
        <LoadingOval />
        <LoadingDots />
        <LoadingExamples />
    </div>
}

export default page