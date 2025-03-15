interface ShopFilterProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const options = [
  { value: "all", label: "All" },
  { value: "shops", label: "Shops" },
  { value: "hairStylists", label: "Hairstylists" },
];

export default function ShopFilter({ value, onChange }: ShopFilterProps) {
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <h2 className="text-3xl text-[#4A90E2]">Barbers</h2>
        <select className="bg-transparent border border-white text-white rounded-lg w-max px-4 py-2 outline-none" value={value} onChange={onChange}>
          {options.map(({ value, label }) => (
            <option key={value} value={value} className="text-black">
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full border border-[#4A90E2] mb-1"></div>
    </>
  );
}
