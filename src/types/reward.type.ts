export type Transaction = {
    id: string;
    userId: string;
    amount: number;
    date: number;
};

export type RewardData = {
    totalReward: number;
    monthRewards: Record<string, number>;
};

export type RewardEntry = { userId: string } & RewardData;
