
import { Country, Order } from "./types";
import { v4 as uuidv4 } from "uuid";

export const mockCountries: Country[] = [
  {
    id: "1", portname: "USA 🇺🇸", cargo: "Crude Oil", f: "FOB",
    blcode: "BL001",
    quantity: 100000,
    ldrate: 5000,
    term: "CIF",
    demrate: 15000,
    desrate: 12000,
    allowed: 5,
    used: "05d 00:00",
    deduction: "01d 00:00",
    balance: "01d 00:00",
    laycanfrom: "2025/03/30 Sun",
    layconto: "2025/04/05 Sat"
  },
  {
    id: "2", portname: "Brazil 🇧🇷", cargo: "Soybeans", f: "CIF",
    blcode: "BL002",
    quantity: 80000,
    ldrate: 4000,
    term: "FOB",
    demrate: 12000,
    desrate: 9000,
    allowed: 6,
    used: "05d 00:00",
    deduction: "01d 00:00",
    balance: "01d 00:00",
    laycanfrom: "2025/05/08 Thu",
    layconto: "2025/05/12 Mon"
  },
  {
    id: "3", portname: "Singapore 🇸🇬", cargo: "Chemicals", f: "FQB",
    blcode: "BL002",
    quantity:60000 ,
    ldrate: 4500,
    term: "CFR",
    demrate: 10000,
    desrate: 8000,
    allowed: 4,
    used: "05d 00:00",
    deduction: "00d 12:00",
    balance: "01d 00:00",
    laycanfrom: "2025/05/30 Fri",
    layconto: "2025/06/03 Tue"
  },
];

export const mockOrders: Record<string, Order[]> = {
  "1": [
    {
      id: uuidv4(),
      countryId: "1",
      day: "Mon",
      activitytype: "Unknown",
      fromdate: new Date("2025-07-21T08:00").toISOString().slice(0, 16),
      todate: new Date("2025-07-22T12:00").toISOString().slice(0, 16),
      duration: "28.0h",
      percent: "0%",
      remarks: "Initial load",
      deductions: "00d 00:00",
      needsReorder: false,
    },
    {
      id: uuidv4(),
      countryId: "1",
      day: "Tue",
      activitytype: "Unknown",
      fromdate: new Date("2025-07-22T12:00").toISOString().slice(0, 16),
      todate: new Date("2025-07-24T12:30").toISOString().slice(0, 16),
      duration: "48.5h",
      percent: "50%",
      remarks: "almost done",
      deductions: "01d 00:15",
      needsReorder: false,
    },
  ],
  "2": [
    {
      id: uuidv4(),
      countryId: "2",
      day: "Tue",
      activitytype: "Waiting",
      fromdate: new Date("2025-07-20T10:00").toISOString().slice(0, 16),
      todate: new Date("2025-07-20T12:00").toISOString().slice(0, 16),
      duration: "2h",
      percent: "0%",
      remarks: "Waiting...",
      deductions: "00d 00:00",
      needsReorder: false,
    },
  ],
  "3": [], 
};
