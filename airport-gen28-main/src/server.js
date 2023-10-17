import { envs } from './config/enviroments/enviroments.js'
import app from "./app.js"
import { authenticate, syncUp } from './config/database/database.js'
import { initModel } from './config/database/associations.js'

async function main(){
  try {
    await authenticate()
    initModel()
    await syncUp()
  } catch (error) {
    console.error(error)
  }
}

main()

// app.listen(envs.PORT, () => {
//   console.log(`Server running on port ${envs.PORT}`)
// })

app.listen(3000, () => console.log('Server on port 3000'))