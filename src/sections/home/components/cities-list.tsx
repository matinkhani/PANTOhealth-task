import type { TrainStationT } from "../types/train-station.type";

type Props = {
  data: Array<TrainStationT>;
  onSelect?: (data: TrainStationT) => void;
};

export const CitiesList = ({ data, onSelect }: Props) => {
  return (
    <div className="flex flex-col gap-1.5 overflow-auto h-175 w-62.5">
      {data.map((city) => (
        <div
          key={city.id}
          className="p-2 bg-white rounded shadow-sm cursor-pointer"
          onClick={() => {
            onSelect?.(city);
          }}
        >
          <h3 className="font-semibold">{city.name}</h3>
          <p className="text-sm text-gray-600">{city.city}</p>
        </div>
      ))}
    </div>
  );
};
