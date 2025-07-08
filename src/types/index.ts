export type Expense = {
    id:string
    expenseName:string
    amount:number
    category:string
    date:ValuePiece
}

export type ValuePiece = Date | null

export type ExpenseTem = Omit<Expense, "id">

export type dt = {
    id: string
    name:string
    icon:string
}