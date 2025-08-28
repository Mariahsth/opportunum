export interface RowData {
  _id?: string;
  prazo: string;
  kr: string;
  resultado: string;
  responsavel: string; 
  responsavelIds?: string[]; 
  andamento: 'pendente' | 'em andamento' | 'concluído' | '';
  projectId: string;
}