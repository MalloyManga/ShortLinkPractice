# Contributing to ShortLink

First off, thank you for considering contributing to ShortLink! It's people like you that make ShortLink such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots or animated GIFs** if possible
- **Include your environment details** (OS, Node version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior** and **explain which behavior you expected to see instead**
- **Explain why this enhancement would be useful**

### Pull Requests

- Fill in the required template
- Do not include issue numbers in the PR title
- Follow the JavaScript/TypeScript styleguides
- Include screenshots and animated GIFs in your pull request whenever possible
- End all files with a newline
- Avoid platform-dependent code

## Development Process

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR-USERNAME/ShortLinkPractice.git
cd ShortLinkPractice
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### 4. Test Your Changes

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

### 5. Commit Your Changes

```bash
git add .
git commit -m "feat: add amazing feature"
```

**Commit Message Format:**

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Code style changes (formatting, semicolons, etc)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding tests
- `chore:` Build process or auxiliary tool changes

### 6. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 7. Create a Pull Request

Go to the original repository and create a pull request from your fork.

## Styleguides

### JavaScript/TypeScript Styleguide

- Use 4 spaces for indentation (already configured)
- Use camelCase for variables and functions
- Use PascalCase for classes and components
- Use UPPER_CASE for constants
- Prefer `const` over `let`, avoid `var`
- Use arrow functions for anonymous functions
- Use template literals instead of string concatenation
- Add JSDoc comments for functions

Example:

```javascript
/**
 * Create a new short link
 * @param {string} originLink - The original URL
 * @param {string} userId - The user ID
 * @returns {Promise<Object>} The created link object
 */
async function createShortLink(originLink, userId) {
  const shortLink = generateUniqueId();
  // ... implementation
  return { shortLink, originLink };
}
```

### Vue/Nuxt Styleguide

- Use `<script setup>` syntax
- Place `<script>` block before `<template>`
- Use TypeScript for type safety
- Use composition API (ref, computed, etc.)
- Component names should be PascalCase
- Props should be clearly typed

Example:

```vue
<script setup lang="ts">
interface Props {
  title: string;
  count: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  update: [value: number];
}>();
</script>

<template>
  <div>{{ title }}: {{ count }}</div>
</template>
```

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

## Project-Specific Guidelines

### Backend (Express + Prisma)

- Follow the Controller → Service → Prisma pattern
- Always use `AppError` for throwing errors
- Validate input with Zod schemas
- Use `bigintHandler` when returning data with BigInt IDs
- Add console.log for important operations (with descriptive prefixes)

### Frontend (Nuxt + Vue)

- Use composables for reusable logic
- Keep components small and focused
- Use TypeScript interfaces for props and emits
- Follow the existing component prop naming conventions
- Use Tailwind CSS for styling (avoid custom CSS when possible)

### Database (Prisma)

- Always create migrations for schema changes
- Never edit migration files directly
- Use descriptive migration names
- Test migrations on a development database first

```bash
npx prisma migrate dev --name descriptive_migration_name
```

## Questions?

Feel free to open an issue with the "question" label if you have any questions about contributing!

Thank you for contributing! 🎉
