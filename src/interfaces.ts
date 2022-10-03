export interface NoteInterface {
  title: string;
  text: string;
  timestamp: {
    createdAt: Date;
    updateAt: Date;
  };
  idUser?: string;
}

export interface UserInterface {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  dateOfBirhDate?: Date;
  createdAt: Date;
}

export interface TokenUserInfo {
  id: string;
  email: string;
}
