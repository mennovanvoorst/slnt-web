import { ReactElement } from "react";
import { Box } from "@chakra-ui/react";
import { Container } from "react-smooth-dnd";
import DraggableItem from "@components/DraggableList/DraggableItem";

const DraggableList = ({
  items,
  minimum,
  onDrop,
  getChildPayload
}: {
  items: any[];
  minimum: number;
  onDrop: (dragResult: any) => void;
  getChildPayload: (index: number) => void;
}): ReactElement => {
  const renderItems = (): JSX.Element | JSX.Element[] => {
    return items.map((item, index) => (
      <DraggableItem key={`di${index}`}>{item}</DraggableItem>
    ));
  };

  if (!items || items.length < minimum)
    return <Box color="text.200">Nothing has been added.</Box>;

  return (
    <Container onDrop={onDrop} lockAxis="y" getChildPayload={getChildPayload}>
      {renderItems()}
    </Container>
  );
};

export default DraggableList;
