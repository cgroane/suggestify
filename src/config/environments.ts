
// import dotenv from 'dotenv';
/**
 *  this automatically changes from development to production (build serves production)
 */

console.log(process.env.PRODUCTION_VAR);

export const environments = {
  serverUrl: "http://localhost:3001/api"
}

