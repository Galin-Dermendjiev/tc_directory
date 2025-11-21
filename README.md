## TC Directory
A Next.js application with authentication, content management, and GitHub OAuth login.
Built using NextAuth v5, Sanity CMS, and deployed on Vercel.

# Features
- GitHub OAuth Authentication using NextAuth v5  
- Custom user management with Sanity CMS  
- JWT-based session handling with type-safe extensions  
- Production-ready deployment on Vercel  
- Fully typed with TypeScript  
- Sentry for error tracking  

# Demo
Live URL: https://tc-directory-jc4ug8qtr-galins-projects-0c463d70.vercel.app

# Tech Stack
- Framework: Next.js (App Router)  
- Authentication: NextAuth v5 (GitHub OAuth)  
- Database / CMS: Sanity CMS  
- Language: TypeScript  
- Deployment: Vercel  

# Setup & Installation
1. Clone the repository  
cd tc-directory

2. Install dependencies  
npm install

3. Create environment variables

### Create a .env.local file with the following:

# NextAuth
- AUTH_SECRET=your_auth_secret  
- AUTH_GITHUB_ID=your_github_id  
- AUTH_GITHUB_SECRET=your_github_secret

# Sanity
- NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id  
- NEXT_PUBLIC_SANITY_DATASET="production"  
- NEXT_PUBLIC_SANITY_API_VERSION="vX"  
- SANITY_WRITE_TOKEN=your_sanity_write_token  

# Optional
- SENTRY_AUTH_TOKEN=your_sentry_auth_token


Make sure to replace all placeholders with your actual credentials.

# 4. Run the development server
npm run dev


Visit http://localhost:3000 to view the app.