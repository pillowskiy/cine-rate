import Link from 'next/link';
import type { ICredit } from '#types/person-types';
import { buildImagePath } from '#libs/tmdb';
import {
  BaseArticle,
  BaseArticleContent,
  BaseArticleFigure,
  BaseArticleFigureProps,
  type BaseArticleProps,
} from './base-article';

interface CreditArticleProps extends BaseArticleProps {
  credit: ICredit;
  aspect?: BaseArticleFigureProps['aspect'];
  figureClassName?: string;
  width?: number;
  height?: number;
}

export function CreditArticle({
  credit,
  aspect,
  figureClassName,
  width,
  height,
  ...props
}: CreditArticleProps) {
  return (
    <BaseArticle {...props}>
      <Link href={`/celebrities/${credit.id}`}>
        <BaseArticleFigure
          className={figureClassName}
          aspect={aspect || 'vertical'}
          src={buildImagePath({ path: credit.profile_path, scale: 'poster' })}
          alt='Person Avatar'
          width={width || 480}
          height={height || 854}
        />
      </Link>
      <BaseArticleContent className='overflow-hidden'>
        <h5 className='truncate font-semibold tracking-tight'>
          {credit.original_name}
        </h5>
        <p className='truncate text-xs'>{credit.character}</p>
      </BaseArticleContent>
    </BaseArticle>
  );
}
