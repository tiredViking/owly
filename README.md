# Owly 🦉 | Book Explorer
## [tiredViking.github.io/owly](https://tiredViking.github.io/owly)

This project was created for Start2Impact JavaScript course; it features a web application designed for exploring books by genre via the OpenLibrary API. It combines a classic "library" aesthetic with a modular JavaScript architecture.

## Architectural Design: The Service Pattern

The core of this project is the implementation of the Service Pattern.

Instead of mixing API calls with DOM manipulation, all data-related logic is encapsulated within the OpenLibraryService.
Why Service Pattern?
- Separation of Concerns: The UI components don't need to know how to talk to OpenLibrary; they only care about the data they receive.
- Decoupling: If the API provider changes in the future (e.g., switching to Google Books), it is only necessary to update the Service module, leaving the rest of the app untouched.
- Testability: By isolating the API logic, it is easy to perform unit tests using Vitest, mocking network responses without needing a browser environment.

## Tech Stack & Tooling

- Runtime: Vanilla JavaScript (ES6+) with a modular approach;
- Bundler: Vite; 
- Styling: Modular SCSS; 
- Testing: Vitest - Automated unit tests for data-fetching functions;

## Project main structure
```
index.html
src/
├── js/
│   ├── services/       # Service Pattern: API & Data Logic
│   ├── ui/             # View Layer: Rendering & Components
│   └── main.js         # Entry Point: Event Delegation & Orchestration
├── sass/
│   ├── main.scss       # Global styles and orchestration
│   ├── base/           # Variables, Mixins. 
│   ├── components/     # Cards, Buttons, Interactive elements
│   └── layout/         # Section-specific styles
└── tests/              # Vitest suite
public/
└── img/                # Favicons and logo             
```

## Getting Started

###  Clone & Install:
    git clone https://github.com/tiredViking/owly.git
    npm install

### Development:
    npm run dev

### Testing:
    npm run test

### Build:
    npm run build
