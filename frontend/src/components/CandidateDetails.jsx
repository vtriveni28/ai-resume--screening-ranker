import DownloadButton from "./DownloadButton";

function CandidateDetails({ candidate }) {

  if (!candidate) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">

        <h2 className="text-2xl font-bold mb-4">
          Candidate Details
        </h2>

        <p className="text-gray-500">
          Select a candidate from the ranking table.
        </p>

      </div>
    );
  }

  const { profile, score } = candidate;

  return (

    <div className="bg-white rounded-2xl shadow-xl p-8">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          👤 Candidate Details
        </h2>

        <DownloadButton candidate={candidate} />

      </div>

      <div className="space-y-3">

        <p><strong>Name:</strong> {profile.contact?.name || "N/A"}</p>

        <p><strong>Email:</strong> {profile.contact?.email || "N/A"}</p>

        <p><strong>Phone:</strong> {profile.contact?.phone || "N/A"}</p>

        <p>
          <strong>Experience:</strong>{" "}
          {profile.total_experience_years} Years
        </p>

      </div>

      <hr className="my-6" />

      <h3 className="text-xl font-bold mb-3">
        🎓 Education
      </h3>

      {profile.education?.map((edu, index) => (

        <div
          key={index}
          className="mb-4 border rounded-lg p-3 bg-gray-50"
        >

          <p><strong>Degree:</strong> {edu.degree}</p>

          <p><strong>Institution:</strong> {edu.institution || "N/A"}</p>

          <p><strong>CGPA:</strong> {edu.cgpa ?? "N/A"}</p>

          <p><strong>Year:</strong> {edu.year || "N/A"}</p>

        </div>

      ))}

      <hr className="my-6" />

      <h3 className="text-xl font-bold mb-3">
        🛠 Skills
      </h3>

      <div className="flex flex-wrap gap-2">

        {profile.skills?.map((skill) => (

          <span
            key={skill}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
          >
            {skill}
          </span>

        ))}

      </div>

      <hr className="my-6" />

      <h3 className="text-xl font-bold mb-3">
        📊 Score Breakdown
      </h3>

      <p>Skills: {(score.skills * 100).toFixed(0)}%</p>

      <p>Experience: {(score.experience * 100).toFixed(0)}%</p>

      <p>Education: {(score.education * 100).toFixed(0)}%</p>

      <p>Semantic: {(score.semantic * 100).toFixed(0)}%</p>

      <p className="text-2xl font-bold text-blue-600 mt-4">
        Overall Score: {(score.total * 100).toFixed(1)}%
      </p>

    </div>

  );

}

export default CandidateDetails;
