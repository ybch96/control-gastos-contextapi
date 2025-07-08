import {createContext} from 'react'
import type {initialStateProps, burgedTypes} from '../reducers/burguedReducer'

type BurguedContextProps ={
    state:initialStateProps
    dispatch:React.ActionDispatch<[action: burgedTypes]>
    available:number
    spent:number
}

export const BurguedContext = createContext<BurguedContextProps>(null!)
