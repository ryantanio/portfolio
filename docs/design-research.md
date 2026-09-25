# A working record

Design direction and reference research, 25 September 2026.

## The idea

An engineer's portfolio should make it easy to understand what they worked on, with whom, and when. This site is organised as a working record: a personal introduction beside an index of real projects, with individual reading sheets for the detail.

The structure is deliberately work-led. On desktop, Ryan's introduction stays visible as the right-hand column moves through the index, career, background, and contact. On a phone, the introduction fills the first screen and leads directly to the index.

The index opens with five selected records. Filters expose the full collection of eight, or just web, mobile, and services work. Each row is a real link, with a public image, employer, and role period. Opening it reveals the product, contribution, timeline, and sources. Detail is available without requiring a long scroll through every project.

## Visual language

- A pale olive spine beside warm paper, fine rules, serif name and headings, and plain sans-serif reading text.
- Numbered records with small product previews. Project imagery stays subordinate in the index and gets room in the reader.
- Quiet movement on hover; no autoplay, simulated terminal, decorative metrics, or cursor-dependent navigation.
- Mountains in the personal column and career section carry the calm atmosphere.
- The typography and grid carry the identity. The concept does not depend on a generic promotional slogan or a decorative technology illustration.

## Interaction

- Native dialog-based case reader, with visible close and previous/next controls.
- Direct `#work-…` links support reloads and browser Back/Forward. Modified clicks retain normal new-tab behaviour.
- Escape closes the reader; Tab and Shift+Tab remain inside it. Closing restores focus to the opener, or the index heading for a direct visit.
- The underlying page is locked while reading. Project switching resets the reader's scroll position.
- Full-size screenshots open separately, and public product/source links are ordinary links.
- Right-side dots remain from Ryan's requested Brittany Chiang reference. Mobile uses a menu with focus handling and Escape.
- Technical skills use native disclosures. Email, copy-address, résumé download, and GitHub are directly available.
- Native scrolling and reduced-motion support throughout.

## References reviewed

These observations came from primary portfolio sites, with browser screenshots where loading succeeded. Some animation-heavy sites did not finish loading in the research browser; those informed content analysis only. Design choices below are interpretations, not copied implementations.

| Reference | Useful observation | Application |
| --- | --- | --- |
| [Bruno Simon](https://bruno-simon.com/) | Its world and navigation belong to a single recognisable idea. | Make the index and reading interaction express the working-record concept. |
| [Rauno Freiberg](https://rauno.me/) | Typography and composition establish a strong personal identity. | Use a persistent name column and a disciplined grid. |
| [Adham Dannaway](https://www.adhamdannaway.com/) | Positioning is visible in the structure of the page. | Put Ryan's cross-stack work in the first view. |
| [Emil Kowalski](https://emilkowal.ski/) | Brief context leads quickly to specific work. | Keep the bio concise and the project index immediately available. |
| [Brittany Chiang v2](https://v2.brittanychiang.com/) | Dot navigation and career chronology make a substantial page navigable. | Retain dots and the mountain-backed chronology, adapted to the narrower reading column. |
| [Brittany Chiang](https://brittanychiang.com/) | Dated roles and responsibilities are easy to evaluate. | Keep company, role dates, and individual scope separate. |
| [Lee Robinson](https://leerob.com/) | Direct links and concise context make the site quick to use. | Keep contact and résumé actions straightforward. |
| [Josh W. Comeau](https://www.joshwcomeau.com/) | A personal visual language supports substantial reading. | Give personality to the frame and clarity to the case text. |
| [Nicolas Bussiere](https://www.nicolasbussiere.com/) | Named work is organised into clear categories. | Filter the index by meaningful disciplines. |
| [Lusion](https://lusion.co/) | Curated work and visual storytelling support each other. | Five records first; full-size product imagery in each case. |

## Content boundaries

The page separates role periods from product launches, earlier development from later public release, and company product context from personal assignments. Masimo's record is resume-backed connected-monitoring work; SafetyNet is explicitly a public reference, not an asserted assignment.

CPFV and Singa add date-supported examples from OriginallyUs. No personal metrics, awards, ownership of AI training, clinical outcomes, or project-specific framework assignments are inferred. See [project-research.md](project-research.md) for the evidence and rejected candidates.

## Validation

Browser checks cover desktop and mobile rendering, filters, image loading, reader keyboard behaviour, focus restoration, deep links, history, résumé downloads, clipboard, menus, disclosure controls, and responsive bounds with reduced motion. `scripts/capture.mjs` produces visual-review screenshots and refreshes the README image.
