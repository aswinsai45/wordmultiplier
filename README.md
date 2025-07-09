# Word Multiplier

A simple, modern React (Next.js) app to multiply two numbers using binary shifts (no `*` operator). Supports both decimal and binary input modes, and displays the step-by-step binary multiplication process.

## Features

- Multiply two numbers using only binary shifts (no multiplication operator)
- Toggle between decimal and binary input modes
- Input validation for binary mode
- Shows step-by-step binary multiplication process
- Clean, responsive UI with Tailwind CSS

## Demo

![screenshot](screenshot.png) <!-- Add a screenshot if you wish -->

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Enter two numbers in either decimal or binary mode (toggle at the top).
- Click **Multiply** to see the result and the binary steps.
- In binary mode, the result is shown in both decimal and binary.

## File Structure

- `src/app/WordMultiplier.jsx` – Main component with UI and logic
- `src/app/page.tsx` – Renders the `WordMultiplier` component
- `src/app/globals.css` – Tailwind CSS and global styles

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Customization

- You can further style or extend the app by editing `WordMultiplier.jsx`.
- To change the color scheme, adjust Tailwind classes in the component.

## License

MIT
