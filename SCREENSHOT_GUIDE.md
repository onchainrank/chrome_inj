# Screenshot Creation Guide

## Required Specifications

**Dimensions:** 1280x800 or 640x400 (16:10 aspect ratio)
**Format:** PNG or JPEG
**Minimum:** 1 screenshot
**Recommended:** 3-5 screenshots
**Maximum:** 5 screenshots

---

## Screenshot Ideas

### 1. Extension in Action (MUST HAVE)
**Priority:** Critical

**What to show:**
- Bullx NEO terminal with embedded onchainrank iframe
- Clear visibility of the injected content
- Token address visible in URL bar
- Extension icon visible in toolbar

**How to capture:**
1. Go to `https://neo.bullx.io/terminal?address=<any-token-address>`
2. Make sure your extension is enabled with API key configured
3. Wait for iframe to inject
4. Use Chrome DevTools screenshot tool:
   - Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
   - Type "Capture screenshot"
   - Select "Capture full size screenshot"
5. Crop to 1280x800 focusing on the terminal area

**Tip:** Choose a token with interesting chart data to make the screenshot more appealing.

---

### 2. Settings Popup (HIGHLY RECOMMENDED)
**Priority:** High

**What to show:**
- Extension popup with settings interface
- API Key field (use placeholder/blurred actual key)
- Iframe Height setting
- Save Settings button
- Extension logo visible

**How to capture:**
1. Click the extension icon in Chrome toolbar
2. Popup will appear
3. Use macOS screenshot tool:
   - Press `Cmd+Shift+4`
   - Drag to select popup area
   - File saves to desktop
4. Open in Preview and resize to 1280x800
   - Enlarge the popup screenshot
   - Add padding/background to reach 1280x800
   - Or composite with browser UI showing

**Tip:** Use "your-api-key-here" as placeholder in the field for the screenshot.

---

### 3. Before/After Comparison (RECOMMENDED)
**Priority:** Medium

**What to show:**
- Split screen showing:
  - LEFT: Bullx terminal WITHOUT extension (before)
  - RIGHT: Bullx terminal WITH extension (after)
- Clear visual difference highlighting the value

**How to capture:**
1. Disable extension and take screenshot of Bullx terminal
2. Enable extension and take screenshot of same view with iframe
3. Use image editing tool to create side-by-side comparison:
   - Open both images
   - Create 1280x800 canvas
   - Place both screenshots side by side (640px each)
   - Add "Before" and "After" labels

**Tools:**
- Preview (Mac) - basic editing
- GIMP (free) - advanced editing
- Photoshop/Figma - professional tools
- Online tools: Canva, Photopea

---

### 4. Dynamic Update Demo (OPTIONAL)
**Priority:** Low

**What to show:**
- Series of screenshots showing iframe updating as you navigate
- Multiple tokens with different charts
- Demonstrates automatic re-injection

**How to capture:**
1. Navigate to terminal with token A
2. Screenshot the embedded iframe
3. Navigate to terminal with token B
4. Screenshot the new embedded iframe
5. Create composite image showing both states with arrows

**Composite layout:**
```
[Token A chart] → [Navigation] → [Token B chart]
     640x400          Arrow         640x400
```

---

### 5. Clean Interface Integration (OPTIONAL)
**Priority:** Low

**What to show:**
- Close-up of the seamlessly integrated iframe
- Focus on how naturally it fits in Bullx layout
- Minimal chrome, maximum content

**How to capture:**
1. Go to Bullx terminal with extension active
2. Zoom in slightly (Cmd/Ctrl + "+")
3. Capture just the terminal content area
4. Crop to show iframe integration point clearly

---

## Step-by-Step Screenshot Process

### macOS Users

**Method 1: Chrome DevTools (Best for full page)**
```
1. Open Bullx terminal with extension active
2. Press Cmd+Opt+I to open DevTools
3. Press Cmd+Shift+P
4. Type "screenshot"
5. Select "Capture full size screenshot"
6. Image saves to Downloads
7. Open in Preview and resize to 1280x800
```

**Method 2: Built-in Screenshot (Best for specific areas)**
```
1. Press Cmd+Shift+4
2. Drag to select area
3. File saves to Desktop
4. Open in Preview
5. Tools → Adjust Size → 1280x800
```

### Windows Users

**Method 1: Chrome DevTools**
```
1. Open Bullx terminal with extension active
2. Press Ctrl+Shift+I to open DevTools
3. Press Ctrl+Shift+P
4. Type "screenshot"
5. Select "Capture full size screenshot"
6. Resize to 1280x800 using Paint or other tools
```

**Method 2: Snipping Tool**
```
1. Press Win+Shift+S
2. Select area
3. Image copies to clipboard
4. Paste in Paint
5. Resize to 1280x800
```

---

## Image Editing & Resizing

### Resize to 1280x800

**Using Preview (macOS):**
```
1. Open screenshot in Preview
2. Tools → Adjust Size
3. Width: 1280
4. Height: 800
5. Uncheck "Scale proportionally" if needed
6. Click OK
7. File → Export → PNG
```

**Using GIMP (Free, cross-platform):**
```
1. Open screenshot in GIMP
2. Image → Scale Image
3. Width: 1280
4. Height: 800
5. Interpolation: Cubic
6. Click Scale
7. File → Export As → PNG
```

**Online Tools:**
- https://www.iloveimg.com/resize-image
- https://www.photopea.com/ (Photoshop alternative)
- https://imageresizer.com/

### Add Annotations (Optional)

**Add arrows/highlights to show key features:**
- Preview (macOS): Tools → Annotate
- Paint (Windows): Shapes and text tools
- Online: https://www.photopea.com/

**Examples:**
- Arrow pointing to injected iframe: "onchainrank data here"
- Circle around extension icon: "Click to configure"
- Highlight API key field: "Enter your API key"

---

## Screenshot Optimization

### File Size
- **Recommended:** Under 5MB per screenshot
- Chrome Web Store accepts up to 16MB
- Compress if needed: https://tinypng.com/

### Quality
- Use PNG for UI screenshots (sharp text)
- Use JPEG for charts/photos (smaller size)
- Avoid blur or pixelation
- Ensure text is readable

### Composition Tips
1. **Clean browser UI** - Close unnecessary tabs
2. **Highlight the value** - Make iframe obvious
3. **Use realistic data** - Choose interesting tokens
4. **Professional look** - No clutter or distractions
5. **Consistent style** - Same browser theme across screenshots

---

## Privacy & Security

⚠️ **IMPORTANT: Protect Your API Key**

**Before taking screenshots:**
1. Use placeholder API key: `your-api-key-here`
2. Or blur actual API key in editing
3. Never show real credentials

**Check for sensitive data:**
- Wallet addresses
- Personal bookmarks
- Private tabs
- Email in Chrome profile

---

## Quick Checklist

Screenshot 1: Extension in Action
- [ ] Bullx terminal visible
- [ ] Iframe clearly embedded
- [ ] Token address in URL
- [ ] 1280x800 resolution
- [ ] No sensitive data visible

Screenshot 2: Settings Popup
- [ ] Extension popup visible
- [ ] Settings fields clear
- [ ] API key placeholder/blurred
- [ ] 1280x800 resolution
- [ ] Logo/branding visible

Screenshot 3-5: (Optional)
- [ ] Additional value demonstrations
- [ ] Consistent quality
- [ ] 1280x800 resolution
- [ ] Professional appearance

---

## Examples of Good Screenshots

### ✅ Good Screenshot Qualities
- Clear, high resolution
- Shows actual functionality
- Highlights key features
- Professional appearance
- Realistic use case
- No sensitive data

### ❌ Poor Screenshot Qualities
- Blurry or low resolution
- Doesn't show extension working
- Too much clutter
- Wrong dimensions
- Contains sensitive data
- Looks staged/fake

---

## Final Steps

1. **Create screenshots** (at least 1, recommend 3)
2. **Verify dimensions** (1280x800 or 640x400)
3. **Check file size** (under 5MB recommended)
4. **Remove sensitive data** (blur API keys, addresses)
5. **Save in PNG format** (better quality for UI)
6. **Name clearly** (screenshot-1-main.png, screenshot-2-settings.png, etc.)

**Ready for upload to Chrome Web Store!** 🎨
