---
layout: blog
title:  "Managing dotfiles with Chezmoi"
abstract: "If you're a developer on a Unix-like system you probably have a lot of dotfiles in your $HOME folder. It's likely that you don't really pay a lot of attention to them and so they start to get pretty stuffed and complex. Let's learn how to manage them and keep them cleaner"
date:   2023-01-12 12:59:10 +0200
---

# Intro

If you're a developer on a Unix-like system you probably have a lot of dotfiles in your `$HOME` folder. Files like `.bashrc`, `.zshrc` and others. Most people will probably have had their first encounter with `.bashrc` when they needed to add something to their `$PATH` or define some other environment variable. These files are used to configure various parts of your system including any software you use during development. 

It is my belief that by starting to pay attention to them and being aware of their structure and what you add to them you'll gain a lot of knowledge about how your system works. This will make it easier to customize your development experience, fix any issues that you may encounter and also replicate the experience on another machine.

I think the first step on that journey starts with proper dotfile management. There's a bunch of tools out there that do that, you can check out [this list](https://dotfiles.github.io/utilities/). I'm using [chezmoi](https://www.chezmoi.io/) and it's what I'll be focusing on in this guide.

# Why use Chezmoi?

When I first started managing my dotfiles I came across [holman does dotfiles](https://github.com/holman/dotfiles) which introduced to me to 2 very interesting concepts: splitting by topics and using symlinks.

## Topics
The first concept I learned was separating configurations per topic. So instead of having one big `.zshrc` where I defined environment variables for everything I used, I could break these up in smaller files. So I had a `java` folder where I had config files for everything related to `java`, one for `ruby` and so on. Then `.zshrc` would just need to source all those topic files based on some convention. You can take this one step further and have multiple files within each topic: one for adding to `$PATH`, one for defining environment variables and so on.


## Symlinks
The first was putting all dotfiles in a folder and then using a script to automatically symlink everything into my `$HOME` directory. This worked great back then because I was only using `.zshrc` and `.vimrc` and both of then needed to be symlinked into the same directory. Later, when I switched to [neovim](https://neovim.io/) I found that its config file had to be under `~/.config/nvim/init.vim` and this broke the convention that I was using. Not a big issue I thought, I'll just symlink this one file manually. But as I moved to a more command line focused workflow and I added more tools I found that this wasn't scaling very well.

So it became clear I needed something else, which is how I ended up finding [chezmoi](https://www.chezmoi.io/).

# Guide

## Installation

Installation is pretty straightforward and detailed instructions are available [here](https://www.chezmoi.io/install/). A simple one-liner command is this:


{% highlight bash %}
$ sh -c "$(curl -fsLS get.chezmoi.io)"
{% endhighlight %}

## Initialize dotfile repository

You need to run this in your command line

{% highlight bash %}
$ chezmoi init
{% endhighlight %}

This will create a new directory at this path `.local/share/chezmoi`. If you don't want to type that path every time, there is a helper command `chezmoi cd` that will take you that directory.

## Add your first dotfile

Let's add `.zshrc` to the repository. Run this:

{% highlight bash %}
$ chezmoi add ~/.zshrc
{% endhighlight %}

This will create a copy of `.zshrc` and add it to `.local/share/chezmoi`. If you run `chezmoi cd` now, you should see a file named `dot_zshrc` with the same contents as the original `.zshrc`

At this point it may be a good ideea to start tracking changes in this folder with a git repository. 

## The workflow

You've added your first file now it's time to look at how you would use this day to day. An important thing to note is that you never want to edit the original files, but always edit only those managed by **chezmoi**.

Go ahead and make a change in `.local/share/chezmoi/dot_zshrc` and then run

{% highlight bash %}
$ chezmoi diff
{% endhighlight %}

You should now see something similar to a git diff, showing you all the changes you've made in the chezmoi folder. If you're happy with those changes just run:

{% highlight bash %}
$ chezmoi apply
{% endhighlight %}

This will replace the contents of `~/.zshrc` with what's defined in `.local/share/chezmoi/dot_zshrc`

So the basic workflow will be:
1. Edit source files in your chezmoi folder
2. Run `chezmoi diff` to check the diff
3. Run `chezmoi apply` to apply the changes to the destination files


## Moving to a different machine

When you want to port your dotfiles to another machine you just need to initialize chezmoi with the url of the repo you created earlier

{% highlight bash %}
$ chezmoi init <url-of-repo>
{% endhighlight %}

This will clone the repository under `.local/share/chezmoi/` and after that you just use the regular workflow from before. Check the changes with `chezmoi diff` and apply them with `chezmoi apply`

## Using templates

So now you've setup everything, you got stuff working on 2 machines but soon you find yourself wanting to configure the same thing with different values based on the OS. One thing you could do is do a conditional based on the output of `uname -r`. That'll do the job, but it can be a bit clunky. Chezmoi solves this with templates.

In my case, I wanted different font sizes in my [alacritty](https://github.com/alacritty/alacritty) terminal window based on the machine I was using.

First thing you want to do is rename the config file and add a `.tmpl` extension. So `dot_zshrc` becomes `dot_zshrc.tmpl`. Then you can use the template syntax in that file and chezmoi will interpret it whenever you apply your changes.

In my case this is what I ended up having in my alacritty config

{% highlight yaml %}
{{ "{{ if eq .chezmoi.os "darwin" }}" | escape }}
  font:
    size: 11
{{ "{{ else if eq .chezmoi.os "linux" }}" | escape }}
  font:
    size: 9
{{ end }}
{% endhighlight %}

To see all the data points chezmoi knows about you can run:

{% highlight sh %}
$ chezmoi data
{% endhighlight %}

This will output a hash with all the info chezmoi has about your system

For more info check out the [official documentation](https://www.chezmoi.io/user-guide/templating/)


## Using hooks

One thing I wanted to do was reload my ZSH config whenever I would apply changes with chezmoi. You can do that using scripts created your dotfile repository. The names of these scripts have to start with `run_`. After that you can add `before_` or `after_` to indicate if they should run before changes are applied or after. So you'd have something like `run_after_`.

In my case I have a `run_after_reload.sh` script that just reloads my ZSH config

{% highlight sh %}
# run_after_reload.rh
#!/bin/zsh
. ~/.zshrc
{% endhighlight %}

There's a bunch more options available, just check out the [official documentation](https://www.chezmoi.io/user-guide/use-scripts-to-perform-actions/)


# Outro

I hope this was a useful entry for why and how you should start managing your dotfiles.

Cheers.

