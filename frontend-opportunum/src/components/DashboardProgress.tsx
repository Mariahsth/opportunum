import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type DashboardProps = {
  andamentoData: string[];
};

const STATUS_COLORS: Record<string, string> = {
  "concluído": "#4caf50",     
  "em andamento": "#ff9800",  
  "pendente": "#f44336",   
};

const andamentoLabels: Record<string, string> = {
  "concluído": "Concluído",
  "em andamento": "Em andamento",
  "pendente": "Não iniciadas",
};

export default function DashboardProgress({ andamentoData }: DashboardProps) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const filtered = andamentoData.filter((status) => status);
  if (filtered.length === 0) return null;

  const counts = filtered.reduce<Record<string, number>>((acc, status) => {
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(counts).map(([name, value]) => ({
    name: andamentoLabels[name] || name,
    value,
    color: STATUS_COLORS[name] || "#999999",
  }));

  return (
    <Box
      sx={{
        mt: 5,
        width: "100%",
        height: { xs: 320, sm: 380, md: 420 }, 
      }}
    >
      <Typography variant="h6" align="center" sx={{ mb: 2 }}>
        Status das Ações
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ bottom: 50 }}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={isSmall ? 50 : 100} 
            innerRadius={isSmall ? 30 : 70}
            dataKey="value"
            label={
              isSmall
                ? ({ percent }) =>
                  percent !== undefined ?
                  `${(percent * 100).toFixed(0)}%`
                  :
                  false
                : ({ name, percent }) =>
                    percent !== undefined
                      ? `${name} (${(percent * 100).toFixed(0)}%)`
                      : name
            }
            fontSize={isSmall ? '12px' : '14px'}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout={isSmall ? "vertical" : "horizontal"} 
          align="center"
          wrapperStyle={{
            fontSize: isSmall ? "12px" : "14px",
            maxWidth: "100%",
            whiteSpace: "pre-wrap",
          }}/>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}
