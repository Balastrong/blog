export function getColorFromLanguage(language: string): {
  color: string;
  backgroundColor: string;
} {
  switch (language?.toLowerCase()) {
    case "javascript":
      return {
        color: "#000",
        backgroundColor: "#f7df1e",
      };
    case "typescript":
      return {
        color: "#fff",
        backgroundColor: "#3178c6",
      };
    default:
      return {
        color: "#fff",
        backgroundColor: "#000",
      };
  }
}
