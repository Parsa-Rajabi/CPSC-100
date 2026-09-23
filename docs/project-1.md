# Project 1: From Data to Decisions

> [!NOTE]
> This page isn't finished yet, but everything below is solid enough to plan around. Please read
> it now. Three things are still to come:
>
> - The grading rubric, including how each part is marked
> - How to disclose your AI use: the process and the form to use
> - The exact submission location for Part A
>
> The schedule below is tentative and may still change, though most of it will be settled by
> Wednesday, September 23. Anything that moves gets recorded in the changelog.

## Changelog

| Date | Update |
| :--: | :----- |
| *Sept 22* | Added dataset Requirements for Part 1B, project resources added |

---

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
| A | Your digital footprint | Individual | 1% | End of your Lab 3 hour, Oct 7 or 8 |
| B | The AI detector experiment | Starts individual, becomes group | 4% | Tue Oct 20 |
| C | Algorithmic bias case study | Group | 10% | Tue Oct 27 |

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
|  A   | A short individual reflection, your two scores, and your code annotations | *TBD*  |
|  B   | Two documents: your image dataset, and your evaluation                    | Canvas |
|  C   | A written report using the 9-section template, and a recorded video       | Canvas |

Along the way you will also submit:

- Your image dataset, for TA sign-off, on Thursday October 1
- A stand-up post on Ed Discussion, every Friday from October 2 onward
- A peer evaluation in iPeer, and a group retrospective, after Part C


---

## The flow

> [!NOTE]
> This schedule is tentative and may still change, though most of it will be settled by
> Wednesday, September 23. Lab dates, rooms and section times are on the [Labs](labs.md) page.

| Week | Lab | What happens | Due that week |
| :--: | :-: | :----------- | :------------ |
| 2 | Lab 1 | Project introduced. Groups start forming. | Group formation survey, Fri Sep 18 |
| 3 | Lab 2 | Snap! programming. Start looking for images. | [Group contract](project.md#group-contract), Thu Sep 24 |
| 4 | *no lab* | Independent work. Truth and Reconciliation Day. | Image dataset for TA sign-off, Thu Oct 1<br>[Peer evaluation practice round](project-peer-evaluation.md), Thu Oct 1<br>First stand-up, a practice round, Fri Oct 2 |
| 5 | Lab 3 | Part A runs in lab, start to finish. | Part A, end of your lab hour<br>Graded stand-ups begin Fri Oct 9 |
| 6 | Lab 4 | Working block for Part B. | |
| 7 | Lab 5 | Working block for Part C. | Part B, Tue Oct 20 |
| 8 | Lab 6 | Project 2 begins. | Part C, Tue Oct 27<br>Retrospective and [iPeer 1](project-peer-evaluation.md) |

Three things to notice:

- Week 4 has no lab, but your dataset is due that week. Lab 2 in Week 3 is your last scheduled
  group time before then, so use it.
- Part A is finished and handed in during the lab hour. That's why it's only worth 1%, and why
  you aren't expected to work on it at home.
- Part C can't really start before October 14. The Algorithmic Bias lecture that day gives you
  the framework the report is built around, so Week 6 isn't free time.

<details>
<summary>Roughly how long each part takes</summary>

Hour estimates for each part are still being worked out, and they'll be added here once they're
settled.

What we can tell you now is the shape of it. Part A is finished inside the lab hour, so it needs
no time outside lab at all. Part B's hours are spread thinly across several weeks, and most of
that is collecting images. Part C's are concentrated into two weeks, and it's the biggest of the
three.

<!-- TODO: instructor decision required. Time estimates left as TBD at your request. The earlier
draft figures were A 1 hour, B 7 to 8, C 3 to 4, which predate the 1/4/10 weighting; my revision
was A 0, B 5 to 6, C 6 to 8. Neither is confirmed. -->

</details>

---

## Part A: Your Digital Footprint

Part A is individual work, worth 1%, and it runs in [Lab 3](labs.md) on October 7 and 8. It's due
at the end of your lab hour.

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

### What you will do

- Fill in your Pre-lab 3 answer sheet beforehand, so that round 2 uses the same answers as
  round 1 rather than a second guess
- Run the calculator with the starting weights and write down your round 1 score
- Annotate three parts of the script in your own words
- Take part in the class vote on the weights
- Run the calculator again with the same answers and write down your round 2 score
- Compare with a partner, then get checked off by your TA

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

### What you need to hand in

- Your round 1 and round 2 scores, and which factor's weight change moved your score most
- Your three annotations
- Answers to the four reflection questions below
- Your own work, written by you

<details>
<summary>The four reflection questions</summary>

1. Which factors affected your score the most?
2. How did your score differ from your partner's, and what explains the difference?
3. Your answers did not change between the two rounds, but your score did. What does that tell
   you about what the Exposure Index actually measures?
4. Name one thing the calculator should have asked about but did not, and explain why it belongs.

Question 4 counts for the most, because it asks you to think past the tool itself.

</details>

### Where you have a choice

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

</details>

<!-- TODO: instructor decision required. Annotation count is three here, matching Lab 3's
PrairieLearn guide and its TA checkoff. The dev-repo draft says two. Confirm and align.

Factor count verified against CPSC-100-dev/labs/assets/lab3.xml: six weighted factors
(numPlatforms, oldestAccountYears, publicProfiles, personalInfoShared, photos, contentType),
reached through nine prompts of which seven or eight fire per student. Note that factorTier
defines a "childhood" tier that no prompt appears to reach, which may be a dead branch worth
checking before Lab 3 runs. -->

---

## Part B: The AI Detector Experiment

Part B starts as individual work and turns into group work. It's worth 4%, there's a working block
for it in [Lab 4](labs.md), and it's due on Tuesday October 20.

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

### What you will do

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
- Real-image 1: [Image 1](assets/project-resources/IMG_1.jpg)
- Real-image 2: [Image 2](assets/project-resources/IMG_2.jpg)
- AI-generated image 1: [Image 3](assets/project-resources/IMG_3.jpeg)
- AI-generated image 2: [Image 4](assets/project-resources/IMG_4.png)

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

### What you need to hand in

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
  failed, and whether there was a pattern to its mistakes
- A recommendation. Of the tools you tested, which one would you recommend to your family, and
  why?
- A short reflection. What does it cost when a tool wrongly says an image is AI-generated? What
  does it cost when it wrongly says an image is real? Who pays in each case?
- An appendix of screenshots of your results, each showing your computer clock

> [!NOTE]
> You don't need to copy out each tool's own explanation of its verdict. The verdict, the
> confidence score and what the image actually was is enough. If a tool says something surprising
> about why it decided as it did, put that in your closer look instead.

### Where you have a choice

- Which tools you test, beyond the minimum number
- Which tool you look at more closely. Choose the one that behaved most unusually, rather than
  the one that scored best
- How you divide the work. This is the one part of the project where splitting the work by tool,
  rather than by task, is clearly the right approach
- Where you set the cut-off for tools that give a percentage rather than a verdict, as long as
  you write down what you chose and use it consistently

<details>
<summary>If every tool gets everything right</summary>

That's a genuine result, and you should report it. Say so accurately, then explain what you'd need
to test to find a case where the tools do fail.

Reporting honestly that you found nothing, and explaining why, is better work than implying a
failure you didn't find.

</details>

---

## Part C: Algorithmic Bias Case Study

Part C is group work, worth 10%. There's a working block for it in [Lab 5](labs.md), and it's due
on Tuesday October 27.

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

### What you will do

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

### What you need to hand in

- The written report, all nine sections. A maximum page count will be announced later
- At least three sources, of which at least two are primary, and all of them checked
- A recorded video with every member speaking, up to 2 minutes each, covering sections 6, 7 and 8
- A case connected to Canada or a country in Asia, claimed on Ed Discussion

### Where you have a choice

- Your case, within the limits above
- Which of Benjamin's categories you argue for, and which you argue against
- Which mechanism you name, if more than one fits. Say so if several do
- How you present the video: slides, a screen recording, people speaking to camera, or a mix
- How you divide up the speaking, as long as everyone speaks

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

- The first stand-up is on Friday October 2, and it's a practice round
- Graded stand-ups begin on Friday October 9, and run every Friday after that
- They are due at 4:00pm each Friday
- You post in your own group's Ed Discussion channel
- Every member posts their own. One person can't post on behalf of the group

> [!NOTE]
> The first stand-up, on Friday October 2, isn't graded. Use it to check that your group's channel
> works, see what a stand-up actually looks like, and ask us about anything that's unclear. We'll
> sort out any problems that week, so that grading starts on October 9 with everyone knowing what
> they're doing.
>
> The peer evaluation practice round runs the day before, on Thursday October 1, for the same
> reason.

> [!NOTE]
> Posting publicly rather than emailing us means your group and your TA can both see it. Raising a
> problem in a stand-up is much easier than explaining in Week 7 why something never got done.
>
> Your stand-ups also build a record of your own contribution, which works in your favour when
> peer evaluation comes around.

> [!WARNING]
> From October 9 onward, stand-ups affect your individual grade as a multiplier. Missing one costs
> you marks, and so does posting one late. The exact deductions will be published with the rubric.

<details>
<summary>How the multipliers work together: a worked example</summary>

Your individual grade on a group part starts from your group's grade, then gets adjusted by your
own multipliers. That's why two people in the same group can end up with different marks.

Suppose your group scores 85% on Part C, and your peer evaluation multiplier is 0.95.

| Situation | Calculation | Your mark |
| :-------- | :---------- | :-------: |
| You posted every stand-up | 85 × 0.95 × 1.00 | 80.8% |
| You missed two stand-ups | 85 × 0.95 × 0.90 | 72.7% |

In this example, two missed stand-ups cost you about 8 percentage points on work your group had
already done well.

> [!NOTE]
> The 0.90 above is only an illustration, to show you how the calculation works. The actual
> deduction for a missed or late stand-up is still being decided, and will be published with the
> rubric.

</details>

<!-- TODO: instructor decision required. Stand-up penalty mechanics. You asked for a worked
example so students understand the cost, so one is given above with the per-miss figure marked
as illustrative. Three things to settle before the rubric ships:
  1. The actual deduction per missed stand-up, and per late one.
  2. Whether the stand-up multiplier applies to the whole project grade or to individual parts.
     The example above applies it to Part C, alongside the peer evaluation multiplier.
  3. Whether any stand-ups are dropped, in the way labs and quizzes allow a drop. -->

### Retrospectives

At the end of each project, your group writes a short retrospective together. It answers three
questions:

- What worked?
- What did not work?
- What will you change next time?

Completing it is part of your project grade. It doesn't need to be long, and it isn't a performance
review of anybody. It's the conversation that stops Project 2 repeating Project 1's mistakes.

The Project 1 retrospective is due at the same time as iPeer 1. There's guidance on running one on
the [Group Work Resources](group-work-resources.md#retrospectives-and-peer-evaluation) page.

### Peer evaluation

> [!WARNING]
> Peer evaluation is what makes your individual grade differ from your teammates' grades.
>
> It runs for Part 1C and Part 2C, the heaviest part of each project. Your teammates' ratings of
> your contribution become a multiplier, which is applied to your group's grade for that part.
>
> The full mechanics, criteria and formula are on the
> [Project Peer Evaluation](project-peer-evaluation.md) page. Read it before October 1.

In short:

- It runs in iPeer
- You evaluate each of your teammates, and each of them evaluates you
- Each evaluation is out of 30. Your multiplier is your average received score divided by 30
- Your individual mark is your group mark multiplied by your multiplier

So a group grade of 90% with a multiplier of 0.875 gives you 78.75%, on work the whole group
submitted together.

There's a practice round first, due Thursday October 1. It isn't graded, and it's there so
everyone understands the process before it starts counting.

> [!NOTE]
> Write your evaluations carefully. Vague comments like "good job" or "did not help" can cost you
> marks. Comments are shared with your group anonymously, so write about specific behaviour and
> contributions, not personality.
>
> You may not use AI to write peer evaluation ratings or comments, including in the practice
> round.

<details>
<summary>If contribution in your group is uneven</summary>

By default everyone in a group gets the same grade. If lab records, stand-ups and peer evaluations
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

> [!NOTE]
> The rubric is still being finalized and will be released in the coming weeks.
>
> It will describe what successful work looks like for each part. Every criterion will match
> something this page has already asked for, so nothing new gets added to the requirements above.
>
> The process for disclosing AI use will be published at the same time.

What's already decided:

- Part A is graded individually and is not affected by peer evaluation
- Parts B and C receive a group grade
- Peer evaluation applies to Part C. See [Working as a group](#working-as-a-group)

> [!ATTENTION]
> Late work is not accepted on the project. Nothing submitted after a deadline is marked.
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
- Its final part, Part 2C, is a viva voce: a short oral exam, in person, where you demonstrate
  your program and answer questions about the decisions behind it
- The viva voce is a [passing requirement](syllabus.md#passing-criteria), so you have to attend
  and take part in person
- Peer evaluation applies to Part 2C, in the same way it applies to Part 1C

---

## Related pages

- [Project Peer Evaluation](project-peer-evaluation.md): the multiplier, the criteria and the formula
- [Project Overview](project.md): group contract, escalation, and both projects at a glance
- [Group Work Resources](group-work-resources.md): roles, communication, conflict, retrospectives
- [Labs](labs.md): Labs 1 to 5 support this project
- [AI Policy](ai-policy.md): what is required, what is permitted and what is not allowed
- [Schedule](schedule.md): the whole term in context
