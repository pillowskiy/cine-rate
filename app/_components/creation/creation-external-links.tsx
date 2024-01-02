import type { ReactNode } from 'react';
import type { CreationExternalIds } from '@app/types/creation-types';
import { type CreationExternalUrls, buildExternalUrls } from '@libs/tmdb';
import { Facebook, Instagram, Link as LinkIcon, Twitter } from 'lucide-react';
import Link from 'next/link';
import { MSeparator } from '@ui/separator';
import { Heading } from '@components/heading';

interface CreationExternalLinksProps {
  externalIds: CreationExternalIds;
}

const icons = {
  imdb_id: <LinkIcon />,
  facebook_id: <Facebook />,
  instagram_id: <Instagram />,
  twitter_id: <Twitter />,
} as const satisfies Record<keyof CreationExternalUrls, ReactNode>;

export default function CreationExternalLinks({
  externalIds,
}: CreationExternalLinksProps) {
  const urls = Object.entries(buildExternalUrls(externalIds));

  if (!urls.length) return null;

  return (
    <section>
      <Heading
        title='Social Links'
        description='Social links of the creation.'
      />
      <MSeparator className='my-4' />

      <div className='flex w-full space-x-4 overflow-x-auto'>
        {urls.map(([icon, url]) => (
          <Link
            className='aspect-square w-[36px] opacity-70 transition-opacity hover:opacity-100'
            aria-label={icon.split('_')[0]}
            href={url}
            target='_blank'
            key={url}
          >
            {icons[icon as keyof typeof icons]}
          </Link>
        ))}
      </div>
    </section>
  );
}
