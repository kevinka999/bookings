import { useContext, useEffect } from "react"
import { Context } from "../context"
import { twMerge } from "tailwind-merge"

export type ShowToast = {
  type: "warning" | "success"
  content: string
}

export const Toast = () => {
  const { toast, showToast } = useContext(Context)

  useEffect(() => {
    if (!toast) return
    setTimeout(() => showToast(null), 3000)
  }, [toast])

  const classes = {
    ["success"]: "bg-green-300",
    ["warning"]: "bg-yellow-300",
  }

  if (!toast) return

  return (
    <div
      className={twMerge(
        "absolute bottom-2 right-2 flex flex-row items-center rounded-lg p-5",
        toast?.type && classes[toast.type],
      )}
    >
      <div className="text-sm font-normal">{toast?.content}</div>
      <button className="ml-3" onClick={() => showToast(null)}>
        x
      </button>
    </div>
  )
}
