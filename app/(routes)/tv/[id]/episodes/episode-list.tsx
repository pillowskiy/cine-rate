'use client';

import type { SeasonDetailsResponse } from '@app/types/tv-types';
import { type BaseParams, MediaType } from '@app/types/index';
import { useEffect, useState } from 'react';
import { EpisodeArticle } from './episode-article';
import axios from 'axios';

async function getSeasonDetails(params?: BaseParams) {
  return axios.get<SeasonDetailsResponse>(`episodes/api`, { params });
}

interface EpisodeListProps {
  seriesId: number;
  seasonNumber: number;
}

export default function EpisodeList({ seriesId, seasonNumber }: EpisodeListProps) {
  const [season, setSeason] = useState<SeasonDetailsResponse | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getSeasonDetails({ season: seasonNumber.toString() })
      .then(({ data }) => setSeason(data))
      .catch((_) => setSeason(null))
      .finally(() => setLoading(false));
  }, [seriesId, seasonNumber]);

  // TEMP
  if (isLoading) return null;
  if (!season || !season.episodes?.length) return null;

  return (
    <section className='space-y-4'>
      {season.episodes.map((episode) => (
        <EpisodeArticle key={episode.id} episode={episode} />
      ))}
    </section>
  );
}
