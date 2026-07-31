export interface DeepSeekRequestMessage {
role: 'user' | 'assistant' | 'system';
  content: string;}
export interface DeepSeekRequestBody {
  messages: DeepSeekRequestMessage[];
}

export interface CreateDeepSeekReponseBody {
id: string;
  object: 'chat.completion.chunk';
  created: number;
  model: string;
  choices: Array<{
    delta: {
      content?: string;
      role?: string;
    };
    index: number;
    finish_reason: string | null;
  }>;
}
