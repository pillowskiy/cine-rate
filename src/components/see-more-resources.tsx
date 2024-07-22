import Link from 'next/link';
import { cn } from '#libs/index';

const colorSchemasVariants = {
  blue: {
    primary: '#3b82f6',
    secondary: '#60a5fa',
  },
  green: {
    primary: '#22c55e',
    secondary: '#4ade80',
  },
  red: {
    primary: '#ef4444',
    secondary: '#f87171',
  },
};

interface SeeMoreResourcesProps {
  href: string;
  icon: React.ReactNode;
  colorSchema: keyof typeof colorSchemasVariants;
  aspect?: 'vertical' | 'horizontal';
}

export function SeeMoreResources({
  href,
  icon,
  colorSchema,
  aspect = 'vertical',
}: SeeMoreResourcesProps) {
  const color = colorSchemasVariants[colorSchema];

  return (
    <div
      className={cn(
        'relative grid h-fit w-[260px] place-items-center rounded-md border',
        aspect === 'vertical' ? 'aspect-[2/3]' : 'aspect-[16/9]'
      )}
    >
      <Link
        href={href}
        className='z-10 cursor-pointer select-none space-y-1 text-center'
      >
        <h2
          style={{
            // @ts-ignore
            '--tw-shadow-color': color.primary,
          }}
          className='text-4xl drop-shadow-md'
        >
          {icon}
        </h2>
        <p className='underline-offset-4 transition-all hover:underline'>
          See more!
        </p>
      </Link>

      <div
        style={{ backgroundColor: color.secondary }}
        className='absolute -z-10 size-10 animate-pulse rounded-full blur-xl'
      />
      <div
        style={{ backgroundColor: color.primary }}
        className='absolute -z-10 size-5 animate-pulse rounded-full blur-xl'
      />
    </div>
  );
}
