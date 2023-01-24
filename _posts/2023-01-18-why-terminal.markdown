---
layout: default
title:  "Why use a command line dev environment"
abstract: "If you're a developer on a Unix-like system you probably have a lot of dotfiles in your $HOME folder. It's likely that you don't really pay a lot of attention to them and so they start to get pretty stuffed and complex. Let's learn how to manage them and keep them cleaner"
date:   2023-01-12 12:59:10 +0200
container_class: blog-post
---
# Intro

I get asked this a lot. Why in this day and age, when there's so many IDEs and fancy editors out there, do you still use vim? And even more so, vim in a terminal window. I mean, there's Gvim available. I'll try to list out why it is that I work they way that I do and why I think you'd like to if you put in the effort and got used to it.


# Why vim?

This is usually the first question that I get asked. To be honest this isn't happening as much as it used to. Mostly I think it's because I feel vim has gotten a bit more popular and everyone will just assume I use it so I can be **"blazingly fast"**. The myth of the vim user that runs circles around someone using a regular GUI editor is still making the rounds out there. I can tell you this, if you know someone who's really fast at coding and delivering, vim may be a reason for their performance, but I think it's mostly because they're good developers. They'd probably be almost as fast with any other editor. They probably won't be as comfortable, but if they're an amazing developer with vim, they're an amazing developer without it.

In my case, the answer to this question, is "It's comfortable for me". It's a benefit of ergonomics, I don't really like using the mouse to edit text, I always prefer using the keyboard for shortcuts and so it's a natural fit. I am indeed faster that if I were to use some other classical editor but since most of my development time is spent thinking and rubbing my chin while going "hmmm", vim doesn't help much there.

But I think this question sort of misses the point. While vim is a core part of my workflow, the most important part for me is using a command line. I like to describe my develoment environment as a command line in which I can also edit text. Vim just happens to neatly fill that part of this description. But the main part is the command line.

So this begs the next question:

# Why a command line?

It may seem like a silly question, I mean everyone has a terminal window somewhere running a `node` process or `rails s`. If you do backend you probably use it a lot to access a REPL, like `rails c`. But it usually has a secondary role, more like something that one **has** to use, rather than something that they **want** to use.

Here are some of the reasons I prefer to work this way:

## The "Eh, it's one less window I have to worry about"

When I first started using vim I started with gvim. Having used GUI editors up until that point I felt like the good choice. So I had 3 main windows I had to worry about: a browser, gvim and the terminal window. The thing is I like to have my windows always in fullscreen so I can see as much as I can and I **really dislike** having to `Alt-Tab` between windows or having to use the mouse to select them. So I figured that using vim inside the terminal would be easier, one less window to worry about. You have to switch between tabs and/or splits inside the terminal window but it felt better for me, it felt more focused.
It was a small thing and minor reason for the switch, but it would end up having a big impact.

As I was spending most of my time inside the command line, naturally I wanted to try and do as much as I could from inside there. Need to create a new, or move some files around? Use commands, `touch`, `mv`, `rm`. Soon I started to see some patterns in my workflow, series of steps that I would frequently do and so what followed was creating some scripts to automate some of these things. And building the scripts led to finding about all sorts of awesome commands unix systems ship with. And
what I liked most was how composable everything was. Using `|` to pipe output from one command from another and having a process described as a series of somewhat simple unix commands.

Aside from the benefits that I got when doing my work, it also benefited me whenever I had to `ssh` to a remote server(this was before docker and containers). Working on a remote maching from the command line no longer felt like this alien environment that I was struggling to navigate, it felt like home, I was comfortable operating there.

What I'm trying to say is that I saw adjacent benefits whenever I learned a new tool on the command line. It wasn't only the benefit that I gave me right then, with that particular thing that I was trying to do, it was helping me in other areas, the benefits were compounding.

And this leads me right to my next reason:

## The synergies
