import { ComponentStory, ComponentMeta } from "@storybook/react";
import ExampleScoreDashboard from "./score/ScoreDashboard";
import ExampleScoreLine from "./score/ScoreLine";
import ExampleReviewScoreCrad from "./score/ReviewScoreCrad";
import ExampleScoreModal from "./score/ScoreModal";


export default {
  title: "Example/Score",
  component: ExampleScoreDashboard,
  parameters: {
    componentSubtitle: "ScoreDashboard",
  },
} as ComponentMeta<typeof ExampleScoreDashboard>;

const Template1: ComponentStory<typeof ExampleScoreDashboard> = (args) => (
  <ExampleScoreDashboard {...args} />
);
export const ScoreDashboard = Template1.bind({});

const Template2: ComponentStory<typeof ExampleScoreLine> = (args) => (
  <ExampleScoreLine {...args} />
);
export const ScoreLine = Template2.bind({});

const Template3: ComponentStory<typeof ExampleReviewScoreCrad> = (args) => (
  <ExampleReviewScoreCrad {...args} />
);
export const ReviewScoreCrad = Template3.bind({});

const Template4: ComponentStory<typeof ExampleScoreModal> = (args) => (
  <ExampleScoreModal {...args} />
);
export const ScoreModal = Template4.bind({});