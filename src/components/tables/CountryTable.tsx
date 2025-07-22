import { Country } from "@/lib/types";
import clsx from "clsx";

type Props = {
  countries: Country[];
  selectedCountry: Country | null;
  onSelectCountry: (country: Country) => void;
};

export default function CountryTable({ countries, selectedCountry, onSelectCountry }: Props) {
  return (
    <table className="w-full text-left shadow rounded-xl text-[.75rem]">
      <thead className="bg-gray-100 border-b border-b-gray-200 ">
        <tr className="*:px-4 *:py-2 *:border-r-1 *:border-r-gray-300 ">
          <th className="rounded-tl-xl">Port Name</th>
          <th>Cargo</th>
          <th>F</th>
          <th>BL Code</th>
          <th>Quantity</th>
          <th>L/D Rate</th>
          <th>Term</th>
          <th>Dem Rate</th>
          <th>Des Rate/D</th>
          <th>Allowed</th>
          <th>Used</th>
          <th>Deduction</th>
          <th>Balance</th>
          <th>Laycan From</th>
          <th className="border-none rounded-tr-xl">Laycan To</th>
        </tr>
      </thead>
      <tbody>
        {countries.map((country) => (
          <tr
            key={country.id}
            onClick={() => onSelectCountry(country)}
            className={clsx(
              "cursor-pointer transition-colors hover:bg-gray-100",
              selectedCountry?.id === country.id && "bg-blue-100"
            )}
          >
            <td className="p-2">{country.portname}</td>
            <td className="p-2">{country.cargo}</td>
            <td className="p-2">{country.f}</td>
            <td className="p-2">{country.blcode}</td>
            <td className="p-2">{country.quantity.toLocaleString()}</td>
            <td className="p-2">{country.ldrate.toLocaleString()}</td>
            <td className="p-2">{country.term}</td>
            <td className="p-2">{country.demrate.toLocaleString()}</td>
            <td className="p-2">{country.desrate.toLocaleString()}</td>
            <td className="p-2">{country.allowed}</td>
            <td className="p-2">{country.used}</td>
            <td className="p-2">{country.deduction}</td>
            <td className="p-2">{country.balance}</td>
            <td className="p-2">{country.laycanfrom}</td>
            <td className="p-2">{country.layconto}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
