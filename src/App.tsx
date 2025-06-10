import { useState, useEffect } from "react";
import { mockAPI } from "./mockAPI";
import "./App.css";
import type { RewardEntry, Transaction } from "./types/reward.type";
import { generateRewardsData, getMonthStringList } from "./utils/rewardUtils";
import Loader from "./components/Loader/Loader";

function App() {
    const [transactions, setTransactions] = useState<Transaction[] | null>(
        null
    );
    const [rewards, setRewards] = useState<RewardEntry[] | null>(null);
    const [monthStringList, setMonthStringList] = useState<
        [string, string, string] | null
    >(null);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const res = await mockAPI(false, 1500);
                setTransactions(res.data);
            } catch (err: any) {
                console.log(err, "error");
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    const handleCalculateRewards = () => {
        if (transactions === null) return;
        setRewards(generateRewardsData(transactions));
        setMonthStringList(getMonthStringList(transactions));
    };

    return (
        <div className="reward--container">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>UserID</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions?.map((tx) => {
                                const date = new Date(tx.date);
                                const readableDate = date.toLocaleDateString();
                                return (
                                    <tr key={tx.id}>
                                        <td>{tx.id}</td>
                                        <td>{tx.userId}</td>
                                        <td>{tx.amount}</td>
                                        <td>{readableDate}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <button onClick={handleCalculateRewards}>
                        Calculate Rewards
                    </button>
                    {rewards && (
                        <table>
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Total Rewards</th>
                                    {monthStringList?.map((monthString) => (
                                        <th key={monthString}>{monthString}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rewards?.map((reward) => (
                                    <tr key={reward.userId}>
                                        <td>{reward.userId}</td>
                                        <td>{reward.totalReward}</td>
                                        {monthStringList?.map((monthString) => (
                                            <td key={monthString}>
                                                {reward.monthRewards[
                                                    monthString
                                                ] || "N/A"}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </>
            )}
        </div>
    );
}

export default App;
