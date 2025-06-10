import { useState, useEffect } from "react";
import { mockAPI } from "./mockAPI";
import "./App.css";
import type { RewardEntry, Transaction } from "./types/reward.type";
import { generateRewardsData, getMonthStringList } from "./utils/rewardUtils";
import Loader from "./components/Loader/Loader";
import { formatCurrency } from "./utils/rewardUtils";

function App() {
    const [transactions, setTransactions] = useState<Transaction[] | null>(
        null
    );
    const [rewards, setRewards] = useState<RewardEntry[] | null>(null);
    const [monthStringList, setMonthStringList] = useState<
        [string, string, string] | null
    >(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [calculating, setCalculating] = useState<boolean>(false);
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
        setCalculating(true);
      
        // Simulate delay (optional, for realism or async future-proofing)
        setTimeout(() => {
          setRewards(generateRewardsData(transactions));
          setMonthStringList(getMonthStringList(transactions));
          setCalculating(false);
        }, 500);
      };

    return (
        <div className="reward--container">
          {/* Left Column: Transactions */}
          <div className="column">
            <h2>Transactions</h2>
            {loading ? (
              <Loader />
            ) : (
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
                    const formattedAmt = formatCurrency(tx.amount);
                    return (
                      <tr key={tx.id}>
                        <td>{tx.id}</td>
                        <td>{tx.userId}</td>
                        <td>{formattedAmt}</td>
                        <td>{readableDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
      
          {/* Right Column: Rewards */}
          <div className="column">
  <h2>Rewards per User by Month</h2>
  <button onClick={handleCalculateRewards} disabled={calculating}>
    {calculating ? "Calculating..." : "Calculate Rewards"}
  </button>

  {calculating ? (
    <Loader />
  ) : (
    rewards && (
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
          {rewards.map((reward) => (
            <tr key={reward.userId}>
              <td>{reward.userId}</td>
              <td>{reward.totalReward} pts</td>
              {monthStringList?.map((monthString) => (
                <td key={monthString}>
                  {reward.monthRewards[monthString] !== undefined
                    ? `${reward.monthRewards[monthString]} pts`
                    : "N/A"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  )}
</div>
        </div>
      );
}

export default App;
