/**
 * Province Coordinates - Data geografis untuk peta
 * Berisi koordinat simplified boundaries untuk setiap provinsi di Indonesia
 */

import type { LatLngTuple } from 'leaflet'

export const PROVINCE_COORDINATES: Record<string, LatLngTuple[][]> = {
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
    'Sumatera Selatan': [
        [
            [101.0, -4.0],
            [104.5, -4.0],
            [104.5, -1.0],
            [101.0, -1.0],
        ],
    ],
    Lampung: [
        [
            [103.5, -6.5],
            [106.0, -6.5],
            [106.0, -4.0],
            [103.5, -4.0],
        ],
    ],
    'Jawa Barat': [
        [
            [106.0, -6.5],
            [108.5, -6.5],
            [108.5, -5.5],
            [106.0, -5.5],
        ],
    ],
    'Jawa Tengah': [
        [
            [108.5, -7.5],
            [111.5, -7.5],
            [111.5, -6.0],
            [108.5, -6.0],
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
    Bali: [
        [
            [114.5, -8.5],
            [115.5, -8.5],
            [115.5, -8.0],
            [114.5, -8.0],
        ],
    ],
    'Kalimantan Barat': [
        [
            [108.5, 0.5],
            [112.0, 0.5],
            [112.0, 3.0],
            [108.5, 3.0],
        ],
    ],
    'Kalimantan Tengah': [
        [
            [112.0, -1.0],
            [115.5, -1.0],
            [115.5, 2.5],
            [112.0, 2.5],
        ],
    ],
    'Kalimantan Selatan': [
        [
            [113.0, -3.0],
            [116.5, -3.0],
            [116.5, -0.5],
            [113.0, -0.5],
        ],
    ],
    'Kalimantan Timur': [
        [
            [115.5, 0.5],
            [119.0, 0.5],
            [119.0, 3.5],
            [115.5, 3.5],
        ],
    ],
    Sulawesi: [
        [
            [118.0, -2.0],
            [122.5, -2.0],
            [122.5, 2.5],
            [118.0, 2.5],
        ],
    ],
    Papua: [
        [
            [130.0, -2.0],
            [141.0, -2.0],
            [141.0, 2.5],
            [130.0, 2.5],
        ],
    ],
}

// Default center map
export const MAP_CENTER: LatLngTuple = [-2.548926, 113.921327] // Pusat Indonesia

// Default zoom level untuk map
export const MAP_DEFAULT_ZOOM = 5
