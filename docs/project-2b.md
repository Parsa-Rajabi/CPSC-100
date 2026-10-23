# Project 2B: Vibe Coding

> [!NOTE]
> This is the first release of the Part B instructions. The teaching team is still reviewing them,
> and some parts, including the rubric, may change before Lab 8. The final version will be ready
> by the day of Lab 8, and we aim to finish sooner. We do not expect large changes. Every change
> will be listed in the changelog. We will remove this note when this page is final.

<details class="changelog">
<summary>Changelog</summary>

<!-- Add a dated entry every time this page changes. Newest first. -->

| Date | Update |
| :--: | :----- |
| Oct 22 | Added the Part B instructions, Pre-lab 8 and the rubric. |

</details>

## Overview

Part B is where your group uses Microsoft Copilot to build a small web app for a real person, tests
it, and shows that it works for that person.

The goal is an app that does what its user needs, and the evidence that it works: a design
document, your tests, and the full record of how you built it.

- Part B is group work, worth 4% of your course grade
- It starts with [Pre-lab 8](#pre-lab-8-your-ideas-sketches-and-proposal), your group's proposal
- [Lab 8](labs.md) gives you time to work on it
- Your app is one .html file that runs in a web browser. It must not save any data
- Both deadlines are in [What you hand in](project-2.md#what-you-hand-in) on the Project 2 page

Vibe coding means building software by describing what you want to an AI tool, then improving what
it produces, instead of writing every line yourself. The term was coined in February 2025 by
[Andrej Karpathy](https://x.com/karpathy/status/1886192184808149383), a computer scientist and a
co-founder of OpenAI.

Vibe coding is a skill of its own. You describe what you want clearly, check what the AI produces,
and notice when it is wrong. You can use this skill with any AI tool, in any field.

Your app is written in HTML and JavaScript, the code that runs websites. You do not need to learn
these languages, and there are no quiz questions on them. [HTML and JavaScript](html-and-javascript.md)
explains what they are, and how to open and run your app.

You are responsible for any code you submit, including code an AI tool wrote. Generated code often
looks finished and still does not work, so you must check it yourself.

### Before you start <!-- {docsify-ignore} -->

Before reading the instructions for this part of the project, review the [rubric](#grading-criteria),
especially the A+ / Exceeds Expectations category.

As a group, discuss which grade bracket you are aiming for and what it will take to get there. Be
realistic about everyone's availability and willingness to put in the work. Do not overpromise and
underdeliver to each other. Agree on expectations that everyone understands and can commit to.

To reach the A+ / Exceeds Expectations category, your submission must meet all of the
expectations and demonstrate the additional depth and attention to detail described in the rubric.
Plan for these expectations from the beginning. They are difficult to address well as last-minute
additions.

These criteria have been chosen deliberately, and TAs will look for clear evidence of them in your
work.

### What you will do <!-- {docsify-ignore} -->

1. Sketch at least three ideas, choose one, and hand in your ideas, sketches and proposal as
   Pre-lab 8
2. Write your design requirements document before you prompt Copilot
3. Build the app with Copilot, one feature at a time, working from your design document
4. Test every feature, record what you find, and fix what fails
5. Keep every AI conversation, and export them all as one PDF
6. Hand in your four files on Canvas, as one submission for your group

### Where you have a choice <!-- {docsify-ignore} -->

- What your app does, and who it is for, within the theme Data and society
- Which three or more course concepts it uses
- How you test it, as long as every feature has at least one test
- How you divide the work. Divide it by feature, not by file, so that every member prompts, tests
  and can explain part of the app. In the viva voce, every member will need to explain all of it

---

## Submission

- Hand in four files on [Canvas](https://canvas.ubc.ca/courses/190791/assignments), together in
  one submission to Project 2B
- One member submits for the group
- Each file has the file name shown in the table below. For example, group 3 in L1A names its
  design document `CPSC100-2B-Design-L1A-3.pdf`
- Pre-lab 8 is a separate submission. See [Pre-lab 8](#pre-lab-8-your-ideas-sketches-and-proposal)

The four files:

| File | File name | What it contains |
| :--- | :-------- | :--------------- |
| Design requirements document, a PDF of 1 to 2 pages | `CPSC100-2B-Design-[Section]-[GroupNumber].pdf` | The six sections in [Design requirements document](#design-requirements-document), updated to match your final app |
| Your app, one .html file | `CPSC100-2B-App-[Section]-[GroupNumber].html` | The final version. It must open and run in a web browser, with nothing else to install. It must not save any data |
| Testing report, a PDF of 2 to 4 pages, plus an appendix | `CPSC100-2B-Testing-[Section]-[GroupNumber].pdf` | Your AI use statement, at the top<br>How you decided what to test, and why<br>Your test table, with every test linked to a feature<br>Where anyone changed the code without Copilot<br>An appendix with one labelled screenshot for each test. The appendix does not count toward the page limit |
| AI transcripts, one PDF | `CPSC100-2B-Transcripts-[Section]-[GroupNumber].pdf` | Every AI conversation your group used to build the app, in Copilot or any other AI tool, in order, from the first prompt to the final code |

---

## AI disclosure

Part B requires AI for the code. Copilot is the approved tool for building the app, and your
transcripts are the record of every AI tool you used.

Your design document and testing report are different:

- The user, the features, the tests and the explanations must be your group's own thinking
- You may use AI to check your wording
- You may not use AI to decide what to test, or to write your analysis

At the top of your testing report, write a short AI use statement. It must say:

- which AI tools you used, apart from Copilot
- which part of Part B you used each one for
- what was entirely your group's own work

If you used no AI tools apart from Copilot, say so.

---

## Late policy

- Late work is not accepted on the project. Nothing submitted after a deadline is marked
- If you cannot finish in time, submit what you have. An incomplete submission earns some marks. A
  missing one earns none
- If something serious or ongoing is happening, use the
  [academic concession](syllabus.md#academic-concessions) process. Tell us early, not afterwards
- Pre-lab 8 has a different late penalty. It is under
  [Pre-lab 8](#pre-lab-8-your-ideas-sketches-and-proposal)

---

## Details

### The app and its course concepts <!-- {docsify-ignore} -->

You build a single-file web app: one .html file that opens and runs in a browser. What HTML and
JavaScript are, and how to run your file, is on [HTML and JavaScript](html-and-javascript.md).

> [!WARNING]
> For this course, your app must not save any data. It cannot use a database, an online service or
> the browser's storage to keep data. Everything the user enters is deleted when the page is
> refreshed or closed. When you prompt Copilot, say that the app must not save any data.

Your app must fit the theme Data and society:

- Data is central to what your app does: it collects, sorts, compares or presents data while the
  page is open
- Your app aims to have a positive effect on people or society
- Your app is useful to a real person

Some areas you can work in:

- Health and wellbeing
- Learning and education
- Environment and sustainability
- Community, accessibility and inclusion
- Money and everyday decisions
- Privacy and personal data

These are areas, not project ideas. Your group chooses its own idea.

Your group is responsible for making sure your project is appropriate for coursework at a
university. Creativity is encouraged, but the teaching team will not allow projects that it
considers extreme or inappropriate. If you are not sure, ask your TA before you hand in Pre-lab 8.

You do not need to write HTML or JavaScript yourself. Your job is to guide Copilot clearly and to
check what it produces.

Your app must use at least three course concepts. For example:

| Course concept | What it could look like in your app |
| :------------- | :---------------------------------- |
| Data representation and storage | How your app structures the user's data while the page is open |
| Privacy and consent | What data you collect, and whether the user knows and agrees |
| Algorithms and decision systems | Logic that makes choices, such as sorting, filtering or scoring |
| Recommender systems | Suggesting something based on what the user enters |
| Algorithmic bias and responsible use | Who your app might treat unfairly, or exclude |

### Pre-lab 8: your ideas, sketches and proposal <!-- {docsify-ignore} -->

Agree on your app before Lab 8, so your group can spend the lab building it.

> [!NOTE]
> Pre-lab 8 is a group submission, unlike the other pre-labs. One member hands in one PDF for the
> whole group, and it counts as Pre-lab 8 for every member.

- Hand in Pre-lab 8 on [Canvas](https://canvas.ubc.ca/courses/190791/assignments)

The PDF contains:

1. At least three different ideas for your app. These are raw ideas, so they do not need to be
   polished. For each idea:
   - one or two sentences: who it is for, and how it uses data
   - a rough sketch of its main screen: what the user sees, and what they can click or type. A
     photo of a drawing on paper is fine
2. Your proposal for the idea you chose, about one page. It covers:
   - which idea you chose, and why
   - who your user is
   - what problem your app solves for them
   - how your app uses data, and how it could benefit people or society
   - the features you plan, numbered F1, F2 and so on: at least one feature for each group member
   - the three or more course concepts it will use

Keep your sketches. Comparing your sketch with your final app is one of the Exceeds Expectations
items for the [design requirements document](#_1-design-requirements-document-30-points).

Your TA reads it before Lab 8. Your TA then gives your group feedback in the lab, before you start
building.

Pre-lab 8 is different from the other pre-labs:

- It is handed in on Canvas, not PrairieLearn
- It is part of your Lab 8 grade, not your project grade
- It is due the week before Lab 8, not when your section starts
- Because it is not due at the start of a lab, the course's default
  [late penalty](syllabus.md#late-deliverables) applies to it. The pre-lab deductions on the
  [Labs](labs.md#the-pre-lab) page do not

The late penalty for Pre-lab 8:

| Handed in | Penalty |
| :-------- | :------------ |
| By Thu Nov 12, 11:59pm | Nothing |
| Up to 24 hours late, by Fri Nov 13, 11:59pm | 25% of your Pre-lab 8 mark |
| More than 24 hours late | Not accepted, and it scores 0 |

### Design requirements document <!-- {docsify-ignore} -->

Write it before you prompt Copilot. Start from your proposal and your TA's feedback. It is 1 to 2
pages, with six sections in this order:

1. User. Who your user is, and what problem your app solves for them.
2. Features. What the app must do, numbered F1, F2 and so on. List at least one feature for each
   group member: 4 for a group of 4, 5 for a group of 5. Write each one so that it can be tested,
   for example "F1: The user can add a meal by typing its name and calories."
3. Interactions. What happens when the user clicks each button or enters data.
4. Course concepts. Which three or more concepts your app uses, and which features use them.
5. Risks. What could confuse the user or fail, such as empty input, unclear labels or a privacy
   concern.
6. Design change log. What changed while you were building, and why.

A feature is one thing the user can do in your app, and see the result of. For example, the user
enters something, sees a result, or changes a setting. Each feature has its own number and at least
one test.

Use the document to guide your prompts, and later to decide what to test. When your design
changes, update the document. Record the change and its reason in the design change log.

### Working with Copilot <!-- {docsify-ignore} -->

Use Microsoft Copilot, signed in with your UBC student account. That way, your conversations are
covered by UBC's data protection. UBC IT's
[Microsoft Copilot at UBC](https://it.ubc.ca/services/artificial-intelligence/microsoft-copilot-ubc)
page explains how to sign in.

Microsoft Copilot is the only AI tool that is fully approved for this course. You may also use
other AI tools or models, but you do not need to. UBC has privacy concerns about AI tools from
outside UBC, so if you use one, you are responsible for any privacy risk.

Whatever AI tools you use, you must keep every prompt and conversation, and hand them in with your
transcripts.

How to prompt:

- Tell Copilot that the app must be one HTML file, and that it must not save any data
- Work from your design document
- Prompt for one feature or one fix at a time, and describe it the way your design document does.
  A prompt for the whole app at once gives you code that is hard to check and hard to explain
- Read what Copilot gives you before you use it
- Run the app after every change, so you know which change broke something

Keep every conversation, from the first prompt to your final code. This includes the conversations
on each member's account, and the conversations in any other AI tool you used. To make your
transcripts PDF:

1. Open each conversation and print the page to PDF
2. Combine all the PDFs into one file, in the order you had the conversations

If anyone in your group changes the code without Copilot, say where in your testing report.

> [!TIP]
> Use invented data when you build and test. Do not put your own or anyone else's real personal
> information into Copilot or into your app. The AI Policy asks you to
> [protect privacy](ai-policy.md#protect-privacy-and-course-material).

### Testing <!-- {docsify-ignore} -->

Decide what needs testing, and why, before you start. Begin with your design document:

- Every feature needs at least one test
- Your risks show you where the app is most likely to fail

For each test, record:

- what you tested, and why
- what you expected
- what actually happened

When a test fails, fix the problem, run the test again, and record the new result.

Take a screenshot of each test's result, and label it with the test number. The screenshots go in
an appendix at the end of your testing report.

Here is an example row for your test table:

| Test | Feature | What we tested and why | Expected | Actual | What we changed |
| :--: | :-----: | :--------------------- | :------- | :----- | :-------------- |
| T1 | F1 | Adding a meal with a blank name, since users may skip fields | An error message | The app accepted an empty entry | Asked Copilot to add input validation, then ran T1 again: passed |

Some ways to find bugs:

- Try empty, very large or unexpected input
- Click every button, including in an unexpected order
- Ask someone who has not seen the app to use it without help, and watch where they have trouble

### Putting your app online (optional) <!-- {docsify-ignore} -->

You may put your app on the internet, so that anyone with the link can open it. This is not
required, and it is not part of your grade. It can be a fun way to show your work to your friends
and family.

To start, visit one of your TAs' [drop-in hours](drop-in-hours.md).

---

## Grading criteria

Your Part B grade is based on four criteria, out of 100 points:

1. Design requirements document, 30 points. Marked from your design requirements document. We will
   evaluate whether it has all six sections, matches your final app, and describes features and
   risks you can test.
2. The app and its course concepts, 25 points. Marked from your app and your design requirements
   document. We will evaluate whether the app runs, does what your features list says, and uses at
   least three course concepts.
3. Testing, 30 points. Marked from your testing report. We will evaluate whether you tested every
   feature, recorded each result, and tested again what you fixed.
4. Working with Copilot, 15 points. Marked from your AI transcripts and testing report. We will
   evaluate whether your transcripts show the whole build, one feature or fix at a time, working
   from your design document.

How your TA marks each criterion:

- Your TA places it in one of the four bands described in
  [How this is graded](project-2.md#how-this-is-graded), using the bullets under
  [Grading scale](#grading-scale)
- If your work matches the descriptions of more than one band, your TA uses the lowest one that
  applies
- Your TA starts at that band's Starts at score, and subtracts points for small mistakes within the
  band. Your TA decides what counts as a small mistake
- Exceeds Expectations needs everything in Meets Expectations, plus every Exceeds Expectations item
  for that criterion

The design requirements document and testing are worth the most points, so plan the most time for
them.

Part B receives a group grade, and it is not multiplied by peer evaluation.

---

## Grading scale

### 1. Design requirements document (30 points) <!-- {docsify-ignore} -->

Exceeds Expectations (A+), starts at 30. Everything in Meets Expectations, plus all of these:

- At least 1.5 times as many features as group members: 6 for a group of 4, 8 for a group of 5
- Each risk names the feature it affects, by its number, and how the app should respond
- Each entry in the design change log names the test, by its number, or the AI conversation that
  led to the change
- Your design change log compares your Pre-lab 8 sketch of the idea you chose with your final app.
  It shows the sketch next to a screenshot of your final app's main screen, and explains what
  changed, why, and how each change improved the app for your user. The sketch and the screenshot
  can go on an extra page at the end, which does not count toward the page limit

Meets Expectations (A-, A), starts at 26.5. All of these:

- One to two pages, with all six sections
- The document matches your final app
- Your user and their problem are specific
- At least one feature for each group member: 4 for a group of 4, 5 for a group of 5
- Features are numbered, and each says what the app must do in a way that can be tested
- Interactions cover every button and input
- At least three course concepts, each linked to the features that use it
- Risks are specific to your app
- The design change log records each change and its reason, or says that nothing changed

Approaches Expectations (B- to B+), starts at 23.5. All six sections are there, but one or two are
missing something they ask for. Any of these:

- There are fewer features than group members
- Features are not numbered, or cannot be tested ("the app is easy to use")
- A concept is named without the features that use it
- The risks could apply to any app
- The change log lists changes without reasons

Not Within Expectations (C+ and below), starts at 20. Any of these:

- A section is missing
- There are fewer than three course concepts
- The document does not describe the app you submitted

### 2. The app and its course concepts (25 points) <!-- {docsify-ignore} -->

Exceeds Expectations (A+), starts at 25. Everything in Meets Expectations, plus this:

- For each course concept, you name the part of the code that uses it, such as a function or a
  variable, and explain in one or two sentences what that code does. Put this in the course
  concepts section of your design document

Meets Expectations (A-, A), starts at 22. All of these:

- One .html file that opens and runs in a web browser
- The app does everything in your features list, or your design change log explains why a feature
  changed or was dropped
- Each course concept in your design document can be seen in the app, in the features you linked
  it to

Approaches Expectations (B- to B+), starts at 19.5. The app runs, but any of these:

- A feature is missing or does not work, and the change log does not explain why
- A course concept in your document does not appear in the app

Not Within Expectations (C+ and below), starts at 16.5. Any of these:

- The app does not open or run
- Most features are missing
- Fewer than three course concepts appear in the app

### 3. Testing (30 points) <!-- {docsify-ignore} -->

Exceeds Expectations (A+), starts at 30. Everything in Meets Expectations, plus all of these:

- Every risk in your design document has its own test, as well as every feature
- At least one test is run with someone outside your group who uses the app without help. You
  record where they hesitated or made a mistake. If they had no trouble, you say so, and record what
  they did

Meets Expectations (A-, A), starts at 26.5. All of these:

- Your report explains how you decided what to test, and why
- Every feature has at least one test, linked by its number
- Each test records what you tested and why, what you expected, what happened and what you changed
- Every failed test you fixed was run again, and its new result is recorded
- The appendix has a labelled screenshot for each test
- The report is 2 to 4 pages, not counting the appendix

Approaches Expectations (B- to B+), starts at 23.5. The testing is incomplete. Any of these:

- A feature has no test
- Some rows are missing the expected or actual result
- Fixed failures were not run again
- Several tests have no screenshot

Not Within Expectations (C+ and below), starts at 20. Any of these:

- There is no test table
- Most features have no test
- There are no screenshots

### 4. Working with Copilot (15 points) <!-- {docsify-ignore} -->

Exceeds Expectations (A+), starts at 15. Everything in Meets Expectations, plus this:

- In your testing report, you describe at least two places where Copilot made a mistake. For
  each one, give the page of your transcripts where it happened, say how you noticed, and say what
  fixed it. If Copilot made fewer than two mistakes, describe each one. For each example
  still missing, describe a feature where Copilot's first answer worked, and give the transcript
  page and the test, by its number, that showed it was right

Meets Expectations (A-, A), starts at 13. All of these:

- One PDF with every AI conversation used to build the app, in Copilot or any other AI tool, in
  order, from the first prompt to the final code
- The prompts work from your design document, one feature or fix at a time
- Your testing report lists any code changed without Copilot
- Your testing report starts with your AI use statement

Approaches Expectations (B- to B+), starts at 11.5. Any of these:

- The transcripts are incomplete, such as a missing conversation
- The transcripts do not show how you reached the final code
- Most prompts ask for large parts of the app at once, without reference to your design
- The AI use statement is missing

Not Within Expectations (C+ and below), starts at 10. Any of these:

- There are no transcripts
- The transcripts do not end with the code of the app you submitted

---

## Regrading criteria

To ask for a regrade, follow the [remarking policy](syllabus.md#remarking-policy) in the Syllabus.
