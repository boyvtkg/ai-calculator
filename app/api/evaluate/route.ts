import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { expression } = await req.json();

  if (!expression) {
    return NextResponse.json({ error: 'No expression provided' }, { status: 400 });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: `Evaluate this mathematical expression accurately and return only the final result: ${expression}`,
        },
      ],
      temperature: 0,
    });

    const result = response.choices[0].message.content?.trim();
    return NextResponse.json({ result });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: 'Failed to evaluate expression' }, { status: 500 });
  }
}