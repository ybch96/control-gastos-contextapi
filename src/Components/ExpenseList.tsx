import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetails from "./ExpenseDetails";

export default function ExpenseList() {
  const { state } = useBudget();
  const isvalid = useMemo(() => state.expense.length === 0, [state.expense]);
  return isvalid ? (
    <p className="text-gray-600 text-2xl font-bold max-w-4xl mx-auto text-center">
      No hay nada que mostrar
    </p>
  ) : (
    <div className="max-w-4xl mx-auto my-4">
      <p className="text-gray-600 text-center text-2xl font-bold ">
        Listado de gastos
      </p>
      {state.expense.map((expense) => (
        <ExpenseDetails key={expense.id} expense={expense} />
      ))}
    </div>
  );
}
