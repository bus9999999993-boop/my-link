import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center font-black uppercase transition-colors shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#21242e] text-white",
        signal: "bg-[#f68d1f] text-white bevel-signal",
        amber: "bg-[#ecab37] text-[#21242e] bevel-chip",
        nintendo: "bg-[#e60012] text-white",
        code: "bg-[#21242e] text-[#ecab37]",
        spec: "bg-white border border-[#3d4f97] text-[#21242e] shadow-2xs",
        custom: "",
      },
      size: {
        default: "text-[10px] px-2 py-0.5",
        xs: "text-[9px] px-1.5 py-0.5",
        micro: "text-[9px] px-1.5 py-0.2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
