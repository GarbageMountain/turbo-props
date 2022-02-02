export interface Theme {
  colors: {
    [key: string]: string;
  };
  sizes: {
    [key: string]: number;
  };
  /**
   * show debug borders for all components
   */
  debugBorders?: boolean;
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

export interface ThemeDefaults<T extends Theme> {
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

export type FlexJustifyType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
export type FlexAlignType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline';
export type TextAlignType = 'auto' | 'left' | 'right' | 'center' | 'justify';

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

export interface CommonProps<T extends Theme> extends DebugProps {
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

export interface FlexProps extends DebugProps {
  grow?: number;
  shrink?: number;
}

export interface DividerProps<T extends Theme> {
  color?: Colors<T>;
  lineWidth?: number;
}
