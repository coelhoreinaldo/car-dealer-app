# Vehicle Information App

This is a Next.js application that allows users to select a vehicle type and model year, and then displays information about the models of the selected vehicle.

## Features

- Select vehicle type
- Select model year
- Display vehicle information

## Architecture

The application is built with Next.js and TypeScript. It uses React Server Components to render the vehicle selection form on the server, and a client component to handle user interactions.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, start the development server:

```bash
npm run dev
```

Open <http://localhost:3000> with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

### Building the Application

To build the application for production, run:

```bash
npm run build
```

This will create a .next directory with the compiled application.

### Code Quality

This project uses ESLint and Prettier to maintain code quality and consistency. You can check for linting and formatting issues by running:

```bash
npm run lint
```

### Font Optimization

This project uses next/font to automatically optimize and load Inter, a custom Google Font.
