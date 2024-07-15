import AuthProvider from './auth-provider';
import LazyMotionProvider from './lazy-motion-provider';
import ScrollTopProvider from './scroll-top-provider';
import ThemeProvider from './theme-provider';

export default function ServeSiteProviders({
  children,
}: React.PropsWithChildren) {
  return (
    <LazyMotionProvider>
      <ScrollTopProvider>
        <AuthProvider>
          <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </ScrollTopProvider>
    </LazyMotionProvider>
  );
}
