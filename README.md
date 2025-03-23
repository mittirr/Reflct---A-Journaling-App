# Reflct

<div align="center">
  <img src="public/favicon.png" alt="Reflct Logo" width="100" />
  <h3>Capture Your Thoughts with Reflct</h3>
  <p>A digital journal App to organize and reflect your thoughts.</p>
</div>

## ✨ Features


### Core Features
- **Easy journal entry Creation** - Create beautiful customizable journal entries with a rich text editor
- **Organize with Moods** - Keep your entries organized with mood tags
- **Mood Analytics** - A beautiful graph to visualize your mood
- **Mood Summary** - We give you a mood summary calculating the moodscore of your entries
- **Powerful Search** - Find your notes instantly by thier title, mood or date of creation
- **Secure data** - your entries are private and protected
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **User Authentication** - Secure user authentication with clerk



## 🛠️ Technologies Used

- **Frontend**
  - React 19
  - Next 15
  - Tailwind CSS v4
  - Zod 3
  - React Router v7
  - Lucide React (icons)
  - Arcjet
  - date-fns (date formatting)

- **Backend**
  - Prisma 6
  - NeonDB
  - Clerk

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🚀 Installation

1. Clone the repository
   ```bash
   git clone https://github.com/mittirr/Reflct---A-Journaling-App.git
   cd Reflct---A-Journaling-App
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory with your credentials
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = your_clerk_publishable_key
   CLERK_SECRET_KEY = your_clerk_api_key

   NEXT_PUBLIC_CLERK_SIGN_IN_URL = /sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL = /sign-up

   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL = /dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL = /dashboard

   DATABASE_URL = your_neonDB_api_key

   ARCJET_KEY = Your_arcjet_api_key

   PIXABAY_API_KEY = your_pixabay_api_key
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## 🏗️ Building for Production

```bash
npm run build
# or
yarn build
```

## 📱 Usage

### Creating a New Entry
1. Sign in to your account
2. Navigate to "Write New"
3. Fill in the title, mood, content and choose a collection
5. Click "Publish"

### Searching Notes
- Use the search bar to find notes by title, date, or mood

## 🔒 Authentication

Reflct uses Clerk for authentication. Users can:
- Sign-in / Sign-up with email and password
- Sign-in / Sign-up with Google
- Edit credentials
## 🧩 Project Structure
app
├── (auth)
│   ├── sign-in
│   │   └── [[...sign-in]]
│   │       └── page.jsx
│   ├── sign-up
│   │   └── [[...sign-up]]
│   │       └── page.jsx
│   └── layout.jsx
├── (main)
│   ├── collection
│   │   ├── _components
│   │   │   ├── delete-collection.jsx
│   │   │   └── journal-filters.jsx
│   │   └── [collectionId]
│   │       ├── layout.js
│   │       └── page.jsx
│   ├── dashboard
│   │   ├── _components
│   │   │   ├── analytics-loading.jsx
│   │   │   ├── collection-preview.jsx
│   │   │   ├── collections.jsx
│   │   │   └── mood-analytics.jsx
│   │   └── page.jsx
│   ├── journal
│   │   ├── [id]
│   │   │   ├── _components
│   │   │   │   ├── delete-dialog.jsx
│   │   │   │   └── edit-button.jsx
│   │   │   ├── layout.jsx
│   │   │   └── page.jsx
│   │   └── write
│   │       ├── layout.js
│   │       └── page.jsx
│   └── layout.js
├── lib
│   ├── moods.js
│   └── schema.js
├── globals.css
├── layout.js
├── not-found.jsx
└── page.js

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the terms of the license included in the repository.

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Next](https://nextjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [NeonDB](https://console.neon.tech/app/)
- [Lucide Icons](https://lucide.dev/)
