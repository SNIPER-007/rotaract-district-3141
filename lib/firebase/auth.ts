import {
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	type User,
} from "firebase/auth";
import { app } from "./config";

export const auth = getAuth(app);

export function signInAdminWithEmail(email: string, password: string) {
	return signInWithEmailAndPassword(auth, email, password);
}

export function signOutAdmin() {
	return signOut(auth);
}

export function subscribeToAuthStateChanged(callback: (user: User | null) => void) {
	return onAuthStateChanged(auth, callback);
}