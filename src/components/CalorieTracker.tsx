import { useMemo } from 'react'
import { Activity } from '../types'
import CalorieDisplay from './CalorieDisplay'

type CalorieTrackerProps = {
    activities: Activity[]
}

export default function CalorieTracker({ activities }: CalorieTrackerProps) {

    const consumed = activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0)

    const burned = activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0)

    const netCalories = consumed - burned

    return (
        <>
            <h2 className='text-4xl font-black text-white text-center'>
                Resumen de Calorías
            </h2>

            <div className='flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10'>
                <CalorieDisplay 
                    total={consumed}
                    label='Consumidas'
                    type='food'
                />
                <CalorieDisplay 
                    total={burned}
                    label='Quemadas'
                    type='excersise'
                />
                <CalorieDisplay 
                    total={netCalories}
                    label='Total'
                    type='food'
                />
            </div>
        </>
    )
}
