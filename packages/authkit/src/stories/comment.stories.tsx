import { ComponentStory, ComponentMeta } from "@storybook/react";
import ExCommentSubmit from "./comment/CommentSubmit";
import ExCommentCard from "./comment/CommentCard";

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

const Template2: ComponentStory<typeof ExCommentCard> = (args) => (
  <ExCommentCard {...args} />
);
export const CommentCard = Template2.bind({});
