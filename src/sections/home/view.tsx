import { useMemo, useState } from "react";
import Map from "../../components/map";
import { CitiesList } from "./components/cities-list";
import { useGet } from "../../hooks/api/use-get";
import type { TrainStationT } from "./types/train-station.type";
import { ENDPOINTS } from "../../constants/api";
import { CityFilter } from "./components/city-filter";

export const HomeView = () => {
  const [center, setCenter] = useState<[number, number]>([51.1657, 10.4515]);
  const [selectedCity, setSelectedCity] = useState<string>("all");

  const { data, error, isLoading } = useGet<TrainStationT[]>({
    url: ENDPOINTS.trainStations,
  });

  const cityOptions = useMemo(() => {
    if (!data) return [];
    const unique = [...new Set(data?.map((t) => t?.city))].sort();
    return unique;
  }, [data]);

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (selectedCity === "all") return data;
    return data?.filter((t) => t?.city === selectedCity);
  }, [data, selectedCity]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100">
      <aside className="w-72 shrink-0 flex flex-col bg-white border-r border-gray-200 shadow-md z-10">
        <div className="px-4 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-800">
            Train Stations 🚉
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {data?.length ?? 0} Stations
          </p>
        </div>

        <div className="px-3 py-3 border-b border-gray-100">
          <CityFilter
            cities={cityOptions}
            onChange={(value) => {
              setSelectedCity(value);

              if (value === "all") return;

              const firstStation = data?.find((t) => t.city === value);
              if (firstStation) {
                setCenter([firstStation.lat, firstStation.lng]);
              }
            }}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          <CitiesList
            data={filteredData || []}
            onSelect={(station) => setCenter([station.lat, station.lng])}
          />
        </div>
      </aside>

      <main className="flex-1 relative">
        <Map
          className="w-full h-full"
          locations={filteredData || []}
          center={center}
        />
      </main>
    </div>
  );
};
