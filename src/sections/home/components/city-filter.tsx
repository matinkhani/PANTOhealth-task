import Dropdown from "../../../components/drop-down";

type Props = {
  cities: string[];
  onChange: (city: string) => void;
};

export const CityFilter = ({ cities, onChange }: Props) => {
  const items = [
    { label: "All Cities", value: "all" },
    ...cities.map((city) => ({ label: city, value: city })),
  ];

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Filter based City
      </label>
      <Dropdown options={items} onChange={(item) => onChange(item.value)} />
    </div>
  );
};
