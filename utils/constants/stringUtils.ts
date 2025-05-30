export const formatDate = (dateString: string | number | Date) => {
    if (!dateString) return "No Date";
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  export const formatTime = (dateString: string | number | Date) => {
    if (!dateString) return "No Date";
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined,{ hour: "2-digit", minute: "2-digit", hour12: true });
  };
  export const formatSingleDate = (dateString: string | number | Date) => {
    if (!dateString) return "No Date";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };