import { createTheme, Theme } from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';

type JssStyles = Record<string, any>;

export type DefaultThemeOptions = {
  mixins: {
    containerStyles: (theme: Theme) => JssStyles;
  };
};

export type CustomTheme = Theme & DefaultThemeOptions;

const quipCustomThemeOptions: DefaultThemeOptions = {
  mixins: {
    containerStyles: (theme: Theme): JssStyles => ({
      width: `100%`,
      paddingLeft: `2%`,
      paddingRight: `2%`,
      [theme.breakpoints.up(`sm`)]: {
        paddingLeft: `5%`,
        paddingRight: `5%`,
      },
      [theme.breakpoints.up(`md`)]: {
        paddingLeft: `10%`,
        paddingRight: `10%`,
      },
      [theme.breakpoints.up(`lg`)]: {
        paddingLeft: `15%`,
        paddingRight: `15%`,
      },
      [theme.breakpoints.up(`xl`)]: {
        paddingLeft: `17%`,
        paddingRight: `17%`,
      },
    }),
  },
};

export const DefaultTheme: Theme = createTheme(
  {
    palette: {
      primary: blue,
      secondary: pink,
    },
    overrides: {
      MuiButton: {
        root: {
          textTransform: `none`,
        },
      },
      MuiTypography: {
        h1: {
          fontWeight: 600,
        },
        h2: {
          fontWeight: 600,
        },
        h3: {
          fontWeight: 600,
        },
        body1: {
          fontSize: 22,
        },
        body2: {
          fontSize: 18,
        },
      },
    },
  },
  quipCustomThemeOptions,
);
