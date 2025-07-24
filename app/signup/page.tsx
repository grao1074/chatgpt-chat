import styles from '../form.module.css';

export default function SignUpPage() {
  return (
    <div className={styles.formContainer}>
      <h1>Sign Up</h1>
      <form className={styles.form}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" required />

        <button type="submit" className={styles.signUpButton}>
          Sign Up
        </button>
      </form>
    </div>
  );
} 