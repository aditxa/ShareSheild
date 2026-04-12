#  ShareShield - Sensitive Data Hider

**ShareShield collects ZERO data.** Everything runs locally in your browser.

-   No analytics or tracking
-   No external API calls
-   No data sent to servers


Aditya Bhandari - 2023040  Manya Chaturvedi - 2023312

> **Share your screen without exposing sensitive data.**

ShareShield is a Chrome extension that intelligently hides sensitive information in your browser. You can either mask sensitive data or replace it with realistic scrambled stand-ins, then share your screen with confidence.

---

##  Features

*  **CSS Selector-based Hiding** – Target specific elements with precision.
*  **Regex Pattern Matching** – Automatically detect sensitive text (emails, SSNs, credit cards, etc.).
*  **Scramble Mode** – Replace sensitive values with realistic, deterministic fake values.
*  **Blur Mode** – Keep original text in place while visually obscuring it.
*  **Mode Switcher** – Toggle between Blur and Scramble instantly via the popup.
*  **Smart Ignore Rules** – Exclude specific content or selectors from processing.
*  **Dynamic Content Support** – Works with React, Vue, and SPAs via `MutationObserver`.
*  **Import/Export Configs** – Easily share configurations across teams.


---

##  Quick Start

### Installation

#### Manual Installation (Development)


2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run build
   ```

4. Load in Chrome:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist/` directory

---

##  Usage

### Blur vs. Scramble

Use the ShareShield popup to choose a mode:

- **Blur** - Keeps the original value in the DOM and visually blurs it
- **Scramble** - Replaces the visible value with a deterministic fake value generated locally

Scramble mode is useful when blur is too distracting or when you want the page to remain readable during demos while still hiding sensitive values.

### Basic Configuration

Click the ShareShield icon in your toolbar to open the configuration panel. Use the mode dropdown to choose **Blur** or **Scramble**. The extension uses a JSON configuration file:

```json
{
  "version": "1",
  "selectors": [
    "[data-sensitive='true']",
    ".customer-email",
    "input[name='email']"
  ],
  "regex": [
    {
      "pattern": "[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}",
      "flags": "gi"
    }
  ],
  "ignore": {
    "selectors": [".public-data"],
    "regex": [
      {
        "pattern": "support@mycompany\\.com",
        "flags": "i"
      }
    ]
  }
}
```

### Configuration Options

#### `selectors` (Array of Strings)
CSS selectors to target elements for hiding.

**Examples:**
- `"[data-sensitive='true']"` - Elements with data-sensitive attribute
- `".customer-email"` - Elements with customer-email class
- `"input[name='email']"` - Email input fields
- `"#user-profile .address"` - Specific nested elements

#### `regex` (Array of Objects)
Regular expressions to match and hide sensitive text content.

**Structure:**
```json
{
  "pattern": "regex_pattern_here",
  "flags": "gi"  // optional: g=global, i=case-insensitive
}
```

**Common Patterns:**
- Email: `[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}`
- SSN: `\\b\\d{3}-\\d{2}-\\d{4}\\b`
- Credit Card: `\\b\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}\\b`
- Phone: `\\b\\d{3}[-.\\s]?\\d{3}[-.\\s]?\\d{4}\\b`

#### `ignore` (Object)
Exceptions to prevent hiding of specific content.

**Structure:**
```json
{
  "selectors": ["array of CSS selectors"],
  "regex": [
    {
      "pattern": "pattern_to_ignore",
      "flags": "i"
    }
  ]
}
```

---

##  Use Cases

### Screen sharing
Hide sensitive data while screen sharing your CRM, analytics platform, or admin dashboard.

### Healthcare
Hide patient names, medical record numbers, and diagnoses during training sessions.

### Financial Services
Mask account numbers, balances, and transaction details in presentations.

### Customer Support
Share screenshots with support teams without exposing sensitive information.

---

##  Example Configurations

We provide pre-built configurations for common use cases:

- **[SaaS/CRM](examples/saas-crm.json)** - Customer emails, phone numbers, addresses
- **[Healthcare](examples/healthcare.json)** - Patient data, medical records, PHI
- **[Financial](examples/financial.json)** - Account numbers, credit cards, balances

To use an example:
1. Open the ShareShield popup
2. Click "Import Config"
3. Select an example JSON file
4. Click "Save Config"

---

##  Development



npm install

# Build TypeScript
npm run build


### How It Works

1. **Content Script Injection**: When you visit a page, `content.ts` is injected
2. **Configuration Loading**: The script loads your config from Chrome storage
3. **Mode Selection**: The popup stores whether the extension should blur or scramble matched content
4. **Initial Scan**: All elements matching your selectors are processed using the active mode
5. **MutationObserver**: Watches for DOM changes to process dynamically added content
6. **Regex Processing**: Text nodes are scanned for regex patterns and wrapped in censor spans
7. **Scramble Engine**: In scramble mode, sensitive values are replaced with deterministic fake values locally
8. **Idempotency**: Uses `data-censor="1"` attribute to prevent re-wrapping

---




