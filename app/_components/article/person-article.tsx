import { buildImagePath } from '@libs/tmdb';
import type { ICelebrity } from '@app/types/person-types';
import {
  BaseArticleProps,
  BaseArticle,
  BaseArticleContent,
  BaseArticleFigure,
} from './base-article';
import Link from 'next/link';

interface PersonArticleProps extends Omit<BaseArticleProps, 'src' | 'href'> {
  celebrity: ICelebrity;
}

export function PersonArticle({
  celebrity,
  ...props
}: PersonArticleProps) {
  return (
    <BaseArticle {...props}>
      <Link href={`/celebrities/${celebrity.id}`}>
        <BaseArticleFigure
          aspect='vertical'
          src={buildImagePath({path: celebrity.profile_path, scale: 'poster' })}
          alt='Person Avatar'
          width={260}
          height={390}
        />
      </Link>
      <BaseArticleContent>
        <h2 className='text-md truncate font-semibold tracking-tight' title={celebrity.name}>
          {celebrity.name}
        </h2>
        <div className='flex items-center justify-between text-xs'>
          <span>{celebrity.known_for_department}</span>
          <span>{celebrity.popularity.toFixed(1)}</span>
        </div>
      </BaseArticleContent>
    </BaseArticle>
  );
}
