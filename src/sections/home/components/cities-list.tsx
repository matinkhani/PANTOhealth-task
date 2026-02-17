import type { TrainStationT } from "../types/train-station.type";

type Props = {
  data: Array<TrainStationT>;
  onSelect?: (data: TrainStationT) => void;
};

export const CitiesList = ({ data, onSelect }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <span className="text-4xl mb-2">🚉</span>
          <p className="text-sm font-medium">ایستگاهی یافت نشد</p>
        </div>
      )}

      {data.map((city) => (
        <div
          key={city.id}
          role="button"
          tabIndex={0}
          onClick={() => onSelect?.(city)}
          onKeyDown={(e) => e.key === "Enter" && onSelect?.(city)}
          className="
            group flex items-start gap-3
            p-3 bg-white rounded-xl
            border border-gray-100 shadow-sm
            cursor-pointer
            transition-all duration-200 ease-in-out
            hover:bg-blue-50 hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1
            active:scale-[0.98]
          "
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors duration-200 shrink-0">
            🚉
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <h3 className="font-bold text-sm text-gray-800 group-hover:text-blue-700 transition-colors duration-200 truncate">
              {city.name}
            </h3>
            <p className="text-xs text-gray-500 truncate">{city.city}</p>
          </div>
          <div className="mr-auto self-center text-gray-300 text-xs group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all duration-200">
            ←
          </div>
        </div>
      ))}
    </div>
  );
};
