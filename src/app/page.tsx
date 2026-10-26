export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 p-8 shadow-sm text-center flex flex-col items-center transition-all hover:shadow-md">
        {/* 프로필 아바타 */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-5 shadow-inner select-none">
          정
        </div>

        {/* 이름 */}
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
          정희원
        </h1>

        {/* 뱃지 */}
        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 mb-4">
          Software Developer &bull; Problem Solver
        </span>

        {/* 소개글 */}
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 break-keep">
          더 나은 사용자 경험을 고민하고 지속적으로 성장하는 개발자입니다. 코드로 일상의 문제를 해결하고 가치 있는 서비스를 만드는 일에 몰입합니다.
        </p>
      </div>
    </main>
  );
}
