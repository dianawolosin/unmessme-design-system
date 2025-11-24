import { styled } from '@mui/material/styles';
import MuiTabs, { TabsProps as MuiTabsProps } from '@mui/material/Tabs';
import MuiTab, { TabProps as MuiTabProps } from '@mui/material/Tab';
import { tokens } from '../tokens';

// ----------------------------------------------------------------------
// 1. Semantic Types
// ----------------------------------------------------------------------

export interface TabsProps extends MuiTabsProps {
  // Add any custom props if needed in the future
}

export interface TabProps extends MuiTabProps {
  // Add any custom props if needed in the future
}

// ----------------------------------------------------------------------
// 2. Styled Components (The "V3 Digital Noir" Look)
// ----------------------------------------------------------------------

const StyledTabs = styled(MuiTabs)(() => ({
  borderBottom: `${tokens.border.width.base} ${tokens.border.style.solid} ${tokens.color.semantic.border.subtle}`,
  '& .MuiTabs-indicator': {
    backgroundColor: tokens.color.semantic.action.primary,
    height: tokens.border.width.thick, // Digital look: thin, precise line
  },
}));

const StyledTab = styled(MuiTab)(() => ({
  textTransform: 'none',
  fontFamily: tokens.typography.semantic.label.button.font,
  fontSize: tokens.typography.semantic.label.button.size,
  fontWeight: Number(tokens.typography.semantic.label.button.weight),
  color: tokens.color.semantic.text.secondary,
  minHeight: tokens.spacing.semantic.layout.touch_target, // Standard touch target
  padding: tokens.spacing.semantic.padding.tab,
  transition: 'all 0.2s ease-in-out',
  
  '&.Mui-selected': {
    color: tokens.color.semantic.text.primary,
  },

  '&:hover': {
    color: tokens.color.semantic.text.primary,
    opacity: 1,
  },
}));

// ----------------------------------------------------------------------
// 3. Component Implementation
// ----------------------------------------------------------------------

export const Tabs = (props: TabsProps) => {
  return <StyledTabs {...props} />;
};

export const Tab = (props: TabProps) => {
  return <StyledTab disableRipple {...props} />;
};

