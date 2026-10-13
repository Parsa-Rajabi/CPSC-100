# Project 2: From Blocks to Code

> [!NOTE]
> This page is not finished yet, but everything below is solid enough to plan around. Please read
> it now. A few things are still to come:
>
> - The viva voce format: how long each session is, how to book your slot, where it takes place,
>   and what you may bring
> - Rough time estimates for each part
>
> The rubrics for all three parts are posted: [Part A](#part-a-rubric), [Part B](#part-b-rubric)
> and [Part C](#part-c-rubric). Read [How this is graded](#how-this-is-graded) before you start
> Part B or Part C.
>
> The schedule below may still change. Anything that moves gets recorded in the changelog.

<details class="changelog">
<summary>Changelog</summary>

<!-- Add a dated entry every time this page changes. Newest first. -->

| Date | Update |
| :--: | :----- |
| Oct 13 | Added the Project 2 instructions, dates and rubrics. |

</details>

## Overview

Project 2 takes you from reading code to building with it, and then to explaining what you built.

- Part A. You fix a Python program that does not work, and explain each bug in course terms.
  Finding a bug and explaining it are separate skills, and Part A marks the explanation.
- Part B. Your group uses Microsoft Copilot to build a small web app for a real user. Then you
  test it, and show the evidence that it works.
- Part C. In the viva voce, your group demonstrates the app and answers our questions about the
  decisions behind it, in person.

One idea runs through all three parts. Code you hand in is code you take responsibility for, whether
you wrote it, fixed it or prompted an AI tool to write it. Each part asks you to show that you
understand what your code does and why.

| Part | What it is | Who does it | Weight | Due |
| :--: | :--------- | :---------- | :----: | :-- |
| A | Learning to communicate: debugging a Python program | Individual, in Lab 7 | 1% | The day after your Lab 7, Thu Nov 5 or Fri Nov 6, 11:59pm |
| B | Vibe coding: building a web app with Copilot | Group | 4% | Tue Nov 24, 11:59pm |
| C | Viva voce | Group, with an individual multiplier from [peer evaluation](#peer-evaluation) | 10% | Your session, between Wed Dec 2 and Fri Dec 4 |

Those weights are percentages of your final course grade, not shares of this project. Together
they come to 15%, and Project 1 is the other 15%. See
[Course Evaluation](syllabus.md#course-evaluation) for the full picture.

> [!WARNING]
> Part C is worth more than Parts A and B combined, and it cannot be prepared at the last minute.
> Every member must be able to explain every part of your app, so build that understanding while
> you build the app.

> [!ATTENTION]
> To pass this course you need at least 50% on the course project overall, counting Project 1 and
> Project 2 together. You must also attend and take part in the viva voce in person. The full list
> is in [Passing Criteria](syllabus.md#passing-criteria).

---

## What you hand in

Check each deadline on its assignment page in [Canvas](https://canvas.ubc.ca/courses/190791/assignments), which is also where
you hand in your work. The table lists every Project 2 deadline so you can plan. All times are
Pacific time.

| What you hand in | Who | Due | Where |
| :--------------- | :-- | :-- | :---- |
| Part A: your fixed Python notebook, with a comment at each fix | Individual | The day after your Lab 7: Thu Nov 5 (L1A to L1D) or Fri Nov 6 (L1E), 11:59pm | [Canvas](https://canvas.ubc.ca/courses/190791/assignments) |
| [Pre-lab 8](#pre-lab-8-your-proposal-and-sketch): your project idea proposal and sketch | Group | Thu Nov 12, 11:59pm | [Canvas](https://canvas.ubc.ca/courses/190791/assignments) |
| Part B: your design requirements document, your app as one .html file, your testing report, and your Copilot transcripts | Group | Tue Nov 24, 11:59pm | [Canvas](https://canvas.ubc.ca/courses/190791/assignments) |
| Part C: nothing to hand in. Your group presents its app in person | Group | Your session, between Wed Dec 2 and Fri Dec 4 | In person |
| [Stand-ups](#weekly-stand-ups) 5 to 9 | Individual | Every Friday from Nov 6 to Dec 4, 4:00pm | Ed Discussion |
| [Retrospective](#retrospective) 2 | Group | Thu Dec 3, 11:59pm | [Canvas](https://canvas.ubc.ca/courses/190791/assignments) |
| [iPeer 2](#peer-evaluation) | Individual | Thu Dec 3, 11:59pm | iPeer |

<!-- The Canvas links go to the course's Assignments page. Replace each one with its assignment's
own page once the Project 2A, Pre-lab 8, Project 2B and retrospective assignments exist. -->

---

## The flow

> [!NOTE]
> This schedule may still change. Lab dates, rooms and section times are on the
> [Labs](labs.md) page.

| Week | Lab | What happens | Due that week |
| :--: | :-: | :----------- | :------------ |
| 8 | Lab 6 | Project 2 begins. Debugging practice in Snap!, on a program we give everyone. | Project 1 deadlines. See [Project 1](project-1.md#the-flow) |
| 9 | Lab 7 | Part A runs in lab, start to finish. | Part A, the day after your lab<br>Stand-up 5, Fri Nov 6 |
| 10 | *no lab* | Midterm Break. Your group agrees on its app and writes its proposal. | Pre-lab 8, your proposal and sketch, Thu Nov 12<br>Stand-up 6, Fri Nov 13 |
| 11 | Lab 8 | Working with an AI coding assistant. Feedback on your proposal, then time to work on Part B. | Stand-up 7, Fri Nov 20 |
| 12 | Lab 9 | Work session to prepare for the viva voce. | Part B, Tue Nov 24<br>Stand-up 8, Fri Nov 27 |
| 13 | Lab 10 | Viva voce, held from Wed Dec 2 to Fri Dec 4. | Your viva voce<br>Retrospective and [iPeer 2](project-peer-evaluation.md), Thu Dec 3<br>Stand-up 9, Fri Dec 4 |

Three things to notice:

- Lab 6 is practice. The Snap! program builds the skill that Part A uses, and it is marked like
  any other lab, not as part of your project grade.
- Week 10 has no lab, but Pre-lab 8 is due that week. Part A fills Lab 7, so arrange a time for
  your group to meet before Pre-lab 8 is due.
- Part B is due the day before Lab 9. Lab 8 is your only lab for building the app, so most of Part
  B happens outside lab. Lab 9, and the project work day in lecture that week, are for preparing
  your viva voce.

---

## Part A: Learning to Communicate

Part A is individual work, worth 1%, and it runs in [Lab 7](labs.md). You fix the program during
the lab, and you hand it in on Canvas by your section's deadline in the table below.

Part A marks your explanations, not only your fixes. Each comment must say why the old code was
wrong, not only what you changed.

In Lab 6 you practise on a Snap! program that we give everyone. In Lab 7 you get your Part A
program: a Python program, in a Jupyter notebook, that does not work. Fix it, and explain every
bug you find.

If you get stuck, try [rubber duck debugging](https://en.wikipedia.org/wiki/Rubber_duck_debugging):
explain out loud, line by line, what each part of the program should do. When what you say and
what the code does are different, you have found a bug.

### What you will do <!-- {docsify-ignore} -->

1. Open your Part A notebook in Lab 7. It says what the program is meant to do
2. Run the program, and read its error messages and its output
3. Find and fix every bug you can, until the program does what the notebook says it should
4. Test it with values of your own, not only the ones in the program. Some bugs only show up with
   particular values
5. At each fix, add a comment that names the kind of error and explains what was wrong and why
   your fix works
6. Download your notebook as an .ipynb file, and hand it in on Canvas

<details>
<summary>Writing a comment for each fix</summary>

Each comment needs three things, in your own words:

1. The kind of error, using the terms from lecture in the table below
2. What was wrong
3. Why your fix works

| Kind of error | What you see |
| :------------ | :----------- |
| Syntax error | Python cannot read the code, so the program does not start at all |
| Runtime error | The program starts, then stops partway through with an error message |
| Logic error | The program runs to the end, but the result is wrong |

Put each comment directly above the line it explains. If one fix changes several lines, one comment
above the first of them is enough.

The difference between describing an edit and explaining a bug is easiest to see side by side.

Weaker:

```python
# fixed this line
total = 0
```

Stronger:

```python
# Logic error: total was set to 0 inside the loop, so it went back to 0 every time
# the loop ran and only kept the last price. Setting it once, before the loop, lets
# it add up every price.
total = 0
for price in prices:
    total = total + price
```

The first comment tells your TA that something changed. The second shows what the program was
doing, why that was wrong, and why the fix works.

> [!WARNING]
> Fix the bugs and leave the rest of the program as it is. Do not rewrite it from scratch: Part A
> is about explaining what was wrong with this code, and a new program has nothing to explain.

</details>

### What you need to hand in <!-- {docsify-ignore} -->

You hand in one file on [Canvas](https://canvas.ubc.ca/courses/190791/assignments), to Project 2A.

| File | What it contains |
| :--- | :--------------- |
| Your fixed notebook, downloaded as an .ipynb file | Your AI use line, as a comment at the top of the first cell. Then the fixed program, with a comment at each fix |

To download your notebook, open the File menu in Jupyter and choose Download. In some versions it
is Download as, then Notebook. Do this before you leave the lab, so you have a copy.

Hand it in by your section's deadline:

| Your lab | Lab 7 | Part A due |
| :------- | :---- | :--------- |
| Wednesday, L1A to L1D | Wed Nov 4 | Thu Nov 5, 11:59pm |
| Thursday, L1E | Thu Nov 5 | Fri Nov 6, 11:59pm |

All of it must be your own work, written by you.

### Using AI in Part A <!-- {docsify-ignore} -->

We strongly encourage you to fix the program and write your comments without AI. An AI tool can fix
this program in seconds. But Part A is practice at explaining code in your own words, and that
practice only works if the thinking is yours. Part B is where you build with AI.

Start your notebook with the one line below that is true for you, as a comment in the first cell.
Copy it as it is written.

| | Line to copy |
| :-: | :----------- |
| 🟢 | `# AI use: Green. I did not use AI to find, fix or explain the bugs.` |
| 🟡 | `# AI use: Yellow. I used AI to understand an error message or a Python feature, but I found and fixed the bugs myself, and every comment is in my own words.` |
| 🔴 | `# AI use: Red. AI found or fixed some of the bugs, or wrote some of my comments.` |

No colour costs marks on its own. Your work is graded on the [rubric](#part-a-rubric), whichever
line you choose, and choosing honestly is what the
[AI Policy](ai-policy.md#be-transparent-about-ai-use) asks of you.

### Where you have a choice <!-- {docsify-ignore} -->

- The order you fix the bugs in
- How you test your fixes
- How you word your comments, as long as each one names the kind of error and explains it

<details>
<summary>If you miss Lab 7</summary>

We will post the Part A notebook after the lab, so you can do Part A on your own. You will lose the
lab mark for that week, but Part A is still open to you.

Your deadline does not change: hand in your notebook on Canvas by your section's deadline in the
table under What you need to hand in.

</details>

### Part A rubric <!-- {docsify-ignore} -->

Part A is graded as one criterion. Your TA runs your notebook and reads every comment.

| Criterion | Complete (1) | Partial (0.5) | Incomplete or absent (0) |
| :-- | :-- | :-- | :-- |
| Your fixed program and your comments | The program runs from start to finish and does what the notebook says it should, including for values your TA tries. Every fix has a comment that names the kind of error and explains, in your own words, what was wrong and why the fix works. | The notebook is handed in, but it falls short. For example, the program still stops with an error or gives a wrong result, a fix has no comment, or a comment only says that something changed, such as "fixed this line". | No notebook is handed in, or none of the fixes has a comment. |

<!-- TODO: instructor decision required. Whether a student who fixes every bug except the one that
only shows up at a boundary value (the grade calculator's exactly-90 case) is Complete or Partial.
As written, "including for values your TA tries" makes it Partial. -->

---

## Part B: Vibe Coding

Part B is group work, worth 4%. It starts with Pre-lab 8, your group's proposal.
[Lab 8](labs.md) gives you time to work on it. Both deadlines are in
[What you hand in](#what-you-hand-in).

Vibe coding means building software by describing what you want to an AI tool and refining what it
gives back, instead of writing every line yourself.

AI coding assistants are now used this way in research labs and in industry. They still need
someone who knows what the program must do, who can guide them one step at a time, and who can
tell when the result is wrong. That takes the programming concepts you have learned in this
course.

Anything you submit under your name, in this course or anywhere else, is work you take
responsibility for. That includes code an AI tool generated. Generated code often looks finished and
still does not work, so you have to check it yourself.

In Part B your group uses Microsoft Copilot to build a small web app. Then you test it and show
that it works for the person it is for.

### Before you start <!-- {docsify-ignore} -->

Before reading the instructions for this part of the project, review the [rubric](#part-b-rubric),
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

1. Choose your user and your app idea, and hand in your proposal and sketch as Pre-lab 8
2. Write your design requirements document before you prompt Copilot
3. Build the app with Copilot, one feature at a time, working from your design document
4. Test every feature, record what you find, and fix what fails
5. Keep every Copilot conversation, and export them all as one PDF
6. Hand in your four files on Canvas, as one submission for your group

<details>
<summary>What you will build</summary>

You build a single-file web app: one .html file that opens and runs in a browser. Choose something
useful to a real person. Some ideas are a study planner, a meal tracker, a budget helper, a habit
tracker, or a recommender such as "what should I cook tonight". Original ideas are welcome.

You do not need to write HTML or JavaScript yourself. Your job is to guide Copilot clearly and to
check what it produces.

Your app must use at least three course concepts. For example:

| Course concept | What it could look like in your app |
| :------------- | :---------------------------------- |
| Data representation and storage | How your app stores and structures the user's data |
| Privacy and consent | What data you collect, and whether the user knows and agrees |
| Algorithms and decision systems | Logic that makes choices, such as sorting, filtering or scoring |
| Recommender systems | Suggesting something based on what the user enters |
| Algorithmic bias and responsible use | Who your app might treat unfairly, or leave out |

</details>

### Pre-lab 8: your proposal and sketch <!-- {docsify-ignore} -->

Agree on your app before Lab 8, so your group can spend the lab building it. Your proposal and
sketch are Pre-lab 8, handed in on [Canvas](https://canvas.ubc.ca/courses/190791/assignments).

One member submits one PDF for the group. It contains:

- Your proposal, about one page, covering:
  - who your user is
  - what problem your app solves for them
  - the main features you plan
  - the three or more course concepts it will use
- A sketch of your app's main screen: what the user sees, and what they can click or type. A photo
  of a drawing on paper is fine

Your TA reads it before Lab 8 and gives your group feedback in the lab, before you start building.

Pre-lab 8 is different from the other pre-labs:

- It is handed in on Canvas, not PrairieLearn
- It is one submission for the whole group, and it counts as Pre-lab 8 for every member. It is part
  of your Lab 8 grade, not your project grade
- It is due the week before Lab 8, not when your section starts. Because it is off the lab
  schedule, the course's default [late penalty](syllabus.md#late-deliverables) applies instead of
  the pre-lab deductions on the [Labs](labs.md#the-pre-lab) page

The late penalty for Pre-lab 8:

| Handed in | What it costs |
| :-------- | :------------ |
| By Thu Nov 12, 11:59pm | Nothing |
| Up to 24 hours late, by Fri Nov 13, 11:59pm | 25% of your Pre-lab 8 mark |
| More than 24 hours late | Not accepted, and it scores 0 |

<!-- TODO: instructor decision required. Pre-lab 8 details chosen while drafting, from "Pre-lab 8 =>
Project Idea Proposal + Sketch, due on Thursday, Nov 12 via Canvas":
  1. One submission per group, credited to every member. The other pre-labs are individual.
  2. Due at 11:59pm, the course default.
  3. TA feedback in Lab 8. -->

<details>
<summary>Your design requirements document</summary>

Write it before you prompt Copilot, starting from your proposal and your TA's feedback. It is 1 to
2 pages, with six sections:

1. User. Who your user is, and what problem your app solves for them.
2. Features. What the app must do, numbered F1, F2 and so on. Write each one so that it can be
   tested, for example "F1: The user can add a meal by typing its name and calories."
3. Interactions. What happens when the user clicks each button or enters data.
4. Course concepts. Which three or more concepts your app uses, and which features use them.
5. Risks. What could confuse the user or go wrong, such as empty input, unclear labels or a privacy
   concern.
6. Design change log. What changed while you were building, and why.

Use the document to guide your prompts, and later to decide what to test. When your design
changes, update the document and record the change and its reason in the design change log.

</details>

<details>
<summary>Building with Copilot</summary>

Use Microsoft Copilot, signed in with your UBC student account, so your conversations are covered
by UBC's data protection. UBC IT's
[Microsoft Copilot at UBC](https://it.ubc.ca/services/artificial-intelligence/microsoft-copilot-ubc)
page explains how to sign in.

Work from your design document. Prompt for one feature or one fix at a time, and describe it the
way your design document does. A prompt for the whole app at once gives you code that is hard to
check and hard to explain.

Read what Copilot gives you before you use it, and run the app after every change. That way you
know which change broke something.

Keep every conversation, from the first prompt to your final code, including the ones on each
member's account. To make your transcripts PDF:

1. Open each conversation and print the page to PDF
2. Combine all the PDFs into one file, in the order you had the conversations

If anyone in your group edits the code by hand, write down where in your testing report.

> [!TIP]
> Use made-up data when you build and test. Do not put your own or anyone else's real personal
> information into Copilot or into your app. The AI Policy asks you to
> [protect privacy](ai-policy.md#protect-privacy-and-course-material).

</details>

<details>
<summary>Testing your app</summary>

Decide what needs testing, and why, before you start. Begin with your design document: every
feature needs at least one test, and your risks tell you where the app is most likely to fail.

For each test, record what you tested and why, what you expected, and what actually happened. When
a test fails, fix the problem, run the test again, and record the new result.

Take a screenshot of each test's result and label it with the test number. The screenshots go in
an appendix at the end of your testing report.

Here is an example row for your test table:

| Test | Feature | What we tested and why | Expected | Actual | What we changed |
| :--: | :-----: | :--------------------- | :------- | :----- | :-------------- |
| T1 | F1 | Adding a meal with a blank name, since users may skip fields | An error message | The app saved an empty entry | Asked Copilot to add input validation, then ran T1 again: passed |

Some ways to find bugs:

- Try empty, very large or unexpected input
- Click every button, including in an unexpected order
- Ask someone who has not seen the app to use it without help, and watch where they get stuck

</details>

### What you need to hand in <!-- {docsify-ignore} -->

You hand in four files on [Canvas](https://canvas.ubc.ca/courses/190791/assignments), together in one submission to
Project 2B. One member submits for the group.

| File | What it contains |
| :--- | :--------------- |
| Design requirements document, a PDF of 1 to 2 pages | The six sections above, updated to match your final app |
| Your app, one .html file | The final version. It must open and run in a web browser, with nothing else to install |
| Testing report, a PDF of 2 to 4 pages, plus an appendix | Your AI use statement, at the top<br>How you decided what to test, and why<br>Your test table, with every test linked to a feature<br>Where anyone edited the code by hand<br>An appendix with one labelled screenshot for each test. The appendix does not count toward the page limit |
| Copilot transcripts, one PDF | Every Copilot conversation your group used to build the app, in order, from the first prompt to the final code |

### Using AI in Part B <!-- {docsify-ignore} -->

Part B requires AI for the code. Copilot builds the app, and your transcripts are the record of
that use.

Your design document and testing report are different. The user, the features, the tests and the
explanations must be your group's own thinking. You may use AI to check your wording, but not to
decide what to test or to write your analysis.

At the top of your testing report, write a short AI use statement. Say which AI tools you used
apart from Copilot, for which part of Part B, and what was entirely your group's own work. If you
used none, say so.

### Where you have a choice <!-- {docsify-ignore} -->

- What your app does, and who it is for
- Which three or more course concepts it uses
- How you test it, as long as every feature has at least one test
- How you divide the work. Split it by feature rather than by file, so that every member prompts,
  tests and can explain part of the app. In the viva voce you will all need to explain all of it

### Going further in Part B <!-- {docsify-ignore} -->

To reach the A+ / Exceeds Expectations category on a criterion, do everything it asks for at
Meets Expectations, plus every item listed for it below.

| Criterion | To reach Exceeds Expectations, also do this |
| :-- | :-- |
| Design requirements document | Each risk names the feature it affects, by its number, and how the app should respond. Each entry in the design change log names the test, by its number, or the Copilot conversation that led to the change. |
| The app and its course concepts | For each course concept, name the part of the code that carries it, such as a function or a variable, and explain in one or two sentences what that code does. Put this in the course concepts section of your design document. |
| Testing | Give every risk in your design document its own test, as well as every feature. Run at least one test with someone outside your group who uses the app without help, and record where they hesitated or went wrong. If they had no trouble, say so, and record what they did. |
| Working with Copilot | In your testing report, describe at least two places where Copilot got something wrong. For each one, give the page of your transcripts where it happened, say how you noticed, and say what fixed it. If Copilot got fewer than two things wrong, describe each one it did, and make up the rest with a feature where its first answer worked: give the transcript page and the test, by its number, that showed it was right. |

### Part B rubric <!-- {docsify-ignore} -->

Use this rubric to check your work before you submit. Part B is out of 100 points across four
criteria. Your TA places each criterion in one of the four bands described in
[How this is graded](#how-this-is-graded), starts at the top of that band, and takes points off for
mistakes within it. Testing is worth the most points, so plan the most time for it. The Exceeds
Expectations row of each table summarizes that criterion's [Going further](#going-further-in-part-b)
items.

| Criterion | Points |
| :-- | :--: |
| 1. Design requirements document | 20 |
| 2. The app and its course concepts | 20 |
| 3. Testing | 35 |
| 4. Working with Copilot | 25 |
| Total | 100 |

#### 1. Design requirements document (20 points)

| Band | Starts at | What your work shows |
| :-- | :--: | :-- |
| Exceeds Expectations (A+) | 20 | Everything in Meets Expectations, plus every risk tied to a numbered feature and the app's response, and every change log entry tied to a test or a Copilot conversation. |
| Meets Expectations (A-, A) | 17.5 | One to two pages with all six sections, matching your final app. Your user and their problem are specific. Features are numbered, and each says what the app must do in a way that can be tested. Interactions cover every button and input. At least three course concepts, each linked to the features that use it. Risks are specific to your app. The design change log records each change and its reason, or says that nothing changed. |
| Approaches Expectations (B- to B+) | 15.5 | All six sections are there, but one or two are missing something they ask for. For example, features are not numbered or cannot be tested ("the app is easy to use"), a concept is named without the features that use it, the risks would fit any app, or the change log lists changes without reasons. |
| Not Within Expectations (C+ and below) | 13 | A section is missing, there are fewer than three course concepts, or the document does not describe the app you submitted. |

#### 2. The app and its course concepts (20 points)

| Band | Starts at | What your work shows |
| :-- | :--: | :-- |
| Exceeds Expectations (A+) | 20 | Everything in Meets Expectations, plus, for each course concept, the code that carries it named and explained. |
| Meets Expectations (A-, A) | 17.5 | One .html file that opens and runs in a web browser. It does everything in your features list, or your design change log explains why a feature changed or was dropped. Each course concept in your design document can be seen in the app, in the features you linked it to. |
| Approaches Expectations (B- to B+) | 15.5 | The app runs, but a feature is missing or does not work and the change log does not explain why, or a course concept in your document does not appear in the app. |
| Not Within Expectations (C+ and below) | 13 | The app does not open or run, most features are missing, or fewer than three course concepts appear in it. |

#### 3. Testing (35 points)

| Band | Starts at | What your work shows |
| :-- | :--: | :-- |
| Exceeds Expectations (A+) | 35 | Everything in Meets Expectations, plus a test for every risk, and one test with someone outside your group, with what you observed, or a note that they had no trouble. |
| Meets Expectations (A-, A) | 31 | Your report explains how you decided what to test, and why. Every feature has at least one test, linked by its number. Each test records what you tested and why, what you expected, what happened and what you changed. Every failed test you fixed was run again, and its new result is recorded. The appendix has a labelled screenshot for each test. The report is 2 to 4 pages, not counting the appendix. |
| Approaches Expectations (B- to B+) | 27.5 | The testing has gaps. For example, a feature has no test, some rows are missing the expected or actual result, fixed failures were not run again, or several tests have no screenshot. |
| Not Within Expectations (C+ and below) | 23 | There is no test table, most features have no test, or there are no screenshots. |

#### 4. Working with Copilot (25 points)

| Band | Starts at | What your work shows |
| :-- | :--: | :-- |
| Exceeds Expectations (A+) | 25 | Everything in Meets Expectations, plus at least two places where Copilot got something wrong, each with its transcript page, how you noticed and what fixed it. If there were fewer than two, a feature where its first answer worked, with its transcript page and test number, for each one missing. |
| Meets Expectations (A-, A) | 22 | One PDF with every Copilot conversation used to build the app, in order, from the first prompt to the final code. The prompts work from your design document, one feature or fix at a time. Your testing report lists any code edited by hand, and it starts with your AI use statement. |
| Approaches Expectations (B- to B+) | 19.5 | The transcripts have gaps, such as a missing conversation or no path to the final code. Also Approaches Expectations: most prompts ask for large parts of the app at once without reference to your design, or the AI use statement is missing. |
| Not Within Expectations (C+ and below) | 16.5 | There are no transcripts, or the transcripts do not lead to the app you submitted. |

---

## Part C: Viva Voce

Part C is group work, worth 10%. Your group presents in person, in one session in Week 13. The
dates are in [What you hand in](#what-you-hand-in). Attending is mandatory, and it is a
[passing requirement](syllabus.md#passing-criteria).

A viva voce is an oral exam. Your group demonstrates its app, explains the decisions behind it, and
answers our questions out loud. It is where you show that your group understands what it built,
including the code Copilot wrote.

Watch the practice video before your session, so you know what to expect. We will post it during
Week 12.

<!-- TODO: instructor decision required. The practice video, "posted during Week 12 lab" in the dev
guide, is now a promise on this page. Confirm who records it and when it is posted. -->

### Before you start <!-- {docsify-ignore} -->

Before reading the instructions for this part of the project, review the [rubric](#part-c-rubric),
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

### What happens <!-- {docsify-ignore} -->

- Demo. Show your app running, and show each of its main features
- Explain your choices. Justify your design and code decisions
- Questions. The teaching team asks questions, and any member may be asked about any part of the
  app, not only the part they built

How long each session is, how to book your slot, where it takes place and what you may bring will
be announced closer to the date.

<!-- TODO: instructor decision required. Session length and split between demo and questions,
booking, room, and permitted materials (the AI Policy says "Any prepared materials must follow the
presentation instructions", so this page must eventually say what is allowed). -->

<details>
<summary>What we ask about</summary>

Design decisions:

- Who is your user, and how does each feature help them?
- Why did you design it this way instead of another way?
- How does your app use the course concepts you chose?

Testing and finding bugs:

- How did you decide what to test?
- What methods did you use to catch bugs, such as unexpected input, clicking every button, or
  having someone else try the app?
- Tell us about a bug you found. How did you find it, and how did you fix it?

Changes along the way:

- What changed from your design requirements document, and why?
- Where did Copilot get it wrong, and how did you notice? If it never did, how did you check its code?

Connect your answers to your user. "Copilot suggested it" is not a reason on its own. "We kept it
because it makes the next meal easier for our user to find" is.

</details>

<details>
<summary>How to prepare</summary>

- Re-read your design requirements document and your testing report
- Make sure every member can explain every part of the app, including code they did not prompt for
- Test your demo on the device you will present with

</details>

> [!WARNING]
> The viva voce is where you show your own understanding, and it is covered by the
> [AI Policy](ai-policy.md#independent-assessments-have-strict-boundaries).
>
> You need to explain your work and your group's decisions yourself, and answer questions without
> AI during the session.
>
> AI can help you prepare, within what the policy allows, but you need to understand everything
> you say.

There are no regrades for viva voces. The teaching team agrees on how to mark before the sessions,
so every group is marked to the same standard.

### Going further in Part C <!-- {docsify-ignore} -->

To reach the A+ / Exceeds Expectations category on a criterion, do everything it asks for at
Meets Expectations, plus every item listed for it below.

| Criterion | To reach Exceeds Expectations, also do this |
| :-- | :-- |
| Demonstration | Demonstrate one realistic task your user would do, from start to finish, and show the app handling at least one of the risks in your design document. |
| Design decisions and course concepts | For at least two features, name a different design you considered and the reason, tied to your user, that you chose against it. |
| Testing and bugs | For one bug, explain its cause in the code: which part of the code was wrong and why, not only what the user saw. If you found no bugs, explain in the code how your app handles the input from your riskiest test. |
| Changes along the way | Explain one change you made to how you prompted Copilot after it got something wrong, and what happened after that change. If Copilot never got anything wrong, explain one change you made to how you prompted it as the app grew, and why. |
| Answering as a group | Each member, at least once, builds on a teammate's answer by connecting it to another part of the app or to a course concept. Handing the next question to a teammate does not count. |

### Part C rubric <!-- {docsify-ignore} -->

Use this rubric to prepare for your viva voce. It is marked out of 100 points across five
criteria, the same way as Part B, and that score is 90% of Part C. Design decisions and testing are
worth the most points, so give them the most time. The Exceeds Expectations row of each table
summarizes that criterion's [Going further](#going-further-in-part-c) items.

The other 10% of Part C is your stand-ups 5 to 9 (5%) and the Project 2 retrospective (5%), and
your peer evaluation multiplier applies to all of Part C. The
[grade breakdown](project.md#your-individual-part-c-mark) shows how the pieces add up.

| Criterion | Points |
| :-- | :--: |
| 1. Demonstration | 15 |
| 2. Design decisions and course concepts | 25 |
| 3. Testing and bugs | 25 |
| 4. Changes along the way | 15 |
| 5. Answering as a group | 20 |
| Total | 100 |

#### 1. Demonstration (15 points)

| Band | Starts at | What your work shows |
| :-- | :--: | :-- |
| Exceeds Expectations (A+) | 15 | Everything in Meets Expectations, plus one realistic user task shown from start to finish, with a risk handled. |
| Meets Expectations (A-, A) | 13 | The app runs on the device you present with. You show its main features working, and say which need of your user each one serves. |
| Approaches Expectations (B- to B+) | 11.5 | The app runs, but a main feature fails during the demo and your group cannot explain why, or the demo lists features without connecting them to your user. |
| Not Within Expectations (C+ and below) | 10 | The app does not run, or there is no demo. |

#### 2. Design decisions and course concepts (25 points)

| Band | Starts at | What your work shows |
| :-- | :--: | :-- |
| Exceeds Expectations (A+) | 25 | Everything in Meets Expectations, plus, for two features, a design you considered and why you chose against it. |
| Meets Expectations (A-, A) | 22 | Your answers explain who your user is, how each feature helps them, and why you designed the app this way. You can show where each course concept appears in the app and explain how it works there. Your reasons come from your user, not from what Copilot suggested. |
| Approaches Expectations (B- to B+) | 19.5 | Your answers describe what the app does without saying why, or a course concept is named but your group cannot show or explain where it appears. |
| Not Within Expectations (C+ and below) | 16.5 | Your group cannot answer most design questions, or the course concepts are not in the app. |

#### 3. Testing and bugs (25 points)

| Band | Starts at | What your work shows |
| :-- | :--: | :-- |
| Exceeds Expectations (A+) | 25 | Everything in Meets Expectations, plus one bug explained at the level of the code that caused it. If you found no bugs, the code that handles your riskiest test explained instead. |
| Meets Expectations (A-, A) | 22 | You explain how you decided what to test and which methods you used. You walk through one bug you found: how you found it, and how you fixed it. If you found no bugs, you say so and explain which test was most likely to find one, and why. |
| Approaches Expectations (B- to B+) | 19.5 | Testing is described only in general terms, such as "we tried everything", the bug walk-through leaves out how you found it or how you fixed it, or you found no bugs and do not say which test was most likely to find one. |
| Not Within Expectations (C+ and below) | 16.5 | Your group cannot describe a test you ran or a bug you found. |

#### 4. Changes along the way (15 points)

| Band | Starts at | What your work shows |
| :-- | :--: | :-- |
| Exceeds Expectations (A+) | 15 | Everything in Meets Expectations, plus one change in how you prompted Copilot after it went wrong, and what happened next. If it never went wrong, one change in how you prompted it as the app grew, and why. |
| Meets Expectations (A-, A) | 13 | You explain what changed from your design requirements document and why. You describe at least one place where Copilot got it wrong, and how you noticed. If Copilot never got anything wrong, you say so and explain how you checked its code. |
| Approaches Expectations (B- to B+) | 11.5 | Changes are listed without reasons, or the Copilot example does not say how you noticed. |
| Not Within Expectations (C+ and below) | 10 | Your group cannot name a change, or a place where Copilot got it wrong. |

#### 5. Answering as a group (20 points)

| Band | Starts at | What your work shows |
| :-- | :--: | :-- |
| Exceeds Expectations (A+) | 20 | Everything in Meets Expectations, plus every member building on a teammate's answer at least once. |
| Meets Expectations (A-, A) | 17.5 | Every member answers questions, including about parts of the app they did not build. The answers are your own, given without AI, within the [AI Policy](ai-policy.md#independent-assessments-have-strict-boundaries). |
| Approaches Expectations (B- to B+) | 15.5 | A member does not answer, or members can answer only about the parts they built. |
| Not Within Expectations (C+ and below) | 13 | One or two members give almost every answer, or answers are read from a script. |

---

## Working as a group

Three things run alongside Project 2, the same way as in Project 1: weekly stand-ups, a
retrospective and peer evaluation. All three affect your individual Part C mark. The full rules
and worked examples are under [Working as a group](project-1.md#working-as-a-group) on the
Project 1 page and on the [Project](project.md#group-process) page.

### Weekly stand-ups <!-- {docsify-ignore} -->

Post your own stand-up in your group's Ed Discussion channel each week. Stand-ups 5 to 9 count
toward Project 2:

| Stand-up | Due, 4:00pm Pacific |
| :------: | :------------------ |
| 5 | Fri Nov 6  |
| 6 | Fri Nov 13 |
| 7 | Fri Nov 20 |
| 8 | Fri Nov 27 |
| 9 | Fri Dec 4  |

Each one is marked complete, partial or incomplete, and together they are 5% of your Part C mark.
A late stand-up costs 0.5% of your individual Part C mark for every 12 hours it is late. Part of
12 hours counts as a full 12 hours. Your one free late stand-up for the term covers the first one
you post late, up to 72 hours. See
[Late and missing stand-ups](project-1.md#late-and-missing-stand-ups).

### Retrospective <!-- {docsify-ignore} -->

Your group's second retrospective covers teamwork during Project 2, and lessons for future groups.
It is 5% of your Part C mark, and its deadline is in [What you hand in](#what-you-hand-in).

A late retrospective costs your group 1% of its Part C grade for every 12 hours it is late. Part of
12 hours counts as a full 12 hours. See [Retrospectives](project.md#retrospectives).

### Peer evaluation <!-- {docsify-ignore} -->

Your teammates rate your contribution to Parts B and C, so how you work with your group in Part B
counts too. Their ratings become a multiplier on your whole Part C mark, the heaviest part of each
project. Parts A and B are not multiplied. See [Project Peer Evaluation](project-peer-evaluation.md).

iPeer turns your ratings into part of each teammate's grade. Rate them on what they did, with the
same care you would want from them.

### If contribution is uneven <!-- {docsify-ignore} -->

Raise problems early, with your group first and then with your TA. If you need us to step in,
contact us at least 12 days before the deadline, and set up a meeting with everyone present at least
9 days before it:

| Deadline | Contact us by | Meet with us by |
| :------- | :------------ | :-------------- |
| Part B, Tue Nov 24 | Thu Nov 12 | Sun Nov 15 |
| Viva voce, from Wed Dec 2 | Fri Nov 20 | Mon Nov 23 |

The full process is under
[If contribution is uneven](project.md#if-contribution-is-uneven) on the Project page.

---

## Academic integrity

Fabrication means presenting something as true when it is not. In this project that includes:

- Reporting a test you did not run, or a result you did not get
- Handing in a screenshot that was edited, or that shows a different version of the app than the
  one you describe
- Changing what a Copilot transcript says, or handing in a conversation your group did not have

A wrong test number, a mislabelled screenshot or a formatting mistake is an error, not
fabrication.

> [!WARNING]
> Fabrication means a zero on the project for the student responsible. The rest of the group gets
> a zero on Part B.
>
> Your individual Part A is not affected by a fabrication finding in a group part.

AI use is covered by the [AI Policy](ai-policy.md). Whatever tools you use, you are responsible for
the accuracy of what you hand in, and you should be able to explain anything submitted under your
name. In the viva voce, we will ask you to.

<!-- TODO: instructor decision required. The fabrication policy mirrors Project 1's, including its
two open items: who gets the project-level zero when the responsible member cannot be identified,
and whether a penalty this size can be applied directly or must go through UBC's academic
integrity process. -->

---

## How this is graded

Read this section before you start Part B or Part C. Part A has its own [rubric](#part-a-rubric),
marked complete, partial or incomplete. Parts B and C use the [Part B rubric](#part-b-rubric) and
the [Part C rubric](#part-c-rubric). Every criterion in them matches something this page already
asks for, so there are no hidden requirements. The only additions are the optional Going further
items in [Part B](#going-further-in-part-b) and [Part C](#going-further-in-part-c), for groups
aiming for an A+.

### The four bands <!-- {docsify-ignore} -->

Each criterion in Parts B and C is worth a set number of points and gets one of four bands. The
band sets the share of those points you can earn.

| Band | What it means | UBC letter grades | Share of the criterion's points |
| :-- | :-- | :-- | :--: |
| Exceeds Expectations | Everything in Meets Expectations, plus every Going further item for that criterion | A+ | 90% to 100% |
| Meets Expectations | The required work is complete and matches the description. Small slips cost points within the band | A-, A | 80% to 89% |
| Approaches Expectations | The work is mostly there, but something important is unclear, incomplete or missing | B-, B, B+ | 68% to 79% |
| Not Within Expectations | Important parts are missing, or there is not yet enough evidence of the work | C+ and below | 0% to 67% |

A criterion with nothing submitted for it gets 0. If your work matches the descriptions of more than
one band, your TA uses the lowest one that applies.

Three things to know:

- Meets Expectations is the expected result. Doing everything this page asks for, and doing it
  well, earns an A- or an A on that criterion.
- Exceeds Expectations is optional and defined in advance. Complete everything at Meets
  Expectations first, because Going further work does not make up for a missing requirement.
  Doing only some of a criterion's Going further items keeps it in Meets Expectations.
- Your TA picks the band first and starts at the top of it, the Starts at number in each rubric
  table. Small mistakes take points off within the band, and your feedback names each one.

### What is already decided <!-- {docsify-ignore} -->

- Part A is graded individually and is not affected by peer evaluation
- Part B, and the viva voce in Part C, receive a group grade
- Part C is 90% viva voce, 5% your stand-ups and 5% the retrospective. See the
  [grade breakdown](project.md#grade-breakdown)
- Peer evaluation rates your contribution to Parts B and C, and its multiplier applies to your
  whole Part C mark. See [Working as a group](#working-as-a-group)
- Pre-lab 8 is part of your Lab 8 grade, not your project grade

> [!ATTENTION]
> Late work is not accepted on the project. Nothing submitted after a deadline is marked.
>
> Some submissions are exceptions: a late one is still required, and it costs marks instead. These
> are [stand-ups](#weekly-stand-ups), [retrospectives](project.md#retrospectives) and
> [peer evaluations](project-peer-evaluation.md#late-peer-evaluations).
>
> If you are running out of time, submit a partial document rather than nothing. An incomplete
> submission earns some marks; a missing one earns none.
>
> If something serious or ongoing is happening, use the
> [academic concession](syllabus.md#academic-concessions) process and tell us early rather than
> afterwards.

---

## Related pages

- [Project Overview](project.md): the grade breakdown, group contract and escalation
- [Project 1](project-1.md): stand-ups, retrospectives and peer evaluation in full
- [Project Peer Evaluation](project-peer-evaluation.md): the multiplier, the criteria and the formula
- [Labs](labs.md): Labs 6 to 10 support this project
- [AI Policy](ai-policy.md): what is required, what is permitted and what is not allowed
- [Schedule](schedule.md): the whole term in context
