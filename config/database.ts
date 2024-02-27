import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/lucid'
import Env from '@ioc:Adonis/Core/Env'

const dbConfig = defineConfig({
  connection: Env.get('DB_CONNECTION', 'sqlite'),
  connections: {
    sqlite: {
      client: 'better-sqlite3',
      connection: {
        filename: app.tmpPath('db.sqlite3'),
      },
      useNullAsDefault: true,
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
