import { IGenerateTokenConfigDTO, IDecodeTokenResponseDTO } from '../dtos';

interface IJWTProvider {
  generateToken(secret: string, config: IGenerateTokenConfigDTO): string;
  decodeToken<T extends IDecodeTokenResponseDTO>(token: string, secret: string): T;
}

export { IJWTProvider };
