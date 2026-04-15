# KoinX Tax Loss Harvesting Tool

**Author:** Ankit Kumar

A responsive React application that helps users visualize and optimize their crypto tax liabilities through tax loss harvesting.
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3687edad-6780-473b-9f42-1f47ad8f17bf" />



## 🚀 Live Demo

[Deployed Link](https://koin-x-tax-loss-harvesting-assignme.vercel.app/)

## ✨ Features

- **Capital Gains Overview** — Side-by-side Pre-Harvesting and After-Harvesting cards
- **Interactive Holdings Table** — Select/deselect individual assets or use "Select All"
- **Real-time Updates** — After Harvesting card updates instantly based on selections
- **Tax Savings Display** — Shows potential savings when harvesting reduces net gains
- **Column Sorting** — Sort holdings by Short-term or Long-term gains (enabled after selection)
- **Tooltips** — Hover over any number to see exact values
- **View All** — Shows 4 rows by default; expand to see all 25 assets
- **"How it works?" Tooltip** — Hover to see explanation
- **Responsive Design** — Works on desktop and mobile
- **Loading & Error States** — Graceful handling of async data fetching

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| Vite | Build tool & dev server |
| Vanilla CSS | Styling (no UI library) |
| Mock API (Promises) | Simulated async data fetching |

## 📦 Setup Instructions

```bash
# Clone the repository
git clone https://github.com/<your-username>/KoinX-assiment.git

# Navigate to the project directory
cd KoinX-assiment

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173/`.

## 📁 Project Structure

```
src/
├── api/
│   └── mockData.js            # Holdings & capital gains mock data + async fetch
├── components/
│   ├── CapitalGainsCard/      # Pre/After harvesting gain cards
│   ├── Disclaimer/            # Collapsible "Important Notes" section
│   ├── Header/                # KoinX logo + responsive nav
│   ├── HoldingsTable/         # Interactive table with checkboxes & sorting
│   └── Loader/                # Loading spinner
├── utils/
│   └── formatters.js          # Currency ($) and number formatting
├── App.jsx                    # Main app — state management & business logic
├── App.css                    # Layout & tooltip styles
├── index.css                  # Global CSS reset
└── main.jsx                   # React entry point
```

## 💡 Business Logic

### Capital Gains Calculation

When a user selects a holding for harvesting:

| Condition | Action |
|-----------|--------|
| STCG gain ≥ 0 | Added to short-term **profits** |
| STCG gain < 0 | Absolute value added to short-term **losses** |
| LTCG gain ≥ 0 | Added to long-term **profits** |
| LTCG gain < 0 | Absolute value added to long-term **losses** |

**Net Capital Gains** = (ST Profits − ST Losses) + (LT Profits − LT Losses)

**Savings** = Pre-Harvesting Net Gains − Post-Harvesting Net Gains *(shown only when positive)*

### Example

```
Pre-harvesting:  STCG(100 - 500) + LTCG(1200 - 100) = -400 + 1100 = $700

Select ETH (STCG: +500, LTCG: -1000):
Post-harvesting: STCG(600 - 500) + LTCG(1200 - 1100) = 100 + 100 = $200

Savings: $700 - $200 = $500 → "You are going to save upto $500"
```

## 📱 Screenshots

### Desktop View
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3687edad-6780-473b-9f42-1f47ad8f17bf" />

### Mobile View
Responsive layout with stacked cards and horizontally scrollable table.
<img width="720" height="1600" alt="demooo" src="https://github.com/user-attachments/assets/d7bd50ca-7177-4bc8-8acf-20bba1500969" />


## 🧩 Bonus Features Implemented

- ✅ Mobile responsiveness
- ✅ Clean, reusable component architecture
- ✅ Proper state management with `useState`, `useMemo`, `useCallback`
- ✅ Visual feedback for selections (row highlighting, blue checkboxes)
- ✅ Loader/Error states for API calls
- ✅ "View All" functionality (4 rows default)
- ✅ Column sorting (Short-term / Long-term)
- ✅ Tooltips showing exact values on hover

## 📝 Assumptions

1. Currency displayed in USD ($) as shown in the Figma design
2. Holdings sorted in API order by default; sorting activates only after selection
3. "Amount to Sell" is populated with `totalHolding` when a row is selected
4. "How it works?" link shows a tooltip (placeholder text)
5. Mock API simulates a 500ms network delay
6. Disclaimer text matches the Figma design notes

## 📄 License

MIT
