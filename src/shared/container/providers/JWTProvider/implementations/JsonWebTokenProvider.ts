import { sign, verify } from 'jsonwebtoken';

import { IDecodeTokenResponseDTO, IGenerateTokenConfigDTO } from '../dtos';
import { IJWTProvider } from '../model/IJWTProvider';

class JsonWebTokenProvider implements IJWTProvider {
  generateToken(secret: string, config: IGenerateTokenConfigDTO): string {
    const token = sign(config.payload || {}, secret, {
      subject: config.subject,
      expiresIn: config.expiresIn,
    });

    return token;
  }

  decodeToken<T extends IDecodeTokenResponseDTO>(token: string, secret: string): T {
    const decoded = (verify(token, secret) as unknown) as T;

    return decoded;
  }
}

export { JsonWebTokenProvider };
