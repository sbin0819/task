export type TUserRole = 'Admin' | 'Viewer' | 'RegularUser' | 'PrimeUser';

export interface IUser {
  userName: string;
  userPhone: string;
  userEmail: string;
  userRole: TUserRole;
  createdAt: string;
  lastLoggedInAt: string;
}
