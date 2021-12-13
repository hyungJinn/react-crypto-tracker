import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDartAtom } from "../atoms";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDartAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading price..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => [
                new Date(price.time_close).getTime(),
                [
                  price.open.toFixed(2),
                  price.high.toFixed(2),
                  price.low.toFixed(2),
                  price.close.toFixed(2),
                ],
              ]),
            },
          ]}
          options={{
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#e84118",
                  downward: "#00a8ff",
                },
                wick: {
                  useFillColor: true,
                },
              },
            },
            theme: { mode: isDark ? "dark" : "light" },
            chart: {
              // type: "candlestick",
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            // grid: { show: false },
            yaxis: {
              show: true,
              tooltip: {
                enabled: true,
              },
            },
            xaxis: {
              // axisBorder: { show: false },
              // axisTicks: { show: false },
              // labels: { show: false },
              type: "datetime",
              // categories: data?.map((price) => price.time_close),
            },
            tooltip: {
              y: { formatter: (value) => `${value.toFixed(2)}` },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
