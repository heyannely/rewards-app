import { useState, useEffect } from 'react'
import { mockAPI } from './mockAPI'
import './App.css'
import type { Input, Output } from './types/reward.type'
import { calculateRewards } from './utils/rewardUtils'

function App() {
  const [transactions, setTransactions] = useState<Input>([])
  const [rewards, setRewards] = useState<Output>([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await mockAPI(false, 1500);
        setTransactions(res.data)
      } catch (err: any) {
        console.log(err, "error")
      }
    };
    fetchUser();
  }, [])

  const handleCalculateRewards = () => {
    setRewards(calculateRewards(transactions))
  }

  return (
    <div>
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
          {transactions.map((tx) => {
            const date = new Date(tx.date)
            const readableDate = date.toLocaleDateString();
            return <tr key={tx.id}>
              <td>{tx.id}</td>
              <td>{tx.userId}</td>
              <td>{tx.amount}</td>
              <td>{readableDate}</td>
            </tr>
          })}
        </tbody>
      </table>

      <button onClick={handleCalculateRewards}>Calculate Rewards</button>

      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Total Rewards</th>
          </tr>
        </thead>
        <tbody>
          {rewards.map((reward)=>(<tr key={reward.userId}>
            <td>{reward.userId}</td>
            <td>{reward.totalPoints}</td>
          </tr>))}

        </tbody>
      </table>
    </div>
  )
}

export default App
