import Image from 'next/image';

/**
 * ProfileImage Component
 *
 * Displays the professional profile photo with optimized loading
 * Uses Next.js Image component for performance (< 2 seconds loading)
 *
 * Props:
 * - src: Image source path
 * - alt: Alternative text for accessibility
 * - size: Size variant ('sm', 'md', 'lg', 'xl')
 */
export default function ProfileImage({ src, alt, size = 'lg' }) {
  // Define size variants with Tailwind classes
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40',
  };

  // Define responsive sizes for Next.js Image optimization
  const imageSizes = {
    sm: 64,
    md: 96,
    lg: 128,
    xl: 160,
  };

  return (
    <div className={`relative ${sizeClasses[size]} mx-auto`}>
      {/* Outer ring with ocean blue gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-ocean-500 to-ocean-400 p-1">
        <div className="w-full h-full bg-white rounded-full p-1">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src={src}
              alt={alt}
              width={imageSizes[size]}
              height={imageSizes[size]}
              className="w-full h-full object-cover"
              priority={true}
              quality={85}
              // Optimize for different screen sizes
              sizes={`(max-width: 768px) ${imageSizes[size]}px, ${imageSizes[size]}px`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
