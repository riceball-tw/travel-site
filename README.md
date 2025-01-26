# Travel Site : An Isomorphic Nuxt App for Exploring Attractions

The project is for take-home assignment usage.

- **Nuxt.js**: Utilized for its robust ecosystem and built-in support for isomorphic rendering, simplifying both server-side and client-side development.
- **HTML Form**: Enables built-in client-side form validation, reducing the need for additional JavaScript for basic input checks.
- **Proxy API**: Implemented to bypass CORS restrictions and ensure smooth data fetching from third-party APIs.
- **Semantic CSS Naming**: Applied to enhance readability and maintainability, suitable for small-scale projects.


## Documentation

- [travel.taipei Open API](https://www.travel.taipei/open-api/swagger/ui/index#/)

## Requirement

Build a SPA RWD website using SCSS:

- Home Page: Attraction List (with Pagination)
  - **Data Filtering**: Allows users to filter data using a dropdown menu to select different category
  - **Add to Favorites**: Users can check one or multiple items and add them to their favorites list. Data is stored on the client side and should be preserved even after page refresh.

- Favorite Page: Favorite Attraction List (with Client-Side Pagination)
  - **Editing (client-side)**: Allows users to edit individual attraction At least one field should have validation (e.g., required field for attraction name, no Chinese characters allowed for phone number...)
  - **Removing Favorites (client-side)**: Users can check one or multiple items and remove them from  favorites list

## Setup

Make sure to install dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
