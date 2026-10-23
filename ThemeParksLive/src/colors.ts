import blue from '@/themes/material-theme-blue.json';
import yellow from '@/themes/material-theme-yellow.json';
import red from '@/themes/material-theme-red.json';
import green from '@/themes/material-theme-green.json';
import orange from '@/themes/material-theme-orange.json';
import purple from '@/themes/material-theme-purple.json';

export const themes = { blue, yellow, red, green, orange, purple }
export type ThemeName = keyof typeof themes;