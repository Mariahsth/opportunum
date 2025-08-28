import type { RowData } from "../../interface/RowData";

export type Column = {
  field: keyof RowData | "acoes";
  label: string;
  width?: string;
};

export interface TableRowItemProps {
  row: RowData;
  index: number;
  isEditing: boolean;
  editRow: RowData | null;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onCancel: () => void;
  onSave: (index: number) => void;
  onChange: (field: keyof RowData, value: string | string[]) => void;
  loading: boolean;
}
