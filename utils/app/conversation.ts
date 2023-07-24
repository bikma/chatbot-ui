import { Conversation } from '@/types/chat';

export const updateConversation = (
  updatedConversation: Conversation,
  allConversations: Conversation[],
  chatId: string,
) => {
  const updatedConversations = allConversations.map((c) => {
    if (c.id === updatedConversation.id) {
      return updatedConversation;
    }

    return c;
  });

  saveConversation(updatedConversation,chatId);
  saveConversations(updatedConversations, chatId);

  return {
    single: updatedConversation,
    all: updatedConversations,
  };
};

export const saveConversation = (conversation: Conversation, chatId: string) => {
  localStorage.setItem('selectedConversation-'+chatId, JSON.stringify(conversation));
};

export const saveConversations = (conversations: Conversation[], chatId: string) => {
  localStorage.setItem('conversationHistory-'+chatId, JSON.stringify(conversations));
};
