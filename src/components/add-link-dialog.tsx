"use client"

import * as React from "react"
import { Plus, X } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { type LinkCartridge } from "@/data/links"

const TAG_PRESETS = [
  { tag: "CODE", color: "bg-[#21242e] text-[#ecab37]" },
  { tag: "BLOG", color: "bg-[#206479] text-white" },
  { tag: "CAREER", color: "bg-[#3d4f97] text-white" },
  { tag: "WORK", color: "bg-[#e60012] text-white" },
  { tag: "SNS", color: "bg-[#a7282b] text-white" },
  { tag: "VIDEO", color: "bg-[#e60012] text-white" },
  { tag: "DOCS", color: "bg-[#21242e] text-white" },
  { tag: "CHAT", color: "bg-[#3d4f97] text-[#9fbee7]" },
]

export interface AddLinkDialogProps {
  onAddLink: (link: LinkCartridge) => void
  currentCount?: number
}

export function AddLinkDialog({ onAddLink, currentCount = 0 }: AddLinkDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [label, setLabel] = React.useState("")
  const [url, setUrl] = React.useState("")
  const [desc, setDesc] = React.useState("")
  const [selectedTag, setSelectedTag] = React.useState(TAG_PRESETS[0].tag)
  const [tagColor, setTagColor] = React.useState(TAG_PRESETS[0].color)
  const [error, setError] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!label.trim()) {
      setError("링크 제목을 입력해주세요.")
      return
    }
    if (!url.trim()) {
      setError("URL을 입력해주세요.")
      return
    }

    let finalUrl = url.trim()
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`
    }

    const codeNum = String(currentCount + 1).padStart(2, "0")
    const newCartridge: LinkCartridge = {
      label: label.trim(),
      url: finalUrl,
      desc: desc.trim() || "사용자 등록 링크 카트리지",
      tag: selectedTag,
      tagColor: tagColor,
      code: `USER-${codeNum}`,
    }

    onAddLink(newCartridge)

    // Reset Form
    setLabel("")
    setUrl("")
    setDesc("")
    setSelectedTag(TAG_PRESETS[0].tag)
    setTagColor(TAG_PRESETS[0].color)
    setError("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="amber"
            size="xs"
            className="flex items-center gap-1.5 shadow-sm tracking-wider cursor-pointer font-black"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ INSERT CARTRIDGE</span>
          </Button>
        }
      />
      <DialogPopup>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              <span>💾</span>
              <span>INSERT NEW CARTRIDGE</span>
            </DialogTitle>
            <DialogClose
              render={
                <button
                  type="button"
                  className="text-white/80 hover:text-white cursor-pointer p-0.5"
                  aria-label="닫기"
                >
                  <X className="w-4 h-4" />
                </button>
              }
            />
          </DialogHeader>

          <DialogBody>
            {error && (
              <div className="bg-[#e60012] text-white px-2 py-1 text-[11px] font-bold bevel-chip">
                ⚠ {error}
              </div>
            )}

            {/* 레이블 / 이름 */}
            <div className="flex flex-col gap-1 text-left">
              <label className="text-[10px] font-black uppercase text-[#21242e] tracking-wider">
                CARTRIDGE LABEL (제목) *
              </label>
              <Input
                placeholder="예: GitHub, 포트폴리오 사이트"
                value={label}
                onChange={(e) => {
                  setLabel(e.target.value)
                  if (error) setError("")
                }}
                maxLength={30}
                required
              />
            </div>

            {/* URL */}
            <div className="flex flex-col gap-1 text-left">
              <label className="text-[10px] font-black uppercase text-[#21242e] tracking-wider">
                TARGET URL (주소) *
              </label>
              <Input
                placeholder="예: https://my-service.com"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value)
                  if (error) setError("")
                }}
                required
              />
            </div>

            {/* 한 줄 설명 */}
            <div className="flex flex-col gap-1 text-left">
              <label className="text-[10px] font-black uppercase text-[#21242e] tracking-wider">
                DESCRIPTION (설명)
              </label>
              <Input
                placeholder="카트리지에 대한 한 줄 설명"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                maxLength={50}
              />
            </div>

            {/* 카테고리 태그 선택 */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-[10px] font-black uppercase text-[#21242e] tracking-wider">
                SELECT TAG (태그 칩)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {TAG_PRESETS.map((preset) => {
                  const isSelected = selectedTag === preset.tag
                  return (
                    <button
                      key={preset.tag}
                      type="button"
                      onClick={() => {
                        setSelectedTag(preset.tag)
                        setTagColor(preset.color)
                      }}
                      className={`cursor-pointer transition-transform ${
                        isSelected ? "scale-105 ring-2 ring-[#ecab37]" : "opacity-80 hover:opacity-100"
                      }`}
                    >
                      <Badge size="xs" variant="custom" className={preset.color}>
                        {preset.tag}
                      </Badge>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 실시간 미리보기 */}
            <div className="mt-1 bg-[#8ba1d4] bevel-plate p-2 text-left">
              <div className="text-[9px] font-black text-[#21242e] uppercase mb-1">
                PREVIEW CARTRIDGE
              </div>
              <div className="bg-[#dedede] bevel-plate p-2 flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <Badge size="xs" variant="custom" className={`shrink-0 ${tagColor}`}>
                    {selectedTag}
                  </Badge>
                  <div className="min-w-0">
                    <div className="text-[11px] font-black text-[#21242e] truncate">
                      {label || "LINK TITLE"}
                    </div>
                    <div className="text-[9px] font-bold text-[#555e75] truncate">
                      {desc || "링크 설명 미리보기"}
                    </div>
                  </div>
                </div>
                <span className="w-4 h-4 rounded-full bg-[#f68d1f] text-white flex items-center justify-center text-[8px] bevel-signal">
                  ➔
                </span>
              </div>
            </div>
          </DialogBody>

          <DialogFooter>
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="subtle"
                  size="xs"
                  className="cursor-pointer"
                >
                  CANCEL
                </Button>
              }
            />
            <Button
              type="submit"
              variant="signal"
              size="xs"
              className="cursor-pointer"
            >
              INSERT 💾
            </Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  )
}
