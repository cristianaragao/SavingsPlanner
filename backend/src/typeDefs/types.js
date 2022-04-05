const { gql } = require("apollo-server");

const types = gql`

    type PieList {
        id: ID!
        label: String!
        value: Float!
        percent: Float!
    }

    type PieData {
        accumulatedValue: Float!
        spared: Float!
        accumulatedMonthly: Float!
        totalInterestRate: Float!
        initialInvestment: Float!
        data: [PieList]
    }

    type LineData {
        name: String!
        id: ID!
        data: [Float!]
    }

`;

module.exports = types;