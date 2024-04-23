// src/db.ts
import Dexie, { Table } from 'dexie';

export interface User {
  id?: number;
  name: string;
  email: string;
  age: number;
}

export class MySubClassedDexie extends Dexie {
  users!: Table<User>;

  constructor() {
    super('MyDatabase');
    this.version(1).stores({
      users: '++id, name, email, age'
    });
  }
}

export const db = new MySubClassedDexie();