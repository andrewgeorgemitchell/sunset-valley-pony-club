import { Button, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { NextLinkComposed } from '~/components/Link/Link';
import { CustomTheme } from '~/styles/theme';
import { formatLink } from '~/utils';
import { NavLink } from '../HeaderLink.type';

const useStyles = makeStyles<CustomTheme>((theme) => ({
  root: {},
  link: {
    textDecoration: `none`,
    borderRadius: 0,
    borderRadiusTopLeft: 10,
    borderRadiusTopRight: 10,
    borderBottom: `2px solid transparent`,
    height: `100%`,
    '&:hover': {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
  },
  active: {
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
  },
}));

type HeaderLinkProps = {
  link: NavLink;
};

const HeaderLink: React.FC<HeaderLinkProps> = ({
  link: { label, link, subLinks },
}) => {
  const router = useRouter();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const isActive = link
    ? router.asPath === link
    : subLinks?.some(
        ({ link: subLink }) => router.asPath === (subLink as string),
      ) || false;

  if (subLinks) {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div className={classes.root}>
        <Button
          className={[classes.link, isActive && classes.active].join(` `)}
          id={`${label}-button`}
          aria-controls={open ? `${label}-submenu` : undefined}
          aria-haspopup="true"
          aria-expanded={open ? `true` : undefined}
          onClick={handleClick as any}
          endIcon={open ? <ArrowDropUp /> : <ArrowDropDown />}
        >
          {label}
        </Button>
        <Menu
          id={`${label}-submenu`}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': `${label}-submenu`,
          }}
        >
          {subLinks.map(({ label: subLabel, link: subLink }) => (
            <MenuItem
              key={subLink}
              onClick={handleClose}
              component={NextLinkComposed}
              to={formatLink(subLink as string)}
            >
              {subLabel}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Button
        className={[classes.link, isActive && classes.active].join(` `)}
        component={NextLinkComposed}
        to={formatLink(link as string)}
      >
        {label}
      </Button>
    </div>
  );
};

export default HeaderLink;
