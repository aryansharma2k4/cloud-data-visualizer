import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { messages, contextData } = await req.json();

  // Create a system message that includes the context data
  const systemMessage = `You are a helpful assistant that has access to the following information:
${JSON.stringify(contextData, null, 2)}

Use this information to answer user questions accurately. If you don't know the answer based on the provided context, say so.`;

  try {
    // Initialize the Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Prepare messages for Gemini API (convert messages to plain text input)
    const prompt = messages.map((msg: any) => msg.content).join("\n");

    // Get response from the Gemini API
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `${systemMessage}\n\n${prompt}` }] }],
    });

    const response = await result.response;
    const text = response.text();

    return new Response(text, { status: 200, headers: { "Content-Type": "text/plain" } });
  } catch (error) {
    console.error("Error generating response:", error);
    return new Response("Error generating response", { status: 500 });
  }
}
