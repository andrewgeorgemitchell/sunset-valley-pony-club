import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Link from '~/components/Link/Link';
import { CustomTheme } from '~/styles/theme';
import { NavLink } from '../Header/HeaderLink.type';

const useStyles = makeStyles<CustomTheme>((theme) => ({
  root: {
    ...theme.mixins.containerStyles(theme),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    width: `100%`,
    borderTop: `1px solid #e0e0e0`,
  },
}));

type FooterProps = {
  links: NavLink[];
};

const Footer: React.FC<FooterProps> = ({ links }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} container spacing={8} justifyContent="center">
          {links.map(({ subLinks, label, link }) => (
            <Grid
              item
              key={label}
              style={{ width: `initial` }}
              container
              wrap="nowrap"
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={2}
            >
              {(subLinks ?? []).length > 0 ? (
                <>
                  {subLinks?.map(({ label: subLabel, link: subLink }) => (
                    <Grid
                      item
                      xs={12}
                      key={subLabel}
                      style={{
                        flexBasis: `inherit`,
                      }}
                    >
                      <Link
                        href={{
                          pathname: subLink,
                        }}
                        color="inherit"
                        underline="none"
                      >
                        {subLabel}
                      </Link>
                    </Grid>
                  ))}
                </>
              ) : (
                <Grid item xs={12}>
                  <Link
                    href={{
                      pathname: link,
                    }}
                    color="inherit"
                    underline="none"
                  >
                    {label}
                  </Link>
                </Grid>
              )}
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="inherit" align="center">
            Copyright © {new Date().getFullYear()}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
