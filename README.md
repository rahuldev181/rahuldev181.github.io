# Rahul Dev — Portfolio

A responsive personal portfolio presented as a **research lab and model-monitoring dashboard**. The site is plain HTML, CSS, and JavaScript, so it can be hosted directly by GitHub Pages.

## Included

- Dark technical interface using `#0A0C10`, elevated instrument panels, cyan/blue data accents, and JetBrains Mono metadata.
- Responsive sticky navigation with mobile drawer, active section state, smooth anchors, scroll-progress bar, and back-to-top link.
- GPU-friendly neural-network canvas background that reacts to the pointer and disables under `prefers-reduced-motion`.
- Accessible reveal motion, visible focus states, semantic landmarks, and ARIA live regions.
- Skills panels with segmented proficiency meters, project metric readouts, education pipeline, GitHub stats, and copy-to-clipboard email control.
- Contact form that forwards visitor messages to the configured inbox through FormSubmit.

## Contact form activation

The form in `index.html` uses this action:

```html
<form action="https://formsubmit.co/r004dev@gmail.com" method="POST">
```

FormSubmit requires a one-time email activation. After the first visitor submits the form, FormSubmit sends an activation message to `r004dev@gmail.com`. Open that message and confirm the address. After activation, future submissions are forwarded to the inbox.

The form uses `_next` to return visitors to the portfolio after submission. If the site URL changes, update the hidden `_next` value in `index.html`:

```html
<input type="hidden" name="_next" value="https://rahuldev181.github.io/?sent=1#contact">
```

No SMTP password or API key is stored in this public repository. For higher-volume or transactional email, replace FormSubmit with a server-side provider such as Resend or Formspree and keep its secret in the deployment environment.

## Local preview

From this directory, run any static server, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Files

- `index.html` — semantic portfolio content and contact form.
- `style.css` — design tokens, responsive layout, instrument panels, and motion rules.
- `script.js` — navigation, reveal effects, canvas network, copy-email action, and form feedback.
