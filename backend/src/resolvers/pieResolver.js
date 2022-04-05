const pieResolver = {
  Query: {
    getPie(_, args) {
      const oneTwelfth = 1 / 12;
      const oldPercent = 1.0 + args.j / 100;

      let interestRate = Math.pow(oldPercent, oneTwelfth);

      const investedAmount = args.vi + args.vp * args.t;

      let accumulatedValue = args.vi;

      Array(args.t)
        .fill(0)
        .map(() => {
          let saving = accumulatedValue * interestRate;
          accumulatedValue = saving + args.vp;
        });

      let pieData = {
        accumulatedValue: accumulatedValue,
        spared: investedAmount,
        accumulatedMonthly: investedAmount - args.vi,
        totalInterestRate: accumulatedValue - investedAmount,
        initialInvestment: args.vi,
        data: [],
      };

      let pieList = [
        {
          label: "Investimento Mensal Acumulado",
          id: "accumulatedMonthly",
          value: pieData.accumulatedMonthly,
          percent:
            (pieData.accumulatedMonthly / pieData.accumulatedValue) * 100,
        },
        {
          label: "Juros",
          id: "totalInterestRate",
          value: pieData.totalInterestRate,
          percent: (pieData.totalInterestRate / pieData.accumulatedValue) * 100,
        },
        {
          label: "Investimento Inicial",
          id: "initialInvestment",
          value: pieData.initialInvestment,
          percent: (pieData.initialInvestment / pieData.accumulatedValue) * 100,
        },
      ];

      pieData.data = pieList;

      return pieData;
    },
  },
};

module.exports = pieResolver;
