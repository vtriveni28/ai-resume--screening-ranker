import {
  FaFileAlt,
  FaStar,
  FaUserCheck,
  FaTrophy,
} from "react-icons/fa";

function DashboardStats({ results }) {
  if (!results || results.length === 0) return null;

  const totalResumes = results.length;

  const averageScore =
    (
      results.reduce(
        (sum, candidate) => sum + candidate.score.total,
        0
      ) / totalResumes
    ) * 100;

  const hireReady = results.filter(
    (candidate) => candidate.score.total >= 0.8
  ).length;

  const topCandidate = results.reduce((best, current) =>
    current.score.total > best.score.total
      ? current
      : best
  );

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-10">

      <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
          <FaFileAlt className="text-2xl text-slate-700" />
        </div>

        <p className="text-gray-500 mt-5">
          Total Resumes
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {totalResumes}
        </h2>
      </div>

      <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center">
          <FaStar className="text-2xl text-amber-600" />
        </div>

        <p className="text-gray-500 mt-5">
          Average Score
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {averageScore.toFixed(0)}%
        </h2>
      </div>

      <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
          <FaUserCheck className="text-2xl text-emerald-600" />
        </div>

        <p className="text-gray-500 mt-5">
          Hire Ready
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {hireReady}
        </h2>
      </div>

      <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
        <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
          <FaTrophy className="text-2xl text-purple-600" />
        </div>

        <p className="text-gray-500 mt-5">
          Top Candidate
        </p>

        <h2 className="text-xl font-bold mt-2 truncate">
          {topCandidate.profile.contact?.name || "Unknown"}
        </h2>
      </div>

    </div>
  );
}

export default DashboardStats;
