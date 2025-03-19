interface Props {
  value: number;
  backgroundColor?: 'yellow' | 'green';
  onClick(): void;
}

export const Cell = ({ value, backgroundColor, onClick }: Props) => {
  const bgColorClass =
    backgroundColor === 'yellow' ? 'bg-yellow-300' : backgroundColor === 'green' ? 'bg-green-300' : 'bg-gray-300';

  return (
    <div
      className={`w-4 h-4 border border-gray-400 text-center cursor-pointer transition ${bgColorClass}`}
      onClick={onClick}
    >
      {value}
    </div>
  );
};
