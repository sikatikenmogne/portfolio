'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Github, Linkedin, Twitter, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Small } from '../shared/Typography';
import {
  BiLinkExternal,
  BiLogoCodepen,
  BiLogoDribbble,
  BiLogoGithub,
  BiLogoGitlab,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoStackOverflow,
  BiLogoSteam,
  BiLogoUnsplash,
  BiLogoYoutube,
} from 'react-icons/bi';
import { FaFreeCodeCamp, FaProductHunt } from 'react-icons/fa';
import { SiCodewars } from 'react-icons/si';
import { SiRoadmapdotsh } from 'react-icons/si';
import { SiWakatime } from 'react-icons/si';
import { SiGithub } from 'react-icons/si';
import { SiLinkedin } from 'react-icons/si';
import { SlSocialLinkedin } from 'react-icons/sl';
import { RiTwitterXLine } from 'react-icons/ri';
import { RiTwitterXFill } from 'react-icons/ri';
import { SiCredly } from 'react-icons/si';
import { FaHashnode, FaHashtag, FaSquareXTwitter } from 'react-icons/fa6';

/**
 * SocialLinks Component - Shadcn UI Integration
 *
 * Professional social media links using Shadcn components
 * Configuration-driven with icons and accessibility
 */
export function SocialLinks({ socialLinks, className }) {
  console.log(socialLinks);
  // Sort links by priority
  const sortedLinks =
    socialLinks?.filter((link) => link.isProfessional).sort((a, b) => a.priority - b.priority) ||
    [];

  if (sortedLinks.length === 0) return null;

  return (
    <div className={cn('space-y-4', className)}>
      {/* <Small className="text-center">Suivez-moi sur:</Small> */}

      <div className="flex flex-wrap items-center justify-center gap-3">
        {sortedLinks.map((link, index) => (
          <div key={link.id} className="flex items-center gap-2">
            <SocialLinkItem link={link} />
            {index < sortedLinks.length - 1 && <Separator orientation="vertical" className="h-4" />}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Individual Social Link with Icon and Shadcn Button
 */
export function SocialLinkItem({ link }) {
  const IconComponent = getSocialIcon(link.platform, link.icon);

  return (
    <Button
      variant="outline"
      size="sm"
      asChild
      className="group hover:bg-primary/10 transition-colors rounded-sm"
    >
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-sm"
      >
        <IconComponent className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium text-primary transition-colors">
          {link.displayText}
        </span>
        {/* <ExternalLink className="hidden h-3 w-3 opacity-0 group-hover:inline group-hover:opacity-100  transition-opacity" /> */}
      </a>
    </Button>
  );
}

/**
 * Alternative: Badge-style social links
 */
export function SocialBadges({ socialLinks, className }) {
  const sortedLinks =
    socialLinks?.filter((link) => link.isProfessional).sort((a, b) => a.priority - b.priority) ||
    [];

  return (
    <div className={cn('flex flex-wrap items-center justify-center gap-2', className)}>
      {sortedLinks.map((link) => {
        const IconComponent = getSocialIcon(link.platform, link.icon);

        return (
          <Badge
            key={link.id}
            variant="secondary"
            className="group cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            asChild
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <IconComponent className="h-3 w-3" />
              <span>{link.displayText}</span>
            </a>
          </Badge>
        );
      })}
    </div>
  );
}

/**
 * Get appropriate icon for social platform
 */
function getSocialIcon(platform, iconName) {
  // If an icon name is provided in the config, use it
  if (iconName) {
    const iconComponents = {
      SiLinkedin,
      SiGithub,
      RiTwitterXLine,
      SiWakatime,
      SiRoadmapdotsh,
      SiCredly,
      Globe,
    };
    return iconComponents[iconName] || ExternalLink;
  }

  // Fallback to platform-based mapping
  const iconMap = {
    LinkedIn: SiLinkedin,
    GitHub: SiGithub,
    Twitter: RiTwitterXLine,
    Wakatime: SiWakatime,
    Roadmapdotsh: SiRoadmapdotsh,
    Credly: SiCredly,
    Portfolio: Globe,
  };

  return iconMap[platform] || ExternalLink;
}
