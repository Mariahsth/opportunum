import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { RowData } from "../interface/RowData";

type Atividade = {
  status: RowData["andamento"];
  dueDate: string;
};

type DashboardDeadlineProps = {
  atividades: Atividade[];
};

const STATUS_COLORS: Record<string, string> = {
  "Dentro do Prazo": "#4caf50", 
  "Atrasadas": "#f44336",       
};

export default function DashboardDeadline({ atividades }: DashboardDeadlineProps) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const pendentes = atividades.filter(
    (a) => a.status === "em andamento" || a.status === "pendente"
  );

  if (pendentes.length === 0) return null;

  const hoje = new Date();

  const counts = pendentes.reduce(
    (acc, atividade) => {
      const vencimento = new Date(atividade.dueDate);
      if (vencimento >= hoje) {
        acc.dentroPrazo++;
      } else {
        acc.atrasadas++;
      }
      return acc;
    },
    { dentroPrazo: 0, atrasadas: 0 }
  );

  const chartData = [
    { name: "Dentro do Prazo", value: counts.dentroPrazo, color: STATUS_COLORS["Dentro do Prazo"] },
    { name: "Atrasadas", value: counts.atrasadas, color: STATUS_COLORS["Atrasadas"] },
  ];

  return (
    <Box
      sx={{
        mt: 5,
        width: "100%",
        height: { xs: 320, sm: 380, md: 420 }, 
      }}
    >
      <Typography variant="h6" align="center" sx={{ mb: 2 }}>
        Prazo das Atividades Pendentes
      </Typography>
      <ResponsiveContainer width="100%" height={isSmall ? 250 : 400}>
        <PieChart margin={{ bottom: 50}} >
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={isSmall ? 50 : 100}
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
