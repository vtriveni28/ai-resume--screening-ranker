import {
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaTools,
  FaBriefcase,
  FaUserCircle,
} from "react-icons/fa";

function CandidateModal({ candidate, onClose }) {

  if (!candidate) return null;

  const { profile, score } = candidate;

  return (

    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative">

        {/* Header */}

        <div className="bg-slate-900 text-white p-8 rounded-t-3xl">

          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-white hover:text-red-300 text-xl"
          >
            <FaTimes />
          </button>

          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-white text-slate-800 flex items-center justify-center">

              <FaUserCircle size={70} />

            </div>

            <div>

              <h2 className="text-3xl font-bold">

                {profile.contact?.name || "Unknown Candidate"}

              </h2>

              <p className="text-slate-300 mt-2">

                Resume Analysis Report

              </p>

            </div>

          </div>

        </div>

        {/* Body */}

        <div className="p-8">

          <div className="grid lg:grid-cols-2 gap-10">

            {/* Contact */}

            <div>

              <h3 className="text-xl font-bold mb-5">

                Contact Information

              </h3>

              <div className="space-y-4">

                <p className="flex items-center gap-3">

                  <FaEnvelope className="text-slate-600"/>

                  {profile.contact?.email || "N/A"}

                </p>

                <p className="flex items-center gap-3">

                  <FaPhone className="text-slate-600"/>

                  {profile.contact?.phone || "N/A"}

                </p>

                <p className="flex items-center gap-3">

                  <FaBriefcase className="text-slate-600"/>

                  {profile.total_experience_years} Years Experience

                </p>

              </div>

            </div>

            {/* Score */}

            <div className="flex flex-col items-center">

              <div className="w-44 h-44 rounded-full border-[10px] border-emerald-500 flex items-center justify-center">

                <span className="text-5xl font-bold text-slate-800">

                  {(score.total * 100).toFixed(0)}%

                </span>

              </div>

              <h3 className="mt-6 text-xl font-semibold">

                Overall Match Score

              </h3>

            </div>

          </div>

          {/* Education */}

          <div className="mt-12">

            <h3 className="text-2xl font-bold flex items-center gap-3 mb-6">

              <FaGraduationCap />

              Education

            </h3>

            <div className="space-y-5">

              {profile.education?.map((edu, index) => (

                <div
                  key={index}
                  className="bg-slate-50 rounded-2xl border border-slate-200 p-5"
                >

                  <h4 className="font-bold text-lg">

                    {edu.degree}

                  </h4>

                  <p className="mt-2">

                    <strong>Institution :</strong>{" "}
                    {edu.institution || "N/A"}

                  </p>

                  <p>

                    <strong>CGPA :</strong>{" "}
                    {edu.cgpa || "N/A"}

                  </p>

                  <p>

                    <strong>Year :</strong>{" "}
                    {edu.year || "N/A"}

                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* Skills */}

          <div className="mt-12">

            <h3 className="text-2xl font-bold flex items-center gap-3 mb-6">

              <FaTools />

              Technical Skills

            </h3>

            <div className="flex flex-wrap gap-3">

              {profile.skills?.map((skill) => (

                <span
                  key={skill}
                  className="bg-slate-100 hover:bg-slate-200 transition px-5 py-2 rounded-full font-medium"
                >

                  {skill}

                </span>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default CandidateModal;
