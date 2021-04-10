/* eslint-disable @typescript-eslint/no-explicit-any */
interface IBaseUseCase {
  execute(data?: unknown): Promise<any>;
}

export { IBaseUseCase };
