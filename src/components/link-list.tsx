"use client"

import * as React from "react"
import { type LinkCartridge } from "@/data/links"
import { LinkItemCard } from "@/components/link-item-card"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface LinkListProps {
  links: LinkCartridge[]
  email?: string
  onCopyEmail?: () => void
  className?: string
}

export function LinkList({
  links,
  email,
  onCopyEmail,
  className,
}: LinkListProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {links.map((link, idx) => (
        <LinkItemCard
          key={link.id || (link.code ? `${link.code}-${idx}` : idx)}
          item={link}
        />
      ))}

      {email && (
        <Card
          className="group bg-[#dedede] hover:bg-white p-2.5 flex items-center justify-between gap-2.5 cursor-pointer text-left"
          onClick={onCopyEmail}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              onCopyEmail?.()
            }
          }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Badge size="xs" variant="nintendo" className="shrink-0">
              MAIL
            </Badge>
            <div className="min-w-0">
              <div className="text-[12px] font-black text-[#21242e] group-hover:text-[#3d4f97]">
                Contact / E-mail
              </div>
              <div className="text-[10px] font-bold text-[#555e75] truncate">
                {email}
              </div>
            </div>
          </div>
          <Button
            type="button"
            variant="amber"
            size="badge"
            className="shrink-0"
            onClick={(e) => {
              e.stopPropagation()
              onCopyEmail?.()
            }}
          >
            COPY ✉
          </Button>
        </Card>
      )}
    </div>
  )
}
