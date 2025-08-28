import {
  TableCell,
  TableRow,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { formatDateForDisplay } from "../../utils/formatDate";
import type { TableRowItemProps } from "./types";
import { useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { IProject } from "../../interface/Project";

export default function TableRowItem({
  row,
  index,
  isEditing,
  editRow,
  onEdit,
  onDelete,
  onCancel,
  onSave,
  onChange,
  loading,
}: TableRowItemProps) {
  const columns: (keyof typeof row | "acoes")[] = [
    "prazo",
    "kr",
    "resultado",
    "responsavel",
    "andamento",
    "acoes",
  ];

  const { users, user } = useAuth();
  const isMaster = user?.roles.includes("master");
  const isAdmin = user?.roles.includes("admin");

  const responsibleUsers = useMemo(() => {
    if (!row.projectId) return [];

    return users.filter((user) =>
      user.projects?.some(
        (project) =>
          String((project as IProject)._id ?? project) === String(row.projectId)
      )
    );
  }, [users, row.projectId]);

  return (
    <TableRow key={row._id || index} hover>
      {columns.map((col) => {
        if (col === "acoes") {
          const isAndamentoEmpty = isEditing && !editRow?.andamento;
          return (
            <TableCell key="acoes" align="center">
              {isEditing ? (
                <>
                  <IconButton
                    aria-label="salvar"
                    size="small"
                    color="success"
                    onClick={() => onSave(index)}
                    disabled={loading || !!isAndamentoEmpty}
                  >
                    <SaveIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="cancelar"
                    size="small"
                    color="error"
                    onClick={onCancel}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton
                    aria-label="editar"
                    size="small"
                    onClick={() => onEdit(index)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  {(isMaster || isAdmin) && (
                    <IconButton
                      aria-label="excluir"
                      size="small"
                      onClick={() => onDelete(index)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </>
              )}
            </TableCell>
          );
        }

        const value = row[col as keyof typeof row];

        return (
          <TableCell key={col} align="center" sx={{ verticalAlign: "top" }}>
            {isEditing ? (
              col === "andamento" ? (
                <FormControl
                  size="small"
                  error={!editRow?.andamento}
                  sx={{ minWidth: 160 }}
                >
                  <Select
                    size="small"
                    value={editRow?.andamento || ""}
                    onChange={(e) => onChange("andamento", e.target.value)}
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
                    <MenuItem value="pendente">Pendente</MenuItem>
                    <MenuItem value="em andamento">Em andamento</MenuItem>
                    <MenuItem value="concluído">Concluído</MenuItem>
                  </Select>
                  {!editRow?.andamento && (
                    <FormHelperText>Obrigatório</FormHelperText>
                  )}
                </FormControl>
              ) : col === "prazo" ? (
                <TextField
                  type="date"
                  size="small"
                  value={editRow?.prazo || ""}
                  onChange={(e) => onChange("prazo", e.target.value)}
                />
              ) : col === "responsavel" ? (
                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <Select
                    multiple
                    size="small"
                    value={editRow?.responsavelIds || []}
                    onChange={(e) => {
                      const selectedIds = e.target.value as string[];

                      const selectedNames = responsibleUsers
                        .filter((u) => selectedIds.includes(u._id))
                        .map((u) => u.name)
                        .join(", ");

                      onChange("responsavelIds", selectedIds);
                      onChange("responsavel", selectedNames);
                    }}
                    displayEmpty
                    renderValue={(selected) =>
                      (selected as string[]).length > 0 ? (
                        responsibleUsers
                          .filter((u) => (selected as string[]).includes(u._id))
                          .map((u) => u.name)
                          .join(", ")
                      ) : (
                        <em style={{ opacity: 0.7 }}>Selecione</em>
                      )
                    }
                  >
                    <MenuItem value="">
                      <em>Selecione</em>
                    </MenuItem>
                    {responsibleUsers.map((user) => (
                      <MenuItem key={user._id} value={user._id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                sx={{
                  ...(col === "kr" && { minWidth: 120  })
                }}
                  fullWidth={col === "resultado"}
                  size="small"
                  multiline={col === "resultado"}
                  maxRows={6}
                  value={editRow?.[col as keyof typeof editRow] || ""}
                  onChange={(e) =>
                    onChange(col as keyof typeof editRow, e.target.value)
                  }
                />
              )
            ) : col === "prazo" ? (
              formatDateForDisplay(String(value ?? ""))
            ) : col === "andamento" ? (
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
            ) : col === "resultado" ? (
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
            ) : col === "responsavel" ? (
              row.responsavelIds && row.responsavelIds.length > 0 ? (
                responsibleUsers
                  .filter((u) => row.responsavelIds?.includes(u._id))
                  .map((u) => u.name)
                  .join(", ")
              ) : (
                <Box sx={{ fontStyle: "italic", color: "text.disabled" }}>
                  Não atribuído
                </Box>
              )
            ) : (
              value
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
