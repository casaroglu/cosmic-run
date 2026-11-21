# "This Week Inside You": newsletter kit (Inside Out Science)

The newsletter is stage 0 of the growth plan: it starts on day one, it is free, and the audience belongs to us rather than to a platform.

## Setup (needs the user: sign-up, password and email verification)

| Option | Why | Note |
|---|---|---|
| **Beehiiv** (recommended) | Free starter plan, built-in referral program, newsletter "recommendations" network that grows lists, simple landing page | Paid features (ads network, premium subs) can come later |
| Kit (ConvertKit) | Strong automations, creator network | Free tier smaller in features |
| Substack | Easiest, built-in discovery | Takes a cut if we ever charge; less control |

Plan limits change; check each site's pricing page before choosing.

After the account exists, Claude can do the rest:
1. Set up the publication.
2. Fill in the landing page.
3. Write the welcome email.
4. Schedule issue #1.
5. Add the sign-up link to every Short description, the channel's About page and links, and the pinned comments. To add the link to Shorts already scheduled, set `NEWSLETTER` in `videos/out/shorts/desc.py`; the daily upload task then picks it up.

## Name and promise

- **Name:** This Week Inside You
- **Tagline:** 3 surprising things your body (and the universe) did this week, explained in 3 minutes, with sources.
- **Sender:** Ava & Theo from Inside Out Science
- **Cadence:** every Sunday, 9:00 a.m. US Eastern (17:00 TR)

## Landing page copy

> **What is your body doing right now?**
> Every Sunday: three surprising science findings about your body, health and space. Each one is explained in plain English in under a minute and checked against two sources. Free. No spam. Unsubscribe in one click.
> [Get it free]

## Welcome email

**Subject:** You're in. Here's what your nose is doing right now
**Preview:** A 30-second fact to start with.

> Hi, and welcome to This Week Inside You!
>
> Quick one to start: when cold air hits your nose, it releases a swarm of tiny decoys that viruses grab instead of your cells. Chill your nose by about 5 °C and it releases about 42% fewer. That's one reason colds love winter. (Huang et al., J Allergy Clin Immunol, 2023)
>
> Every Sunday you'll get three findings like this, each with a 60-second Short and the sources.
>
> One favour: hit reply and tell me one thing about your body you've always wondered about. The best questions become videos.
>
> Ava & Theo
> Inside Out Science

## Issue #1 (draft for Sunday 29 Nov 2026)

**Subject:** Measles can erase your immune memory, and 2 other things inside you
**Preview:** Plus a tick that turns people off steak.

1. **Measles can erase your immune memory.** After an infection, kids lost 11–73% of their antibody repertoire, as if their immune "wanted posters" were wiped. The vaccine doesn't do this. ▶ Short + full video link.
2. **A tick bite can make you allergic to red meat.** The lone star tick's bite can teach your body to attack a sugar called alpha-gal, with reactions hours after dinner. ▶ Short link.
3. **Ghost particles.** About 100 trillion neutrinos pass through you every second, and almost all of them fly straight through without touching anything. ▶ Short link.

**This week's question:** Do you nap? Reply "yes" or "no". Our nap video drops on Thursday.

*Sources for every item are in the linked videos' descriptions. Not medical advice.*

Before sending, check every number against the episode README fact tables.

## Sign-up call-to-action lines

- Short description (first line under the hook): `Free Sunday science email → <link>`
- Pinned comment on long videos: `Want 3 of these every Sunday? Free newsletter: <link>`
- End of long videos (spoken, later episodes): "If you like this, there's a free Sunday email. The link is in the description."

## Weekly routine (20 min, Saturday)

1. Pick this week's 3 best-performing Shorts (Studio → Analytics).
2. Write 2–3 sentences each from the episode README fact table.
3. Add a "question of the week" (replies are new video ideas).
4. Schedule for Sunday 17:00 TR.
