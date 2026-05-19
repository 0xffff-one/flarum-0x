### 1.0.7

- **Add** new delimiter options for [AsciiMath](http://asciimath.org/) syntax.

### 1.0.6

- **Add** support for [AsciiMath](http://asciimath.org/) syntax. https://github.com/the-turk/flarum-mathren/issues/35
- **Add** some CDN options which allows you to change them easily.

### 1.0.5

- **Fix** code highlighting breaks when you interact with the page.

### 1.0.4

Requires Flarum v1.2.0+

- **Fix** inline Litedown links have priority over regular BBCodes. (https://github.com/the-turk/flarum-mathren/issues/28)
- **Update** KaTeX to v0.16.0 (see their [changelog](https://github.com/KaTeX/KaTeX/blob/master/CHANGELOG.md)) - _copy-tex now uses js instead of css which makes it more robust_.
- **Update** js dependencies and imports.
- Uses new `default` extender instead of deprecated `addSettings` migration helper.
- Uses exported `flarum/mentions` fragment `PostQuoteButton` instead of replicating it.

### 1.0.3
- Fixed a possible security issue.

### 1.0.2
- PHP 7.3 support

### 1.0.1
- **Fix** wrapping expressions with `code` should preserve alias delimiters when they set as primary delimiters (https://github.com/the-turk/flarum-mathren/issues/27).
- **Fix** "Quote" button should be hidden if you disable the `flarum/mentions` extension.

### 1.0.0

All hail the new TeX renderer solution! I practically rewritten the whole thing.

- As we're using native TextFormatter methods now, expressions should be rendered Flarum-wide automatically.
- Bring back special delimiters (aka the "dollar signs") support. You can even use euro, yuan, turkish lira signs. Not to mention that they're 100% compatible with Markdown & BBCode and ready to render your most complex expressions.
- **Fix** AMS environments won't render outside block delimiters.
- **Drop** decisive keywords & DOM node excluders (they were causing too much confusion, wrap your expressions with the `code` tag instead).
- The backend is more clear than ever, come and join me!

**Breaking changes!**

- Your settings won't be preserved.
- Old expressions might not be rendered until you edit and save the post.

### 0.3.7
- Use `['oncreate', 'onupdate']` lifecycle hooks for `CommentPost` component instead of `onupdate` only.

### 0.3.6
- **Fix** wrong KaTeX css version.

### 0.3.5
- **Fix** posts in discussion won't render if you edit and save a post.
- **Fix** posts in discussion won't render if you change route while editing a post.

### 0.3.4
- **Fix** usernames were rendering in `.PostStream-item` if they contains math delimiters (such as `[math]username[/math]`).

### 0.3.3
- Flarum v1.0.2 compatible
- `fof/best-answer` compatible
- **Update** KaTeX to v0.13.11 (see their [changelog](https://github.com/KaTeX/KaTeX/blob/master/CHANGELOG.md)).

### 0.3.2
- **Fix** can't disable options if their default value is set to `true`.

### 0.3.1
- **Fix** wrong selection range after adding BBCodes via composer buttons.
- **Fix** it was rendering the same post x2 times for no reason. 🤦‍♂️
- **Fix** wrong default value for "Allow copying the source of KaTeX-rendered elements" option.
- Optimize page load time.
    + Now it loads scripts only when it is necessary. Huge thanks to @datitisev
- Switch to CDN.
- **Update** KaTeX to v0.12.0 (see their [changelog](https://github.com/KaTeX/KaTeX/blob/master/CHANGELOG.md)).
- Require `flarum/mentions` to make the quote button work.
- Run prettier for all JS files.

### 0.3.0
- **Drop** special delimiters support (it is BBCodes-only now).
    + Thus, it should work faster from `0.2.x`
    + I'll continue looking for better solutions to use them.
- **Remove** the ability to customize wrappers from the MathRen settings page.
    + Because we can add custom CSS from the Appearance page already.
- **Remove** the ability to change block and inline wrapper classes.
- **Add** live previews.
- **Add** [Copy-tex](https://github.com/KaTeX/KaTeX/tree/master/contrib/copy-tex) plugin.
    + Now you can copy any expression's source to the clipboard. You can even quote it with selection.
    + It's not working flawless though, see their repository for known issues and let's see if we can find unknown ones.
- **Add** some validation for the MathRen settings page.
- **Fix** macros weren't working all the time.
    + Now you have to write them using JavaScript's syntax (e.g. `\name` => `\\name`)

Also the backend has become more clear now, don't hesitate to join me.

### 0.2.7
- **Update** version constraints for Flarum 0.1.0-beta.13.

### 0.2.6
- **Update** version constraints for Flarum 0.1.0-beta.12.

### 0.2.5
- **Add** Ukranian language

### 0.2.4
- **Remove** unnecessary files.
- **Remove** filter definitions.
- **Fix** a typo in settings page component.
- **Fix** linebreaks ruins rendering expressions.

### 0.2.3
- **Fix** (hopefully) all PHP-related errors/warnings/notices.
- **Fix** \\[%e%\\] must come last (if any) in the additional delimiters list.
- **Improve** rendering performance.

### 0.2.2
- **Fix** static methods.

### 0.2.1
- **Fix** syntax error.

### 0.2.0
- **Move** settings to the left pane.
    + It was a long set of options to be shown in a modal.
- **Remove** `<code />` wrapper
    + You don't have to wrap your expressions with `<code />` tag anymore for Markdown or BBCode compability.
- **Add** `<span />` wrapper with customizable class names
    + You still can stylize your expressions.
- **Add** text editor buttons.
    + Disabled by default.
- **Add** customizable delimiters options.
    + Now you can use unlimited set of delimiters through this extension.
- **Add** decisive keywords option to ignore expressions.
- **Add** option for allowing `\color` command (TeX) to take two arguments.
- **Update** README.md

### 0.1.0
- Initial relase.
