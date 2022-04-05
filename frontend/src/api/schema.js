import { gql } from "@apollo/client";

const GET_DATA = gql`
query getPie($vi: Float!, $vp: Float!, $t: Int!, $j: Float!) {
  getPie(vi: $vi, vp: $vp, t: $t, j: $j) {
    accumulatedValue
    spared
    accumulatedMonthly
    totalInterestRate
    initialInvestment
    data {
      id
      label
      percent
      value
    }
  }
  getLine(vi: $vi, vp: $vp, t: $t, j: $j) {
    id
    data
    name
  }
}
`;

export default GET_DATA;
