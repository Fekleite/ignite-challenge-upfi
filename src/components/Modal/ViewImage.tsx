import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal motionPreset="slideInBottom" onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent maxW="900px" w="100%">
        <ModalBody padding={0} bgColor="pGray.800">
          <Image maxH="600px" w="100%" objectFit="contain" src={imgUrl} />
        </ModalBody>
        <ModalFooter
          py="8px"
          px="10px"
          bgColor="pGray.800"
          borderBottomLeftRadius="6px"
          borderBottomRightRadius="6px"
          display="flex"
          justifyContent="flex-start"
        >
          <Link href={imgUrl} isExternal>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
