import { FaRobot } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-lg">

      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">

        <div className="flex items-center gap-5">

          <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg">
            <FaRobot size={28} />
          </div>

          <div>

            <h1 className="text-3xl font-bold tracking-tight">
              AI Resume Ranker
            </h1>

            <p className="text-slate-300 mt-1">
              Smart ATS for Recruiters • Analyze • Rank • Hire Faster
            </p>

          </div>

        </div>

        <div className="flex items-center gap-2 bg-slate-800 px-5 py-2 rounded-full">

          <HiSparkles className="text-amber-400" />

          <span className="text-sm font-medium">
            Recruiter Dashboard
          </span>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
