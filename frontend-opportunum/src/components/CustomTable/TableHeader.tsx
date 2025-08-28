import { TableHead, TableRow, TableCell } from "@mui/material";
import type { Column } from "./types";

const columns: Column[] = [
  { field: "prazo", label: "Prazo" },
  { field: "kr", label: "KR" },
  { field: "resultado", label: "Resultados Chave (Mensurável)", width: "50%" },
  { field: "responsavel", label: "Responsáveis" },
  { field: "andamento", label: "Andamento" },
  { field: "acoes", label: "Ações" },
];

export default function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        {columns.map((col) => (
          <TableCell
            key={col.field}
            align="center"
            sx={{
              color: "var(--color-text-blue)",
              fontWeight: 600,
              ...(col.width && { width: col.width }),
            }}
          >
            {col.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
