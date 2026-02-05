# Quick Reference Guide - Camera & Translation Updates

## 🎥 Camera Improvements

### What Changed:
1. **Camera Feed Display**
   - Camera now shows INSIDE the scan box (not as a separate view)
   - Professional scanning frame with corner brackets
   - Animated scanning line for visual feedback

2. **Mobile Camera Controls**
   - **Flip Camera Button** - Tap the camera icon in the top-right corner to switch between front and back cameras
   - Only appears on mobile devices
   - Semi-transparent overlay design

3. **Visual Enhancements**
   - Green corner brackets guide where to position the leaf
   - Horizontal scanning line shows active scanning area
   - Smooth animations for better UX

### How to Use:
1. Navigate to the Scan page
2. Click "Take Photo" button
3. Allow camera permissions when prompted
4. On mobile: Use the flip button (top-right) to switch cameras
5. Position the leaf within the corner brackets
6. Click "Capture" to take the photo
7. Review and click "Use Photo" or "Retake"

---

## 🌍 Translation System

### Supported Languages:
- 🇬🇧 **English (EN)** - Default
- 🇮🇳 **Hindi (हि)** - हिंदी
- 🇮🇳 **Bengali (বাংলা)** - বাংলা
- 🇮🇳 **Telugu (తెలుగు)** - తెలుగు
- 🇮🇳 **Marathi (मराठी)** - मराठी
- 🇮🇳 **Tamil (தமிழ்)** - தமிழ்

### All Translated Text:

#### Navigation
- Home, Scan, History, Diseases, Alerts

#### Scan Page
- "Take a clear photo of the affected leaf"
- "Drag & drop or tap to select"
- "Take Photo" / "Upload Photo"
- "Analyze Leaf"
- "Analyzing..."
- "Capture"
- "Retake"
- "Use Photo"
- "Switch Camera"

#### Results
- "Scan Result"
- "Confidence"
- "Symptoms"
- "Treatment"
- "Prevention"
- "Healthy Plant"
- "Scan Again"
- "Save Result"

#### Common UI
- "Search diseases..."
- "All"
- "No diseases found"
- "No scan history yet"
- "Start Your First Scan"
- "Close"
- "Loading..."
- "Error"
- "Success"

### How to Change Language:
1. Look for the language selector (usually in the header or settings)
2. Click on your preferred language code
3. All text will immediately update to the selected language

---

## 🔧 Optional: Google Translate API

For automatic translation of new text:

1. Get a Google Cloud API key with Translation API enabled
2. Add to your `.env` file:
   ```
   VITE_GOOGLE_TRANSLATE_API_KEY=your_api_key_here
   ```
3. Restart the dev server
4. New text will be auto-translated and cached

---

## 📱 Testing Checklist

### Camera Features:
- [ ] Camera opens inside the scan box
- [ ] Corner brackets are visible
- [ ] Scanning line animates
- [ ] Flip camera button appears on mobile
- [ ] Can switch between front/back cameras
- [ ] Capture button works
- [ ] Retake functionality works
- [ ] Use Photo saves the image

### Translation Features:
- [ ] All 6 languages are available
- [ ] Language selector works
- [ ] All text changes when switching languages
- [ ] No English text remains in other languages
- [ ] Scan page fully translated
- [ ] History page fully translated
- [ ] Diseases page fully translated
- [ ] Home page fully translated

---

## 🐛 Troubleshooting

### Camera Not Working:
- Check browser permissions (allow camera access)
- Try a different browser (Chrome/Edge recommended)
- On mobile: Check app permissions in device settings

### Translation Not Showing:
- Clear browser cache and reload
- Check that the language is selected
- Verify the translation key exists in LanguageContext.tsx

### Flip Camera Button Not Visible:
- This is normal on desktop (only shows on mobile)
- On mobile, ensure you're using a device with multiple cameras

---

## 📝 Developer Notes

### Adding New Translations:
1. Open `src/contexts/LanguageContext.tsx`
2. Add new key to `initialTranslations` object
3. Provide translations for all 6 languages
4. Use the key with `t('your.key')` in components

### Modifying Camera UI:
1. Edit `src/components/scan/ImageUploader.tsx`
2. Camera overlay is in the "Camera view" section
3. Adjust corner bracket positions/sizes as needed
4. Modify scanning line animation in the overlay div

---

## ✅ Summary

**Camera Improvements:**
- ✅ Professional scanning interface
- ✅ Mobile camera flip functionality
- ✅ Visual guides for better UX

**Translation Coverage:**
- ✅ 100% UI text translated
- ✅ 6 Indian languages supported
- ✅ Auto-translation capability (optional)

All changes are production-ready and maintain backward compatibility!
