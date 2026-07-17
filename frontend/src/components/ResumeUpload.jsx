import { useRef } from "react";
import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaFileWord,
} from "react-icons/fa";

function ResumeUpload({ files, setFiles }) {

  const inputRef = useRef();

  const handleChange = (e) => {

    const selectedFiles = Array.from(e.target.files);

    setFiles((prev) => [...prev, ...selectedFiles]);

  };

  return (

    <div className="bg-white rounded-2xl shadow-xl p-8">

      <h2 className="text-2xl font-bold mb-6">
        📄 Upload Resumes
      </h2>

      <div
        onClick={() => inputRef.current.click()}
        className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center cursor-pointer hover:border-indigo-500 hover:bg-slate-50 transition-all duration-300"
      >

        <FaCloudUploadAlt
          className="mx-auto text-indigo-600 mb-5"
          size={55}
        />

        <h3 className="text-xl font-semibold">
          Upload Resume(s)
        </h3>

        <p className="text-gray-500 mt-2">
          Drag & Drop or Click to Browse
        </p>

        <p className="text-sm text-gray-400 mt-1">
          Supports PDF and DOCX files
        </p>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          multiple
          className="hidden"
          onChange={handleChange}
        />

      </div>

      {files.length > 0 && (

        <div className="mt-8">

          <h3 className="text-xl font-semibold mb-4">
            📂 Selected Resume(s)
          </h3>

          <div className="space-y-3">

            {files.map((file) => (

              <div
                key={file.name}
                className="flex justify-between items-center bg-slate-100 rounded-xl px-5 py-3 hover:bg-slate-200 transition"
              >

                <div className="flex items-center gap-3">

                  {file.name.endsWith(".pdf") ? (

                    <FaFilePdf className="text-red-500 text-xl" />

                  ) : (

                    <FaFileWord className="text-blue-500 text-xl" />

                  )}

                  <span className="font-medium">
                    {file.name}
                  </span>

                </div>

                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Ready
                </span>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>

  );

}

export default ResumeUpload;
