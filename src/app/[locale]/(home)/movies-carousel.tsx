import { useTranslations } from 'next-intl';
import { getMovies } from '#actions/getMovies';
import { MediaType, MovieSort } from '#config/enums';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#ui/tabs';
import { CreationArticle } from '#components/article/creation-article';
import { Carousel } from '#components/carousel';
import { TitledSection } from '#components/section/titled';
import { SeeMoreResources } from '#components/see-more-resources';
import { capitalize } from '#libs/index';

const emojis: Record<MovieSort, string> = {
  [MovieSort.NowPlaying]: '🎥',
  [MovieSort.Upcoming]: '🆕',
  [MovieSort.Popular]: '🔥',
  [MovieSort.TopRated]: '⭐',
};

async function CreationCarousel({ sort }: { sort: MovieSort }) {
  const [data, error] = await getMovies(sort);

  if (error) return null;

  return (
    <Carousel>
      {data.results.map((creation, i) => (
        <CreationArticle
          custom={i}
          defaultMediaType={MediaType.Movie}
          aspect='horizontal'
          key={creation.id}
          creation={creation}
        />
      ))}
      <SeeMoreResources
        href='/movie'
        icon={'🎥'}
        colorSchema='blue'
        aspect='horizontal'
      />
    </Carousel>
  );
}

export default function MoviesCarousel() {
  const t = useTranslations('HomePage.MoviesCarousel');

  return (
    <TitledSection title={t('title')} subTitle={t('description')}>
      <Tabs defaultValue={MovieSort.Popular}>
        <TabsList>
          {Object.values(MovieSort).map((value) => (
            <TabsTrigger
              className='flex items-center gap-1'
              key={value}
              value={value}
            >
              {emojis[value]}
              <span className='hidden sm:block'>
                {capitalize(value, { split: '_' })}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.values(MovieSort).map((value) => (
          <TabsContent key={value} value={value}>
            <CreationCarousel sort={value} />
          </TabsContent>
        ))}
      </Tabs>
    </TitledSection>
  );
}
