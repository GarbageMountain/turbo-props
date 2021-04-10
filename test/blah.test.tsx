import { TurboProps, ThemedProps } from '../src';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

export const {
  /*
   * 👇 your theme ie. the first argument to the TurboProps function,
   * which is passed to the styled-components ThemeProvider
   */
  theme,
  // css, // 👈 a css function with your theme baked in
  styled, // 👈 a styled function with your theme baked in
  // useTheme, // 👈 a useTheme hook with your theme baked in
  // // 👇 these are the basic building blocks
  baseLayout,
  baseRowLayout,
  baseColumnLayout,
  // baseTypography,
  spacer,
  // divider,
} = TurboProps(
  // 👇 this is your main app theme, it is returned from the TurboProps function (see `theme` above 👆)
  {
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
  },
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

describe('Layout Base Component', () => {
  const Base = styled.div`
    ${baseLayout}
  `;

  const Row = styled.div`
    ${baseLayout}
    ${baseRowLayout}
  `;

  const Column = styled.div`
    ${baseLayout}
    ${baseColumnLayout}
  `;

  const SpacerHorizontal = styled.div`
    ${spacer.horizontal}
  `;

  const renderComponent = ({
    theme,
    children,
  }: {
    theme: Theme;
    // Need to fix this. Not sure how to tho
    children: any;
  }) => render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);

  it('should have sensible defaults', () => {
    const { getByTestId } = renderComponent({
      theme,
      children: <Base data-testid="base" />,
    });

    const component = getByTestId(/base/i);
    expect(component).toHaveStyle({
      display: 'flex',
      padding: '0px 0px',
      backgroundColor: undefined,
      position: undefined,
      borderRadius: undefined,
    });
  });

  it('should handle have prop defaults', () => {
    // Todo: figure out shadow prop
    const { getByTestId } = renderComponent({
      theme,
      children: (
        <Base data-testid="base" grow px py bg="brand" center absolute shadow />
      ),
    });

    const component = getByTestId(/base/i);

    expect(component).toHaveStyle({
      padding: '18px 24px',
      backgroundColor: 'red',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    });
  });

  it('should position flex items', () => {
    const { getByTestId } = renderComponent({
      theme,
      children: (
        <Base data-testid="base" align="flex-end" justify="space-between" />
      ),
    });

    const component = getByTestId(/base/i);

    expect(component).toHaveStyle({
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    });
  });

  it('should be a row', () => {
    const { getByTestId } = renderComponent({
      theme,
      children: <Row reverse data-testid="row" size={30} />,
    });

    const component = getByTestId(/row/i);

    expect(component).toHaveStyle({
      flexDirection: 'row-reverse',
      display: 'flex',
      // TODO: This is specific to rn
      // need to fix
      height: '30px',
    });
  });

  it('should be a column', () => {
    const { getByTestId } = renderComponent({
      theme,
      children: <Column data-testid="column" size={30} />,
    });

    const component = getByTestId(/column/i);

    expect(component).toHaveStyle({
      flexDirection: 'column',
      display: 'flex',
      width: '30px',
    });
  });
});
