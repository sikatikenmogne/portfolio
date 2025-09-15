import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function AboutHomeSection({ profileData, className = '' }) {
  const { about, professional } = profileData;

  return (
    <section className={`py-16 bg-muted/30 ${className}`}>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenu texte */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">{about.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {about.profile.introduction[0]}
            </p>

            {/* Spécialités */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {about.specialties.title}
              </h3>
              <ul className="grid gap-3">
                {professional.specializations.map((specialty, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{specialty}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/90 font-medium group"
              >
                En savoir plus
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Compétences */}
          <div className="bg-card rounded-lg border p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-foreground mb-6">{about.skills.title}</h3>
            <div className="space-y-8">
              {Object.entries(about.skills.sections)
                .slice(0, 2)
                .map(([key, section]) => (
                  <div key={key}>
                    <h4 className="text-sm font-medium text-muted-foreground mb-4">
                      {section.title}
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {section.skills.slice(0, 6).map((skill, index) => (
                        <div
                          key={index}
                          className="p-2 bg-muted rounded text-sm flex items-center gap-2"
                        >
                          <span className="font-medium">{skill.name}</span>
                          {skill.level && (
                            <span className="text-xs text-muted-foreground">• {skill.level}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
