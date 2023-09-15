export interface MenuItem {
  label: string;
  destination?: string;
  dropdown: boolean;
  items?: DropdownItem[];
}

export interface DropdownItem {
  label: string;
  icon: JSX.Element;
  destination: string;
}
