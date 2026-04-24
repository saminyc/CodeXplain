import { NextResponse } from "next/server";
import axios from "axios";

//POST function
export async function POST(req: Request) {
    const { repoUrl } = await req.json();

    if (!repoUrl||!repoUrl.includes("github.com")) {
        return NextResponse.json({ error: "Invalid GitHub URL" });
    }

    const parts = repoUrl.split("/"); // Split it by delimiter and gives a list
    const owner = parts[3]; //Select element from list
    const repo = parts[4].replace(".git", "");

    try {
        const res = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/contents`
        );

        const files = res.data.map((file: any) => ({
            name: file.name,
            type: file.type,
        }));

        return NextResponse.json({ files });

    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch repo" });
    }
}