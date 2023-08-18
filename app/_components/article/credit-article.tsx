import { buildImagePath } from '@libs/tmdb';
import type { ICredit } from '@app/types/celebrity-types';
import {
  BaseArticleProps,
  BaseArticle,
  BaseArticleContent,
  BaseArticleFigure,
} from './base-article';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

interface CreditArticleProps extends HTMLAttributes<HTMLDivElement> {
  credit: ICredit;
}

export function CreditArticle({ credit, ...props }: CreditArticleProps) {
  return (
    <BaseArticle {...props}>
      <Link href={`celebrities/${credit.id}`}>
        <BaseArticleFigure
          src={buildImagePath(credit.profile_path)}
          alt='Person Avatar'
          width={480}
          height={854}
        />
      </Link>
      <BaseArticleContent>
        <h2 className='text-md truncate font-semibold tracking-tight'>
          {credit.name}
        </h2>
        <span className='text-xs'>{credit.character}</span>
      </BaseArticleContent>
    </BaseArticle>
  );
}
