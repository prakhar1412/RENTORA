# RENTORA

Rentora is a modern rental platform application built with React, Vite, and TypeScript. It offers a seamless experience for users to browse, list, and manage rental properties, featuring a sleek UI and powerful functionality.

## Features

- **User Authentication**: Secure Login and Signup functionality to manage user accounts.
- **Property Listings**: Browse a diverse collection of rental properties with detailed descriptions, pricing, and images.
- **Interactive Map**: Visualize property locations on an interactive map powered by Leaflet, making it easy to find rentals in desired areas.
- **Add Listings**: A streamlined process for users to list their own properties for rent, complete with image uploads and attribute specifications.
- **Dashboard**: A comprehensive dashboard for users to manage their listings, view performance, and update profile settings.
- **Wishlist**: Save favorite properties to a personal wishlist for quick access and comparison.
- **Secure Payments**: Integrated payment interface for processing rental transactions (frontend implementation).
- **Responsive Design**: Fully responsive layout ensuring a consistent experience across desktop, tablet, and mobile devices.
- **Modern UI/UX**: Built with Tailwind CSS and Shadcn UI components for a polished, professional look and feel, including Dark Mode support.

## Tech Stack

This project leverages a robust modern web development stack:

- **Frontend Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (built on Radix UI)
- **State Management & Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation
- **Maps**: [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/) for dashboard analytics
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or bun

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/prakhar1412/RENTORA.git
    cd RENTORA
    ```

2.  **Install dependencies:**

    Using npm:
    ```bash
    npm install
    ```
    
    Or using bun:
    ```bash
    bun install
    ```

3.  **Start the development server:**

    Using npm:
    ```bash
    npm run dev
    ```

    Or using bun:
    ```bash
    bun run dev
    ```

4.  **View the application:**
    Open your browser and navigate to the URL shown in your terminal (usually `http://localhost:8080`).

## Scripts

- `npm run dev`: Starts the development server with hot module replacement.
- `npm run build`: Builds the application for production optimization.
- `npm run lint`: Runs ESLint to identify and fix code quality issues.
- `npm run preview`: Locally previews the production build.
- `npm run test`: Runs unit tests using Vitest.

## Project Structure

```
RENTORA/
├── public/              # Static assets served directly
├── src/
│   ├── components/      # Reusable UI components (buttons, inputs, etc.)
│   ├── data/            # Mock data and static content
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Page layout components (MainLayout, AuthLayout)
│   ├── lib/             # Utility functions and helpers
│   ├── pages/           # Main application pages (Home, Dashboard, etc.)
│   ├── test/            # Test configurations and utilities
│   ├── App.tsx          # Main application component and routing setup
│   └── main.tsx         # Application entry point
├── index.html           # HTML entry point
├── package.json         # Project manifest and dependencies
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration settings
└── vite.config.ts       # Vite configuration
```

## Contributing

Contributions are welcome! If you find any issues or would like to add new features, please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
