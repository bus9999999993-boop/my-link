import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  where,
  getDocs,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { type User, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
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
  displayName: string; // 기본값: 이메일 앞부분
  bio?: string; // 한 줄 소개
  photoURL?: string | null;
  firestorePath: string; // "users/{uid}/link"
  lastLoginAt?: any;
  updatedAt?: any;
}

/**
 * users/{uid} 경로에 유저 프로필 정보를 동기화(저장/업데이트)합니다.
 * 기존에 설정된 커스텀 displayName이나 bio가 있다면 보존합니다.
 */
export async function syncUserProfile(user: User): Promise<UserProfileDoc> {
  const userDocRef = doc(db, "users", user.uid);
  const snap = await getDoc(userDocRef);

  const email = user.email || "";
  const firestorePath = `users/${user.uid}/link`;

  if (snap.exists()) {
    const existing = snap.data() as UserProfileDoc;
    // 기존에 displayName이 설정되어 있으면 유지, 없으면 이메일 앞부분 사용
    const finalDisplayName =
      existing.displayName || getEmailDisplayName(email, user.displayName || "User");
    const updatedData: Partial<UserProfileDoc> = {
      uid: user.uid,
      email,
      displayName: finalDisplayName,
      photoURL: user.photoURL || existing.photoURL || null,
      firestorePath,
      lastLoginAt: serverTimestamp(),
    };
    await setDoc(userDocRef, updatedData, { merge: true });
    return {
      ...existing,
      ...updatedData,
    };
  }

  // 신규 가입 시 기본 displayName = 이메일 앞부분
  const initialDisplayName = getEmailDisplayName(email, user.displayName || "User");
  const profileData: UserProfileDoc = {
    uid: user.uid,
    email,
    displayName: initialDisplayName,
    bio: "개인화된 Firestore 저장소에 링크 카트리지를 등록하고 실시간으로 관리합니다.",
    photoURL: user.photoURL || null,
    firestorePath,
    lastLoginAt: serverTimestamp(),
  };

  await setDoc(userDocRef, profileData, { merge: true });
  return profileData;
}

/**
 * Display Name 중복 확인 함수
 * 자신(currentUid)을 제외한 다른 사용자가 이미 사용 중인지 확인합니다.
 * @returns true: 이미 사용 중 (중복), false: 사용 가능
 */
export async function isDisplayNameTaken(
  newDisplayName: string,
  currentUid: string
): Promise<boolean> {
  const trimmed = newDisplayName.trim();
  if (!trimmed) return false;

  const usersRef = collection(db, "users");
  const q = query(usersRef, where("displayName", "==", trimmed));
  const snapshot = await getDocs(q);

  // 검색 결과 중 본인(currentUid)의 문서가 아닌 다른 유저의 문서가 1개 이상이면 중복!
  return snapshot.docs.some((docSnap) => docSnap.id !== currentUid);
}

/**
 * users/{uid} 경로의 유저 프로필(Display Name, Bio 등)을 수정합니다.
 */
export async function updateUserProfile(
  uid: string,
  updates: { displayName: string; bio?: string }
): Promise<void> {
  const userDocRef = doc(db, "users", uid);
  await updateDoc(userDocRef, {
    displayName: updates.displayName.trim(),
    bio: updates.bio?.trim() || "",
    updatedAt: serverTimestamp(),
  });

  // Firebase Auth의 currentUser displayName도 함께 동기화
  if (auth.currentUser && auth.currentUser.uid === uid) {
    try {
      await updateProfile(auth.currentUser, {
        displayName: updates.displayName.trim(),
      });
    } catch (e) {
      console.warn("Failed to update auth.currentUser profile:", e);
    }
  }
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
