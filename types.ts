export enum FeatureTab {
  Title = 'title',
  Poll = 'poll',
  Suggest = 'suggest',
  Social = 'social',
}

export interface GeneratedTitles {
  titles: string[];
  description: string;
}

export interface GeneratedPolls {
    polls: {
        question: string;
        options: string[];
    }[];
}

export interface GeneratedGames {
    games: {
        name: string;
        reason: string;
    }[];
}

export interface GeneratedPost {
    post: string;
    hashtags: string;
}
