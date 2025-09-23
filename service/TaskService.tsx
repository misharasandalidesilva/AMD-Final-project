import { auth, db } from "@/firebase";
import Task from "@/type/task";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, Query, updateDoc, where } from "firebase/firestore";

export const taskRef = collection(db, "tasks");

export const addTask = async (task: Task) => {
    try { 
        const uId = auth.currentUser?.uid;
        const docRef = await addDoc(taskRef, {...task,uId})   
        return docRef 
    }
 catch (error) {
        console.error("Error adding task: ", error);
        throw error;
    }
 }

 export const fetchTaskByid = async (id: string):Promise<Task | null>  => {
    try {
        const docRef = doc(db, "tasks", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return {...docSnap.data(), id: docSnap.id} as Task;
        }else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching task: ", error);
        throw error;
    }
 }

 export const deletetask = async (id: string) => {
    try {
        const docRef = doc(db, "tasks", id);
        return deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting task: ", error);
        throw error;
    }
    }

export const updateTask = async (id: string, task:Task) => {
    try {
        const docRef = doc(db, "tasks", id);
        const {id:_id, ...taskData} = task; // Exclude id from task data
        return updateDoc(docRef, taskData);
    } catch (error) {
        console.error("Error updating task: ", error);
        throw error;
    }
}

export const fetchTask = async (uId: string): Promise<Task[]> => {
  try {
    // Create the query
    const taskQuery = query(
      taskRef,
      where("uId", "==", uId),
      orderBy("date", "desc")
    );

    // Execute query
    const querySnapshot = await getDocs(taskQuery);

    // Map documents to Task[]
    const tasks: Task[] = querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Task)
    );

    return tasks;
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    throw error;
  }
};