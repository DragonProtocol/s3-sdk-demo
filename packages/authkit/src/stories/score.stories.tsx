import { ComponentStory, ComponentMeta } from "@storybook/react";
import ExampleScoreDashboard from "./score/ScoreDashboard";
import ExampleScoreLine from "./score/ScoreLine";
import ExampleReviewScoreCard from "./score/ReviewScoreCard";
import ExampleReviewScoreCardList from "./score/ReviewScoreCardList";
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

const Template3: ComponentStory<typeof ExampleReviewScoreCard> = (args) => (
  <ExampleReviewScoreCard {...args} />
);
export const ReviewScoreCrad = Template3.bind({});

const Template4: ComponentStory<typeof ExampleReviewScoreCardList> = (args) => (
  <ExampleReviewScoreCardList {...args} />
);
export const ReviewScoreCardList = Template4.bind({});

const Template5: ComponentStory<typeof ExampleScoreModal> = (args) => (
  <ExampleScoreModal {...args} />
);
export const ScoreModal = Template5.bind({});