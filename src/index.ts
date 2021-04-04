import baseStyled, {
  ThemedCssFunction,
  css as baseCSS,
  ThemedStyledInterface,
  useTheme as baseUseTheme,
} from 'styled-components';

interface Theme {
  colors: {
    [key: string]: string;
  };
  sizes: {
    [key: string]: number;
  };
  fonts: {
    [key: string]: {
      [key: string]: string;
    };
  };
  grid: number;
}

export type Colors<T extends Theme> = keyof T['colors'];
export type Sizes<T extends Theme> = keyof T['sizes'];
export type Fonts<T extends Theme> = keyof T['fonts'];
export type Weights<T extends Theme> = keyof T['fonts'][keyof T['fonts']];

interface ThemeDefaults<T extends Theme> {
  color: Colors<T>;
  sizes: {
    font: Sizes<T>;
    px: Sizes<T>;
    py: Sizes<T>;
    radius: Sizes<T>;
  };
  font: Fonts<T>;
  weight: Weights<T>;
  shadow: ShadowType<Colors<T>>;
}

export interface DebugProps {
  /**
   * show debug borders for just this component
   */
  debug?: boolean;
}

type FlexJustifyType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
type FlexAlignType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline';
type TextAlignType = 'auto' | 'left' | 'right' | 'center' | 'justify';

/**
 * Is either present as boolean meaning default value,
 * an explicit FontSize which comes from the theme,
 * or a custom numeric value.
 */
type SizeProp<FontSize> = boolean | FontSize | number;

type BorderType<Color> = [number, 'solid' | 'dotted' | 'dashed', Color];

interface ShadowType<Color> {
  color: Color;
  offset: {
    width: number;
    height: number;
  };
  radius: number;
  elevation: number;
}

interface CommonProps<T extends Theme> extends DebugProps {
  grow?: boolean;
  center?: boolean;
  px?: SizeProp<Sizes<T>>;
  py?: SizeProp<Sizes<T>>;
  bg?: Colors<T>;
  absolute?:
    | boolean
    | { top?: number; right?: number; bottom?: number; left?: number };
  radius?: SizeProp<Sizes<T>>;
  border?: BorderType<Colors<T>>;
  shadow?: ShadowType<Colors<T>> | boolean;
}

export interface LayoutProps<T extends Theme> extends CommonProps<T> {
  size?: number;
  justify?: boolean | FlexJustifyType;
  align?: boolean | FlexAlignType;
  reverse?: boolean;
}

export interface TypographyProps<T extends Theme> extends CommonProps<T> {
  size?: SizeProp<Sizes<T>>;
  family?: Fonts<T>;
  weight?: Weights<T>;
  color?: Colors<T>;
  textAlign?: boolean | TextAlignType;
}

export interface SpacerProps<T extends Theme> extends DebugProps {
  /**
   * Size of Spacer = units * grid (8px)
   * defaults to 1
   */
  units?: number;
  /**
   * If `size` is provided, `units` is ignored
   */
  size?: SizeProp<Sizes<T>>;
}

export interface DividerProps<T extends Theme> {
  color?: Colors<T>;
  lineWidth?: number;
}

export function TurboProps<T extends Theme>(
  theme: T,
  defaults: ThemeDefaults<T>
) {
  const css = baseCSS as ThemedCssFunction<T>;
  const styled = baseStyled as ThemedStyledInterface<T>;
  const useTheme = baseUseTheme as () => T;

  const base = css<CommonProps<T>>`
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
    flex: css<{ grow?: number; shrink?: number } & DebugProps>`
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
    theme,
    css,
    styled,
    useTheme,
    baseLayout,
    baseRowLayout,
    baseColumnLayout,
    baseTypography,
    spacer,
    divider,
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
