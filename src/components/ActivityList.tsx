import { Dispatch, useMemo } from "react"
import type { Activity } from "../types"
import { categories } from "../data/categories.data"
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { ActivityActions } from "../reducers/activity-reducer"

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}


export const ActivityList = ({ activities, dispatch }: ActivityListProps) => {

    const categoryName = useMemo(() =>
        (id: Activity['category']) => categories.map(c => c.id === id ? c.name : '')
        , [activities])

    const isEmpty = useMemo(() => activities.length === 0, [activities])

    function handleEdit(id: Activity['id']) {
        dispatch({
            type: 'set-activeId',
            payload: { id }
        })
    }

    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">
                Comida y Actividades
            </h2>

            {isEmpty ? (
                <p className="text-center my-5 text-gray-500">No cuentas con actividades aún...</p>
            ) : (
                activities.map(item => (
                    <div key={item.id} className="px-5 py-10 bg-white mt-5 flex justify-between shadow">
                        <div className="space-y-2 relative">
                            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${item.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                                {categoryName(item.category)}
                            </p>
                            <p className="text-2xl font-bold pt-5">{item.name}</p>
                            <p className="font-black text-4xl text-lime-500">
                                {item.calories} - {''}
                                <span>Calorías</span>
                            </p>
                        </div>
                        <div className="flex gap-5 items-center">
                            <button className="cursor-pointer" onClick={() => handleEdit(item.id)}>
                                <PencilSquareIcon
                                    className="w-8 h-8 text-gray-800"
                                />
                            </button>
                            <button className="cursor-pointer" onClick={() => dispatch({
                                type: 'delete-activity',
                                payload: { id: item.id }
                            })}>
                                <XCircleIcon className="h-8 w-8 text-red-500" />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </>
    )
}