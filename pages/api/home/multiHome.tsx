import {useEffect, useState} from 'react';

import Home from './home';
import { IconSlash } from '@tabler/icons-react';
import Image from 'next/image';
import { OpenAIModelID } from '@/types/openai';
import { v4 as uuidv4 } from 'uuid';

export interface Props {
    serverSideApiKeyIsSet: boolean;
    serverSidePluginKeysSet: boolean;
    defaultModelId: OpenAIModelID;
    chatId: string
  }
  
const MultiHome = () => {
  const [chats, setChats] = useState<string[]>([]);
  
  useEffect(() => {
    
    // Function to handle updates when localStorage is changed
    const handleLocalStorageUpdate = () => {
      // Retrieve the updated data from localStorage
      const chatIds = localStorage.getItem('chats') 
      const chats : string[]= chatIds?JSON.parse(chatIds):[]
      let myChats:string[]=[]; 
      if(chats && chats.length){
        myChats = chats 
      }
        else {
          myChats = [uuidv4(),uuidv4()]
          localStorage.setItem('chats', JSON.stringify(myChats))
        }
      setChats(myChats)
    };
    handleLocalStorageUpdate()
    // Listen for the custom event and call the handler function
    window.addEventListener('newChat', handleLocalStorageUpdate);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('newChat', handleLocalStorageUpdate);
    };
  }, []);

  return (<>
    <div className="sticky top-0 z-10 flex  border-b-[1px] bg-white h-[56px] border-b-neutral-300 bg-neutral-100 pl-2 ">
    <Image src="/dkube.png" alt="AI" width={40} height={36} className="my-auto"/>
    {/* <IconSlash  className="my-auto opacity-20"/> */}
    <span className="my-auto font-bold lg:text-lg pl-2">AI Playground</span>
    </div>
    <div className="flex h-[calc(100vh-56px)] w-full sm:pt-0  divide-x">
      {chats.map((chat, index) => (
        <Home key={index} serverSideApiKeyIsSet={true} serverSidePluginKeysSet={true} defaultModelId={OpenAIModelID.GPT_4}  chatId={chat}/>
      ))}
    </div></>
  );
};

export default MultiHome;
