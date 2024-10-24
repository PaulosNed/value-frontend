"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "10/23",
    total: 2,
  },
  {
    name: "10/22",
    total: 3,
  },
  {
    name: "10/21",
    total: 3,
  },
  {
    name: "10/20",
    total: 5,
  },
  {
    name: "10/19",
    total: 1,
  },
  {
    name: "10/18",
    total: 1,
  },
  // {
  //   name: "Jul",
  //   total: Math.floor(Math.random() * 5000) + 1000,
  // },
  // {
  //   name: "Aug",
  //   total: Math.floor(Math.random() * 5000) + 1000,
  // },
  // {
  //   name: "Sep",
  //   total: Math.floor(Math.random() * 5000) + 1000,
  // },
  // {
  //   name: "Oct",
  //   total: Math.floor(Math.random() * 5000) + 1000,
  // },
  // {
  //   name: "Nov",
  //   total: Math.floor(Math.random() * 5000) + 1000,
  // },
  // {
  //   name: "Dec",
  //   total: Math.floor(Math.random() * 5000) + 1000,
  // },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
