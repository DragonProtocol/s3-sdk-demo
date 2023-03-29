import { ComponentStory, ComponentMeta } from "@storybook/react";
import ExampleProfile from "./profile/Profile";

export default {
  title: "Example/Profile",
  component: ExampleProfile,
  parameters: {
    componentSubtitle: "Profile",
  },
} as ComponentMeta<typeof ExampleProfile>;

const Template1: ComponentStory<typeof ExampleProfile> = (args) => (
  <ExampleProfile {...args} />
);
export const Profile = Template1.bind({});
