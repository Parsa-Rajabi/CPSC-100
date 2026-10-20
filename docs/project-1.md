# Project 1: From Data to Decisions

> [!NOTE]
> This page is not finished yet, but everything below is solid enough to plan around. Please read
> it now. Rough time estimates for each part are still to come.
>
> Part A has its own [AI use line](#using-ai-in-part-a), Part B does not need an AI disclosure, and
> Part C has [AI disclosures](#using-ai-in-part-c) on the report's cover page.
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
| Oct 20 | Added a cover page to the Part C report, with two AI disclosures from every member, one for the report and one for the video. A missing or incomplete disclosure lowers your group's report and video score. Part B does not need an AI disclosure. |
| Oct 13 | Added the Part B and Part C rubrics, your group's steps for Part B, and the Part C video rules. In Part B, each member chooses one tool in Lab 4, and Appendix A is the results table. Cases now come from Pre-lab 5, and Parts B and C are handed in as PDFs on Canvas. |
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
| B | The AI detector experiment | Starts individual, becomes group | 4% | Tue Oct 20, 11:59pm |
| C | Algorithmic bias case study | Group | 10% | Tue Oct 27, 11:59pm |

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

Check each deadline on its assignment page in [Canvas](https://canvas.ubc.ca/courses/190791/assignments), which is also where
you hand in your work. The table lists every Project 1 deadline so you can plan. All times are
Pacific time.

| What you hand in | Who | Due | Where |
| :--------------- | :-- | :-- | :---- |
| Part A: your annotated Snap! project, and one PDF with your two scores and a short reflection | Individual | The day after your Lab 3: Thu Oct 8 (L1A to L1D) or Fri Oct 9 (L1E), 11:59pm | [Canvas](https://canvas.ubc.ca/courses/190791/assignments/2597084) |
| Pre-lab 5: one proposed case for Part C | Individual | Mon Oct 19, 11:59pm | [PrairieLearn](https://us.prairielearn.com/pl/course_instance/222208/) |
| Part B: two documents, your image dataset and your evaluation, as PDF files | Group | Tue Oct 20, 11:59pm | [Canvas](https://canvas.ubc.ca/courses/190791/assignments) |
| Part C: a short written report (sections 1 to 5) as one PDF. Its cover page has the link to your recorded video and every member's AI disclosures | Group | Tue Oct 27, 11:59pm | [Canvas](https://canvas.ubc.ca/courses/190791/assignments) |
| [Stand-ups](#weekly-stand-ups) 1 to 4 | Individual | Every Friday from Oct 9 to Oct 30, 4:00pm | Ed Discussion |
| [Retrospective](#retrospectives) 1 | Group | Thu Oct 29, 11:59pm | [Canvas](https://canvas.ubc.ca/courses/190791/assignments/2592835) |
| [iPeer 1](#peer-evaluation) | Individual | Thu Oct 29, 11:59pm | iPeer |

<!-- Part B and Part C link to the course's Assignments page. Replace each with its assignment's
own page once the Project 1B and Project 1C assignments exist. -->


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
| 7 | Lab 5 | Working block for Part C. | Pre-lab 5, Mon Oct 19<br>Part B, Tue Oct 20<br>Stand-up 3, Fri Oct 23 |
| 8 | Lab 6 | Project 2 begins. | Part C, Tue Oct 27<br>Retrospective and [iPeer 1](project-peer-evaluation.md)<br>Stand-up 4, Fri Oct 30 |

Three things to notice:

- Week 4 has no lab, but your dataset is due that week. Lab 2 in Week 3 is your last scheduled
  group time before then, so use it.
- Most of Part A happens during the lab hour, including your annotations. Only the reflection is
  written afterwards, and everything is due the next day. That is why Part A is only worth 1%.
- Part C can't really start before October 14. The Algorithmic Bias lecture that day gives you
  the framework your video is built around, so Week 6 is not free time.

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

Part B starts as individual work and turns into group work. It is worth 4%, and there is a working
block for it in [Lab 4](labs.md). Its deadline is in [What you hand in](#what-you-hand-in).

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
- Pick at least 3 detection tools each, and set up access to them before Lab 4: create accounts,
  check the free limits and test that you can log in
- In Lab 4, choose one tool each from your shortlist and work through it: what it costs and
  claims, what its terms of service say, and how it does on your dataset
- Analyze one tool in depth as a group: how it says it works, and where it failed
- Recommend one tool to your family, and reflect on what its mistakes cost

### How your group works through Part B <!-- {docsify-ignore} -->

Part B mixes work you do on your own with work you do as a group. Follow these steps in order.

| Step | Who | What you do |
| :-- | :-- | :-- |
| 1. Before Lab 4 | On your own | In Pre-lab 4, find at least 3 tools for your shortlist. Your picks can overlap with your group members' picks. Create an account on each and test that you can log in. |
| 2. Start of Lab 4 | As a group | Each member chooses one tool from their shortlist. Each member chooses a different tool. |
| 3. In Lab 4 | On your own | For your tool, record the five things below, read its terms of service and answer the three questions. Then run the whole dataset through it, record every result in your group's results table, and take a screenshot of each result with the computer clock visible. Finish after the lab if you need to. |
| 4. After Lab 4 | As a group | Pick one of your tools for the deep dive. Annonotate each screenshot of the tool's result on every image and analyze the tool together. |
| 5. Before the deadline | As a group | Write the recommendation and the reflection, put the submission together, and have one member submit it. |

Each tool entry is one member's work, with their name at the top. A missing entry lowers your
group's score for tools and terms of service, so agree at the start of Lab 4 who chooses which
tool.

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

Each member finds at least 3 tools for Pre-lab 4, and your picks can overlap with your group
members' picks. At the start of Lab 4, each member chooses one tool from their shortlist, and each
member chooses a different tool.

For the tool you choose, record five things:

| What to record | What it means |
| :------------- | :------------ |
| Cost | Free, partly free, or subscription only |
| Availability | What the free version actually allows, such as scans per day |
| Claims | The accuracy the tool advertises, in its own words |
| Reputation | Reviews, ratings, and who recommends it |
| Reason for use | Why you chose it |

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

Start this in Lab 4, once each member has chosen a tool. Each member runs the whole dataset through
their own tool.

Agree on one shared table before anyone starts: one row per image, one column per tool. If
everyone records results differently, you will spend the next week trying to reconcile them. This
table is Appendix A of your submission.

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

Each member screenshots every result given by their tool. Once the deep-dive tool has been chosen by the group, 2 to 3 screenshots of every other non-deep-dive tool's results should be added to Appendix B, including at least one mistake
if the tool made one. Every screenshot must show your computer clock.

For the deep dive, your group annotates the screenshots of the deep-dive tool's results on every image:

1. Check that the screenshot shows your computer clock.
2. Mark at least one feature on the image, with a circle or an arrow.
3. Write next to it what that feature suggests, real or AI-generated, and why.

All of your screenshots go in Appendix B.

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

Part B is two documents. Hand them in as PDF files, together in one submission to Project 1B
(Group) on Canvas. One member submits for the whole group. Part B does not need an AI disclosure.

The first is your data, with one row per image recording:

- What the image shows, in a few words
- Whether it is real or AI-generated
- For AI-generated images, which tool made it
- For real images, where it came from and any editing you did

The second is your evaluation, in this order:

1. Tool entries, one per member, each with the member's name at the top: the five things for the
   tool you chose, a link to the terms of service you read, and your answers to the three questions
2. The deep dive, written as a group: how the tool says it works, how it performed on your
   dataset, where it failed, and whether there was a pattern to its mistakes. Make each point using
   [PEEL](#making-an-argument-with-peel), with your own results as the evidence
3. A recommendation. Of the tools you tested, which one would you recommend to your family, and
   why?
4. A short reflection. What does it cost when a tool wrongly says an image is AI-generated, a false
   positive? What does it cost when it wrongly says an image is real, a false negative? Who pays in
   each case?
5. Appendix A, your results table: one row per image and one column per member's tool
6. Appendix B, your screenshots: the deep-dive tool's result on every image, annotated, then 2 to 3
   screenshots of each other member's tool. Every screenshot shows your computer clock and is
   labelled with what the image actually is

> [!NOTE]
> You don't need to copy out each tool's own explanation of its verdict. The verdict, the
> confidence score and what the image actually was is enough. If a tool says something surprising
> about why it decided as it did, put that in your deep dive instead.

### Where you have a choice <!-- {docsify-ignore} -->

- Which tools you shortlist, and which one each member chooses
- Which tool your group picks for the deep dive. Choose the one that behaved most unusually,
  rather than the one that scored best
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
| Tools and terms of service | For every answer to the three terms of service questions, quote the wording from the policy, name the section or heading it comes from, and add a screenshot of that part of the policy to Appendix B with the wording highlighted. If the policy does not answer a question, say so, and add a screenshot of the section where you looked. |
| Results | Pick one tool that gives a percentage. Using the scores in your table, count how many of its verdicts would change if your cut-off moved 10 percentage points higher, and how many if it moved 10 lower. Then use your image labels to say whether those changes would fix mistakes or create new ones. If none of your tools gives a percentage, compare two tools instead: count the images they disagree on, and use your labels to say which tool was right each time. |
| Deep dive | For every image the tool got wrong, mark on its Appendix B screenshot the feature that most likely misled the tool, and explain why. Refer to each failure by its figure in Appendix B and its row in your results table in Appendix A. Say how the other members' tools did on the same image, and explain whether the mistake is shared by other tools or only this tool's, and what that suggests. If the tool made no mistakes, pick one image from your table, compare how the other tools did on it, and explain why your results do not prove the tool is reliable on other images. |
| Recommendation and reflection | Support your recommendation with at least one number from your results and at least one of your terms of service answers, and say how each one supports your choice. In your reflection, tie each cost to at least one specific error from your own results. If your results have no error of one kind, say so, and use an image from your table to explain what that error would have cost. |

### Part B rubric <!-- {docsify-ignore} -->

Use this rubric to check your work before you submit. Part B is out of 100 points across five
criteria. In Canvas, Project 1B (Group) is out of 85 points: your Dataset criterion (15 points) was
marked when your TA signed off your dataset, and it has its own Canvas column, Project 1B - Dataset
(Group). Your TA places each criterion in one of the four bands described in
[How this is graded](#how-this-is-graded), starts at the top of that band, and takes points off for
mistakes within it. The deep dive is worth the most points, so plan the most time for it. The
Exceeds Expectations row of each table summarizes that criterion's
[Going further](#going-further-in-part-b) items.

| Criterion | Points |
| :-- | :--: |
| 1. Dataset | 15 |
| 2. Tools and terms of service | 20 |
| 3. Results | 20 |
| 4. Deep dive into one tool | 25 |
| 5. Recommendation and reflection | 20 |
| Total | 100 |

#### 1. Dataset (15 points)

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

#### 2. Tools and terms of service (20 points)

| Band | Starts at | What your work shows |
| :-- | :--: | :-- |
| Exceeds Expectations (A+) | 20 | Everything in Meets Expectations, plus a quote, its section and a highlighted screenshot for every terms of service answer, or a screenshot of where you looked when the policy does not answer. |
| Meets Expectations (A-, A) | 17.5 | One tool entry per group member, each for a different tool and with the member's name. Each entry has the tool's cost, availability, claims, reputation and your reason for use, a link to the terms of service you read, and an answer to each of the three questions. |
| Approaches Expectations (B- to B+) | 15.5 | One member's entry is missing, or the same gap appears in two or more entries. For example, one of the five things, the terms of service link, or an answer that addresses its question is missing from two or more entries. |
| Not Within Expectations (C+ and below) | 13 | Entries are missing for two or more members, or the five things or the three questions are missing from most entries. |

#### 3. Results (20 points)

| Band | Starts at | What your work shows |
| :-- | :--: | :-- |
| Exceeds Expectations (A+) | 20 | Everything in Meets Expectations, plus, for one tool that gives a percentage, how many verdicts would change if the cut-off moved 10 percentage points higher or lower, and whether those changes fix or create mistakes. |
| Meets Expectations (A-, A) | 17.5 | One results table in Appendix A covering every image and every member's tool. Each image has its real or AI-generated label recorded once, and each result records the verdict and the confidence score if the tool gives one. If a tool refuses an image, recording the refusal counts as a result. For tools that give a percentage rather than a verdict, your cut-off is written down and used the same way throughout. Appendix B has 2 to 3 screenshots of each member's results, including at least one mistake if their tool made one, each showing your computer clock. |
| Approaches Expectations (B- to B+) | 15.5 | More than one result in ten is missing, the table records only "correct" or "incorrect" instead of the verdicts, a member's tool has no screenshots, or none of the screenshots show the clock. |
| Not Within Expectations (C+ and below) | 13 | Results are missing for at least one tool or for most images, or there are no screenshots. |

#### 4. Deep dive into one tool (25 points)

| Band | Starts at | What your work shows |
| :-- | :--: | :-- |
| Exceeds Expectations (A+) | 25 | Everything in Meets Expectations, plus, for every image the tool got wrong, the feature that most likely misled it, marked on its Appendix B screenshot and explained. Every failure is referred to by its figure in Appendix B and its row in Appendix A, with how the other tools did on the same image and whether the mistake was shared. If the tool made no mistakes, one image compared across tools instead. |
| Meets Expectations (A-, A) | 22 | Appendix B has the tool's result on every image: a screenshot showing your computer clock, labelled with what the image actually is, with at least one feature marked and what it suggests. The deep dive covers how the tool says it works, how it performed on your dataset, where it failed, and whether there was a pattern to its mistakes. Each point is made using [PEEL](#making-an-argument-with-peel), and the evidence comes from your own results. If the tool made no mistakes, you say so and explain what you would need to test to find one. |
| Approaches Expectations (B- to B+) | 19.5 | All four parts are there, but at least one is missing its explanation or evidence, or some images are missing from Appendix B. For example, failures are listed but not explained, a pattern is claimed without results to back it up, how the tool works is described without connecting it to your results, or the tool made no mistakes and you do not explain what you would need to test to find one. |
| Not Within Expectations (C+ and below) | 16.5 | One or more of the four parts is missing, or the section describes the tool without using your results. |

#### 5. Recommendation and reflection (20 points)

| Band | Starts at | What your work shows |
| :-- | :--: | :-- |
| Exceeds Expectations (A+) | 20 | Everything in Meets Expectations, plus a recommendation backed by a number from your results and a terms of service answer, each explained, and a reflection that ties each cost to a specific error from your results, or to an image from your table if that kind of error did not happen. |
| Meets Expectations (A-, A) | 17.5 | You recommend one of the tools you tested to your family and say why. Your reflection says what it costs when a tool wrongly says an image is AI-generated, what it costs when it wrongly says an image is real, and who pays in each case. A cost can be money, time, trust or reputation. |
| Approaches Expectations (B- to B+) | 15.5 | The recommendation gives no reason or is for a tool you did not test, or the reflection covers only one kind of error, or it does not say who pays. |
| Not Within Expectations (C+ and below) | 13 | The recommendation or the reflection is missing, or the reflection only defines the two kinds of error. |

---

## Part C: Algorithmic Bias Case Study

Part C is group work, worth 10%. There is a working block for it in [Lab 5](labs.md), and its
deadline is in [What you hand in](#what-you-hand-in).

Algorithmic systems are already making decisions that change people's lives: who gets a loan, who
gets flagged at a border, whose exam grade is revised downward. When one of them gets it badly
wrong, the people affected rarely find out why. Part C is where you work out why, for one real
case that has been documented properly.

It's the largest piece of Project 1, and it has two deliverables:

| Deliverable | What it covers |
| :---------- | :------------- |
| A written report | The facts: what the system was, what data it used, how it decided, what happened, and your sources |
| A recorded video | The argument: who it affected, which of Benjamin's categories fits and the reading against it, the mechanism, and whether they should change it |

The split is deliberate: the report sets out the facts of the case, while the video is where you
explain your reasoning out loud, in your own words. That is a harder skill than writing it down,
and it is why the video carries most of the marks.

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
- Write a short report with the facts of the case and your sources
- Name the mechanism, using vocabulary from the course
- Argue for a reading of the case that you do not agree with
- Record the video, with every group member on camera and speaking
- Check that every source you cite is real before you submit
- Write your own two AI disclosures on the cover page, one for the report and one for the video

<details>
<summary>Choosing a case</summary>

Your case needs to:

- Be connected to Canada or to a country in Asia
- Be chosen after the Algorithmic Bias lecture on October 14, which gives you Ruha Benjamin's
  four categories. Your video is built around them
- Be proposed in Pre-lab 5 on [PrairieLearn](https://us.prairielearn.com/pl/course_instance/222208/).
  Each member proposes a different case
- Be documented, meaning there is a regulator's report, a court filing, or investigative
  journalism about it. A blog post asserting that something happened is not enough

> [!WARNING]
> If you can't find a regulator's finding, a court document or an official statement, your case
> may not be documented well enough to use. Talk to your TA early, not in the final week.

No two groups in the same lab section can take the same case. The teaching team checks every
Pre-lab 5 case before Lab 5, and lets your group know which of its cases are taken:

1. If two groups in your section propose the same case, the group whose member submitted it first
   keeps it.
2. Cases submitted after the Pre-lab 5 deadline are checked after the ones submitted on time.
3. Your group brings its remaining cases to Lab 5 and picks one there.

The Pre-lab 5 deadline is in the [What you hand in](#what-you-hand-in) table. It is earlier than
the usual pre-lab deadline so the teaching team has Tuesday to check the cases.

</details>

<details>
<summary>The report</summary>

The report sets out the facts. Fill in every section, using bullet points wherever they are clearer
than prose. Sections 1 to 4 should fit in 2 to 3 pages. Your cover page, sources list and any
appendix do not count toward that limit.

Start with a cover page. It must include:

- Your case name and its country
- The date you submit
- Every member's full name and student number
- The link to your video
- Every member's two AI disclosures, one for the report and one for the video

[Using AI in Part C](#using-ai-in-part-c) explains the disclosures and shows an example cover page.

1. What happened. One paragraph covering what the system was, who used it, and what went wrong.
   Write it so that someone who has never heard of the case can follow it.
2. Input. What data went into the system, where that data came from, and whether the people it
   described agreed to it being used this way.
3. Decision logic. What the system did with that data to reach a result. You do not need the
   source code. "A submitted photo is compared against a database of scraped photos to identify a
   person" is the right level of detail.
4. Outcome. What happened, and to whom. Include any response, such as a regulator's finding, a
   court ruling or a change by the company.
5. Sources. At least three, of which at least two are primary. News coverage of a single event
   counts as one source, not three. List them in one citation style, and write the name of the
   style at the top of the list. We recommend IEEE or ACM, the styles computer science uses, and
   APA or MLA are also fine. UBC Library's [How to Cite](https://guides.library.ubc.ca/howtocite)
   guide explains each style, with full guides for [APA](https://guides.library.ubc.ca/apacitationstyle)
   and [MLA](https://guides.library.ubc.ca/MLAHome). ACM's format is on
   [ACM's site](https://www.acm.org/publications/authors/reference-formatting).

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

The second version explains how the harm kept itself going. Groups usually leave this part
unfinished because they describe what happened without explaining the process behind it.

</details>

<details>
<summary>Why the alternative reading is required</summary>

If a case seems to have only one defensible reading, nobody has looked at it closely enough.

Clearview AI reads most easily as coded exposure, since it's a surveillance system. It also reads
as default discrimination, because the RCMP never checked whether the data was collected legally.
Both can be argued, and an argument that mentions only the easier one is weaker for it.

If your group genuinely disagrees about which category fits, that's useful rather than a problem,
so present both readings. The categories part of your video exists for exactly that, and a real
disagreement makes a stronger argument than a forced agreement.

</details>

### The video

The video is where your group explains its reasoning out loud, in your own words. It carries most
of the marks for Part C, so plan, practise and record it with care.

Do not read the report aloud. We read the report ourselves. The video covers four parts, and each
one builds on the facts in your report:

1. Stakeholders. At least three stakeholders, each with one positive and one negative effect.
   Every system benefits someone, so if you cannot find a single positive effect anywhere, look
   again. A table on a slide helps.
2. Benjamin's categories. Which of the four fits your case best? Say why, pointing to specific
   facts from report sections 2 to 4. Then give a reading that someone else could reasonably argue
   for, and explain what they would base it on. This part is required.

   | Category | What it means |
   | :------- | :------------ |
   | Engineered inequity | Unequal outcomes by design, or deliberate targeting |
   | Default discrimination | Nobody intended harm. It followed from indifference and from defaults nobody examined |
   | Coded exposure | Being made visible to a system without consenting to it |
   | Technological benevolence | Presented as helping people who are disadvantaged, while the real purpose is extracting something from them |

3. The mechanism. Name the concept from the course that your case turns on, and explain how it
   produced the harm. This part does more than any other to separate a strong video from a
   summary, so give it the time it needs.
4. Should they change it? Give one argument for changing the system and one against, both based
   on a real trade-off rather than an easy target.

Use your sources as evidence while you speak. Name the source, for example "the privacy
commissioner's report", or show it on a slide.

Every group member speaks, and each of you gets up to 2 minutes. A group of five therefore has up
to 10 minutes in total, and a group of four has up to 8. Split the four parts across your group.
In a group of five, one member can introduce the case from your report and tie the parts together
at the end. Decide who covers what before you start recording.

#### How to record it <!-- {docsify-ignore} -->

These rules exist because the video is where you show your own understanding. Your face and your
own words make that visible.

- Every member is on camera while they speak, with their face visible. A voice over slides is not
  enough. If you cannot appear on camera for an accessibility, safety or privacy reason, tell your
  TA before you record, and this rule will not apply to you.
- Speak, do not read. A few words of notes are fine. Reading sentences word for word from a
  script, the report or your slides puts your delivery, and the part you cover, in Approaches
  Expectations.
- Make every word easy to hear. Record somewhere quiet, keep the microphone close, and test the
  sound before you record the whole video.
- Do not speed up the recording to fit the time limit. Cut what you say instead.
- Practise together before you record. A video that runs without restarts or long pauses, with
  each speaker picking up from the one before, is what reaches Exceeds Expectations.

> [!WARNING]
> The video is covered by the
> [AI Policy](ai-policy.md#independent-assessments-have-strict-boundaries). You need to explain
> your work and your group's decisions yourself. Do not read from a script an AI tool wrote, and do
> not use AI-generated voices or avatars instead of speaking.
>
> AI can help you prepare, within what the policy allows, but you need to understand everything
> you say.

The teaching team may follow up with questions about your video. Every member should be able to
answer about any part of it, not only their own section.

#### Where to record and what to borrow <!-- {docsify-ignore} -->

You do not need special equipment. A phone on a steady surface in a quiet room is enough. If you
want better sound or a steadier picture, UBC lends equipment and rooms to students for free.

- Rooms: book a group study room at Koerner, Irving K. Barber (IKB), Woodward, or the Music, Art
  and Architecture Library through [Group and Silent Study Spaces](https://services.library.ubc.ca/facilities/group-silent-study-space/).
  The [Digital Media Rooms](https://maa.library.ubc.ca/facilities-technology/dmr/) on IKB level 3
  are quieter and seat 5, for groups of 3 or more. Ask at the desk whether you may record there.
  The [DIY Media Studio](https://learningcommons.ubc.ca/tech-support/diy-media-studio/), also on
  IKB level 3, has microphones and a video camera, but it fits only 2 people.
- Equipment: borrow with your UBC card at the Chapman Learning Commons help desk, IKB level 3.
  [Microphones](https://learningcommons.ubc.ca/borrow-equipment/microphones-recording-devices/)
  include a lavalier mic that clips on and works with a phone, a USB mic and a wireless lapel kit,
  on 1-day loans. [Cameras and tripods](https://learningcommons.ubc.ca/borrow-equipment/cameras-camcorder/)
  include camcorders and full tripods, and a smartphone tripod kit is also available. Late items
  cost $5 a day. UBC does not lend webcams, but a phone camera on a tripod works well. The
  [Technology Borrowing](https://services.library.ubc.ca/computers-technology/technology-borrowing/)
  page lists everything and the loan times.
- Recording remotely: hold a Zoom or Microsoft Teams call and record it. A free Zoom meeting lasts
  up to 40 minutes, which is plenty for a video of up to 10 minutes. A Teams recording saves to the
  OneDrive of the person who pressed record, so remove its expiry date to keep the link working.
  See the [Zoom student guide](https://ltic.ubc.ca/lt-hub/guides/zoom-student-guide/) and the
  [Microsoft Teams guide](https://lthub.ubc.ca/guides/microsoft-teams-guide/).
- Guides: [Recording 101](https://learningcommons.ubc.ca/recording-101/) covers sound and speaking
  tips, and [DIY Media @ UBC](https://diy.open.ubc.ca/video/) covers planning and making a video.

#### Submitting your video <!-- {docsify-ignore} -->

Upload your video and put its link on your report's cover page. Use one of these:

- UBC OneDrive, which we recommend: share the video with people at UBC. The
  [OneDrive student guide](https://lthub.ubc.ca/guides/microsoft-onedrive-student-guide/) shows how
- Google Drive: set the link so that anyone with the link can view
- YouTube: upload it as unlisted, not public and not private

> [!WARNING]
> Check the link before you submit. Ask a group member who did not upload the video to open it,
> and make sure it plays all the way through.
>
> If the link does not work when your TA opens it, 5 points come off your report and video score,
> and your TA emails every member of your group. Reply to that email with a working link. Another 5
> points come off for every 12 hours, or part of 12 hours, until your reply arrives. The most a
> broken link can cost is 35 points: if you never send a working link, your video cannot be marked,
> and you lose its 35 points instead. Check your UBC email after you submit.
>
> Keep the video and its link available until your Part C grade is returned.

<!-- TODO: instructor decision required. Whether to require automatic captions on the video. -->

### What you need to hand in <!-- {docsify-ignore} -->

Hand in your report as one PDF, in one submission to Project 1C (Group) on Canvas. One member
submits for the whole group. Your group needs:

- The written report: a cover page, then sections 1 to 4 in 2 to 3 pages, then your sources
- Two AI disclosures from every member on the cover page, one for the report and one for the video
- At least three sources, of which at least two are primary, all of them checked and listed in one
  citation style that you name at the top of the list
- A recorded video, linked on your cover page, with every member on camera and speaking, up to 2
  minutes each, covering the four parts
- The four parts of the video make their points using [PEEL](#making-an-argument-with-peel), with
  your sources as evidence
- A case connected to Canada or a country in Asia

### Using AI in Part C <!-- {docsify-ignore} -->

Every member must write two AI disclosures on the cover page: one for the report and one for the
video. Each disclosure covers your own part of the work. Copy the one line below that is true for
you, as it is written.

For the report:

| | Line to copy |
| :-: | :----------- |
| 🟢 | Report AI use: Green. I did not use AI for my part of the report. |
| 🟡 | Report AI use: Yellow. I used AI to find or understand sources, or to check my wording, but everything I wrote is in my own words. |
| 🔴 | Report AI use: Red. AI wrote some of my part of the report. |

For the video:

| | Line to copy |
| :-: | :----------- |
| 🟢 | Video AI use: Green. I did not use AI to prepare my part of the video. |
| 🟡 | Video AI use: Yellow. I used AI for my part of the video, for example to edit it or to help with my script, but I chose what to say and said it in my own words. |
| 🔴 | Video AI use: Red. AI made some of what I showed in my part of the video, for example a slide or an image. |

If you choose Yellow or Red, add one or two sentences under that line: which tool you used, what it
did, and how you checked its output.

No colour costs marks on its own. Your work is graded on the [rubric](#part-c-rubric), whichever
lines you choose, and choosing honestly is what the
[AI Policy](ai-policy.md#be-transparent-about-ai-use) asks of you. A missing or incomplete
disclosure does cost your group marks, as explained in [AI disclosures](#ai-disclosures).

The [video rules](#how-to-record-it) apply whichever line you choose. Do not read from a script an
AI tool wrote, and do not use AI-generated voices or avatars.

Here is an example cover page for a group of four. Your cover page needs the same items.

```text
Case: Clearview AI and the RCMP
Country: Canada
Date: October 27, 2026
Video: (your OneDrive, Google Drive or YouTube link)

Group members
Sam Lee, 12345678
Priya Singh, 23456789
Alex Chen, 34567890
Jordan Tremblay, 45678901

AI disclosures

Sam Lee
Report AI use: Green. I did not use AI for my part of the report.
Video AI use: Green. I did not use AI to prepare my part of the video.

Priya Singh
Report AI use: Yellow. I used AI to find or understand sources, or to
check my wording, but everything I wrote is in my own words.
Microsoft Copilot explained the privacy commissioner's findings in
plainer words. I checked its summary against the report (Source 1).
Video AI use: Green. I did not use AI to prepare my part of the video.

Alex Chen
Report AI use: Green. I did not use AI for my part of the report.
Video AI use: Red. AI made some of what I showed in my part of the
video, for example a slide or an image.
Canva's Magic Design laid out my stakeholder slide. I checked that
every effect on the slide matches section 4 of our report.

Jordan Tremblay
Report AI use: Yellow. I used AI to find or understand sources, or to
check my wording, but everything I wrote is in my own words.
ChatGPT suggested shorter wording for section 3. I kept only the
changes that still matched Source 2.
Video AI use: Yellow. I used AI for my part of the video, for example to
edit it or to help with my script, but I chose what to say and said it
in my own words.
Clipchamp added captions to my part, and I fixed two words it got
wrong. ChatGPT suggested a clearer order for the points in my script,
and I checked each point against our report.
```

### Where you have a choice <!-- {docsify-ignore} -->

- Your case, within the limits above
- Which of Benjamin's categories you argue for, and which you argue against
- Which mechanism you name, if more than one fits. Say so if several do
- How you present the video: slides or a screen recording can sit alongside your faces, as long as
  each speaker is on camera while speaking
- How you divide up the speaking, as long as everyone speaks

### Going further in Part C <!-- {docsify-ignore} -->

To reach the A+ / Exceeds Expectations category on a criterion, do everything it asks for at
Meets Expectations, plus every item listed for it below.

| Criterion | To reach Exceeds Expectations, also do this |
| :-- | :-- |
| Case and sources | After every fact in report sections 2 to 4, say which of your sources it comes from, for example "(Source 2)". |
| The facts of the case | In section 2 or 3, state at least one thing about the system that is not public, and say where you looked for it. |
| Stakeholders | Include at least one stakeholder who neither runs the system nor has decisions made about them by it, such as a regulator, a bystander or the public. |
| Benjamin's categories | Name at least one fact from report sections 2 to 4 that gives stronger support to one reading than the other. Use it to explain why your reading wins, or why both readings hold. |
| The mechanism | Add a counterfactual: if one specific part of the system were removed or changed, which part of the harm would not have happened, and why. |
| Should they change it? | For each of your two arguments, name who gains and who loses, using the stakeholders from your video. |
| Delivery | Practise until the video runs without restarts, long pauses or anyone looking down to read. Plan the handovers: each speaker explains, at least once, how a specific point another speaker made supports, challenges or builds on their own. Handing over to the next speaker does not count. Appear together at least once, in one room or one video call, and speak to the camera with energy. For example: "This is the feedback loop Sam described, and it is also why the alternative reading falls short." |

### Part C rubric <!-- {docsify-ignore} -->

Use this rubric to check your report and video before you submit. They are marked out of 100
points across seven criteria, the same way as Part B, and that score is 90% of Part C. The report
is worth 22 points and the video 78, so plan and practise the video early. The Exceeds Expectations
row of each table summarizes that criterion's [Going further](#going-further-in-part-c) items.

The other 10% of Part C is your stand-ups (5%) and the retrospective (5%), and your peer evaluation
multiplier applies to all of Part C. The [grade breakdown](project.md#your-individual-part-c-mark)
shows how the pieces add up.

| Criterion | Marked from | Points |
| :-- | :-- | :--: |
| 1. Case and sources | Report | 10 |
| 2. The facts of the case: sections 1 to 4 | Report | 12 |
| 3. Stakeholders | Video | 10 |
| 4. Benjamin's categories | Video | 15 |
| 5. The mechanism | Video | 20 |
| 6. Should they change it? | Video | 10 |
| 7. Delivery | Video | 23 |
| Total | | 100 |

If your video link does not work when your TA opens it, points come off this score until you send a
working link. See [Submitting your video](#submitting-your-video).

If any member's AI disclosure is missing or incomplete, this score has a limit. See
[AI disclosures](#ai-disclosures).

Criteria 3 to 6 are marked from what is said in the video. If a speaker reads their part word for
word, both Delivery and the criterion for the part they covered drop to Approaches Expectations.

#### 1. Case and sources (10 points)

| Band | Starts at | What your work shows |
| :-- | :--: | :-- |
| Exceeds Expectations (A+) | 10 | Everything in Meets Expectations, plus a source named after every fact in report sections 2 to 4. |
| Meets Expectations (A-, A) | 8.5 | The case is connected to Canada or a country in Asia, and is documented by a regulator's report, a court filing or investigative journalism. Section 5 lists at least three sources, at least two of them primary, with news coverage of one event counted as one source. The list uses one citation style, named at the top of the list. |
| Approaches Expectations (B- to B+) | 7.5 | The case is in scope, but the sources fall short once news coverage of one event is counted as one source. For example, there are only two sources, or fewer than two are primary. Extra coverage beyond the requirement does not lower the band. |
| Not Within Expectations (C+ and below) | 6.5 | The case is outside the scope or is documented only by blog posts or a single news story, or there are fewer than two sources. |

A source that does not exist, or that does not say what you claim, is not marked here. It is
handled under [Academic integrity](#academic-integrity).

#### 2. The facts of the case: sections 1 to 4 (12 points)

| Band | Starts at | What your work shows |
| :-- | :--: | :-- |
| Exceeds Expectations (A+) | 12 | Everything in Meets Expectations, plus at least one thing that is not public with where you looked for it. |
| Meets Expectations (A-, A) | 10.5 | All four sections are filled in, in 3 pages or fewer. Someone new to the case can follow section 1. Section 2 says what data went in, where it came from, and whether the people it described agreed. Section 3 explains what the system did with that data, at the level of the example in the report instructions. Section 4 says what happened, to whom, and any response. |
| Approaches Expectations (B- to B+) | 9 | All four sections are there, but one is missing something it asks for. For example, section 2 does not say where the data came from or whether people agreed, or section 3 says only that the system used the data to decide. |
| Not Within Expectations (C+ and below) | 8 | A section is missing. |

#### 3. Stakeholders (10 points)

| Band | Starts at | What your work shows |
| :-- | :--: | :-- |
| Exceeds Expectations (A+) | 10 | Everything in Meets Expectations, plus a stakeholder who neither runs the system nor has decisions made about them by it. |
| Meets Expectations (A-, A) | 8.5 | The video names at least three stakeholders, each with one positive and one negative effect, backed by facts from your report or sources. Each point uses PEEL. |
| Approaches Expectations (B- to B+) | 7.5 | Two or more stakeholders are missing a positive or a negative effect, or the effects are stated without facts behind them. |
| Not Within Expectations (C+ and below) | 6.5 | There are fewer than three stakeholders. |

#### 4. Benjamin's categories (15 points)

| Band | Starts at | What your work shows |
| :-- | :--: | :-- |
| Exceeds Expectations (A+) | 15 | Everything in Meets Expectations, plus a fact that supports one reading more strongly than the other, used to explain why your reading wins or why both hold. |
| Meets Expectations (A-, A) | 13 | You name the category that fits best and support it with specific facts from report sections 2 to 4. You give an alternative reading that someone could reasonably argue for, and say what it would be based on. Each point uses PEEL. |
| Approaches Expectations (B- to B+) | 11.5 | At least one fact from the case supports the category, but the explanation of why it fits is incomplete, or the alternative reading is named without saying what it would be based on, or it is a reading nobody could reasonably argue. |
| Not Within Expectations (C+ and below) | 10 | No fact from the case supports the category (for example, only its definition is given), or there is no alternative reading. |

#### 5. The mechanism (20 points)

| Band | Starts at | What your work shows |
| :-- | :--: | :-- |
| Exceeds Expectations (A+) | 20 | Everything in Meets Expectations, plus a counterfactual: one specific change to the system, which part of the harm it would have prevented, and why. |
| Meets Expectations (A-, A) | 17.5 | You name a concept from the course list under "What naming the mechanism means" and explain how it produced the harm in your case: the process, not only the outcome. If more than one concept fits, you say so. Each point uses PEEL. |
| Approaches Expectations (B- to B+) | 15.5 | A concept is named and defined, but the link to the harm in your case is implied rather than explained, or the explanation describes the outcome instead of the process. |
| Not Within Expectations (C+ and below) | 13 | No concept from the course is named, or the concept does not match what happened in the case. |

#### 6. Should they change it? (10 points)

| Band | Starts at | What your work shows |
| :-- | :--: | :-- |
| Exceeds Expectations (A+) | 10 | Everything in Meets Expectations, plus who gains and who loses from each argument, using your stakeholders. |
| Meets Expectations (A-, A) | 8.5 | One argument for changing the system and one against. Each names a specific benefit or cost in your case and explains why it matters, rather than an easy target. Each point uses PEEL. |
| Approaches Expectations (B- to B+) | 7.5 | Both arguments are there, but at least one does not name a specific benefit or cost in your case, or is an easy target. |
| Not Within Expectations (C+ and below) | 6.5 | One of the two arguments is missing. |

#### 7. Delivery (23 points)

| Band | Starts at | What your work shows |
| :-- | :--: | :-- |
| Exceeds Expectations (A+) | 23 | Everything in Meets Expectations, plus a well-practised video: no restarts, long pauses or anyone looking down to read, every speaker picking up a specific point from another, the whole group on screen together at least once, and every speaker talking to the camera with energy. |
| Meets Expectations (A-, A) | 20 | Every group member speaks, for up to 2 minutes each, and is on camera with their face visible while speaking. The video covers all four parts. Each speaker explains in their own words, from a few words of notes at most, within the [AI Policy](ai-policy.md#independent-assessments-have-strict-boundaries), and every word is easy to hear. |
| Approaches Expectations (B- to B+) | 18 | At least one of these happens: a speaker reads from a script, the report or slides; a speaker is not on camera, unless your TA approved an exception; parts are hard to hear; a member does not speak; or the video or any one speaker runs more than 30 seconds over the time limit. |
| Not Within Expectations (C+ and below) | 15 | Most of the video is read aloud, or most speakers are not on camera. |

---

## Working as a group

> [!WARNING]
> Please read this section carefully. Students lose marks here more often than anywhere else in
> the project, and usually because they forgot rather than because it was hard.

Three things run alongside the project parts: weekly stand-ups, a retrospective, and peer
evaluation. All three affect your individual grade. In Part C, your group's
[AI disclosures](#ai-disclosures) also affect your group grade.

### Weekly stand-ups

A stand-up is a short post of three or four sentences, once a week, answering three questions:

- What did I do?
- What am I doing next?
- What is holding me up?

That's the whole thing, and plenty of software teams work this way. The point is to catch problems
early, while there's still time to do something about them.

How it works:

- Stand-ups are due every Friday. The [stand-up schedule](#stand-up-schedule) below lists each date and time
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

### AI disclosures

Before your group submits Part C, check that the cover page has two AI disclosures from every
member, one for the report and one for the video. [Using AI in Part C](#using-ai-in-part-c) shows
what to write.

A member's disclosures are incomplete if either line is missing, or if a Yellow or Red line has no
sentences saying which tool, what it did and how they checked it.

The disclosures earn no points. If any are incomplete, your TA lowers your group's report and video
score, the 90% of Part C, to the highest score in this table:

| Members with incomplete disclosures | Highest report and video score |
| :-- | :--: |
| None | 100 points (A+) |
| One | 89 points (A) |
| More than one | 75 points (B) |

For example, if your group's report and video earns 94 points and one member's video line is
missing, your score becomes 89. Your TA applies the limit first, then any
[broken link](#submitting-your-video) deduction.

The limit applies to the whole group, so one member's missing line costs every member the same.

### Peer evaluation

> [!WARNING]
> Peer evaluation is what makes your individual grade differ from your teammates' grades.
>
> Your teammates rate your contribution to Parts B and C, so how you work with your group in Part B
> counts too. Their ratings become a multiplier on your whole Part C mark, the heaviest part of each
> project. Parts A and B are not multiplied.
>
> The full mechanics, criteria and formula are on the
> [Project Peer Evaluation](project-peer-evaluation.md) page. Read it before iPeer 1, whose
> deadline is in [What you hand in](#what-you-hand-in).

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

### Making an argument with PEEL <!-- {docsify-ignore} -->

Use PEEL for every point you make in the Part B deep dive, and in the four parts of the Part C
video. It builds each point so that a reader can check it, and your TA will look for all four
steps.

| Step | What it does |
| :-- | :-- |
| Point | Say the claim you are making, in one sentence |
| Evidence | Give the specific fact that supports it: a result from your table, or a fact from your case |
| Explain | Say how that evidence supports your point |
| Link | Connect the point back to your question: your recommendation, your category, or your mechanism |

Here is one point from a Part B deep dive, written with PEEL:

> Point: Tool X struggles with lightly edited photos.
>
> Evidence: It labelled both of our edited camera photos, rows 5 and 9 in our results table, as
> AI-generated, at 92% and 88%.
>
> Explain: Tool X says it looks for unusually smooth textures, and colour correction can smooth
> textures, which may be why both edited photos were flagged.
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
> Some submissions are exceptions: a late one is still required, and it costs marks instead. These
> are the [group contract](project.md#group-contract), [stand-ups](#weekly-stand-ups),
> [retrospectives](project.md#retrospectives) and
> [peer evaluations](project-peer-evaluation.md#late-peer-evaluations).
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
