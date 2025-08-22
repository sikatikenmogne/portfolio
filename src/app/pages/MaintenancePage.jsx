export function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-tech-50 to-tech-100 flex items-center justify-center p-5 md:p-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-20 h-20 bg-tech-200/20 rounded-full animate-pulse" />
        <div className="absolute top-[60%] right-[15%] w-32 h-32 bg-tech-300/15 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-[30%] left-[25%] w-16 h-16 bg-tech-400/10 rounded-full animate-pulse delay-2000" />
      </div>

      <article className="relative z-10 block text-left max-w-[650px] w-full mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 md:p-10 shadow-lg border border-tech-200/30 dark:border-tech-600/30">
        <h1 className="text-4xl md:text-5xl font-semibold text-tech-700 dark:text-tech-300 mb-6 tracking-tight leading-tight">
          We’ll be back soon!
        </h1>

        <div className="space-y-5">
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Sorry for the inconvenience but we’re performing some maintenance at the moment. If you
            need to you can always{' '}
            <a
              href="mailto:sikatikenmogne@gmail.com"
              className="text-tech-600 dark:text-tech-400 font-medium hover:text-tech-700 dark:hover:text-tech-300 hover:underline transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-tech-500 focus:ring-offset-2 rounded-sm px-1"
            >
              contact us
            </a>
            , otherwise we’ll be back online shortly!
          </p>

          <p className="text-base text-tech-700 dark:text-tech-400 font-semibold pt-4 border-t border-tech-200/50 dark:border-tech-600/50">
            — Samuel SIKATI
          </p>
        </div>
      </article>
    </div>
  );
}
