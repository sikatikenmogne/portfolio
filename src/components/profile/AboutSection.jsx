import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TechnologyBadge } from '@/components/projects/TechnologyBadge';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import technologiesData from '@/data/technologies.json';

export function AboutSection({
  profileData,
  variant = 'full', // 'full' pour la page À propos, 'preview' pour la page d'accueil
  className = '',
}) {
  const { about, professional } = profileData;
  const isPreview = variant === 'preview';

  const SkillsGrid = ({ skills, columns = 2 }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {skills.map((skill, index) => {
        const techInfo = technologiesData.technologies.find((t) => t.name === skill.name);
        return (
          <HoverCard key={index}>
            <HoverCardTrigger asChild>
              <div className="cursor-help w-full">
                <TechnologyBadge
                  technology={skill.name}
                  className="w-full inline-flex justify-center py-3 text-sm hover:shadow-md transition-shadow"
                />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-64" align="start">
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold">{skill.name}</h4>
                    <p className="text-xs text-muted-foreground">{techInfo?.description || ''}</p>
                  </div>
                  {skill.level && (
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded shrink-0">
                      {skill.level}
                    </span>
                  )}
                </div>
                {techInfo?.category && (
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary/50"></span>
                    {techInfo.category}
                  </div>
                )}
              </div>
            </HoverCardContent>
          </HoverCard>
        );
      })}
    </div>
  );

  if (isPreview) {
    return (
      <section className={`lg:py-24 max-sm:py-16 ${className}`}>
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
                  href={profileData.navLinks.find((link) => link.target === 'about').href}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/90 font-medium group"
                >
                  {profileData.about.cta || 'En savoir plus'}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Compétences */}
            <div className="bg-primary/10 rounded-lg border p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-foreground mb-6">{about.skills.title}</h3>
              <div className="space-y-8">
                {Object.entries(about.skills.sections)
                  .slice(0, 2)
                  .map(([key, section]) => (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          {section.title}
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          {section.skills.length} technologies
                        </span>
                      </div>
                      <SkillsGrid skills={section.skills.slice(0, 6)} columns={2} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Version complète pour la page À propos
  return (
    <>
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
          {about.title}
        </h1>
        <p className="text-xl text-muted-foreground">{about.subtitle}</p>
      </div>
      {/* Section Profil */}
      <section className="mb-16">
        <div className="prose prose-lg dark:prose-invert max-w-3xl mx-auto">
          {about.profile.introduction.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>
      {/* Section Spécialités */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
          {about.specialties.title}
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {about.specialties.items.map((specialty, index) => (
            <div
              key={index}
              className="relative p-6 bg-primary/10 rounded-lg border hover:border-primary transition-colors"
            >
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-card-foreground">{specialty.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{specialty.description}</p>
                {specialty.technologies && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
                    {specialty.technologies.map((tech, techIndex) => (
                      <HoverCard key={techIndex}>
                        <HoverCardTrigger asChild>
                          <div className="cursor-help w-full">
                            <TechnologyBadge
                              technology={tech}
                              className="text-xs w-full inline-flex justify-center py-2"
                            />
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-64">
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">{tech}</h4>
                            <p className="text-xs text-muted-foreground">
                              {
                                technologiesData.technologies.find((t) => t.name === tech)
                                  ?.description
                              }
                            </p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>{' '}
      {/* Section Compétences */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
          {about.skills.title}
        </h2>
        <div className="space-y-12 max-w-4xl mx-auto">
          {Object.entries(about.skills.sections).map(([key, section]) => (
            <div key={key} className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">{section.title}</h3>
              <SkillsGrid skills={section.skills} columns={4} />
            </div>
          ))}
        </div>
      </section>
      {/* Section Bonnes Pratiques */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
          {about.bestPractices.title}
        </h2>
        <div className="prose prose-lg dark:prose-invert max-w-3xl mx-auto">
          <ul>
            {about.bestPractices.items.map((practice, index) => (
              <li key={index}>
                <strong>{practice.title}</strong> - {practice.description}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
