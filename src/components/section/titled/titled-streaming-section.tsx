import { Suspense } from 'react';
import { TitledSection, TitledSectionProps } from './titled-section';

interface TitledStreamingSectionProps extends TitledSectionProps {
  fallback: React.ReactNode;
}

export function TitledStreamingSection({
  fallback,
  children,
  ...props
}: TitledStreamingSectionProps) {
  return (
    <TitledSection {...props}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </TitledSection>
  );
}
