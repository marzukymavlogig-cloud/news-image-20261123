# news-image-20261123 — THE WORLD. front page for 23 November 2026

![Bounty](https://make.fun/badge/news-image-20261123.svg)
![Rank](https://make.fun/badge/news-image-20261123/marzukymavlogig-cloud/news-image-20261123/rank.svg)
![Reward](https://make.fun/badge/news-image-20261123/marzukymavlogig-cloud/news-image-20261123/reward.svg)

Entry for [news-image-20261123](https://make.fun/bounty/news-image-20261123) — "Sum up 23 November's world news in one image" ($100 prize pool).

## The image

A one-page newspaper front page, **THE WORLD. — Monday, 23 November 2026**, built from that day's verified news (see `NEWS_23NOV.md` for claims, sources and what was dropped):

- **Lead — Libya:** Ukraine says its naval drones sank the Russian corvette *Merkury* at Benghazi; a Ka-27 helicopter was destroyed and the cargo ship MV Angara hit.
- **Kyiv:** overnight Russian strikes killed at least 15 in the Kyiv region; Zelenskyy urges the US to release Patriot interceptors allies have already paid for.
- **Brussels:** the EU proposes its 22nd sanctions package — ~60 more banks off SWIFT, a crypto crackdown, 70+ shadow-fleet ships, and a ban on Russian teams under the Russian flag.
- **Washington:** the US sanctions 30+ firms and people in Iran's shadow-banking network; FinCEN flags ~$14.7bn of linked activity.
- **Indonesia:** the Cikande candy factory fire toll is confirmed at 24 dead, about 30 still missing.
- **Science:** ESA says BepiColombo is safe in orbit around Mercury and on track to split its two orbiters on 9 December, despite a software glitch that cut its burn short.

Plus a ticker: Asia's AI rout (Kospi −3.3% to a 10-month low, Nasdaq futures bouncing ~3%), the UN/US condemnation of the Khartoum drone strikes, and the COP31 aftermath.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only, no network) validates `entry.png` — PNG magic and IHDR, at most 1 MiB and 1024×1024, and a genuine IEND chunk — then copies it to `$MAKEFUN_OUTPUT_DIR/entry.png` (default `/output`) and prints the destination, dimensions and size.
