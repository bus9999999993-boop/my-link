"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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

export const TAG_PRESETS = [
  { tag: "CODE", color: "bg-[#21242e] text-[#ecab37]" },
  { tag: "BLOG", color: "bg-[#206479] text-white" },
  { tag: "CAREER", color: "bg-[#3d4f97] text-white" },
  { tag: "WORK", color: "bg-[#e60012] text-white" },
  { tag: "SNS", color: "bg-[#a7282b] text-white" },
  { tag: "VIDEO", color: "bg-[#e60012] text-white" },
  { tag: "DOCS", color: "bg-[#21242e] text-white" },
  { tag: "CHAT", color: "bg-[#3d4f97] text-[#9fbee7]" },
] as const

/**
 * 올바른 도메인/URL 형태인지 엄격하게 검증하는 함수
 * - '123', '999', '123.456' 같은 단순 숫자/정수 차단 (브라우저가 0.0.0.123 IPv4로 오인식하는 현상 방지)
 * - 'abc', 'test' 같은 단순 단어 차단
 * - 'google.com', 'https://github.com/profile', 'http://localhost:3000' 등 유효한 주소만 통과
 */
export function isValidUrlString(val: string): boolean {
  if (!val || typeof val !== "string") return false
  const trimmed = val.trim()
  if (!trimmed || /\s/.test(trimmed)) return false

  // 순수 정수이거나 단순 소수점 형태의 숫자 ('123', '999', '123.456') 차단
  if (/^[\d.]+$/.test(trimmed)) {
    // 4개 마디의 유효한 IPv4(0~255) 형태만 예외적으로 허용 (예: 127.0.0.1, 192.168.0.1)
    const ipv4Strict = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/
    const match = trimmed.match(ipv4Strict)
    if (!match) return false
    const octets = [match[1], match[2], match[3], match[4]].map(Number)
    if (octets.some((o) => o > 255)) return false
  }

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  try {
    const parsed = new URL(withProtocol)
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false

    const hostname = parsed.hostname
    if (!hostname) return false

    // 로컬 개발 호스트 허용
    if (hostname === "localhost" || hostname === "127.0.0.1") return true

    // IPv4 주소 체크
    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/
    if (ipv4Regex.test(hostname)) {
      if (!trimmed.includes(".")) return false
      const match = hostname.match(ipv4Regex)
      if (!match) return false
      const octets = [match[1], match[2], match[3], match[4]].map(Number)
      if (octets.some((o) => o > 255)) return false
      return true
    }

    // 일반 도메인의 경우 최소 1개 이상의 dot(.)이 포함되어야 하며 시작/끝에 dot이 올 수 없음
    if (!hostname.includes(".") || hostname.startsWith(".") || hostname.endsWith(".")) {
      return false
    }

    const parts = hostname.split(".")
    const tld = parts[parts.length - 1]

    // 최상위 도메인(TLD)은 영문 알파벳 2자리 이상이어야 함 (예: .com, .net, .io, .kr 등)
    if (!/^[a-zA-Z]{2,}$/.test(tld)) {
      return false
    }

    // 각 도메인 파트 검증 (영문, 숫자, 하이픈)
    if (parts.some((p) => !/^[a-zA-Z0-9-]+$/.test(p) || p.startsWith("-") || p.endsWith("-"))) {
      return false
    }

    return true
  } catch {
    return false
  }
}

export const addLinkSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1, "링크 제목(라벨)을 입력해주세요.")
    .max(30, "링크 제목은 최대 30자까지 입력 가능합니다."),
  url: z
    .string()
    .trim()
    .min(1, "URL 주소를 입력해주세요.")
    .refine(
      isValidUrlString,
      "올바른 URL 형식(예: https://example.com 또는 github.com)을 입력해주세요."
    ),
  desc: z
    .string()
    .trim()
    .max(50, "설명은 최대 50자까지 입력 가능합니다.")
    .optional(),
  tag: z.string().min(1, "태그를 선택해주세요."),
})

export type AddLinkFormData = z.infer<typeof addLinkSchema>

export interface AddLinkDialogProps {
  onAddLink: (link: LinkCartridge) => void
  currentCount?: number
}

export function AddLinkDialog({ onAddLink, currentCount = 0 }: AddLinkDialogProps) {
  const [open, setOpen] = React.useState(false)

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddLinkFormData>({
    resolver: zodResolver(addLinkSchema),
    defaultValues: {
      label: "",
      url: "",
      desc: "",
      tag: TAG_PRESETS[0].tag,
    },
    mode: "onChange",
  })

  // 실시간 프리뷰를 위한 폼 감시(watch)
  const watchedLabel = watch("label")
  const watchedDesc = watch("desc")
  const watchedTag = watch("tag")

  const currentTagColor =
    TAG_PRESETS.find((p) => p.tag === watchedTag)?.color || TAG_PRESETS[0].color

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      reset()
    }
  }

  const onSubmit = (data: AddLinkFormData) => {
    let finalUrl = data.url.trim()
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`
    }

    const codeNum = String(currentCount + 1).padStart(2, "0")
    const newCartridge: LinkCartridge = {
      label: data.label.trim(),
      url: finalUrl,
      desc: data.desc?.trim() || "사용자 등록 링크 카트리지",
      tag: data.tag,
      tagColor: currentTagColor,
      code: `USER-${codeNum}`,
    }

    onAddLink(newCartridge)
    reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            {/* 상단 통합 에러 알림창 (에러 발생 시) */}
            {(errors.label || errors.url || errors.desc) && (
              <div className="bg-[#e60012] text-white px-2.5 py-1.5 text-[11px] font-bold bevel-chip flex flex-col gap-0.5">
                <span className="flex items-center gap-1 font-black">
                  <span>⚠</span>
                  <span>SYSTEM VALIDATION ERROR</span>
                </span>
                {errors.label && <span>• {errors.label.message}</span>}
                {errors.url && <span>• {errors.url.message}</span>}
                {errors.desc && <span>• {errors.desc.message}</span>}
              </div>
            )}

            {/* 레이블 / 이름 */}
            <div className="flex flex-col gap-1 text-left">
              <label
                htmlFor="cartridge-label"
                className="text-[10px] font-black uppercase text-[#21242e] tracking-wider flex items-center justify-between"
              >
                <span>CARTRIDGE LABEL (제목) *</span>
                <span className="text-[9px] font-bold text-[#3d4f97]">최대 30자</span>
              </label>
              <Input
                id="cartridge-label"
                placeholder="예: GitHub 저장소, 기술 블로그"
                maxLength={30}
                {...register("label")}
                className={errors.label ? "border-2 border-[#e60012] bg-[#ffeaea]" : ""}
              />
              {errors.label && (
                <span className="text-[10px] font-bold text-[#a7282b]">
                  ⚠ {errors.label.message}
                </span>
              )}
            </div>

            {/* URL */}
            <div className="flex flex-col gap-1 text-left">
              <label
                htmlFor="cartridge-url"
                className="text-[10px] font-black uppercase text-[#21242e] tracking-wider"
              >
                TARGET URL (주소) *
              </label>
              <Input
                id="cartridge-url"
                placeholder="예: https://github.com/my-profile"
                {...register("url")}
                className={errors.url ? "border-2 border-[#e60012] bg-[#ffeaea]" : ""}
              />
              {errors.url && (
                <span className="text-[10px] font-bold text-[#a7282b]">
                  ⚠ {errors.url.message}
                </span>
              )}
            </div>

            {/* 한 줄 설명 */}
            <div className="flex flex-col gap-1 text-left">
              <label
                htmlFor="cartridge-desc"
                className="text-[10px] font-black uppercase text-[#21242e] tracking-wider flex items-center justify-between"
              >
                <span>DESCRIPTION (한 줄 설명)</span>
                <span className="text-[9px] font-bold text-[#3d4f97]">선택, 최대 50자</span>
              </label>
              <Input
                id="cartridge-desc"
                placeholder="카트리지에 대한 한 줄 설명"
                maxLength={50}
                {...register("desc")}
                className={errors.desc ? "border-2 border-[#e60012] bg-[#ffeaea]" : ""}
              />
              {errors.desc && (
                <span className="text-[10px] font-bold text-[#a7282b]">
                  ⚠ {errors.desc.message}
                </span>
              )}
            </div>

            {/* 카테고리 태그 선택 (React Hook Form Controller 연동) */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-[10px] font-black uppercase text-[#21242e] tracking-wider">
                SELECT TAG (태그 칩)
              </label>
              <Controller
                control={control}
                name="tag"
                render={({ field }) => (
                  <div className="flex flex-wrap gap-1.5">
                    {TAG_PRESETS.map((preset) => {
                      const isSelected = field.value === preset.tag
                      return (
                        <button
                          key={preset.tag}
                          type="button"
                          onClick={() => field.onChange(preset.tag)}
                          className={`cursor-pointer transition-transform ${
                            isSelected
                              ? "scale-105 ring-2 ring-[#ecab37]"
                              : "opacity-80 hover:opacity-100"
                          }`}
                        >
                          <Badge size="xs" variant="custom" className={preset.color}>
                            {preset.tag}
                          </Badge>
                        </button>
                      )
                    })}
                  </div>
                )}
              />
            </div>

            {/* 실시간 미리보기 (Live Cartridge Preview) */}
            <div className="mt-1 bg-[#8ba1d4] bevel-plate p-2 text-left">
              <div className="text-[9px] font-black text-[#21242e] uppercase mb-1">
                PREVIEW CARTRIDGE (실시간 렌더링)
              </div>
              <div className="bg-[#dedede] bevel-plate p-2 flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <Badge size="xs" variant="custom" className={`shrink-0 ${currentTagColor}`}>
                    {watchedTag || "TAG"}
                  </Badge>
                  <div className="min-w-0">
                    <div className="text-[11px] font-black text-[#21242e] truncate">
                      {watchedLabel || "LINK TITLE"}
                    </div>
                    <div className="text-[9px] font-bold text-[#555e75] truncate">
                      {watchedDesc || "링크 설명 미리보기"}
                    </div>
                  </div>
                </div>
                <span className="w-4 h-4 rounded-full bg-[#f68d1f] text-white flex items-center justify-center text-[8px] bevel-signal shrink-0">
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
              disabled={isSubmitting}
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
