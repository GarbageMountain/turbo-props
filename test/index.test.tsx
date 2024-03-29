import { TurboProps, ThemedProps } from '../src';
import '@testing-library/jest-dom';

const mainAppTheme = {
  // be descriptive when describing your color names
  colors: { brand: 'red' },
  /*
   * sizes can be described in any way, we've found it useful to use
   * a hybrid of t-shirt sizing / numeric value to provide both context
   * and detail
   */
  sizes: {
    's-10': 12,
    'm-18': 18,
    'l-24': 24,
  },
  fonts: {
    mono: {
      light: 'monospace 300',
      regular: 'monospace 500',
      bold: 'monospace 700',
    },
    'sans-serif': {
      light: 'sans-serif 300',
      regular: 'sans-serif 500',
      bold: 'sans-serif 700',
    },
  },
  grid: 8,
  debugBorders: false,
};

export const {
  /*
   * 👇 your theme ie. the first argument to the TurboProps function,
   * which is passed to the styled-components ThemeProvider
   */
  theme,
  css, // 👈 a css function with your theme baked in
  styled, // 👈 a styled function with your theme baked in
  useTheme, // 👈 a useTheme hook with your theme baked in
  // // 👇 these are the basic building blocks
  baseLayout,
  baseRowLayout,
  baseColumnLayout,
  baseTypography,
  spacer,
  divider,
} = TurboProps(
  // 👇 this is your main app theme, it is returned from the TurboProps function (see `theme` above 👆)
  mainAppTheme,
  // 👇 these are your theme defaults, the values that are used as fallbacks if no value is entered
  {
    color: 'brand',
    font: 'mono',
    weight: 'regular',
    sizes: {
      font: 'm-18',
      px: 'l-24',
      py: 'm-18',
      radius: 's-10',
    },
    shadow: {
      color: 'brand',
      offset: {
        width: 0,
        height: 5,
      },
      radius: 6.27,
      elevation: 10,
    },
  }
);

/**
 * export the types of your theme to be used when making
 * your UI building blocks
 */
export const testTheme = theme;
export const testStyled = styled;
export type Theme = typeof theme;
type TP = ThemedProps<Theme>;
export type LayoutProps = TP['LayoutProps'];
export type TypographyProps = TP['TypographyProps'];
export type SpacerProps = TP['SpacerProps'];
export type DividerProps = TP['DividerProps'];
export type Color = TP['Colors'];
export type Size = TP['Sizes'];
export type Font = TP['Fonts'];
export type Weight = TP['Weights'];

describe('css function', () => {
  it('should exist', () => {
    expect(css).toBeTruthy();
    expect(css).toBeInstanceOf(Function);
  });
});

describe('useTheme function', () => {
  it('should exist', () => {
    expect(useTheme).toBeTruthy();
    expect(useTheme).toBeInstanceOf(Function);
  });
});
