interface MongodbConfigProps {
  connectionString: string
  databaseName: string
}


export interface ConfigProps {
  mongodb: MongodbConfigProps
  jwt: {
    secret: string
  }
}

export const config = (): ConfigProps => ({
  mongodb: {
    connectionString: process.env.MONGO_URI || 'mongodb://localhost:27017',
    databaseName: process.env.MONGODB_DATABASE_NAME
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY
  }
})
