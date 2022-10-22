export interface NoteInterface {
  title: string;
  text: string;
  timestamps: {
    readonly createdAt: Date;
    updateAt: Date;
  };
  isPublic: boolean;
  user?: UserInterface;
  readonly idUser?: string;
  readonly _id: string;
}

export interface UserInterface {
  _id: string;
  readonly email: string;
  firstname: string;
  lastname: string;
  password: string;
  dateOfBirhDate?: Date;
  readonly createdAt: Date;
}

export interface TokenUserInfo {
  readonly id: string;
  readonly email: string;
}

export interface TokenResult {
  token: string;
  message: string;
}

export interface ErrorsMessage {
  message: string;
}

export interface FieldInterface {
  value: string;
  error: boolean;
  helpertext?: string;
}
