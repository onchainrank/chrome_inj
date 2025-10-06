# Chrome Web Store Publishing Guide

## Prerequisites

### 1. Developer Account
- Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
- Sign in with your Google account
- Pay one-time $5 registration fee (required for first-time publishers)

### 2. Required Materials Checklist

#### ✅ Extension Files (Already Complete)
- [x] manifest.json (configured and validated)
- [x] All source files (content.js, background.js, popup.html, popup.js)
- [x] Icons (ocr16.png, ocr48.png, ocr128.png)
- [x] Logo (logo.png)

#### ✅ Documentation (Already Created)
- [x] Privacy policy (PRIVACY_POLICY.md)
- [x] Store listing content (CHROME_STORE_LISTING.md)

#### 📋 Materials You Need to Create

1. **Privacy Policy URL** (Required)
   - Host PRIVACY_POLICY.md publicly
   - Options:
     - GitHub Pages: `https://yourusername.github.io/onchainrank-injector/privacy-policy`
     - Your website: `https://yourdomain.com/privacy-policy`
     - GitHub Gist (for quick setup)

2. **Screenshots** (At least 1, recommended 3-5)
   - Dimensions: 1280x800 or 640x400 (16:10 ratio)
   - Format: PNG or JPEG
   - See screenshot guide below

3. **Promotional Images** (Optional but recommended)
   - Small tile: 440x280px
   - Store icon: Use existing ocr128.png

---

## Step-by-Step Publishing Process

### Step 1: Host Your Privacy Policy

**Option A: GitHub Pages (Recommended)**
```bash
# Create a gh-pages branch
git checkout -b gh-pages

# Copy privacy policy to index.html
cp PRIVACY_POLICY.md index.html

# Commit and push
git add index.html
git commit -m "Add privacy policy for Chrome Web Store"
git push origin gh-pages

# Enable GitHub Pages in repository settings
# URL will be: https://yourusername.github.io/onchainrank-injector/
```

**Option B: GitHub Gist (Quick Setup)**
1. Go to https://gist.github.com
2. Create new gist with PRIVACY_POLICY.md content
3. Make it public
4. Use the gist URL

**Option C: Your Website**
- Upload PRIVACY_POLICY.md to your website
- Convert to HTML if needed
- Ensure it's publicly accessible

### Step 2: Create Extension Package

```bash
# Navigate to extension directory
cd /Users/jacekstanusz/Projects/onchainrank/chrome/inj

# Create a ZIP file of all extension files
zip -r onchainrank-injector.zip . \
  -x "*.git*" \
  -x "*.DS_Store" \
  -x "PRIVACY_POLICY.md" \
  -x "CHROME_STORE_LISTING.md" \
  -x "PUBLISHING_GUIDE.md" \
  -x "CLAUDE.md" \
  -x "README.md"

# Verify the ZIP contains only necessary files
unzip -l onchainrank-injector.zip
```

**Required files in ZIP:**
- manifest.json
- content.js
- background.js
- popup.html
- popup.js
- ocr16.png
- ocr48.png
- ocr128.png
- logo.png

### Step 3: Prepare Screenshots

**Use these guidelines:**

1. **Main Screenshot - Extension in Action**
   - Navigate to `neo.bullx.io/terminal?address=<some-token-address>`
   - Configure your API key in extension
   - Take full browser screenshot showing embedded iframe
   - Resize to 1280x800

2. **Settings Screenshot**
   - Click extension icon
   - Show the popup with API key field and height setting
   - Crop and resize to 1280x800

3. **Before/After (Optional)**
   - Split screen showing terminal without and with extension
   - Highlights the value proposition

**Screenshot Tool Recommendations:**
- **macOS:** Cmd+Shift+4 (built-in)
- **Chrome DevTools:** Cmd+Shift+P → "Capture screenshot"
- **Image resize:** Preview (macOS) or online tools like iloveimg.com

### Step 4: Submit to Chrome Web Store

1. **Go to Developer Dashboard**
   - Visit: https://chrome.google.com/webstore/devconsole
   - Click "New Item"

2. **Upload Extension**
   - Upload `onchainrank-injector.zip`
   - Wait for processing (usually 1-2 minutes)

3. **Fill Out Store Listing**

   **Product Details:**
   - Store listing language: English
   - Item name: `onchainrank Injector`
   - Summary: (Copy from CHROME_STORE_LISTING.md - Short Description)
   - Detailed description: (Copy from CHROME_STORE_LISTING.md - Detailed Description)
   - Category: Productivity
   - Language: English

   **Privacy:**
   - Single purpose description: (Copy from CHROME_STORE_LISTING.md)
   - Permission justifications: (Copy from CHROME_STORE_LISTING.md)
   - Privacy policy URL: (Your hosted privacy policy URL)
   - Data usage disclosure:
     - ✅ Does handle personal or sensitive data
     - Data type: Authentication credentials (API key)
     - Data usage: App functionality
     - Data stored: Locally only
     - NOT sold to third parties
     - NOT used for unrelated purposes

   **Graphics:**
   - Icon: Upload ocr128.png
   - Screenshots: Upload your prepared screenshots (min 1, max 5)
   - Promotional tile (optional): Upload if created

   **Distribution:**
   - Visibility: Public or Unlisted (choose based on preference)
   - Countries: Select all or specific regions
   - Pricing: Free

4. **Developer Information**
   - Publisher name: (Your name or organization)
   - Publisher email: (Your support email)
   - Publisher website: (Optional)
   - Support email: (Your support email)

5. **Review and Submit**
   - Review all information
   - Click "Submit for Review"
   - Accept Terms of Service

---

## Review Process

### Timeline
- **Initial Review:** 1-3 business days (sometimes up to 1 week)
- **Updates:** Usually faster, 24-48 hours

### What Reviewers Check
1. ✅ Permissions match functionality
2. ✅ Privacy policy is clear and accessible
3. ✅ No malicious code or obfuscation
4. ✅ Extension works as described
5. ✅ Single purpose compliance
6. ✅ No trademark violations

### Possible Outcomes

**✅ Approved**
- Extension goes live immediately
- Users can install from Chrome Web Store

**⚠️ Requires Changes**
- You'll receive email with specific issues
- Fix and resubmit
- Review happens again

**❌ Rejected**
- Serious policy violations
- Appeal if you believe it's an error

---

## Post-Publication

### Update Your Extension
```bash
# Increment version in manifest.json
# Example: "version": "1.5" → "version": "1.6"

# Create new ZIP
zip -r onchainrank-injector-v1.6.zip . -x "*.git*" -x "*.DS_Store" ...

# Upload to existing item in dashboard
# Submit for review
```

### Monitor Performance
- Dashboard shows: installs, uninstalls, ratings, reviews
- Respond to user reviews (builds trust)
- Track crash reports in developer console

### Promote Your Extension
- Share Chrome Web Store link
- Add badge to your website/README
- Share on social media, forums

---

## Troubleshooting

### Common Rejection Reasons

**"Permissions not justified"**
- Ensure permission justifications clearly explain why each is needed
- Remove any unused permissions (already done)

**"Privacy policy missing or inadequate"**
- Ensure URL is publicly accessible
- Must cover all data collection/usage
- Should mention API key storage

**"Single purpose violation"**
- Extension must do ONE thing
- This extension's single purpose: embed onchainrank charts in Bullx terminal

**"Functionality unclear"**
- Improve description to clearly explain what extension does
- Add better screenshots showing actual usage

### Tips for Faster Approval

1. ✅ Use clear, simple language in descriptions
2. ✅ Provide high-quality screenshots
3. ✅ Ensure privacy policy URL works (test in incognito)
4. ✅ Test extension thoroughly before submission
5. ✅ Use minimal permissions (already done)
6. ✅ Respond quickly to reviewer feedback

---

## Quick Command Reference

```bash
# Create ZIP package
cd /Users/jacekstanusz/Projects/onchainrank/chrome/inj
zip -r onchainrank-injector.zip . -x "*.git*" -x "*.DS_Store" -x "*.md"

# Test extension locally before submission
# 1. Go to chrome://extensions/
# 2. Enable Developer mode
# 3. Click "Load unpacked"
# 4. Select extension directory
# 5. Test all functionality

# Host privacy policy on GitHub Pages
git checkout -b gh-pages
cp PRIVACY_POLICY.md index.html
git add index.html
git commit -m "Add privacy policy"
git push origin gh-pages
```

---

## Resources

- **Chrome Web Store Developer Dashboard:** https://chrome.google.com/webstore/devconsole
- **Developer Program Policies:** https://developer.chrome.com/docs/webstore/program-policies/
- **Publishing Guide:** https://developer.chrome.com/docs/webstore/publish/
- **Badge/Branding Assets:** https://developer.chrome.com/docs/webstore/branding/

---

## Final Checklist Before Submission

- [ ] Privacy policy hosted and publicly accessible
- [ ] ZIP file created with only necessary files
- [ ] At least 1 screenshot prepared (1280x800)
- [ ] Developer account registered ($5 fee paid)
- [ ] All store listing content prepared (from CHROME_STORE_LISTING.md)
- [ ] Extension tested locally
- [ ] Support email address ready
- [ ] Version number confirmed in manifest.json

**You're ready to publish!** 🚀
