// app/pages/MaintenancePage.jsx
// Page de maintenance simplifiée avec design system océan

'use client';

import { Card, CardContent } from '@/components/ui/card';

export function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-background to-ocean-100 flex items-center justify-center p-5 md:p-20">
      {/* Éléments décoratifs simplifiés */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-20 h-20 bg-ocean-200/20 rounded-full animate-pulse" />
        <div className="absolute top-[60%] right-[15%] w-32 h-32 bg-ocean-300/15 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-[30%] left-[25%] w-16 h-16 bg-ocean-400/10 rounded-full animate-pulse delay-2000" />
      </div>

      {/* Contenu principal */}
      <Card className="relative z-10 max-w-[650px] w-full bg-card/80 backdrop-blur-sm border-ocean-200/30 dark:border-ocean-600/30">
        <CardContent className="p-8 md:p-10">
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-ocean-700 dark:text-ocean-300 mb-6 tracking-tight leading-tight">
            We'll be back soon!
          </h1>

          <div className="space-y-5">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Sorry for the inconvenience but we're performing some maintenance at the moment. If
              you need to you can always{' '}
              <a
                href="mailto:sikatikenmogne@gmail.com"
                className="text-primary font-medium hover:text-primary/80 hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-1"
              >
                contact us
              </a>
              , otherwise we'll be back online shortly!
            </p>

            <p className="text-base text-ocean-700 dark:text-ocean-400 font-semibold pt-4 border-t border-border">
              — Samuel SIKATI
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
