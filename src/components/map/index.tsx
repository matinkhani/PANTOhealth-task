import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { useEffect, useMemo } from "react";
import "leaflet/dist/leaflet.css";

interface Location {
  id: string | number;
  lat: number;
  lng: number;
  name: string;
  city: string;
}

interface MapProps {
  locations: Location[];
  center?: LatLngExpression;
  zoom?: number;
  className?: string;
}

function ChangeView({
  center,
  zoom,
}: {
  center: LatLngExpression;
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

export default function Map({
  locations,
  center = [51.1657, 10.4515],
  zoom = 7,
  className = "",
}: MapProps) {
  const markers = useMemo(() => {
    return locations.map((location) => ({
      ...location,
      position: [location.lat, location.lng] as LatLngExpression,
    }));
  }, [locations]);

  return (
    <div className={`relative ${className}`}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="h-full w-full rounded-lg shadow-lg bg-[#333]"
      >
        <ChangeView center={center} zoom={zoom} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position} riseOnHover={true}>
            <Popup>
              <div className="p-2 min-w-37.5">
                {marker.name && (
                  <h3 className="font-bold text-base mb-1">{marker.name}</h3>
                )}
                {marker.city && (
                  <p className="text-sm text-gray-600">{marker.city}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
