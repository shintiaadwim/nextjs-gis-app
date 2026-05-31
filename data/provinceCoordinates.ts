/**
 * Province Coordinates - Data geografis untuk peta
 * Berisi koordinat simplified boundaries untuk setiap provinsi di Indonesia
 */

import type { LatLngTuple } from 'leaflet'

export const PROVINCE_COORDINATES: Record<string, LatLngTuple[][]> = {
    Aceh: [
        [
            [4.0, 95.0],
            [4.0, 97.5],
            [6.0, 97.5],
            [6.0, 95.0],
        ],
    ],
    'Sumatera Utara': [
        [
            [1.0, 97.5],
            [1.0, 100.0],
            [4.0, 100.0],
            [4.0, 97.5],
        ],
    ],
    'Sumatera Barat': [
        [
            [-1.0, 98.5],
            [-1.0, 101.0],
            [1.0, 101.0],
            [1.0, 98.5],
        ],
    ],
    'Sumatera Selatan': [
        [
            [-4.0, 101.0],
            [-4.0, 104.5],
            [-1.0, 104.5],
            [-1.0, 101.0],
        ],
    ],
    Lampung: [
        [
            [-6.5, 103.5],
            [-6.5, 106.0],
            [-4.0, 106.0],
            [-4.0, 103.5],
        ],
    ],
    'Jawa Barat': [
        [
            [-6.5, 106.0],
            [-6.5, 108.5],
            [-5.5, 108.5],
            [-5.5, 106.0],
        ],
    ],
    'Jawa Tengah': [
        [
            [-7.5, 108.5],
            [-7.5, 111.5],
            [-6.0, 111.5],
            [-6.0, 108.5],
        ],
    ],
    'Jawa Timur': [
        [
            [-8.5, 111.5],
            [-8.5, 114.5],
            [-6.5, 114.5],
            [-6.5, 111.5],
        ],
    ],
    Bali: [
        [
            [-8.5, 114.5],
            [-8.5, 115.5],
            [-8.0, 115.5],
            [-8.0, 114.5],
        ],
    ],
    'Kalimantan Barat': [
        [
            [0.5, 108.5],
            [0.5, 112.0],
            [3.0, 112.0],
            [3.0, 108.5],
        ],
    ],
    'Kalimantan Tengah': [
        [
            [-1.0, 112.0],
            [-1.0, 115.5],
            [2.5, 115.5],
            [2.5, 112.0],
        ],
    ],
    'Kalimantan Selatan': [
        [
            [-3.0, 113.0],
            [-3.0, 116.5],
            [-0.5, 116.5],
            [-0.5, 113.0],
        ],
    ],
    'Kalimantan Timur': [
        [
            [0.5, 115.5],
            [0.5, 119.0],
            [3.5, 119.0],
            [3.5, 115.5],
        ],
    ],
    Sulawesi: [
        [
            [-2.0, 118.0],
            [-2.0, 122.5],
            [2.5, 122.5],
            [2.5, 118.0],
        ],
    ],
    Papua: [
        [
            [-2.0, 130.0],
            [-2.0, 141.0],
            [2.5, 141.0],
            [2.5, 130.0],
        ],
    ],
}

// Default center map
export const MAP_CENTER: LatLngTuple = [-2.548926, 113.921327] // Pusat Indonesia

// Default zoom level untuk map
export const MAP_DEFAULT_ZOOM = 5
