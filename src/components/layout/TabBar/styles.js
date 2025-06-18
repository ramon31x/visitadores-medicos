// src/components/layout/TabBar/styles.js
import { theme } from '../../../theme';

const styles = {
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface.primary,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    paddingTop: theme.spacing[2],
    paddingBottom: theme.spacing[4],
    paddingHorizontal: theme.spacing[2],
    ...theme.shadows.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing[2],
    paddingHorizontal: theme.spacing[1],
  },
  tabFocused: {
    // Efecto visual sutil cuando está activo
  },
  tabIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing[1],
    backgroundColor: 'transparent',
  },
  tabIconContainerFocused: {
    backgroundColor: theme.colors.primary[100],
  },
  tabIcon: {
    fontSize: 18,
  },
  tabIconFocused: {
    fontSize: 20,
  },
  tabLabel: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
    fontSize: 11,
    textAlign: 'center',
  },
  tabLabelFocused: {
    ...theme.typography.styles.caption,
    color: theme.colors.primary[600],
    fontWeight: '600',
    fontSize: 11,
  },
};

export default styles;