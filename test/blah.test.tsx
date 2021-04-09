import { TurboProps, ThemedProps } from '../src';
import styled from 'styled-components';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import React from 'react';
// import { baseRowLayout } from '../examples/basic';

const initialTheme = {
  // be descriptive when describing your color names
  colors: { brand: 'red' },
  /*
   * sizes can be described in any way, we've found it useful to use
   * a hybrid of t-shirt sizing / numeric value to provid both context
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
};

// Copy pasta from the example file.
const {
  /*
   * 👇 your theme ie. the first argument to the TurboProps function,
   * which is passed to the styled-components ThemeProvider
   */
  theme,
  // css, // 👈 a css function with your theme baked in
  // styled, // 👈 a styled function with your theme baked in
  // useTheme, // 👈 a useTheme hook with your theme baked in
  // // 👇 these are the basic building blocks
  baseLayout,
  // baseRowLayout,
  // baseColumnLayout,
  // baseTypography,
  // spacer,
  // divider,
} = TurboProps(
  // 👇 this is your main app theme, it is returned from the TurboProps function (see `theme` above 👆)
  initialTheme,
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

type Theme = typeof theme;
type TP = ThemedProps<Theme>;
export type LayoutProps = TP['LayoutProps'];
export type TypographyProps = TP['TypographyProps'];
export type SpacerProps = TP['SpacerProps'];
export type DividerProps = TP['DividerProps'];
export type Color = TP['Colors'];
export type Size = TP['Sizes'];
export type Font = TP['Fonts'];
export type Weight = TP['Weights'];
export type DebugProps = TP['DebugProps'];

// Todo -- find a testing framework like:
// https://www.typescriptlang.org/play?#code/PQKgUABBCMAsEFoIDECWAnAzgFwgewDMIBBddAQwE9JEE76aAjSkgO2wAs9WXkBXCAAoAAuXYE+ASggBiAKblMLGeTJUaNGVogBFPnJypuGqAEkAtgAcANnPNz2EchADmDuelQBjCAAM0WNgAPAAqAHy+EJzkuNjkANYGTqwkaiy+IZFiACYQ6HLYfOismBCo2ADkpQQYOBBytvbsVVGUlnIAdCYoeOj1AB7kVrbdvmPYmDTYbXJOZNAQALwQANoV5BUANBAVjFs7XhUAulMzc+gATEurAMzbF9vQJ1Cn7RAcCtkLywE4QaroaBhCDAYADdpebByXLYPAQRizdYVV6zD7kbJXH61YIAi7A0HguSQ6FROEIiA3GhjXzdYEANVQcgA7vgUgBxcoACT4jAAXO9sNhLJheaCJl4OB0AFaYDq9FzAOBgEDAMBq0AQAD62p1up1EAAmngihAAMJ4bKzTkeWZ6u3aiAqtXTN6-YIhAZQ1jZUpiSgrI7A5YeuT9L0+1ZHCAAfggrDkADcPBB+SEVgAGI4AbjVYA19rtEBCBlwpsUSQLesdqtQVl6uAA3hAAKIARz45Gs22b-QhuAAvhACOg8OYdsIXXIEBLO7ZWG5MMA+NhUNZMMiwJOIF5y6VlisaD2+0E2x3rEE3UEVncIA8YIHtjcwmFNofe0TgqfOxfsVfBNJFmBaALhvJtyH5HBPHnCB+wfIQAKAkDn1fKAjw-E922-S8AxfONEw8ZC32PL9z2wvhvTkGp42yODyMtKjoWfMATlzfNK31fh0E4ZMAGUoWFLV2IdJ1QBoYEeI4VRZkoY0+kwPBrGXIwSn5DhBWFUVgHFSUZTldAFTgYAxEwJkPDEiAGWZCB5MUlduBFAUhRFMVMAlaVZXlRVYGAGylPs8yAFlelmU1JOsOcF1U9TnK01ydI8-TlVVMAgA

describe('Theme ', () => {
  it('should match initial configuration with defaults passed to library', () => {});
});

describe('Layout component', () => {
  const Layout = styled.div<LayoutProps>`
    ${baseLayout}
  `;

  const tree = renderer.create(<Layout grow />).toJSON();
  expect(tree).toHaveStyleRule('flex', '1');
  expect(tree).toHaveStyleRule('display', 'flex');
  // it('should create a row component', () => {});
});
