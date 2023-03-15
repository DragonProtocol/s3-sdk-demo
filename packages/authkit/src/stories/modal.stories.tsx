import { ComponentStory, ComponentMeta } from "@storybook/react";
import ExampleLoginModal from "./modal/LoginModal";

export default {
  title: "Example/Modal",
  component: ExampleLoginModal,
  parameters: {
    componentSubtitle: "LoginModal",
  },
} as ComponentMeta<typeof ExampleLoginModal>;

const Template1: ComponentStory<typeof ExampleLoginModal> = (args) => (
  <ExampleLoginModal {...args} />
);
export const LoginModal = Template1.bind({});
