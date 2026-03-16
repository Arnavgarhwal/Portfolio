"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock } from "lucide-react";

export default function AdminLogin({ 
  isOpen, 
  onClose, 
  onSuccess 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSuccess: () => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "arnav garhwal" && password === "@Ag12345") {
      setError(false);
      setUsername("");
      setPassword("");
      // Store auth state (Note: easily clearable on the client side, but serves the purpose)
      localStorage.setItem("is_admin", "true");
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="w-full max-w-md bg-[#111116] border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Lock className="text-[#FF9541] w-5 h-5" />
                <h3 className="text-xl font-bold text-white">Admin Access</h3>
              </div>
              <button 
                onClick={onClose}
                className="text-neutral-500 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg mb-4 text-center">
                  Invalid credentials. Please try again.
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1 pl-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF9541] focus:ring-1 focus:ring-[#FF9541]/50 transition-all font-medium"
                  placeholder="Enter admin username"
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1 pl-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF9541] focus:ring-1 focus:ring-[#FF9541]/50 transition-all font-medium"
                  placeholder="Enter secure password"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-4 bg-[#FF9541] hover:bg-[#ffb070] text-black font-bold rounded-xl transition-colors shadow-[0_0_15px_rgba(255,149,65,0.2)]"
              >
                Login to Dashboard
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
