export function capitalizeFirst(str: string | string[]): string {
    if (Array.isArray(str)) {
      return str.join(", ").charAt(0).toUpperCase() + str.join(", ").slice(1);
    }
  
    return str.charAt(0).toUpperCase() + str.slice(1);
  }