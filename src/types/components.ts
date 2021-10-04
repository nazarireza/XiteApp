export type IconBaseProps = {
  color?: string;
  size?: number;
};

export type onListItemSelect<T> = (item: {
  item: T;
  index: number;
  selected?: boolean;
}) => void;
