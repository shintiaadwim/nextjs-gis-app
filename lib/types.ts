export type DeforestationRecord = {
  year: number;
  province: string;
  areaHa: number;
  carbonEmissionTon: number;
};

export type FilterOptions = {
  year?: number;
  province?: string;
};
