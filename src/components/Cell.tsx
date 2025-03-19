interface Props {
  value: number;
  onClick(): void;
}

export const Cell = ({ value, onClick }: Props) => {
  return (
    <div className="w-4 h-4 bg-gray-300 border border-gray-400 text-center cursor-pointer" onClick={onClick}>
      {value}
    </div>
  );
};
