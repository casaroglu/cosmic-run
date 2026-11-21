# History Sketches Weekly: newsletter kit

Ready-to-launch files for the History Sketches email newsletter. Nothing has been signed up for or published. You create the account yourself, using the steps below.

## The plan in short

| | |
|---|---|
| **Name** | **History Sketches Weekly** (same name as the channel, so people recognise it in their inbox) |
| **Promise** | One wild true history story every week, in 3 minutes. |
| **Audience** | Global, English, 18–44, the people who already watch the Shorts |
| **Free gift (lead magnet)** | `chokepoints-guide.pdf`: *9 Chokepoints That Run the World* (12 A4 pages, our own sketch maps) |
| **Cadence** | Every **Sunday**, morning US Eastern time (e.g. 9:00 ET = 17:00 Istanbul). Same day, same time, every week. |
| **Format** | One main story (~250 words) + "3 things you didn't know" + a link to the matching video + a one-question poll |
| **Platform** | **Beehiiv**, free plan. Fallback: **Substack**. |

### Files

| File | What it is |
|---|---|
| `landing.md` | Sign-up page copy (headline, 3 bullets, gift line, button, about) |
| `welcome.md` | Automated welcome email that delivers the PDF |
| `issue-01.md` … `issue-04.md` | First four Sunday issues, ready to paste |
| `social.md` | 3 launch posts: YouTube community post, Instagram caption, Threads |
| `chokepoints-guide.pdf` | The free gift (lead magnet) |
| `src/build_guide.py` | Rebuilds the PDF: `~/cizgi/.venv/bin/python newsletter/src/build_guide.py` |
| `assets/` | Map frames (cropped from our Chokepoints renders), logo, font used by the PDF |

Every fact in the issues and the PDF comes from our own episode scripts, which were checked against two sources (see each episode's `RESEARCH.md`). Do not add facts that aren't in those files.

## Why Beehiiv

- Free plan up to 2,500 subscribers, with a hosted sign-up page, a custom welcome email, built-in polls and basic analytics.
- Built for newsletters that grow from social media. Later you can turn on the referral program and the ad network.
- Substack fallback: also free, but readers land in the Substack app/network, and the welcome email and polls are simpler.

## Sign-up steps (you do these yourself)

### Beehiiv
1. Go to **beehiiv.com** and click **Start for free**. Sign up with the channel's Google account or email and set your own password.
2. Choose the **free (Launch) plan**. Skip any paid trial.
3. Create a publication:
   - Name: `History Sketches Weekly`
   - Subdomain: `historysketches` (→ `historysketches.beehiiv.com`). If it's taken: `historysketchesweekly`.
   - Description: the one-line promise above.
4. **Settings → Publication**: upload the logo (`brand/history-sketches/profile_1080.png`). Set the sender name to `History Sketches` and the reply-to to the channel email.
5. **Website / Design**: paste the headline, bullets, gift line and button text from `landing.md` into the home page sign-up block. Put the 2-sentence About text on the About section.
6. Host the PDF. Easiest: upload `chokepoints-guide.pdf` to Google Drive, set **Anyone with the link → Viewer**, and copy the link. (If your plan shows **Uploads/Files** or a **lead magnet** field, you can upload it to Beehiiv instead.)
7. Set up the welcome email (see the next section).
8. Send yourself a test: subscribe with a second email, check that the welcome email arrives and that the PDF link opens.
9. Copy your sign-up URL (e.g. `https://historysketches.beehiiv.com/subscribe`) and put it everywhere listed under **Where to put the link**.

### Substack (fallback)
1. **substack.com → Start writing**, sign in with the channel email.
2. Publication name `History Sketches Weekly`, URL `historysketches.substack.com`, upload the logo.
3. **Settings → Welcome email**: paste `welcome.md` (subject + body) and the Drive link to the PDF.
4. **Settings → About page**: paste the about text and bullets from `landing.md`.
5. Set every post to **free**. Turn off paid subscriptions.

## Welcome automation setup (Beehiiv)

1. **Automations → New automation → Start from scratch**. Name it `Welcome + free guide`.
2. Trigger: **Signup**, any source. Also tick double opt-in / confirmed subscribers if it's offered.
3. Step 1: **Send email**. Paste the subject, preview text and body from `welcome.md`, and replace `{{PDF_LINK}}` with the Drive link.
4. Delay: none (send right away).
5. Optional step 2, after a **3-day** delay: a short "here's when the next issue lands" email (Sunday). Skip this if you want to keep it simple.
6. Turn the automation **On** and send yourself a test.
7. If Automations is locked on the free plan, use **Settings → Emails → Welcome email** instead. Same text, same link.

## Where to put the link

| Place | How | Notes |
|---|---|---|
| **YouTube channel profile links** | Studio → Customisation → Basic info → Links → add "Free chokepoints map guide" + the sign-up URL; tick it to show on the banner | The first link shows on the channel header |
| **Instagram bio** (@historysketchesdaily) | Edit profile → Links → add the sign-up URL | Mention "free map guide ↓" in the bio text |
| **Pinned comments** | Pin a comment on every new Short and long video: "Free PDF: 9 Chokepoints That Run the World + one true story every Sunday → link in the channel profile" | Links in Shorts comments may not be clickable, so point to the profile |
| **Long-video descriptions** | First line of every long video (e.g. the Ottoman long video): "📬 Free guide + weekly story: <URL>" | Clickable on long videos |
| **Shorts descriptions** | Don't rely on these: links in Shorts descriptions are **not clickable**. Say "link in channel profile" instead | |
| **YouTube community post / Threads** | The posts in `social.md` | Repeat once a month |
| **End of each issue** | "Forward this to a friend who loves history" + the sign-up URL | Helps it grow by word of mouth |

## Cadence and routine

- **Every Sunday**, one issue. Write it during the week from the episode that went up that week, so the facts are already checked.
- Template: subject (≤ 45 characters, a question or a paradox) → main story → 3 things you didn't know → watch link → poll → sign-off.
- Read the poll results every Monday and feed the winning topic into the video plan.
- Suggested first dates: Issue 01 on **Sun 29 Nov 2026**, 02 on 6 Dec, 03 on 13 Dec, 04 on 20 Dec. Launch the sign-up page the week before (posts in `social.md`).

## Link status for the four issues (check before sending)

| Issue | Video | Status in our files |
|---|---|---|
| 01 Antwerp sandwich | https://youtube.com/shorts/V81PJkEodF8 | public |
| 02 Columbus (Spain 01b) | `videos/out/spain/01b/video.mp4` | **private** (Spain schedule cancelled 16 Nov). Publish it, then paste the URL |
| 03 Hormuz Part 2 | `videos/out/headlines/_ig/hormuz_01b.mp4` | **not uploaded yet** (daily upload limit). Paste the URL after upload |
| 04 Barbarossa | Short scheduled 25 Nov 19:00 (not uploaded yet); long video chapter: https://youtu.be/8oWwpZWmCIE?t=847 | long video public |
