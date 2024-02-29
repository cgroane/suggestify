
// import dotenv from 'dotenv';
/**
 *  this automatically changes from development to production (build serves production)
 */

console.log(process.env.PRODUCTION_VAR);

export const environments = {
  serverUrl: process.env.REACT_APP_API_URL
}

