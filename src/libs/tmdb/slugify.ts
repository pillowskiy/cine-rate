import { pipe } from '#libs/common/next';
import { slugify } from '#libs/slugify';

export function tmdbSlugify(resource: { id: number } & object) {
  return slugify(`${(resource as any).original_title ?? ''} ${resource.id}`);
}

export function pipeSlugId(input: unknown) {
  const parsedParam = pipe.string(input);
  const slugParts = parsedParam.split('-');
  const resourceId = slugParts[slugParts.length - 1];
  return pipe.strToInt(resourceId);
}
