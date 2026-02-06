# 🌱  FarmScan: AI-Powered Plant Disease Detection

CropGuard Scan is a state-of-the-art mobile-first web application designed to help farmers and gardeners identify plant diseases early. Using a custom-trained **MobileNetV2** deep learning model and **Supabase** for real-time data persistence, CropGuard provides instant analysis and treatment recommendations.

---

## ✨ Key Features

*   **🤖 AI Disease Detection**: Upload or take a photo of a plant leaf to get an instant diagnosis.
*   **🗣️ Text-to-Speech Accessibility**: Integrated read-aloud functionality for accessibility and ease of use.
*   **📊 Dynamic Statistics**: Track your scanning history, healthy plant ratio, and average detection confidence.
*   **🔔 Real-Time Alerts**: Receive personalized notifications about disease outbreaks in your area.
*   **🌐 Multilingual Support**: Fully translated into English, Hindi, Bengali, Telugu, Marathi, and Tamil.
*   **📂 History Management**: Save and review all past scans with their corresponding localized treatment plans.
*   **🔍 Detailed Disease Insights**: Comprehensive information pages for identified diseases and scan results.
*   **👤 Secure Authentication**: User profiles and data privacy powered by Supabase Auth and Row Level Security (RLS).

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Framer Motion ("Farmscan Fresh" Teal/Pink Palette)
- **UI Components**: Shadcn UI & Lucide Icons
- **State Management**: React Query & Context API

### Backend (AI Engine)
- **Engine**: FastAPI (Python 3.9+)
- **Model**: TensorFlow / Keras (MobileNetV2)
- **Processing**: Pillow & NumPy

### Database & Auth
- **Provider**: Supabase
- **Features**: PostgreSQL, Auth, Row Level Security (RLS)

---

## 🚀 Getting Started

### 1. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. AI Model Server Setup
Located in the `/ai` directory.
```bash
cd ai

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate

# Install requirements
pip install -r requirements.txt

# Start the AI server
python app.py
```
*The server runs on `http://localhost:8000`. Ensure this is running for the Scan feature to work.*

### 3. Supabase Configuration
Create the following tables and run the SQL below in your Supabase SQL Editor.

#### Tables Schema:
- `profiles`: `id` (uuid, PK), `full_name` (text), `created_at` (timestamp)
- `scans`: `id` (uuid, PK), `user_id` (uuid, FK), `image_url` (text), `disease_id` (text), `confidence` (float), `is_healthy` (boolean), `created_at` (timestamp)
- `alerts`: `id` (uuid, PK), `user_id` (uuid, FK), `title` (text), `message` (text), `is_read` (boolean), `created_at` (timestamp)

#### Required SQL (RLS Policies):
```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can manage own profile" ON profiles FOR ALL USING (auth.uid() = id);

-- Scans Policies
CREATE POLICY "Users can view own scans" ON scans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own scans" ON scans FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Alerts Policies
CREATE POLICY "Users can manage own alerts" ON alerts FOR ALL USING (auth.uid() = user_id);
```

---

## 📁 Project Structure

```text
├── ai/                 # Python AI Model Server
│   ├── model/          # MobileNetV2 .h5 model file
│   └── app.py          # FastAPI application
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # Auth, Language, and Global state
│   ├── data/           # Disease database & recommendations
│   ├── integrations/   # Supabase client & types
│   ├── pages/          # Main application views
│   └── types/          # TypeScript definitions
└── public/             # Static assets
```

---

## 📈 Future Roadmap
- [ ] Offline scanning support using TensorFlow.js.
- [ ] Community forum for farmers to share advice.
- [ ] Marketplace integration for recommended fertilizers/pesticides.
- [ ] Weather-based disease risk forecasting.

---

**Developed with ❤️ for the future of farming.**