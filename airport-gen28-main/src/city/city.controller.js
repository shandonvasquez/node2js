import { catchAsync } from "../errors/index.js";
import { validateCity, validatePartialCity } from "./city.schema.js";
import { CityService } from "./city.service.js"

const cityService = new CityService();

export const findAllCities = catchAsync( async(req, res) => {
    const cities = await cityService.findAllCities()
    return res.status(200).json(cities)
})

export const findOneCity = catchAsync( async(req, res) => {
    const { city } = req;
    return res.status(200).json(city)
})

export const createCity = catchAsync( async(req, res) => {
    const { hasError, errorMessages, cityData } = validateCity(req.body)

    if(hasError){
      return res.status(422).json({
        status: 'error',
        messages: errorMessages
      })
    }

    const city = await cityService.createCity(cityData)
    return res.status(201).json(city)
})

export const deleteCity = catchAsync( async(req, res) => {
    const { city } = req;
    await cityService.deleteCity(city)
    return res.status(204).json(null)
})

export const updateCity = catchAsync(async(req, res) => {
    const { city } = req;
    const { hasError, errorMessages, dataCity } = validatePartialCity(req.body)
    if(hasError){
      return res.status(422).json({
        status: 'error',
        message: errorMessages
      })
    }
    const cityUpdated = await cityService.updateCity(city, dataCity)
    return res.status(200).json(cityUpdated)
})
