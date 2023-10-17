import morgan from 'morgan'

export const enableMorgan = (app) => {
  app.use(morgan('dev'))
}