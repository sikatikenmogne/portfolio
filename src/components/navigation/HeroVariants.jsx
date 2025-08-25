import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, Calendar, ExternalLink, Star, ArrowRight, BriefcaseBusiness } from 'lucide-react';

import { DownloadButton } from '../shared/DownloadButton';
import { SocialLinkItem } from '@/components/navigation/SocialLinks';
/**
 * Hero Section Variants - CENTRAGE HORIZONTAL CORRIGÉ
 *
 * Tous les variants avec centrage horizontal parfait
 */

/**
 * Hero Minimal - Version ultra épurée - CENTRAGE CORRIGÉ
 */
export function HeroMinimal({ profileData, socialLinks }) {
  const { personal, professional, documents } = profileData;

  return (
    <section className="py-20 sm:py-32">
      {/* 
        🎯 CORRECTION CENTRAGE :
        container = largeur responsive
        mx-auto = centre horizontalement 
        px-4 sm:px-6 lg:px-8 = padding responsive
        text-center = centre le texte
      */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Contenu principal centré */}
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight lg:text-6xl sm:text-center">
            {personal.fullName}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{personal.title}</p>
          <p className="mt-6 text-xl leading-8 text-muted-foreground">{personal.tagline}</p>

          {/* 
            Boutons d'action - Centrage flex :
            flex items-center justify-center = centrage horizontal et vertical
          */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <DownloadButton cvPath={documents.cvPath} filename={documents.cvFilename} />

            <Button variant="outline" size="lg" asChild>
              <a href="#projects">
                Voir projets
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Hero avec Avatar Subtil - CENTRAGE CORRIGÉ
 */
export function HeroWithSubtleAvatar({ profileData, socialLinks }) {
  const { personal, professional, documents } = profileData;

  const getInitials = (fullName) => {
    return fullName
      .split(' ')
      .map((name) => name.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <section className="py-32">
      {/* 
        🎯 CORRECTION CENTRAGE - Même pattern :
        container mx-auto px-4 sm:px-6 lg:px-8 text-center
      */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Contenu avec largeur optimale centrée */}
        <div className="mx-auto flex max-w-4xl flex-col gap-8">
          {/* Avatar centré automatiquement par parent text-center */}
          <div className="mx-auto">
            <Avatar className="h-16 w-16 border-2">
              <AvatarImage src={personal.profileImage} alt={personal.fullName} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {getInitials(personal.fullName)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Texte principal - Centré par parent text-center */}
          <div>
            <h1 className="text-3xl font-extrabold lg:text-5xl">{personal.fullName}</h1>
            <h2 className="mt-2 text-xl font-semibold text-primary lg:text-2xl">
              {personal.title}
            </h2>
            <p className="mt-4 text-muted-foreground text-balance lg:text-lg">{personal.tagline}</p>
          </div>
        </div>

        {/* Download button centré */}
        <div className="mt-8">
          <DownloadButton cvPath={documents.cvPath} filename={documents.cvFilename} />
        </div>

        {/* 
          🎯 CORRECTION - Info professionnelle :
          mx-auto = centre le conteneur
          w-fit = largeur ajustée au contenu
          flex justify-center = centrage flex horizontal
        */}
        <div className="mx-auto mt-8 flex w-fit flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <BriefcaseBusiness className="h-3 w-3" />
            {professional.yearsExperience} ans
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {personal.location}
          </span>
          <span>•</span>
          <span className="text-green-600 font-medium">{professional.availability}</span>
        </div>
      </div>
    </section>
  );
}

/**
 * Hero Split - Layout deux colonnes - CENTRAGE CORRIGÉ
 */
export function HeroSplit({ profileData, socialLinks }) {
  const { personal, professional, documents } = profileData;

  const professionalLinks = socialLinks?.filter((link) => link.isProfessional) || [];

  return (
    <section className="py-20 lg:py-32">
      {/* 
        🎯 CORRECTION CENTRAGE - Pattern différent pour layout grid :
        container mx-auto = centre le conteneur principal
        px-4 sm:px-6 lg:px-8 = padding responsive
        PAS de text-center car c'est un layout en colonnes
      */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 
          Grid centré :
          grid gap-12 lg:grid-cols-2 = colonnes avec espacement
          items-center = centrage vertical entre colonnes
          max-w-6xl mx-auto = largeur maximale centrée
        */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Left column - Main info */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight lg:text-6xl text-center">
              {personal.fullName}
            </h1>
            <h2 className="mt-4 text-2xl font-semibold text-primary text-center">
              {personal.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground text-center">
              {personal.tagline}
            </p>

            {/* Boutons alignés à gauche pour desktop, centrés sur mobile */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <DownloadButton cvPath={documents.cvPath} filename={documents.cvFilename} />

              <Button variant="outline" size="lg" asChild>
                <a href="#contact">Me contacter</a>
              </Button>
            </div>
          </div>

          {/* Right column - Context & social - Centré dans sa colonne */}
          <div className="space-y-8">
            {/* Professional context */}
            <div>
              <h2 className="font-semibold mb-4 h2">Expérience</h2>
              <div className="space-y-3 flex flex-wrap gap-2 max-sm:items-center max-sm:justify-center">
                <Badge variant="outline" className="gap-2">
                  <BriefcaseBusiness className="h-4 w-4 text-muted-foreground gap-2" />
                  <span>Junior / Graduate</span>
                </Badge>
                <Badge variant="outline" className="gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{personal.location}</span>
                </Badge>
                <Badge
                  variant="outline"
                  className="gap-2 bg-green-50 text-green-700 border-green-200"
                >
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-green-600 font-medium">{professional.availability}</span>
                </Badge>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="font-semibold mb-4">Spécialisations</h3>
              <div className="flex flex-wrap gap-2 max-sm:items-center max-sm:justify-center">
                {professional.specializations?.slice(0, 6).map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div>
              <h3 className="font-semibold mb-4">Liens professionnels</h3>
              <div className="flex flex-wrap gap-3 items-center justify-center">
                {professionalLinks.slice(0, 3).map((link) => (
                  <SocialLinkItem link={link} key={link.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Export default as minimal hero
export { HeroMinimal as default };
