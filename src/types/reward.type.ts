
export type Transaction = {
    id: string,
    userId: string,
    amount: number,
    date: number //jan 1 1970, epoch time (unix timestamp) utc
  }
  
export type Input = Transaction[];

// export type RewardData = {[id:string]:{totalReward: number, [month:string]:number}}

export type RewardData = {userId:string, totalReward: number, monthRewards:{[month:string]:number }}
  
export type Output = RewardData[]


  


  