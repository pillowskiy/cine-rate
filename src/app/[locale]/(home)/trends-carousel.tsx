import { getTranslations } from 'next-intl/server';
import { getTrending } from '#actions/getTrending';
import { CreationArticle } from '#components/article/creation-article';
import { Carousel } from '#components/carousel';
import { NotFound } from '#components/not-found';
import { TitledSection } from '#components/section/titled';

export default async function TrendsCarousel() {
  const [creations, error] = await getTrending();
  const t = await getTranslations('HomePage.TrendsCarousel');

  if (error) return null;

  return (
    <TitledSection
      title={t('title')}
      subTitle={t('description')}
      badges={[t('badge')]}
    >
      {creations.results.length ? (
        <Carousel>
          {creations.results.map((creation, i) => (
            <CreationArticle custom={i} key={creation.id} creation={creation} />
          ))}
        </Carousel>
      ) : (
        <NotFound />
      )}
    </TitledSection>
  );
}
