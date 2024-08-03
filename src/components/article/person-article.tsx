import Link from 'next/link';
import type { ICelebrity } from '#types/person-types';
import { cn } from '#libs/index';
import { buildImagePath } from '#libs/tmdb';
import {
  BaseArticle,
  BaseArticleContent,
  BaseArticleFigure,
  BaseArticleFigureProps,
  type BaseArticleProps,
} from './base-article';

const aspectRatioImageProps = {
  vertical: {
    width: 260,
    height: 390,
    //            TEMP: magic numbers
    sizes: '(max-width: 640px) 160px, 260px',
  },
  horizontal: {
    width: 80,
    height: 80,
  },
} as const;

interface PersonArticleProps extends BaseArticleProps {
  person: ICelebrity;
  aspect?: BaseArticleFigureProps['aspect'];
  title?: string;
  details?: React.ReactNode;
  autoScale?: boolean;
}

export function PersonArticle({
  person,
  aspect = 'vertical',
  title = person.name,
  details,
  className,
  autoScale = true,
  ...props
}: PersonArticleProps) {
  const articleFigureSize = aspectRatioImageProps[aspect];

  return (
    <BaseArticle
      className={cn(
        autoScale &&
          (aspect === 'vertical' ? 'w-[160px] sm:w-[260px]' : 'flex gap-4'),
        className
      )}
      {...props}
    >
      <Link href={`/celebrities/${person.id}`}>
        <BaseArticleFigure
          className={cn(aspect === 'horizontal' && 'h-auto w-[80px]')}
          src={buildImagePath({ path: person.profile_path, scale: 'poster' })}
          alt={`${person.name} Avatar`}
          width={articleFigureSize.width}
          height={articleFigureSize.height}
          quality={90}
        />
      </Link>
      <BaseArticleContent className='overflow-hidden'>
        <h5 className='truncate font-semibold tracking-tight'>{title}</h5>
        {details ? (
          details
        ) : (
          <div className='flex justify-between gap-x-2 text-xs sm:text-sm'>
            <p className='truncate'>{person.known_for_department}</p>
            <span>{person.popularity.toFixed(1)}</span>
          </div>
        )}
      </BaseArticleContent>
    </BaseArticle>
  );
}
