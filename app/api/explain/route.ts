import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { files, repoUrl } = await req.json();

    try {
        const prompt = `
You are a senior software engineer.

Repo URL:
${repoUrl}

Files:
${files.map((file: any) => file.name).join(", ")}

Explain:
1) What this project likely does
2) Tech stack
3) Key files and their roles

Keep it short and beginner-friendly.
`;

        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }],
            }),
        });

        const data = await res.json(); // convert the openai response to JSON

        const explanation =
            data.choices?.[0]?.message?.content || "No explanation generated";

        return NextResponse.json({ explanation });
    } catch (e) {
        return NextResponse.json({ error: "AI failed" }, { status: 500 });
    }
}