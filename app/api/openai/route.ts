import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { message } = await request.json();

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  try {
    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Your OpenAI API key
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // Updated to use GPT-3.5-Turbo
          messages: [{ role: "user", content: message }], // The structure for chat models
          max_tokens: 100, // Adjust response length
          temperature: 0.7, // Adjust creativity
        }),
      }
    );

    const data = await openaiResponse.json();

    // Debugging the response from OpenAI
    console.log("OpenAI Response:", data);

    if (data.choices && data.choices.length > 0) {
      return NextResponse.json({
        reply: data.choices[0].message.content.trim(),
      });
    } else if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "No response from OpenAI" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
