export const formatDateForDisplay = (dateString: string) => {
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