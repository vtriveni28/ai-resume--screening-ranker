import DownloadButton from "./DownloadButton";

function ResultCard({ result }) {

  if (!result) return null;

  const { profile, score } = result;

  return (

    <div
      id="report"
      className="bg-white rounded-2xl shadow-xl p-8"
    >

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold">
          🏆 Candidate Analysis
        </h2>

        <DownloadButton />

      </div>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* Candidate Details */}

        <div>

          <h3 className="text-xl font-semibold mb-4">
            👤 Candidate Profile
          </h3>

          <div className="space-y-3">

            <p>
              <strong>Name:</strong>{" "}
              {profile.contact?.name || "N/A"}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {profile.contact?.email || "N/A"}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {profile.contact?.phone || "N/A"}
            </p>

            <p>
              <strong>Experience:</strong>{" "}
              {profile.total_experience_years} Years
            </p>

          </div>

        </div>

        {/* Overall Score */}

        <div className="text-center">

          <h3 className="text-xl font-semibold mb-4">
            ⭐ Overall Score
          </h3>

          <div className="w-44 h-44 mx-auto rounded-full border-8 border-blue-500 flex items-center justify-center">

            <span className="text-5xl font-bold text-blue-600">
              {(score.total * 100).toFixed(0)}%
            </span>

          </div>

          <p className="mt-6 text-2xl font-bold">

            {score.total >= 0.8
              ? "🟢 Highly Recommended"
              : score.total >= 0.6
              ? "🟡 Recommended"
              : "🔴 Not Recommended"}

          </p>

        </div>

      </div>

      {/* Score Breakdown */}

      <div className="mt-12">

        <h3 className="text-2xl font-bold mb-5">
          📊 Score Breakdown
        </h3>

        <div className="space-y-5">

          {Object.entries(score).map(([key, value]) => {

            if (key === "total") return null;

            return (

              <div key={key}>

                <div className="flex justify-between mb-2">

                  <span className="capitalize font-medium">
                    {key}
                  </span>

                  <span>
                    {(value * 100).toFixed(0)}%
                  </span>

                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">

                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{
                      width: `${value * 100}%`,
                    }}
                  />

                </div>

              </div>

            );

          })}

        </div>

      </div>

      {/* Education */}

      <div className="mt-12">

        <h3 className="text-2xl font-bold mb-5">
          🎓 Education
        </h3>

        {profile.education?.length > 0 ? (

          profile.education.map((edu, index) => (

            <div
              key={index}
              className="border rounded-xl p-4 mb-4 bg-gray-50"
            >

              <p>
                <strong>Degree:</strong>{" "}
                {edu.degree || "N/A"}
              </p>

              <p>
                <strong>Institution:</strong>{" "}
                {edu.institution || "N/A"}
              </p>

              <p>
                <strong>CGPA:</strong>{" "}
                {edu.cgpa ?? "N/A"}
              </p>

              <p>
                <strong>Year:</strong>{" "}
                {edu.year || "N/A"}
              </p>

            </div>

          ))

        ) : (

          <p>No education details found.</p>

        )}

      </div>

      {/* Skills */}

      <div className="mt-12">

        <h3 className="text-2xl font-bold mb-5">
          🛠 Skills
        </h3>

        <div className="flex flex-wrap gap-3">

          {profile.skills?.length > 0 ? (

            profile.skills.map((skill) => (

              <span
                key={skill}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium"
              >
                {skill}
              </span>

            ))

          ) : (

            <p>No skills detected.</p>

          )}

        </div>

      </div>

    </div>

  );

}

export default ResultCard;
