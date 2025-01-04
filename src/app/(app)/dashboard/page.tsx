'use client'
import { LineChartBasic } from '@/components/charts/LineChartBasic'
import { ChartConfig } from '@/components/ui/chart'
import React from 'react'
import moment from 'moment'
import Header from '@/components/header'
import { Globe } from 'lucide-react'

function Page() {
  const start = moment().month(0).startOf('month') // January
  const end = moment().month(5).endOf('month') // June
  const formattedDateRange = `${start.format('MMMM')} - ${end.format('MMMM YYYY')}`

  const chartData = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 }
  ]

  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: 'hsl(var(--chart-1))'
    },
    mobile: {
      label: 'Mobile',
      color: 'hsl(var(--chart-2))'
    }
  } satisfies ChartConfig

  return (
    <>
      <Header
        title="Dashboard"
        desc="Track your blog's performance with insights on traffic, content, and engagement."
        styles="mb-5"
        buttons
        buttonLink="/domains"
        buttonTitle="Create Domains"
        icon={Globe}
      />
      <div className="grid grid-cols lg:grid-cols-3">
        <LineChartBasic
          chartData={chartData}
          chartConfig={chartConfig}
          title="Active Users Trend Over Time"
          subTitle={formattedDateRange}
          footerTitle="Trending up by 5.2% this month"
          footerDesc="Active users over the past 6 months, page views over time, bounce rate trends."
        />
      </div>
    </>
  )
}

export default Page
