import { HeroSplit } from '@/components/navigation/HeroVariants';
import { HeroSection } from '../components/navigation/HeroSection';

import profileData from '../data/profile.json';
import socialLinksData from '../data/social-links.json';

export default function HomePage() {
  return (
    <div>
      {/* <HeroSection profileData={profileData} socialLinks={socialLinksData.socialLinks} /> */}
      <HeroSplit profileData={profileData} socialLinks={socialLinksData.socialLinks} />
    </div>
  );
}
