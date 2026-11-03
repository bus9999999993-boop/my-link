"use client";

import * as React from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import {
  Dialog,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type LinkCartridge } from "@/data/links";

export interface DeleteConfirmDialogProps {
  open: boolean;
  link: LinkCartridge | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void> | void;
}

export function DeleteConfirmDialog({
  open,
  link,
  onOpenChange,
  onConfirm,
}: DeleteConfirmDialogProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch (error) {
      console.error("삭제 실패:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup>
        <DialogHeader className="bg-[#a7282b] border-b-2 border-[#21242e]">
          <DialogTitle className="text-white flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-[#ecab37]" />
            <span>정말 삭제하시겠습니까?</span>
          </DialogTitle>
          <DialogClose
            render={
              <button
                type="button"
                className="text-white/80 hover:text-white cursor-pointer p-0.5"
                aria-label="닫기"
                disabled={isDeleting}
              >
                <X className="w-4 h-4" />
              </button>
            }
          />
        </DialogHeader>

        <DialogBody className="bg-[#8ba1d4]">
          {/* 링크 이름 표시 영역 */}
          <div className="bg-[#dedede] bevel-plate p-3 flex flex-col gap-1.5 text-left">
            <span className="text-[10px] font-black uppercase text-[#555e75] tracking-wider">
              삭제 대상 링크 카트리지
            </span>
            <div className="flex items-center gap-2">
              {link?.tag && (
                <Badge
                  size="xs"
                  variant="custom"
                  className={link.tagColor || "bg-[#21242e] text-white"}
                >
                  {link.tag}
                </Badge>
              )}
              <span className="text-sm font-black text-[#21242e] truncate">
                {link?.label || "(제목 없음)"}
              </span>
            </div>
            {link?.url && (
              <span className="text-[10px] font-mono font-bold text-[#3d4f97] truncate">
                {link.url}
              </span>
            )}
          </div>

          {/* 빨간색 경고 문구 */}
          <div className="bg-[#ffeaea] border-2 border-[#e60012] p-2.5 bevel-chip flex items-center gap-2 text-left">
            <span className="text-[#e60012] font-black text-sm">⚠</span>
            <span className="text-[#e60012] font-black text-xs tracking-tight">
              이 작업은 되돌릴 수 없습니다.
            </span>
          </div>
        </DialogBody>

        <DialogFooter className="bg-[#7a8aba]">
          <Button
            type="button"
            variant="subtle"
            size="xs"
            disabled={isDeleting}
            onClick={() => onOpenChange(false)}
            className="cursor-pointer"
          >
            취소
          </Button>
          <Button
            type="button"
            variant="danger"
            size="xs"
            disabled={isDeleting}
            onClick={handleDelete}
            className="cursor-pointer flex items-center gap-1 font-black"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isDeleting ? "삭제 중..." : "삭제하기"}</span>
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
