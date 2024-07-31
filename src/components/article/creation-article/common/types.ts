import type { ICreation } from '#types/creation-types';
import type { MediaType } from '#config/enums';

export interface BaseCreationArticleProps {
  creation: ICreation;
  defaultMediaType?: MediaType;
}
