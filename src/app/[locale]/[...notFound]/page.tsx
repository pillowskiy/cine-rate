import { notFound } from 'next/navigation';

export const dynamic = 'force-static';

/*
 * TEMP ? dynamic catch all not found routes
 * https://stackoverflow.com/questions/75302340/
 */
export default function NotFoundCatchAll() {
  notFound();
}
