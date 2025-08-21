import {
  Box,
  TextField,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { formatDate } from "../utils/formatDate";
import type { RowData } from "../interface/RowData";

const primeiraColuna = [
  "Prazo",
  "KR",
  "Resultados Chave (Mensurável)",
  "Responsáveis",
  "Ações",
];

export default function CustomTable() {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editRow, setEditRow] = useState<RowData | null>(null);
  const [loading, setLoading] = useState(false);

  const [rows, setRows] = useState<RowData[]>([
    {
      prazo: "-",
      kr: "",
      resultado: "",
      responsavel: "",
    },
  ]);

  const handleAddLine = () => {
    const novaLinha = {
      prazo: "",
      kr: "",
      resultado: "",
      responsavel: "",
    };

    setRows((prevRows) => [...prevRows, novaLinha]);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditRow({ ...rows[index] });
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditRow(null);
  };

  const handleSave = (index: number) => {
    setLoading(true)
    if (!editRow) return;
    const updatedRows = [...rows];
    updatedRows[index] = editRow;
    setRows(updatedRows);
    setEditIndex(null);
    setEditRow(null);
    setLoading(false)
  };

  const handleChange = (field: keyof RowData, value: string) => {
    setEditRow((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  return (
    <>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              {primeiraColuna.map((titulo, index) => (
                <TableCell
                  align="center"
                  key={index}
                  sx={{
                    color: "var(--color-text-blue)",
                    fontWeight: 600,
                    ...(index === 2 && { width: "50%" }),
                  }}
                >
                  {titulo}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} hover>
                <TableCell>
                  {editIndex === index ? (
                    <TextField
                      type="date"
                      value={editRow?.prazo || ""}
                      onChange={(e) => handleChange("prazo", e.target.value)}
                      size="small"
                    />
                  ) : (
                    formatDate(row.prazo)
                  )}
                </TableCell>
                <TableCell>
                  {editIndex === index ? (
                    <TextField
                      value={editRow?.kr || ""}
                      onChange={(e) => handleChange("kr", e.target.value)}
                      size="small"
                    />
                  ) : (
                    row.kr
                  )}
                </TableCell>
                <TableCell>
                  {editIndex === index ? (
                    <TextField
                      fullWidth
                      value={editRow?.resultado || ""}
                      onChange={(e) =>
                        handleChange("resultado", e.target.value)
                      }
                      size="small"
                    />
                  ) : (
                    row.resultado
                  )}
                </TableCell>
                <TableCell>
                  {editIndex === index ? (
                    <TextField
                      value={editRow?.responsavel || ""}
                      onChange={(e) =>
                        handleChange("responsavel", e.target.value)
                      }
                      size="small"
                    />
                  ) : (
                    row.responsavel
                  )}
                </TableCell>
                <TableCell align="center">
                  {editIndex === index ? (
                    <>
                      <IconButton
                        size="small"
                        color="success"
                        loading={loading}
                        onClick={() => handleSave(index)}
                      >
                        <SaveIcon fontSize="small"  />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={handleCancel}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(index)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() =>
                          setRows(rows.filter((_, i) => i !== index))
                        }
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Button onClick={handleAddLine} variant="outlined">
          Adicionar linha
        </Button>
      </Box>
    </>
  );
}
