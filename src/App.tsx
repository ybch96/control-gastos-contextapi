import { useEffect, useMemo } from "react";
import BudgetForm from "./Components/BudgetForm";
import { useBudget } from "./hooks/useBudget";
import TrakerBudget from "./Components/TrakerBudget";
import ExpenseModal from "./Components/ExpenseModal";
import ExpenseList from "./Components/ExpenseList";
import FilterByCategory from "./Components/FilterByCategory";

function App() {
  const { state } = useBudget();

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(state.budget));
  }, [state.budget]);

  useEffect(() => {
    localStorage.setItem("expense", JSON.stringify(state.expense));
  }, [state.expense]);

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);
  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de gastos
        </h1>
      </header>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg my-8 p-10">
        {isValidBudget ? <TrakerBudget /> : <BudgetForm />}
      </div>
      {isValidBudget && (
        <div className="max-w-3xl mx-auto py-10">
          <FilterByCategory/>
          <ExpenseList />
          <ExpenseModal />
        </div>
      )}
    </>
  );
}

export default App;
