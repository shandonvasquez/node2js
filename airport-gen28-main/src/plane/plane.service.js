import Plane from './plane.model.js';

export class PlaneService {
  async findOne(id) {
    return await Plane.findOne({
      where: {
        id,
        status: true,
      },
    });
  }

  async findAll() {
    return await Plane.findAll({
      where: {
        status: true,
      },
    });
  }

  async create(planeData) {
    return await Plane.create(planeData);
  }

  async update(plane, planeData) {
    return await plane.update(planeData);
  }

  async delete(plane) {
    return await plane.update({ status: false });
  }
}
