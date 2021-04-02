import 'tsyringe';
import { registeredDependencies } from '@shared/container';

const tokenValues = Object.values(registeredDependencies);

type tokens = typeof tokenValues[number];

declare module 'tsyringe' {
  declare function inject(
    token: tokens,
  ): (target: any, propertyKey: string | symbol, parameterIndex: number) => any;

  export { inject };
}
