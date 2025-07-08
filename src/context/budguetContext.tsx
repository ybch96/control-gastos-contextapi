import  { useMemo, useReducer, type ReactNode} from 'react'
import { reducerBudget, initialStateBudget } from '../reducers/burguedReducer'
import { BurguedContext } from './contex'


type childrenProp = {
  children:ReactNode
}


export const  BudguetProvider = ({children}:childrenProp) => {

  const [state,dispatch] = useReducer( reducerBudget, initialStateBudget)

  const spent = useMemo(() => {
    return state.expense.reduce((total, item) => item.amount + total, 0);
  }, [state.expense]);

  const available = useMemo(() => {
    return state.budget - spent;
  }, [spent, state.budget]);
  
  return (
    <BurguedContext.Provider
    value={{state, dispatch, available, spent}}
    >
      {children}
    </BurguedContext.Provider>
  )
}
