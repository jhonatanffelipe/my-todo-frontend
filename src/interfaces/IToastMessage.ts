export interface IToastMessage {
  type?: "error" | "success" | "info";
  title: string;
  description?: string;
  id: string;
}
