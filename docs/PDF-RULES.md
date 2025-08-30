## PDF Generation Rules and Limitations

**Reason for Aborting Code Changes:**

The request to generate PDFs with selectable text and embedded fonts, without rasterization, cannot be fulfilled with the current project setup and the given hard constraints. The existing `html2pdf.js` library, which is used for PDF generation, relies on `html2canvas` to render HTML content. `html2canvas` fundamentally converts HTML into an image (rasterizes it) before it is embedded into a PDF. This process prevents the creation of a true text layer that is selectable and searchable.

To achieve the desired functionality (selectable text, embedded fonts, no rasterization), a headless browser solution (e.g., Playwright or Puppeteer interacting with Chromium's native PDF printing capabilities) is required. However, introducing and configuring such a solution would necessitate adding new npm dependencies (like `playwright` or `puppeteer`) and modifying `package.json` and `package-lock.json`, which directly violates the "No dependency updates/removals" and "no lockfile edits" hard constraints. Furthermore, running a headless browser typically requires a Node.js environment with specific binaries, which is not directly supported by the current in-browser WebContainer environment without additional setup that would also violate the constraints.

**Minimal Steps for Future Approval:**

To implement PDFs with selectable text and embedded fonts, the following steps would be necessary, requiring approval for changes outside the current strict constraints:

1.  **Introduce a Node.js Backend/Service:** Set up a dedicated Node.js backend service (or integrate into an existing one if available) that can host and execute a headless browser.
2.  **Install Headless Browser Library:** Add a library like `playwright` or `puppeteer` to the backend service's dependencies. This would involve modifying `package.json` and `package-lock.json`.
3.  **Create a PDF Generation Endpoint:** Develop an API endpoint in the backend service that receives HTML content (or a URL to the content) and uses the headless browser to generate a PDF with the desired options (e.g., `page.pdf({ printBackground: true, preferCSSPageSize: true, format: 'Letter' })`).
4.  **Update Frontend Call Sites:** Modify `src/phoenix-forms/components/PreviewPage.tsx` and `src/components/job-creation/JobPreview.tsx` (and any other relevant files) to send the HTML content to this new backend endpoint for PDF generation, instead of using `html2pdf.js`.
5.  **Font Embedding:** Ensure that the HTML passed to the headless browser includes `@font-face` rules with `data:URL` for WOFF2 fonts (like Inter) to guarantee font embedding.