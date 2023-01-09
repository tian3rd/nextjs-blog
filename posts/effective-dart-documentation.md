---
title: "[Note] Style Guide for Effective Dart Documentation"
date: "2023-01-09"
tags: "dart style-guide"
---

> Link: [Effective Dart: Documentation](https://dart.dev/guides/language/effective-dart/documentation)

**Capitalize the first word** unless it’s a case-sensitive identifier. End it with a period (or “!” or “?”, I suppose). This is true for all comments: doc comments, inline stuff, even TODOs. Even if it’s a sentence fragment.

Avoid using block comments.

Use `///` doc comments to document _members and types_. (A doc comment is any comment that appears before a declaration and uses the special `///` syntax that dart doc looks for, because dart doc parses them and generates doc pages from them).
**Try including code samples in doc comments.** Try backtick fences for code blocks.

    - Start doc comments with a single-sentence summary.
    - Add a blank line after the first sentence to split it out into its own paragraph.
    - Use *square brackets* in doc comments to refer to in-scope identifiers.

````dart
/// Returns the lesser of two numbers.
///
/// ```dart
/// min(5, 3) == 3
/// ```
num min(num a, num b) => ...
````

Try writing doc comments for public APIs. No need to document every single library, top-level variable, type, and member, but should document most of them.

[Need examples] Try writing a **library-level doc comment**: document a library by placing a doc comment right _above_ the library directive at the start of the file.

    - A single-sentence summary of what the library is for.
    - Explanations of terminology used throughout the library.
    - A couple of complete code samples that walk through using the API.
    - Links to the most important or most commonly used classes and functions.
    - Links to external references on the domain the library is concerned with.

Try starting function or method comments with third-person verbs and focusing on what the code does.

Try starting a non-boolean variable or property comment with a noun phrase.

    - Try starting a boolean variable or property comment with “Whether” followed by a noun or gerund phrase.

If a property has both a getter and a setter, then create a doc comment for _only one_ of them.

Try starting library or type comments with noun phrases.

Use prose to explain parameters, return values, and exceptions.

```dart
/// Defines a flag.
///
/// Throws an [ArgumentError] if there is already an option named [name] or
/// there is already an option using abbreviation [abbr]. Returns the new flag.
Flag addFlag(String name, String abbr) => ...
```

Put doc comments _before_ metadata annotations.
