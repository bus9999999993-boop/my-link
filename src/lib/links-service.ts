import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  getDoc,
  setDoc,
  type Unsubscribe,
} from "firebase/firestore";
import { type User } from "firebase/auth";
import { db } from "@/lib/firebase";
import { type LinkCartridge } from "@/data/links";

/**
 * 이메일 앞부분을 Display Name으로 추출하는 헬퍼 함수
 * 예: "developer.kim@gmail.com" -> "developer.kim"
 */
export function getEmailDisplayName(
  email?: string | null,
  fallback: string = "User"
): string {
  if (!email) return fallback;
  const prefix = email.split("@")[0]?.trim();
  return prefix || fallback;
}

/**
 * Firestore에 저장되는 유저 정보 인터페이스 (경로: users/{uid})
 */
export interface UserProfileDoc {
  uid: string;
  email: string;
  displayName: string; // 이메일 앞부분
  photoURL?: string | null;
  firestorePath: string; // "users/{uid}/link"
  lastLoginAt?: any;
}

/**
 * users/{uid} 경로에 유저 프로필 정보를 동기화(저장/업데이트)합니다.
 * display name은 이메일 앞부분을 기본값으로 사용합니다.
 */
export async function syncUserProfile(user: User): Promise<UserProfileDoc> {
  const userDocRef = doc(db, "users", user.uid);
  const email = user.email || "";
  const displayName = getEmailDisplayName(email, user.displayName || "User");
  const firestorePath = `users/${user.uid}/link`;

  const profileData: UserProfileDoc = {
    uid: user.uid,
    email,
    displayName,
    photoURL: user.photoURL || null,
    firestorePath,
    lastLoginAt: serverTimestamp(),
  };

  await setDoc(userDocRef, profileData, { merge: true });
  return profileData;
}

/**
 * users/{uid} 경로에서 유저 프로필 정보를 조회합니다.
 */
export async function getUserProfile(uid: string): Promise<UserProfileDoc | null> {
  try {
    const userDocRef = doc(db, "users", uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data() as UserProfileDoc;
    }
    return null;
  } catch (error) {
    console.error("getUserProfile error:", error);
    return null;
  }
}

/**
 * uid 기반 link 컬렉션 레퍼런스 반환
 * 경로: users/{uid}/link
 */
export function getLinksCollectionRef(uid: string) {
  return collection(db, "users", uid, "link");
}

/**
 * 새 링크 카트리지를 Firestore에 추가합니다.
 * 경로: users/{uid}/link
 */
export async function addLinkToFirestore(
  uid: string,
  link: Omit<LinkCartridge, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const colRef = getLinksCollectionRef(uid);
  const docRef = await addDoc(colRef, {
    label: link.label,
    code: link.code,
    desc: link.desc,
    url: link.url,
    tag: link.tag,
    tagColor: link.tagColor,
    createdAt: serverTimestamp(),
    updatedAt: null,
  });
  return docRef.id;
}

/**
 * users/{uid}/link 컬렉션의 모든 링크를 1회 가져옵니다.
 */
export async function getFirestoreLinks(uid: string): Promise<LinkCartridge[]> {
  const colRef = getLinksCollectionRef(uid);
  const q = query(colRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      label: data.label ?? "",
      code: data.code ?? "",
      desc: data.desc ?? "",
      url: data.url ?? "",
      tag: data.tag ?? "",
      tagColor: data.tagColor ?? "",
      createdAt: data.createdAt,
      updatedAt: data.updatedAt ?? null,
    };
  });
}

/**
 * users/{uid}/link 컬렉션의 링크 목록을 실시간 구독 (구독 해제 함수 반환)
 */
export function subscribeToFirestoreLinks(
  uid: string,
  onSuccess: (links: LinkCartridge[]) => void,
  onError?: (error: unknown) => void
): Unsubscribe {
  const colRef = getLinksCollectionRef(uid);
  const q = query(colRef, orderBy("createdAt", "desc"));

  return onSnapshot(
    q,
    (snapshot) => {
      const items: LinkCartridge[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          label: data.label ?? "",
          code: data.code ?? "",
          desc: data.desc ?? "",
          url: data.url ?? "",
          tag: data.tag ?? "",
          tagColor: data.tagColor ?? "",
          createdAt: data.createdAt,
          updatedAt: data.updatedAt ?? null,
        };
      });
      onSuccess(items);
    },
    (error) => {
      console.error("[Firestore] subscribeToFirestoreLinks error:", error);
      onError?.(error);
    }
  );
}

/**
 * users/{uid}/link 컬렉션의 특정 링크를 수정합니다.
 * updatedAt 을 serverTimestamp()로 자동 기록합니다.
 */
export async function updateLinkInFirestore(
  uid: string,
  id: string,
  link: Partial<Omit<LinkCartridge, "id" | "createdAt" | "updatedAt">>
): Promise<void> {
  const docRef = doc(db, "users", uid, "link", id);
  await updateDoc(docRef, {
    ...link,
    updatedAt: serverTimestamp(),
  });
}

/**
 * users/{uid}/link 컬렉션의 특정 링크를 삭제합니다.
 */
export async function deleteLinkFromFirestore(
  uid: string,
  id: string
): Promise<void> {
  const docRef = doc(db, "users", uid, "link", id);
  await deleteDoc(docRef);
}

/**
 * users/{uid}/link 컬렉션 내의 링크를 모두 삭제(초기화)합니다.
 */
export async function clearFirestoreLinks(uid: string): Promise<void> {
  const colRef = getLinksCollectionRef(uid);
  const snapshot = await getDocs(colRef);
  const deletePromises = snapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
  await Promise.all(deletePromises);
}
