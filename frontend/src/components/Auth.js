import React, { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendEmailVerification, GoogleAuthProvider, signInWithPopup, deleteUser, sendPasswordResetEmail } from "firebase/auth";
import { Box, Button, TextField, Typography, Paper, Grid } from "@mui/material";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [profileName, setProfileName] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetSent, setResetSent] = useState(false);
  // Forgot password handler
  const handleForgotPassword = async () => {
    setError("");
    setResetSent(false);
    if (!email) {
      setError("Please enter your email to reset your password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (err) {
      setError(formatAuthError(err));
    }
  };

  // Helper to get user profile name from Firestore
  const fetchProfileName = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists() && userDoc.data().profile && userDoc.data().profile.name) {
        setProfileName(userDoc.data().profile.name);
      } else {
        setProfileName("");
      }
    } catch (err) {
      setProfileName("");
    }
  };

  // Password rules: 8+ chars, at least 1 number, at least 1 special char
  const passwordValid = (pw) => {
    return pw.length >= 8 && /[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    if (!isLogin) {
      if (!name.trim()) {
        setError("Name is required.");
        return;
      }
      if (!passwordValid(password)) {
        setError("Password must be at least 8 characters, include a number and a special character.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }
    try {
      if (isLogin) {
        try {
          const res = await signInWithEmailAndPassword(auth, email, password);
              if (res.user.emailVerified) {
                setUser(res.user);
                await fetchProfileName(res.user.uid);
                await fetchProfileName(res.user.uid); // Fetch profile name after login
          } else {
            setError("Please verify your email before logging in.");
            await signOut(auth);
          }
        } catch (err) {
          setError(formatAuthError(err));
        }
      } else {
        try {
          const res = await createUserWithEmailAndPassword(auth, email, password);
          await sendEmailVerification(res.user);
          setVerificationSent(true);
          setPendingUser(res.user);
          // Save name to Firestore profile (update if exists, create if not)
          try {
            await updateDoc(doc(db, "users", res.user.uid), { "profile.name": name, "profile.email": email });
          } catch {
            await setDoc(doc(db, "users", res.user.uid), { profile: { name, email } }, { merge: true });
          }
          await fetchProfileName(res.user.uid); // Fetch profile name after signup
          await fetchProfileName(res.user.uid); // Fetch profile name after signup
        } catch (err) {
          if (err.code === "auth/email-already-in-use") {
                  await fetchProfileName(res.user.uid);
            setError(formatAuthError(err));
          }
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResendVerification = async () => {
  setError("");
  if (pendingUser) {
    try {
      await sendEmailVerification(pendingUser);
      setVerificationSent(true);
    } catch (err) {
      setError("Failed to resend verification email.");
    }
  }
};

  const handleGoogleAuth = async () => {
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      setUser(res.user);
      await fetchProfileName(res.user.uid);
    } catch (err) {
      setError(formatAuthError(err));
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setProfileName("");
  };

  // Delete account
  const handleDeleteAccount = async () => {
    if (user) {
      try {
        await deleteUser(user);
        setUser(null);
        setProfileName("");
      } catch (err) {
        setError("Failed to delete account. Please re-login and try again.");
      }
    }
  };

  // Format Firebase auth errors for user-friendly display
  function formatAuthError(err) {
    if (!err || !err.code) return "An unknown error occurred.";
    switch (err.code) {
      case "auth/invalid-email":
        return "Invalid email address.";
      case "auth/weak-password":
        return "Password must be at least 8 characters, include a number and a special character.";
      case "auth/wrong-password":
        return "Incorrect password.";
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/email-already-in-use":
        return "An account with this email already exists.";
      default:
        return err.message.replace(/^Firebase: |\(auth.*\)$/gi, "").trim();
    }
  }

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      {user ? (
        <Box textAlign="center">
          <Typography variant="h6">
            Welcome, {profileName ? profileName : (user.displayName ? user.displayName : user.email)}
          </Typography>
          <Button variant="outlined" color="secondary" onClick={handleLogout} sx={{ mt: 2, mr: 2 }}>
            Logout
          </Button>
          <Button variant="outlined" color="error" onClick={handleDeleteAccount} sx={{ mt: 2 }}>
            Delete Account
          </Button>
        </Box>
      ) : (
        <>
          {verificationSent && !isLogin ? (
            <Box textAlign="center">
              <Typography color="primary" sx={{ mb: 2 }}>
                Verification email sent! Please check your inbox and verify your email before logging in.
              </Typography>
              <Button variant="outlined" color="primary" onClick={handleResendVerification} sx={{ mb: 2 }}>
                Resend Verification Email
              </Button>
              <Button variant="contained" color="primary" onClick={() => setIsLogin(true)}>
                Back to Login
              </Button>
            </Box>
          ) : (
            <form onSubmit={handleAuth}>
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                {!isLogin && (
                  <Grid item xs={12} sm={5}>
                    <TextField
                      label="Name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>
                )}
                <Grid item xs={12} sm={isLogin ? 5 : 5}>
                  <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={isLogin ? 5 : 5}>
                  <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                {!isLogin && (
                  <Grid item xs={12} sm={5}>
                    <TextField
                      label="Confirm Password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>
                )}
                <Grid item xs={12} sm={2}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    {isLogin ? "Login" : "Sign Up"}
                  </Button>
                </Grid>
                {isLogin && (
                  <Grid item xs={12}>
                    <Button color="primary" onClick={handleForgotPassword} sx={{ textTransform: 'none' }}>
                      Forgot password?
                    </Button>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button color="secondary" onClick={() => setIsLogin((v) => !v)}>
                    {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined" color="primary" onClick={handleGoogleAuth} fullWidth>
                    Sign in with Google
                  </Button>
                </Grid>
                {resetSent && (
                  <>
                    <Grid item xs={12}>
                      <Typography color="primary">Password reset email sent! Please check your inbox.</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" color="primary" onClick={() => setIsLogin(true)}>
                        Back to Login
                      </Button>
                    </Grid>
                  </>
                )}
                {error && (
                  <Grid item xs={12}>
                    <Typography color="error">{error}</Typography>
                  </Grid>
                )}
              </Grid>
            </form>
          )}
        </>
      )}
    </Paper>
  );
}

export default Auth;
