import { ComponentStory, ComponentMeta } from "@storybook/react";
import ExCommentSubmit from "./comment/CommentSubmit";

export default {
  title: "Example/Comment",
  component: ExCommentSubmit,
  parameters: {
    componentSubtitle: "CommentSubmit",
  },
} as ComponentMeta<typeof ExCommentSubmit>;

const Template1: ComponentStory<typeof ExCommentSubmit> = (args) => (
  <ExCommentSubmit {...args} />
);
export const CommentSubmit = Template1.bind({});

// const Template2: ComponentStory<typeof ExampleOtherUserAvatar> = (args) => (
//   <ExampleOtherUserAvatar {...args} />
// );
// export const OtherUserAvatar = Template2.bind({});
