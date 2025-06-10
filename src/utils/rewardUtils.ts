import type { Input, Output, RewardData } from "../types/reward.type";

export const generateRewardsData = (input:Input): Output => {

    let res:Output = [];
  
    let reward:{[id:string]:{totalReward: number, [month:string]:number}} = {};
  
    input.forEach((transaction)=>{
      /**Assuming we know the month this transaction is from,
       * {"123": {totalReward:5,jun:0, jul:0, aug:5}}
      */

      let transactionMonth = getMonthFromTimestamp(transaction.date)

      const currentReward = calculateReward(transaction.amount)

      if(transaction.userId in reward){
        reward[transaction.userId].totalReward += currentReward;
        if(transactionMonth in reward[transaction.userId]){
          reward[transaction.userId][transactionMonth] += currentReward;
        } else {
          reward[transaction.userId][transactionMonth] = currentReward;
        }

      } else {
        /**
         * when the userId does not exist, we create a new userID in reward
         * There current reward is the total reward because this is the first
         * transaction we encounter with this ID. 
         * 
         * The transaction month is the only month in this transaction
         * with this user. There is only one reward so it goes in this month.
         * 
         * Because this is the first time we encounter this user,
         * the total reward is also the reward for this month.
         * 
         */
        reward[transaction.userId] = {
          totalReward:currentReward, 
          [transactionMonth]: currentReward
        };
      }

    })
  /**
   *[{userId:123, totalReward: 5, jun:0, jul:0, aug:5},{}]
   * 
   */
    for(let userId in reward){
      res.push({
        userId, 
        totalReward: number, 
        monthRewards:{[month:string]:number }
      })
    }
  
    return res;
  }

const getMonthFromTimestamp = (timestamp:number) : string => {
  const date = new Date(timestamp);
  const monthString = date.toLocaleString('default', {month: 'short',});
  return monthString
}
const calculateReward = (amt:number) : number => {

    let totalBonus = 0;
  
    if(amt > 100){
      totalBonus = ((amt - 100) * 2)+ 50
    } else if (amt > 50 && amt <= 100){
      totalBonus = amt - 50 
    } else {
      totalBonus = 0
    }
  
    return totalBonus;
  }