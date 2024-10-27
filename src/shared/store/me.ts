import { atomWithStorage } from 'jotai/utils';
import { IUser } from 'shared/types/users/types';

export const meAtom = atomWithStorage<IUser | null>('meAtom', null);
