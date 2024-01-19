import { Avatar, AvatarImage, AvatarFallback } from '@ui/avatar';
import { buildGravatarPath, buildImagePath } from '@libs/tmdb';

interface UserAvatarProps {
  username: string;
  path: string;
  gravatarHash?: string | null;
}

export function UserAvatar({ username, path, gravatarHash }: UserAvatarProps) {
  return (
    <Avatar>
      <AvatarImage
        src={
          gravatarHash
            ? buildGravatarPath(gravatarHash)
            : buildImagePath({
                path,
                scale: 'avatar',
              }) || undefined
        }
        alt='User Avatar'
        loading='lazy'
      />
      <AvatarFallback>
        {username
          .split(' ')
          .slice(0, 2)
          .map((str) => str[0]?.toUpperCase())
          .join('')}
      </AvatarFallback>
    </Avatar>
  );
}
