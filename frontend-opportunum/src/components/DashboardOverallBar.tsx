import { useMediaQuery } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
  Cell,
} from "recharts";
import { useTheme } from "@mui/material/styles";

interface DashboardOverallBarProps {
  andamentoGeral: Record<string, number>;
}

export default function DashboardOverallBar({
  andamentoGeral,
}: DashboardOverallBarProps) {
  const data = Object.entries(andamentoGeral).map(([status, count]) => ({
    status: status === "pendente" ? "Não iniciado" : status === "em andamento" ? "Em andamento" : "Concluído",
    count,
  }));

  const total = data.reduce((sum, d) => sum + d.count, 0);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const colors: Record<string, string> = {
    Concluído: "#4caf50",
    "Em andamento": "#ff9800",
    "Não iniciado": "#f44336",
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        layout="horizontal"
        margin={{
          top: 20,
          right: isSmall ? 10 : 10,
          left: isSmall ? 5 : 5,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="status" type="category" tick={{ fontSize: isSmall ? 10 : 12 }}/>
        <YAxis
          type="number"
          tick={{ fontSize: isSmall ? 10 : 12 }}
          label={{
            value: "Quantidade de Tarefas",
            angle: -90,
            position: "outsideLeft",

            style: { textAnchor: "middle", fontSize: isSmall ? 10 : 12},
          }}
        />
        <Tooltip />

        <Bar dataKey="count" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[entry.status]} />
          ))}
          <LabelList
            dataKey="count"
            position="insideTop"
            formatter={(value: unknown) => {
              if (typeof value === "number" && total > 0) {
                return `${((value / total) * 100).toFixed(1)}%`;
              }
              return "";
            }}
            style={{ fill: "#fff", fontWeight: "bold" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
