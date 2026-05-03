import { DeforestationRecord, FilterOptions } from "@/lib/types"
import { extractYears, extractProvinces } from "@/utils/filterUtils"

type FilterPanelProps = {
    data: DeforestationRecord[]
    selectedYear?: number
    selectedProvince?: string
    onChange: (filters: FilterOptions) => void
}

export default function FilterPanel({
    data,
    selectedYear,
    selectedProvince,
    onChange,
}: FilterPanelProps) {
    const years = extractYears(data)
    const provinces = extractProvinces(data)

    return (
        <div className="w-full lg:w-80 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-md space-y-4 lg:sticky lg:top-24">
            <h2 className="text-sm sm:text-base font-bold text-gray-900">🔍 Filter Data</h2>

            <label className="space-y-1.5 sm:space-y-2 block">
                <span className="text-xs uppercase tracking-wider font-semibold text-gray-600">Tahun</span>
                <select
                    value={selectedYear ?? ""}
                    onChange={(event) =>
                        onChange({
                            year: event.target.value
                                ? Number(event.target.value)
                                : undefined,
                            province: selectedProvince,
                        })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                >
                    <option value="">Semua Tahun</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </label>

            <label className="space-y-1.5 sm:space-y-2 block">
                <span className="text-xs uppercase tracking-wider font-semibold text-gray-600">Provinsi / Wilayah</span>
                <select
                    value={selectedProvince ?? ""}
                    onChange={(event) =>
                        onChange({
                            year: selectedYear,
                            province: event.target.value || undefined,
                        })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                >
                    <option value="">Semua Wilayah</option>
                    {provinces.map((province) => (
                        <option key={province} value={province}>
                            {province}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
}
