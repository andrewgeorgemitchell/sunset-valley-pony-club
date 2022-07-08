import {
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Menu } from '@mui/icons-material';
import Image from 'next/image';
import RouterLink from 'next/link';
import React, { useState } from 'react';
import { CustomTheme } from '~/styles/theme';
import Link from '../../Link/Link';
import { NavLink } from './HeaderLink.type';
// eslint-disable-next-line import/no-cycle
import HeaderLink from './HeaderLink/HeaderLink';

const useStyles = makeStyles<CustomTheme>((theme) => ({
  root: {
    height: 100,
    width: `100%`,
    position: `sticky`,
    top: `0px`,
    borderBottom: `1px solid #e0e0e0`,
    zIndex: 1000,
  },
  container: {
    height: 100,
    margin: 0,
    ...theme.mixins.containerStyles(theme),
    width: `100%`,
  },
}));

type HeaderProps = {
  links: NavLink[];
};

const Header: React.FC<HeaderProps> = ({ links }) => {
  const classes = useStyles();
  const isMd = useMediaQuery(`(min-width:800px)`);
  const isLg = useMediaQuery(`(min-width:1200px)`);

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <nav
        className={classes.root}
        style={{
          backgroundColor: `#bdb9b9`,
        }}
      >
        <Grid
          className={classes.container}
          container
          direction="row"
          wrap="nowrap"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid
            item
            container
            style={{
              margin: 0,
            }}
          >
            <Link
              href={{
                pathname: `/`,
              }}
              color="inherit"
              underline="none"
            >
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <Image
                    src="/logo.svg"
                    alt="Bobtail Kitten Logo"
                    width={75}
                    height={75}
                  />
                </Grid>
                {isLg && (
                  <Grid item>
                    <Typography variant="h3" color="inherit">
                      bobtail kitten
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Link>
          </Grid>
          <Grid
            item
            container
            spacing={1}
            justifyContent="flex-end"
            alignItems="center"
            wrap="nowrap"
          >
            {isMd ? (
              links.map(({ label, link, subLinks }) => (
                <Grid item key={`${label}-headerLink`}>
                  <HeaderLink
                    link={{
                      label,
                      link,
                      subLinks,
                    }}
                  />
                </Grid>
              ))
            ) : (
              <IconButton onClick={() => setOpen(true)}>
                <Menu />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </nav>
      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        anchor="right"
        PaperProps={{ style: { width: 200 } }}
      >
        <List>
          {links.map(({ label, link, subLinks }) =>
            subLinks ? (
              subLinks.map(({ label: subLinkLabel, link: subLinkLink }) => (
                <React.Fragment key={`${subLinkLabel}-headerLink`}>
                  <RouterLink href={subLinkLink as string} passHref>
                    <ListItem
                      button
                      component="a"
                      onClick={() => setOpen(false)}
                    >
                      {subLinkLabel}
                    </ListItem>
                  </RouterLink>
                  <Divider />
                </React.Fragment>
              ))
            ) : (
              <React.Fragment key={`${link}-headerLink`}>
                <RouterLink
                  key={`${link}-headerLink`}
                  href={link as string}
                  passHref
                >
                  <ListItem button component="a" onClick={() => setOpen(false)}>
                    {label}
                  </ListItem>
                </RouterLink>
                <Divider />
              </React.Fragment>
            ),
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
