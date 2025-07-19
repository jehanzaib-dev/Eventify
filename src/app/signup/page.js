"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { findUserByEmail, addUser } from "@/utils/mockUsers";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    // 1. Empty field validation
    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    // 2. Check duplicate email
    if (findUserByEmail(email)) {
      setError("User with this email already exists");
      return;
    }

    // 3. Add user
    const newUser = { name, email, password };
    const savedUser = addUser(newUser);
    localStorage.setItem("user", JSON.stringify(savedUser));

    toast.success("Account created!");
    window.dispatchEvent(new Event("userChange"));
    router.push("/homepage");
  };

  return (
    <main className="flex min-h-[calc(100vh-10rem)] items-center justify-center bg-gray-400 dark:bg-gray-900">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white/70 p-8 shadow-sm backdrop-blur dark:border-gray-700 dark:bg-gray-800/70">
        <h2 className="mb-6 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Sign Up
        </h2>

        <form onSubmit={handleSignup} className="space-y-5">
          {/* Name */}
          <div className="space-y-1">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              required
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              required
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white
              shadow-sm transition
              hover:bg-indigo-700 active:translate-y-px
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500
              dark:bg-indigo-500 dark:hover:bg-indigo-400
            "
          >
            Sign Up
          </button>

          {/* Error */}
          {error && (
            <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 dark:border-red-600/40 dark:bg-red-900/30 dark:text-red-300"
              aria-live="assertive"
            >
              {error}
            </p>
          )}
        </form>

        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
