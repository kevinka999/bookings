import { twMerge } from "tailwind-merge"

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  className?: string
}
export const Button = ({
  children,
  onClick,
  disabled = false,
  className,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        "rounded-sm bg-blue-400 p-2 text-white hover:bg-blue-300",
        className,
      )}
    >
      {children}
    </button>
  )
}
