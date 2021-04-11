import { IGenerateTokenConfigDTO, IDecodeTokenResponseDTO } from '../dtos';
import { IJWTProvider } from '../model/IJWTProvider';

interface IInMemoryTokens {
  token: string;
  secret: string;
  config: IGenerateTokenConfigDTO;
}

class InMemoryJWTProvider implements IJWTProvider {
  private tokens: IInMemoryTokens[] = [];

  generateToken(secret: string, config: IGenerateTokenConfigDTO): string {
    const token = `${secret}-${config.subject}-${new Date().getTime()}`;

    this.tokens.push({
      token,
      secret,
      config,
    });

    return token;
  }

  decodeToken<T extends IDecodeTokenResponseDTO>(token: string, secret: string): T {
    const findToken = this.tokens.find(
      thisToken => thisToken.token === token && thisToken.secret === secret,
    );

    return findToken
      ? ({ sub: findToken.config.subject, ...findToken.config.payload } as T)
      : ({ sub: '' } as T);
  }
}

export { InMemoryJWTProvider };
