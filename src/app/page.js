import { HeroSection } from '../components/navigation/HeroSection';

import profileData from '../data/profile.json';
import socialLinksData from '../data/social-links.json';

export default function HomePage() {
  return <HeroSection profileData={profileData} socialLinks={socialLinksData.socialLinks} />;
}
