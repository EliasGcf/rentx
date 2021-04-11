import { container } from 'tsyringe';

import * as carsRepositories from '@modules/cars/repositories';
import * as rentsRepositories from '@modules/rents/repositories';
import * as accountsRepositories from '@modules/accounts/repositories';

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
  container.registerSingleton<carsRepositories.ICategoriesRepository>(
    registeredRepositories.categoriesRepository,
    carsRepositories.CategoriesRepository,
  );

  container.registerSingleton<carsRepositories.ISpecificationsRepository>(
    registeredRepositories.specificationsRepository,
    carsRepositories.SpecificationsRepository,
  );

  container.registerSingleton<accountsRepositories.IUsersRepository>(
    registeredRepositories.usersRepository,
    accountsRepositories.UsersRepository,
  );

  container.registerSingleton<carsRepositories.ICarsRepository>(
    registeredRepositories.carsRepository,
    carsRepositories.CarsRepository,
  );

  container.registerSingleton<carsRepositories.ICarsImagesRepository>(
    registeredRepositories.carsImagesRepository,
    carsRepositories.CarsImagesRepository,
  );

  container.registerSingleton<rentsRepositories.IRentsRepository>(
    registeredRepositories.rentsRepository,
    rentsRepositories.RentsRepository,
  );

  container.registerSingleton<accountsRepositories.IUsersTokensRepository>(
    registeredRepositories.usersTokensRepository,
    accountsRepositories.UsersTokensRepository,
  );
}

export { registeredRepositories, registerRepositories };
