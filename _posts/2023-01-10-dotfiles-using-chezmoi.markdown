---
layout: blog
title:  "Managing dotfiles with Chezmoi"
abstract: "If you're a developer on a Unix-like system you probably have a lot of dotfiles in your $HOME folder. It's likely that you don't really pay a lot of attention to them and so they start to get pretty stuffed and complex. Let's learn how to manage them and keep them cleaner"
date:   2023-01-10 15:59:10 +0200
---

# Intro

If you're a developer on a Unix-like system you probably have a lot of dotfiles in your `$HOME` folder. Files like `.bashrc`, `.zshrc` and others. Most people will probably have had their first encounter with `.bashrc` when they needed to add something to their `$PATH` or define some other environment variable. These files are used to configure various parts of your system including any software you use during development. 

It is my belief that by starting to pay attention to them and being aware of their structure and what you add to them you'll gain a lot of knowledge about how your system works. This will make it easier to customize your development experience, fix any issues that you may encounter and also replicate the experience on another machine.

I think the first step on that journey starts with proper dotfile management. There's a bunch of tools out there that do that, you can check out [this list](https://dotfiles.github.io/utilities/). I'm using [chezmoi](https://www.chezmoi.io/) and it's what I'll be focusing on in this guide.

# Guide

## Installation

Installation is pretty straightforward and detailed instructions are available [here](https://www.chezmoi.io/install/). A simple one-liner command is this:


{% highlight bash %}
sh -c "$(curl -fsLS get.chezmoi.io)"
{% endhighlight %}

## Initialize dotfile repository

You need to run this in your command line

{% highlight bash %}
chezmoi init
{% endhighlight %}

This will create a new directory at this path `.local/share/chezmoi`. If you don't want to type that path every time, there is a helper command `chezmoi cd` that will take you that directory.

## Add your first dotfile

Let's add `.zshrc` to the repository. Run this:

{% highlight bash %}
chezmoi add ~/.zshrc
{% endhighlight %}

This will create a copy of `.zshrc` and add it to `.local/share/chezmoi`. If you run `chezmoi cd` now, you should see a file named `dot_zshrc` with the same contents as the original `.zshrc`

At this point it may be a good ideea to start tracking changes in this folder with a git repository. 

## The workflow

You've added your first file now it's time to look at how you would use this day to day. An important thing to note is that you never want to edit the original files, but always edit only those managed by **chezmoi**.

Go ahead and make a change in `.local/share/chezmoi/dot_zshrc` and then run

{% highlight bash %}
chezmoi diff
{% endhighlight %}

You should now see something similar to a git diff, showing you all the changes you've made in the chezmoi folder. If you're happy with those changes just run:

{% highlight bash %}
chezmoi apply
{% endhighlight %}

This will replace the contents of `~/.zshrc` with what's defined in `.local/share/chezmoi/dot_zshrc`

So the basic workflow will be:
1. Edit source files in your chezmoi folder
2. Run `chezmoi diff` to check the diff
3. Run `chezmoi apply` to apply the changes to the destination files
