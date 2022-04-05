const lineResolver = {
  Query: {
    getLine(_, args) {
      let accumulatedValue = args.vi;

      let investedAmountList = [accumulatedValue];
      let accumulatedValueList = [accumulatedValue];

      const oneTwelfth = 1 / 12;
      const oldPercent = 1.0 + args.j / 100;

      let interestRate = Math.pow(oldPercent, oneTwelfth);

      investedAmountList = [
        ...investedAmountList,
        ...Array(args.t)
          .fill(0)
          .map((_, index) => args.vi + args.vp * (index + 1)),
      ];

      accumulatedValueList = [
        ...accumulatedValueList,
        ...Array(args.t)
          .fill(0)
          .map(() => {
            let saving = accumulatedValue * interestRate;
            accumulatedValue = saving + args.vp;
            return accumulatedValue;
          }),
      ];

      let lineArrayData = [];

      lineArrayData.push({
        name: "Valor Investido",
        id: "investedValue",
        data: investedAmountList,
      });

      lineArrayData.push({
        name: "Valor Acumulado",
        id: "accumulatedValue",
        data: accumulatedValueList,
      });

      return lineArrayData;
    },
  },
};

module.exports = lineResolver;
