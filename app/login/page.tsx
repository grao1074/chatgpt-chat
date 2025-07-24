import styles from '../form.module.css';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // For now, we're just simulating a successful login and redirecting.
    // In a real application, you would send credentials to a server here.
    router.push('/');
  };

  return (
    <div className={styles.formContainer}>
      <h1>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit" className={styles.loginButton}>
          Login
        </button>
      </form>
    </div>
  );
} 