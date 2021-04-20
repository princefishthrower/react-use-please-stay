import { AnimationType } from '../enums/AnimationType';

export type UsePleaseStayOptions = {
  messages: Array<string>;
  animationType?: AnimationType;
  delay?: number;
  faviconHref?: string;
}
