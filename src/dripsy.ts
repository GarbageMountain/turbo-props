import { makeTheme, styled, View, css, useDripsyTheme } from 'dripsy';

import { LayoutProps, Theme, ThemeDefaults } from './types';

const theme = makeTheme({
  // your theme
  colors: {},
  sizes: {},
});

type MyTheme = typeof theme;

declare module 'dripsy' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DripsyCustomTheme extends MyTheme {}
}

export function TurboProps<T extends Theme>(
  userTheme: T,
  defaults: ThemeDefaults<T>
) {
  return {
    css,
    styled,
  };
}
