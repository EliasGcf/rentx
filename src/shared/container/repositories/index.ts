import { container } from 'tsyringe';

import {
  IUsersRepository,
  IUsersTokensRepository,
  UsersRepository,
  UsersTokensRepository,
} from '@modules/accounts/repositories';
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
  usersTokensRepository: 'UsersTokensRepository',
} as const;

function registerRepositories() {
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

  container.registerSingleton<IUsersTokensRepository>(
    registeredRepositories.usersTokensRepository,
    UsersTokensRepository,
  );
}

export { registeredRepositories, registerRepositories };
