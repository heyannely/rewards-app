import type { Input, Output } from "./types/reward.type";

  
const customerTransactions: Input = [
{
    id: "0",
    userId: "123",
    amount: 5,
    date: 1717891200000
},
{
    id: "1",
    userId: "342",
    amount: 5,
    date: 1718715600000
},
{
    id: "2",
    userId: "523",
    amount: 5,
    date: 1719936000000
},
{
    id: "3",
    userId: "123",
    amount: 5,
    date: 1722297600000
},
{
    id: "4",
    userId: "123",
    amount: 5,
    date: 1724908800000
},
]

const totalRewards:Output = [
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
  ]

export function mockAPI (shouldFail:boolean = false, delay:number = 1000):Promise<{status: number; message: string; data: Input}> {
    return new Promise ((res, rej) => {
        setTimeout(()=>{
            if(shouldFail){
                rej(new Error('API Error: Something went wrong'));
            } else {
                res({
                    status: 200,
                    message: "Success",
                    data: customerTransactions,
                });
            }
        }, delay)
    });
}