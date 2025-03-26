# World Time Comparison App

An interactive world map application that displays and compares local times across different countries.

## Features

- Interactive world map with clickable countries
- Time zone comparison between countries
- Mobile-friendly responsive design
- Real-time clock updates

## Deployment Guide: GitHub to Vercel

Follow these steps to deploy your application from GitHub to Vercel:

### Step 1: Prepare Your GitHub Repository

1. Create a new GitHub repository
2. Initialize Git in your local project folder (if not already done):
   ```
   git init
   ```
3. Add all files to Git:
   ```
   git add .
   ```
4. Commit the changes:
   ```
   git commit -m "Initial commit"
   ```
5. Link your local repository to GitHub:
   ```
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```
6. Push to GitHub:
   ```
   git push -u origin main
   ```

### Step 2: Modify package.json for Vercel

Before pushing to GitHub, make sure your package.json has the proper build script:

Replace the existing build script in package.json with:
```json
"build": "vite build && esbuild server/index.ts server/routes.ts server/storage.ts --platform=node --packages=external --bundle --format=esm --outdir=dist && cp -r api dist/",
```

### Step 3: Set Up Vercel

1. Sign up or log in to [Vercel](https://vercel.com)
2. Click on "Add New..." and select "Project"
3. Import your GitHub repository
4. Configure the project settings:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: dist
   - Install Command: npm install

5. In the Environment Variables section, make sure to add any necessary environment variables your app might need

6. Click "Deploy"

### Step 4: Configure Vercel for Backend Support

After the initial deployment, go to your project settings on Vercel:

1. Click on your project in the Vercel dashboard
2. Go to "Settings" tab
3. Navigate to "Functions" settings
4. Set the "Function Region" to a location close to your target audience
5. Under "Serverless Function Settings", ensure "Serverless Functions" is enabled

### Step 5: Verify Deployment

1. Wait for the deployment to complete
2. Click on the provided URL to test your application
3. Verify that both the frontend and API endpoints are working correctly

## Troubleshooting

If you encounter issues with API routes or backend functionality:

1. Check Vercel logs in the Vercel dashboard
2. Verify that the vercel.json configuration is correct
3. Make sure the api/index.js file is properly set up to handle API requests
4. Try redeploying with the "Full Build" option in Vercel

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open http://localhost:5000 in your browser