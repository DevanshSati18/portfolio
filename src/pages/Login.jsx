import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseconfig";

const Login = () => {
  const [user, loading] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firebaseError, setFirebaseError] = useState(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setFirebaseError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setFirebaseError("Invalid email or password!");
      setShowErrorPopup(true);

      // Hide popup automatically after 3 seconds
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 3000);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/images/th.jpeg')" }}
    >
      {/* Glass Login Box */}
      <div className="bg-black/80 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full max-w-md relative border border-gray-700">
        <h2 className="text-white text-3xl font-bold text-center mb-8 tracking-wide">
          Library Login <i className="fa fa-sign-in ml-2" aria-hidden="true" />
        </h2>

        <form onSubmit={handleLogin} className="space-y-8">
          {/* Email Input */}
          <div className="relative">
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full border-b-2 border-gray-400 bg-transparent text-white placeholder-transparent focus:outline-none focus:border-blue-400 py-2"
              placeholder="Email"
            />
            <label
              htmlFor="email"
              className="absolute left-0 text-gray-300 text-base transition-all
                peer-placeholder-shown:top-2
                peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400
                peer-focus:top-[-18px]
                peer-focus:text-sm
                peer-focus:text-blue-400"
            >
              Email
            </label>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full border-b-2 border-gray-400 bg-transparent text-white placeholder-transparent focus:outline-none focus:border-blue-400 py-2"
              placeholder="Password"
            />
            <label
              htmlFor="password"
              className="absolute left-0 text-gray-300 text-base transition-all
                peer-placeholder-shown:top-2
                peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400
                peer-focus:top-[-18px]
                peer-focus:text-sm
                peer-focus:text-blue-400"
            >
              Password
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-6 rounded-lg font-semibold transition duration-300 w-full"
          >
            Submit <i className="fa fa-arrow-right ml-2" aria-hidden="true" />
          </button>
        </form>
      </div>

      {/* Animated Popup for Errors */}
      {showErrorPopup && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-red-500 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transform scale-100 animate-popup">
            ❌ Invalid email or password!
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
