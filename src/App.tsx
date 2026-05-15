import { useEffect, useMemo, useReducer } from "react"
import { Form } from "./components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducer";
import { ActivityList } from "./components/ActivityList";

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp = () => useMemo(() => state.activities.length, [state.activities])

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de Calorías
          </h1>

          <button 
            className="bg-gray-800 hover:bg-gray-900 text-white uppercase font-bold px-5 py-1 rounded-lg cursor-pointer text-sm disabled:opacity-10"
            onClick={() => dispatch({ type: 'clean-activities' })}
            disabled={!canRestartApp()}
            >Reiniciar App</button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form 
            state={state}
            dispatch={dispatch}
          />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList 
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default App
