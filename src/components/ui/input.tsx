import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <InputPrimitive
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          "w-full bg-[#dedede] bevel-inset px-2.5 py-1.5 text-xs font-bold text-[#21242e] placeholder:text-[#8890a5] placeholder:font-normal focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#3d4f97] transition-colors disabled:opacity-50",
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
