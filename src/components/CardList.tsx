// eslint-disable-next-line import/no-extraneous-dependencies
import { useState } from 'react';
import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedImageUrl, setSelectedImageUrl] = useState<string>();

  function handleViewImage(url): void {
    setSelectedImageUrl(url);
    onOpen();
  }

  return (
    <>
      <SimpleGrid columns={3} spacing="40px">
        {cards.map(card => (
          <Card
            data={card}
            key={card.id}
            viewImage={() => handleViewImage(card.url)}
          />
        ))}
      </SimpleGrid>

      {selectedImageUrl && (
        <ModalViewImage
          imgUrl={selectedImageUrl}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
}
