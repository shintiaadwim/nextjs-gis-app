'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// Dynamic import untuk menghindari SSR issues dengan Leaflet
const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false, loading: () => <MapLoader /> }
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

function MapLoader() {
    return (
        <div className="h-60 sm:h-80 md:h-96 lg:h-112 w-full rounded-xl sm:rounded-2xl overflow-hidden border border-gray-300 shadow-md sm:shadow-lg bg-gray-50 flex items-center justify-center">
            <p className="text-gray-500">Memuat peta...</p>
        </div>
    )
}

import { DeforestationRecord } from '@/lib/types'
import { PROVINCE_COORDINATES, MAP_CENTER, MAP_DEFAULT_ZOOM } from '@/data/provinceCoordinates'

interface DeforestationMapProps {
    data: DeforestationRecord[]
    selectedYear?: number
}

export default function DeforestationMap({
    data,
    selectedYear,
}: DeforestationMapProps) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return <MapLoader />
    }

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
        <div className="h-60 sm:h-80 md:h-96 lg:h-112 w-full rounded-xl sm:rounded-2xl overflow-hidden border border-gray-300 shadow-md sm:shadow-lg">
            <MapContent
                provinceData={provinceData}
                getColor={getColor}
            />
        </div>
    )
}

function MapContent({
    provinceData,
    getColor,
}: {
    provinceData: Record<string, { areaHa: number; emissionTon: number; count: number }>
    getColor: (areaHa: number) => string
}) {
    return (
        <MapContainer
            center={MAP_CENTER}
            zoom={MAP_DEFAULT_ZOOM}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {Object.entries(PROVINCE_COORDINATES).map(([province, coordinates]) => {
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
    )
}
