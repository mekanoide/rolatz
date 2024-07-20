import Dexie, { type EntityTable } from 'dexie'

const db = new Dexie('database') as Dexie & {
  characters: EntityTable<Character, 'id'>
  games: EntityTable<Game, 'id'>
}

// Schema declaration:
db.version(1).stores({
  characters: '++id, name',
  games: '++id, name'
})

export { db }
