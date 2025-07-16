import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/app/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";

export interface Student {
  firstname: string;
  lastname: string;
}

export function useStudentInfo() {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: FirebaseUser | null) => {
        if (!firebaseUser) {
          router.replace("/login");
        } else {
          const docRef = doc(db, "student", firebaseUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const studentData = docSnap.data();
            setStudent({
              firstname: studentData.firstname,
              lastname: studentData.lastname,
            });
          } else {
            const fallbackName = firebaseUser.displayName || firebaseUser.email || "Anonymous";
            setStudent({ firstname: fallbackName, lastname: "" });
          }
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, [router]);

  return { student, loading, setStudent };
}

export async function handleLogout(setStudent: (s: Student | null) => void, router: any) {
  await signOut(auth);
  setStudent(null);
  router.replace("/login");
}