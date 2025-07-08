import { useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget"


export default function BudgetForm() {
  const {state, dispatch} = useBudget()
     


    const [budget, setBudget] = useState(0)
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
     setBudget(e.target.valueAsNumber)
    }

    const handleSubmit = ( e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      dispatch({type:"save-burget", payload:{cantidad:budget}})
      setBudget(0)
    }

    const isValid = useMemo(() => budget > 0, [budget])

    console.log(state.budget)
    return (
    <form onSubmit={handleSubmit } className="space-y-5">
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Definir presupuesto
        </label>
        <input
          placeholder="Define presupuesto"
          className="w-full bg-white border border-gray-200 p-2"
          type="number"
          name="budget"
          id="budget"
          value={budget}
          onChange={handleChange}
        />
      </div>
      <input type="submit" value="Definir presupuesto" disabled={!isValid} className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-10" />
    <h1>{budget}</h1>

    </form>
  );
}
