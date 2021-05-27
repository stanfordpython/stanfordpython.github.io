# Lesson Plan: Python Standard Libraries (Week 8)

[[TOC]]

## Pre-Section Preparation
Visit the [Ed Workspace](https://edstem.org/us/courses/2850/workspaces/puIswF0ZG7XVRzJEX52UhWLhTe303cdS) and fork it to create your own copy. (Make sure to remove the answer key before distributing to students). 🙃

## Community Building \[5 mins\]

Here are some ideas for community building activities (mostly these are the same as last week, with the top one being a new addition):
* Ask everyone a Would You Rather question; there's a list in [this folder](https://drive.google.com/drive/folders/1SobifNwo_dPMA_dO78IUVUuyATwlqF9N?usp=sharing)
* Have people sign up to lead a community building activity each week by adding their name to a Google Doc; then, each week, they'll be in charge of doing some sort of icebreaker during the first 5 minutes of section or so
* Ask people to send you their favorite meme/video/song/picture/... and share during section.
* Ask people to DM you a fun fact about themselves and then share the fun facts; have them guess whose it was.
* Ask people to share the last picture they took on their phone (that they're comfortable with) and share about it.
* Play a (short) game like skribbl.io!
* Build a trivia quiz (maybe from the trivia API?) and see if your students can figure it out.
* Show and tell: ask everyone to get an object from their room that represents how they're feeling right now and share with the class.
* Build a slide deck for the zoom game—show three pictures, successively zooming out from an object, and ask people to guess what the object is at each level.
* Since we've now covered all the material from CS 41, have students discuss their favourite thing(s) they took away from the class.

## Concept Review \[15 mins\]

<div class="alert alert-info">
    <span>This is another one of those weeks where students don't need to know everything that we talked about. We intentionally talked about more material with the idea that students would come away with one main takeaway—how to navigate the standard library—and see some cool examples of these functions. As such, you don't need to spend a long time reviewing each of the third-party packages we discussed, but you should probably spend some time talking about third-party packages at a high level and then talking about one or two packages that students are most interested in, or confused about.</span>
</div>

In lecture, we focused our discussion mostly on third-party packages for data science and machine learning (this was based on our understanding of student interest, as gathered from the mid-quarter assessment). As such, we talked about:
* `pandas`
* `numpy`/`scipy`
* `matplotlib`/`seaborn`

We talked about all of these libraries at a high level, giving 1-2 examples of each, so don't expect that we've covered everything there is to know about any of these libraries: the main takeaway should be a high level overview of what each of these libraries are for, and from there, students should be able to look into the documentaton for each library to figure out how to use it. This lab will give students more practice with that.

In this lab, we've offloaded much more of the problem setup to the notebook: as such, this lesson plan is going to be a bit more sparse, in that it will provide a high-level overview of the problems and the motivations behind them. As the solutions are often split into many cells across the notebooks, those, too, have been left for you in `solutions.ipynb`, rather than here.

## Problem 0: Data Narratives Activity

<div class="alert alert-info">
    <span>This is the only problem in the lab session that is mandatory: one of the goals we had for this unit on data science and machine learning, which we also explored somewhat in Dear Data, is this idea of using data to tell a story. You should probably spend between one third and half of section on this activity - we also think it's going to be a ton of fun for students, as they play around with the tools from last lecture to evaluate the veracity of different claims using Python.</span>
</div>

After completing the data narratives activity, let students pick the other problem(s) that they'd like to do - they're all good practice based off of what we talked about in lecture on Tuesday.

## Problem 1: AI is the New Electricity

In this problem, you will guide students through implementing two `scikit-learn`-based supervised learning models to classify digits in the MNIST dataset. Students will first construct a logistic regression model, then a multi-layered perceptron model (neural network), to classify the digits. Even though we've given this problem quite a lot of setup, the two main takeaways for students should be:

1. Machine learning models based on complex mathematics can be implemented using third-party packages with relatively few lines of code.
2. The 7-step machine learning project overview that's discussed at the top of the notebook segment for this problem. Students should feel comfortable with the idea of training, validation, and test sets, designing a model, and adjusting hyperparameters, by the end of this notebook segment.

## Problem 2: Netflix Recommendations

In this problem, students will use cosine similarity to find movies that a given user is most likely to enjoy, given a dataset of users and their movie preferences. This takes a different slant on the supervised learning problem: rather than classifying images into buckets, here, we are recommending to users new things they might enjoy based on their prior preferences. This type of problem is called a _collaborative filtering_ problem, and appears frequently in recommender systems and search. This one is the most mathematically intensive of the problems in this lab: in addition to cosine similarity, students will be normalizing the columns of a matrix, and so students without a basic linear algebra background (like MATH 51, or CME 100) may find they take away less from the activity than those with such a background.

## Problem 3: Plotting Practice!

This set of mini-problems is a fun review of plotting in `matplotlib` and `seaborn`. Students will write some code to plot line plots, scatter plots, and heat maps, and familiarize themselves with labeling axes, adding plot titles, and adding legends to multi-line plots. These problems are pretty short (at least, compared to the others), so they might make for a fun warm up if your students are interested in data visualization.

## [Weekly Reflection](https://forms.gle/FmL6poJcjfBSZpUFA)
Click the header link above to access this week's reflection. Have an absolutely lovely weekend everyone!
