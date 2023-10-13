import type { ComponentProps } from 'react';
import { buildImagePath } from '@libs/tmdb';
import type { ICredit } from '@app/types/person-types';
import {
  BaseArticle,
  BaseArticleContent,
  BaseArticleFigure,
  BaseArticleFigureProps,
  type BaseArticleProps,
} from './base-article';
import Link from 'next/link';

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
        <h2 className='truncate font-semibold tracking-tight'>
          {credit.original_name}
        </h2>
        <p className='text-xs truncate'>{credit.character}</p>
      </BaseArticleContent>
    </BaseArticle>
  );
}
