
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
export default function TrakerBudget() {
  const { state, dispatch, available, spent } = useBudget();

  const porcentage = +((spent / state.budget) * 100).toFixed(2)
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
      <div className="flex justify-center">
        <CircularProgressbar
        value={porcentage}
        text={`${porcentage} % gastado`}
        styles={buildStyles({
            pathColor:porcentage === 100 ?"#CD2626":"3b82b6",
            textColor:porcentage === 100 ?"#CD2626":"3b82b6",
            textSize:8
        })}
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white font-bold rounded-lg"
          onClick={() => dispatch({ type: "resect" })}
        >
          Resetear app
        </button>
        <AmountDisplay text={"Presupuesto"} amount={state.budget} />
        <AmountDisplay text={"Disponible"} amount={available} />
        <AmountDisplay text={"Gastado"} amount={spent} />
      </div>
    </div>
  );
}
