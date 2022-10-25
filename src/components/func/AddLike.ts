import axios from 'axios';
import { API_LOCAL } from './../../config';
import { NoteInterface, UserInterface } from './../../interfaces';

const request = async <T>(url: string, body: unknown): Promise<void> => {
  const token = localStorage.getItem('token');
  await axios.post<T>(url, body, { headers: { authorization: token ? `Bearer ${token}` : '' } }).then(response => {
    return response.data;
  });
};

export const AddLike = async (
  user: UserInterface,
  idNote: string,
  isLiked: boolean,
  notes: NoteInterface[],
  setNotes: React.Dispatch<React.SetStateAction<NoteInterface[] | undefined>>,
): Promise<void> => {
  if (isLiked) {
    setNotes(
      notes?.map(note => {
        if (note._id === idNote) {
          note.usersLiked = note.usersLiked.filter(userLiked => userLiked !== user._id);
        }
        return note;
      }),
    );
  } else {
    setNotes(
      notes?.map(note => {
        if (note._id === idNote) {
          note.usersLiked.push(user._id);
        }
        return note;
      }),
    );
  }
  await request(`${API_LOCAL}/api/note/likeNote`, { idNote, idUser: user._id, isLiked });
};
