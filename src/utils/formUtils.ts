import type { Item } from "../apps/types/Items";

export type FormData = {
  name: string;
  quantity?: number;
  unit: string;
  memo: string;
};

export const initialFormData: FormData = {
  name: "",
  quantity: undefined,
  unit: "",
  memo: "",
};

export const validateFormData = (data: FormData): string | null => {
  if (data.name.trim() === "") {
    return "品名を入力してください。";
  }
  return null;
};

export const convertInputValue = (
  name: string,
  value: string
): string | number | undefined => {
  if (name === "quantity") {
    return value === "" ? undefined : Number(value);
  }
  return value;
};

export const createNewItem = (data: FormData): Item => ({
  id: crypto.randomUUID(),
  name: data.name.trim(),
  quantity: data.quantity,
  unit: data.unit || undefined,
  completed: false,
  note: data.memo?.trim() || undefined,
});