import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { type LinkCartridge } from "@/data/links"
import { cn } from "@/lib/utils"

export interface LinkItemCardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  item: LinkCartridge
}

export function LinkItemCard({ item, className, ...props }: LinkItemCardProps) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group block", className)}
      {...props}
    >
      <Card className="bg-[#dedede] group-hover:bg-white p-2.5 flex items-center justify-between gap-2.5 cursor-pointer">
        <div className="flex items-center gap-2.5 min-w-0">
          <Badge
            size="xs"
            variant="custom"
            className={cn("shrink-0", item.tagColor)}
          >
            {item.tag}
          </Badge>

          <div className="text-left min-w-0">
            <div className="text-[12px] font-black text-[#21242e] group-hover:text-[#3d4f97] truncate">
              {item.label}
            </div>
            <div className="text-[10px] font-bold text-[#555e75] truncate">
              {item.desc}
            </div>
          </div>
        </div>

        <span className="w-5 h-5 rounded-full bg-[#f68d1f] group-hover:bg-[#ff9e3b] text-white flex items-center justify-center font-black text-[10px] bevel-signal shrink-0 shadow-xs pointer-events-none">
          ➔
        </span>
      </Card>
    </a>
  )
}
