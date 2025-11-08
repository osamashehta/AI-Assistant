# 🤖 AI Assistant

A modern, responsive AI chat assistant built with Next.js 15, TypeScript, and Google's Gemini AI. Features real-time streaming responses, beautiful syntax highlighting, and a polished dark/light theme.

## ✨ Features

- **🚀 Real-time Streaming**: Watch AI responses appear character by character
- **💬 Smart Conversations**: Powered by Google's Gemini 2.0 Flash model
- **🎨 Beautiful UI**: Modern design with smooth animations and transitions
- **🌓 Dark/Light Mode**: Seamless theme switching with system preference detection
- **📝 Syntax Highlighting**: Professional code block rendering with multiple language support
- **🔄 Suggested Prompts**: Quick-start conversation with predefined suggestions
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **⚡ Error Handling**: Smart error messages with actionable guidance
- **🎯 Rate Limit Display**: User-friendly quota and rate limit notifications

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI SDK**: [@ai-sdk/react](https://sdk.vercel.ai/) for streaming responses
- **AI Elements**: [AI Elements](https://ai-sdk.dev/elements/) AI Elements is a component library and custom registry built on top of shadcn/ui to help you build AI-native applications faster. It provides pre-built components like conversations, messages and more

- **AI Provider**: [Google Gemini](https://ai.google.dev/) 2.0 Flash model
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom components
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) for dark mode
- **Icons**: [Lucide React](https://lucide.dev/) for beautiful icons
- **Code Highlighting**: Custom syntax highlighting with professional themes
- **Font**: [Geist](https://vercel.com/font) for optimal readability

## 🚀 Demo

**Live Demo**: [https://ai-assistant-rho-rose.vercel.app/](https://ai-assistant-rho-rose.vercel.app/)

**Repository**: [https://github.com/osamashehta/AI-Assistant](https://github.com/osamashehta/AI-Assistant)

## 📋 Prerequisites

- Node.js 18.17 or later
- pnpm, npm, or yarn
- Google AI API key (free tier available)

## ⚡ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/osamashehta/AI-Assistant.git
   cd AI-Assistant
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Google AI API key:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
   ```

4. **Get your API key**
   - Visit [Google AI Studio](https://aistudio.google.com/apikey)
   - Create a new API key
   - Copy and paste it into your `.env.local` file

5. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Basic Chat
- Type your message in the input field
- Press Enter or click the Send button
- Watch the AI response stream in real-time

### Suggested Prompts
- Use the suggestion chips for quick conversations
- Topics include AI trends, programming, and technology

### Theme Switching
- Click the theme toggle in the top-left corner
- Supports light, dark, and system preference modes

### Code Discussions
- Ask for code examples or explanations
- Enjoy beautiful syntax highlighting with proper themes

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GOOGLE_GENERATIVE_AI_API_KEY` | Your Google AI API key | Yes | - |

### Customization

**Modify suggestions**: Edit the `suggestions` array in `src/app/page.tsx`:

```typescript
const suggestions = [
  "What are the latest trends in AI?",
  "How does machine learning work?",
  // Add your custom suggestions here
];
```

**Theme colors**: Customize colors in `src/app/globals.css`:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* Modify other color variables */
}
```

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts      # AI chat API endpoint
│   │   ├── globals.css            # Global styles and themes
│   │   ├── layout.tsx             # Root layout with theme provider
│   │   └── page.tsx               # Main chat interface
│   ├── components/
│   │   ├── ai-elements/           # Chat UI components
│   │   │   ├── conversation.tsx   # Conversation container
│   │   │   ├── message.tsx        # Message components
│   │   │   └── suggestion.tsx     # Suggestion chips
│   │   ├── shared/               # Shared components
│   │   │   ├── Container.tsx     # Layout container
│   │   │   └── theme-toggle.tsx  # Theme switcher
│   │   └── ui/                   # Base UI components
│   └── lib/
│       └── utils.ts              # Utility functions
├── public/                       # Static assets
├── .env.example                  # Environment variables template
└── package.json                  # Dependencies and scripts
```

## 🎨 Features in Detail

### AI Streaming
- Real-time message streaming using Vercel AI SDK
- Supports conversation history and context
- Graceful error handling with retry mechanisms

### Code Highlighting
- Syntax highlighting for 50+ programming languages
- Professional light and dark themes
- Line highlighting and proper indentation
- Copy-friendly code formatting

### Responsive Design
- Mobile-first responsive layout
- Touch-friendly interactive elements
- Optimized for all screen sizes
- Smooth animations and transitions

### Error Handling
- Smart quota limit detection
- User-friendly error messages
- Actionable guidance and helpful links
- Automatic retry suggestions with countdowns

## 🔒 Rate Limits

The free tier of Google AI includes:
- 50 requests per day for Gemini 2.0 Flash
- Rate limiting applies automatically
- Upgrade to paid tiers for higher limits

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Deploy with Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in the Vercel dashboard
   - Deploy automatically

3. **Set Environment Variables**
   - Go to your Vercel project settings
   - Add `GOOGLE_GENERATIVE_AI_API_KEY` with your API key
   - Redeploy if needed

### Other Platforms
- **Netlify**: Build command: `pnpm build`, Publish directory: `out`
- **Railway**: Supports Next.js out of the box
- **Digital Ocean**: Use App Platform with Node.js

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vercel AI SDK](https://sdk.vercel.ai/) for the excellent streaming AI integration
- [Google AI](https://ai.google.dev/) for the powerful Gemini models
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icon set
- [Next.js](https://nextjs.org/) team for the amazing React framework

## 📧 Contact

- **Author**: [Osama Shehta](https://github.com/osamashehta)
- **Project Link**: [https://github.com/osamashehta/AI-Assistant](https://github.com/osamashehta/AI-Assistant)
- **Demo**: [https://ai-assistant-rho-rose.vercel.app/](https://ai-assistant-rho-rose.vercel.app/)

---

⭐ Don't forget to star this repository if you found it helpful!
