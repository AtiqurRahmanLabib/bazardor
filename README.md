# BazarDor 🇧🇩

### Bangladesh Market Price Tracking & Comparison Platform

BazarDor is a web application designed to help users explore and compare market prices in Bangladesh. It provides a Bengali-language interface, category-based product browsing, and user authentication for a convenient market price discovery experience.

**Project Status:** In Development

---

## Features

- **User Authentication** — Sign up and sign in using email and password.
- **Google Authentication** — Sign in using a Google account.
- **Market Price Tracking** — Browse market prices for products.
- **Category-Based Browsing** — Explore products by their categories.
- **Bengali User Interface** — Designed for Bengali-speaking users in Bangladesh.
- **Responsive Design** — Accessible across desktop, tablet, and mobile devices.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org/) | React framework for web development |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript development |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [HeroUI](https://www.heroui.com/) | UI components |
| [Better Auth](https://www.better-auth.com/) | Authentication and session management |
| [MongoDB](https://www.mongodb.com/) | Database |

---

## Getting Started

Follow these steps to run BazarDor locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- Access to a MongoDB database

### Installation

**1. Clone the repository**

```bash
git clone <YOUR_REPOSITORY_URL>
```

**2. Navigate to the project directory**

```bash
cd bazardor
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env.local` file in the project root and configure the variables required by your application.

Example placeholders:

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-secret-key
DATABASE_URL=your-mongodb-connection-string
```

Replace the placeholders with your actual configuration. The variable names must match those used in your application's authentication and database configuration.

**5. Start the development server**

```bash
npm run dev
```

**6. Open the application**

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable | Description |
|---|---|
| `BETTER_AUTH_URL` | Base URL of the application used by Better Auth |
| `BETTER_AUTH_SECRET` | Secret used by Better Auth |
| `DATABASE_URL` | MongoDB connection string, if configured under this name |

**Note:** These are example variable names. Verify them against your actual project configuration before running the application. Never commit real secrets or database credentials to GitHub.

---

## Project Goals

BazarDor aims to make market price information in Bangladesh easier to explore through a simple, accessible, and Bengali-friendly web experience.

The project is currently under development, and additional features may be introduced as development progresses.

---

## Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Submit a pull request.

Please ensure your changes are tested before submitting a pull request.

---

## Author

**Atiqur Rahman Labib**

---

*BazarDor — Making market prices easier to explore.*
