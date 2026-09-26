# General Development Guidelines

## Workflow
- Prefer small, reviewable changes.
- Inspect the existing implementation before changing behavior.
- Do not modify unrelated files.
- Run targeted tests after changes.
- Do not bypass failing tests just to make CI pass.
- Prefer fixing root causes instead of hiding symptoms.

## Git
- Follow Conventional Commits when applicable.
- Keep commits focused on one logical change.
- Do not commit directly to `main` or `develop` unless explicitly requested.
- Reference GitHub issues and pull requests where applicable.
- Review `git diff` before committing.

## Code Quality
- Prefer existing abstractions before creating new ones.
- Avoid duplicated logic and duplicated configuration.
- Keep functions focused and reasonably small.
- Preserve backward compatibility unless behavior is intentionally being changed.
- Prefer explicit error handling over silent failures.

## Security
- Never commit passwords, API keys, tokens, certificates, or other secrets.
- Never log secrets or sensitive information.
- Validate external input at trust boundaries.
- Prefer least-privilege permissions.

## Logging
- Log errors with enough context to diagnose the problem.
- Avoid excessive debug logging in production code.
- Do not suppress errors without documenting why.

## Testing
- Update tests when intended behavior changes.
- Prefer behavioral tests over implementation-specific tests.
- Run the smallest relevant test set first.
- Do not regenerate snapshots or visual baselines unless the change is intentional.

## Documentation
- Update documentation when public behavior, configuration, setup, or architecture changes.
- Keep examples synchronized with the current implementation.

## Dependencies
- Prefer existing project dependencies before adding new ones.
- Justify new dependencies.
- Avoid unnecessary dependencies for trivial functionality.

---

# Project-Specific Instructions

<!--
Add instructions specific to this repository below.

Examples:
- Architecture overview
- Build commands
- Test commands
- Release process
- CI requirements
- Platform constraints
-->