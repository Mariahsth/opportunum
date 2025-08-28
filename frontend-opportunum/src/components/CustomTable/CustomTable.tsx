import { Table, TableContainer, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  fetchTasksByProject,
  createTask,
  updateTask,
  deleteTask,
} from "../../services/taskService";
import TableHeader from "./TableHeader";
import TableRowItem from "./TableRowItem";
import AddLineButton from "./AddLineButton";
import SummaryDashboards from "./SummaryDashboards";
import type { RowData } from "../../interface/RowData";
import type { ITask } from "../../interface/Task";

export default function CustomTable({ projectId }: { projectId?: string }) {
  const [rows, setRows] = useState<RowData[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editRow, setEditRow] = useState<RowData | null>(null);
  const [loading, setLoading] = useState(false);
  const { users } = useAuth();

  useEffect(() => {
    if (!projectId) return;

    const loadTasks = async () => {
      try {
        const tasks = await fetchTasksByProject(projectId);
        const formatted = tasks.map((task) => ({
          _id: task._id,
          prazo:
            typeof task.prazo === "string"
              ? task.prazo.split("T")[0]
              : task.prazo
              ? new Date(task.prazo).toISOString().split("T")[0]
              : "",
          kr: task.KR,
          resultado: task.resultados,
          responsavel: task.responsaveis
            .map((id) => {
              const user = users.find(
                (u) => u._id === (typeof id === "string" ? id : id._id)
              );
              return user?.name || (typeof id === "string" ? id : id._id);
            })
            .join(", "),
          responsavelIds: task.responsaveis.map((r) =>
            typeof r === "string" ? r : r._id
          ),
          andamento: task.status,
          projectId: projectId!,
        }));
        setRows(formatted);
      } catch (err) {
        console.error("Erro ao carregar tarefas", err);
      }
    };

    loadTasks();
  }, [projectId, users]);

  const handleAddLine = () => {
    const novaLinha: RowData = {
      prazo: "",
      kr: "",
      resultado: "",
      responsavel: "",
      responsavelIds: [],
      andamento: "",
      projectId: projectId ?? "",
    };
    setRows((prev) => [...prev, novaLinha]);
    setEditIndex(rows.length);
    setEditRow(novaLinha);
  };

  const handleSave = async (index: number) => {
    if (!projectId || !editRow || !editRow.andamento) return;

    setLoading(true);

    const payload = {
      projId: projectId,
      prazo: editRow.prazo,
      KR: editRow.kr,
      resultados: editRow.resultado,
      responsaveis: editRow.responsavelIds || [],
      status: editRow.andamento as ITask["status"],
    };
    if (!editRow.kr || !editRow.resultado || !editRow.andamento) {
      alert("Preencha todos os campos obrigatórios antes de salvar.");
      setLoading(false);
      return;
    }
    try {
      let updated;
      if (editRow._id) {
        updated = await updateTask(editRow._id, payload);
      } else {
        updated = await createTask(payload);
      }

      const updatedRow: RowData = {
        _id: updated._id,
        prazo:
          typeof updated.prazo === "string"
            ? updated.prazo.split("T")[0]
            : updated.prazo
            ? new Date(updated.prazo).toISOString().split("T")[0]
            : "",
        kr: updated.KR,
        resultado: updated.resultados,
        responsavel: updated.responsaveis
          .map((id) => {
            const user = users.find((u) => u._id === id);
            return user?.name || id;
          })
          .join(", "),
        responsavelIds: updated.responsaveis.map((r) =>
          typeof r === "string" ? r : r._id
        ),
        andamento: updated.status,
        projectId
      };

      const updatedRows = [...rows];
      updatedRows[index] = updatedRow;
      setRows(updatedRows);
      setEditIndex(null);
      setEditRow(null);
    } catch (err) {
      console.error("Erro ao salvar tarefa", err);
      alert("Erro ao salvar tarefa");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof RowData, value: string | string[]) => {
    setEditRow((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditRow({ ...rows[index] });
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditRow(null);
  };

  const handleDelete = async (index: number) => {
    const id = rows[index]._id;
    if (id) {
      const confirmDelete = window.confirm(
        `Tem certeza que deseja excluir a atividade?`
      );
      if (!confirmDelete) return;
      try {
        await deleteTask(id);
      } catch (err) {
        console.error("Erro ao deletar tarefa", err);
      }
    }
    setRows(rows.filter((_, i) => i !== index));
  };

  return (
    <>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHeader />
          <tbody>
            {rows.map((row, index) => (
              <TableRowItem
                key={index}
                row={row}
                index={index}
                isEditing={editIndex === index}
                editRow={editRow}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCancel={handleCancel}
                onSave={handleSave}
                onChange={handleChange}
                loading={loading}
              />
            ))}
          </tbody>
        </Table>
      </TableContainer>

      <AddLineButton onClick={handleAddLine} />
      <SummaryDashboards rows={rows} />
    </>
  );
}
