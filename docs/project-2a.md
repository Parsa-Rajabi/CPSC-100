# Project 2A: Learning to Communicate

<details class="changelog">
<summary>Changelog</summary>

<!-- Add a dated entry every time this page changes. Newest first. -->

| Date | Update |
| :--: | :----- |
| Oct 22 | Added the Part A instructions and rubric. |

</details>

## Overview

Part A is individual work, worth 1%, and it runs in [Lab 7](labs.md). You fix the program during
the lab, and you hand it in on Canvas by your section's deadline in the table under
[Submission](#submission). How Part A fits into Project 2 is on the [Project 2](project-2.md) page.

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

### Where you have a choice <!-- {docsify-ignore} -->

- The order you fix the bugs in
- How you test your fixes
- How you word your comments, as long as each one names the kind of error and explains it

---

## Submission

You hand in one file on [Canvas](https://canvas.ubc.ca/courses/190791/assignments), to Project 2A.

| File | File name | What it contains |
| :--- | :-------- | :--------------- |
| Your fixed notebook, downloaded as an .ipynb file | `CPSC100-2A-[StudentNumber].ipynb`, for example `CPSC100-2A-12345678.ipynb` | Your AI use line, as a comment at the top of the first cell. Then the fixed program, with a comment at each fix |

To download your notebook, open the File menu in Jupyter and choose Download. In some versions it
is Download as, then Notebook. Do this before you leave the lab, so you have a copy. Rename the
file as shown in the table before you hand it in.

Hand it in by your section's deadline:

| Your lab | Lab 7 | Part A due |
| :------- | :---- | :--------- |
| Wednesday, L1A to L1D | Wed Nov 4 | Thu Nov 5, 11:59pm |
| Thursday, L1E | Thu Nov 5 | Fri Nov 6, 11:59pm |

All of it must be your own work, written by you.

---

## AI disclosure

We strongly encourage you to fix the program and write your comments without AI. An AI tool can fix
this program in seconds. But Part A is practice at explaining code in your own words, and that
practice only works if the thinking is yours. [Part B](project-2b.md) is where you build with AI.

Start your notebook with the one line below that is true for you, as a comment in the first cell.
Copy it as it is written.

| | Line to copy |
| :-: | :----------- |
| 🟢 | `# AI use: Green. I did not use AI to find, fix or explain the bugs.` |
| 🟡 | `# AI use: Yellow. I used AI to understand an error message or a Python feature, but I found and fixed the bugs myself, and every comment is in my own words.` |
| 🔴 | `# AI use: Red. AI found or fixed some of the bugs, or wrote some of my comments.` |

No colour costs marks on its own. Your work is graded on the [rubric](#grading-criteria), whichever
line you choose, and choosing honestly is what the
[AI Policy](ai-policy.md#be-transparent-about-ai-use) asks of you.

---

## Late policy

Late work is not accepted on the project. Nothing submitted after a deadline is marked.

If something serious or ongoing is happening, use the
[academic concession](syllabus.md#academic-concessions) process and tell us early rather than
afterwards.

<details>
<summary>If you miss Lab 7</summary>

We will post the Part A notebook after the lab, so you can do Part A on your own. You will lose the
lab mark for that week, but Part A is still open to you.

Your deadline does not change: hand in your notebook on Canvas by your section's deadline in the
table under [Submission](#submission).

</details>

---

## Details

### Your fixed program and your comments <!-- {docsify-ignore} -->

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

---

## Grading criteria

Part A is graded as one criterion: your fixed program and your comments. Your TA runs your
notebook and reads every comment.

Part A is graded individually, and it is not affected by peer evaluation.

---

## Grading scale

| Criterion | Complete (1) | Partial (0.5) | Incomplete or absent (0) |
| :-- | :-- | :-- | :-- |
| Your fixed program and your comments | The program runs from start to finish and does what the notebook says it should, including for values your TA tries. Every fix has a comment that names the kind of error and explains, in your own words, what was wrong and why the fix works. | The notebook is handed in, but it falls short. For example, the program still stops with an error or gives a wrong result, a fix has no comment, or a comment only says that something changed, such as "fixed this line". | No notebook is handed in, or none of the fixes has a comment. |

---

## Regrading criteria

To ask for a regrade, follow the [remarking policy](syllabus.md#remarking-policy) in the Syllabus.
