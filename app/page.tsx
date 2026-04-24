"use client"; // client architecture

import { useState } from "react";
import axios from "axios";

type RepoFile = { // the files that we get from request, we describe the blueprint
  name: string;
  type: string;
};

export default function Home() {
  const [err, setErr]=useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [files, setFiles] = useState<RepoFile[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch the repo using axios
  const fetchRepo=async ()=>{
    try {
      setLoading(true);
      setErr("");
      const res = await axios.post("/api/github",{repoUrl})
      console.log(res) // returns an obj type, we only need res.data.file
      console.log("API response:", res.data);

      if(res.data.error){
        setErr(res.data.error);
        return;
      }
      setFiles(res.data.files || []); // res.data.file stored
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
      <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-20">
        <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-6">

          <h1 className="text-2xl font-semibold mb-6 text-center">
            AI Codebase Explainer
          </h1>

          {/* Input */}
          <input
              type="text"
              placeholder="Paste GitHub repo URL"
              className="border rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-black"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
          />

          {/* Button */}
          <button
              onClick={fetchRepo}
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            {loading ? "Analyzing..." : "Analyze Repo"}
          </button>
          {/*Error*/}
          {err && (
              <p className="mt-4 text-sm text-red-500">{err}</p>
          )}

          {/* Display Files */}
          <div className="mt-6 space-y-2">
            {files.map((file,index) => (
                <div
                    key={index}
                    className="border rounded-md p-3 text-sm bg-gray-100"
                >
                  {file.name}
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}