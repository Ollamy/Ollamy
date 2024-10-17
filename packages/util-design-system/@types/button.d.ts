declare module '@ollamy/design-system/components/Button/Button' {
  import { Button as ButtonNative } from '@ollamy/design-system/components/Button/Button.native';
  import { Button as ButtonWeb } from '@ollamy/design-system/components/Button/Button.web';

  const Button: typeof ButtonWeb | typeof ButtonNative;
  export { Button };
}
