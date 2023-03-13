import { useAuthorizer } from "../provider/AuthorizerContext";
import LoginWithAuthorizerButton from "../login-button/LoginWithAuthorizerButton";
import Modal from "../modal/Modal";
import { Flex } from "rebass/styled-components";

export interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

function LoginModal({ open, onClose }: LoginModalProps) {
  const { authorizers, lastAuthToolType } = useAuthorizer();
  const newAuthorizers = authorizers.sort((a, b) => {
    if (a.authToolType === lastAuthToolType) {
      return -1;
    }
    if (b.authToolType === lastAuthToolType) {
      return 1;
    }
    return 0;
  });

  return (
    <Modal title={"Login"} isOpen={open} onClose={onClose}>
      <Flex
        sx={{
          flexDirection: "column",
          gap: 3,
        }}
        className="us3r-LoginModal__options"
      >
        {newAuthorizers.map((item) => (
          <LoginWithAuthorizerButton
            key={item.authToolType}
            authToolType={item.authToolType}
            className="us3r-LoginModal__option"
          />
        ))}
      </Flex>
    </Modal>
  );
}
export default LoginModal;
