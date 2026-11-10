"use client";

import * as React from "react";
import { User, Check, X, Search, AlertCircle, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { isDisplayNameTaken, updateUserProfile } from "@/lib/links-service";

interface EditProfileDialogProps {
  currentUid: string;
  initialDisplayName: string;
  initialBio?: string;
  onUpdateSuccess: (newDisplayName: string, newBio: string) => void;
  trigger?: React.ReactNode;
}

type CheckStatus = "idle" | "checking" | "available" | "taken" | "same" | "invalid";

export function EditProfileDialog({
  currentUid,
  initialDisplayName,
  initialBio = "",
  onUpdateSuccess,
  trigger,
}: EditProfileDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [displayNameInput, setDisplayNameInput] = React.useState(initialDisplayName);
  const [bioInput, setBioInput] = React.useState(initialBio);
  const [checkStatus, setCheckStatus] = React.useState<CheckStatus>("idle");
  const [checkMessage, setCheckMessage] = React.useState<string>("");
  const [isSaving, setIsSaving] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // 다이얼로그가 열릴 때 초기값 복원
  React.useEffect(() => {
    if (open) {
      setDisplayNameInput(initialDisplayName);
      setBioInput(initialBio);
      setCheckStatus("idle");
      setCheckMessage("");
      setErrorMsg(null);
    }
  }, [open, initialDisplayName, initialBio]);

  // displayName 입력값 변경 시 중복확인 상태 초기화
  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDisplayNameInput(val);
    setErrorMsg(null);

    const trimmed = val.trim();
    if (trimmed === initialDisplayName.trim()) {
      setCheckStatus("same");
      setCheckMessage("현재 사용 중인 내 닉네임입니다. (사용 가능)");
    } else {
      setCheckStatus("idle");
      setCheckMessage("");
    }
  };

  // 중복 확인 실행
  const handleCheckDuplicate = async () => {
    const trimmed = displayNameInput.trim();

    // 1. 유효성 검증
    if (!trimmed) {
      setCheckStatus("invalid");
      setCheckMessage("표시 이름을 입력해주세요.");
      return;
    }
    if (trimmed.length < 2) {
      setCheckStatus("invalid");
      setCheckMessage("최소 2자 이상 입력해주세요.");
      return;
    }
    if (trimmed.length > 20) {
      setCheckStatus("invalid");
      setCheckMessage("최대 20자까지 가능합니다.");
      return;
    }
    // 특수문자 제한 (한글, 영문, 숫자, 밑줄, 하이픈, 마침표만 허용)
    const validRegex = /^[a-zA-Z0-9가-힣._-]+$/;
    if (!validRegex.test(trimmed)) {
      setCheckStatus("invalid");
      setCheckMessage("한글, 영문, 숫자, 특수기호(._-)만 사용 가능합니다.");
      return;
    }

    // 2. 현재 본인의 이름과 동일한 경우
    if (trimmed === initialDisplayName.trim()) {
      setCheckStatus("same");
      setCheckMessage("현재 사용 중인 내 닉네임입니다. (사용 가능)");
      return;
    }

    // 3. Firestore 쿼리로 타 유저와의 중복 여부 확인
    setCheckStatus("checking");
    setCheckMessage("중복 여부 확인 중...");
    try {
      const taken = await isDisplayNameTaken(trimmed, currentUid);
      if (taken) {
        setCheckStatus("taken");
        setCheckMessage("❌ 이미 다른 사용자가 사용 중인 닉네임입니다.");
      } else {
        setCheckStatus("available");
        setCheckMessage("✔ 사용 가능한 멋진 닉네임입니다!");
      }
    } catch (err) {
      console.error("isDisplayNameTaken error:", err);
      setCheckStatus("idle");
      setCheckMessage("중복 확인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 저장 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = displayNameInput.trim();
    const trimmedBio = bioInput.trim();

    if (!trimmedName) {
      setErrorMsg("표시 이름을 입력해주세요.");
      return;
    }

    // 이름이 변경되었는데 중복확인을 하지 않은 경우
    if (trimmedName !== initialDisplayName.trim() && checkStatus !== "available") {
      setErrorMsg("닉네임 [중복 확인]을 먼저 완료해주세요.");
      return;
    }

    setIsSaving(true);
    setErrorMsg(null);
    try {
      await updateUserProfile(currentUid, {
        displayName: trimmedName,
        bio: trimmedBio,
      });
      onUpdateSuccess(trimmedName, trimmedBio);
      setOpen(false);
    } catch (err: unknown) {
      console.error("updateUserProfile error:", err);
      setErrorMsg("프로필 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          trigger ? (
            (trigger as React.ReactElement)
          ) : (
            <Button
              variant="subtle"
              size="xs"
              className="text-[9px] px-2 py-0.5 cursor-pointer font-black border border-[#21242e]/30 hover:bg-[#ecab37] hover:text-[#21242e] flex items-center gap-1"
            >
              <span>EDIT PROFILE</span>
              <span>✏️</span>
            </Button>
          )
        }
      />

      <DialogPopup>
        <form onSubmit={handleSubmit} noValidate>
          {/* 다이얼로그 헤더 */}
          <DialogHeader className="carbon-halftone border-b-2 border-[#3d4f97]">
            <DialogTitle className="text-white flex items-center gap-1.5 text-xs">
              <User className="w-3.5 h-3.5 text-[#ecab37]" />
              <span>EDIT USER PROFILE (프로필 수정)</span>
            </DialogTitle>
            <DialogClose
              render={
                <button
                  type="button"
                  className="text-white/80 hover:text-white cursor-pointer p-0.5"
                  aria-label="닫기"
                  disabled={isSaving}
                >
                  <X className="w-4 h-4" />
                </button>
              }
            />
          </DialogHeader>

          <DialogBody className="bg-[#7a8aba] flex flex-col gap-3">
            {/* 상단 에러 알림 */}
            {errorMsg && (
              <div className="bg-[#e60012] text-white px-2.5 py-1.5 text-[11px] font-bold bevel-chip flex items-center gap-1.5 text-left">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* 1. Display Name 입력 & 중복 확인 */}
            <div className="flex flex-col gap-1 text-left">
              <label
                htmlFor="profile-display-name"
                className="text-[10px] font-black uppercase text-[#21242e] tracking-wider flex items-center justify-between"
              >
                <span>DISPLAY NAME (표시 이름) *</span>
                <span className="text-[9px] font-bold text-[#3d4f97]">2~20자</span>
              </label>

              <div className="flex items-center gap-1.5">
                <Input
                  id="profile-display-name"
                  value={displayNameInput}
                  onChange={handleDisplayNameChange}
                  placeholder="예: cool_coder"
                  maxLength={20}
                  className="text-xs h-8 flex-1 bg-white"
                />
                <Button
                  type="button"
                  variant="amber"
                  size="xs"
                  onClick={handleCheckDuplicate}
                  disabled={
                    checkStatus === "checking" ||
                    !displayNameInput.trim() ||
                    isSaving
                  }
                  className="h-8 px-2.5 text-[10px] font-black cursor-pointer shrink-0 shadow-xs tracking-wider"
                >
                  {checkStatus === "checking" ? (
                    <span className="w-3 h-3 border-2 border-[#21242e] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Search className="w-3 h-3" />
                  )}
                  <span>중복확인</span>
                </Button>
              </div>

              {/* 중복 확인 피드백 뱃지 & 문구 */}
              {checkMessage && (
                <div
                  className={`text-[10px] font-bold px-2 py-1 bevel-chip flex items-center gap-1 ${
                    checkStatus === "available" || checkStatus === "same"
                      ? "bg-[#21242e] text-[#ecab37]"
                      : checkStatus === "taken" || checkStatus === "invalid"
                      ? "bg-[#ffeaea] text-[#e60012] border border-[#e60012]"
                      : "bg-[#dedede] text-[#3d4f97]"
                  }`}
                >
                  <span>{checkMessage}</span>
                </div>
              )}

              {/* 미확인 힌트 */}
              {checkStatus === "idle" &&
                displayNameInput.trim() !== initialDisplayName.trim() &&
                displayNameInput.trim().length >= 2 && (
                  <span className="text-[9px] font-bold text-[#3d4f97]">
                    ※ 이름 변경 시 우측의 <strong>[중복확인]</strong> 버튼을 먼저 클릭해주세요.
                  </span>
                )}
            </div>

            {/* 2. 한 줄 소개 (Bio) */}
            <div className="flex flex-col gap-1 text-left">
              <label
                htmlFor="profile-bio"
                className="text-[10px] font-black uppercase text-[#21242e] tracking-wider flex items-center justify-between"
              >
                <span>ONE-LINE BIO (한 줄 소개)</span>
                <span className="text-[9px] font-bold text-[#3d4f97]">최대 60자</span>
              </label>
              <Input
                id="profile-bio"
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                placeholder="나만의 간단한 소개글을 입력해보세요"
                maxLength={60}
                className="text-xs h-8 bg-white"
              />
              <span className="text-[9px] font-bold text-[#555e75]">
                프로필 카드 상단에 노출되는 소개글입니다.
              </span>
            </div>

            {/* 실시간 미리보기 */}
            <div className="bg-[#8ba1d4] bevel-plate p-2 text-left mt-1">
              <div className="text-[9px] font-black text-[#21242e] uppercase mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#f68d1f]" />
                <span>PROFILE PREVIEW (실시간 미리보기)</span>
              </div>
              <div className="bg-[#dedede] bevel-plate p-2 flex items-center gap-2">
                <div className="w-8 h-8 bg-[#e60012] border border-[#21242e] text-white font-black text-sm flex items-center justify-center shrink-0">
                  {displayNameInput.trim()[0]?.toUpperCase() || "U"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-[#21242e] truncate">
                    {displayNameInput.trim() || "DISPLAY NAME"}
                  </div>
                  <div className="text-[9px] font-bold text-[#555e75] truncate">
                    {bioInput.trim() || "한 줄 소개글이 여기에 표시됩니다."}
                  </div>
                </div>
              </div>
            </div>
          </DialogBody>

          <DialogFooter className="bg-[#6a7aa8]">
            <Button
              type="button"
              variant="subtle"
              size="xs"
              onClick={() => setOpen(false)}
              disabled={isSaving}
              className="cursor-pointer text-[10px]"
            >
              <X className="w-3 h-3" />
              <span>취소</span>
            </Button>
            <Button
              type="submit"
              variant="amber"
              size="xs"
              disabled={
                isSaving ||
                !displayNameInput.trim() ||
                (displayNameInput.trim() !== initialDisplayName.trim() &&
                  checkStatus !== "available")
              }
              className="cursor-pointer text-[10px] font-black flex items-center gap-1 tracking-wider"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isSaving ? "저장 중..." : "저장 💾"}</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  );
}
