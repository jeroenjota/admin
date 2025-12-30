# Jota Tours Admin - Coding Guidelines

## Project Overview
Vue 3 + Vite + Tailwind CSS admin panel for tour management system. Frontend-only application proxying API calls to backend (localhost:3456).

## Architecture

### API Layer Pattern
- **Location**: `src/api/*.api.js` (e.g., `tours.api.js`, `categories.api.js`)
- **Composable**: Use `api()` from `src/composables/useApi.js` to build URLs
- All API functions use native `fetch()` with error handling that throws
- **Import path**: Use `@/composables/useApi.js` (alias configured in vite.config.js)
- Example: `const response = await fetch(api('/api/tours'))`

### Routing Structure
- Router configured in `src/router/index.js` with nested routes
- Dashboard is authenticated parent, tours/categories/users are child routes
- Pages in `src/pages/` correspond to route components
- All routes except `/login` and `/register` require `requiresAuth: true` meta

### State & Components
- No Vuex/Pinia - uses local `ref()` state within components
- Heavy use of draggable components via `vuedraggable` (installed, see PhotoManager.vue)
- Modal pattern: condition with `v-if`, emit close events to parent
- Form components: Two-way binding with `v-model.number` for numeric inputs
- Child component prop drilling via `tourId` is common pattern

## Key Conventions

### Tailwind + Component Structure
- Classes inline in templates (no external CSS classes in script)
- Responsive design with `sm:`, `md:` breakpoints
- Drag handles styled with `drag-handle` class for vuedraggable
- Hover states use `group-hover:` for visibility toggling

### Language & UI Text
- All UI text is Dutch (labels, placeholders, messages)
- No i18n setup - hard-coded strings in templates

### Environment & API
- API base URL: `VITE_API_URL` from `.env.development` (localhost:3456)
- Vite proxy configured at `/api` → backend server
- Image uploads: thumbnails at `/uploads/thumbs/`, full images at `/uploads/`
- Use Vite's `import.meta.env.VITE_*` for env vars

## Developer Workflows

### Local Setup
```bash
npm install        # Install dependencies (axios, vue-router, vuedraggable, tailwindcss)
npm run dev        # Start dev server on :5173 with API proxy to localhost:3456
npm run build      # Production build to dist/
npm run preview    # Preview built app locally
```

### Common Patterns
1. **Add new admin page**: Create `.vue` in `src/pages/`, add route to `src/router/index.js`, import API functions
2. **CRUD operations**: Create `src/api/resource.api.js` with fetch calls, import in page component
3. **Forms with modal**: Use TourEdit.vue pattern (fixed overlay, emit close on completion)
4. **Photo/file upload**: Copy FotoUpload.vue pattern with preview + FormData upload

## Critical Implementation Details

### PhotoManager Component
- Demonstrates advanced pattern: draggable list + modal selection + file upload
- Uses `vuedraggable` v-model binding with `@end` event for save
- Multiple child components (PhotoUploadInput, PhotoLibraryModal)
- Prop: `tourId: Number` - central to all API calls
- URL generation: `thumbUrl(filename)` helper wraps `api()` composable

### Form Components (TourEdit, TourForm, UserForm)
- Grid layout pattern: `grid-cols-[100px_1fr]` for label/input pairs
- Multiple input types with `v-model` and `.number` modifier
- Checkbox for boolean: `<input type="checkbox" v-model="form.active" />`
- Submit/cancel buttons emit events to parent

### Category Linking
- `saveTourCategories()` and `getTourCategories()` in `categories.api.js`
- Categories sent as array: `{ categoryIds: [1, 2, 3] }`
- Returned data mapped to IDs: `.map(row => row.id)`

## Debugging Tips
- Check `.env.development` for API URL and feature toggles
- Vite proxy issues: Verify backend is running on port 3456
- Component not rendering: Check route config in `src/router/index.js` and `meta: { requiresAuth }`
- File upload failures: Ensure backend accepts FormData and returns expected JSON structure
