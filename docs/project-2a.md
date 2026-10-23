# Project 2A: Learning to Communicate

<details class="changelog">
<summary>Changelog</summary>

<!-- Add a dated entry every time this page changes. Newest first. -->

| Date | Update |
| :--: | :----- |
| Oct 22 | Added the Part A instructions and rubric. |

</details>

## Overview

Part A is where you show that you can find the bugs in a Python program and explain each one in
your own words.

The goal is not only a program that works. The goal is a clear explanation of every bug: what was
wrong, and why your fix works. Your TA marks your explanations, not only your fixes.

- Part A is individual work, worth 1% of your course grade
- It runs in [Lab 7](labs.md). You fix the program during the lab
- Your program is a Python program in a Jupyter notebook on PrairieLearn. It does not work when you
  get it
- Lab 6 prepares you for Part A. In Lab 6 you go from Snap! to Python
- You hand in your notebook on Canvas, by your section's deadline under [Submission](#submission)

### What you will do <!-- {docsify-ignore} -->

1. In Lab 7, open your Part A notebook on PrairieLearn. The notebook says what the program should do
2. Run the program. Read its error messages and its output
3. Fix every bug you can find, until the program does what the notebook says
4. Test the program with your own values, not only the values in the program. Some bugs only appear
   with certain values
5. At each fix, add a comment. Name the kind of error, say what was wrong, and say why your fix works
6. Download your notebook as an .ipynb file, rename it, and hand it in on Canvas

> [!TIP]
> If you cannot find a bug, try [rubber duck debugging](https://en.wikipedia.org/wiki/Rubber_duck_debugging).
> Explain out loud, line by line, what each part of the program should do. When what you say and
> what the code does are different, you have found a bug.

### Where you have a choice <!-- {docsify-ignore} -->

- The order in which you fix the bugs
- How you test your fixes
- How you word your comments, as long as each comment names the kind of error and explains it

---

## Submission

- Hand in one file on [Canvas](https://canvas.ubc.ca/courses/190791/assignments), to Project 2A
- The file is your notebook, downloaded from PrairieLearn as an .ipynb file
- File name: `CPSC100-2A-[StudentNumber].ipynb`, for example `CPSC100-2A-12345678.ipynb`
- The first cell starts with your AI use line, as a comment. The lines to copy are under
  [AI disclosure](#ai-disclosure)
- The rest of the notebook is your fixed program, with a comment at each fix
- All of the work must be your own

To download your notebook, open the File menu in Jupyter and choose Download. In some versions,
choose Download as, then Notebook. Download it before you leave the lab, so you have a copy. Then
rename the file.

Hand it in by your section's deadline:

| Your lab | Lab 7 | Part A due |
| :------- | :---- | :--------- |
| Wednesday, L1A to L1D | Wed Nov 4 | Thu Nov 5, 11:59pm |
| Thursday, L1E | Thu Nov 5 | Fri Nov 6, 11:59pm |

---

## AI disclosure

We strongly encourage you to fix the program and write your comments without AI. An AI tool can fix
this program in seconds. But Part A is practice at explaining code in your own words, and that
practice only works if the thinking is yours. You build with AI in [Part B](project-2b.md).

Copy the one line below that is true for you. Paste it as a comment at the top of the first cell,
exactly as it is written.

| | Line to copy |
| :-: | :----------- |
| 🟢 | `# AI use: Green. I did not use AI to find, fix or explain the bugs.` |
| 🟡 | `# AI use: Yellow. I used AI to understand an error message or a Python feature, but I found and fixed the bugs myself, and every comment is in my own words.` |
| 🔴 | `# AI use: Red. AI found or fixed some of the bugs, or wrote some of my comments.` |

The line you choose does not change your mark. Your work is marked with the
[rubric](#grading-criteria), whichever line you choose. The
[AI Policy](ai-policy.md#be-transparent-about-ai-use) asks you to choose the line that is true.

---

## Late policy

- Late work is not accepted on the project. Nothing submitted after a deadline is marked
- If something serious or ongoing is happening, use the
  [academic concession](syllabus.md#academic-concessions) process. Tell us early, not afterwards

<details>
<summary>If you miss Lab 7</summary>

We will post the Part A notebook after the lab, so you can do Part A on your own. You lose the lab
mark for that week, but you can still do Part A.

Your deadline does not change. Hand in your notebook on Canvas by your section's deadline under
[Submission](#submission).

</details>

---

## Details

### Your fixed program and your comments <!-- {docsify-ignore} -->

Each comment must include three things, in your own words:

1. The kind of error, using one of the three names from lecture in the table below
2. What was wrong
3. Why your fix works

| Kind of error | What you see |
| :------------ | :----------- |
| Syntax error | Python cannot read the code, so the program does not start at all |
| Runtime error | The program starts, then stops partway through with an error message |
| Logic error | The program runs to the end, but the result is wrong |

A sequencing error (steps in the wrong order) and an initialization error (a variable that is not
given a starting value) are both kinds of logic error. If you learned these names in Snap!, call
them logic errors in your comments.

Where to put your comments:

- Put each comment on the line directly above the code it explains
- If one fix changes several lines, one comment above the first line is enough

Compare these two comments for the same fix.

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

The first comment only tells your TA that something changed. The second shows what the program
was doing, why that was wrong, and why the fix works.

> [!WARNING]
> Fix the bugs, and leave the rest of the program as it is. Do not write a new program. Part A is
> about explaining what was wrong with this code, and a new program has nothing to explain.

---

## Grading criteria

Your Part A grade is based on one area:

- Your fixed program and your comments (whether the program works, and whether every fix has a
  comment that explains it)

Your TA runs your notebook and reads every comment. Part A is marked Complete, Partial or
Incomplete.

Part A is graded individually, and it is not affected by peer evaluation.

---

## Grading scale

| Criterion | Complete (1) | Partial (0.5) | Incomplete or absent (0) |
| :-- | :-- | :-- | :-- |
| Your fixed program and your comments | The program runs from start to finish and does what the notebook says it should, including for values your TA tries. Every fix has a comment that names the kind of error and explains, in your own words, what was wrong and why the fix works. | The notebook is handed in, but something is missing or wrong. For example, the program still stops with an error or gives a wrong result, a fix has no comment, or a comment only says that something changed, such as "fixed this line". | No notebook is handed in, or none of the fixes has a comment. |

---

## Regrading criteria

To ask for a regrade, follow the [remarking policy](syllabus.md#remarking-policy) in the Syllabus.
