export type AlertDetails = {
  id?: string;
  type: "success" | "error" | "info";
  text: string;
};

export type Alerts = AlertDetails[];