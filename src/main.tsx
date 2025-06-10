import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

/**
 * 
 * Input: all transactions in a 3-month period
 * Output: All reward points for each customer
 * *
 * 
 * string, number, boolean, 
 * 
 * array: repetitive item,  same type
 * object: single item
 * 
 * If 1 transaction happen in Janurary, then there should not be another transaction happen in July
 */


  /**
   * 
   *  Input is an array of transactions.
   * 
   * We want to create each element of the res array which should match our Output data.
   * 
   * Reward is an empty object that gets updated with each transaction data.
   * 
   * Each element contains the user Id and the amount. If the empty reward object has this id,
   * then we calculate the bonus and add it total points property. If the userID does not exist,
   * then we create a new key value pair for userId and calculate the bonus and set it equal to a new property.
   * 
   *   let reward = {
    "123": 15,
    "342": 5,
    "523": 5,
  };
   */




// console.log(JSON.stringify(calculateRewards(customerTransactions)) === JSON.stringify(totalRewards))
// console.log(calculateRewards(customerTransactions), totalRewards)