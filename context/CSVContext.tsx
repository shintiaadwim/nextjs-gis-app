'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export interface CSVContextType {
    // Data
    carbonData: Record<string, string | number>[]
    treeData: Record<string, string | number>[]
    forestData: Record<string, string | number>[]
    driversData: Record<string, string | number>[]
    provinceCarbonData: Record<string, string | number>[]
    provinceTreeData: Record<string, string | number>[]
    provinceForestData: Record<string, string | number>[]
    provinceDriversData: Record<string, string | number>[]

    // Filter state
    selectedYear: string
    selectedProvince: string
    setSelectedYear: (year: string) => void
    setSelectedProvince: (province: string) => void

    // Loading & Error
    loading: boolean
    error: string | null

    // Utility
    getFilteredData: (data: Record<string, string | number>[]) => Record<string, string | number>[]
}

const CSVContext = createContext<CSVContextType | undefined>(undefined)

export function CSVProvider({ children }: { children: ReactNode }) {
    // Data states
    const [carbonData, setCarbonData] = useState<Record<string, string | number>[]>([])
    const [treeData, setTreeData] = useState<Record<string, string | number>[]>([])
    const [forestData, setForestData] = useState<Record<string, string | number>[]>([])
    const [driversData, setDriversData] = useState<Record<string, string | number>[]>([])
    const [provinceCarbonData, setProvinceCarbonData] = useState<Record<string, string | number>[]>([])
    const [provinceTreeData, setProvinceTreeData] = useState<Record<string, string | number>[]>([])
    const [provinceForestData, setProvinceForestData] = useState<Record<string, string | number>[]>([])
    const [provinceDriversData, setProvinceDriversData] = useState<Record<string, string | number>[]>([])

    // Filter states
    const [selectedYear, setSelectedYear] = useState('all')
    const [selectedProvince, setSelectedProvince] = useState('all')

    // Loading & Error
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Fetch all data on mount from unified /api/data endpoint
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true)
                setError(null)

                // Fetch all data from unified endpoint
                const response = await fetch('/api/data')
                if (!response.ok) throw new Error('Failed to fetch data')
                const result = await response.json() as { data: Record<string, string | number>[] }

                // Use same data for all datasets (since we have unified data source)
                const data = result.data || []
                setCarbonData(data)
                setTreeData(data)
                setForestData(data)
                setDriversData(data)
                setProvinceCarbonData(data)
                setProvinceTreeData(data)
                setProvinceForestData(data)
                setProvinceDriversData(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
                console.error('Error fetching data:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchAllData()
    }, [])

    // Filter data based on selected year and province
    const getFilteredData = (data: Record<string, string | number>[]) => {
        if (!data.length) return []

        let filtered = [...data]

        // Filter by province if available and not "all"
        if (selectedProvince !== 'all' && data[0]['Province']) {
            filtered = filtered.filter(
                (row) => String(row['Province']).toLowerCase() === selectedProvince.toLowerCase()
            )
        }

        // Filter by year if available and not "all"
        if (selectedYear !== 'all' && data[0]['Year']) {
            filtered = filtered.filter((row) => String(row['Year']) === selectedYear)
        }

        return filtered
    }

    const value: CSVContextType = {
        carbonData,
        treeData,
        forestData,
        driversData,
        provinceCarbonData,
        provinceTreeData,
        provinceForestData,
        provinceDriversData,
        selectedYear,
        selectedProvince,
        setSelectedYear,
        setSelectedProvince,
        loading,
        error,
        getFilteredData,
    }

    return <CSVContext.Provider value={value}>{children}</CSVContext.Provider>
}

export function useCSVContext() {
    const context = useContext(CSVContext)
    if (!context) {
        throw new Error('useCSVContext must be used within CSVProvider')
    }
    return context
}
