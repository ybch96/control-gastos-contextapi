import type { Expense, ExpenseTem } from "../types"
import { v4 as uuidv4 } from "uuid"

export type burgedTypes =
    { type: "save-burget", payload: { cantidad: number } } |
    { type: "open-modal" } |
    { type: "close-modal" } |
    { type: "add-expense", payload: { expense: ExpenseTem } } |
    { type: "delete-expense", payload: { id: Expense["id"] } } |
    { type: "get-id", payload: { id: Expense["id"] } } |
    { type: "update-expense", payload: { expenseUp: Expense } } |
    { type: "resect" } |
    {type: "current-filter", payload:{id:Expense["id"]}}

export type initialStateProps = {
    budget: number
    modal: boolean
    expense: Expense[]
    getId: Expense["id"]
    currentFilter: Expense["category"]
}

const getBurget: () => number = () => {
    const burgetDateStorage = localStorage.getItem("budget")
    return burgetDateStorage ? JSON.parse(burgetDateStorage) : 0
}
const getExpense: () => Expense[] = () => {
    const expenseDateStorage = localStorage.getItem("expense")
    return expenseDateStorage ? JSON.parse(expenseDateStorage) : []
}

export const initialStateBudget: initialStateProps = {
    budget: getBurget(),
    modal: false,
    expense: getExpense(),
    getId: "",
    currentFilter: ""
}

const createExpense = (expense: ExpenseTem): Expense => {
    return {
        ...expense,
        id: uuidv4()
    }
}

export const reducerBudget = (
    state: initialStateProps,
    action: burgedTypes
) => {
    if (action.type === "save-burget") {
        return {
            ...state,
            budget: action.payload.cantidad
        }
    }

    if (action.type === "open-modal") {
        return {
            ...state,
            modal: true
        }
    }

    if (action.type === "close-modal") {
        return {
            ...state,
            modal: false,
            getId: ""
        }
    }

    if (action.type === "add-expense") {

        const expense = createExpense(action.payload.expense)
        return {
            ...state,
            expense: [...state.expense, expense],
            modal: false,
            getId: ""
        }
    }

    if (action.type === "delete-expense") {
        return {
            ...state,
            expense: state.expense.filter(expen => expen.id !== action.payload.id)
        }
    }
    if (action.type === "get-id") {
        return {
            ...state,
            getId: action.payload.id,
            modal: true
        }
    }
    if (action.type === "update-expense") {
        return {
            ...state,
            expense: state.expense.map(item => item.id === state.getId ? action.payload.expenseUp : item),
            modal: false,
            getId: ""

        }
    }
    if (action.type === "resect") {
        return {
            ...state,
            budget: 0,
            expense: [],

        }
    }
    if (action.type === "current-filter") {
        return {
            ...state,
            currentFilter:action.payload.id

        }
    }
    return state

}