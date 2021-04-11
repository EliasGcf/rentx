import { ICreateCarDTO, IFindAllAvailableDTO } from '@modules/cars/dtos';
import { Car } from '@modules/cars/entities';

import { ICarsRepository } from '../ICarsRepository';

class InMemoryCarsRepository implements ICarsRepository {
  private cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, data);

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAllAvailable(data?: IFindAllAvailableDTO): Promise<Car[]> {
    let availableCars = this.cars.filter(car => car.available);

    if (!data) return availableCars;

    const { name, brand, category_id } = data;

    availableCars = availableCars.filter(car => {
      if (!name && !brand && !category_id) return true;

      if (car.name === name) return true;
      if (car.brand === brand) return true;
      if (car.category_id === category_id) return true;

      return false;
    });

    return availableCars;
  }

  async findById(id: string): Promise<Car | undefined> {
    return this.cars.find(car => car.id === id);
  }

  async save(car: Car): Promise<void> {
    const findIndex = this.cars.findIndex(findCar => findCar.id === car.id);

    this.cars[findIndex] = car;
  }

  async updateAvailable(id: string, isAvailable: boolean): Promise<void> {
    const car = await this.findById(id);

    if (car) car.available = isAvailable;
  }
}

export { InMemoryCarsRepository };
