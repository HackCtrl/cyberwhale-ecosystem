
# Development Guidelines

## Development Environment Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher) or Yarn (v1.22.0 or higher)
- Git (v2.30.0 or higher)
- A code editor (VS Code recommended)
- Supabase CLI (for local development with the backend)

### Initial Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-organization/cyberwhale.git
   cd cyberwhale
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file based on the provided `.env.example` template.

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Coding Standards

### General Principles
- **DRY (Don't Repeat Yourself)**: Avoid duplication by abstracting common functionality.
- **KISS (Keep It Simple, Stupid)**: Prefer simple solutions over complex ones.
- **YAGNI (You Aren't Gonna Need It)**: Don't add functionality until it's necessary.
- **Separation of Concerns**: Keep distinct parts of the application separate.

### TypeScript Guidelines
- Use explicit typing wherever possible
- Avoid the `any` type unless absolutely necessary
- Create interfaces for all data structures
- Use type guards for runtime type checking
- Leverage TypeScript's utility types (Partial, Pick, Omit, etc.)

### React Components
- Use functional components with hooks
- Create small, focused components (< 300 lines)
- Implement proper prop validation with TypeScript
- Follow the container/presentational pattern when appropriate
- Use React.memo for performance optimization when needed

### State Management
- Use React Context for global state
- Prefer useState for component-local state
- Implement Tanstack Query for server state
- Avoid prop drilling more than 2 levels deep

### CSS & Styling
- Follow Tailwind CSS naming conventions
- Organize Tailwind classes in a consistent order
- Extract common patterns to custom components
- Use CSS variables for theming
- Ensure responsive design for all components

## Git Workflow

### Branch Naming Convention
- Feature branches: `feature/feature-name`
- Bug fix branches: `fix/bug-description`
- Documentation branches: `docs/what-changed`
- Refactoring branches: `refactor/what-changed`

### Commit Message Format
Follow the Conventional Commits specification:
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types:
- feat: A new feature
- fix: A bug fix
- docs: Documentation changes
- style: Changes that don't affect code execution
- refactor: Code changes that neither fix bugs nor add features
- test: Adding or updating tests
- chore: Updates to build process or auxiliary tools

### Pull Request Process
1. Create a branch from `main` using the naming convention
2. Implement changes with appropriate tests
3. Ensure all tests pass and code meets quality standards
4. Submit a pull request with a clear description
5. Request review from at least one team member
6. Address reviewer feedback
7. Squash and merge when approved

## Testing Strategy

### Unit Testing
- Test individual functions and components
- Use Vitest as the test runner
- Aim for at least 70% code coverage
- Mock external dependencies

### Integration Testing
- Test component interactions
- Focus on critical user flows
- Use Testing Library for component testing
- Ensure state management works correctly

### End-to-End Testing
- Test complete user journeys
- Use Playwright for browser automation
- Cover all major user flows
- Run E2E tests before each release

### Performance Testing
- Monitor load times for critical pages
- Test with variable network conditions
- Ensure responsive behavior across devices
- Review Lighthouse performance scores

## Documentation Standards

### Code Documentation
- Add JSDoc comments to all functions and components
- Document parameters, return values, and exceptions
- Include usage examples for complex utilities
- Keep documentation up-to-date with code changes

### Architecture Documentation
- Maintain high-level architecture diagrams
- Document system components and their interactions
- Keep API documentation synchronized with implementation
- Update technical decisions and rationales

### User-Facing Documentation
- Provide clear guidance for platform features
- Include screenshots and video demonstrations
- Organize content by user role and use case
- Review and update documentation before releases

## Deployment Process

### Environments
- **Development**: For active development work
- **Staging**: For testing before production
- **Production**: Live environment for end users

### Deployment Workflow
1. Automated tests run on pull request
2. Changes are merged to main branch
3. CI/CD pipeline builds the application
4. Deployment to staging environment
5. QA verification in staging
6. Promotion to production
7. Post-deployment verification

### Rollback Procedure
1. Identify the issue in production
2. Revert to the last known good deployment
3. Verify functionality after rollback
4. Create bug fix for the issue
5. Follow standard deployment process for the fix

## Security Practices

### Code Security
- Regular dependency scanning for vulnerabilities
- Static code analysis for security issues
- Code review with security focus
- No secrets in code repositories

### Data Security
- Input validation for all user data
- Parameterized queries to prevent SQL injection
- Proper error handling without leaking information
- Encryption for sensitive data

### Authentication & Authorization
- Secure password policies
- Proper session management
- Principle of least privilege
- Regular permission audits

### Security Testing
- Regular vulnerability scanning
- Penetration testing before major releases
- Security-focused code reviews
- Compliance verification with security standards
