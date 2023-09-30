"use client";

import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import React, { useEffect, useState } from "react";
import { calculateColumnCounts } from "@/utils/csvHelpers";
import SmallSpinner from "../loaders/smallSpinner";

export const AnalyticsSection = ({
  rawData,
  parsedData,
}: {
  rawData: object[] | null;
  parsedData: object[] | null;
}) => {
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active: boolean | undefined;
    payload: any;
    label: string;
  }) => {
    if (active && payload && payload.length > 0) {
      return (
        <div className="flex flex-col items-center rounded-lg bg-zinc-950 p-2 text-sm outline outline-1 outline-slate-700">
          <div>{`On Row - ${label + 1}`}</div>
          <div>{`Raw Columns - ${payload[0].value}`}</div>
          <div>{`Parsed Columns - ${payload[1].value}`}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="my-2 mt-8 text-xl uppercase">analytics</div>
      <div className="h-72 w-full">
        {rawData && parsedData ? (
          <ResponsiveContainer>
            <AreaChart
              width={500}
              height={400}
              data={calculateColumnCounts(rawData, parsedData)}
              margin={{
                top: -26,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <Tooltip
                content={(event) => (
                  <CustomTooltip
                    active={event.active}
                    label={event.label}
                    payload={event.payload}
                  />
                )}
              />
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fff" stopOpacity={1} />
                  <stop offset="95%" stopColor="fff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#facc15" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="rawColumns"
                stroke="white"
                fill="url(#colorUv)"
              />
              <Area
                type="monotone"
                dataKey="parsedColumns"
                stroke="#facc15"
                fill="url(#colorPv)"
              />
              <Legend
                iconType="diamond"
                payload={[
                  {
                    value: "Raw Columns",
                    type: "diamond",
                    id: "rawColumns",
                    color: "#fff",
                  },
                  {
                    value: "Parsed Columns",
                    type: "diamond",
                    id: "parsedColumns",
                    color: "#facc15",
                  },
                ]}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <SmallSpinner />
        )}
      </div>
    </>
  );
};
