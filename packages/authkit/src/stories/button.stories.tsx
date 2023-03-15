import { ComponentStory, ComponentMeta } from "@storybook/react";
import ExampleLoginButton from "./button/LoginButton";
import ExampleCustomLoginButton from "./button/CustomLoginButton";
import ExampleLoginWithAuthorizerButton from "./button/LoginWithAuthorizerButton";

export default {
  title: "Example/Button",
  component: ExampleLoginButton,
  parameters: {
    componentSubtitle: "LoginButton",
  },
} as ComponentMeta<typeof ExampleLoginButton>;

const Template1: ComponentStory<typeof ExampleLoginButton> = (args) => (
  <ExampleLoginButton {...args} />
);
export const LoginButton = Template1.bind({});

const Template2: ComponentStory<typeof ExampleCustomLoginButton> = (args) => (
  <ExampleCustomLoginButton {...args} />
);
export const CustomLoginButton = Template2.bind({});

const Template3: ComponentStory<typeof ExampleLoginWithAuthorizerButton> = (
  args
) => <ExampleLoginWithAuthorizerButton {...args} />;
export const LoginWithAuthorizerButton = Template3.bind({});
