# Project 1: From Data to Decisions

> [!NOTE]
> This page is not finished yet, but everything below is solid enough to plan around. Please read
> it now. A few things are still to come:
>
> - How to disclose your AI use in Parts B and C: the process and the form to use. Part A has its
>   own [AI use line](#using-ai-in-part-a)
> - How to submit the Part C video, and the Part C page limit
> - Rough time estimates for each part
>
> The rubrics for all three parts are posted: [Part A](#part-a-rubric), [Part B](#part-b-rubric)
> and [Part C](#part-c-rubric). Read [How this is graded](#how-this-is-graded) before you start
> Part B or Part C.
>
> The schedule below may still change. Anything that moves gets recorded in the changelog.

<details class="changelog">
<summary>Changelog</summary>

| Date | Update |
| :--: | :----- |
| Oct 13 | Added the Part B and Part C rubrics, the optional Going further work for an A+, and a guide to PEEL. Part C now includes your stand-ups and the retrospective, peer evaluation covers Parts B and C, and Parts B and C are due at 11:59pm. |
| Oct 6 | Added the Part A rubric and the AI use rule for Part A. Part A is now handed in on Canvas, as your annotated Snap! project and one PDF, due the day after your lab instead of at the end of it. |
| Sep 30 | Added the stand-up schedule and late penalties, and the iPeer 0 late penalty. Added late penalties for retrospectives. Stand-up 0 is now required, and late penalties are subtracted from Part C instead of applied as a multiplier. |
| Sep 29 | Added the rubric for the Part B dataset submission. |
| Sep 25 | Corrected the group contract deadline to Fri Sep 25 and added the Thu Oct 1 re-submission deadline. Noted that contract penalties come off Part B. |
| Sep 22 | Added the dataset requirements for Part B and the project resources. |

</details>

## Overview

Project 1 has three parts that look unrelated at first, but they're closely connected. Each one
follows data as it turns into a decision about somebody.

- Part A. Your digital life is spread across years, platforms and accounts, and you can't see all
  of it at once. The Exposure Index pulls it together into a single number you can actually look
  at, which is abstraction in action. Then you change the weights behind it and watch your own
  score move.
- Part B. AI-generated images are already in your feed, and you probably can't spot them
  reliably. A whole industry of tools claims it can, so you test that claim on images you
  collected yourself. Those tools run on pattern recognition, the idea behind most of modern AI,
  and you find out where it breaks.
- Part C. Other algorithms already decide who gets a loan, a grade, or a visit from the police.
  When one goes wrong, saying it was biased explains nothing. You take a real case apart until you
  can name the mechanism behind the harm. That's decomposition, pointed at something that
  matters.

All three come back to the same computational thinking question: someone had to decide what would
count. It might be the factors in a score, the data a system learns from, or the cut-off where a
decision flips. Your job is to find that choice and explain what it cost.

By the end you'll have done what computer scientists actually do with systems like these. You'll
have read one, tested several, and taken one apart.

| Part | What it is | Who does it | Weight | Due |
| :--: | :--------- | :---------- | :----: | :-- |
| A | Your digital footprint | Individual | 1% | The day after your Lab 3, Thu Oct 8 or Fri Oct 9 |
| B | The AI detector experiment | Starts individual, becomes group | 4% | Tue Oct 20 |
| C | Algorithmic bias case study | Group | 10% | Tue Oct 27 |

Parts B and C are due at 11:59pm Pacific.

Those weights are percentages of your final course grade, not shares of this project. Together
they come to 15%, and Project 2 is the other 15%. See
[Course Evaluation](syllabus.md#course-evaluation) for the full picture.

> [!WARNING]
> Part C is worth more than Parts A and B combined, so give it real time. Don't save it for the
> last week!

> [!ATTENTION]
> To pass this course you need at least 50% on the course project overall, counting Project 1 and
> Project 2 together. The full list is in [Passing Criteria](syllabus.md#passing-criteria).

---

## What you hand in

| Part | Deliverable                                                               | Where  |
| :--: | :------------------------------------------------------------------------ | :----- |
|  A   | Your annotated Snap! project, and one PDF with your two scores and a short reflection | Canvas |
|  B   | Two documents: your image dataset, and your evaluation                    | Canvas |
|  C   | A written report using the 9-section template, and a recorded video       | Canvas |

Along the way you will also submit:

- Your image dataset, for TA sign-off, on Thursday October 1
- A [stand-up](#weekly-stand-ups) post on Ed Discussion, every Friday from October 2 to October 30
- A peer evaluation in iPeer, and a group retrospective, after Part C


---

## The flow

> [!NOTE]
> This schedule may still change. Lab dates, rooms and section times are on the
> [Labs](labs.md) page.

| Week | Lab | What happens | Due that week |
| :--: | :-: | :----------- | :------------ |
| 2 | Lab 1 | Project introduced. Groups start forming. | Group formation survey, Fri Sep 18 |
| 3 | Lab 2 | Snap! programming. Start looking for images. | [Group contract](project.md#group-contract), Fri Sep 25 |
| 4 | *no lab* | Independent work. Truth and Reconciliation Day. | Image dataset for TA sign-off, Thu Oct 1<br>[Peer evaluation practice round](project-peer-evaluation.md), Thu Oct 1<br>[Group contract](project.md#group-contract) re-submissions, Thu Oct 1<br>[Stand-up 0](#weekly-stand-ups), a required practice round, Fri Oct 2 |
| 5 | Lab 3 | Part A runs in lab, start to finish. | Part A, the day after your lab<br>Stand-up 1, Fri Oct 9 |
| 6 | Lab 4 | Working block for Part B. | Stand-up 2, Fri Oct 16 |
| 7 | Lab 5 | Working block for Part C. | Part B, Tue Oct 20<br>Stand-up 3, Fri Oct 23 |
| 8 | Lab 6 | Project 2 begins. | Part C, Tue Oct 27<br>Retrospective and [iPeer 1](project-peer-evaluation.md)<br>Stand-up 4, Fri Oct 30 |

Three things to notice:

- Week 4 has no lab, but your dataset is due that week. Lab 2 in Week 3 is your last scheduled
  group time before then, so use it.
- Most of Part A happens during the lab hour, including your annotations. Only the reflection is
  written afterwards, and everything is due the next day. That is why Part A is only worth 1%.
- Part C can't really start before October 14. The Algorithmic Bias lecture that day gives you
  the framework the report is built around, so Week 6 isn't free time.

<details>
<summary>Roughly how long each part takes</summary>

Hour estimates for each part are still being worked out, and they'll be added here once they're
settled.

What we can tell you now is the shape of it. Part A happens mostly inside the lab hour, and
only the short reflection needs time outside lab. Part B's hours are spread thinly across several weeks, and most of
that is collecting images. Part C's are concentrated into two weeks, and it's the biggest of the
three.

<!-- TODO: instructor decision required. Time estimates left as TBD at your request. The earlier
draft figures were A 1 hour, B 7 to 8, C 3 to 4, which predate the 1/4/10 weighting; my revision
was A 0, B 5 to 6, C 6 to 8. Neither is confirmed. -->

</details>

---

## Part A: Your Digital Footprint

Part A is individual work, worth 1%, and it runs in [Lab 3](labs.md) on October 7 and 8. You
annotate the script during the lab, and you hand in everything on Canvas by the day after your
lab.

<details>
<summary>Part A instructions, AI use line and rubric, from Week 5</summary>

Most of your digital life is invisible to you. It built up across different platforms over years,
and there's nowhere you can go to see the shape of it all at once.

We give you a working calculator in Snap! called an Exposure Index. It asks you some questions
about your online life and turns your answers into a single number. That takes something
sprawling and mostly invisible and makes it into something you can look at. You're not building
the calculator; your job is to read it and work out how it got to that number.

Partway through the lab, the class votes on which factors should count for more. Your TA changes
the weights, and you run the calculator again with exactly the same answers. Nothing about you has
changed in that half hour, but your score probably has. Part A asks you to explain why.

> [!ATTENTION]
> Share your score, not your answers.
>
> When you compare with a partner, compare the score and which factors moved it most. Saying "my
> photo factor made a big difference" is a complete answer. You never have to say what the photos
> were, and nobody should ask.
>
> Nobody collects your answer sheet, so your answers stay on your own screen.

### What you will do <!-- {docsify-ignore} -->

- Fill in your Pre-lab 3 answer sheet beforehand, so that round 2 uses the same answers as
  round 1 rather than a second guess
- Run the calculator with the starting weights and write down your round 1 score
- Annotate three parts of the script in your own words, as comments in Snap!
- Take part in the class vote on the weights
- Run the calculator again with the same answers and write down your round 2 score
- Compare with a partner, then get checked off by your TA
- Export your annotated project as an XML file before you leave

<details>
<summary>More detail on the calculator and what to annotate</summary>

The calculator asks seven or eight questions, and some are follow-ups that only appear depending
on an earlier answer. Those answers get combined into six weighted factors.

The Exposure Index is not an actual measurement of anything. It's a fictional number we invented
for this activity, so don't go looking for a "safe" or "average" score! What it's useful for is
comparison: your round 1 score against your round 2, or the shape of your answers against someone
else's. 

Annotating means explaining what a piece of code does in ordinary language. You're not translating
it block by block, you're saying what that part of the script is for.

Write each annotation as a Snap! comment. Right-click an empty part of the script area,
choose add comment, type your annotation, then drag the comment onto the block it explains so it
stays attached. Comments are saved inside the project, so your TA reads them in the file you
export.

Annotate these three parts:

1. One of the three counting factors, whichever you prefer. What is it measuring, and why would
   more of it mean more exposure?
2. The photos section. What does the first question decide, what does the second one add, and
   why does showing your face count for more than photos existing at all?
3. The final step, where the factors are added up. Each factor's contribution comes from a call
   to another block rather than from a number written in the script. What does that call decide,
   and what does it not show you?

> [!WARNING]
> You may only change the weight variables, the ones the class votes on, and leave everything else
> alone. The two rounds only mean something if the weights are the only thing that changed.

</details>

### What you need to hand in <!-- {docsify-ignore} -->

You hand in two files on Canvas, together in one submission to Project 1A.

| File | What it contains |
| :--- | :--------------- |
| Your annotated Snap! project, exported as an XML file | Your three annotations, as comments attached to the parts of the script they explain |
| One PDF | Your AI use line, at the top. Then your round 1 and round 2 scores, which factor's weight change moved your score most, and your answers to the four reflection questions below |

Part A is due at 11:59pm Thursday October 8 if your lab is on Wednesday (L1A to L1D), and at
11:59pm Friday October 9 if your lab is on Thursday (L1E).

To export your project, open the File menu in Snap! (the page icon at the top left) and choose
Export project. Snap! saves an XML file to your computer. Do this before you leave the lab, and
before you change anything beyond the weights.

All of it must be your own work, written by you.

<details>
<summary>The four reflection questions</summary>

1. Which factors affected your score the most?
2. How did your score differ from your partner's, and what explains the difference?
3. Your answers did not change between the two rounds, but your score did. What does that tell
   you about what the Exposure Index actually measures?
4. Name one thing the calculator should have asked about but did not, and explain why it belongs.

Question 4 counts for the most, because it asks you to think past the tool itself.

</details>

### Using AI in Part A <!-- {docsify-ignore} -->

We strongly encourage you to write your annotations and your reflection without AI. Part A is
practice at reading code and explaining it in your own words, and that practice only works if the
thinking is yours.

Start your PDF with the one line below that is true for you. Copy it as it is written.

| | Line to copy |
| :-: | :----------- |
| 🟢 | AI use: Green. I did not use AI for my annotations or reflection. |
| 🟡 | AI use: Yellow. I used AI to understand the code or check my wording, but every annotation and answer is in my own words. |
| 🔴 | AI use: Red. AI wrote some of my annotations or reflection. |

No colour costs marks on its own. Your work is graded on the [rubric](#part-a-rubric), whichever
line you choose, and choosing honestly is what the
[AI Policy](ai-policy.md#be-transparent-about-ai-use) asks of you.

If you do use AI, do not give it your answers to the calculator questions. The AI Policy asks you
to [use fictional examples](ai-policy.md#protect-privacy-and-course-material) for your digital
footprint.

### Where you have a choice <!-- {docsify-ignore} -->

- Which counting factor you annotate
- How you organise the reflection
- How much of your own situation you describe. You can answer every question fully without
  saying anything you would rather keep private

<details>
<summary>If you miss Lab 3</summary>

We'll post the calculator link and the class's voted weights after the lab, so you can run both
rounds yourself. Say in your reflection that you did it outside lab. You'll lose the lab mark for
that week, but Part A is still open to you.

You won't have a partner for question 2, so bring your scores to a TA's
[drop-in hours](drop-in-hours.md) and compare there instead.

Annotate the posted calculator as comments, the same way, then export it. Your deadline does not
change: hand in both files on Canvas by 11:59pm the day after your scheduled lab.

</details>

### Part A rubric <!-- {docsify-ignore} -->

Part A is graded as one criterion, using all three deliverables together. Your TA reads your
annotations in your Snap! project and everything else in your PDF.

| Criterion | Complete (1) | Partial (0.5) | Incomplete or absent (0) |
| :-- | :-- | :-- | :-- |
| Part A deliverables: your two scores, your three annotations, and your reflection | All three deliverables are present. Both scores are recorded, along with the factor whose weight change moved your score most. All three parts of the script are annotated, and each annotation is correct and explains, in your own words, what that part of the script is for. All four reflection questions are answered with a reason. Question 4 names something the calculator did not ask about and explains why it belongs. | All three deliverables are present, but at least one falls short. For example, a part of the script is not annotated, an annotation is incorrect or only restates the blocks, a reflection answer gives no reason, or question 4 names something without explaining why it belongs. | At least one deliverable is missing entirely: no scores, no annotations, or no reflection. |

Answers are judged on their reasoning, not on how much personal detail they share.

<!-- Annotation count confirmed as three on Oct 6, and all three are required for Complete.

Factor count verified against CPSC-100-dev/labs/assets/lab3.xml: six weighted factors
(numPlatforms, oldestAccountYears, publicProfiles, personalInfoShared, photos, contentType),
reached through nine prompts of which seven or eight fire per student. Note that factorTier
defines a "childhood" tier that no prompt appears to reach, which may be a dead branch worth
checking before Lab 3 runs. -->

</details>

---

## Part B: The AI Detector Experiment

Part B starts as individual work and turns into group work. It's worth 4%, there's a working block
for it in [Lab 4](labs.md), and it is due on Tuesday October 20 at 11:59pm.

Scroll far enough and you'll pass images that a machine made, whether you notice or not. Telling
them apart by eye is getting harder every year.

AI detection tools make a confident claim: give us an image and we'll tell you whether a machine
made it. Some are already used to make real decisions about real people, so it matters whether
that claim holds up.

Your group tests that claim using images you collect yourselves. Every group works with images
this term, not text or video.

This isn't a made-up exercise, since how well these tools perform is still an open research
question. For an example, see
[this 2026 review of detection tool performance](https://pmc.ncbi.nlm.nih.gov/articles/PMC12752165/).

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

- Build an image dataset of real and AI-generated images, and record where each one came from.
  Due Thursday October 1 for TA sign-off
- Choose your detection tools: one per group member, with a minimum of three
- Set up access to your tools before Lab 4, which means creating accounts, checking the free
  limits and testing that you can log in
- Run your dataset through your tool and record what it says
- Read each tool's terms of service and answer three specific questions
- Look more closely at one tool: how it says it works, and where it failed

<details>
<summary>Building the dataset</summary>

We'll give you a set of starter images, some real and some AI-generated, and each group member
then adds a few more of their own. 
- Course team will provide you with 4 starter images (2 Real Vs. 2 AI - generated).
- Each member must add 2 images individually to the dataset.
- E.g. A group of 4 members must have a dataset of 8 images + 4 starter images, so 12 images in total. 

Whatever the final count, your dataset needs to:

<!-- TODO: instructor decision required. Dataset image counts left as TBD at your request. The
earlier draft said four starter images (two real, two AI-generated) plus two per group member,
one of each, giving ten images for a group of three and fourteen for a group of five. The
composition minimums below (one lightly edited camera photo, one building, one nature scene) and
the tool count rule (one per member, minimum three) were NOT changed, since you specified image
counts. Say if those should go to TBD too. -->

- Record where every image came from, and how you know whether it is real or AI-generated
- Include at least one photo taken with a camera and lightly edited using an editor that does
  not use AI, for example correcting colour or removing a blemish
- Include at least one image of a building and at least one image of a natural scene
- Be legible. We recommend 72 ppi or higher, and there are instructions below for checking

The lightly edited photo is worth including. A tool that calls an ordinary edited photo
AI-generated is telling you something useful about how it decides.

Your starter images can be found here:
- Real-image 1: [Image 1](https://parsa-rajabi.github.io/CPSC-100/assets/project-resources/IMG_1.jpeg)
- Real-image 2: [Image 2](https://parsa-rajabi.github.io/CPSC-100/assets/project-resources/IMG_2.jpg)
- AI-generated image 1: [Image 3](https://parsa-rajabi.github.io/CPSC-100/assets/project-resources/IMG_3.jpeg)
- AI-generated image 2: [Image 4](https://parsa-rajabi.github.io/CPSC-100/assets/project-resources/IMG_4.png)

</details>

<details>
<summary>How to check an image's resolution</summary>

You don't need any special software for this.

- On a Mac: select the file, right-click, and choose Get Info. Dimensions and Resolution are
  both listed under More Info.
- On Windows: right-click the file, choose Properties, then open the Details tab. Look for
  Dimensions and for Horizontal and Vertical resolution.

If you want the longer explanation of what resolution means and how it's changed, Adobe's
[guide to image size and resolution](https://helpx.adobe.com/photoshop/using/image-size-resolution.html)
covers it.

> [!TIP]
> Legibility is what actually matters here, and ppi is only a rough proxy for it. A small image
> can carry a high ppi tag and still be too coarse for a detector to say anything useful about.
> If you can see the detail clearly at full size, you're fine.

</details>

<details>
<summary>Choosing your tools, and a starter list</summary>

You need one tool per group member, with a minimum of three. Make a shortlist of about ten first,
then narrow it down.

For each tool you choose, record five things:

| What to record | What it means |
| :------------- | :------------ |
| Cost | Free, partly free, or subscription only |
| Availability | What the free version actually allows, such as scans per day |
| Claims | The accuracy the tool advertises, in its own words |
| Reputation | Reviews, ratings, and who recommends it |
| Reason for use | Why your group chose it |

Try to spread your choices across the list, because most review sites name the same one or two
tools. Groups that don't think about it end up testing the same handful, and the class learns
less.

The tools below were free and worked in a browser as of mid-2026. Check the free limits again
before you commit, because they change often.

| Approach | Tools |
| :------- | :---- |
| Looks for patterns in the image, which is the common approach | Hive Moderation, Illuminarty, AI or Not, WasItAI, DeepAI, ZeroGPT, NoteGPT, Winston AI, Content at Scale |
| Checks information stored inside the file | Optic |

Optic works differently from the others: instead of looking for patterns in the picture, it checks
for a record that editing or generating software stores inside the file. If one person in your
group tests Optic, you can compare the two approaches directly.

</details>

<details>
<summary>Running the experiment and recording results</summary>

Agree on one shared table before anyone starts: one row per image, one column per tool. If
everyone records results differently, you'll spend the next week trying to reconcile them.

> [!TIP]
> Record what the tool said, not whether it was right.
>
> Write down the verdict, the confidence score if there is one, and what the image actually was.
> Work out afterwards, from your table, whether the tool got it right.
>
> If you record only "correct" or "incorrect" as you go, you lose track of which way the tool was
> wrong. That direction is the most interesting part of your results.

Note anything unusual the moment it happens: a file the tool refuses, a confidence score that
doesn't match the verdict, an image that breaks the tool. You won't remember any of it later.

You won't finish in the lab hour, and you're not expected to.

</details>

<details>
<summary>Reading the terms of service</summary>

For each tool, answer three questions:

1. Does it keep what you upload, and if so for how long?
2. Can it use what you upload to train future models?
3. Does it share what you upload with other companies?

> [!TIP]
> Search each policy for: retain, retention, store, delete, train, training, improve our services,
> third part, share, disclose. "Improve our services" is often doing the work of "train our
> models".
>
> Check whether the tool has a separate privacy policy as well as terms of service. The two often
> disagree, and that disagreement is worth reporting.

</details>

### What you need to hand in <!-- {docsify-ignore} -->

Part B is two documents.

The first is your data, with one row per image recording:

- What the image shows, in a few words
- Whether it is real or AI-generated
- For AI-generated images, which tool made it
- For real images, where it came from and any editing you did

The second is your evaluation, covering this for each tool you tested:

- The five things listed above: cost, availability, claims, reputation, and your reason for use
- A link to the terms of service you read, and your answers to the three questions
- A results table covering every image and every tool
- A closer look at one tool: how it says it works, how it performed on your dataset, where it
  failed, and whether there was a pattern to its mistakes. Make each point using
  [PEEL](#making-an-argument-with-peel), with your own results as the evidence
- A recommendation. Of the tools you tested, which one would you recommend to your family, and
  why?
- A short reflection. What does it cost when a tool wrongly says an image is AI-generated? What
  does it cost when it wrongly says an image is real? Who pays in each case?
- An appendix of screenshots of your results, each showing your computer clock

> [!NOTE]
> You don't need to copy out each tool's own explanation of its verdict. The verdict, the
> confidence score and what the image actually was is enough. If a tool says something surprising
> about why it decided as it did, put that in your closer look instead.

### Where you have a choice <!-- {docsify-ignore} -->

- Which tools you test, beyond the minimum number
- Which tool you look at more closely. Choose the one that behaved most unusually, rather than
  the one that scored best
- How you divide the work. This is the one part of the project where splitting the work by tool,
  rather than by task, is clearly the right approach
- Where you set the cut-off for tools that give a percentage rather than a verdict, as long as
  you write down what you chose and use it consistently

<details>
<summary> If every tool gets everything right</summary>

That's a genuine result, and you should report it. Say so accurately, then explain what you'd need
to test to find a case where the tools do fail.

Reporting honestly that you found nothing, and explaining why, is better work than implying a
failure you didn't find.

</details>

### Going further in Part B <!-- {docsify-ignore} -->

To reach the A+ / Exceeds Expectations category on a criterion, do everything it asks for at
Meets Expectations, plus every item listed for it below.

| Criterion | To reach Exceeds Expectations, also do this |
| :-- | :-- |
| Tools and terms of service | For every answer to the three terms of service questions, quote the wording from the policy and name the section or heading it comes from. Also include at least one tool that checks information stored inside the file, such as Optic. |
| Results | Under your results table, give each tool's number of false positives (it said AI-generated about a real image) and false negatives (it said real about an AI-generated image). |
| Closer look | Refer to every failure you discuss by its row in your results table. Then use the pattern you found to predict one more image, not in your dataset, that the tool will get wrong. Run it, add the screenshot to your appendix, and say whether your prediction held. A prediction that turns out wrong still counts, as long as you report it honestly. |
| Recommendation and reflection | Support your recommendation with at least one number from your results and at least one of your terms of service answers. In your reflection, tie each cost to at least one specific error from your own results. |

The dataset criterion has no Going further work.

### Part B rubric <!-- {docsify-ignore} -->

Use this rubric to check your work before you submit. Your TA marks Part B on five criteria, and
each criterion gets one of the four bands described in [How this is graded](#how-this-is-graded).
Your Part B grade is the weighted average of the five. The closer look carries the most weight, so
plan the most time for it. The Exceeds Expectations row of each table summarizes that criterion's
[Going further](#going-further-in-part-b) items.

| Criterion | Weight |
| :-- | :--: |
| 1. Dataset | 15% |
| 2. Tools and terms of service | 20% |
| 3. Results | 20% |
| 4. Closer look at one tool | 25% |
| 5. Recommendation and reflection | 20% |

#### 1. Dataset

Your dataset was marked at the October 1 sign-off, using the rubric below. That mark carries into
Part B unchanged, so there is nothing more to do for this criterion. If you re-submitted, your
re-submission mark is the one that counts.

<details>
<summary> A+ (90-100) </summary>

**1. Dataset** <br>
Every dataset instruction has been followed. The images your group contributes must include one camera photo lightly edited in a non AI editor, one image of a building and one image of nature, and every image must be legible and at least 72 ppi.

Each image's label must record:

1. Source: URL, generator/model name, or who took the photo and on what device.
2. Ground truth: real or AI-generated, and how you know.
3. Modifications: the editor used and each change made, or "none".

</details>

<details>
<summary> A (80-89) </summary>

**1. Dataset** <br>
The dataset is largely complete, but one required image type is absent, for example there is no building image or no nature image.

All images are labelled, but some labels are vague or incomplete. For example, the source is given as "Google Images", the ground truth has no justification, or the edits say only "edited" without the tool or the changes.

</details>

<details>
<summary> B (65-79) </summary>

**1. Dataset** <br>
More than one required image type is absent from the dataset.

Several images are missing labels, or a label field is missing across the set. Common cases: no modification record for the edited photo, or real vs AI stated without any origin.

</details>

<details>
<summary> Re-submission required (below B) </summary>

**1. Dataset** <br>
If the quality of the submission is deemed below the standard for a B, your TA will ask you to re-submit your dataset.

</details>

#### 2. Tools and terms of service (20%)

| Band | What your work shows |
| :-- | :-- |
| Exceeds Expectations (A+) | Everything in Meets Expectations, plus a quote and its section for every terms of service answer, and at least one tool that checks information stored inside the file. |
| Meets Expectations (A-, A) | One tool per group member, with a minimum of three. For every tool: its cost, availability, claims, reputation and your reason for use, a link to the terms of service you read, and an answer to each of the three questions. |
| Approaches Expectations (B- to B+) | The same gap appears for two or more tools. For example, one of the five things, the terms of service link, or an answer that addresses its question is missing for two or more tools. Also Approaches Expectations: fewer tools than group members, as long as there are at least three. |
| Not Within Expectations (C+ and below) | There are fewer than three tools, or the five things or the three questions are missing for most tools. |

#### 3. Results (20%)

| Band | What your work shows |
| :-- | :-- |
| Exceeds Expectations (A+) | Everything in Meets Expectations, plus each tool's number of false positives and false negatives under the table. |
| Meets Expectations (A-, A) | One results table covering every image and every tool. Each cell records the verdict, the confidence score if the tool gives one, and what the image actually was. For tools that give a percentage, your cut-off is written down and used the same way throughout. The appendix has screenshots of your results, each showing your computer clock. |
| Approaches Expectations (B- to B+) | The table or the appendix has gaps. For example, more than one result in ten is missing, the table records only "correct" or "incorrect" instead of the verdicts, or none of the screenshots show the clock. |
| Not Within Expectations (C+ and below) | Results are missing for at least one tool or for most images, or there are no screenshots. |

#### 4. Closer look at one tool (25%)

| Band | What your work shows |
| :-- | :-- |
| Exceeds Expectations (A+) | Everything in Meets Expectations, plus every failure referred to by its row in your results table, and one prediction tested on a new image and reported. |
| Meets Expectations (A-, A) | Covers how the tool says it works, how it performed on your dataset, where it failed, and whether there was a pattern to its mistakes. Each point is made using [PEEL](#making-an-argument-with-peel), and the evidence comes from your own results. If the tool made no mistakes, you say so and explain what you would need to test to find one. |
| Approaches Expectations (B- to B+) | All four parts are there, but at least one is thin. For example, failures are listed but not explained, a pattern is claimed without results to back it up, or how the tool works is described without connecting it to your results. |
| Not Within Expectations (C+ and below) | One or more of the four parts is missing, or the section describes the tool without using your results. |

#### 5. Recommendation and reflection (20%)

| Band | What your work shows |
| :-- | :-- |
| Exceeds Expectations (A+) | Everything in Meets Expectations, plus a recommendation backed by a number from your results and a terms of service answer, and a reflection that ties each cost to a specific error from your results. |
| Meets Expectations (A-, A) | You recommend one of the tools you tested to your family and say why. Your reflection says what it costs when a tool wrongly says an image is AI-generated, what it costs when it wrongly says an image is real, and who pays in each case. |
| Approaches Expectations (B- to B+) | The recommendation gives no reason or is for a tool you did not test, or the reflection covers only one kind of error, or it does not say who pays. |
| Not Within Expectations (C+ and below) | The recommendation or the reflection is missing, or the reflection only defines the two kinds of error. |

---

## Part C: Algorithmic Bias Case Study

Part C is group work, worth 10%. There is a working block for it in [Lab 5](labs.md), and it is due
on Tuesday October 27 at 11:59pm.

Algorithmic systems are already making decisions that change people's lives: who gets a loan, who
gets flagged at a border, whose exam grade is revised downward. When one of them gets it badly
wrong, the people affected rarely find out why. Part C is where you work out why, for one real
case that has been documented properly.

It's the largest piece of Project 1, and it has two deliverables:

| Deliverable | What it covers |
| :---------- | :------------- |
| A written report | The description: what the system was, what it did, and what happened |
| A recorded video | The argument: the mechanism, and the reading you had to argue against |

The split is deliberate: the report sets out the facts of the case, while the video is where you
explain your reasoning out loud, in your own words. That's a harder skill than writing it down.

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

### What you will do <!-- {docsify-ignore} -->

- Choose a real, documented case where an algorithmic system caused harm
- Fill in the 9-section report template
- Name the mechanism, using vocabulary from the course
- Argue for a reading of the case that you do not agree with
- Record the video, with every group member speaking
- Check that every source you cite is real before you submit

<details>
<summary>Choosing a case</summary>

Your case needs to:

- Be connected to Canada or to a country in Asia
- Be chosen after the Algorithmic Bias lecture on October 14, which gives you Ruha Benjamin's
  four categories. The report is built around them
- Be claimed on Ed Discussion, by replying to the Part C thread. Read the existing replies before
  you settle on a case
- Be documented, meaning there is a regulator's report, a court filing, or investigative
  journalism about it. A blog post asserting that something happened is not enough

> [!WARNING]
> If you can't find a regulator's finding, a court document or an official statement, your case
> may not be documented well enough to use. Talk to your TA early, not in the final week.

<!-- TODO: instructor decision required. Whether two groups in the same lab section may take the
same case. The earlier docs/ draft made this a firm rule; the dev-repo draft lists it as open.
With five sections and a Canada-or-Asia scope, well-documented cases may be thin enough that a
hard rule causes problems. Currently written as "claim it and read the replies", which nudges
without forbidding. -->

</details>

<details>
<summary>The 9-section report template</summary>

Fill in every section, using bullet points wherever they're clearer than prose. A maximum page
count will be announced later.

At the top, give the case name, the country, and your group members.

1. What happened. One paragraph covering what the system was, who used it, and what went wrong.
   Write it so that someone who has never heard of the case can follow it.
2. Input. What data went into the system, where that data came from, and whether the people it
   described agreed to it being used this way.
3. Decision logic. What the system did with that data to reach a result. You do not need the
   source code. "A submitted photo is compared against a database of scraped photos to identify a
   person" is the right level of detail.
4. Outcome. What happened, and to whom. Include any response, such as a regulator's finding, a
   court ruling or a change by the company.
5. Stakeholders and effects. A table of at least three stakeholders, each with one positive and
   one negative effect. Every system benefits someone, so if you can't fill in a single positive
   effect anywhere, look again.
6. Benjamin's categories. Which of the four fits your case best? Say why, pointing to specific
   facts from sections 2 to 4. Then give a reading that someone else could reasonably argue for,
   and explain what they would base it on. This part is required.

   | Category | What it means |
   | :------- | :------------ |
   | Engineered inequity | Unequal outcomes by design, or deliberate targeting |
   | Default discrimination | Nobody intended harm. It followed from indifference and from defaults nobody examined |
   | Coded exposure | Being made visible to a system without consenting to it |
   | Technological benevolence | Presented as helping people who are disadvantaged, while the real purpose is extracting something from them |

7. The mechanism. Name the concept from the course that your case turns on, and explain the
   connection in two or three sentences. This section does more than any other to separate a
   strong report from a summary, so give it the time it needs.
8. Should they change it? Give one argument for changing the system and one against, both based
   on a real trade-off rather than an easy target.
9. Sources. At least three, of which at least two are primary. News coverage of a single event
   counts as one source, not three.

</details>

<details>
<summary>What naming the mechanism means</summary>

Choose from the concepts covered in the course:

- Decision tree, or classification
- Weighted scoring and thresholds
- Feedback loop
- A gap in the training data
- A proxy variable, meaning something measured that stands in for something else

The difference between describing an outcome and naming a mechanism is easiest to see side by
side.

Weaker:

> The algorithm was biased against certain neighbourhoods.

Stronger:

> This is a feedback loop. Because the system sent fewer drivers to that area, fewer ride
> requests came from it, and the system read that drop as confirmation that demand there was low.

The second version explains how the harm kept itself going. Groups usually leave this section
unfinished because they describe what happened without explaining the process behind it.

</details>

<details>
<summary>Why the alternative reading is required</summary>

If a case seems to have only one defensible reading, nobody has looked at it closely enough.

Clearview AI reads most easily as coded exposure, since it's a surveillance system. It also reads
as default discrimination, because the RCMP never checked whether the data was collected legally.
Both can be argued, and a report that mentions only the easier one is weaker for it.

If your group genuinely disagrees about which category fits, that's useful rather than a problem,
so write both readings down. Section 6 exists for exactly that, and a real disagreement makes a
stronger report than a forced agreement.

</details>

### The video

The video is a recorded presentation, allowing no more than 2 minutes per team member, submitted
with the report.

Don't read the report aloud. Sections 1 to 5 are description, and we'll read those ourselves. What
the video needs to cover is the part that benefits from being explained:

- Your mechanism, from section 7: what it is and how it worked in your case
- Your alternative reading, from section 6: which other category you considered, and the
  strongest argument for it
- Your answer to section 8: whether they should change the system, and what that would cost

Every group member speaks, and each of you gets up to 2 minutes. A group of five therefore has up
to 10 minutes in total, and a group of three has up to 6. Decide who covers what before you start
recording.

> [!WARNING]
> The video is where you show your own understanding, and it is covered by the
> [AI Policy](ai-policy.md#independent-assessments-have-strict-boundaries).
>
> You need to explain your work and your group's decisions yourself. Don't read from a script an
> AI tool wrote, and don't use AI-generated voices or avatars instead of speaking.
>
> AI can help you prepare, within what the policy allows, but you need to understand everything
> you say.

The teaching team may follow up with questions about your video. Every member should be able to
answer about any part of it, not only their own section.

<!-- TODO: instructor decision required. Video specifications chosen while drafting:
  1. Length cap of 2 minutes per team member.
  2. "Every member speaks". Confirm whether appearing on camera is required, or whether
     voice-only is acceptable. Accessibility and privacy both argue for voice-only being fine.
  3. Slides and visuals: currently neither required nor prohibited.
  4. Submission mechanics: Canvas media upload, or a shared link. Canvas file size limits can
     defeat a recording of this length, so this needs a stated route and a fallback.
  5. Captions: not currently required. Consider requiring automatic captions at minimum. -->

### What you need to hand in <!-- {docsify-ignore} -->

- The written report, all nine sections. A maximum page count will be announced later
- At least three sources, of which at least two are primary, and all of them checked
- A recorded video with every member speaking, up to 2 minutes each, covering sections 6, 7 and 8
- Sections 6, 7 and 8, in the report and in the video, make their points using
  [PEEL](#making-an-argument-with-peel)
- A case connected to Canada or a country in Asia, claimed on Ed Discussion

### Where you have a choice <!-- {docsify-ignore} -->

- Your case, within the limits above
- Which of Benjamin's categories you argue for, and which you argue against
- Which mechanism you name, if more than one fits. Say so if several do
- How you present the video: slides, a screen recording, people speaking to camera, or a mix
- How you divide up the speaking, as long as everyone speaks

### Going further in Part C <!-- {docsify-ignore} -->

To reach the A+ / Exceeds Expectations category on a criterion, do everything it asks for at
Meets Expectations, plus every item listed for it below.

| Criterion | To reach Exceeds Expectations, also do this |
| :-- | :-- |
| Case and sources | After every fact in sections 2 to 4, say which of your sources it comes from, for example "(Source 2)". |
| The facts of the case | In section 2 or 3, state at least one thing about the system that is not public, and say where you looked for it. In section 5, include at least one stakeholder who neither runs the system nor has decisions made about them by it, such as a regulator, a bystander or the public. |
| Benjamin's categories | Name at least one fact from sections 2 to 4 that fits your chosen category but not the alternative, or the other way round. Use it to explain why your reading wins, or why both readings hold. |
| The mechanism | Add a counterfactual: if one specific part of the system were removed or changed, which part of the harm would not have happened, and why. |
| Should they change it? | For each of your two arguments, name who gains and who loses, using stakeholders from your section 5 table. |
| The video | Each speaker connects their part to another speaker's part at least once, so the video makes one argument rather than separate pieces. For example: "This is the feedback loop Sam described, and it is also why the alternative reading falls short." |

### Part C rubric <!-- {docsify-ignore} -->

Use this rubric to check your report and video before you submit. Together they are 90% of Part
C. Your TA marks them on six criteria, the same way as Part B, and their mark is the weighted
average of the six. The mechanism carries the most weight, so give it the most time. The Exceeds
Expectations row of each table summarizes that criterion's [Going further](#going-further-in-part-c)
items.

The other 10% of Part C is your stand-ups (5%) and the retrospective (5%), and your peer evaluation
multiplier applies to all of Part C. The [grade breakdown](project.md#your-individual-part-c-mark)
shows how the pieces add up.

| Criterion | Weight within the report and video |
| :-- | :--: |
| 1. Case and sources | 10% |
| 2. The facts of the case: sections 1 to 5 | 20% |
| 3. Benjamin's categories: section 6 | 20% |
| 4. The mechanism: section 7 | 25% |
| 5. Should they change it? Section 8 | 10% |
| 6. The video | 15% |

Sections 6, 7 and 8 are each marked once, using the report and the video together, so you are not
marked twice for the same point. The video criterion covers only the video's own requirements.

#### 1. Case and sources (10%)

| Band | What your work shows |
| :-- | :-- |
| Exceeds Expectations (A+) | Everything in Meets Expectations, plus a source named after every fact in sections 2 to 4. |
| Meets Expectations (A-, A) | The case is connected to Canada or a country in Asia, is claimed on Ed Discussion, and is documented by a regulator's report, a court filing or investigative journalism. Section 9 lists at least three sources, at least two of them primary, with news coverage of one event counted as one source. |
| Approaches Expectations (B- to B+) | The case is in scope and claimed, but the sources fall short. For example, fewer than two are primary, or several of them repeat the same news coverage. |
| Not Within Expectations (C+ and below) | The case is outside the scope or is documented only by blog posts or a single news story, or there are fewer than two sources. |

A source that does not exist, or that does not say what you claim, is not marked here. It is
handled under [Academic integrity](#academic-integrity).

#### 2. The facts of the case: sections 1 to 5 (20%)

| Band | What your work shows |
| :-- | :-- |
| Exceeds Expectations (A+) | Everything in Meets Expectations, plus at least one thing that is not public with where you looked for it, and a stakeholder who neither runs the system nor has decisions made about them by it. |
| Meets Expectations (A-, A) | All five sections are filled in. Someone new to the case can follow section 1. Section 2 says what data went in, where it came from, and whether the people it described agreed. Section 3 explains what the system did with that data, at the level of the example in the template. Section 4 says what happened, to whom, and any response. Section 5 has at least three stakeholders, each with one positive and one negative effect. |
| Approaches Expectations (B- to B+) | All five sections are there, but one is thin. For example, section 2 does not say where the data came from or whether people agreed, section 3 says only that the system used the data to decide, or two or more stakeholders are missing a positive or a negative effect. |
| Not Within Expectations (C+ and below) | A section is missing, or section 5 has fewer than three stakeholders. |

#### 3. Benjamin's categories: section 6 (20%)

| Band | What your work shows |
| :-- | :-- |
| Exceeds Expectations (A+) | Everything in Meets Expectations, plus a fact that separates the two readings, used to explain why your reading wins or why both hold. |
| Meets Expectations (A-, A) | You name the category that fits best and support it with specific facts from sections 2 to 4. You give an alternative reading that someone could reasonably argue for, and say what it would be based on. Each point uses PEEL. |
| Approaches Expectations (B- to B+) | The category is supported only in general terms, or the alternative reading is named but not explained. |
| Not Within Expectations (C+ and below) | The category is stated without any facts behind it, or there is no alternative reading. |

#### 4. The mechanism: section 7 (25%)

| Band | What your work shows |
| :-- | :-- |
| Exceeds Expectations (A+) | Everything in Meets Expectations, plus a counterfactual tied to a specific part of the system. |
| Meets Expectations (A-, A) | You name a concept from the course list under "What naming the mechanism means" and explain, in two or three sentences, how it produced the harm in your case: the process, not only the outcome. If more than one concept fits, you say so. Each point uses PEEL. |
| Approaches Expectations (B- to B+) | A concept is named and defined, but the link to the harm in your case is implied rather than explained, or the explanation describes the outcome instead of the process. |
| Not Within Expectations (C+ and below) | No concept from the course is named, or the concept does not match what happened in the case. |

#### 5. Should they change it? Section 8 (10%)

| Band | What your work shows |
| :-- | :-- |
| Exceeds Expectations (A+) | Everything in Meets Expectations, plus who gains and who loses from each argument, using your section 5 stakeholders. |
| Meets Expectations (A-, A) | One argument for changing the system and one against, each based on a real trade-off. Each point uses PEEL. |
| Approaches Expectations (B- to B+) | Both arguments are there, but at least one is an easy target rather than a real trade-off. |
| Not Within Expectations (C+ and below) | One of the two arguments is missing. |

#### 6. The video (15%)

| Band | What your work shows |
| :-- | :-- |
| Exceeds Expectations (A+) | Everything in Meets Expectations, plus every speaker connecting their part to another speaker's part at least once. |
| Meets Expectations (A-, A) | Every group member speaks, for up to 2 minutes each. The video covers sections 6, 7 and 8, and explains your reasoning in your own words rather than reading the report aloud, within the [AI Policy](ai-policy.md#independent-assessments-have-strict-boundaries). Each point uses PEEL. |
| Approaches Expectations (B- to B+) | All three sections are covered, but a member does not speak, the video runs more than 30 seconds over its time limit, or two of the three sections are read from the report rather than explained. |
| Not Within Expectations (C+ and below) | One of sections 6, 7 or 8 is not covered, or all three are read aloud from the report. |

---

## Working as a group

> [!WARNING]
> Please read this section carefully. Students lose marks here more often than anywhere else in
> the project, and usually because they forgot rather than because it was hard.

Three things run alongside the project parts: weekly stand-ups, a retrospective, and peer
evaluation. All three affect your individual grade.

### Weekly stand-ups

A stand-up is a short post of three or four sentences, once a week, answering three questions:

- What did I do?
- What am I doing next?
- What is holding me up?

That's the whole thing, and plenty of software teams work this way. The point is to catch problems
early, while there's still time to do something about them.

How it works:

- Stand-ups are due every Friday at 4:00pm Pacific, from Friday October 2 to Friday December 4
- You post in your own group's Ed Discussion channel
- Every member posts their own. One person cannot post on behalf of the group
- The time on your Ed post is the time we use to decide whether it is late
- Each stand-up is marked complete (it answers all three questions), partial (it is missing an
  answer) or incomplete (it was not posted). Stand-ups 1 to 4 together are 5% of your Part C mark

#### Stand-up schedule

| Stand-up | Due, 4:00pm Pacific | Counts toward |
| :------: | :------------------ | :------------ |
| 0 | Fri Oct 2  | Practice round, but required. Late penalty comes off Project 1, Part C |
| 1 | Fri Oct 9  | Project 1, Part C |
| 2 | Fri Oct 16 | Project 1, Part C |
| 3 | Fri Oct 23 | Project 1, Part C |
| 4 | Fri Oct 30 | Project 1, Part C |
| 5 | Fri Nov 6  | Project 2, Part C |
| 6 | Fri Nov 13 | Project 2, Part C |
| 7 | Fri Nov 20 | Project 2, Part C |
| 8 | Fri Nov 27 | Project 2, Part C |
| 9 | Fri Dec 4  | Project 2, Part C |

<details>
<summary>Stand-up 0, the practice round from October 2</summary>

Stand-up 0, on Friday October 2, is a practice round, but you still have to post it. Use it to
check that your group's channel works, see what a stand-up looks like, and ask us about anything
that is unclear. Its late penalty is smaller than the others, because it is practice.

The peer evaluation practice round runs the day before, on Thursday October 1, for the same
reason.

</details>

> [!NOTE]
> Posting publicly rather than emailing us means your group and your TA can both see it. Raising a
> problem in a stand-up is much easier than explaining in Week 7 why something never got done.
>
> Your stand-ups also build a record of your own contribution, which works in your favour when
> peer evaluation comes around.

#### Late and missing stand-ups

> [!WARNING]
> You must post every stand-up, even if it is late. A missing stand-up keeps losing marks until
> you post it.

| Stand-up | Penalty for every 12 hours late, or part of 12 hours | Taken off |
| :------: | :--------------------------------------------------: | :-------- |
| 0        | 0.25% | Your individual Project 1, Part C mark |
| 1 to 4   | 0.5%  | Your individual Project 1, Part C mark |
| 5 to 9   | 0.5%  | Your individual Project 2, Part C mark |

The penalty is subtracted from your individual Part C mark, after your peer evaluation multiplier
has been applied. For example, stand-up 2 posted 5 hours late costs 0.5%, and posted 30 hours late
costs 1.5%.

Every student gets one free late stand-up for the whole term, including stand-up 0. We apply it
automatically to the first stand-up you post late. It covers up to 72 hours of lateness. If that
stand-up is more than 72 hours late, the penalty counts only the time after the first 72 hours.

<details>
<summary>How stand-up penalties work with peer evaluation: a worked example</summary>

Your individual grade on Part C starts from your Part C score: your group's report and video, your
own stand-ups, and the retrospective. It is multiplied by your peer evaluation multiplier, and then
any stand-up penalties are subtracted. That is why two people in the same group can end up with
different marks.

Suppose your Part C score is 85%, and your peer evaluation multiplier is 0.95.

| Situation | Calculation | Your mark |
| :-------- | :---------- | :-------: |
| You posted every stand-up on time | 85 × 0.95 = 80.75 | 80.75% |
| You posted one stand-up 20 hours late. It was your first late one, so your free late covers it | 85 × 0.95 = 80.75 | 80.75% |
| You had already used your free late, then posted a stand-up 2 hours late. Part of a 12-hour period counts as a full one, so this is 1 period | 85 × 0.95 − (1 × 0.5) = 80.75 − 0.5 | 80.25% |
| You had already used your free late, then posted a stand-up 20 hours late. That is 2 periods | 85 × 0.95 − (2 × 0.5) = 80.75 − 1 | 79.75% |
| You had already used your free late, then posted a stand-up two weeks late. That is 28 periods | 85 × 0.95 − (28 × 0.5) = 80.75 − 14 | 66.75% |

A late stand-up always costs less than one you keep putting off, because the penalty grows every
12 hours until you post it.

</details>

### Retrospectives

At the end of each project, your group writes a short retrospective together. It answers three
questions:

- What worked?
- What did not work?
- What will you change next time?

It is 5% of your Part C mark: complete if it answers all three questions, partial if it is missing
an answer, and incomplete if it is not submitted. It does not need to be long, and it is not a performance
review of anybody. It's the conversation that stops Project 2 repeating Project 1's mistakes.

The Project 1 retrospective is due at the same time as iPeer 1. There's guidance on running one on
the [Group Work Resources](group-work-resources.md#retrospectives-and-peer-evaluation) page.

Your group must submit every retrospective, even if it is late. A late retrospective costs your
group 1% of its Part C grade for every 12 hours late, or part of 12 hours. The practice round costs
0.25%. The penalty comes off the group grade, so every member loses the same amount. The details
and a worked example are on the [Project](project.md#retrospectives) page.

### Peer evaluation

> [!WARNING]
> Peer evaluation is what makes your individual grade differ from your teammates' grades.
>
> Your teammates rate your contribution to Parts B and C, so how you work with your group in Part B
> counts too. Their ratings become a multiplier on your whole Part C mark, the heaviest part of each
> project. Parts A and B are not multiplied.
>
> The full mechanics, criteria and formula are on the
> [Project Peer Evaluation](project-peer-evaluation.md) page. Read it before iPeer 1, due
> Thursday October 29.

In short:

- It runs in iPeer
- You evaluate each of your teammates, and each of them evaluates you
- Each evaluation is out of 30. Your multiplier is your average received score divided by 30
- Your individual Part C mark is your Part C score multiplied by your multiplier

So a Part C score of 90% with a multiplier of 0.875 gives you 78.75%, on work the whole group
submitted together.

<details>
<summary>iPeer 0, the practice round from October 1</summary>

There is a practice round first, iPeer 0, due Thursday October 1. It is required but not graded,
and it is there so everyone understands the process before it starts counting. A late iPeer 0
costs 0.25% of your individual Part C mark for every 12 hours late, or part of 12 hours.

</details>

> [!NOTE]
> Write your evaluations carefully. Vague comments like "good job" or "did not help" can cost you
> marks. Comments are shared with your group anonymously, so write about specific behaviour and
> contributions, not personality.
>
> You may not use AI to write peer evaluation ratings or comments, including in the practice
> round.

<details>
<summary>If contribution in your group is uneven</summary>

By default everyone in a group gets the same grade for the work the group submits together. If lab records, stand-ups and peer evaluations
all suggest someone contributed significantly less, that person's grade may be adjusted down.

Raise problems early. Fixing a group takes one to two weeks to actually work, so leaving it until
the week before a deadline gives nothing time to change.

The escalation process, including the deadlines for asking us to step in, is on the
[Project](project.md) page and on the
[Group Work Resources](group-work-resources.md#conflict-resolution) page.

</details>

---

## Academic integrity

Fabrication means presenting something as true when it isn't. In this project that includes:

- Citing a source that does not exist
- Reporting results you did not obtain
- Describing events that did not happen
- Misrepresenting what a real source says. You are responsible for reporting accurately what is
  in the source. Getting it wrong is not treated as a lesser problem than making it up

A wrong page number, a broken link or a citation formatting mistake is an error, not fabrication.

> [!WARNING]
> Fabrication means a zero on the project for the student responsible. The rest of the group gets
> a zero on the affected part, either Part B or Part C.
>
> Your individual Part A is not affected by a fabrication finding in a group part.

Avoiding this is straightforward: open every source before you submit, and check that it exists
and says what you claim it says. [Lab 5](labs.md) sets aside time for exactly this.

AI use is covered by the [AI Policy](ai-policy.md). Whatever tools you use, you're responsible for
the accuracy of what you hand in, and you should be able to explain anything submitted under your
name.

<!-- TODO: instructor decision required. Fabrication policy, two open items carried from the
dev-repo draft's notes, which say "check before this goes to students":

  1. ATTRIBUTION DEFAULT. Split liability requires establishing who fabricated. Contribution
     statements and peer evaluations are partial evidence, not proof. The previously published
     text (archive/pending/project-academic-integrity.md) said the project-level zero applies to
     every group member where attribution is impossible. The dev draft's notes recommend the
     opposite, softer default. Neither is stated above, because the sources disagree and Lab 5's
     PrairieLearn guide states only the two-part outcome. Decide, then state it here.
  2. AUTHORITY. Confirm whether a penalty this size can be applied directly by the instructor at
     UBC, or whether it must be routed through the academic integrity process. -->

---

## How this is graded

Read this section before you start Part B or Part C. Part A has its own [rubric](#part-a-rubric),
marked complete, partial or incomplete. Parts B and C use the [Part B rubric](#part-b-rubric) and
the [Part C rubric](#part-c-rubric). Every criterion in them matches something this page already
asks for, so there are no hidden requirements. The only additions are the optional Going further
items in [Part B](#going-further-in-part-b) and [Part C](#going-further-in-part-c), for groups
aiming for an A+.

### The four bands <!-- {docsify-ignore} -->

Each criterion in Parts B and C gets one of four bands. The band sets the range your mark for that
criterion falls in.

| Band | What it means | UBC letter grades | Mark |
| :-- | :-- | :-- | :--: |
| Exceeds Expectations | Everything in Meets Expectations, plus every Going further item for that criterion | A+ | 90 to 100 |
| Meets Expectations | Everything the instructions ask for, done well | A-, A | 80 to 89 |
| Approaches Expectations | The work is mostly there, but something important is thin, unclear or missing | B-, B, B+ | 68 to 79 |
| Not Within Expectations | Important parts are missing, or there is not yet enough evidence of the work | C+ and below | 0 to 67 |

A criterion with nothing submitted for it gets 0.

Three things to know:

- Meets Expectations is the expected result. Doing everything this page asks for, and doing it
  well, earns an A- or an A on that criterion.
- Exceeds Expectations is optional and defined in advance. Complete everything at Meets
  Expectations first, because Going further work does not make up for a missing requirement.
  Doing some of a criterion's Going further items can raise your mark toward the top of Meets
  Expectations, but only all of them reach Exceeds Expectations.
- Your TA picks the band first, then your mark within it. Small mistakes move your mark down inside
  the band, and your feedback names what they were.

The Part B dataset criterion is the one exception. It keeps the rubric it was marked with at the
October 1 sign-off.

### Making an argument with PEEL <!-- {docsify-ignore} -->

Use PEEL for every point you make in the Part B closer look, and in Part C sections 6, 7 and 8 and
the video. It builds each point so that a reader can check it, and your TA will look for all four
steps.

| Step | What it does |
| :-- | :-- |
| Point | Say the claim you are making, in one sentence |
| Evidence | Give the specific fact that supports it: a result from your table, or a fact from your case |
| Explain | Say how that evidence supports your point |
| Link | Connect the point back to your question: your recommendation, your category, or your mechanism |

Here is one point from a Part B closer look, written with PEEL:

> Point: Tool X struggles with lightly edited photos.
>
> Evidence: It labelled both of our edited camera photos, rows 5 and 9 in our results table, as
> AI-generated, at 92% and 88%.
>
> Explain: Tool X says it looks for unusually smooth textures, and colour correction smooths
> textures.
>
> Link: So a family member who edits their photos before posting them could be wrongly flagged,
> which is part of why we do not recommend it.

A point without evidence is an opinion. A point with evidence but no explanation leaves the reader
to guess why the evidence matters. The Link is what turns separate points into one argument.

### What is already decided <!-- {docsify-ignore} -->

- Part A is graded individually and is not affected by peer evaluation
- Part B, and the report and video in Part C, receive a group grade
- Part C is 90% report and video, 5% your stand-ups and 5% the retrospective. See the
  [grade breakdown](project.md#grade-breakdown)
- Peer evaluation rates your contribution to Parts B and C, and its multiplier applies to your
  whole Part C mark. See [Working as a group](#working-as-a-group)
- Group contract penalties come off the Part B group grade. See
  [Group contract](project.md#group-contract)

> [!ATTENTION]
> Late work is not accepted on the project. Nothing submitted after a deadline is marked.
>
> The group contract is an exception. A late contract is still required, and it costs marks on
> Part B. See [Group contract](project.md#group-contract).
>
> If you're running out of time, submit a partial document rather than nothing. An incomplete
> submission earns some marks; a missing one earns none.
>
> If something serious or ongoing is happening, use the
> [academic concession](syllabus.md#academic-concessions) process and tell us early rather than
> afterwards.

---

## What comes next: Project 2

Project 2 gets announced later in the term, but a few things you can plan around already:

- It runs from Week 8 to Week 13
- It moves from Snap! into Python. You'll write and annotate a program in Snap!, then translate it
  into Python code
- Its final part, Part 2C, is a viva voce, held from Wed Dec 2 to Fri Dec 4. It is a short live
  presentation by your group, in person, where you demonstrate your program and answer questions
  about the decisions behind it. Every member speaks
- The viva voce is a [passing requirement](syllabus.md#passing-criteria), so you have to attend
  and take part in person
- Part 2C is marked the same way as Part 1C: 90% the viva voce, 5% your stand-ups and 5% the
  retrospective, with peer evaluation applied to all of it. See the
  [grade breakdown](project.md#grade-breakdown)

---

## Related pages

- [Project Peer Evaluation](project-peer-evaluation.md): the multiplier, the criteria and the formula
- [Project Overview](project.md): group contract, escalation, and both projects at a glance
- [Group Work Resources](group-work-resources.md): roles, communication, conflict, retrospectives
- [Labs](labs.md): Labs 1 to 5 support this project
- [AI Policy](ai-policy.md): what is required, what is permitted and what is not allowed
- [Schedule](schedule.md): the whole term in context
