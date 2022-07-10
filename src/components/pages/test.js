exports = async function (payload) {
  let collection = context.services
    .get('mongodb-atlas')
    .db('pulsexDB')
    .collection('sacrifices');
  let data = await collection.aggregate([
    { $match: { exchange: { $ne: true } } },
    {
      $group: {
        _id: '$from',
        totalUsdPerAdress: { $sum: '$usdSacValue' }
      }
    },
    { $sort: { totalUsdPerCoin: -1 } }
  ]);

  return data;
};
