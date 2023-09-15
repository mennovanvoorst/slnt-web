import { ReactNode } from "react";

export interface Panel {
  heading?: string | JSX.Element;
  headingAction?: JSX.Element;
  action?: JSX.Element;
  maxH?: number | string;
  children: ReactNode | ReactNode[];
}

export interface PanelSetting {
  heading: string;
  description?: string;
  icon: JSX.Element;
  indented?: boolean;
  children?: ReactNode | ReactNode[];
}
