function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center px-6">
      
      {/* Floating background glow */}
      <div className="absolute w-80 h-80 bg-purple-600 opacity-20 blur-[120px] rounded-full -top-10 -left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-blue-600 opacity-20 blur-[120px] rounded-full bottom-0 right-0 animate-pulse delay-300"></div>

      {/* Glass Card */}
      <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-10 max-w-md w-full text-center animate-fade-in">
        
        {/* Icon / Logo */}
        <div className="text-5xl mb-4 animate-float">
          🚀
        </div>

        {/* Name */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Devansh Sati
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 mt-2">
          Software Engineering Student
        </p>

        {/* Under Construction */}
        <p className="mt-6 text-lg text-gray-400 animate-pulse">
          ⚙️ Portal Under Construction
        </p>

        {/* Loader */}
        <div className="flex justify-center mt-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Links */}
        <div className="flex items-center justify-center gap-6 mt-8 text-2xl">
          
          <a 
            href="mailto:devanshjsati@gmail.com"
            className="hover:text-purple-400 transition-all duration-300 hover:scale-125"
          >
            ✉️
          </a>

          <a 
            href="https://www.linkedin.com/in/devansh-sati"
            target="_blank"
            className="hover:text-blue-400 transition-all duration-300 hover:scale-125"
          >
            🔗
          </a>

          <a 
            href="https://github.com/DevanshSati18"
            target="_blank"
            className="hover:text-gray-400 transition-all duration-300 hover:scale-125"
          >
            🧑‍💻
          </a>

          <a 
            href="https://drive.google.com/your-resume"
            target="_blank"
            className="hover:text-green-400 transition-all duration-300 hover:scale-125"
          >
            📄
          </a>
        </div>

        {/* Coming Soon */}
        <p className="text-sm text-gray-500 mt-6">
          Preparing your access panel…
        </p>
      </div>
    </div>
  );
}

export default App;
