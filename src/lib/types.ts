export type Country = {
  id: string;
  portname: string;
  cargo:string;
  f:string;
  blcode:string;
  quantity:number;
  ldrate:number;
  term:string;
  demrate:number;
  desrate:number;
  allowed:number;
  used:string;
  deduction:string;
  balance:string;
  laycanfrom:string;
  layconto:string;
};

export type ActivityType =
  | "Unknown"
  | "Loading"
  | "Unloading"
  | "Waiting"
  | "Berthing"
  | "Unberthing"
  | "Inspection"
  | "Bunkering"
  | "Maintenance";

export type PercentType = "0%" | "50%" | "100%";

export type Order = {
  id: string;
  countryId: string;
  day?:string;
  activitytype:ActivityType;
  fromdate:string;
  duration:string;
  percent:PercentType;
  todate:string;
  remarks: string;
  deductions:string;
  needsReorder?: boolean;
};
