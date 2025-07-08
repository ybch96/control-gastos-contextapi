import type { ReactNode } from "react"

type ShowErrorProps = {
    children:ReactNode
}
export default function ShowError({children}:ShowErrorProps) {
  return (
    <p className="bg-red-600 font-bold text-white text-sm text-center ">{children}</p>
  )
}
