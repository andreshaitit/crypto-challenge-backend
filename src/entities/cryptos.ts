import { EntitySchema } from 'typeorm';

export const Cryptos = new EntitySchema({
  name: 'Cryptos',
  tableName: 'cryptos',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    ticker: {
      type: 'varchar',
      length: 10,
      nullable: false,
    },
    purchase_price: {
      type: 'numeric',
      precision: 15,
      scale: 2,
      nullable: false,
    },
    purchase_quantity: {
      type: 'numeric',
      precision: 15,
      scale: 2,
      nullable: false,
    },
    invested_amount: {
      type: 'numeric',
      precision: 15,
      scale: 2,
    },
  },
});