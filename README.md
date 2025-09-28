# Hassio Frontend with shadcn/ui

A modern React frontend built on Cloudflare Workers with AI-powered chat functionality using shadcn/ui components and the shadcn-chatbot-kit design system.

## 🚀 Features

- **⚡ Edge Computing**: Built on Cloudflare Workers for ultra-fast global performance
- **🤖 AI-Powered Chat**: Integrated with Cloudflare Workers AI for intelligent conversations
- **🎨 Modern UI**: Beautiful components powered by shadcn/ui design system
- **📱 Responsive**: Fully responsive design that works on all devices
- **🔄 Server-Side Rendering**: React SSR for better performance and SEO
- **💬 Chatbot Kit**: Inspired by shadcn-chatbot-kit with enhanced components

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: TailwindCSS + shadcn/ui components
- **Runtime**: Cloudflare Workers
- **AI**: Cloudflare Workers AI (Llama 3.1 8B Instruct)
- **Build**: esbuild + TailwindCSS
- **Dev Tools**: Wrangler, Vitest

## 📦 Components

This project includes custom implementations of shadcn-chatbot-kit components:

- **Chat Message**: Enhanced message display with markdown rendering and copy functionality
- **Message Input**: Modern input with suggestion prompts and keyboard shortcuts
- **Message List**: Optimized message list with typing indicators
- **Copy Button**: One-click copy functionality for messages
- **Markdown Renderer**: Basic markdown support for AI responses

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Cloudflare account (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/jmbish04/hassio-frontend-shadcn.git
cd hassio-frontend-shadcn

# Install dependencies
npm install

# Build the application
npm run build
```

### Development

```bash
# Start the development server
npm run dev

# Build CSS and JavaScript
npm run build

# Deploy to Cloudflare Workers
npm run deploy
```

### Environment Setup

For full functionality, you'll need to configure Cloudflare Workers with:

1. **Cloudflare Workers AI binding** - Set up the `AI` binding in wrangler.jsonc
2. **Static Assets** - Configure the `ASSETS` binding for CSS/JS files
3. **API Token** - Set `CLOUDFLARE_API_TOKEN` environment variable for deployment

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── chat-message.tsx
│   │   │   ├── message-input.tsx
│   │   │   ├── copy-button.tsx
│   │   │   └── markdown-renderer.tsx
│   │   └── Sidebar.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── Chat.tsx
│   ├── lib/
│   │   └── utils.ts      # Utility functions
│   ├── App.tsx
│   ├── index.tsx         # Worker entry point
│   └── globals.css       # Global styles
├── public/
├── dist/                 # Built assets
├── wrangler.jsonc        # Cloudflare Workers config
├── tailwind.config.js    # TailwindCSS config
└── package.json
```

## 🎨 Customization

### Adding shadcn/ui Components

You can add more shadcn/ui components by creating them in `src/components/ui/`:

```bash
# Example: Add a new button variant
# Create src/components/ui/button.tsx with the shadcn/ui button implementation
```

### Modifying the Chat System

The chat system is modular and can be extended:

1. **Add new message types** in `src/components/ui/chat-message.tsx`
2. **Enhance AI responses** by modifying the API handler in `src/index.tsx`
3. **Add new input features** in `src/components/ui/message-input.tsx`

### Styling with TailwindCSS

All components use TailwindCSS classes with the shadcn/ui design tokens defined in `src/globals.css`.

## 🌐 Deployment

### Cloudflare Workers

```bash
# Build and deploy
npm run deploy

# Or deploy with custom environment
wrangler deploy --env production
```

### Configuration

Update `wrangler.jsonc` with your settings:

```jsonc
{
  "name": "your-app-name",
  "main": "dist/index.js",
  "ai": {
    "binding": "AI"
  },
  "assets": {
    "directory": "./dist/",
    "binding": "ASSETS"
  }
}
```

## 🤖 AI Integration

The chat system uses Cloudflare Workers AI with the Llama 3.1 8B Instruct model. You can customize the AI behavior by:

1. **Changing the model** in `src/index.tsx`
2. **Adding system prompts** for specific behavior
3. **Implementing conversation memory** for longer contexts

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Links

- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [shadcn/ui](https://ui.shadcn.com/)
- [shadcn-chatbot-kit](https://github.com/Blazity/shadcn-chatbot-kit)
- [TailwindCSS](https://tailwindcss.com/)