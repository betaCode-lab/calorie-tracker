import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

import type { Activity } from "../types"
import { categories } from "../data/categories.data"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type FormProps = {
    state: ActivityState
    dispatch: Dispatch<ActivityActions>
}

export const Form = ({ state, dispatch }: FormProps) => {

    const emptyActivity: Activity = {
        id: uuidv4(),
        name: '',
        calories: 0,
        category: 1
    };

    const [activity, setActivity] = useState<Activity>(emptyActivity);

    useEffect(() => {
        if (state.activeId !== '') {
            const activeActivity = state.activities.find(a => a.id === state.activeId)
            setActivity(activeActivity!)
        }

    }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['calories', 'category'].includes(e.target.id);

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity;
        return name.trim() !== '' && calories > 0;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({
            type: "save-activity",
            payload: { newActivity: activity }
        })

        setActivity({
            ...emptyActivity,
            id: uuidv4()
        })
    }

    return (
        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoría:</label>
                <select
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(item => (
                        <option
                            key={item.id}
                            value={item.id}
                        >{item.name}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Caminé 3km, Ciclismo 20min..."
                    className="border border-slate-300 p-2 rounded-lg"
                    value={activity.name}
                    onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorías:</label>
                <input
                    id="calories"
                    type="number"
                    placeholder="300, 400, 500..."
                    className="border border-slate-300 p-2 rounded-lg"
                    value={activity.calories}
                    onChange={handleChange} />
            </div>

            <input
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cusor-pointer disabled:opacity-10"
                value={activity.category === 1 ? 'Guardar comida' : 'Guardar ejercicio'}
                disabled={!isValidActivity()}
            />
        </form>
    )
}