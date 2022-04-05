const { gql } = require("apollo-server");

const querys = gql`
    type Query {
        getPie(vi: Float!, vp: Float!, t: Int!, j: Float!): PieData
        getLine(vi: Float!, vp: Float!, t: Int!, j: Float!): [LineData]
    }
`;

module.exports = querys;