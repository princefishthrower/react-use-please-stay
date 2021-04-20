import { AnimationType } from '../enums/AnimationType';

export type UsePleaseStayOptions = {
  messages: Array<string>;
  animationType?: AnimationType;
  delay?: number;
  faviconHrefs?: Array<string>;
}
