import Link from 'next/link';
import type { ICelebrity } from '#types/person-types';
import { buildImagePath } from '#libs/tmdb';
import {
  BaseArticle,
  BaseArticleContent,
  BaseArticleFigure,
  BaseArticleProps,
} from './base-article';

interface PersonArticleProps extends Omit<BaseArticleProps, 'src' | 'href'> {
  celebrity: ICelebrity;
}

export function PersonArticle({ celebrity, ...props }: PersonArticleProps) {
  return (
    <BaseArticle {...props}>
      <Link href={`/celebrities/${celebrity.id}`}>
        <BaseArticleFigure
          aspect='vertical'
          src={buildImagePath({
            path: celebrity.profile_path,
            scale: 'poster',
          })}
          alt='Person Avatar'
          width={260}
          height={390}
        />
      </Link>
      <BaseArticleContent className='grid grid-cols-2 text-xs'>
        <h2
          className='col-span-2 truncate text-base font-semibold tracking-tight'
          title={celebrity.name}
        >
          {celebrity.name}
        </h2>
        <span className='text-xs'>{celebrity.known_for_department}</span>
        <span className='ml-auto text-xs'>
          {celebrity.popularity.toFixed(1)}
        </span>
      </BaseArticleContent>
    </BaseArticle>
  );
}
