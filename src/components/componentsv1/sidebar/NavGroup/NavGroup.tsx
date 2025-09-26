import ListSubheader from '@mui/material/ListSubheader';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { IconDots } from '@tabler/icons-react';
import React from 'react';
import { useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import { useTheme } from '@mui/material/styles';

type NavGroup = {
  navlabel?: boolean;
  subheader?: string;
};

interface ItemType {
  item: NavGroup;
  hideMenu: string | boolean;
}

const NavGroup = ({ item, hideMenu }: ItemType) => {

  const ListSubheaderStyle = styled((props: Theme | any) => (
    <ListSubheader disableSticky {...props} />
  ))(({ theme }) => ({
    ...theme.typography.overline,
    fontWeight: '700',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0),
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: '26px',
    padding: '3px 12px',
    marginLeft: hideMenu ? '' : '-10px',
    fontSize: '0.75rem',
    letterSpacing: '0.5px',
    textTransform: 'uppercase' as const,
  }));

  return (
    <ListSubheaderStyle>{hideMenu ? <IconDots size="14" /> : item?.subheader}</ListSubheaderStyle>
  );
};

export default NavGroup;
