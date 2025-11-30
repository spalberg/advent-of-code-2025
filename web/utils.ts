import { ClassValue, clsx } from "clsx";
import { createDefine } from "fresh";
import { twMerge } from "tailwind-merge";

export interface State {
  colorScheme: ColorSchema | null;
}

export const define = createDefine<State>();

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

export type Theme = "winter" | "dracula";
export type ColorSchema = "light" | "dark";
export const lightTheme = "winter";
export const darkTheme = "dracula";
export function getThemeForColorSchema(mode: ColorSchema): Theme {
  return mode === "dark" ? darkTheme : lightTheme;
}
export function getColorSchemaForTheme(theme: Theme): ColorSchema {
  return theme === darkTheme ? "dark" : "light";
}
