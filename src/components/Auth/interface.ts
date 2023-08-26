export interface IUserinfo {
  accessToken?: string;
  displayName: string;
  email: string;
  photoURL?: string;
  uid?: string;
  metadata?: {
    createdAt?: string;
    creationTime?: string;
    lastLoginAt?: string;
    lastSignInTime?: string;
  }
}

export type Form_Values = {
  email: string;
  password: string;
  remember: boolean;
}
