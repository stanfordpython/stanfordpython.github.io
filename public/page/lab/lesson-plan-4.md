# Lesson Plan: Functions (Week 4)

[[TOC]]

## Pre-Section Preparation
Visit the [Ed Workspace](https://edstem.org/us/courses/20141/workspaces/pPk3915qSiZcUpWF1x6DyDSpMeRDQ70I) and fork it to make a copy that you own.

## Community Building \[5 mins\]
Here are some ideas for community building activities:
* Ask everyone a Would You Rather question; there's a list in [this folder](https://drive.google.com/drive/folders/1SobifNwo_dPMA_dO78IUVUuyATwlqF9N?usp=sharing)
* Have people sign up to lead a community building activity each week by adding their name to a Google Doc; then, each week, they'll be in charge of doing some sort of icebreaker during the first 5 minutes of section or so
* Ask people to send you their favorite meme/video/song/picture/... and share during section
* Ask people to share the last picture they took on their phone (that they're comfortable with) and share about it.


## Concept Review \[10 mins\]
Take some time to go over anything people have questions about. In class, we talked about **functions**. This topic is frequently forgotten because of how nuanced it can be. Python allows for wacky combinations of positional, keyword, default, and variadic arguments—not to mention that we introduced all of that vocabulary, so you might want to spend a good amount of time reviewing all of those terms.

This (admittedly overwhelming) picture gives a full description of all of the parameter types in Python 3.9. It's unlikely that you'll be asked about all of these (positional only arguments are especialy esoteric), but if you can explain this diagram and talk about *why* these symbols force the corresponding parameter configuration, then you understand the subject really well.
<p align="center">
    <img style="max-width: 100%" alt="a description of each of the parameters in a function; the slides in lecture provide a more accessible walkthrough" src="https://drive.google.com/uc?id=1M_E7EnJ60HqX1ivcK_iOf-P2KU8ZkKCj" />
</p>

We also talked about scope and namespaces and ended by introducing the idea that functions are "first-class" (i.e., functions are objects). We didn't say much about what that means but there's an opportunity to explore that in this lab.

Students may have questions about their assignment, so it might be worth taking a moment to review [the spec](https://stanfordpython.com/#/page/assignment-1). 


## Problems \[45 mins\]
<div class="alert alert-warning">
    <span>A lot of these problems can be a bit boring or really technical. I think it's important to note that students don't need to know the complicated parameter structure and namespaces/scope will be a lot more engaging if you have students make diagrams of it.</span>
</div>

The magic methods problem that we included here is challenging, but it wraps together everything we've learned over the past few weeks. If you can get there, I'd strongly recommend it—it's interesting, summative, and fun.

### Namespaces & Scope
These problems ask students to predict the output of Python programs. They're useful for making the topics from lecture precise. I'd recommend doing think-pair-share where you have people think about the output, pair up and discuss, and then share out with everyone. That reduces the self-esteem threat if they get them wrong.

Afterwards, I'd suggest making a diagram to represent this together as a section. If you want to do this, you should pre-prepare a slide deck with some manipulatives (boxes for `x`, `y`, `foo`).

### Variadic Arguments
Students might be confused about `*args` and `**kwargs` because, for many of the examples, you could just pass in a list or a dictionary instead of using variadic arguments... Although it's true that many times variadic arguments are purely stylistic, the main idea is that `*args` and `**kwargs` can be used to create function interfaces that are very general. They also show up a lot in professional Python code. 

We've got some fun problems in this section, and I'd recommend spending time on one or two of them—emphasize *reading* these function signatures as much as *writing* them...

One way to do this is to ask students to create a function signature from a description like: "I'm thinking of a function with three positional arguments, one argument that must be positional, with a default value of 3, and a variadic number of keyword arguments. What's the signature of this function?" That activity is rough, but if your students can do that, they will *certainly* know the material. Up to you, but if done well, it could be a lot of fun. For your reference, [here's](https://docs.google.com/presentation/d/1PKOy7I7BOPw2yt71h90R9DNT_dzSow5l0QWQz1DLxPI/edit#slide=id.gd029f2dfc1_0_537) a version of this actvity to try out in groups! Make a copy of the presentatin before your groups work on it.

### First-Class Functions
We've designed this part of the lab to be very open-ended. We revisit the idea of functions as objects in two weeks during the Functional Programming lecture, so the most ideal version of the world would be that students independently investigate some of those topics so that the FP lecture can be more effective. No pressure, though—this section is largely for future learning.

## Group Work \[20 min\]

We are leaving the last 20 minuties for groups to get started on the Scav Hunt! 

