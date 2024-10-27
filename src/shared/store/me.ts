import { atomWithStorage } from 'jotai/utils';
import { IUser } from 'shared/api/users/types';

export const meAtom = atomWithStorage<IUser | null>('meAtom', null);
