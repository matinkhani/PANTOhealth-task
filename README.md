# German Train Stations Map

A modern React application that displays train stations across Germany on an interactive map with filtering capabilities by city. Click on any station in the list to smoothly pan the map to its location.

## ✨ Features

- **Interactive Map**: Displays all train stations with markers using Leaflet
- **City Filtering**: Filter stations by city using a dropdown selector
- **Smooth Map Navigation**: Click any station in the list to center the map on it
- **Loading & Error States**: Comprehensive loading spinners and error handling
- **Responsive Design**: Perfectly works on desktop and mobile devices
- **Performance Optimized**: Uses `useMemo` for efficient filtering and marker calculations

## 🛠 Tech Stack

| Technology                  | Purpose                    |
| --------------------------- | -------------------------- |
| **React**                   | Component-based UI library |
| **Tailwind CSS**            | Utility-first styling      |
| **Leaflet + React-Leaflet** | Interactive maps           |
| **Axios**                   | API data fetching          |
| **TypeScript**              | Type safety                |

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/matinkhani/PANTOhealth-task.git

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📁 Project Structure

src/<br />
├── hooks/<br />
│ └── api/<br />
│ └── use-get.ts # Custom API hook<br />
├── components/<br />
│ └── map.tsx # Reusable Leaflet map component<br />
├── views/<br />
│ └── HomeView.tsx # Main application view<br />
└── constants/<br />
└── api.ts # API endpoints

## 🎯 Key Components

### 1. Custom API Hook (`useGet`)

A reusable hook for data fetching with loading and error states:

```typescript
export const useGet = <T>({ url, options }: Props) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Handles axios requests with proper error handling
};
```

**Features:**

- Generic TypeScript support
- Automatic loading states
- Comprehensive error handling
- Clean separation of concerns

### 2. Reusable Map Component

Fully customizable Leaflet map with smooth view transitions:

```typescript
export default function Map({
  locations,
  center = [51.1657, 10.4515], // Germany center
  zoom = 8,
}: MapProps) {
  // useMemo for optimized marker calculations
  const markers = useMemo(() => {
    return locations.map((location) => ({
      ...location,
      position: [location.lat, location.lng] as LatLngExpression,
    }));
  }, [locations]);
}
```

**Features:**

- Smooth map panning with `ChangeView` component
- Customizable markers with popups
- Optimized re-renders with `useMemo`
- Responsive styling

### 3. Main Home View

Orchestrates the entire application:

```typescript
export const HomeView = () => {
  const [center, setCenter] = useState<[number, number]>([51.1657, 10.4515]);
  const [selectedCity, setSelectedCity] = useState<string>("all");

  const { data, error, isLoading } = useGet<TrainStationT[]>({
    url: ENDPOINTS.trainStations,
  });
  // Memoized filtering and city options
};
```

## 🎨 UI Components

### City Filter Dropdown

```typescript
export const CityFilter = ({ cities, onChange }: Props) => {
  const items = [
    { label: "All Cities", value: "all" },
    ...cities.map((city) => ({ label: city, value: city })),
  ];
};
```

### Interactive Stations List

Beautiful, accessible station cards with hover effects:

```typescript
export const CitiesList = ({ data, onSelect }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {data.map((city) => (
        <div
          key={city.id}
          role="button"
          tabIndex={0}
          onClick={() => onSelect?.(city)}
          className="
            group flex items-start gap-3
            p-3 bg-white rounded-xl
            hover:bg-blue-50 hover:shadow-md
            transition-all duration-200
          "
        >
          <div className="w-9 h-9 rounded-lg bg-blue-100">🚉</div>
          <div>
            <h3 className="font-bold text-sm">{city.name}</h3>
            <p className="text-xs text-gray-500">{city.city}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
```

## ⚡ Performance Optimizations

- ✅ `useMemo` for expensive calculations (filtering, markers)
- ✅ Custom hook prevents unnecessary re-fetches
- ✅ Efficient DOM updates with proper keys
- ✅ Lazy loading states prevent layout shift
- ✅ Tailwind CSS for minimal bundle size

## 🔮 Data Flow

API Request → useGet Hook → HomeView
↓
City Filter → Filtered Data
↓
Map Component ← Stations List ← Click Handler

## 📱 Responsive Design

- **Desktop**: Sidebar + Full map
- **Mobile**: Stacked layout with touch-friendly interactions
- **Accessibility**: Keyboard navigation, ARIA labels, focus management

## 🐛 Troubleshooting

| Issue              | Solution                 |
| ------------------ | ------------------------ |
| Map not loading    | Check Leaflet CSS import |
| Data not fetching  | Verify API endpoint      |
| Filter not working | Clear browser cache      |
