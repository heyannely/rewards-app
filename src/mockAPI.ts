import type { Transaction } from "./types/reward.type";

const customerTransactions: Transaction[] = [
    { id: "0", userId: "843", amount: 77, date: 1718064000000 },
    { id: "1", userId: "123", amount: 154, date: 1719446400000 },
    { id: "2", userId: "624", amount: 158, date: 1722988800000 },
    { id: "3", userId: "213", amount: 69, date: 1722470400000 },
    { id: "4", userId: "342", amount: 95, date: 1718755200000 },
    { id: "5", userId: "843", amount: 45, date: 1724803200000 },
    { id: "6", userId: "843", amount: 90, date: 1721088000000 },
    { id: "7", userId: "213", amount: 76, date: 1722643200000 },
    { id: "8", userId: "843", amount: 139, date: 1724630400000 },
    { id: "9", userId: "123", amount: 157, date: 1722816000000 },
    { id: "10", userId: "123", amount: 146, date: 1723420800000 },
    { id: "11", userId: "523", amount: 164, date: 1721260800000 },
    { id: "12", userId: "523", amount: 104, date: 1717632000000 },
    { id: "13", userId: "213", amount: 129, date: 1723075200000 },
    { id: "14", userId: "523", amount: 42, date: 1723248000000 },
    { id: "15", userId: "523", amount: 133, date: 1721260800000 },
    { id: "16", userId: "523", amount: 174, date: 1721433600000 },
    { id: "17", userId: "342", amount: 138, date: 1724630400000 },
    { id: "18", userId: "342", amount: 126, date: 1724371200000 },
    { id: "19", userId: "523", amount: 55, date: 1720742400000 },
    { id: "20", userId: "843", amount: 142, date: 1723334400000 },
    { id: "21", userId: "523", amount: 116, date: 1720483200000 },
    { id: "22", userId: "342", amount: 87, date: 1721692800000 },
    { id: "23", userId: "213", amount: 151, date: 1718582400000 },
    { id: "24", userId: "213", amount: 34, date: 1723507200000 },
    { id: "25", userId: "213", amount: 121, date: 1718409600000 },
    { id: "26", userId: "523", amount: 53, date: 1722729600000 },
    { id: "27", userId: "624", amount: 141, date: 1717804800000 },
    { id: "28", userId: "624", amount: 120, date: 1723334400000 },
    { id: "29", userId: "123", amount: 157, date: 1717545600000 },
];

/* const totalRewards:Re = [
    {
      totalPoints: 0,
      userId: "123"
    },
    {
      totalPoints: 0,
      userId: "523"
    },
    {
      totalPoints: 0,
      userId: "342"
    }
  ] */

export function mockAPI(
    shouldFail: boolean = false,
    delay: number = 1000
): Promise<{ status: number; message: string; data: Transaction[] }> {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (shouldFail) {
                rej(new Error("API Error: Something went wrong"));
            } else {
                res({
                    status: 200,
                    message: "Success",
                    data: customerTransactions,
                });
            }
        }, delay);
    });
}
