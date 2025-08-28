import { Box } from "@mui/material";
import DashboardProgress from "../DashboardProgress";
import DashboardDeadline from "../DashboardDeadline";
import type { RowData } from "../../interface/RowData";

export default function SummaryDashboards({ rows }: { rows: RowData[] }) {
  if (!rows.some((row) => row.andamento)) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        alignItems: "stretch",
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <DashboardProgress andamentoData={rows.map((row) => row.andamento)} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <DashboardDeadline
          atividades={rows.map((row) => ({
            status: row.andamento,
            dueDate: row.prazo,
          }))}
        />
      </Box>
    </Box>
  );
}
