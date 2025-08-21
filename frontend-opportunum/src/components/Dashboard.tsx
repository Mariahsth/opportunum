import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, Typography } from "@mui/material";

type DashboardProps = {
  andamentoData: string[];
};

const COLORS = ["#4caf50", "#ff9800", "#f44336"]; 

const andamentoLabels = {
  "Finalizado": "Concluídas",
  "Em andamento": "Em andamento",
  "Não iniciado": "Não iniciadas",
};

export default function Dashboard({ andamentoData }: DashboardProps) {
  const filtered = andamentoData.filter((status) => status);
  if (filtered.length === 0) return null;

  const counts = filtered.reduce<Record<string, number>>((acc, status) => {
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(counts).map(([name, value]) => ({
    name: andamentoLabels[name as keyof typeof andamentoLabels] || name,
    value,
  }));

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h6" align="center" sx={{ mb: 2 }}>
        Status das Ações
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label={({ name, percent }) =>
                percent !== undefined
                  ? `${name} (${(percent * 100).toFixed(0)}%)`
                  : name
              }
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}
