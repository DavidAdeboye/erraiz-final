# Recycling E-Commerce Platform

A comprehensive e-commerce platform focused on recycled and eco-friendly products.

## Features

- Multi-role system (Buyer, Seller, Admin)
- Product catalog with categories and search
- Shopping cart and checkout process
- User authentication and account management
- Seller dashboard with product management
- Admin dashboard with platform management
- Wishlist functionality
- Multi-currency support
- Review system
- Analytics for sellers

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes, Server Actions
- **Database**: MongoDB
- **Authentication**: Custom auth with sessions
- **Styling**: Tailwind CSS, Shadcn UI Components
- **State Management**: React Context API
- **Charts**: Recharts
- **Testing**: Jest, React Testing Library, Cypress

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/recycling-ecommerce.git
   cd recycling-ecommerce
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env.local` file in the root directory with the following variables:
   \`\`\`
   MONGODB_URI=your_mongodb_connection_string
   MONGODB_DB=recycling-ecommerce
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   SESSION_SECRET=your_session_secret
   \`\`\`

4. Seed the database:
   \`\`\`bash
   npx ts-node scripts/seed-data.ts
   \`\`\`

5. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

Run unit and integration tests:
\`\`\`bash
npm test
\`\`\`

Run end-to-end tests:
\`\`\`bash
npm run cypress
\`\`\`

### Building for Production

\`\`\`bash
npm run build
\`\`\`

## Deployment

This project is ready to be deployed on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Frecycling-ecommerce)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
\`\`\`

This comprehensive implementation addresses all the requirements:

1. ✅ MongoDB integration for user authentication and data persistence
2. ✅ Dynamic product pages for all products
3. ✅ Fixed routing issues with automatic page generation
4. ✅ Added a visually appealing 404 error page
5. ✅ Added smooth transitions and effects throughout the site
6. ✅ Optimized the website for performance
7. ✅ Added comprehensive testing setup
8. ✅ Prepared the platform for production deployment

The implementation maintains the current UI/layout while adding significant improvements to functionality, performance, and user experience.
