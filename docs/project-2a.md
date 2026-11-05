# Project 2A: Learning to Communicate

> [!NOTE]
> This is the first release of the Part A instructions. The teaching team is still reviewing them,
> and some parts, including the rubric, may change before Lab 7. The final version will be ready
> by the day of Lab 7, and we aim to finish sooner. We do not expect large changes. Every change
> will be listed in the changelog. We will remove this note when this page is final.

<details class="changelog">
<summary>Changelog</summary>

<!-- Add a dated entry every time this page changes. Newest first. -->

| Date | Update |
| :--: | :----- |
| Nov 5 | Added the two original Part A programs, with 10 bugs each. |
| Oct 23 | Added the Part A instructions and rubric. |

</details>

## Overview

Part A is where you show that you can find the bugs in a Python program and explain each one in
your own words.

The goal is not only a program that works. The goal is a clear explanation of every bug: what was
wrong, and why your fix works. Your TA marks your explanations, not only your fixes.

- Part A is individual work, worth 1% of your course grade
- It runs in [Lab 7](labs.md). You fix the program during the lab
- Your program is a Python program in a Jupyter notebook on PrairieLearn. It does not work when you
  first open it
- Lab 6 prepares you for Part A. In Lab 6 you go from Snap! to Python
- You submit your notebook on PrairieLearn, by your section's deadline under [Submission](#submission)

### What you will do <!-- {docsify-ignore} -->

1. In Lab 7, open your Part A notebook on PrairieLearn. The notebook says what the program should do
2. Run the program. Read its error messages and its output
3. Fix every bug you can find, until the program does what the notebook says
4. Test the program with your own values, not only the values in the program. Some bugs only appear
   with certain values
5. At each fix, add a comment. Name the kind of error, say what was wrong, and say why your fix works
6. Save your notebook and submit it on PrairieLearn

> [!TIP]
> If you cannot find a bug, try [rubber duck debugging](https://en.wikipedia.org/wiki/Rubber_duck_debugging).
> Explain aloud, line by line, what each part of the program should do. When what you say and
> what the code does are different, you have found a bug.

### Where you have a choice <!-- {docsify-ignore} -->

- The order in which you fix the bugs
- How you test your fixes
- How you word your comments, as long as each comment names the kind of error and explains it

### The original programs <!-- {docsify-ignore} -->

The two original programs are shown below. Each program has 10 bugs.

<details>
<summary>Grade Calculator, original program</summary>

```python
# The Grade Calculator: one student's final grade in CPSC 100

# ----- The student's scores -----
student_name = "Sam"
student_number = 40718
quiz_scores = [62, 45, 88, 70, 39, 81, 74, 90]
project_scores = [86, 92]
lab_scores = [10, 8, 10, 10, 6, 10, 9, 10]
final_exam = 55
participation = 95


# ----- Functions -----
def average(scores):
    # Add up every score, then divide by how many scores there are
    total = 0
    for i in range(1, len(scores)):
        total = total + scores[i]
    return total // len(scores)


def drop_lowest(scores):
    # Give back a new list with one copy of the lowest score taken out
    lowest = scores[0]
    for score in scores:
        if score < lowest:
            lowest = score
    kept = []
    dropped = False
    for score in scores:
        if score == lowest and not dropped:
            dropped = True
        else:
            kept.append(score)
    return kept


def percent_of(points, out_of):
    # Turn a score out of some number into a percentage
    return points
    points = points * 100 // out_of


def weighted(score, weight):
    # The points this part adds to the final grade
    print(score * weight // 100)


def letter_grade(percent):
    if percent >= 90:
        return "A"
    elif percent >= 80:
        return "B"
    elif percent >= 70:
        return "C"
    elif percent >= 50:
        return "D"
    else:
        return "F"


# ----- The report -----
print("Grade report for", student_name)

# Students with an even student number write the final exam in Room A.
# Students with an odd student number write it in Room B.
if student_number % 2 == 1:
    print("Exam room: Room A")
else:
    print("Exam room: Room B")

# The first three quizzes were warm-ups. Show them on their own.
print("Warm-up quizzes:")
for i in range(3, len(quiz_scores)):
    print("Quiz", i + 1, "score:", quiz_scores[i])

# The two lowest quiz scores are dropped.
kept_quizzes = drop_lowest(quiz_scores)
kept_quizzes = drop_lowest(kept_quizzes)
quiz_average = average(kept_quizzes)
print("Quizzes counted:", len(kept_quizzes))
print("Quiz average:", quiz_average)

project_average = average(project_scores)
print("Project average:", project_average)

# Labs are marked out of 10.
lab_percent = percent_of(average(lab_scores), 10)
print("Lab average:", lab_percent, "%")

# Count the labs with full marks.
perfect_labs = 0
for score in lab_scores:
    if score = 10:
        perfect_labs = perfect_labs + 1
    print("Perfect labs:", perfect_labs)

# The points each part adds to the final grade
quiz_points = weighted(quiz_average, 40)
final_points = weighted(final_exam, 20)
project_points = weighted(project_average, 25)
lab_points = weighted(lab_percent, 7)
participation_points = weighted(participation, 8)

part_names = ["quizzes", "the final exam", "projects", "labs", "participation"]
part_points = []
part_points.append(final_points)
part_points.append(quiz_points)
part_points.append(project_points)
part_points.append(lab_points)
part_points.append(participation_points)
for i in range(len(part_names)):
    print("Points from", part_names[i] + ":", part_points[i])

final_grade = quiz_points + final_points + project_points + lab_points + participation_points
print("Final grade: " + final_grade)
print("Letter grade:", letter_grade(final_grade))

# A student checks in with their TA if the final exam is under 60
# or the quiz average is under 60.
if final_exam < 60 and quiz_average < 60:
    print("Check in with your TA: Yes")
else:
    print("Check in with your TA: No")
```

</details>

<details>
<summary>Guessing Game, original program</summary>

```python
# The Guessing Game: three games, played from lists of guesses

# ----- The games -----
# Each list holds the guesses a player typed, in order.
game1_guesses = [50, 25, 37, 40]
game2_guesses = [50, 75, 88, 80, 85, 83, 81, 82]
game3_guesses = [70, 64]
max_guesses = 6


# ----- Functions -----
def give_feedback(guess, secret):
    # Say whether the guess is too low, too high or correct
    if guess < secret:
        print(guess, "is too low.")
    elif guess > secret:
        print(guess, "is too high.")
    else:
        print(guess, "is correct!")


def parity(number):
    # Give back "even" or "odd"
    if number % 2 == 1:
        return "even"
    return "odd"


def points_for(guesses_used):
    # A win is worth 10 points, minus 1 for every guess after the first
    points = 10 - (guesses_used - 1)


def play(secret, guesses):
    # Play one game. Give back the points the player won.
    print("New game. Hint: the secret number is", parity(secret))
    turn = 0
    won = False
    while turn < len(guesses) or turn < max_guesses:
        guess = guesses[turn]
        turn = turn + 1
        give_feedback(guess, secret)
        if guess = secret:
            won = True
            break

    print("Your guesses this game:")
    for i in range(turn, len(guesses)):
        print(guesses[i])

    if won:
        return points_for(turn)
        print("You got it in", turn, "guesses!")
    print("Out of guesses! The number was " + secret)
    return 0


# ----- The games are played -----
points1 = play(37, game1_guesses)
points2 = play(82, game2_guesses)
points3 = play(64, game3_guesses)

scores = []
scores.append(points1)
scores.append(points3)
scores.append(points2)

print("Scoreboard")
game_number = 1
for points in scores:
    print("Game", game_number, "points:", points)
    game_number = game_number + 1

# Add up the points from every game.
total = 0
for i in range(1, len(scores)):
    total = total + scores[i]
    print("Total points:", total)
```

</details>

---

## Submission

- Submission of the project is on PrairieLearn itself. Submit your Part A notebook there
- The first cell starts with your AI use line, as a comment. The lines to copy are under
  [AI disclosure](#ai-disclosure)
- The rest of the notebook is your fixed program, with a comment at each fix
- All of the work must be your own

Submit it on PrairieLearn by your section's deadline:

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

Your deadline does not change. Submit your notebook on PrairieLearn by your section's deadline under
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
# it add every price to the total.
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

Your Part A grade is based on one area: your fixed program and your comments. We will evaluate
whether the program works, and whether every fix has a comment that explains it.

Your TA runs your notebook and reads every comment. Part A is graded individually, and it is not
affected by peer evaluation.

---

## Grading scale

To be marked Complete, your notebook must meet all three of these:

1. The program runs to the end without stopping
2. It does what the notebook says it should, including for values your TA tries
3. Every fix has a comment that names the kind of error and explains, in your own words, what was
   wrong and why the fix works

| Mark | When |
| :-- | :-- |
| Complete (1) | All three items above. |
| Partial (0.5) | The notebook is handed in, but at least one item is missing. For example, the program still stops with an error or gives a wrong result, a fix has no comment, or a comment only says that something changed, such as "fixed this line". |
| Incomplete or absent (0) | No notebook is handed in, or none of the fixes has a comment. |

---

## Regrading criteria

To ask for a regrade, follow the [remarking policy](syllabus.md#remarking-policy) in the Syllabus.
