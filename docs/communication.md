# Course Communication

Everything about how to reach the teaching team lives on this page. When in doubt, start with Ed Discussion.

> [!TIP]
> Join the course discussion board: [edstem.org/us/join/SbFf63](https://edstem.org/us/join/SbFf63)
>
> Sign up with your UBC email address so you are matched to the course roster.

<details>
<summary>Get Ed on your phone (recommended)</summary>

Ed has no App Store or Play Store app. It is a Progressive Web App, so you add it to your home screen from your browser and it then behaves like an installed app. Doing this is also what makes push notifications possible, so replies and announcements reach you without checking manually.

On iPhone or iPad

1. Open [edstem.org](https://edstem.org/) in Safari.
2. Tap Share, then Add to Home Screen.
3. Tap Add.

![Installing Ed on iOS: the Ed site open in Safari, the Share sheet with Add to Home Screen highlighted, the Add to Home Screen dialog, and the finished Ed icon on the home screen.](assets/screenshots/ed-install-ios.jpg)

On Android

1. Open [edstem.org](https://edstem.org/) in Chrome.
2. Tap the ⋮ menu, then Add to Home Screen. Newer versions of Chrome label this Install app.

![Installing Ed on Android: the Ed site open in Chrome, the Chrome menu with Install app highlighted, and the finished Ed icon on the home screen.](assets/screenshots/ed-install-android.jpg)

Then turn on notifications

Open Ed from the home screen icon rather than your browser, then enable Push Notifications in your [Ed notification settings](https://edstem.org/settings/notifications).

> [!NOTE]
> On iOS, push notifications require iOS 18.4 or newer, and you must add Ed to your home screen before you can enable them.

Ed's own guide is at [Push Notifications](https://edstem.org/us/help/push-notifications). It opens inside Ed, so log in first. Screenshots above are from that guide.

</details>

## Changelog

<!-- Add a dated entry every time this page changes. Newest first. -->

| Date | Update |
| :--: | :----- |
| Sep 24, 2026 | Reworded for readability. No dates, weights, or policies changed. |

## Where Should This Go?

```mermaid
flowchart TD
    accTitle: CPSC 100 communication routing
    accDescr {
      A decision chart with three outcomes. Start with anything you need to ask or raise.
      If it is not personal to you, post publicly on Ed Discussion, which is where all
      course inquiries go. If it is personal but not sensitive, use a private Ed
      Discussion post and/or email the course staff address. If it is sensitive or
      confidential, email the course admin address instead.
    }

    Q["fa:fa-circle-question Something to ask or raise"] --> P{"Is it personal<br/>to you?"}

    P -- No --> PUB["fa:fa-comments <b>Ed Discussion, public post</b><br/>All course inquiries go here"]
    P -- Yes --> S{"Is it sensitive or<br/>confidential?"}

    S -- No --> STAFF["fa:fa-user-lock <b>Ed Discussion, private post</b><br/>and / or email<br/>cpsc100-team@cs.ubc.ca"]
    S -- Yes --> ADMIN["fa:fa-shield-halved <b>Email the course admin</b><br/>cpsc100-ops@cs.ubc.ca"]

    classDef startNode fill:#002145,stroke:#002145,color:#FFFFFF
    classDef decision  fill:#E8EAEC,stroke:#5E6A71,color:#20272B
    classDef public    fill:#D6E6F7,stroke:#0055B7,color:#00305F
    classDef personal  fill:#FCEBC7,stroke:#A97400,color:#553900
    classDef sensitive fill:#F6D8DC,stroke:#B0202C,color:#67121C

    class Q startNode
    class P,S decision
    class PUB public
    class STAFF personal
    class ADMIN sensitive
```

<span style="color:#0055B7">&#9632;</span> Blue is the default: public, and where almost everything belongs. &nbsp;
<span style="color:#A97400">&#9632;</span> Amber is personal to you. &nbsp;
<span style="color:#B0202C">&#9632;</span> Red is confidential.

Why public first? Most questions are not unique. Posting publicly means you get an answer faster, and the next person with the same question finds it already answered.

<details>
<summary>The same thing in words, with examples</summary>

| Your situation | Where it goes |
| :------------- | :------------ |
| Anything relevant to the class: concepts, logistics, lab questions, deadlines, "how does this work?" | Ed Discussion, public post. Course staff check it daily, and the whole class benefits from the answer. |
| Something specific to you, but not sensitive: your group, your lab section, a submission question | Ed Discussion, private post (visible only to course staff) and/or email `cpsc100-team@cs.ubc.ca` |
| Something sensitive or confidential: academic concessions, accessibility arrangements, personal or medical circumstances, academic integrity, conduct concerns | Email `cpsc100-ops@cs.ubc.ca` |

</details>

## Email Addresses

| Address | Use it for |
| :------ | :--------- |
| `cpsc100-team@cs.ubc.ca` | Personal course matters that are not sensitive. Reaches the teaching team. |
| `cpsc100-ops@cs.ubc.ca` | Sensitive or confidential matters. |

> [!NOTE]
> This is the only page on the course site where email addresses are published. Every other page links here instead, so there is one place to keep current.

### Instructor

| Name             | Email                                   | Drop-in Hours                                       | Location  |
| :--------------- | :-------------------------------------- | :-------------------------------------------------- | :-------- |
| Parsa Rajabi | prajabi [at] `DELETEthisTEXT` cs.ubc.ca | Mon 2:50-3:50pm · Wed 2:50-3:50pm · Fri 2:50-3:20pm | SWING 110 |

### Teaching Assistants

Please avoid emailing TAs unless absolutely necessary; use Ed Discussion first. If you do email, include your full name and student number, and use your UBC email address.

| Name | Email |
| :--- | :---- |
| Parsa Seyfourian | parsa.seyfourian [at] `DELETEthisTEXT` ubc.ca |
| Kate Manskaia | emanskai [at] `DELETEthisTEXT` student.ubc.ca |
| Tarvin Arora | tarora13 [at] `DELETEthisTEXT` student.ubc.ca |
| Jessica He | xhe42 [at] `DELETEthisTEXT` student.ubc.ca |
| Sally Han | shan31 [at] `DELETEthisTEXT` student.ubc.ca |

Which lab each TA leads and supports is on the [Teaching Team](teaching-team.md) page, and their drop-in hours are on the [Drop-in Hours](drop-in-hours.md) page. For questions about your own lab, contact its lead TA first.

> [!NOTE]
> There are two people named Parsa in this course: your instructor (Parsa Rajabi) and one of your TAs (Parsa Seyfourian). Please use full names in messages so we can route them correctly.

## Drop-in Hours

> [!TIP]
> Looking for the times? This week's sessions, who is holding them, and how to find the rooms are all on the [Drop-in Hours](drop-in-hours.md) page.

They're called drop-in hours because you can drop in without booking. No appointment, no sign-up, and no need to arrive with a question.

If you are wondering whether your reason is good enough: it is. Here is what students actually use them for.

| Come to... | |
| :--------- | :-- |
| Work on a lab or the project | with someone nearby to ask when you get stuck |
| Check that you understood something | far cheaper than discovering it on a quiz |
| Go over a quiz question you got wrong | understanding the mistake is where the learning is |
| Ask what a concept is actually *for* | a fair question, and often the most interesting one |
| Ask about CS, research, courses, co-op | not everything has to be about CPSC 100 |
| Say hello | genuinely fine |

A half-formed question is normal and useful. So is sitting quietly and working while other people ask things. You'll often learn something from a question you'd never have thought to ask.

Some things need privacy or more time, such as a grade question. For those, use a private Ed Discussion post to arrange a separate meeting rather than emailing. Private posts are visible only to course staff. Genuinely sensitive or confidential matters, including personal circumstances and academic concessions, are the exception and still follow the routing chart above.

Every session, for both the instructor and the TAs, is listed on the [Drop-in Hours](drop-in-hours.md) page, along with directions to each room.

## Writing an Email That Gets a Fast Reply

Include all of these:

- A subject line with the course code, e.g. `[CPSC 100] Question about the group contract`
- A greeting
- A clear, specific message
- Your full name and student number
- A closing

Use your UBC email address so your message does not land in a spam folder.

Using AI/ChatGPT to generate emails is not recommended, and such emails will be returned for revision.

> [!WARNING]
> Before sending an email, review our [email etiquette guide](email-etiquette.md) and/or [How To Email Your Professor](https://personal.math.ubc.ca/~ilaba/teaching/email.html). Emails that do not follow these guidelines will be returned to the sender for revision.

## Please Do Not Email About

- Waitlist position. Waitlists are handled centrally by the Computer Science department. See [Course Waitlist](syllabus.md#course-waitlist). These emails will not be answered.
- Asking for a higher grade for non-academic reasons. See [Grade Solicitation Policy](syllabus.md#grade-solicitation-policy). If you believe a rubric was misapplied, use the [Remarking Policy](syllabus.md#remarking-policy) instead.

## A Note on Email vs. Conversation

Many course-related questions need back-and-forth, and email is a slow way to have a conversation. Drop-in hours, lab time, and the discussion board will usually get you unstuck faster. Save email for things that are genuinely personal.

## Related

- [Drop-in Hours](drop-in-hours.md)
- [Email Etiquette](email-etiquette.md)
- [Teaching Team](teaching-team.md)
- [Code of Conduct](code-of-conduct.md)
- [Professionalism](syllabus.md#professionalism)
- [Privacy](syllabus.md#privacy): how your data is handled by Ed Discussion
