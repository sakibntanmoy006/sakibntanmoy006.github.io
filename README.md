# Sakib Nawar Tanmoy — Portfolio & Blog

Personal portfolio and blog, designed as a clean editorial "magazine" — showcasing my work across data science, enterprise compliance (ISMS / AIMS), and software engineering.

**Live site:** [sakibntanmoy006.github.io](https://sakibntanmoy006.github.io)

## Design

- Editorial magazine layout: Fraunces display serif, Inter text, JetBrains Mono for data/metadata accents
- Dark & light mode with a persistent toggle
- Subtle interactive animations: typed terminal roles, stat counters, scroll reveals, magnetic buttons, 3D card tilt, digit-scramble section numbers, eased smooth scrolling
- Blog with English/Bengali toggle per post and syntax-highlighted code

## Structure

```
_config.yml        Jekyll configuration
_layouts/          default (shell + masthead + footer), blog, archive, post
_includes/icons/   inline SVG icons
index.html         homepage (all portfolio sections)
blog/              blog index, archive, posts (blog/_posts/*.md), post images
css/               magazine.css (theme), hover-icons.css, syntax.css
js/magazine.js     all interactions (vanilla JS, no frameworks)
images/, logos/    photos, project shots, company logos
domains/           custom-domain registration record
```

## Development

```bash
bundle install
bundle exec jekyll serve   # http://localhost:4000
```

To add a blog post, see `blog/HOW_TO_ADD_POST.md`.

## Stack

Jekyll · GitHub Pages · vanilla CSS/JS — no frameworks.
