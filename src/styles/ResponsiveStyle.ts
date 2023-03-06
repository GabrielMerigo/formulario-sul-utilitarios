const breakpoints = {
  xs: 320,
  sm: 480,
  md: 576,
  lg: 768,
  xl: 992,
  xxl: 1200,
  xxxl: 1400,
  xxxxl: 1660,
} as const;

const sizes = {
  breakpoints: {
    xs: `${breakpoints.xs}px`,
    sm: `${breakpoints.sm}px`,
    md: `${breakpoints.md}px`,
    lg: `${breakpoints.lg}px`,
    xl: `${breakpoints.xl}px`,
    xxl: `${breakpoints.xxl}px`,
    xxxl: `${breakpoints.xxxl}px`,
    xxxxl: `${breakpoints.xxxxl}px`,
  },
} as const;

export const mediaQuery = (key: keyof typeof sizes.breakpoints, range: 'min' | 'max' = 'max') => {
  return (style: TemplateStringsArray | string) =>
    `@media (${range}-width: ${sizes.breakpoints[key]}) { ${style} }`;
};
