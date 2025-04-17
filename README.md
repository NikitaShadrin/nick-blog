# Nick's Blog

A personal blog platform built with **Next.js**, **Prisma**, **Supabase**, and **Clerk**. This project serves as a space to share thoughts, ideas, and experiences while experimenting with modern web development tools and practices.

## Features

- **Dynamic Blog Posts**: Create, edit, and display blog posts with a clean and responsive design (Creating/Editing requires authorization).
- **Authentication**: User authentication and authorization powered by **Clerk**.
- **Database Integration**: PostgreSQL database managed via **Prisma** and hosted on **Supabase**.
- **Modern UI**: Built with **Tailwind CSS** for a sleek and responsive user interface.
- **Server Actions**: Leveraging Next.js 15's App Router and server actions for efficient data handling.

## Roadmap

- [x] **Dynamic Timeline**: Display posts in a timeline format.
- [x] **Archive Tab**: Add an archive section with post titles and dates.
- [ ] **Loading Animations**: Implement loading cards or animations for better UX.
- [ ] **Public Text Editor**: A public version of the text editor I use to make posts that lets you export.
- [ ] **UI Improvements**: A general reworking of the UI to improve aesthetics

## Tech Stack

- Framework: Next.js
- Database: PostgreSQL via Supabase
- ORM: Prisma
- Authentication: Clerk
- Styling: Tailwind CSS

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/NikitaShadrin/nick-blog.git
   cd nick-blog
   ```

2. Install dependencies:

   ```bash
    npm install
   ```

3. Set up environment variables:

- Create a .env file in the root directory.
- Add the following variables:
  ```bash
  DATABASE_URL=your-postgresql-connection-string
  DIRECT_URL=your-direct-postgresql-connection-string
  CLERK_SECRET_KEY=your-clerk-secret-key
  ```

4. Run database migrations:

   ```bash
    npx prisma migrate dev --name init
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```
