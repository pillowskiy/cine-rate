import { MetadataRoute } from 'next';
import { getMovies } from '#actions/getMovies';
import { getPopular } from '#actions/getPopular';
import { getTV } from '#actions/getTV';
import { MediaType, MovieSort, TVSort } from '#config/enums';
import { $api } from '#api/api-interceptor';
import { tmdbSlugify } from '#libs/tmdb/slugify';

type Route = {
  url: string;
  lastModified: string;
};

interface AbstractPaginationResult {
  results: {
    id: number;
  }[];
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export const dynamic = 'force-dynamic';

export default async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap = ['/', '/celebrities', '/tv', '/movie'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const moviesPromise = safePaginationResultRoutes(
    getMovies(MovieSort.Popular),
    MediaType.Movie
  );
  const tvPromise = safePaginationResultRoutes(
    getTV(TVSort.Popular),
    MediaType.TV
  );
  const personsPromise = safePaginationResultRoutes(
    getPopular(MediaType.Person),
    'celebrities'
  );

  const routes = await Promise.all([moviesPromise, tvPromise, personsPromise]);

  return [...routesMap, ...routes.flat()];
}

/**
 * This is simple and probably temporary implementation of
 * parse routes array for site map from safeFetch response.
 * @returns {Promise<Route[]>}
 */
async function safePaginationResultRoutes(
  promise: ReturnType<typeof $api.safeFetch<AbstractPaginationResult>>,
  path: string
): Promise<Route[]> {
  return promise.then(([data, error]): Route[] => {
    if (error) return [];
    return data.results.map((result) => ({
      url: `${baseUrl}/${path}/${tmdbSlugify(result)}`,
      lastModified: new Date().toISOString(),
    }));
  });
}
