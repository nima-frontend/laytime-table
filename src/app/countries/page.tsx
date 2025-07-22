'use client';

import { useState } from "react";
import CountryTable from "@/components/tables/CountryTable";
import OrderTable from "@/components/tables/OrderTable";
import { Country, Order } from "@/lib/types";
import { mockCountries, mockOrders } from "@/lib/mockData";
import "@/styles/global.css";

export default function CountriesPage() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  // Initialize countryOrders with mock data for "c1"
  const [countryOrders, setCountryOrders] = useState<Record<string, Order[]>>(mockOrders);

  // Handler to update orders for a specific country
  const handleOrderChange = (countryId: string, updated: Order[]) => {
    setCountryOrders((prev) => ({
      ...prev,
      [countryId]: updated,
    }));
  };

  return (
    <div className="max-w-6xl w-[90%] mx-auto my-10 space-y-10">
      {/* Countries Table Section */}
      <section className="table-container whitespace-nowrap bg-white rounded-lg shadow p-6 overflow-x-auto">
        <h1 className="pin-line text-lg font-semibold mb-4">Lay Times</h1>
        <CountryTable
          countries={mockCountries}
          selectedCountry={selectedCountry}
          onSelectCountry={setSelectedCountry}
        />
      </section>

      {/* Orders Table Section */}
      {selectedCountry && (
        <section className="table-container whitespace-nowrap bg-white rounded-lg shadow p-6 overflow-x-auto">
          <h2 className="pin-line text-lg font-semibold mb-4">
            Port Activity – {selectedCountry.portname}
          </h2>
          <OrderTable
            countryId={selectedCountry.id}
            orders={countryOrders[selectedCountry.id] || []}
            onChangeOrders={(updated) =>
              handleOrderChange(selectedCountry.id, updated)
            }
          />
        </section>
      )}
    </div>
  );
}
