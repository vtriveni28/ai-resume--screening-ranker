import { FaBriefcase, FaRocket } from "react-icons/fa";

function JDInput({ jd, setJd, onAnalyze, loading }) {

  return (

    <div className="bg-white rounded-2xl shadow-xl p-8">

      <div className="flex items-center gap-4 mb-6">

        <div className="bg-indigo-100 p-3 rounded-xl">
          <FaBriefcase className="text-indigo-600 text-2xl" />
        </div>

        <div>

          <h2 className="text-2xl font-bold">
            Job Description
          </h2>

          <p className="text-gray-500">
            Paste the job description to evaluate candidates
          </p>

        </div>

      </div>

      <textarea
        rows={12}
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        placeholder="Paste the complete job description here..."
        className="w-full border border-slate-300 rounded-xl p-5 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />

      <div className="flex justify-between items-center mt-3">

        <span className="text-sm text-gray-500">
          {jd.length} Characters
        </span>

        <span className="text-sm text-gray-400">
          AI analyzes skills, education & experience
        </span>

      </div>

      <button
        onClick={onAnalyze}
        disabled={loading}
        className="mt-8 w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl text-lg font-semibold flex justify-center items-center gap-3 transition disabled:opacity-60"
      >

        <FaRocket />

        {loading
          ? "Analyzing..."
          : "Analyze Resumes"}

      </button>

    </div>

  );

}

export default JDInput;
