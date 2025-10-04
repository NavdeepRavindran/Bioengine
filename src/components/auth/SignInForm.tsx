import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpaceVideo from "./videos/your-video.mp4"; // <-- Import your video

export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Add auth logic here
    navigate("/"); // Redirect to Home
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="flex-1 flex flex-col justify-center px-12 py-12 bg-black text-white relative z-10">

        <h1 className="text-4xl font-bold mb-6 text-cyan-400">Sign In</h1>
        <p className="text-gray-400 mb-10">
          Welcome back! Enter your credentials to access the BioSpaceEngine.
        </p>

        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label className="block mb-2 text-gray-400">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-400">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-cyan-400 text-black font-semibold hover:bg-cyan-500 transition"
          >
            Sign In
          </button>
        </form>
      </div>

      {/* Right Side */}
      <div className="flex-1 relative overflow-hidden hidden md:flex items-center justify-center">
        <video
          src={SpaceVideo} // <-- Use imported video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <h1 className="text-4xl md:text-5xl font-bold text-white z-10 text-center px-6">
          Welcome to <span className="text-cyan-400">BioSpaceEngine</span>
        </h1>
      </div>
    </div>
  );
}
