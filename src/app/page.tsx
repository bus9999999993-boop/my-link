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
          대학생 &bull; 바이브 코딩
        </span>

        {/* 소개글 */}
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 break-keep">
          안녕하세요! 바이브 코딩을 배우고 있는 대학생입니다.
        </p>
      </div>
    </main>
  );
}
