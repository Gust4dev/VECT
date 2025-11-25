# VECT - Architectural AI Refinement

VECT is a professional architectural visualization tool powered by AI. It allows users to upload renders and perform fine-tuned edits using generative AI, maintaining the original perspective and lighting.

## Features

- **AI-Powered Editing**: Modify specific areas of your render using natural language prompts.
- **Precision Tools**: Brush, Eraser, Rectangle, and Circle tools for precise masking.
- **History Management**: Undo/Redo functionality to experiment freely.
- **Zoom & Pan**: Deep zoom capabilities for detailed work.
- **Version Control**: Compare different AI-generated variations.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini API (`gemini-2.5-flash-image`)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vect.git
   cd vect
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Add your Google Gemini API Key to `VITE_GEMINI_API_KEY`.

4. Start the Development Server:
   ```bash
   npm run dev
   ```

## Usage

1. **Upload**: Drag and drop or select an architectural render.
2. **Mask**: Use the brush or shape tools to select the area you want to change.
3. **Prompt**: Describe the desired change in the sidebar (e.g., "Change the floor to marble").
4. **Generate**: Click "Gerar Variação" to see the AI magic.

## License

[MIT](LICENSE)
