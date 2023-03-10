import { Page } from "@ceramicnetwork/common";

export type Creator = {
  id: string;
};

export type Vote = {};
export type Comment = {};
export type Favor = {};
export type Score = {};

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
