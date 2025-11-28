# How to Add a New Blog Post

Adding a new post to your blog is simple. Just follow these steps:

## 1. Create a New File

Navigate to the `blog/_posts` folder and create a new file.
**Important**: The filename **must** follow this exact format:
`YYYY-MM-DD-your-title-here.md`

**Examples:**

- `2024-03-01-my-new-project.md`
- `2024-03-15-learning-react.md`

## 2. Add Front Matter

At the very top of your new file, you need to add "Front Matter". This is metadata that tells the site about your post. Copy and paste this block:

```yaml
---
layout: post
title: "Your Post Title Goes Here"
date: 2024-03-01
tags: [tag1, tag2, tag3]
---
```

- **layout**: Always keep this as `post`.
- **title**: The title that appears on the card and the page.
- **date**: Must match the filename date.
- **tags**: Optional keywords (e.g., `[ai, design, coding]`).

## 3. Write Your Content

Below the second `---`, write your blog post using **Markdown**.

### Markdown Cheat Sheet:

- **Headings**: `# H1`, `## H2`, `### H3`
- **Bold**: `**text**`
- **Italic**: `*text*`
- **Link**: `[Link Text](URL)`
- **Image**: `![Alt Text](/blog/images/your-post-title-1.jpg)`
  - **Note**: Store blog images in `images/blog/`.
  - **Naming**: Use the post title + number (e.g., `my-post-title-1.jpg`, `my-post-title-2.jpg`).
- **Code Block**:
  ```python
  print("Hello World")
  ```

## 4. Save and Publish

- **Save** the file.
- **Commit and Push** your changes to GitHub.
- GitHub Pages will automatically rebuild your site (usually takes 1-2 minutes).
- Your new post will appear at the top of the Blog page!

## 5. Bilingual Support (English & Bengali)

You can add a Bengali translation to any post. The site uses a special separator to split the content.

1.  Write your **English** content first.
2.  Add exactly this separator line: `<!-- bn -->`
3.  Write your **Bengali** content below it.

**Example:**

```markdown
This is the English content.

<!-- bn -->

এটি বাংলা বিষয়বস্তু।
```

**Note:**

- The toggle button will automatically appear on the post.
- If you don't add the `<!-- bn -->` separator, the toggle button will just show the English content.
- For lists in Bengali, use standard numbering (`1.`, `2.`) - they will automatically convert to Bengali numerals (`১.`, `২.`).

---

## ⚡️ Quick Template

Copy this into your new file to get started immediately:

```markdown
---
layout: post
title: "New Post Title"
date: 2024-03-XX
tags: [update, tech]
---

Write your intro here...

## Section 1

Content goes here.

![Image if I want to add](/blog/images/your-post-title-1.jpg)

> "Add a quote if you like."

## Conclusion

Wrap it up!

<!-- bn -->

এখানে আপনার বাংলা ভূমিকা লিখুন...

## প্রথম অংশ

এখানে বিষয়বস্তু লিখুন।

> "আপনার পছন্দমত একটি উদ্ধৃতি যোগ করুন।"

## উপসংহার

শেষ কথা!
```
