
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useAuth } from "../features/auth/auth.store";
import { useState } from "react";

export default function AuthCard() {
  const { user, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const signIn = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e: any) {
      setError(e?.message ?? "Не удалось войти");
    }
  };

  const signOutNow = async () => {
    await signOut(auth);
  };

  if (loading) {
    return <div style={styles.page}>Загрузка…</div>;
  }

  if (!user) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={{ marginBottom: 8 }}>Firebase Google Auth</h1>
          <p style={{ opacity: 0.7, marginBottom: 16 }}>Войдите, чтобы продолжить</p>
          <button style={styles.primaryBtn} onClick={signIn}>Войти через Google</button>
          {error && <p style={{ color: "#ef4444", marginTop: 12 }}>{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={{ marginBottom: 8 }}>Привет, {user.displayName ?? "безымянный"}!</h1>
        <p style={{ opacity: 0.7, marginBottom: 16 }}>{user.email}</p>
        {user.photoURL && (
          <img
            src={user.photoURL}
            alt="avatar"
            width={96}
            height={96}
            style={{ borderRadius: 12, marginBottom: 16 }}
          />
        )}
        <button style={styles.secondaryBtn} onClick={signOutNow}>Выйти</button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "60dvh",
    display: "grid",
    placeItems: "center",
    background: "transparent",
    color: "#fafafa",
    padding: 16,
    fontFamily:
      "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "#171717",
    border: "1px solid #262626",
    borderRadius: 16,
    padding: 24,
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,.35)",
  },
  primaryBtn: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: "1px solid #22c55e",
    background: "#22c55e",
    color: "#0a0a0a",
    fontWeight: 700,
    cursor: "pointer",
  },
  secondaryBtn: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: "1px solid #404040",
    background: "transparent",
    color: "#fafafa",
    fontWeight: 700,
    cursor: "pointer",
  },
};
