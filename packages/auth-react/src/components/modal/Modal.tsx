import React from "react";
import { Box, Button, Text } from "rebass/styled-components";
import styled from "styled-components";

const ModalOverlay = styled(Box)<{
  isOpen: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  z-index: 100;
`;

const ModalContent = styled(Box)<{
  isOpen: boolean;
}>`
  min-width: 350px;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.radius.default};
  box-shadow: ${(props) => props.theme.shadows.modal};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transform: ${(props) =>
    props.isOpen ? "translateY(0)" : "translateY(-50px)"};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
`;

const ModalHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  gap: 20px;
`;

const ModalTitle = styled(Text)`
  color: ${(props) => props.theme.colors.text};
  font-weight: 500;
  font-size: 24px;
  margin: 0;
  flex: 1;
`;

const ModalCloseButton = styled(Button)`
  padding: 0;
  font-size: 24px;
  color: ${(props) => props.theme.colors.text};
  font-weight: 500;
  margin-left: auto;
  border: none;
  background-color: transparent;

  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

const ModalBody = styled.div`
  padding: 16px;
`;
type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  shouldCloseOnOverlayClick?: boolean;

  // element

  showHeader?: boolean;
  showTitle?: boolean;
  showCloseButton?: boolean;
  title?: React.ReactNode;
  closeButtonLabel?: React.ReactNode;

  // class
  overlayClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  closeButtonClassName?: string;
  bodyClassName?: string;
};
const Modal = ({
  children,
  isOpen,
  onClose,
  shouldCloseOnOverlayClick = true,
  // element
  showHeader = true,
  showTitle = true,
  showCloseButton = true,
  title,
  closeButtonLabel,

  // class
  overlayClassName,
  contentClassName,
  headerClassName,
  titleClassName,
  closeButtonClassName,
  bodyClassName,
}: ModalProps) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <ModalOverlay
      className={`Us3r-Modal__overlay ${overlayClassName ?? ""}`}
      isOpen={isOpen}
      onClick={() => {
        if (shouldCloseOnOverlayClick) {
          handleClose();
        }
      }}
    >
      <ModalContent
        className={`Us3r-Modal__content ${contentClassName ?? ""}`}
        isOpen={isOpen}
        onClick={(e) => e.stopPropagation()}
      >
        {showHeader && (
          <ModalHeader
            className={`Us3r-Modal__header ${headerClassName ?? ""}`}
          >
            {showTitle && title && (
              <ModalTitle
                className={`Us3r-Modal__title ${titleClassName ?? ""}`}
              >
                {title}
              </ModalTitle>
            )}

            {showCloseButton && (
              <ModalCloseButton
                className={`Us3r-Modal__close ${closeButtonClassName ?? ""}`}
                onClick={handleClose}
              >
                {closeButtonLabel ?? "✖"}
              </ModalCloseButton>
            )}
          </ModalHeader>
        )}

        <ModalBody className={`Us3r-Modal__body ${bodyClassName ?? ""}`}>
          {children}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
