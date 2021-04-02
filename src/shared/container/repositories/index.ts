import { container } from 'tsyringe';

import { IUsersRepository, UsersRepository } from '@modules/accounts/repositories';
import {
  ICategoriesRepository,
  CategoriesRepository,
  ISpecificationsRepository,
  SpecificationsRepository,
  ICarsRepository,
  CarsRepository,
  ICarsImagesRepository,
  CarsImagesRepository,
} from '@modules/cars/repositories';
import { IRentsRepository, RentsRepository } from '@modules/rents/repositories';

const registeredRepositories = {
  categoriesRepository: 'CategoriesRepository',
  specificationsRepository: 'SpecificationsRepository',
  usersRepository: 'UsersRepository',
  carsRepository: 'CarsRepository',
  carsImagesRepository: 'CarsImagesRepository',
  rentsRepository: 'RentsRepository',
} as const;

function register() {
  container.registerSingleton<ICategoriesRepository>(
    registeredRepositories.categoriesRepository,
    CategoriesRepository,
  );

  container.registerSingleton<ISpecificationsRepository>(
    registeredRepositories.specificationsRepository,
    SpecificationsRepository,
  );

  container.registerSingleton<IUsersRepository>(
    registeredRepositories.usersRepository,
    UsersRepository,
  );

  container.registerSingleton<ICarsRepository>(
    registeredRepositories.carsRepository,
    CarsRepository,
  );

  container.registerSingleton<ICarsImagesRepository>(
    registeredRepositories.carsImagesRepository,
    CarsImagesRepository,
  );

  container.registerSingleton<IRentsRepository>(
    registeredRepositories.rentsRepository,
    RentsRepository,
  );
}

export { registeredRepositories, register };
