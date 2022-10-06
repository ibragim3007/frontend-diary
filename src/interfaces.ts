export interface NoteInterface {
  title: string;
  text: string;
  timestamp: {
    readonly createdAt: Date;
    updateAt: Date;
  };
  readonly idUser?: string;
}

export interface UserInterface {
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
