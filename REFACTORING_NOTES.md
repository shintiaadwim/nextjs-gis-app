# Refactoring: Pemisahan Logika dan UI Components

## Ringkasan Perubahan

Struktur folder components telah direfactor untuk memisahkan **logika** dari **UI rendering**. Logika bisnis sekarang berada di folder `hooks/`, `utils/`, `data/`, dan `types/`.

## Struktur Baru

### 📁 `utils/` - Business Logic & Constants

Berisi fungsi utility dan konstanta yang tidak bergantung pada React hooks.

- **`chartUtils.ts`**
  - `PIE_COLORS[]` - Konstanta warna untuk pie chart
  - `formatNumber()` - Format angka dengan locale Indonesia
  - `getChartColor()` - Fungsi untuk mendapatkan warna berdasarkan index
  - Types: `TooltipPayload`, `TrendDataPoint`, `RegionDataPoint`

- **`filterUtils.ts`**
  - `extractYears()` - Ekstrak tahun unik dari data
  - `extractProvinces()` - Ekstrak provinsi unik dari data
  - `filterData()` - Filter data berdasarkan opsi
  - `generateYearArray()` - Generate array tahun
  - `DEFAULT_REGIONS` - Konstanta wilayah default

### 📁 `hooks/` - React Hooks

Custom hooks untuk data processing dan state management.

- **`useChartData.ts`**
  - Memproses data deforestasi menjadi format chart
  - Menggunakan `useMemo` untuk optimisasi

- **`useFilterOptions.ts`**
  - Mengekstrak opsi filter dari data
  - Mengembalikan `years` dan `provinces`

### 📁 `data/` - Data & Constants

Berisi data geografis dan konstanta aplikasi.

- **`provinceCoordinates.ts`**
  - `PROVINCE_COORDINATES` - Koordinat geografis semua provinsi Indonesia
  - `MAP_CENTER` - Koordinat pusat peta
  - `MAP_DEFAULT_ZOOM` - Zoom level default

### 📁 `components/` - UI Components

Hanya berisi JSX rendering, logika minimal.

- **`components/features/`**
  - `ChartSection.tsx` - Menggunakan `chartUtils` dan `ChartTooltip`
  - `FilterPanel.tsx` - Menggunakan `filterUtils`
  - `DeforestationMap.tsx` - Menggunakan `provinceCoordinates`

- **`components/ui/`**
  - `ChartTooltip.tsx` - Component terpisah untuk tooltip (sebelumnya `CustomTooltip`)

- **`components/sections/`**
  - `DataFilter.tsx` - Menggunakan `generateYearArray()` dan `DEFAULT_REGIONS`

## Contoh Penggunaan

### Sebelum (Logika di Component)

```tsx
// ChartSection.tsx
const pieColors = [...] // 30+ warna hardcoded
const CustomTooltip = ({ active, payload }) => {...}

export default function ChartSection({ trendData, regionData }) {
  return (...)
}
```

### Sesudah (Logika Terpisah)

```tsx
// components/ui/ChartTooltip.tsx
import { formatNumber, TooltipPayload } from '@/utils/chartUtils'
export function ChartTooltip({ active, payload }: ChartTooltipProps) {...}

// components/features/ChartSection.tsx
import { PIE_COLORS, TrendDataPoint, RegionDataPoint } from '@/utils/chartUtils'
import { ChartTooltip } from '@/components/ui/ChartTooltip'

export default function ChartSection({ trendData, regionData }: ChartSectionProps) {...}
```

## Keuntungan Refactoring

✅ **Separation of Concerns** - Logika terpisah dari UI  
✅ **Reusability** - Fungsi utility bisa digunakan di banyak tempat  
✅ **Testability** - Fungsi pure logic lebih mudah di-test  
✅ **Maintainability** - Perubahan logika tidak perlu menyentuh component  
✅ **Type Safety** - Types terpusat dan konsisten

## File yang Diupdate

| File                                       | Perubahan                                  |
| ------------------------------------------ | ------------------------------------------ |
| `components/features/ChartSection.tsx`     | Import colors & types dari utils           |
| `components/features/FilterPanel.tsx`      | Import fungsi extract dari utils           |
| `components/features/DeforestationMap.tsx` | Import coordinates dari data               |
| `components/sections/DataFilter.tsx`       | Import constants dari utils                |
| `components/ui/ChartTooltip.tsx`           | **NEW** - Component terpisah untuk tooltip |

## File yang Dibuat

| File                          | Tujuan                              |
| ----------------------------- | ----------------------------------- |
| `utils/chartUtils.ts`         | Chart utilities & constants         |
| `utils/filterUtils.ts`        | Filter utilities & constants        |
| `hooks/useChartData.ts`       | Hook untuk process chart data       |
| `hooks/useFilterOptions.ts`   | Hook untuk extract filter options   |
| `data/provinceCoordinates.ts` | Koordinat geografis & map constants |
