"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil, Trash2, Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { type LinkCartridge } from "@/data/links"
import { addLinkSchema, type AddLinkFormData, TAG_PRESETS } from "@/components/add-link-dialog"
import { cn } from "@/lib/utils"

/** Firestore Timestamp 또는 Date → "YY.MM.DD HH:mm" 형식 변환 */
function formatTimestamp(ts: any): string | null {
  if (!ts) return null
  try {
    const date: Date = typeof ts.toDate === "function" ? ts.toDate() : new Date(ts)
    if (isNaN(date.getTime())) return null
    const yy = String(date.getFullYear()).slice(2)
    const mm = String(date.getMonth() + 1).padStart(2, "0")
    const dd = String(date.getDate()).padStart(2, "0")
    const hh = String(date.getHours()).padStart(2, "0")
    const min = String(date.getMinutes()).padStart(2, "0")
    return `${yy}.${mm}.${dd} ${hh}:${min}`
  } catch {
    return null
  }
}

export interface LinkItemCardProps {
  item: LinkCartridge
  onUpdate?: (id: string, updated: Partial<LinkCartridge>) => Promise<void>
  onDelete?: (item: LinkCartridge) => void
  className?: string
}

export function LinkItemCard({
  item,
  onUpdate,
  onDelete,
  className,
}: LinkItemCardProps) {
  const [isEditing, setIsEditing] = React.useState(false)

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
      label: item.label || "",
      url: item.url || "",
      desc: item.desc || "",
      tag: item.tag || TAG_PRESETS[0].tag,
    },
    mode: "onChange",
  })

  // item 프로퍼티가 바뀔 때 폼 값 동기화
  React.useEffect(() => {
    reset({
      label: item.label || "",
      url: item.url || "",
      desc: item.desc || "",
      tag: item.tag || TAG_PRESETS[0].tag,
    })
  }, [item, reset])

  const handleStartEdit = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    reset({
      label: item.label || "",
      url: item.url || "",
      desc: item.desc || "",
      tag: item.tag || TAG_PRESETS[0].tag,
    })
    setIsEditing(true)
  }

  const handleCancelEdit = (e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    reset()
    setIsEditing(false)
  }

  const onSubmit = async (data: AddLinkFormData) => {
    let finalUrl = data.url.trim()
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`
    }

    const currentTagColor =
      TAG_PRESETS.find((p) => p.tag === data.tag)?.color ||
      item.tagColor ||
      TAG_PRESETS[0].color

    try {
      if (item.id && onUpdate) {
        await onUpdate(item.id, {
          label: data.label.trim(),
          url: finalUrl,
          desc: data.desc?.trim() || "사용자 등록 링크 카트리지",
          tag: data.tag,
          tagColor: currentTagColor,
        })
      }
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update cartridge:", error)
    }
  }

  // 1. 인라인 편집 모드 렌더링
  if (isEditing) {
    return (
      <Card className={cn("bg-[#dedede] p-3 bevel-plate border-2 border-[#ecab37]", className)}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-2.5">
          {/* 상단 편집 바 */}
          <div className="flex items-center justify-between pb-1 border-b border-[#3d4f97]/30">
            <span className="text-[10px] font-black uppercase text-[#ecab37] bg-[#21242e] px-1.5 py-0.5 tracking-wider">
              EDIT CARTRIDGE ✍
            </span>
            <span className="text-[9px] font-mono font-bold text-[#555e75]">
              {item.code || "USER-ITEM"}
            </span>
          </div>

          {/* 시스템 에러 알림창 */}
          {(errors.label || errors.url || errors.desc) && (
            <div className="bg-[#e60012] text-white px-2 py-1 text-[10px] font-bold bevel-chip flex flex-col gap-0.5 text-left">
              <span className="font-black">⚠ 입력 검증 오류:</span>
              {errors.label && <span>• {errors.label.message}</span>}
              {errors.url && <span>• {errors.url.message}</span>}
              {errors.desc && <span>• {errors.desc.message}</span>}
            </div>
          )}

          {/* 제목 입력 */}
          <div className="flex flex-col gap-0.5 text-left">
            <label className="text-[9px] font-black uppercase text-[#21242e] flex justify-between">
              <span>제목 (LABEL) *</span>
              <span className="text-[#3d4f97]">최대 30자</span>
            </label>
            <Input
              placeholder="링크 제목 입력"
              maxLength={30}
              {...register("label")}
              className={errors.label ? "border-2 border-[#e60012] bg-[#ffeaea] text-xs h-7" : "text-xs h-7"}
            />
          </div>

          {/* URL 입력 */}
          <div className="flex flex-col gap-0.5 text-left">
            <label className="text-[9px] font-black uppercase text-[#21242e]">
              URL (주소) *
            </label>
            <Input
              placeholder="https://example.com"
              {...register("url")}
              className={errors.url ? "border-2 border-[#e60012] bg-[#ffeaea] text-xs h-7" : "text-xs h-7"}
            />
          </div>

          {/* 설명 입력 */}
          <div className="flex flex-col gap-0.5 text-left">
            <label className="text-[9px] font-black uppercase text-[#21242e] flex justify-between">
              <span>한 줄 설명 (DESCRIPTION)</span>
              <span className="text-[#3d4f97]">최대 50자</span>
            </label>
            <Input
              placeholder="링크에 대한 간단한 설명"
              maxLength={50}
              {...register("desc")}
              className={errors.desc ? "border-2 border-[#e60012] bg-[#ffeaea] text-xs h-7" : "text-xs h-7"}
            />
          </div>

          {/* 태그 선택기 */}
          <div className="flex flex-col gap-1 text-left">
            <label className="text-[9px] font-black uppercase text-[#21242e]">
              태그 (TAG)
            </label>
            <Controller
              control={control}
              name="tag"
              render={({ field }) => (
                <div className="flex flex-wrap gap-1">
                  {TAG_PRESETS.map((preset) => {
                    const isSelected = field.value === preset.tag
                    return (
                      <button
                        key={preset.tag}
                        type="button"
                        onClick={() => field.onChange(preset.tag)}
                        className={`cursor-pointer transition-transform ${
                          isSelected
                            ? "scale-105 ring-2 ring-[#21242e]"
                            : "opacity-75 hover:opacity-100"
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

          {/* 하단 인라인 버튼 액션 */}
          <div className="flex items-center justify-end gap-1.5 pt-1 border-t border-[#3d4f97]/20">
            <Button
              type="button"
              variant="subtle"
              size="xs"
              onClick={handleCancelEdit}
              disabled={isSubmitting}
              className="cursor-pointer text-[10px]"
            >
              <X className="w-3 h-3" />
              <span>취소</span>
            </Button>
            <Button
              type="submit"
              variant="amber"
              size="xs"
              disabled={isSubmitting}
              className="cursor-pointer text-[10px] font-black"
            >
              <Check className="w-3 h-3" />
              <span>{isSubmitting ? "저장 중..." : "저장 💾"}</span>
            </Button>
          </div>
        </form>
      </Card>
    )
  }

  // 2. 기본 카드 뷰 (수정 / 삭제 버튼 항상 표시)
  return (
    <Card
      className={cn(
        "group bg-[#dedede] hover:bg-white p-2.5 flex items-center justify-between gap-2.5 transition-colors",
        className
      )}
    >
      {/* 링크 본문 영역 (클릭 시 해당 URL로 새 탭 열기) */}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer select-none text-left"
      >
        <Badge
          size="xs"
          variant="custom"
          className={cn("shrink-0", item.tagColor || "bg-[#21242e] text-[#ecab37]")}
        >
          {item.tag}
        </Badge>

        <div className="min-w-0 flex-1">
          <div className="text-[12px] font-black text-[#21242e] group-hover:text-[#3d4f97] truncate flex items-center gap-1">
            <span>{item.label}</span>
          </div>
          <div className="text-[10px] font-bold text-[#555e75] truncate">
            {item.desc || item.url}
          </div>
          {/* updatedAt 표시 */}
          {formatTimestamp(item.updatedAt) && (
            <div className="text-[9px] font-mono font-bold text-[#3d4f97] mt-0.5 truncate">
              수정됨 {formatTimestamp(item.updatedAt)}
            </div>
          )}
        </div>
      </a>

      {/* 액션 버튼 툴바: 항상 표시 (Always visible) */}
      <div className="flex items-center gap-1 shrink-0">
        <Button
          type="button"
          variant="subtle"
          size="xs"
          onClick={handleStartEdit}
          className="text-[9px] px-1.5 py-0.5 cursor-pointer font-bold border border-[#21242e]/30 hover:bg-[#ecab37] hover:text-[#21242e]"
          title="카트리지 수정"
        >
          <Pencil className="w-2.5 h-2.5" />
          <span>수정</span>
        </Button>

        <Button
          type="button"
          variant="danger"
          size="xs"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDelete?.(item)
          }}
          className="text-[9px] px-1.5 py-0.5 cursor-pointer font-bold"
          title="카트리지 삭제"
        >
          <Trash2 className="w-2.5 h-2.5" />
          <span>삭제</span>
        </Button>

        {/* 링크 이동 화살표 아이콘 */}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-5 h-5 rounded-full bg-[#f68d1f] hover:bg-[#ff9e3b] text-white flex items-center justify-center font-black text-[10px] bevel-signal shrink-0 shadow-xs ml-0.5"
          title="새 창으로 이동"
        >
          ➔
        </a>
      </div>
    </Card>
  )
}
