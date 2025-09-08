import { format } from "date-fns";


export const formatDateFromInput = (dateString: string) => {
    if (!dateString) return "-";
    const [year, month, day] = dateString.split("-");
    if (!year || !month || !day) return "-";
    return `${day}/${month}/${year}`;
  };
  

  export const formatDateForInput = (dateString?: string | null): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Corrige o timezone para evitar erro de -1 dia
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localDate.toISOString().split("T")[0]; // "YYYY-MM-DD"
  };

  export function formatDateToDisplay(dateString?: string | Date | null): string {
    if (!dateString) return "—";
  
    const rawDate = typeof dateString === "string" ? new Date(dateString) : dateString;
    if (!(rawDate instanceof Date) || isNaN(rawDate.getTime())) return "—";
  
    const correctedDate =
    rawDate.getUTCHours() === 0
      ? new Date(rawDate.getTime() + rawDate.getTimezoneOffset() * 60000)
      : rawDate;
  
    return format(correctedDate, "dd/MM/yyyy");
  }

  export function isDateAtrasada(date?: string | Date | null, andamento?: string): boolean {
    if (!date || andamento === "concluído") return false;

    const prazoDate = typeof date === "string" ? new Date(date) : date;
    if (!(prazoDate instanceof Date) || isNaN(prazoDate.getTime())) return false;
  
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const dataPrazo = new Date(prazoDate);
    dataPrazo.setHours(0, 0, 0, 0); 
  
    return dataPrazo < today;
  }