// 'use client'

// import { TrendingUp } from 'lucide-react'
// import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle
// } from '@/components/ui/card'
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

// // Define ChartConfig type locally
// interface ChartConfig {
//   [key: string]: {
//     label: string
//     color: string
//   }
// }

// interface LineChartBasicProps {
//   title: string
//   subTitle: string
//   footerTitle: string
//   footerDesc: string
//   chartConfiguration: ChartConfig // Use the locally defined ChartConfig type
//   chartData: Array<{ month: string; desktop: number; mobile: number }>
// }

// export function LineChartBasic({
//   title,
//   subTitle,
//   footerTitle,
//   footerDesc,
//   chartConfiguration,
//   chartData
// }: LineChartBasicProps) {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>{title}</CardTitle>
//         <CardDescription>{subTitle}</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfiguration}>
//           <LineChart
//             accessibilityLayer
//             data={chartData}
//             margin={{
//               left: 12,
//               right: 12
//             }}>
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
//             {Object.keys(chartConfiguration).map((key) => {
//               const { label, color } = chartConfiguration[key]
//               return (
//                 <Line
//                   key={key}
//                   dataKey={key}
//                   type="natural"
//                   stroke={color}
//                   strokeWidth={2}
//                   dot={{
//                     fill: color
//                   }}
//                   activeDot={{
//                     r: 6
//                   }}
//                   name={label}
//                 />
//               )
//             })}
//           </LineChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col items-start gap-2 text-sm">
//         <div className="flex gap-2 font-medium leading-none">
//           {footerTitle} <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">{footerDesc}</div>
//       </CardFooter>
//     </Card>
//   )
// }
import React from 'react'

function LineChartBasic() {
  return <p>Line Chart</p>
}

export default LineChartBasic
