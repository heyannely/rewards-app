export type Transaction = {
    id: string;
    userId: string;
    amount: number;
    date: number; //jan 1 1970, epoch time (unix timestamp) utc
};

// export type RewardData = {[id:string]:{totalReward: number, [month:string]:number}}

export type RewardData = {
    totalReward: number;
    monthRewards: Record<string, number>;
};

export type RewardEntry = { userId: string } & RewardData;
