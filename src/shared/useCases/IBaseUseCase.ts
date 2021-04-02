interface IBaseUseCase {
  execute(data?: unknown): Promise<unknown>;
}

export { IBaseUseCase };
