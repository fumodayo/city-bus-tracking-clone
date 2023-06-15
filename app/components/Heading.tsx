'use client'

interface HeadingProps {
    title:string
}

const Heading:React.FC<HeadingProps> = ({title}) => {
  return (
    <div className="
        relative 
        bg-[#3597E4] 
        px-3
        py-6 
        w-full 
        h-20
        text-lg
        text-white
        font-semibold
    ">
        {title}
    </div>
  )
}

export default Heading