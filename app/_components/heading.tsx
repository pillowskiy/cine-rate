interface HeadingProps {
    title: string;
    description: string;
}

export function Heading({ title, description }: HeadingProps) {
  return (
    <div className='flex items-center justify-between'>
      <div className='space-y-1'>
        <h2 className='text-2xl font-semibold tracking-tight'>{title}</h2>
        <p className='text-sm text-muted-foreground'>
          {description}
        </p>
      </div>
    </div>
  );
}
