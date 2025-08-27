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
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { formatDateForDisplay } from "../utils/formatDate";
import type { RowData } from "../interface/RowData";
import DashboardProgress from "./DashboardProgress";
import DashboardDeadline from "./DashboardDeadline";

const columns: {
  field: keyof RowData | "acoes";
  label: string;
  width?: string;
}[] = [
  { field: "prazo", label: "Prazo" },
  { field: "kr", label: "KR" },
  { field: "resultado", label: "Resultados Chave (Mensurável)", width: "50%" },
  { field: "responsavel", label: "Responsáveis" },
  { field: "andamento", label: "Andamento" },
  { field: "acoes", label: "Ações" },
];

export default function CustomTable() {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editRow, setEditRow] = useState<RowData | null>(null);
  const [loading, setLoading] = useState(false);

  const [rows, setRows] = useState<RowData[]>([
    { prazo: "", kr: "", resultado: "", responsavel: "", andamento: "" },
  ]);

  const handleAddLine = () => {
    const novaLinha: RowData = {
      prazo: "",
      kr: "",
      resultado: "",
      responsavel: "",
      andamento: "",
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
    if (!editRow || !editRow.andamento) {
      return;
    }

    setLoading(true);
    const updatedRows = [...rows];
    updatedRows[index] = editRow;
    setRows(updatedRows);
    setEditIndex(null);
    setEditRow(null);
    setLoading(false);
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

          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} hover>
                {columns.map((col) => {
                  if (col.field === "acoes") {
                    const isEditing = editIndex === index;
                    const isAndamentoEmpty = isEditing && !editRow?.andamento;

                    return (
                      <TableCell key="acoes" align="center">
                        {isEditing ? (
                          <>
                            <IconButton
                              size="small"
                              color="success"
                              onClick={() => handleSave(index)}
                              disabled={loading || !!isAndamentoEmpty}
                            >
                              <SaveIcon fontSize="small" />
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
                    );
                  }

                  const value = row[col.field as keyof RowData];
                  const isEditing = editIndex === index;

                  return (
                    <TableCell
                      key={col.field}
                      align="center"
                      sx={{ verticalAlign: "top" }}
                    >
                      {isEditing ? (
                        col.field === "andamento" ? (
                          <FormControl
                            size="small"
                            error={!editRow?.andamento}
                            sx={{ minWidth: 160 }}
                          >
                            <Select
                              size="small"
                              value={editRow?.andamento || ""}
                              onChange={(e) =>
                                handleChange("andamento", e.target.value)
                              }
                              displayEmpty
                              renderValue={(selected) =>
                                selected ? (
                                  selected
                                ) : (
                                  <em style={{ opacity: 0.7 }}>Selecione</em>
                                )
                              }
                            >
                              <MenuItem value="">
                                <em>Selecione</em>
                              </MenuItem>
                              <MenuItem value="Não iniciado">
                                Não iniciado
                              </MenuItem>
                              <MenuItem value="Em andamento">
                                Em andamento
                              </MenuItem>
                              <MenuItem value="Finalizado">Finalizado</MenuItem>
                            </Select>
                            {!editRow?.andamento && (
                              <FormHelperText>Obrigatório</FormHelperText>
                            )}
                          </FormControl>
                        ) : col.field === "prazo" ? (
                          <TextField
                            type="date"
                            size="small"
                            value={editRow?.prazo || ""}
                            onChange={(e) =>
                              handleChange("prazo", e.target.value)
                            }
                          />
                        ) : (
                          <TextField
                            fullWidth={col.field === "resultado"}
                            size="small"
                            multiline={col.field === "resultado"}
                            maxRows={6}
                            value={editRow?.[col.field as keyof RowData] || ""}
                            onChange={(e) =>
                              handleChange(
                                col.field as keyof RowData,
                                e.target.value
                              )
                            }
                            sx={{ resize: "none" }}
                          />
                        )
                      ) : col.field === "prazo" ? (
                        formatDateForDisplay(value)
                      ) : col.field === "andamento" ? (
                        value ? (
                          value
                        ) : (
                          <Box
                            component="span"
                            sx={{ color: "error.main", fontStyle: "italic" }}
                          >
                            Não selecionado
                          </Box>
                        )
                      ) : col.field === "resultado" ? (
                        <Box
                          sx={{
                            whiteSpace: "pre-wrap",
                            textAlign: "left",
                            maxWidth: "100%",
                            wordBreak: "break-word",
                          }}
                        >
                          {value}
                        </Box>
                      ) : (
                        value
                      )}
                    </TableCell>
                  );
                })}
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

      {rows.some((row) => row.andamento) && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, 
            width: "100%",
            alignItems: "stretch", 
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <DashboardProgress
              andamentoData={rows.map((row) => row.andamento)}
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <DashboardDeadline
              atividades={rows.map((row) => ({
                status: row.andamento as RowData["andamento"],
                dueDate: row.prazo,
              }))}
            />
          </Box>
        </Box>
      )}
    </>
  );
}
