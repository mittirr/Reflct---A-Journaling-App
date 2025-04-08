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
- **Powerful Search** - Find your notes instantly by their title, mood or date of creation
- **Secure data** - Your entries are private and protected
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **User Authentication** - Secure user authentication with Kinde

## 🛠️ Technologies Used

- **Frontend**
  - React 18
  - Next.js 15
  - Tailwind CSS
  - Zod
  - Lucide React (icons)
  - Arcjet
  - date-fns (date formatting)
  - Recharts (for analytics)
  - React Quill (rich text editor)

- **Backend**
  - Prisma 6
  - NeonDB (PostgreSQL)
  - Kinde Authentication

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
   # Kinde Authentication
   KINDE_CLIENT_ID=your_kinde_client_id
   KINDE_CLIENT_SECRET=your_kinde_client_secret
   KINDE_ISSUER_URL=https://your-subdomain.kinde.com
   KINDE_SITE_URL=http://localhost:3000
   KINDE_POST_LOGOUT_REDIRECT_URL=/
   KINDE_POST_LOGIN_REDIRECT_URL=/dashboard

   # Database
   DATABASE_URL=your_neondb_connection_string

   # API Keys
   ARCJET_KEY=your_arcjet_api_key
   PIXABAY_API_KEY=your_pixabay_api_key
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
2. Navigate to "Write Journal"
3. Fill in the title, mood, content and choose a collection
4. Click "Publish"

### Searching Notes
- Use the search bar to find notes by title, date, or mood

## 🔒 Authentication

Reflct uses Kinde for authentication. Users can:
- Sign-in / Sign-up with email and password
- Sign-in / Sign-up with social providers (depending on your Kinde configuration)
- Edit their profile information

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
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [NeonDB](https://console.neon.tech/app/)
- [Kinde](https://kinde.com/)
- [Lucide Icons](https://lucide.dev/)
