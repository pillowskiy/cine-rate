import { MSeparator } from '#ui/separator';
import { Heading } from '#components/heading';

export interface TitledSectionProps extends React.ComponentProps<'section'> {
  title: string;
  subTitle: string;
  children: React.ReactNode;
}

export function TitledSection({
  title,
  subTitle,
  children,
  ...props
}: TitledSectionProps) {
  return (
    <section {...props}>
      <Heading title={title} description={subTitle} />
      <MSeparator className='my-4' />

      {children}
    </section>
  );
}
