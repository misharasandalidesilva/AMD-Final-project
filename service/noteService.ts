// services/noteService.ts
import { db } from '../firebaseConfig';
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot, query, where } from 'firebase/firestore';
import { Task } from '../type/note';

const tasksCollection = (userId: string) => collection(db, 'tasks');

export async function addTask(task: Task) {
  return await addDoc(collection(db, 'tasks'), task);
}

export async function updateTask(id: string, task: Partial<Task>) {
  const ref = doc(db, 'tasks', id);
  return await updateDoc(ref, task);
}

export async function deleteTask(id: string) {
  const ref = doc(db, 'tasks', id);
  return await deleteDoc(ref);
}

export function listenUserTasks(userId: string, cb: (tasks: Task[]) => void) {
  const q = query(collection(db, 'tasks'), where('userId', '==', userId));
  return onSnapshot(q, (snap) => {
    const arr: Task[] = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Task));
    cb(arr);
  });
}
