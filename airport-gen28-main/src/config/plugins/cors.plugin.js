import cors from 'cors';

export const enableCors = (app, acceptedOrigins) => {
  app.use(cors({
    origin: (origin, callback) => {
      //en caso de que el servidor que hace la peticion
      //se incluye en los origines que acepta mi servidor
      //entonces se permite
      if(acceptedOrigins.includes(origin)){
        return callback(null, true)
      }
      //en caso de que el origen de donde se hace la peticiion
      //sea mi mismo servidor entonces se permite
      if(!origin){
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    }
  }))
}