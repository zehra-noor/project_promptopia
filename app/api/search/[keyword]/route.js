import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    let regex = new RegExp(params.keyword, "i"); // i for case insensitive
    const prompt = await Prompt.find({
      $or: [{ prompt: regex }, { tag: regex }],
    })
      .populate("creator")
      .then(async (data, err) => {
        if (data.length !== 0) {
          return data;
        } else {
          const newPrompt = await Prompt.find({}).populate("creator");
          return newPrompt.filter(
            (prompts) =>
              prompts.creator.username === params.keyword.toLowerCase()
          );
        }
      });
    return new Response(JSON.stringify(prompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to fetch prompt.", { status: 500 });
  }
};
