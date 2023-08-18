import { buildImagePath } from '@libs/tmdb';
import { ICreation } from '@app/types/creation-types';
import { BookmarkPlus, Star } from 'lucide-react';
import {
  BaseArticleProps,
  BaseArticle,
  BaseArticleContent,
  BaseArticleFigure,
  BaseArticleFigureProps,
} from './base-article';
import Link from 'next/link';

interface CreationArticleProps extends Omit<BaseArticleProps, 'src' | 'href'> {
  size?: 'default' | 'sm';
  width: number;
  height: number;
  creation: ICreation;
  aspect?: BaseArticleFigureProps['aspect'];
}

export function CreationArticle({
  creation,
  size = 'default',
  width,
  height,
  aspect = 'vertical',
  ...props
}: CreationArticleProps) {
  const { title, original_title, original_name } = creation;
  const creationTitle = title || original_title || original_name;

  return (
    <BaseArticle {...props}>
      <Link href={`/${creation.media_type}/${creation.id}`}>
        <BaseArticleFigure
          src={buildImagePath(
            size === 'default' ? creation.poster_path : creation.backdrop_path
          )}
          aspect={aspect}
          width={width}
          height={height}
          alt='Creation Image'
          actionButtons={[
            { Image: <BookmarkPlus className='h-4 w-4' /> },
            { Image: <Star className='h-4 w-4' /> },
          ]}
        />
      </Link>
      <BaseArticleContent>
        <h2
          className='text-md truncate font-semibold tracking-tight'
          title={creationTitle}
        >
          {creationTitle}
        </h2>
        <div className='flex items-center justify-between text-xs'>
          <div className='flex items-center space-x-1.5'>
            <Star className='h-4 w-4 fill-yellow-300 text-yellow-400' />
            <span>{creation.vote_average.toFixed(1)}</span>
          </div>
          <span>({creation.vote_count} reviews)</span>
        </div>
      </BaseArticleContent>
    </BaseArticle>
  );
}
