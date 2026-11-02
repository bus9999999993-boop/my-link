import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center font-black uppercase transition-colors outline-none select-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-[#21242e] text-white hover:bg-[#343a4a]",
        signal: "bg-[#f68d1f] hover:bg-[#ff9e3b] text-white bevel-signal shadow-xs",
        amber: "bg-[#ecab37] hover:bg-[#e48600] active:bg-[#e48600] text-[#21242e] bevel-chip tracking-[0.5px]",
        subtle: "bg-[#dedede] hover:bg-white text-[#21242e] bevel-plate",
        ghost: "hover:bg-black/5 text-[#21242e]",
      },
      size: {
        default: "h-8 px-3 text-xs gap-1.5",
        xs: "h-6 px-2 text-[10px] gap-1",
        sm: "h-7 px-2.5 text-[11px] gap-1",
        icon: "w-5 h-5 rounded-full text-[10px]",
        badge: "px-2 py-0.5 text-[10px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
