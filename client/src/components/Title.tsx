
interface TitleProps {
  text1: string;
  text2: string;
  showLine?: boolean;
}
const Title:React.FC<TitleProps> = ({text1, text2, showLine=true}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      <p className='text-gray-500 sm:text-[20px] text-sm'>
        {text1} <span className='text-gray-700 font-medium'>{text2}</span>
      </p>
       {showLine && (
        <p className='w-8 sm:w-10 h-[1px] sm:h-[2px] bg-gray-700'></p> 
      )}
    </div>
  )
}

export default Title
