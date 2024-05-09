import { SetMetadata } from '@nestjs/common';

export const SKIP_JWT_KEY = 'skipJWT';
export const SkipJWT = () => SetMetadata(SKIP_JWT_KEY, true);