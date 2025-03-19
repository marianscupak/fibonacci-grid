interface Props {
  value: number;
}

export const Cell = ({ value }: Props) => {
  return <div className="w-4 h-4 bg-gray-300 border border-gray-400 text-center">{value}</div>;
};
