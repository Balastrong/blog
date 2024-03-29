---
title: "GitHub NEW Slash Commands"
date: 2023-04-16
featuredImage: ./_cover.png
description: Slash commands are a new feature on GitHub that allows you to write better issues and pull requests
tags:
  - github
  - git
---

Wait, what? Slash commands are available on GitHub?

Just open up a text editor, it can be a new issue, a new pull request or even a comment and type `/` to see all the available commands.

A list will appear, and you can start typing to filter them. The currently available commands are:

- `/code`: Inserts a Markdown code block. You choose the language.
- `/details`: Inserts a collapsible detail area. You choose the title and content.
- `/saved-replies`: Inserts a saved reply. You choose from the saved replies for your user account. If you add %cursor% to your saved reply, the slash command will place the cursor in that location.
- `/table`: Inserts a Markdown table. You choose the number of columns and rows.
- `/template`: Shows all of the templates in the repository. You choose the template to insert. This slash command will work for issue templates and a pull request template.

There's also a `/tasklist` command which inserts a tasklist and only works in an issue description, however this one is not available for everyone yet.

I recorded a two minutes video to show you how it works:

{% youtube r3z4sotrQXQ %}

Learn more on the official docs: https://docs.github.com/en/issues/tracking-your-work-with-issues/about-slash-commands
