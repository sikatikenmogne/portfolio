'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Star, ExternalLink, BriefcaseBusiness, ArrowRight } from 'lucide-react';

// Client Components for interactivity
import { DownloadButton } from '../shared/DownloadButton';
import { SocialLinkItem } from './SocialLinks';

export function HeroSection({ profileData, socialLinks }) {
  const { personal, professional, documents } = profileData;

  // Filter professional social links
  const professionalLinks = socialLinks?.filter((link) => link.isProfessional) || [];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <h1 className="text-4xl font-bold tracking-tight lg:text-6xl text-center">
            {personal.fullName}
          </h1>
          <h2 className="text-2xl font-semibold text-primary text-center">{personal.title}</h2>
          <p className="text-xl leading-8 text-muted-foreground">{personal.tagline}</p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <DownloadButton
            githubUser={profileData.personal.githubUsername}
            githubRepo={profileData.documents.cvGithubRepo}
            githubResource={profileData.documents.cvGithubReleaseName}
            fallbackPath={profileData.documents.cvPathFallback}
            fallbackFilename={profileData.documents.cvFilename}
            showStatus={true}
          >
            Télécharger mon CV
          </DownloadButton>

          <Button variant="outline" size="lg" asChild>
            <a href="#projects">
              En savoir plus
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="mx-auto mt-8 flex w-fit flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <Badge variant="outline" className="gap-2">
            <BriefcaseBusiness className="h-4 w-4 text-muted-foreground gap-2" />
            <span>Junior / Graduate</span>
          </Badge>
          <Badge variant="outline" className="gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{personal.location}</span>
          </Badge>
          <Badge variant="outline" className="gap-2 bg-green-50 text-green-700 border-green-200">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-green-600 font-medium">{professional.availability}</span>
          </Badge>
        </div>

        <h2 className="block font-semibold mt-8">Suivez moi sur</h2>
        <div className="mx-auto mt-4 flex w-fit flex-col items-center justify-center gap-6 sm:flex-row">
          {/* Social Links - Centrage amélioré */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {professionalLinks.slice(0, 3).map((link) => (
              <SocialLinkItem link={link} key={link.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Utility: Get initials from full name
 */
function getInitials(fullName) {
  return fullName
    .split(' ')
    .map((name) => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
