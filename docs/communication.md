# Course Communication

Everything about how to reach the teaching team lives on this page. When in doubt, start with Ed Discussion.

> [!TIP]
> Sign up for the course discussion board using this link: *to be confirmed*. Make sure to use your UBC email address to sign up.

<!-- TODO: instructor decision required - Ed Discussion join link. A new join link is
     generated for each course instance; the 2024W2 link was
     https://edstem.org/us/join/PH2rqB and must not be reused. -->

## Where Should This Go?

<div class="cpsc-flow">
<svg viewBox="0 0 880 530" width="100%" role="img" aria-labelledby="flowTitle flowDesc" xmlns="http://www.w3.org/2000/svg">
  <title id="flowTitle">CPSC 100 communication routing flowchart</title>
  <desc id="flowDesc">Start with a question or concern. If it is not a personal matter, post publicly on Ed Discussion. If it is personal but not sensitive, use a private Ed Discussion post and/or email cpsc100-staff at cs.ubc.ca. If it is sensitive or confidential, email cpsc100-admin at cs.ubc.ca.</desc>

  <style>
    .cpsc-flow svg { --fl-ink: #002145; --fl-line: #5E6A71; --fl-fill: #F2F6FA; --fl-accent: #0055B7; --fl-accent-fill: #E6EEF7; }
    @media (prefers-color-scheme: dark) {
      .cpsc-flow svg { --fl-ink: #E8EDF2; --fl-line: #B2B4B4; --fl-fill: #262D34; --fl-accent: #6FB1E7; --fl-accent-fill: #1F2A33; }
    }
    .cpsc-flow .bx { fill: var(--fl-fill); stroke: var(--fl-line); stroke-width: 1.5; }
    .cpsc-flow .out { fill: var(--fl-accent-fill); stroke: var(--fl-accent); stroke-width: 2; }
    .cpsc-flow .dia { fill: none; stroke: var(--fl-line); stroke-width: 1.5; }
    .cpsc-flow .ln { stroke: var(--fl-line); stroke-width: 1.5; fill: none; }
    .cpsc-flow .ah { fill: var(--fl-line); stroke: none; }
    .cpsc-flow text { fill: var(--fl-ink); font-family: inherit; }
    .cpsc-flow .t  { font-size: 15px; }
    .cpsc-flow .tb { font-size: 15px; font-weight: 700; }
    .cpsc-flow .tm { font-size: 13.5px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
    .cpsc-flow .lbl { font-size: 12.5px; fill: var(--fl-line); font-weight: 700; }
    .cpsc-flow .hd { font-size: 12px; fill: var(--fl-accent); font-weight: 700; letter-spacing: .06em; }
  </style>

  <defs>
    <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="ah" d="M 0 0 L 10 5 L 0 10 z"/>
    </marker>
  </defs>

  <!-- start -->
  <rect class="bx" x="150" y="14" width="260" height="50" rx="8"/>
  <text class="tb" x="280" y="44" text-anchor="middle">Something to ask or raise</text>
  <path class="ln" marker-end="url(#ar)" d="M 280 64 L 280 100"/>

  <!-- decision A -->
  <polygon class="dia" points="280,102 424,156 280,210 136,156"/>
  <text class="t" x="280" y="152" text-anchor="middle">Is it a personal</text>
  <text class="t" x="280" y="170" text-anchor="middle">matter?</text>

  <!-- A: No -> public Ed -->
  <path class="ln" marker-end="url(#ar)" d="M 424 156 L 512 156"/>
  <text class="lbl" x="462" y="146" text-anchor="middle">NO</text>
  <rect class="out" x="516" y="116" width="352" height="80" rx="8"/>
  <text class="hd" x="536" y="140">DEFAULT</text>
  <text class="tb" x="536" y="162">Ed Discussion, public post</text>
  <text class="t" x="536" y="182">All course inquiries go here</text>

  <!-- A: Yes -> decision B -->
  <path class="ln" marker-end="url(#ar)" d="M 280 210 L 280 250"/>
  <text class="lbl" x="296" y="234" text-anchor="start">YES</text>

  <!-- decision B -->
  <polygon class="dia" points="280,252 424,306 280,360 136,306"/>
  <text class="t" x="280" y="302" text-anchor="middle">Is it sensitive or</text>
  <text class="t" x="280" y="320" text-anchor="middle">confidential?</text>

  <!-- B: No -> Ed private / staff -->
  <path class="ln" marker-end="url(#ar)" d="M 424 306 L 512 306"/>
  <text class="lbl" x="462" y="296" text-anchor="middle">NO</text>
  <rect class="out" x="516" y="256" width="352" height="100" rx="8"/>
  <text class="hd" x="536" y="280">PERSONAL</text>
  <text class="tb" x="536" y="302">Ed Discussion, private post</text>
  <text class="t" x="536" y="322">and / or email</text>
  <text class="tm" x="536" y="342">cpsc100-staff@cs.ubc.ca</text>

  <!-- B: Yes -> admin -->
  <path class="ln" marker-end="url(#ar)" d="M 280 360 L 280 402"/>
  <text class="lbl" x="296" y="386" text-anchor="start">YES</text>
  <rect class="out" x="104" y="404" width="352" height="86" rx="8"/>
  <text class="hd" x="124" y="428">SENSITIVE</text>
  <text class="tb" x="124" y="450">Email the course admin</text>
  <text class="tm" x="124" y="472">cpsc100-admin@cs.ubc.ca</text>
</svg>
</div>

## The Same Thing in Words

| Your situation | Where it goes |
| :------------- | :------------ |
| Anything relevant to the class: concepts, logistics, lab questions, deadlines, "how does this work?" | **Ed Discussion, public post.** Course staff check it daily, and the whole class benefits from the answer. |
| Something specific to you, but not sensitive: your group, your lab section, a submission question | **Ed Discussion, private post** (visible only to course staff) **and/or** email `cpsc100-staff@cs.ubc.ca` |
| Something sensitive or confidential: academic concessions, accessibility arrangements, personal or medical circumstances, academic integrity, conduct concerns | **Email `cpsc100-admin@cs.ubc.ca`** |

<!-- TODO: instructor decision required - confirm the staff vs admin split above. The
     sensitive-category examples are inferred from the syllabus and the CPSC 344
     precedent, where the -admin alias handled Centre for Accessibility exam
     arrangements. Misrouting a concession request has real consequences, so this list
     should be reviewed before the term starts. -->

**Why public first?** Most questions are not unique. Posting publicly means you get an answer faster, and the next person with the same question finds it already answered.

## Email Addresses

| Address | Use it for |
| :------ | :--------- |
| `cpsc100-staff@cs.ubc.ca` | Personal course matters that are not sensitive. Reaches the teaching team. |
| `cpsc100-admin@cs.ubc.ca` | Sensitive or confidential matters. |

### Instructor

| Name | Email | Office Hours | Location |
| :--- | :---- | :----------- | :------- |
| **Parsa** Rajabi | prajabi [at] `DELETEthisTEXT` cs.ubc.ca | *to be confirmed* | *to be confirmed* |

<!-- TODO: instructor decision required - office hour day, time, and room. Also appears in
     docs/syllabus.md and docs/teaching-team.md. -->

### Teaching Assistants

| Lab Section | Name | Email |
| :---------: | :--- | :---- |
| *TBC* | **Parsa** Seyfourian | parsa.seyfourian [at] `DELETEthisTEXT` ubc.ca |
| *TBC* | **Kate** Manskaia | emanskai [at] `DELETEthisTEXT` student.ubc.ca |
| *TBC* | **Tarvin** Arora | tarora13 [at] `DELETEthisTEXT` student.ubc.ca |
| *TBC* | **Jessica** He | xhe42 [at] `DELETEthisTEXT` student.ubc.ca |
| *TBC* | **Sally** Han | shan31 [at] `DELETEthisTEXT` student.ubc.ca |

<!-- TODO: instructor decision required - map each TA to their lab section (A-E). This
     table mirrors docs/teaching-team.md; update both. -->

Full profiles and office hours are on the [Teaching Team](teaching-team.md) page.

> [!NOTE]
> There are two people named Parsa in this course: your instructor (Parsa Rajabi) and one of your TAs (Parsa Seyfourian). Please use full names in messages so we can route them correctly.

## Writing an Email That Gets a Fast Reply

Include all of these:

- A subject line with the course code, e.g. `[CPSC 100] Question about the group contract`
- A greeting
- A clear, specific message
- **Your full name and student number**
- A closing

Use your UBC email address so your message does not land in a spam folder.

Using AI/ChatGPT to generate emails is **not recommended**, and such emails will be returned for revision.

> [!WARNING]
> Before sending an email, review our [email etiquette guide](email-etiquette.md) and/or [How To Email Your Professor](https://personal.math.ubc.ca/~ilaba/teaching/email.html). **Emails that do not follow these guidelines will be returned to the sender for revision.**

## Please Do Not Email About

- **Waitlist position.** Waitlists are handled centrally by the Computer Science department. See [Course Waitlist](syllabus.md#course-waitlist). These emails will not be answered.
- **Asking for a higher grade** for non-academic reasons. See [Grade Solicitation Policy](syllabus.md#grade-solicitation-policy). If you believe a rubric was misapplied, use the [Remarking Policy](syllabus.md#remarking-policy) instead.

## A Note on Email vs. Conversation

Many course-related questions need back-and-forth, and email is a slow way to have a conversation. Office hours, lab time, and the discussion board will usually get you unstuck faster. Save email for things that are genuinely personal.

## Related

- [Email Etiquette](email-etiquette.md)
- [Teaching Team](teaching-team.md)
- [Code of Conduct](code-of-conduct.md)
- [Professionalism](syllabus.md#professionalism)
- [Privacy](syllabus.md#privacy) — how your data is handled by Ed Discussion
