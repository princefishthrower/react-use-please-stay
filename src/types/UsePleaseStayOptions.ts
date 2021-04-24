import { AnimationType } from '../enums/AnimationType';

export type UsePleaseStayOptions = {
  defaultTitle: string;
  titles: Array<string>;
  animationType?: AnimationType;
  interval?: number;
  faviconLinks?: Array<string>;
  alwaysRunAnimations?: boolean;
}
