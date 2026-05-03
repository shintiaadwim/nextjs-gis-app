'use client'

import dynamic from 'next/dynamic'
import type { LatLngTuple } from 'leaflet'

// Dynamic import untuk menghindari SSR issues dengan Leaflet
const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
)
const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
)
const Polygon = dynamic(
    () => import('react-leaflet').then((mod) => mod.Polygon),
    { ssr: false }
)
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
    ssr: false,
})

import { DeforestationRecord } from '@/lib/types'

// Koordinat provinsi Indonesia (simplified boundaries)
const provinceCoordinates: Record<string, [number, number][][]> = {
    Aceh: [
        [
            [95.0, 4.0],
            [97.5, 4.0],
            [97.5, 6.0],
            [95.0, 6.0],
        ],
    ],
    'Sumatera Utara': [
        [
            [97.5, 1.0],
            [100.0, 1.0],
            [100.0, 4.0],
            [97.5, 4.0],
        ],
    ],
    'Sumatera Barat': [
        [
            [98.5, -1.0],
            [101.0, -1.0],
            [101.0, 1.0],
            [98.5, 1.0],
        ],
    ],
    Riau: [
        [
            [100.0, -0.5],
            [104.0, -0.5],
            [104.0, 2.0],
            [100.0, 2.0],
        ],
    ],
    Jambi: [
        [
            [101.5, -2.5],
            [104.5, -2.5],
            [104.5, -0.5],
            [101.5, -0.5],
        ],
    ],
    'Sumatera Selatan': [
        [
            [102.0, -4.0],
            [106.0, -4.0],
            [106.0, -2.0],
            [102.0, -2.0],
        ],
    ],
    Bengkulu: [
        [
            [101.0, -4.5],
            [103.5, -4.5],
            [103.5, -3.0],
            [101.0, -3.0],
        ],
    ],
    Lampung: [
        [
            [104.0, -6.0],
            [106.0, -6.0],
            [106.0, -4.5],
            [104.0, -4.5],
        ],
    ],
    'Kepulauan Bangka Belitung': [
        [
            [105.5, -3.5],
            [108.5, -3.5],
            [108.5, -1.5],
            [105.5, -1.5],
        ],
    ],
    'Kepulauan Riau': [
        [
            [103.5, 0.5],
            [106.5, 0.5],
            [106.5, 2.5],
            [103.5, 2.5],
        ],
    ],
    'DKI Jakarta': [
        [
            [106.7, -6.4],
            [106.9, -6.4],
            [106.9, -6.1],
            [106.7, -6.1],
        ],
    ],
    'Jawa Barat': [
        [
            [106.0, -7.5],
            [108.5, -7.5],
            [108.5, -6.0],
            [106.0, -6.0],
        ],
    ],
    'Jawa Tengah': [
        [
            [108.5, -8.0],
            [111.5, -8.0],
            [111.5, -6.5],
            [108.5, -6.5],
        ],
    ],
    'DI Yogyakarta': [
        [
            [110.2, -8.0],
            [110.5, -8.0],
            [110.5, -7.5],
            [110.2, -7.5],
        ],
    ],
    'Jawa Timur': [
        [
            [111.5, -8.5],
            [114.5, -8.5],
            [114.5, -6.5],
            [111.5, -6.5],
        ],
    ],
    Banten: [
        [
            [105.5, -7.0],
            [106.5, -7.0],
            [106.5, -6.0],
            [105.5, -6.0],
        ],
    ],
    Bali: [
        [
            [114.5, -8.9],
            [115.5, -8.9],
            [115.5, -8.0],
            [114.5, -8.0],
        ],
    ],
    'Nusa Tenggara Barat': [
        [
            [115.5, -9.5],
            [117.5, -9.5],
            [117.5, -8.0],
            [115.5, -8.0],
        ],
    ],
    'Nusa Tenggara Timur': [
        [
            [119.0, -10.5],
            [125.0, -10.5],
            [125.0, -8.0],
            [119.0, -8.0],
        ],
    ],
    'Kalimantan Barat': [
        [
            [108.5, -0.5],
            [112.0, -0.5],
            [112.0, 2.5],
            [108.5, 2.5],
        ],
    ],
    'Kalimantan Tengah': [
        [
            [112.0, -3.5],
            [116.5, -3.5],
            [116.5, 0.5],
            [112.0, 0.5],
        ],
    ],
    'Kalimantan Selatan': [
        [
            [114.0, -4.5],
            [117.5, -4.5],
            [117.5, -2.0],
            [114.0, -2.0],
        ],
    ],
    'Kalimantan Timur': [
        [
            [115.0, 0.5],
            [119.0, 0.5],
            [119.0, 4.0],
            [115.0, 4.0],
        ],
    ],
    'Kalimantan Utara': [
        [
            [115.5, 2.5],
            [117.5, 2.5],
            [117.5, 4.5],
            [115.5, 4.5],
        ],
    ],
    'Sulawesi Utara': [
        [
            [123.0, -1.5],
            [126.0, -1.5],
            [126.0, 1.5],
            [123.0, 1.5],
        ],
    ],
    'Sulawesi Tengah': [
        [
            [119.5, -3.0],
            [124.0, -3.0],
            [124.0, -0.5],
            [119.5, -0.5],
        ],
    ],
    'Sulawesi Selatan': [
        [
            [117.5, -8.0],
            [122.0, -8.0],
            [122.0, -2.5],
            [117.5, -2.5],
        ],
    ],
    'Sulawesi Tenggara': [
        [
            [120.5, -6.5],
            [124.5, -6.5],
            [124.5, -3.5],
            [120.5, -3.5],
        ],
    ],
    Gorontalo: [
        [
            [121.5, -0.5],
            [123.5, -0.5],
            [123.5, 1.0],
            [121.5, 1.0],
        ],
    ],
    'Sulawesi Barat': [
        [
            [118.5, -3.5],
            [120.5, -3.5],
            [120.5, -1.5],
            [118.5, -1.5],
        ],
    ],
    Maluku: [
        [
            [126.0, -9.0],
            [132.0, -9.0],
            [132.0, -2.5],
            [126.0, -2.5],
        ],
    ],
    'Maluku Utara': [
        [
            [124.5, -0.5],
            [129.0, -0.5],
            [129.0, 2.5],
            [124.5, 2.5],
        ],
    ],
    'Papua Barat': [
        [
            [130.0, -4.0],
            [136.0, -4.0],
            [136.0, 0.5],
            [130.0, 0.5],
        ],
    ],
    Papua: [
        [
            [136.0, -9.5],
            [142.0, -9.5],
            [142.0, -2.0],
            [136.0, -2.0],
        ],
    ],
}

interface DeforestationMapProps {
    data: DeforestationRecord[]
    selectedYear?: number
}

export default function DeforestationMap({
    data,
    selectedYear,
}: DeforestationMapProps) {
    if (!data || data.length === 0) {
        return (
            <div className="h-150 w-full rounded-3xl overflow-hidden border border-gray-300 shadow-lg bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">Tidak ada data peta untuk ditampilkan</p>
            </div>
        )
    }

    // Hitung total deforestasi per provinsi untuk tahun yang dipilih
    const provinceData = data.reduce(
        (acc, record) => {
            if (selectedYear && record.year !== selectedYear) return acc

            if (!acc[record.province]) {
                acc[record.province] = { areaHa: 0, emissionTon: 0, count: 0 }
            }
            acc[record.province].areaHa += record.areaHa
            acc[record.province].emissionTon += record.carbonEmissionTon
            acc[record.province].count += 1
            return acc
        },
        {} as Record<
            string,
            { areaHa: number; emissionTon: number; count: number }
        >
    )

    // Hitung nilai maksimum untuk normalisasi warna
    const maxArea = Math.max(...Object.values(provinceData).map((d) => d.areaHa), 1)

    const getColor = (areaHa: number) => {
        const intensity = areaHa / maxArea
        if (intensity > 0.8) return '#dc2626' // red-600
        if (intensity > 0.6) return '#ea580c' // orange-600
        if (intensity > 0.4) return '#d97706' // amber-600
        if (intensity > 0.2) return '#65a30d' // lime-600
        if (intensity > 0) return '#16a34a' // green-600
        return '#e5e7eb' // gray-200
    }

    return (
        <div className="h-150 w-full rounded-3xl overflow-hidden border border-gray-300 shadow-lg">
            <MapContainer
                key={`map-${selectedYear || 'all'}-${data.length}`}
                center={[-2.5, 118] as LatLngTuple}
                zoom={5}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {Object.entries(provinceCoordinates).map(([province, coordinates]) => {
                    const data = provinceData[province]
                    if (!data) return null

                    return (
                        <Polygon
                            key={province}
                            positions={coordinates}
                            pathOptions={{
                                fillColor: getColor(data.areaHa),
                                fillOpacity: 0.7,
                                color: '#ffffff',
                                weight: 2,
                            }}
                        >
                            <Popup>
                                <div className="p-3 max-w-xs">
                                    <h3 className="font-semibold text-gray-900 mb-2">{province}</h3>
                                    <div className="space-y-1 text-sm text-gray-600">
                                        <p>
                                            <span className="font-medium">Luas Deforestasi:</span>{' '}
                                            {data.areaHa.toLocaleString('id-ID')} ha
                                        </p>
                                        <p>
                                            <span className="font-medium">Emisi CO₂:</span>{' '}
                                            {data.emissionTon.toLocaleString('id-ID', {
                                                maximumFractionDigits: 0,
                                            })}{' '}
                                            ton
                                        </p>
                                        <p>
                                            <span className="font-medium">Tahun tercatat:</span> {data.count}
                                        </p>
                                    </div>
                                </div>
                            </Popup>
                        </Polygon>
                    )
                })}
            </MapContainer>
        </div>
    )
}
