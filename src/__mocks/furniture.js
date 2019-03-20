export const assetsBySubType = {
    table: require('../assets/furniture/table_small.png'),
    table_7: require('../assets/furniture/table_right_small.png')
};

export const nameByType = {
    table: 'Стол',
};


export default [
  {
    type: 'table',
    subType: 'table',
    image: assetsBySubType.table,
  },
  {
    type: 'table',
    subType: 'table_7',
    image: assetsBySubType.table_7,
  }
]
