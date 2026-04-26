"use client"; // client architecture

import { useState } from "react";
import axios from "axios";

type RepoFile = { // the files that we get from request, we describe the blueprint
  name: string;
  type: string;
};

export default function Home() {
  const [explanation, setExplanation] = useState(""); // AI explanation
  const [err, setErr]=useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [files, setFiles] = useState<RepoFile[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch the repo using axios
  const fetchRepo=async ()=>{
    try {
      setLoading(true);
      setErr("");
      setExplanation("");// resets previous explanation
      const res = await axios.post("/api/github",{repoUrl})
      console.log(res) // returns an obj type, we only need res.data.file
      console.log("API response:", res.data);

      if(res.data.error){
        setErr(res.data.error);
        setFiles([]);//prevents old files from showing
        return;
      }
      setFiles(res.data.files || []); // res.data.file stored

      // Send the files and the repo names to api/explain for AI to explain
      const aiRes = await axios.post("/api/explain", {
        files: res.data.files,
        repoUrl,
      });
      setExplanation(aiRes.data.explanation); // The AI based explanation is stored here
    }
    catch (error) {
      console.error(error);
      setErr("Something went wrong");
      setFiles([]);
    }
    finally {
      setLoading(false);
    }
  }

  return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-start pt-20 px-4">
        <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-slate-200">

          <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
            AI Codebase Explainer
          </h1>

          {/* Input Section */}
          <div className="space-y-4 mb-8">
            <div className="relative">
                  <input
                      type="text"
                      placeholder="Paste GitHub repo URL"
                      className="border-2 border-slate-200 rounded-lg p-4 w-full focus:outline-none focus:border-blue-500 transition-all text-slate-800 placeholder-slate-400"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                  />
            </div>

            <button
                onClick={fetchRepo}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 active:transform active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Repository...
                </span>
              ) : "Analyze Repo"}
            </button>
          </div>

          {/*Error*/}
          {err && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-sm text-red-600 font-medium">{err}</p>
              </div>
          )}

          {/* Results Section */}
          <div className="space-y-6">
            {files.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {files.map((file,index) => (
                    <div
                        key={index}
                        className="border border-slate-100 rounded-lg p-3 text-sm bg-slate-50 text-slate-700 flex items-center"
                    >
                      <span className="mr-2">📄</span>
                      <span className="truncate">{file.name}</span>
                    </div>
                ))}
              </div>
            )}

            {explanation && (
                <div className="mt-8 p-6 border-0 rounded-xl bg-slate-900 text-slate-100 shadow-inner">
                  <div className="flex items-center mb-4 border-b border-slate-700 pb-2">
                    <span className="text-xl mr-2">🤖</span>
                    <h2 className="font-bold text-lg text-white">AI Explanation</h2>
                  </div>
                  <div className="text-sm leading-relaxed whitespace-pre-line text-slate-100">
                    {explanation}
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
  );
}