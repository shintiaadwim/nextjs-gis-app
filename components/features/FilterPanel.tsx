import { DeforestationRecord, FilterOptions } from "@/lib/types";

type FilterPanelProps = {
    data: DeforestationRecord[];
    selectedYear?: number;
    selectedProvince?: string;
    onChange: (filters: FilterOptions) => void;
};

export default function FilterPanel({
    data,
    selectedYear,
    selectedProvince,
    onChange,
}: FilterPanelProps) {
    const years = Array.from(new Set(data.map((item) => item.year))).sort(
        (a, b) => a - b,
    );
    const provinces = Array.from(
        new Set(data.map((item) => item.province)),
    ).sort();

    return (
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-slate-900/20">
            <h2 className="text-lg font-semibold text-white">Filter Data</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-300">
                    Tahun
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
                        className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-brand-500"
                    >
                        <option value="">Semua Tahun</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                    Provinsi / Wilayah
                    <select
                        value={selectedProvince ?? ""}
                        onChange={(event) =>
                            onChange({
                                year: selectedYear,
                                province: event.target.value || undefined,
                            })
                        }
                        className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-brand-500"
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
        </div>
    );
}
