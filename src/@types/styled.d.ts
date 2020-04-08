import { Theme } from '@material-ui/core/styles';
import 'styled-components';

declare module 'styled-components' {
  export type DefaultTheme = Theme;
}
