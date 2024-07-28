import { type ComponentProps, forwardRef } from 'react';
import { cn } from '#libs/index';

const List = forwardRef<HTMLUListElement, ComponentProps<'ul'>>(
  ({ className, children, ...props }, ref) => {
    return (
      <ul className={cn('space-y-4', className)} ref={ref} {...props}>
        {children}
      </ul>
    );
  }
);

List.displayName = 'List';

interface ListItemProps extends ComponentProps<'li'> {
  title: string;
  description: string;
}

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, title, description, ...props }, ref) => {
    return (
      <li ref={ref} {...props}>
        <span>{title.endsWith(':') ? title : `${title}:`}</span>
        <p className='break-words text-sm opacity-70'>{description}</p>
      </li>
    );
  }
);

ListItem.displayName = 'ListItem';

export { List, ListItem };
