'use client';

import { Conversation, ConversationContent, ConversationEmptyState } from '@/components/ai-elements/conversation';
import { Message, MessageContent, MessageResponse } from '@/components/ai-elements/message';
import { Suggestion, Suggestions } from '@/components/ai-elements/suggestion';
import Container from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { useChat } from '@ai-sdk/react';
import { ArrowUp, MessageSquareIcon, Send, Square } from 'lucide-react';
import { use, useEffect, useRef, useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status, stop, error } = useChat();
  const refScrollDown = useRef<HTMLDivElement>(null);
  const refScrollUp = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refScrollDown.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const suggestions = [
    "What are the latest trends in AI?",
    "How does machine learning work?",
    "Explain quantum computing",
    "Best practices for React development",
    "Tell me about TypeScript benefits",
    "How to optimize database queries?",
    "What is the difference between SQL and NoSQL?",
    "Explain cloud computing basics",
  ];

  return (
    <Container className='relative'>

      <Conversation className="relative flex flex-col  py-24 mx-auto stretch">
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              description="Messages will appear here as the conversation progresses."
              icon={<MessageSquareIcon className="size-6" />}
              title="Start a conversation"
            />
          ) : (
            <>
              <div ref={refScrollUp} />
              {messages.map((message) => (
                <Message from={message.role} key={message.id}>
                  <MessageContent>
                    {message.parts.map((part, i) => {
                      switch (part.type) {
                        case 'text':
                          return message.role === 'assistant' ? (
                            <MessageResponse key={`${message.id}-${i}`} className="markdown-content">
                              {part.text}
                            </MessageResponse>
                          ) : (
                            <div key={`${message.id}-${i}`} className="whitespace-pre-wrap">{part.text}</div>
                          );
                      }
                    })}
                  </MessageContent>
                </Message>
              ))}
              {error && (
                <Message from="assistant" key="error">
                  <MessageContent >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-destructive font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        Error
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {error.message || 'An error occurred while processing your request.'}
                      </div>
                      {error.message?.includes('parts field') && (
                        <div className="text-xs text-muted-foreground mt-2 p-2 bg-muted rounded">
                          Please make sure your message is not empty and try again.
                        </div>
                      )}
                    </div>
                  </MessageContent>
                </Message>
              )}
              <div ref={refScrollDown} />
            </>
          )}
        </ConversationContent>

        {messages.length === 0 && (


          <Suggestions >
            {suggestions.map((suggestion) => (
              <Suggestion
                key={suggestion}
                onClick={() => {
                  sendMessage({ text: suggestion });
                  setInput('');
                }}
                suggestion={suggestion}
              />
            ))}
          </Suggestions>
        )}


        {messages.length !== 0 && (

          <Button onClick={() => refScrollUp.current?.scrollIntoView({ behavior: 'smooth' })} variant="outline"
            size="icon" className='fixed z-10 left-1/2 transform -translate-x-1/2 bottom-20   flex items-center justify-center cursor-pointer h-9 w-9 shadow-border-small hover:shadow-border-medium bg-background/80 backdrop-blur-sm border-0 hover:bg-background hover:scale-[1.02] transition-all duration-150 ease'>
            <ArrowUp className="h-4 w-4" />
          </Button>
        )}
        <Container className=' fixed  left-1/2 transform -translate-x-1/2 bottom-4   '>


          <form
            onSubmit={e => {
              e.preventDefault();
              if (input.trim()) {
                sendMessage({ text: input });
                setInput('');
              }
            }}
            className='w-full border-border border  rounded-lg  flex items-center justify-center gap-2 px-3 py-2 mt-4 h-[49px] bg-background'
          >
            <input
              className=" w-full bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
              value={input}
              placeholder="Say something..."
              onChange={e => setInput(e.currentTarget.value)}
            />
            {(status === 'submitted' || status === 'streaming') ? (
              <Button onClick={() => stop()} variant="outline"
                size="icon" className="  flex items-center justify-center cursor-pointer h-9 w-9 shadow-border-small hover:shadow-border-medium bg-background/80 backdrop-blur-sm border-0 hover:bg-background hover:scale-[1.02] transition-all duration-150 ease animate-pulse">

                <Square />
              </Button>
            ) : (

              <Button
                onClick={e => {
                  e.preventDefault();
                  if (input.trim()) {
                    sendMessage({ text: input });
                    setInput('');
                  }
                }}
                variant="outline"
                size="icon"
                disabled={!input.trim()}
                className="  flex items-center justify-center cursor-pointer h-9 w-9 shadow-border-small hover:shadow-border-medium bg-background/80 backdrop-blur-sm border-0 hover:bg-background hover:scale-[1.02] transition-all duration-150 ease disabled:opacity-50 disabled:cursor-not-allowed">

                <Send />
              </Button>
            )}
          </form>

        </Container>
      </Conversation >

    </Container>
  );
}