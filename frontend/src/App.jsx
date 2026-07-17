import { useState } from "react";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ResumeUpload from "./components/ResumeUpload";
import JDInput from "./components/JDInput";
import DashboardStats from "./components/DashboardStats";
import RankingTable from "./components/RankingTable";
import CandidateModal from "./components/CandidateModal";

import api from "./services/api";

function App() {

  const [files, setFiles] = useState([]);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const analyze = async () => {

    if (files.length === 0) {
      alert("Please upload at least one resume.");
      return;
    }

    if (!jd.trim()) {
      alert("Please paste Job Description.");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      formData.append("jd_text", jd);

      const response = await api.post("/score", formData);

      setResult(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <HeroSection />

      <div className="max-w-7xl mx-auto px-8 pb-12">

        <div className="grid lg:grid-cols-2 gap-8">

          <ResumeUpload
            files={files}
            setFiles={setFiles}
          />

          <JDInput
            jd={jd}
            setJd={setJd}
            onAnalyze={analyze}
            loading={loading}
          />

        </div>

        {result.length > 0 && (

          <>

            <DashboardStats
              results={result}
            />

            <RankingTable
              results={result}
              onView={setSelectedCandidate}
            />

            <CandidateModal
              candidate={selectedCandidate}
              onClose={() => setSelectedCandidate(null)}
            />

          </>

        )}

      </div>

    </div>

  );

}

export default App;
