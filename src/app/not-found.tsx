import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-3 sm:p-6 text-[#21242e]">
      <Card className="w-full max-w-[480px] bg-[#7a8aba] shadow-[0_16px_36px_rgba(20,25,45,0.4)] relative flex flex-col rounded-none">
        {/* 상단 커맨드 바 */}
        <div className="carbon-halftone px-3.5 py-2 flex items-center justify-between border-b-2 border-[#3d4f97]">
          <div className="bg-white border border-[#21242e] rounded-full px-2.5 py-0.5 flex items-center justify-center shadow-inner">
            <span className="text-[#e60012] font-black text-[13px] tracking-tighter">
              Nintendo
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-black tracking-[0.5px] uppercase text-[#e60012]">
            <span className="w-2 h-2 rounded-full bg-[#e60012] animate-ping" />
            <span>ERROR: CARTRIDGE MISSING</span>
          </div>

          <Link href="/">
            <Button variant="subtle" size="badge" className="cursor-pointer">
              HOME ➔
            </Button>
          </Link>
        </div>

        {/* 404 본문 영역 */}
        <div className="p-6 bg-[#7a8aba] flex flex-col items-center text-center">
          <Card className="w-full bg-[#dedede] p-6 flex flex-col items-center bevel-plate rounded-none border-2 border-[#21242e]">
            {/* 404 콘솔 경고 램프 */}
            <div className="w-16 h-16 bg-[#21242e] border-2 border-[#e60012] flex items-center justify-center mb-3 shadow-md">
              <span className="text-3xl font-black text-[#e60012] animate-pulse">
                404
              </span>
            </div>

            <Badge
              variant="default"
              size="default"
              className="bg-[#e60012] text-white font-black tracking-wider mb-2 rounded-none uppercase"
            >
              USER NOT FOUND
            </Badge>

            <h1 className="text-xl sm:text-2xl font-black text-[#21242e] tracking-tight mb-2">
              유저를 찾을 수 없습니다
            </h1>

            <p className="text-[11px] sm:text-[12px] font-bold text-[#555e75] leading-relaxed max-w-sm mb-4 break-keep">
              요청하신 Display Name의 사용자 정보가 존재하지 않거나, 아직 프로필이 생성되지 않은 계정입니다.
            </p>

            <div className="w-full bg-[#c8d4ec] p-2.5 text-left text-[10px] font-mono text-[#3d4f97] mb-4 border border-[#3d4f97]/40">
              <div className="font-bold text-[#21242e] uppercase text-[9px] mb-1">
                SYSTEM DIAGNOSTIC:
              </div>
              <div>• STATUS: 404 NOT_FOUND</div>
              <div>• REASON: DISPLAY_NAME_NOT_REGISTERED</div>
              <div>• PATH: /users?displayName=[TARGET]</div>
            </div>

            <Link href="/" className="w-full">
              <Button
                variant="amber"
                size="default"
                className="w-full py-2 font-black cursor-pointer shadow-md text-xs tracking-wider"
              >
                🏠 메인 콘솔로 돌아가기
              </Button>
            </Link>
          </Card>
        </div>

        {/* 푸터 */}
        <footer className="carbon-halftone px-3.5 py-2.5 flex items-center justify-between gap-2 border-t-2 border-[#3d4f97] text-[9px] text-[#9fbee7]">
          <div className="font-bold text-white">
            © 1997–2001 Nintendo / My Link Console
          </div>
          <Badge
            variant="amber"
            size="micro"
            className="border border-[#21242e] text-[#21242e] font-black text-[9px] uppercase shrink-0"
          >
            SYSTEM ERROR
          </Badge>
        </footer>
      </Card>
    </main>
  );
}
