import { ReactElement } from "react";
import { Draggable } from "react-smooth-dnd";

const DraggableItem = ({
  children
}: {
  children: ReactElement;
}): ReactElement => <Draggable>{children}</Draggable>;

export default DraggableItem;
