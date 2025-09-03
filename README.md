# 📰 Mobile Development Exam - News App

A cross-platform mobile application built with **Ionic + Angular**, designed to help a local news TV station optimize audience engagement.  
The app provides a **native-like experience** on both iOS and Android from a single codebase, with real-time news updates and secure user management.

---

## 🚀 Features

- 🔐 **Authentication**
  - User registration with encrypted password (CryptoJS)
  - Login / Logout with guards and interceptors
  - Session management with `localStorage`

- 📰 **News Management**
  - News feed powered by [NewsAPI](https://newsapi.org/)
  - First news highlighted with `PrincipalNewsComponent`
  - News preview in modal with **InAppBrowser**

- 👤 **User Profile**
  - User registration & update via `UserForm`
  - Country selection with flag (from [CountriesNow API](https://countriesnow.space/api/v0.1/countries/flag/unicode))

- 🎨 **UI/UX**
  - Reusable components (`Input`, `Select`, `Button`, `Card`, `Header`, `Sidebar`, etc.)
  - Responsive design with Ionic
  - ## 🛠️ Tech Stack

- **Framework**: Ionic 6 + Angular 15 +  
- **APIs**:
  - [NewsAPI](https://newsapi.org/) (requires API Key in headers)  
  - [CountriesNow](https://countriesnow.space/api/v0.1/countries/flag/unicode)  
- **State & Data**: RxJS, Firebase/LocalStorage  
- **Security**: CryptoJS for password encryption  
- **Interceptors & Guards**: Custom Auth flow  
- **Services**: News, User, Loader, Toast, Storage, HTTP wrapper  

---

## 📂 Project Structure

- `components/` → Reusable components (Input, Select, Card, etc.)  
- `services/` → API & logic handlers  
- `providers/` → Utility services (encrypt, toast, loader, etc.)  
- `guards/` → Auth & IsLogged guards  
- `interceptors/` → HTTP interceptor to inject API key  
- `shared/` → SharedModule with all reusable logic  

---

## ⚡ Installation & Setup

### ✅ Prerequisites
- Node.js v16+
- Ionic CLI  
  ```bash
  npm install -g @ionic/cli
