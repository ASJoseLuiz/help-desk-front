export function timeAgo(date: string) {
    const now = new Date();
    const created = new Date(date);
  
    const diff = now.getTime() - created.getTime();
  
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
    if (minutes < 60) {
      return `há ${minutes} min`;
    }
  
    if (hours < 24) {
      return `há ${hours} hora${hours > 1 ? "s" : ""}`;
    }
  
    return `há ${days} dia${days > 1 ? "s" : ""}`;
  }