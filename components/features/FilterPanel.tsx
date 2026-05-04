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
        <div className="w-full rounded-xl border border-gray-200 bg-white p-5 sm:p-6 md:p-7 shadow-sm space-y-5 sm:space-y-6">
            <h2 className="text-base md:text-lg font-bold text-gray-900">🔍 Filter Data</h2>

            <div className="space-y-5 md:space-y-6">
                {/* Tahun Filter */}
                <div className="space-y-2 md:space-y-3">
                    <label className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-700">
                        Tahun
                    </label>
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
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 md:py-3 text-sm md:text-base text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                    >
                        <option value="">Semua Tahun</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Provinsi Filter */}
                <div className="space-y-2 md:space-y-3">
                    <label className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-700">
                        Provinsi / Wilayah
                    </label>
                    <select
                        value={selectedProvince ?? ""}
                        onChange={(event) =>
                            onChange({
                                year: selectedYear,
                                province: event.target.value || undefined,
                            })
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 md:py-3 text-sm md:text-base text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                    >
                        <option value="">Semua Wilayah</option>
                        {provinces.map((province) => (
                            <option key={province} value={province}>
                                {province}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
