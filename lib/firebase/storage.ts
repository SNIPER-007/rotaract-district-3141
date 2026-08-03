import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "./config";

export const storage = getStorage(app);

export async function uploadFileToStorage(filePath: string, file: File) {
	const storageRef = ref(storage, filePath);
	const uploadResult = await uploadBytes(storageRef, file);

	return getDownloadURL(uploadResult.ref);
}

export { getDownloadURL, ref, uploadBytes };