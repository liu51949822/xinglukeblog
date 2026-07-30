import { redirect } from 'next/navigation';
import type { FC } from 'react';

const MessagePage: FC = async () => {
  redirect('/');
};

export default MessagePage;

