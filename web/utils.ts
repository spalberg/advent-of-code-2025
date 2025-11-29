import { createDefine } from "fresh";

export interface State {
  colorScheme: ColorSchema | null;
}

export const define = createDefine<State>();

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
