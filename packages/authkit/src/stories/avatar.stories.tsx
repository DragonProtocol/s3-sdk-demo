import { ComponentStory, ComponentMeta } from "@storybook/react";
import ExampleLoginUserAvatar from "./avatar/LoginUserAvatar";
import ExampleOtherUserAvatar from "./avatar/OtherUserAvatar";

export default {
  title: "Example/UserAvatar",
  component: ExampleLoginUserAvatar,
  parameters: {
    componentSubtitle: "LoginUserAvatar",
  },
} as ComponentMeta<typeof ExampleLoginUserAvatar>;

const Template1: ComponentStory<typeof ExampleLoginUserAvatar> = (args) => (
  <ExampleLoginUserAvatar {...args} />
);
export const LoginUserAvatar = Template1.bind({});

const Template2: ComponentStory<typeof ExampleOtherUserAvatar> = (args) => (
  <ExampleOtherUserAvatar {...args} />
);
export const OtherUserAvatar = Template2.bind({});
