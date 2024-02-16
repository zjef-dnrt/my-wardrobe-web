import { defineStore } from "pinia";
import { uuid } from "@/util/string";
import type { AlertDetails, Alerts } from "@/types/alerts";

export const useAlertsStore = defineStore("alerts", () => {
  const alerts = ref<Alerts>([]);

  const add = (alert: AlertDetails) => {
    alerts.value.push(alert);
    setTimeout(() => remove(alert.id!), 4000);
  };

  const info = (text: string) => {
    const alert: AlertDetails = {
      id: uuid(),
      type: "info",
      text,
    };
    add(alert);
  };

  const success = (text: string) => {
    const alert: AlertDetails = {
      id: uuid(),
      type: "success",
      text,
    };
    add(alert);
  };

  const error = (text: string) => {
    const alert: AlertDetails = {
      id: uuid(),
      type: "error",
      text,
    };
    add(alert);
  };

  const remove = (id: string) => {
    const index = alerts.value.findIndex((alert) => alert.id === id);
    alerts.value.splice(index, 1);
  };

  return {
    alerts,
    info,
    success,
    error,
    remove,
  };
});
