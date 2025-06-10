import type {
    RewardData,
    RewardEntry,
    Transaction,
} from "../types/reward.type";

export const generateRewardsData = (input: Transaction[]): RewardEntry[] => {
    let res: RewardEntry[] = [];

    let reward: Record<string, RewardData> = {};

    input.forEach((transaction) => {

        let transactionMonth = getMonthFromTimestamp(transaction.date);

        const currentReward = calculateReward(transaction.amount);

        if (transaction.userId in reward) {
            reward[transaction.userId].totalReward += currentReward;
            if (transactionMonth in reward[transaction.userId].monthRewards) {
                reward[transaction.userId].monthRewards[transactionMonth] +=
                    currentReward;
            } else {
                reward[transaction.userId].monthRewards[transactionMonth] =
                    currentReward;
            }
        } else {

            reward[transaction.userId] = {
                totalReward: currentReward,
                monthRewards: { [transactionMonth]: currentReward },
            };
        }
        console.log(
            transaction.userId,
            transaction.amount,
            currentReward,
            JSON.stringify(reward, null, 2)
        );
    });

    for (let userId in reward) {
        res.push({
            userId,
            ...reward[userId],
        });
    }

    return res;
};

const getMonthFromTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    const monthString = date.toLocaleString("default", { month: "short" });
    return monthString;
};
const calculateReward = (amt: number): number => {
    let totalBonus = 0;

    if (amt > 100) {
        totalBonus = (amt - 100) * 2 + 50;
    } else if (amt > 50 && amt <= 100) {
        totalBonus = amt - 50;
    } else {
        totalBonus = 0;
    }

    return totalBonus;
};

const monthStringMap: Record<string, number> = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
};

export const getMonthStringList = (
    transactions: Transaction[]
): [string, string, string] => {
    const monthSet = new Set<string>();
    transactions.forEach((transaction) => {
        const monthString = getMonthFromTimestamp(transaction.date);
        monthSet.add(monthString);
    });

    return Array.from(monthSet).sort(
        (a, b) => monthStringMap[a] - monthStringMap[b]
    ) as [string, string, string];
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
