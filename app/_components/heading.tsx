import { Badge } from '@ui/badge';

interface HeadingProps {
  title: string;
  description: string;
  badges?: string[];
}

export function Heading({ title, description, badges }: HeadingProps) {
  return (
    <div className='space-y-1'>
      <div className='flex gap-2 items-start'>
        <h2 className='text-2xl font-semibold tracking-tight'>{title}</h2>
        <div className='flex flex-wrap select-none'>
          {!!badges &&
            badges.map((badge, index) => (
              <Badge variant='secondary' key={index}>
                {badge}
              </Badge>
            ))}
        </div>
      </div>
      <p className='text-sm text-muted-foreground'>{description}</p>
    </div>
  );
}
