import { Page } from "@ceramicnetwork/common";

export type Creator = {
  id: string;
};

export type Vote = {
  id: string;
  type: "UP_VOTE" | "DOWN_VOTE";
  creator: Creator;
  thread?: Thread;
};
export type Comment = {
  id: string;
  text: string;
  creator: Creator;
  thread?: Thread;
};
export type Favor = {
  id: string;
  creator: Creator;
  thread?: Thread;
};
export type Score = {
  id: string;
  text: string;
  value: number;
  creator: Creator;
  thread?: Thread;
};

export type Thread = {
  id: string;
  creator: Creator;
  url: string;
  date: string;
  type: string;
  votesCount: number;
  commentsCount: number;
  favorsCount: number;
  scoresCount: number;
  votes: Page<Vote>;
  comments: Page<Comment>;
  favors: Page<Favor>;
  scores: Page<Score>;
};

export enum VoteType {
  UP_VOTE,
  DOWN_VOTE,
}
