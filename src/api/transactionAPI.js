const { mockTransactionData } = require('../mockData/mockdata')
/**
 * 
 * @returns mock transaction data
 */
const fetchTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTransactionData);
    }, 1000);
  });
};

module.exports = { fetchTransactions }