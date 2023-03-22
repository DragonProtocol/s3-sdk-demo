import { ComponentStory, ComponentMeta } from "@storybook/react";
import ExampleScoreBox from "./score/ScoreBox";
// import ExampleScoreDashboard from "./score/ScoreDashboard";
// import ExampleScoreLine from "./score/ScoreLine";
// import ExampleReviewScoreCard from "./score/ReviewScoreCard";
import ExampleReviewScoreCardList from "./score/ReviewScoreCardList";
import ExampleScore from "./score/Score";
// import ExampleScoreModal from "./score/ScoreModal";


export default {
  title: "Example/Score",
  component: ExampleScoreBox,
  parameters: {
    componentSubtitle: "ExampleScoreBox",
  },
} as ComponentMeta<typeof ExampleScoreBox>;

const Template1: ComponentStory<typeof ExampleScoreBox> = (args) => (
  <ExampleScoreBox {...args} />
);
export const ScoreBox = Template1.bind({});

const Template2: ComponentStory<typeof ExampleScore> = (args) => (
  <ExampleScore {...args} />
);
export const Score = Template2.bind({});

// const Template3: ComponentStory<typeof ExampleReviewScoreCard> = (args) => (
//   <ExampleReviewScoreCard {...args} />
// );
// export const ReviewScoreCrad = Template3.bind({});

const Template4: ComponentStory<typeof ExampleReviewScoreCardList> = (args) => (
  <ExampleReviewScoreCardList {...args} />
);
export const ReviewScoreCardList = Template4.bind({});

// const Template5: ComponentStory<typeof ExampleScoreModal> = (args) => (
//   <ExampleScoreModal {...args} />
// );
// export const ScoreModal = Template5.bind({});