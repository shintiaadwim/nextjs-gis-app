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
        <div className="w-full card p-5 sm:p-6 md:p-7 space-y-5 sm:space-y-6">
            <h2 className="text-base md:text-lg font-bold text-slate-900">🔍 Filter Data</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div className="space-y-2 md:space-y-3">
                    <label className="text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
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
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 md:py-3 text-sm md:text-base text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
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
                    <label className="text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
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
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 md:py-3 text-sm md:text-base text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
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
