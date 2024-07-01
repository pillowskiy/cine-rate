'use client';

import { useEffect, useRef } from 'react';
import JSConfetti from 'js-confetti';
import type { CreationDetailsProps } from './common/types';

const genreEmojis = {
  Action: '🔫',
  Adventure: '🏝',
  Animation: '🐭',
  Comedy: '🤣',
  Crime: '👮‍♂️',
  Documentary: '🎞️',
  Drama: '🎭',
  Family: '👨‍👩‍👧‍👦',
  Fantasy: '🪄',
  History: '📜',
  Horror: '👻',
  Music: '🎵',
  Mystery: '🕵️',
  Romance: '💕',
  'Science Fiction': '👽',
  'TV Movie': '📺',
  Thriller: '🔪',
  War: '⚔️',
  Western: '🤠',
};

interface CanvasConfettiProps extends CreationDetailsProps {}

/**
 * @deprecated This component is deprecated in favor of the react-confetti package.
 */
export default function CanvasConfetti({ details }: CanvasConfettiProps) {
  const jsConfettiRef = useRef<JSConfetti>();
  const emojis = details.genres.map(
    (genre) => genreEmojis[genre.name as keyof typeof genreEmojis]
  );

  useEffect(() => {
    jsConfettiRef.current = new JSConfetti();

    const timeoutId = setTimeout(() => {
      if (jsConfettiRef.current) {
        jsConfettiRef.current.addConfetti({
          emojis,
          emojiSize: 32,
          confettiNumber: 30,
        });
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!emojis.length) return null;

  return null;
}
