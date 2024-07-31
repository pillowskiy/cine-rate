import { useTranslations } from 'next-intl';
import type { ICreation } from '#types/creation-types';
import { cn } from '#libs/index';
import { getCreationRibbon } from '#libs/tmdb';

interface CreationRibbonProps extends React.ComponentPropsWithRef<'div'> {
  creation: ICreation;
}

export default function CreationRibbon({
  creation,
  className,
  style,
  ...props
}: CreationRibbonProps) {
  const t = useTranslations('Articles.CreationArticle.CreationRibbon');
  const ribbon = getCreationRibbon(creation);

  if (!ribbon) return null;

  return (
    <div
      className={cn(
        'text-shadow absolute left-8 top-4 z-10 w-full -rotate-45 text-center text-white',
        '-translate-x-1/2',
        className
      )}
      style={Object.assign({ backgroundColor: ribbon.color }, style ?? {})}
      {...props}
    >
      <span className='text-xs leading-none'>{t(ribbon.value)}</span>
    </div>
  );
}
