'use client'

import { Hero } from '@/src/components/Hero'
import Footer from '../../components/Footer'
import { useRef } from 'react'
import { DataSource } from '../../components/DataSource'
import { SectionTable } from '../../components/SectionTable'
import { SectionChart } from '../../components/SectionChart'
import { CurrencyProvider } from '../../providers/CurrencyProvider'

export function Home() {
  const chartRef = useRef<HTMLElement | null>(null)
  const tableRef = useRef<HTMLElement | null>(null)

  function scrollToChart() {
    chartRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  function scrollToTable() {
    tableRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <CurrencyProvider>
      <Hero onClickViewChart={scrollToChart} onClickViewTable={scrollToTable} />
      <main className="container min-h-screen space-y-20 px-4 py-6">
        <SectionChart ref={chartRef} />
        <SectionTable ref={tableRef} />
        <div className="space-y-4">
          <DataSource />
        </div>
      </main>
      <Footer />
    </CurrencyProvider>
  )
}
