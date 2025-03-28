import { EntitySchema } from 'typeorm';

export const Users = new EntitySchema({
  name: 'Users',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    username: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    password: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
  },
});