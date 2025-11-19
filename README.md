# 🐾 PawMart – Pet Adoption & Supply Portal

## 📋 Project Overview

**PawMart** is a comprehensive full-stack MERN application that serves as a community-driven marketplace for pet adoption and pet supply sales. The platform connects pet owners, breeders, and shops with potential adopters and buyers through an intuitive, pet-friendly interface.

**Live Demo:** [https://shadul-pawmart.netlify.app/](https://shadul-pawmart.netlify.app/)  
**Backend API:** [https://shadul-pawmart.vercel.app/](https://shadul-pawmart.vercel.app/)

---

## 🎯 Business Value & Purpose

PawMart addresses the growing need for a centralized platform that bridges the gap between pet adoption services and pet supply commerce. By combining these two essential services, we create a holistic ecosystem that:

- **Facilitates pet adoption** from verified sources
- **Streamlines pet supply purchasing** from trusted sellers
- **Builds community** among pet lovers and service providers
- **Promotes responsible pet ownership** through educational content

---

## ✨ Key Features

### 🔐 Authentication & Security
- **Multi-provider Authentication** (Firebase Email/Password + Google OAuth)
- **Protected Route Management** with automatic redirects
- **User Profile System** with avatar support
- **Secure Password Validation** (6+ characters with mixed case requirements)

### 🛍️ Marketplace Operations
- **Multi-category Listings** (Pets, Food, Accessories, Care Products)
- **Advanced Filtering & Search** by category and product name
- **User Dashboard** for managing personal listings
- **Complete CRUD Operations** for posts and products

### 📦 Order & Adoption Management
- **Streamlined Adoption Process** with modal-based forms
- **Order History & Tracking** with detailed records
- **PDF Report Generation** for order documentation
- **Smart Form Pre-filling** using existing user and product data

### 🎨 User Experience
- **Responsive Design** optimized for all devices
- **Dark/Light Mode Toggle** with persistent preferences
- **Interactive Carousel** featuring adoption awareness content
- **Smooth Animations** using Framer Motion
- **Instant Notifications** via React Hot Toast

---

## 🏗️ Technical Architecture

### Frontend Stack
- **React 19** with modern hooks and functional components
- **React Router v7** for client-side navigation
- **Tailwind CSS** with DaisyUI component library
- **Firebase SDK** for authentication services
- **Swiper.js** for responsive carousels
- **Framer Motion** for advanced animations

### Backend Infrastructure
- **Node.js Runtime** with Express.js framework
- **MongoDB Atlas** cloud database
- **Mongoose ODM** for data modeling and validation
- **CORS Configuration** for secure cross-origin requests

### Development Tools & Libraries
| Package | Version | Purpose |
|---------|---------|---------|
| `react` & `react-dom` | ^18.3.1 | Core UI framework |
| `react-router-dom` | ^7.0.2 | Client-side routing |
| `firebase` | ^10.12.2 | Authentication service |
| `axios` | ^1.7.2 | HTTP client for API communication |
| `tailwindcss` | ^3.4.3 | Utility-first CSS framework |
| `daisyui` | ^4.12.10 | Component library for Tailwind |
| `jspdf` & `jspdf-autotable` | ^2.5.1 | PDF generation and formatting |
| `framer-motion` | ^11.11.4 | Animation and gesture library |
| `react-hot-toast` | ^2.4.1 | User notification system |
| `react-icons` | ^5.2.1 | Comprehensive icon collection |
| `swiper` | ^11.1.4 | Touch-enabled sliders and carousels |

---

## 🗃️ Database Schema

### Listings Collection
```javascript
{
  _id: ObjectId,
  name: String,           // Product/Pet name
  category: String,       // "Pets", "Food", "Accessories", "Care Products"
  price: Number,          // Product price
  location: String,       // Seller location
  description: String,    // Detailed description
  image: String,          // Image URL
  email: String,          // Seller email
  date: Date,             // Creation timestamp
  status: String          // "available", "sold", "adopted"
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  productId: String,      // Reference to listing
  productName: String,    // Product name at time of order
  buyerName: String,      // Customer full name
  email: String,          // Customer email
  quantity: Number,       // Order quantity
  price: Number,          // Unit price
  address: String,        // Shipping address
  phone: String,          // Contact number
  date: Date,             // Order timestamp
  additionalNotes: String, // Special instructions
  orderType: String       // "purchase" or "adoption"
}
```

---

## 🚀 Deployment Configuration

### Production Environment
- **Frontend Hosting:** Netlify (CDN optimized)
- **Backend Hosting:** Vercel (Serverless functions)
- **Database:** MongoDB Atlas (Cloud cluster)
- **Authentication:** Firebase Auth (Google infrastructure)
- **Domain:** Custom domain with SSL encryption

### Environment Variables
```env
# Frontend (.env)
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_API_BASE_URL=your_backend_url

# Backend (.env)
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=your_frontend_url
PORT=5000
```

---

## 🛠️ Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas cloud)
- Firebase project for authentication

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Shadul-Coder/PawMart-client.git
   cd PawMart-client
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create `.env` file in root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_actual_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_actual_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. **Backend Setup**
   ```bash
   # Clone backend repository
   git clone https://github.com/Shadul-Coder/PawMart-server.git
   cd PawMart-server
   npm install
   
   # Configure backend environment
   echo "MONGODB_URI=your_mongodb_connection" > .env
   echo "CLIENT_URL=http://localhost:5173" >> .env
   echo "PORT=5000" >> .env
   ```

5. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd PawMart-server
   npm run dev

   # Terminal 2 - Frontend  
   cd PawMart-client
   npm run dev
   ```

6. **Access Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Firebase Configuration
1. Create a new Firebase project
2. Enable Authentication (Email/Password & Google providers)
3. Add your domain to authorized domains
4. Copy configuration to frontend `.env` file

---

## 📱 Application Structure

### Frontend Routes
```
/                   - Homepage with featured listings
/all-posts          - Browse all listings with filters
/post-details/:id   - Individual listing details
/add-post          - Create new listing (protected)
/dashboard         - User's listings management (protected)
/my-orders         - Order history (protected)
/login             - Authentication page
```

### Backend API Endpoints
```
GET    /api/listings        - Fetch all listings
POST   /api/listings        - Create new listing
GET    /api/listings/:id    - Get specific listing
PUT    /api/listings/:id    - Update listing
DELETE /api/listings/:id    - Delete listing
POST   /api/orders          - Create new order
GET    /api/orders/:email   - Get user's orders
```

---

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Pet-friendly tones with high contrast ratios
- **Typography**: Readable font hierarchy with proper scaling
- **Icons**: Consistent iconography from React Icons library
- **Components**: Reusable DaisyUI components with custom styling

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatible
- Color contrast compliance

---

## 🆘 Support

For support and questions:
- 📧 Email: [shadulislam.cse@gmail.com]

---
