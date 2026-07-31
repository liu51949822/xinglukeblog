export interface DeepSeekRequestMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface DeepSeekRequestBody {
  messages: DeepSeekRequestMessage[];
}


