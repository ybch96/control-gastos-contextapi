import { useEffect, useState } from "react";
import { useBudget } from "../hooks/useBudget";
import { categories } from "../data/categories";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { ExpenseTem } from "../types";
import ShowError from "./ShowError";
export default function ExpenseForm() {
  const { state, dispatch, available } = useBudget();
  const [expense, setEspense] = useState<ExpenseTem>({
    expenseName: "",
    amount: 0,
    category: "",
    date: new Date(),
  });

  const [error, setError] = useState("");

  const [laterValue, setLaterValue] = useState(0)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(expense).includes("") || expense.amount < 1) {
      setError("Todos los campos deben estar llenos");
      return;
    }

    if ((expense.amount - laterValue) > available) {
      setError("Superas el monto disponible");
      return;
    }
    if (state.getId) {
      dispatch({
        type: "update-expense",
        payload: { expenseUp: { ...expense, id: state.getId } },
      });
      return;
    }
    dispatch({ type: "add-expense", payload: { expense } });
  };

  const handleChange = (value: Date | null) => {
    setEspense({
      ...expense,
      date: value,
    });
  };

  const handleChangeI = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isValidNumber = ["amount"].includes(name);
    setEspense({
      ...expense,
      [name]: isValidNumber ? +value : value,
    });
  };

  useEffect(() => {
    const itemUpdate = state.expense.find((item) => item.id === state.getId);
    if (itemUpdate) {
      setEspense(itemUpdate);
      setLaterValue(itemUpdate.amount)
    }
  }, [state.expense, state.getId]);

  console.log(state.expense);
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <ShowError>{error}</ShowError>}
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        Nuevo Gasto
      </legend>

      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="expenseName">
          Nombre de gasto
        </label>
        <input
          type="text"
          name="expenseName"
          id="expenseName"
          placeholder="Añade el nombre del gasto"
          className="bg-slate-100 p-2"
          value={expense.expenseName}
          onChange={handleChangeI}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="amount">
          Cantidad:
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          placeholder="Añade cantidad ej:200"
          className="bg-slate-100 p-2"
          value={expense.amount}
          onChange={handleChangeI}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="category">
          Categoria
        </label>
        <select
          name="category"
          id="category"
          className="bg-slate-100 p-2"
          value={expense.category}
          onChange={handleChangeI}
        >
          <option value="">--Seleccione--</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="date">
          Fecha:
        </label>
        <DatePicker
          selected={expense.date}
          onChange={handleChange}
          id="date"
          className="bg-slate-100 p-2 w-full"
        />
      </div>
      <input
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        type="submit"
        value={state.getId ? "Modificar datos" : "Registrar gastos"}
      />
    </form>
  );
}
