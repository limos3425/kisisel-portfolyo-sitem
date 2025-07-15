"use client"

import type React from "react"
import { createContext, useState, useContext, type ReactNode, useEffect } from "react"
import type { PortfolioData } from "@/lib/types"

interface PortfolioContextType {
  data: PortfolioData
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export const PortfolioProvider = ({ children, initialData }: { children: ReactNode; initialData: PortfolioData }) => {
  const [data, setData] = useState<PortfolioData>(initialData)

  // --- EKLENDİ: Bu useEffect, sayfa yenilendiğinde (router.refresh)
  // --- context'in yeni verilerle güncellenmesini sağlar.
  // --- Sorunun ana kaynağı buydu.
  useEffect(() => {
    setData(initialData)
  }, [initialData])

  return <PortfolioContext.Provider value={{ data, setData }}>{children}</PortfolioContext.Provider>
}

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider")
  }
  return context
}
