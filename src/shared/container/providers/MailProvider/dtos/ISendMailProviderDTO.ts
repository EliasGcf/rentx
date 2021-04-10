interface ISendMailProviderDTO<T = Record<string, unknown>> {
  to: string;
  subject: string;
  variables: T;
  path: string;
}
export { ISendMailProviderDTO };
