export interface RowData {
  prazo: string;
  kr: string;
  resultado: string;
  responsavel: string;
  andamento: "Não iniciado" | "Em andamento" | "Finalizado" | "";
};