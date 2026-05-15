import type { Activity } from "../types"

export type ActivityActions = 
    {type: 'save-activity', payload: { newActivity: Activity } } |
    { type: 'set-activeId', payload: { id: Activity['id'] } } | 
    { type: 'delete-activity', payload: { id: Activity['id'] } } |
    { type: 'clean-activities' }

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

const localStorageActivities = ():Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) as Activity[] : []
}

export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {

    if(action.type === "save-activity") {
        let updatedActivities: Activity[] = []

        if(state.activeId) {
            updatedActivities = state.activities.map(a => a.id === state.activeId 
                ? action.payload.newActivity : a)
        } else {
            updatedActivities = [...state.activities, action.payload.newActivity]
        }
        
        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
        }
    }

    if(action.type === 'delete-activity') {
        const updated = state.activities.filter(a => a.id !== action.payload.id)
        return {
            ...state,
            activities: updated,
        }
    }

    if(action.type === "set-activeId") {
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === 'clean-activities') {
        return {
            activities: [],
            activeId: ''
        }
    }

    return state;
}