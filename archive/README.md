# Archive

Retired course material from previous CPSC 100 offerings.

This directory sits **outside `docs/`**, which is the GitHub Pages publishing root. Nothing
here is served to students, and nothing here is reachable from `docs/_sidebar.md` or
`docs/_navbar.md`. It is kept in the repository as reference when building a new term.

Do not link to these files from anything under `docs/` — docsify resolves relative links
against the site root, so the link would 404 for students.

## Pending return (`pending/`)

Unlike the rest of this directory, `pending/` holds material that was pulled from the site
temporarily and is **expected to go back**, not retired.

| File | Why it is parked |
| ---- | ---------------- |
| `pending/project-academic-integrity.md` | The project page's fabrication and AI section. Reinstate once the AI policy is finalised. |

## Fall 2026 project detail pages

`project-1.md` and `project-2.md` were pulled from `docs/` in September 2026 and replaced by a
single high-level [`docs/project.md`](../docs/project.md), because the part-by-part
specifications were still changing and should not have been published in draft.

| File | What it was |
| ---- | ----------- |
| `project-1.md` | "Signal or Noise?" - Part A digital footprint, Part B AI detector experiment, Part C algorithmic bias case study. Included per-part weights (20/50/30), a time budget, the Part C report template, and the tool starter list. |
| `project-2.md` | "From Blocks to Code" - Part A Snap! program and annotations, Part B Snap!-to-Python translation, Part C viva voce. |

Worth pulling forward when the specs settle: the Part C report template and the AI-detection
tool starter list in `project-1.md`, both of which are hard to reconstruct.

Note that Project 1's final part is now a **video presentation** and Project 2's is a **live
viva voce**, which the archived pages do not reflect.

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
