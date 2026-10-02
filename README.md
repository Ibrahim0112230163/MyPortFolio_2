# MyPortFolio_2

A dark, minimal one-page portfolio for **Ibrahim Khalil**, built with **Next.js (App Router), TypeScript, Tailwind CSS v4 and GSAP**. The styling is inspired by the *Selfer* personal-portfolio template: a dark theme, a black-and-white portrait, numbered sections, a services grid, a resume timeline, a filterable portfolio and a contact section.

## Quick start

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm run start
```

## Editing content

All content comes from [`data/portfolio.json`](data/portfolio.json). Components contain only layout and behavior.

| Change                         | Edit                                           |
| ------------------------------ | ---------------------------------------------- |
| Name, roles, intro             | `personal`, `hero` (`hero.roles` drives the typing effect) |
| About text, info rows, stats   | `about`                                        |
| "What I Do" cards              | `services`                                     |
| Skills                         | `skills.categories`                            |
| Education / research timeline  | `resume.columns` (add a column for experience) |
| Projects                       | `projects` (add `links.github` / `links.demo` / `image`) |
| Section titles and numbers     | `sections`                                     |
| Social links, email            | `social`, `personal.email`                     |
| Photo / CV                     | `personal.avatar`, `personal.cv`; files live in `public/` |

Icons are referenced by name. See [`components/Icon.tsx`](components/Icon.tsx). Set `site.url` (or `NEXT_PUBLIC_SITE_URL`) to the deployed URL so social previews resolve.

## Notes

- `public/images/profile-bw.jpg` is a black-and-white conversion of the original photo.
- Animations respect `prefers-reduced-motion`.
- The contact form has no backend. It opens the visitor's email client with the message pre-filled.
