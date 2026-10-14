# GB STUDY — GitHub + Vercel ready

Includes the GB STUDY icon supplied by you, favicon, PWA icons, course cards, search/filter UI and Telegram popup (`https://t.me/GBFreestudy`).

## Deploy with GitHub + Vercel
1. Extract this ZIP.
2. Create a new repository on GitHub.
3. Upload the **contents of the `gbstudy_site` folder** (so `server.js`, `package.json`, `vercel.json`, and `public/` are at the repository root).
4. On Vercel, choose **Add New → Project**, import that GitHub repository, leave the settings as detected, and click **Deploy**.
5. After deployment succeeds, open the `.vercel.app` URL Vercel gives you.

Vercel supports deployments connected to Git repositories; pushes to the production branch can trigger redeployment.

## Run locally
Requires Node.js 18+. Open a terminal in this folder and run:
`npm start`
Then open `http://localhost:3000`.

## Edit courses
Edit `public/courses.json`. Replace placeholder `#` URLs with your own or authorized course links. Course cards are sample starter content; existing third-party lectures/PDFs/videos are not automatically imported.

## Notes
- Telegram popup and links point to `https://t.me/GBFreestudy`.
- This is a standalone starter website. It does not copy or proxy another platform's live content.
