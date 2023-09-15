export interface FooterMenu {
  title: string;
  items: FooterMenuItem[];
}

export interface FooterMenuItem {
  label: string;
  destination: string;
  isExternal: boolean;
}
