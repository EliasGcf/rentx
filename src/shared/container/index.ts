import { container } from 'tsyringe';

import { UsersRepository } from '../../modules/accounts/repositories/implementations/UsersRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';
import { SpecificationsRepository } from '../../modules/cars/repositories/implementations/SpecificationsRepository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository';

export const registeredDependencies = {
  categoriesRepository: 'CategoriesRepository',
  specificationsRepository: 'SpecificationsRepository',
  usersRepository: 'UsersRepository',
} as const;

container.registerSingleton<ICategoriesRepository>(
  registeredDependencies.categoriesRepository,
  CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
  registeredDependencies.specificationsRepository,
  SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>(
  registeredDependencies.usersRepository,
  UsersRepository,
);
