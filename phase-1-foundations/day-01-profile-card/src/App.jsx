import { Moon, Sun, Mail, Github, Linkedin, MapPin } from "lucide-react";
import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(true);
  const avatars = ['John', 'Sarah', "Mike", "Emma", "Alex"]
  const [avatarSeed, setAvatarSeed] = useState(0);

  const handleImageClick = () => {
setAvatarSeed((avatarSeed + 1 ) % avatars.length)
  }
  return (
    <div
      className={`min-h-screen flex items-center justify-center p-8 transition-colors duration-300 ${
        isDark ? "bg-gray-950" : "bg-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-2xl shadow-2xl hover:-translate-y-4 overflow-hidden transition-all duration-300 ${
          isDark ? "bg-gray-900" : "bg-white"
        }`}
      >
        {/* theme toggle  */}
        <div className="p-4 flex justify-end">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } cursor-pointer`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        {/* Profile Content  */}
        <div className="px-8 pb-8">
          <div className="flex justify-center -mt-4">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full blur-sm"></div>
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatars[avatarSeed]}`}
                alt="Profile"
                onClick={handleImageClick}
                className="relative w-32 h-32 rounded-full border-4 border-gray-900 bg-gray-800 cursor-pointer"
              />
            </div>
          </div>
        

        {/* Name & Title */}
        <div
          className="text-center
mt-4"
        >
          <h2
            className={`text-2xl font-bold transition-colors ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            John Doe
          </h2>
          <p
            className={`text-sm mt-1 transition-colors ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Full Stack Developer
          </p>
          <div
            className={`flex items-center justify-center gap-1 mt-2 text-sm transition-colors text-gray-500`}
          >
            <MapPin size={14} />
            <span>San Francisco, CA</span>
          </div>
        </div>

        {/* Bio */}
        <p
          className={`text-center mt-4 text-sm leading-relaxed transition-colors ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Passionate about building beautiful web experiences with React and
          modern technologies. Coffee enthusiast ☕
        </p>

        {/* My work : Skills */}
<div className="flex flex-wrap justify-center gap-2 mt-4">
  <span className={`px-3 py-1 rounded-full text-xs ${
    isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'
  }`}>React</span>
  
  <span className={`px-3 py-1 rounded-full text-xs ${
    isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
  }`}>Tailwind</span>
  
  <span className={`px-3 py-1 rounded-full text-xs ${
    isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'
  }`}>Node</span>
  
  <span className={`px-3 py-1 rounded-full text-xs ${
    isDark ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-700'
  }`}>MongoDB</span>
</div>
        {/* Stats */}
<div className="flex justify-around mt-4 py-4 border-y border-gray-800">
  <div className="text-center">
    <div className={`text-2xl font-bold transition-colors ${
      isDark ? 'text-white' : 'text-gray-900'
    }`}>
      1.2K
    </div>
    <div className={`text-xs transition-colors ${
      isDark ? 'text-gray-500' : 'text-gray-500'
    }`}>
      Followers
    </div>
  </div>
  
  <div className="text-center">
    <div className={`text-2xl font-bold transition-colors ${
      isDark ? 'text-white' : 'text-gray-900'
    }`}>
      487
    </div>
    <div className={`text-xs transition-colors ${
      isDark ? 'text-gray-500' : 'text-gray-500'
    }`}>
      Following
    </div>
  </div>
  
  <div className="text-center">
    <div className={`text-2xl font-bold transition-colors ${
      isDark ? 'text-white' : 'text-gray-900'
    }`}>
      52
    </div>
    <div className={`text-xs transition-colors ${
      isDark ? 'text-gray-500' : 'text-gray-500'
    }`}>
      Posts
    </div>
  </div>
</div>

{/* Buttons */}
<div className="flex gap-3 mt-6">
  <button className="flex-1 bg-linear-to-r from-purple-500 to-pink-500 text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity">
    Follow
  </button>
  <button className={`flex-1 py-2.5 rounded-lg font-medium transition-colors ${
    isDark 
      ? 'bg-gray-800 text-white hover:bg-gray-700' 
      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
  }`}>
    Message
  </button>
</div>

{/* Social Links */}
<div className="flex justify-center gap-4 mt-6">
  <a href="#" className={`p-2 rounded-lg transition-colors ${
    isDark ? 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-300'
  }`}>
    <Github size={20} />
  </a>
  <a href="#" className={`p-2 rounded-lg transition-colors ${
    isDark ? 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-300'
  }`}>
    <Linkedin size={20} />
  </a>
  <a href="#" className={`p-2 rounded-lg transition-colors ${
    isDark ? 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-300'
  }`}>
    <Mail size={20} />
  </a>
</div>
      </div>
    </div>
    </div>
  );
}

export default App;
