'use client';

import { Conversation, ConversationContent, ConversationEmptyState } from '@/components/ai-elements/conversation';
import { Message, MessageContent, MessageResponse } from '@/components/ai-elements/message';
import { Suggestion, Suggestions } from '@/components/ai-elements/suggestion';
import Container from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { useChat } from '@ai-sdk/react';
import { ArrowUp, MessageSquareIcon, Send, Square } from 'lucide-react';
import {  useEffect, useRef, useState } from 'react';

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
              {messages.map((message) => (
                <Message from={message.role} key={message.id}>
                  <div ref={refScrollUp} />
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
                  <MessageContent>
                    {error.message?.includes('quota') || error.message?.includes('Quota exceeded') ? (
                      // Quota/Rate limit error
                      <div className="w-full flex flex-col gap-4 p-4 bg-linear-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border border-orange-200 dark:border-orange-800 rounded-lg">
                        <div className="w-full flex items-center gap-3">
                          <div className="shrink-0">
                            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-orange-800 dark:text-orange-200">Rate Limit Reached</h3>
                            <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                              You've reached your API usage limit for this period.
                            </p>
                          </div>
                        </div>

                      </div>
                    ) : (
                      // Generic error
                      <div className="flex flex-col gap-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-red-800 dark:text-red-200">Something went wrong</h3>
                            <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                              {error.message?.includes('parts field')
                                ? 'Please make sure your message is not empty and try again.'
                                : error.message || 'An unexpected error occurred while processing your request.'
                              }
                            </p>
                          </div>
                        </div>

                        {error.message?.includes('parts field') && (
                          <div className="text-xs text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20 p-2 rounded">
                            💡 Tip: Make sure to type a message before sending
                          </div>
                        )}
                      </div>
                    )}
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