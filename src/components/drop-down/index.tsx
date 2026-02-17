import { useState, useRef, useEffect } from "react";
import Button from "../ui/button";

type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  options: Option[];
  placeholder?: string;
  onChange: (option: Option) => void;
};

export default function Dropdown({
  options,
  placeholder = "Select...",
  onChange,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (option: Option) => {
    setSelected(option);
    onChange(option);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative w-full">
      <Button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex justify-between"
        variant="outline"
      >
        <span className={selected ? "text-gray-800" : "text-gray-400"}>
          {selected ? selected.label : placeholder}
        </span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </Button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md text-sm overflow-hidden">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                selected?.value === option.value
                  ? "bg-blue-100 font-medium"
                  : ""
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
