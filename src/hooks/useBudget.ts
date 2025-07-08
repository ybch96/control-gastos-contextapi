import { useContext } from "react";
import { BurguedContext } from "../context/contex";

export const useBudget = () => {
    const useBudgetContext = useContext(BurguedContext)
    if (!useBudgetContext) {
        throw new Error(" No estas usando correctamente el context")
    }
    return useBudgetContext
} 