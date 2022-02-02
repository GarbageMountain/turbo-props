import baseStyled, {
  ThemedCssFunction,
  css as baseCSS,
  ThemedStyledInterface,
  useTheme as baseUseTheme,
} from 'styled-components';
import {
  Colors,
  CommonProps,
  DebugProps,
  DividerProps,
  FlexProps,
  Fonts,
  LayoutProps,
  Sizes,
  SpacerProps,
  Theme,
  ThemeDefaults,
  TypographyProps,
  Weights,
} from './types';

export function TurboProps<T extends Theme>(
  userTheme: T,
  defaults: ThemeDefaults<T>
) {
  const css = baseCSS as ThemedCssFunction<T>;
  const styled = baseStyled as ThemedStyledInterface<T>;
  const useTheme = baseUseTheme as () => T;

  const base = css<CommonProps<T>>`
    display: flex;
    ${({ bg, theme }) =>
      bg ? `background-color: ${theme.colors[bg as string]};` : ``}
    ${({ grow }) => (grow ? `flex: 1;` : ``)}
    ${({ px, py, theme }) => {
      const paddingX =
        px === undefined
          ? 0
          : typeof px === 'number'
          ? px
          : theme.sizes[
              typeof px === 'string' ? px : (defaults.sizes.px as string)
            ];
      const paddingY =
        py === undefined
          ? 0
          : typeof py === 'number'
          ? py
          : theme.sizes[
              typeof py === 'string' ? py : (defaults.sizes.py as string)
            ];
      return `padding: ${paddingY}px ${paddingX}px;`;
    }}
    ${({ absolute }) => (absolute ? `position: absolute;` : ``)}
    ${({ absolute }) =>
      absolute
        ? Object.entries(
            typeof absolute === 'object'
              ? absolute
              : { top: 0, right: 0, bottom: 0, left: 0 }
          )
            .filter(([, amount]) => amount !== undefined)
            .map(([direction, amount]) => `${direction}: ${amount}px;`)
            .join(`\n`)
        : ``}
    ${({ radius, theme }) =>
      radius
        ? `border-radius: ${
            typeof radius === 'number'
              ? radius
              : theme.sizes[
                  typeof radius === 'string'
                    ? radius
                    : (defaults.sizes.radius as string)
                ] / 2
          }px;`
        : ``}
    ${({ shadow, theme }) =>
      typeof shadow === 'object'
        ? `
          box-shadow: ${shadow.offset.height}px ${shadow.offset.width}px ${
            shadow.radius
          }px ${theme.colors[shadow.color as string]};
          elevation: ${shadow.elevation};
        `
        : typeof shadow === 'boolean'
        ? `
          box-shadow: ${defaults.shadow.offset.height}px ${
            defaults.shadow.offset.width
          }px ${defaults.shadow.radius}px ${
            theme.colors[defaults.shadow.color as string]
          };
          elevation: ${defaults.shadow.elevation};
        `
        : ``}
    ${({ border, theme }) => {
      if (border) {
        const [width, style, color] = border;
        return `border: ${width}px ${style} ${theme.colors[color as string]};`;
      }
      return ``;
    }}
  `;

  const baseLayout = css<LayoutProps<T>>`
    ${base}
    ${({ align, center }) =>
      typeof align === 'string'
        ? `align-items: ${align};`
        : align || center
        ? `align-items: center;`
        : ``}
    ${({ justify, center }) =>
      typeof justify === 'string'
        ? `justify-content: ${justify};`
        : justify || center
        ? `justify-content: center;`
        : ``}
  `;

  const baseRowLayout = css<LayoutProps<T>>`
    flex-direction: ${({ reverse }) => (reverse ? `row-reverse` : `row`)};
    ${({ size }) => (size ? `height: ${size}px;` : ``)}
  `;

  const baseColumnLayout = css<LayoutProps<T>>`
    flex-direction: ${({ reverse }) => (reverse ? `column-reverse` : `column`)};
    ${({ size }) => (size ? `width: ${size}px;` : ``)}
  `;

  // We should set font values explicity rather than
  // with shorthand which can become problematic.
  const baseTypography = css<TypographyProps<T>>`
    ${base}
    color: ${({ theme, color }) =>
      color
        ? theme.colors[color as string]
        : theme.colors[defaults.color as string]};
    font: ${({ theme, size }) =>
      typeof size === 'number'
        ? size
        : theme.sizes[
            (size as string | undefined) ?? (defaults.sizes.font as string)
          ]}px
      ${({ theme, weight, family }) =>
        theme.fonts[(family as string) ?? (defaults.font as string)][
          ((weight as unknown) as string) ??
            ((defaults.weight as unknown) as string)
        ]};
    ${({ textAlign, center }) =>
      typeof textAlign === 'string'
        ? `text-align: ${textAlign};`
        : textAlign || center
        ? `text-align: center;`
        : ``}
  `;

  const debug = (color: string, width = 0.5) => css<DebugProps>`
    ${({ debug, theme }) =>
      (theme.debugBorders || debug) && `border: solid ${width}px ${color};`}
  `;

  const spacer = {
    horizontal: css<SpacerProps<T>>`
      width: ${({ theme, units = 1, size }) =>
        size !== undefined
          ? typeof size === 'number'
            ? size
            : theme.sizes[size as string]
          : theme.grid * units}px;
    `,
    vertical: css<SpacerProps<T>>`
      height: ${({ theme, units = 1, size }) =>
        size !== undefined
          ? typeof size === 'number'
            ? size
            : theme.sizes[size as string]
          : theme.grid * units}px;
    `,
    flex: css<FlexProps>`
      ${({ grow, shrink }) => (!grow && !shrink ? `flex: 1;` : ``)}
      ${({ grow }) => (grow ? `flex-grow: ${grow};` : ``)}
      ${({ shrink }) => (shrink ? `flex-shrink: ${shrink};` : ``)}
    `,
  };

  const divider = {
    horizontal: css<DividerProps<T>>`
      border-color: ${({ color, theme }) =>
        color
          ? theme.colors[color as string]
          : theme.colors[defaults.color as string]};
      border-bottom-width: ${({ lineWidth }) => lineWidth ?? 1}px;
    `,
    vertical: css<DividerProps<T>>`
      border-color: ${({ color, theme }) =>
        color
          ? theme.colors[color as string]
          : theme.colors[defaults.color as string]};
      border-right-width: ${({ lineWidth }) => lineWidth ?? 1}px;
    `,
  };
  return {
    theme: userTheme,
    css,
    styled,
    useTheme,
    baseLayout,
    baseRowLayout,
    baseColumnLayout,
    baseTypography,
    spacer,
    divider,
    debug,
  };
}

export interface ThemedProps<T extends Theme> {
  LayoutProps: LayoutProps<T>;
  TypographyProps: TypographyProps<T>;
  SpacerProps: SpacerProps<T>;
  DividerProps: DividerProps<T>;
  Colors: Colors<T>;
  Sizes: Sizes<T>;
  Fonts: Fonts<T>;
  Weights: Weights<T>;
  DebugProps: DebugProps;
}
