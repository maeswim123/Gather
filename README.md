# Gather

Gather is a mobile-first community event prototype for discovering local experiences, meeting new people, and exploring Chicago without overthinking it.

**[View the live prototype](https://gather-sable-seven.vercel.app)**

## What it demonstrates

- Multi-step onboarding for interests, availability, community preferences, and social comfort
- Curated event discovery with time, category, and community filters
- Event detail, saved event, group, and chat flows
- Profile, preference, attendance, and reward interfaces
- Responsive mobile-first design with reusable React patterns

## Technology

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS
- Bun
- Vercel
- Git and GitHub
- AI-assisted development with Codex and Claude Code

## Current scope

Gather is an interactive product prototype. The user flows and interface are functional, while event, profile, attendance, and chat data are currently seeded in the client. Production authentication, persistent data, real-time messaging, and payment processing are not yet connected.

That distinction is intentional: this version tests the product experience and core interaction model before backend implementation.

## Product flows

The prototype includes:

- Account creation and multi-step onboarding
- Personalized event suggestions and filters
- Event groups and simulated group chat
- Saved events
- Community and preference controls
- Attendance feedback and a reward concept

## Run locally

```bash
bun install
bun run dev
```

Then open [http://localhost:3000](http://localhost:3000).

The standard npm workflow also works:

```bash
npm install
npm run dev
```

## Project structure

```text
app/
  onboarding/    Multi-step onboarding experience
  suggestions/   Event discovery and filtering
  group/         Event detail and join flow
  groups/        Joined groups
  chat/          Group chat and post-event feedback
  saved/         Saved events
  profile/       Preferences, history, and rewards
  reflect/       Reflection flow
```

## AI-assisted development

Codex and Claude Code were used to accelerate interface development, debugging, and iteration. Product decisions, user flows, and final implementation were reviewed and directed by the project team.

## Collaboration

Gather was built collaboratively. The commit history reflects contributions from Mae Moore and Elena Sofia Alick.

## Next steps

- Add authentication and persistent user profiles
- Connect event and preference data to a database
- Add real-time group messaging
- Add automated tests and continuous integration
- Validate the experience through user testing
