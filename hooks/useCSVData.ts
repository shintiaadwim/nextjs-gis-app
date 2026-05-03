'use client'

import { useEffect, useState } from 'react'

export interface CSVData {
    data: Record<string, string | number>[]
    fileName: string
    loading: boolean
    error: string | null
}

export function useCSVData(fileName: string): CSVData {
    const [data, setData] = useState<Record<string, string | number>[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [csvFileName, setCSVFileName] = useState('')

    useEffect(() => {
        const fetchCSV = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await fetch(`/api/csv?file=${fileName}`)

                if (!response.ok) {
                    throw new Error(`Failed to fetch CSV: ${response.statusText}`)
                }

                const result = await response.json() as { error?: string; data: Record<string, string | number>[]; fileName: string }
                if (result.error) {
                    throw new Error(result.error)
                }

                setData(result.data)
                setCSVFileName(result.fileName)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
                setData([])
            } finally {
                setLoading(false)
            }
        }

        if (fileName) {
            fetchCSV()
        }
    }, [fileName])

    return {
        data,
        fileName: csvFileName,
        loading,
        error,
    }
}
