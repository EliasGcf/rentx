interface IGenerateTokenConfigDTO {
  payload?: Record<string, unknown>;
  subject: string;
  expiresIn: string;
}

export { IGenerateTokenConfigDTO };
