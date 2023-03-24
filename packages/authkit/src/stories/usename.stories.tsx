import { ComponentStory, ComponentMeta } from "@storybook/react";
import ExampleUsername from "./usename/Username";

export default {
  title: "Example/Username",
  component: ExampleUsername,
  parameters: {
    componentSubtitle: "Username",
  },
} as ComponentMeta<typeof ExampleUsername>;

const Template1: ComponentStory<typeof ExampleUsername> = (args) => (
  <ExampleUsername {...args} />
);
export const Username = Template1.bind({});
