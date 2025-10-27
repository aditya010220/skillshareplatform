# Welcome to My project

## Project info


# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm install

# Step 4: Set up environment variables for AI functionality.
# Create a .env file in the root directory and add your API key:
echo "VITE_GEMINI_API_KEY=your_gemini_api_key_here" > .env

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## AI Chatbot Setup

This project includes an AI Learning Assistant powered by Google's Gemini API. To enable the chatbot functionality:

1. **Get a Gemini API Key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the generated key

2. **Configure Environment Variables:**
   - Create a `.env` file in the project root
   - Add your API key: `VITE_GEMINI_API_KEY=your_actual_api_key_here`
   - Restart the development server

3. **Test the Integration:**
   - The AI Assistant will show connection status in the header
   - Green: Connected and working
   - Red: Error (check API key and internet connection)
   - Yellow: Connecting...

**Note:** The system automatically tries multiple Gemini models (`gemini-1.5-flash`, `gemini-1.5-pro`, `gemini-pro`) to ensure compatibility and reliability.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS


