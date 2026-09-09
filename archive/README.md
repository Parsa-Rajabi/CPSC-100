# Archive

Retired course material from previous CPSC 100 offerings.

This directory sits **outside `docs/`**, which is the GitHub Pages publishing root. Nothing
here is served to students, and nothing here is reachable from `docs/_sidebar.md` or
`docs/_navbar.md`. It is kept in the repository as reference when building a new term.

Do not link to these files from anything under `docs/` — docsify resolves relative links
against the site root, so the link would 404 for students.

## Practice Problems (`practice/`)

A self-contained interactive practice-problem site, retired from `docs/` in September 2026.
It is a static bundle of roughly 600 files (~95 MB) including its own CSS, JS, fonts, Snap!
assets, and an `exercises/` set, served from `practice/index.html`.

It was previously linked from the sidebar, the quizzes page, and the syllabus, described as
"practice problems from previous offerings". It was retired because the material predates the
Fall 2026 assessment structure, so it no longer matches what the quizzes actually ask for.

To bring it back, move the directory into `docs/` and restore the links in `docs/_sidebar.md`,
`docs/quizzes.md`, and `docs/syllabus.md`.

## 2024W2 (Winter 2024, Term 2)

Section 201. Lectures Monday/Wednesday/Friday 3-4pm in DMP 310; five lab sections
(L2A-L2E) Wednesdays in ICCS X050.

| File                       | What it was                                                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `2024w2/project.md`        | "Exploring the Impact of Computing on Relationships" infographic project: M0 group contract, M1 proposal, M2 data inquiry, M3 infographic |
| `2024w2/midterm.md`        | Midterm logistics (Fri Feb 14, CHBE 101) and the Week 1-5 topic list                                            |
| `2024w2/final.md`          | Final exam logistics and the Week 1-13 topic list                                                              |

Assessment structure that term: Clickers 2%, Labs 10%, Post-class Quizzes 13%,
Midterm 20%, Final Project 25%, Final Exam 30%.

### Why these were retired

All three pages carried term-specific content that would be wrong if left published:
fixed 2024W2 exam dates and rooms, and week-by-week topic lists tied to that term's
schedule. The project spec was retired so the Fall 2026 project could be designed fresh.

Reusable material worth pulling forward: the infographic project's milestone structure
and its writing/infographic resource links, and the general shape of the exam topic
lists (learning-goal bullets grouped by week).
