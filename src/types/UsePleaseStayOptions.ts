import { AnimationType } from '../enums/AnimationType';

export type UsePleaseStayOptions = {
  defaultTitle: string;
  titles: Array<string>;
  animationType?: AnimationType;
  interval?: number;
  faviconURIs?: Array<string>;
  alwaysRunAnimations?: boolean;
}
