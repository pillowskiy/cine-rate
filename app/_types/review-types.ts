import { BaseResponse } from '.';

export interface IReviewAuthor {
  name: string;
  username: string;
  avatar_path: string;
  rating: number;
}

export interface IReview {
  author: IReviewAuthor['name'];
  author_details: IReviewAuthor;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export type ReviewResponse = BaseResponse<IReview>;
