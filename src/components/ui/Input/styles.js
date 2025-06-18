// src/components/ui/Input/styles.js
import { theme } from '../../../theme';

const styles = {
  container: {
    marginBottom: theme.spacing[4],
  },
  label: {
    ...theme.typography.styles.label,
    marginBottom: theme.spacing[2],
    color: theme.colors.text.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface.primary,
    borderWidth: 1.5,
    borderColor: theme.colors.border.light,
    borderRadius: theme.borderRadius.component.input,
    paddingHorizontal: theme.spacing[4],
    minHeight: 48,
  },
  inputContainerFocused: {
    borderColor: theme.colors.primary[500],
    ...theme.shadows.sm,
  },
  inputContainerError: {
    borderColor: theme.colors.status.error,
  },
  inputContainerDisabled: {
    backgroundColor: theme.colors.neutral[100],
    borderColor: theme.colors.border.light,
  },
  input: {
    flex: 1,
    ...theme.typography.styles.body,
    color: theme.colors.text.primary,
    paddingVertical: theme.spacing[3],
  },
  inputMultiline: {
    minHeight: 80,
    paddingTop: theme.spacing[3],
    textAlignVertical: 'top',
  },
  leftIcon: {
    marginRight: theme.spacing[2],
  },
  rightIcon: {
    marginLeft: theme.spacing[2],
    padding: theme.spacing[1],
  },
  helperText: {
    ...theme.typography.styles.caption,
    marginTop: theme.spacing[1],
    color: theme.colors.text.tertiary,
  },
  errorText: {
    color: theme.colors.status.error,
  },
};

export default styles;