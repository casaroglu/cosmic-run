# Chip Wars: series plan (draft, 2026-11-25)

15 Shorts (vertical 1080x1920, ~45-55 s each), joined into 3 long-form parts (16:9, ~9-10 min each), the same way the Rome series was built.
Because every frame is drawn in code, the long parts are **re-rendered at 16:9** with the same beats and a wider camera, instead of pillarboxing the vertical Shorts.

The chain: each Short ends on the thing the next one picks up. The Shorts never tease the next episode (History Sketches rule), but cut together they read as one story.

- Part 1 **How a Chip Is Made**: from sand to silicon. Five chokepoints, five places on the map.
- Part 2 **The Chip War**: Washington cuts China off, China cuts back, and a start-up shakes the market.
- Part 3 **The AI Gold Rush**: Nvidia, power, cables and the labs racing to build the smartest machine.

Style: the collage map from the style test (engraved map, halftone cut-outs, Blender 3D props, raised yellow region, ransom letters, marker notes).
Voice: Kokoro Q&A, Q = af_sky, A = bm_fable, fast and lively (user pick 2026-11-25).
Every Short: payoff in the first 1.5 s, last line loops into the first, hidden 1 s key-fact card, CTA + corner logo, Gemini cover with a 4-5 word hook.

Facts: all lines below use facts with two independent sources (research packs, 2026-11-25). Disputed figures are worded as the safe version.
Items marked **[recheck]** can change before upload.

---

## Script rules (v2, after the user's pilot feedback, 2026-11-25)
Every Short: **stakes hook** tied to the viewer's life → **why it matters** within ~8 s → surprising how → twist / conflict → payoff line that loops into the hook.
On-screen text big (tags ≥ 44 px, notes ≥ 90 px), silent text appearances, soft object slaps only, low music bed, no whoosh.
Voices: Q = af_sky, A = bm_fable (fast settings, see 03-asml/work/gen_voice.py). Pronunciation: "A, S, M, L", "T, S, M, C", "Chat G P T".
Facts must be re-verified (two sources) by the production step for every **new** claim marked ⟨verify⟩.

## PART 1 · HOW A CHIP IS MADE

### 01 · The Town Behind Every Chip (Spruce Pine)
Map: Appalachians, Spruce Pine NC (35.92, -82.07); hurricane swirl; arrows out to fabs.
- A: Your phone, your laptop, almost every chip on Earth... starts in one small American town!
- Q: One town? What if something happened to it?
- A: It did! In 2024, Hurricane Helene cut off Spruce Pine, North Carolina, and the chip world held its breath.
- Q: Why does one town matter so much?
- A: Its quartz is the purest ever mined at scale. Analysts say it supplies around 80 percent of the world's high-purity quartz.
- A: Chips are cut from giant silicon crystals, grown inside quartz bowls at over 1,400 degrees.
- A: Any impurity in the bowl, and the crystal is ruined.
- Q: Who mines it?
- A: Just two companies, Sibelco and The Quartz Corp.
- Q: And after the storm?
- A: Roads, rail and power were cut. Sibelco restarted about two weeks later.
- A: Others dig in Brazil, Russia and China, but nothing matches it at scale yet.
- A: So almost every chip on Earth still starts in one small American town.  (loop)
Hidden: SPRUCE PINE ≈ 80% OF HIGH-PURITY QUARTZ (BNEF EST.) · ⟨verify⟩ "purest mined at scale", "almost every chip" (Czochralski share)

### 02 · The War That Almost Switched Off Chips (Ukraine's neon)
Map: Black Sea, Odesa (46.48, 30.73), Mariupol (47.10, 37.55); laser beam cut-out; arrows to Asia.
- A: In 2022, a war threatened the machines that make your chips!
- Q: How can a war stop chip factories?
- A: Chipmaking lasers run on neon gas. And about half the world's chip-grade neon came from Ukraine.
- A: From just two companies, in Odesa and Mariupol.
- Q: Mariupol... the city under siege?
- A: Exactly. When Russia invaded, both plants stopped.
- Q: So why didn't the world run out of chips?
- A: Because of an earlier war. When Russia seized Crimea in 2014, neon prices jumped 600 percent.
- A: Chipmakers learned. They found new suppliers in China and Korea, and began recycling their neon.
- A: In 2022 some prices still rose up to 500 percent... but no chip factory stopped.
- A: A war a thousand kilometres away can still reach your chips.  (loop)
Hidden: UKRAINE ≈ 45-54% OF CHIP-GRADE NEON BEFORE 2022 · ⟨verify⟩ distance wording

### 03 · The Machine Only One Company Can Build (ASML) — DONE (pilot v2, commit 3fad588)
Voiced script: see 03-asml/script.txt.

### 04 · The Company That Never Made a Chip (Arm, Cambridge)
Map: England, Cambridge (52.20, 0.18); phone dots spreading over every continent.
- A: Almost every smartphone on Earth runs on a design from one British company... that has never made a single chip!
- Q: Then how does it make money?
- A: Arm, from Cambridge, sells blueprints. Apple, Samsung and Qualcomm pay a fee on every chip built from them.
- Q: Why does that matter?
- A: Because whoever owns Arm holds the keys to over 99 percent of smartphones.
- A: Over 350 billion Arm-based chips have shipped so far.
- Q: Who owns it?
- A: In 2016, Japan's SoftBank bought it for 24 billion pounds.
- A: In 2020, Nvidia offered 40 billion dollars. Regulators in America, Britain and Europe pushed back.
- Q: Why?
- A: They feared one chip giant would control the blueprints its rivals need. The deal died in 2022.
- A: Not bad, for a company that has never made a single chip.  (loop)
Hidden: ARM CPUs IN 99%+ OF SMARTPHONES (ARM ANNUAL REPORT) · ⟨verify⟩ regulators' reason (FTC complaint, CMA)

### 05 · The Island the World Can't Lose (Taiwan / TSMC)
Map: Taiwan raised; Strait dimension line; arrows from Apple/Nvidia (California) and to Arizona.
- A: If one island stopped tomorrow, the world would lose around 90 percent of its most advanced chips!
- Q: Which island?
- A: Taiwan. And one company there, T, S, M, C, makes them.
- Q: Why not make them somewhere else?
- A: Because it took almost forty years. Morris Chang founded it in 1987, with one idea: make chips only for others.
- A: Today Apple and Nvidia design chips... and T, S, M, C builds them. Since 2025, Nvidia is its biggest customer.
- Q: How far is Taiwan from China?
- A: About 130 to 160 kilometres. Less than a hundred miles.
- A: That's why people call it Taiwan's silicon shield.
- A: And why America got it to pledge 165 billion dollars for factories in Arizona.
- Q: So is Arizona making the best chips yet?
- A: Not yet. The most advanced chips still come from one island.  (loop)
Hidden: TSMC ≈ 72.5% OF FOUNDRY REVENUE (Q2 2026) · ⟨verify⟩ "silicon shield" usage (2 outlets)

## PART 2 · THE CHIP WAR

### 06 · The Day Washington Pulled the Plug (7 Oct 2022)
Map: Washington DC → Beijing; Santa Clara; chips ping-pong; ransom "25%".
- A: In 2022, America decided China must not have the chips that build the smartest AI!
- Q: Why does a chip matter that much?
- A: Because the best chips train the best AI, for business, and for the military.
- A: So on the 7th of October 2022, Washington blocked Nvidia's top AI chips from China, and the tools to make them.
- Q: What did Nvidia do?
- A: It built slower versions just for China. The rules tightened. It built another. Then that one needed a licence too.
- A: Nvidia wrote off four and a half billion dollars.
- Q: And now?
- A: Now Washington lets some chips through, and takes 25 percent of the sales.
- Q: So, from a ban... to a tax?
- A: Exactly. All over who gets to build the smartest AI.  (loop)
Hidden: US TAKES 25% OF H200 SALES TO CHINA (DEC 2025) · ⟨verify⟩ BIS rationale cites military use

### 07 · The Chip Smugglers
Map: US West Coast → Malaysia/Thailand → China; dashed trails; fake-label cut-out.
- A: Smugglers peeled off Nvidia's name and shipped AI chips to China under a fake brand!
- Q: Why go to all that trouble?
- A: Because the best AI chips are banned in China, and demand there is huge.
- A: In one case, at least 160 million dollars' worth went through, relabelled as ordinary computer parts. The organiser pleaded guilty.
- Q: How did they get them out?
- A: Through South-East Asia. Another case caught supercomputers packed with Nvidia chips on the way.
- Q: Anything bigger?
- A: In March 2026, a co-founder of Supermicro was arrested. Prosecutors allege 2.5 billion dollars of servers, and dummy machines to fool inspectors.
- A: Those are still allegations.
- A: But every new ban creates a new route... and a new fake brand.  (loop)
Hidden: OPERATION GATEKEEPER: $160M+ (GUILTY PLEA, OCT 2025)

### 08 · The Metal China Controls (gallium & germanium)
Map: China raised; Beijing; Yunnan; price tags flying to Rotterdam.
- A: The radar defending a city, the cables carrying your internet... both need metals one country controls!
- Q: Which country?
- A: China. It makes 99 percent of the world's gallium.
- Q: Why does gallium matter?
- A: It's in power chips, LED lights, and the radars of modern air defence. Its cousin germanium carries light through fibre-optic cables.
- A: In 2023, China put both under licence. In December 2024, it banned exports to America outright.
- Q: What happened to prices?
- A: Gallium more than doubled in Europe. Germanium hit about five thousand dollars a kilo, five times its 2023 price.
- A: After a Trump-Xi truce, the US ban was paused... for now.
- A: That's the power of owning 99 percent of something the world can't do without.  (loop)
Hidden: CHINA = 99% OF PRIMARY GALLIUM (USGS 2026) · **[recheck: US-ban pause ends 27 Nov 2026]**

### 09 · The Magnets That Stopped a Car Factory (rare earths)
Map: Bayan Obo → Chicago Ford plant X; Europe X; Mountain Pass CA; Malaysia.
- A: In 2025, a shortage of tiny magnets shut down a Ford car factory in Chicago!
- Q: Magnets? How?
- A: Rare-earth magnets sit inside electric motors, cars, drones, wind turbines, even data-centre fans.
- A: And China makes 94 percent of them.
- Q: So what did China do?
- A: In April 2025, it put seven rare earths under licence. In May, its magnet exports fell 74 percent in one month.
- A: Within weeks, Ford idled its Chicago plant, and European suppliers shut production lines.
- Q: Can the West make its own?
- A: It's trying. The Pentagon bought into a California mine and promised it a minimum price. In Malaysia, Lynas made heavy rare earths outside China for the first time.
- A: But 94 percent of the magnets still come from one country.
- A: That's how a tiny magnet stopped a car factory.  (loop)
Hidden: CHINA MAKES 94% OF RARE-EARTH MAGNETS (IEA) · **[recheck: pause runs to 10 Jan 2027]**

### 10 · The App That Wiped 590 Billion (DeepSeek)
Map: Hangzhou → arc to New York; falling ransom number.
- A: In one day, a free Chinese app wiped about 590 billion dollars off Nvidia!
- Q: How can one app do that?
- A: Investors believed AI needed ever more Nvidia chips. DeepSeek seemed to prove otherwise.
- A: In January 2025, the Hangzhou start-up released a free model that rivalled the best in America.
- A: It said its final training run cost about 5.6 million dollars in rented chips. Analysts say the real total was far higher.
- Q: Without the best chips?
- A: It trained on H800s, the slower chips Nvidia made for China.
- A: Its app jumped to number one in America, ahead of Chat G P T.
- Q: So did the chip bans fail?
- A: Experts say they leaked, not failed. And in 2026 DeepSeek's new model was built to run on Chinese Huawei chips.
- A: That's how one free app wiped 590 billion dollars in a day.  (loop)
Hidden: NVIDIA -17% ON 27 JAN 2025, BIGGEST ONE-DAY LOSS IN US HISTORY

## PART 3 · THE AI GOLD RUSH

### 11 · Born in a Denny's (Nvidia's origin)
Map: San Jose Denny's → Toronto (AlexNet) → globe; ransom "$5 TRILLION".
- A: The most valuable company on Earth was planned in a Denny's diner!
- Q: Why should we care how Nvidia started?
- A: Because its chips now power most of the world's AI... and it began making video-game graphics.
- A: In 1993, three engineers met in a Denny's in San Jose to design a 3D graphics chip.
- A: In 2006 Nvidia unveiled CUDA, so its chips could do any kind of maths.
- Q: How did games turn into AI?
- A: In 2012 a Toronto team trained an AI called AlexNet on two gaming cards, and crushed the competition.
- A: AI researchers rushed to Nvidia.
- A: It touched one trillion dollars in 2023... and in October 2025 became the first company worth five trillion.
- A: Denny's even put a plaque above the booth where it was planned.  (loop)
Hidden: NVIDIA: FIRST $5 TRILLION COMPANY (29 OCT 2025) · no current-CEO wording

### 12 · Why Nobody Can Catch Nvidia
Map: Santa Clara raised; TSMC packaging (Zhunan); rivals' pins in one queue.
- A: Nvidia made 107 billion dollars from data centres in just three months!
- Q: Why does everyone buy from one company?
- A: Because whoever makes the AI chips sets the price, and the pace, of the whole AI boom.
- A: Roughly eight in ten AI chips are Nvidia's.
- Q: Why can't rivals catch up?
- A: Software. CUDA is twenty years old, with eleven million developers. Switching means rewriting everything.
- A: Google and Amazon build their own chips, and AI labs rent them by the hundreds of thousands.
- Q: So Nvidia could lose?
- A: Maybe. But they all wait in the same queue, at T, S, M, C's packaging lines in Taiwan.
- A: And Nvidia holds the biggest place in that queue.
- A: That's how you make 107 billion dollars in three months.  (loop)
Hidden: CUDA: 11M+ DEVELOPERS (NVIDIA, NOV 2026) · ⟨verify⟩ "sets the price and pace" framing → keep as opinion or soften

### 13 · AI Is Eating the Power Grid
Map: Ireland raised (23%); Three Mile Island; Abilene TX; Memphis turbines.
- A: In Ireland, computers now use almost a quarter of the country's electricity!
- Q: Why should anyone care?
- A: Because AI runs on power, and grids can't grow as fast as AI wants.
- A: Irish data centres use 23 percent of all electricity, nearly as much as every home in the country.
- A: Worldwide, data centres may double their power use by 2030.
- Q: So where will the power come from?
- A: Microsoft is restarting a reactor at Three Mile Island, and buying all its power for 20 years.
- A: Meta signed nuclear deals for up to 6.6 gigawatts. In Texas, one AI campus was planned at over a gigawatt.
- Q: And when there isn't enough?
- A: Near Memphis, xAI ran dozens of gas turbines... and was taken to court.
- A: That's why a small country now spends almost a quarter of its power on computers.  (loop)
Hidden: IRELAND DATA CENTRES: 23% OF METERED ELECTRICITY (CSO 2025)

### 14 · One Anchor, a Quarter of the Internet (undersea cables)
Map: ocean cable lines; Red Sea zoom with drifting ship and anchor trail; Baltic X's.
- A: One sinking ship's anchor hit a quarter of the internet traffic through the Red Sea!
- Q: Why does that matter to me?
- A: Because almost everything you send between continents travels through cables on the sea floor. Satellites carry under one percent.
- A: About 600 cables carry over 99 percent of that data.
- Q: What happened in the Red Sea?
- A: In 2024, a cargo ship hit by a Houthi missile drifted, dragging its anchor, and cut three cables.
- A: In 2025, more were cut near Jeddah. In the Baltic, at least ten have been damaged since 2023.
- Q: Who owns these cables?
- A: More and more, Google, Meta, Microsoft and Amazon. They use about three quarters of the bandwidth.
- A: And all it took to hit a quarter of the Red Sea's traffic... was one anchor.  (loop)
Hidden: 99%+ OF INTERCONTINENTAL DATA GOES BY CABLE (TELEGEOGRAPHY)

### 15 · The 81-Billion-Dollar Bet (the AI labs + the record IPO)
Map: San Francisco, London, Hangzhou, Paris pins; New York zoom; arc back to Veldhoven at the end.
- A: An AI company just raised 81 billion dollars in a single stock sale!
- Q: Why would anyone pay that much?
- A: Because investors are betting that AI will reshape the whole economy.
- A: Anthropic, the maker of Claude, listed on Nasdaq in November 2026, the biggest IPO deal ever priced.
- Q: Who is it racing?
- A: OpenAI, Chat G P T's maker, valued at about 1.25 trillion dollars. Google DeepMind in London, whose Gemini has over a billion users.
- A: DeepSeek in Hangzhou gives its models away. Mistral in Paris counts A, S, M, L among its investors.
- Q: And what do they all need?
- A: Chips from Nvidia, made by T, S, M, C in Taiwan, printed by one Dutch machine.
- A: That's the race behind an 81-billion-dollar bet.  (loop)
Hidden: ANTHROPIC IPO: $81.3B RAISED AT $83/SHARE (18 NOV 2026) · Claude is made by Anthropic: user reviews this episode's wording; no investment advice, no price talk.

---

## Long-form parts (16:9 re-render)
- Part 1 = 01-05 (~5 × 1:50 with the hooks moved inside the story) · title idea: *How One Chip Is Made: 5 Places That Rule the World*
- Part 2 = 06-10 · *The Chip War: How America and China Fight Over AI*
- Part 3 = 11-15 · *The AI Gold Rush: Nvidia, Power, Cables and the $81 Billion IPO*
Each part: short intro + 5 chapters (cold open cut as in Rome) + outro. In the long version every chapter gets 2-3 extra facts that didn't fit the Short (e.g. ASML's 5,000 suppliers, TSMC's 534 customers, Arm's royalty doubling, Nvidia's near-bankruptcy, China's 34% Nvidia share).

## Production order proposal
1. Voice picked; 03 pilot approved (v2).
2. Then 01-15 in order, 2 per day into the Shorts queue; long parts after each block of five.
