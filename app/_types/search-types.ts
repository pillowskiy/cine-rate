import type { BaseResponse } from '.';
import type { ICreation } from './creation-types';
import type { ICelebrity } from './person-types';

export type MultiSearchResponse = BaseResponse<ICreation | ICelebrity>;
