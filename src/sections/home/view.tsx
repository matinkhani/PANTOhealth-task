import { useState } from "react";
import Map from "../../components/map";
import { CitiesList } from "./components/cities-list";
import { useGet } from "../../hooks/api/use-get";
import { ENDPOINTS } from "../../constants/api";
import type { TrainStationT } from "./types/train-station.type";

export const HomeView = () => {
  const [center, setCenter] = useState<[number, number]>([51.1657, 10.4515]);

  const { data, error, isLoading } = useGet<TrainStationT[]>({
    url: ENDPOINTS.trainStations,
  });

  return (
    <div className="min-h-screen bg-gray-500 p-8 flex flex-row">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="max-w-6xl mx-auto flex-1">
            <Map
              className="h-175 w-full"
              locations={data || []}
              center={center}
            />
          </div>
          <CitiesList
            data={data || []}
            onSelect={(data) => {
              setCenter([data.lat, data.lng]);
            }}
          />
        </>
      )}
    </div>
  );
};
