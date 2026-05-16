type CalorieDisplayProps = {
    total: number,
    label: string,
    type: 'food' | 'excersise'
}

export default function CalorieDisplay({ total, label, type }: CalorieDisplayProps) {

    return (
        <p className='text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center'>
            <span className={`font-black text-6xl ${type === 'food' ? 'text-lime-500' : 'text-red-500'}`}>
                {total}
            </span>
            {label}
        </p>
    )
}
