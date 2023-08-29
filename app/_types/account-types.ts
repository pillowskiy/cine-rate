export interface IUser {
  avatar: {
    gravatar: {
      hash: string | null;
    };
    tmdb: {
      avatar_path: string;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

export type AccountDetailsResponse = IUser;
