import { v4 as uuidv4 } from 'uuid';

export const saveSyncChat = (syncChat: boolean, chatId: string) => {
    localStorage.setItem('syncChat-'+chatId, JSON.stringify(syncChat));
};

export const getSyncChat = (chatId: string) => {
    return localStorage.getItem('syncChat-'+chatId) === 'true' ? true : false
};

export const onAddModelForComparison = (chatId:string) => {
    const chats = localStorage.getItem('chats');
    let chatIds = chats ? JSON.parse(chats):[];
    const id = uuidv4()
    chatIds.push(id);
    localStorage.setItem('chats', JSON.stringify(chatIds));
    const selectedChat = JSON.parse(localStorage.getItem('selectedConversation-'+chatId))
    const newChat = {
      id: uuidv4(),
      name: 'New Conversation',
      messages: [],
      model: selectedChat && selectedChat.model,
      prompt: selectedChat && selectedChat.prompt,
      temperature: selectedChat && selectedChat.temperature,
      folderId: null,
    }
    localStorage.setItem('selectedConversation-'+id, JSON.stringify(newChat))
    window.dispatchEvent(new Event('newChat'));
  }

  export const onRemoveModelFromComparison = (chatId:string) => {
    const chats = localStorage.getItem('chats');
    let chatIds: [string] = chats ? JSON.parse(chats):[];
    if(chatIds.length >1){
      localStorage.setItem('chats', JSON.stringify(chatIds.filter(chat => chat !== chatId)));
      window.dispatchEvent(new Event('newChat'));
    }
  }
