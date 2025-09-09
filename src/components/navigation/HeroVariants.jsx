import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, Calendar, ExternalLink, Star, ArrowRight, BriefcaseBusiness } from 'lucide-react';

import { DownloadButton } from '../shared/DownloadButton';
import { SocialLinkItem } from '@/components/navigation/SocialLinks';
// import { getInitials } from '@/components/navigation/HeroSection';
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
            <Avatar className="w-full max-w-xs mx-auto rounded-full border-2 flex items-center justify-center">
              <AvatarImage
                src={personal.profileImage}
                alt={personal.fullName}
                className="w-full h-full object-cover rounded-full"
              />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold w-full h-full flex items-center justify-center rounded-full aspect-square">
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
  const { personal, professional, documents, CTA } = profileData;

  const professionalLinks = socialLinks?.filter((link) => link.isProfessional) || [];

  // Fonction utilitaire pour générer les initiales
  const getInitials = (fullName) => {
    return fullName
      .split(' ')
      .map((name) => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section className="lg:py-32">
      {/* 
        Conteneur principal centré avec padding responsive
        - container : largeur responsive prédéfinie
        - mx-auto : centrage horizontal automatique  
        - px-4 sm:px-6 lg:px-8 : padding qui s'adapte à la taille d'écran
      */}
      <div className="container mx-auto px-4 max-sm:pt-4 sm:px-6 lg:px-8">
        {/* 
          Grille responsive avec 2 colonnes sur grand écran
          - grid : active le système de grille CSS
          - gap-12 : espacement entre les éléments de la grille
          - lg:grid-cols-[2fr_1fr] : sur grand écran, première colonne 2x plus large
          - items-center : centrage vertical des colonnes
          - max-w-6xl mx-auto : largeur maximale avec centrage
        */}
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr] lg:gap-8 items-center max-w-6xl mx-auto">
          {/* Colonne gauche - Informations principales */}
          <div className="space-y-4">
            {/* <p className="text-lg leading-8 text-muted-foreground">{personal.hello}</p> */}

            <h1 className="text-2xl font-bold tracking-tight lg:text-3xl text-primary">
              {personal.fullName}
            </h1>

            <h2 className="mt-4 font-semibold tracking-tight text-4xl sm:text-5xl lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full">
              {personal.title}
            </h2>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">{personal.tagline}</p>

            {/* Boutons d'action */}
            <div className="my-8 flex flex-col sm:flex-row gap-4">
              <DownloadButton
                githubUser={profileData.personal.githubUsername}
                githubRepo={profileData.documents.cvGithubRepo}
                githubFilename={profileData.documents.cvGithubReleaseName}
                fallbackPath={profileData.documents.cvPathFallback}
                fallbackFilename={profileData.documents.cvFilename}
                showStatus={true}
                showReleaseInfo={true}
                className={'rounded-2xl'}
              >
                {CTA[0].label}
              </DownloadButton>

              <Button
                className="text-primary bg-primary/10 rounded-2xl"
                variant="outline"
                size="lg"
                asChild
              >
                <a href="#contact">{CTA[1].label}</a>
              </Button>
            </div>

            {/* <h2 className="block font-semibold mt-8">Suivez moi sur</h2> */}
            <div className="mt-4 flex w-fit flex-col gap-6 sm:flex-row items-center justify-center">
              {/* Social Links - Centrage amélioré */}
              <div className="flex flex-wrap gap-3 items-center justify-center">
                {professionalLinks.slice(0, 5).map((link) => (
                  <SocialLinkItem link={link} key={link.id} />
                ))}
              </div>
            </div>
          </div>

          {/* 
            Colonne droite - Avatar 
            SOLUTION AU PROBLÈME AVATAR :
            1. On crée un conteneur avec aspect-square pour forcer un carré
            2. On override les classes par défaut de Avatar avec className
            3. On utilise w-full h-full pour remplir le conteneur
          */}
          <div className="order-first max-md:hidden lg:order-last flex justify-center lg:justify-end">
            {/* 
              Conteneur de l'avatar avec ratio 1:1 (carré parfait)
              - aspect-square : force un ratio hauteur/largeur de 1:1
              - w-full : prend toute la largeur disponible
              - max-w-xs : limite la taille maximale sur petit écran
              - lg:max-w-sm : taille plus grande sur grand écran
            */}
            <div className="aspect-square w-full max-w-[200px] md:max-w-[275px] lg:max-w-[525px] lg:mb-0">
              <Avatar className="w-full h-full border-4 border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <AvatarImage
                  src={profileData.personal.profileImage}
                  alt={profileData.personal.fullName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-3xl lg:text-4xl">
                  {getInitials(profileData.personal.fullName)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Export default as minimal hero
export { HeroMinimal as default };
