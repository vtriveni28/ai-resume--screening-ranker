import {
  FaMedal,
  FaArrowRight,
  FaUserTie,
} from "react-icons/fa";

function RankingTable({ results, onView }) {

  if (!results || results.length === 0) return null;

  return (

    <div className="mt-12">

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-slate-800">
          🏆 Ranked Candidates
        </h2>

        <p className="text-gray-500 mt-2">
          Candidates ranked based on AI resume analysis and job description matching.
        </p>

      </div>

      <div className="space-y-6">

        {results.map((candidate, index) => {

          const score = candidate.score.total;

          let badge = {};

          if (score >= 0.85) {

            badge = {
              text: "Excellent Match",
              bg: "bg-emerald-100",
              textColor: "text-emerald-700",
            };

          } else if (score >= 0.70) {

            badge = {
              text: "Strong Match",
              bg: "bg-amber-100",
              textColor: "text-amber-700",
            };

          } else {

            badge = {
              text: "Potential Match",
              bg: "bg-rose-100",
              textColor: "text-rose-700",
            };

          }

          return (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 p-6 border border-slate-200"
            >

              <div className="flex justify-between items-center">

                {/* Left */}

                <div className="flex items-center gap-5">

                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">

                    {index === 0 ? (
                      <span className="text-3xl">🥇</span>
                    ) : index === 1 ? (
                      <span className="text-3xl">🥈</span>
                    ) : index === 2 ? (
                      <span className="text-3xl">🥉</span>
                    ) : (
                      <FaMedal className="text-2xl text-slate-500" />
                    )}

                  </div>

                  <div>

                    <h3 className="text-xl font-bold text-slate-800">

                      {candidate.profile.contact?.name || "Unknown Candidate"}

                    </h3>

                    <p className="text-gray-500 mt-1 flex items-center gap-2">

                      <FaUserTie />

                      {candidate.filename}

                    </p>

                  </div>

                </div>

                {/* Right */}

                <div className="text-right">

                  <h2 className="text-5xl font-bold text-slate-800">

                    {(score * 100).toFixed(0)}%

                  </h2>

                  <span
                    className={`inline-block mt-3 px-4 py-2 rounded-full text-sm font-semibold ${badge.bg} ${badge.textColor}`}
                  >
                    {badge.text}
                  </span>

                  <div>

                    <button
                      onClick={() => onView(candidate)}
                      className="mt-5 inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl transition"
                    >

                      View Profile

                      <FaArrowRight />

                    </button>

                  </div>

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

}

export default RankingTable;
