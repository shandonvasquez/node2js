import City from "./city.model.js";

export class CityService {

  async findAllCities(){
    return await City.findAll({ where: { status: true }})
  }

  async findOneCity(id){
    return await City.findOne({
      where : {
        id,
        status: true
      },
    })
  }

  async createCity(data) {
    return await City.create( data )
  }

  async updateCity(city, data){
    return await city.update(data)
  }

  async deleteCity(city){
    return await city.update({ status: false })
  }

}