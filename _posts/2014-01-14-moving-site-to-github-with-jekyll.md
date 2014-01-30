---
layout: post
category : coding
tags : [Jekyll, Web, GitHub]
image: githubPages.png
---

I have been making use of Github a lot recently and after getting the latest invoice from my current host I thought I would take a look at Github pages, initially because it was free. My main worry was the lack of server side scripting and database access. After doing some research I needn't have worried as Jekyll fills most of the the gaps I'm interested in and there are plugins that can do the other stuff i.e. Disqus for comments.

If you haven't heard of [Jekyll](http://jekyllrb.com/) it is a static web site compiler. It takes a set of markdown files, html files, site assets, configuration and some liquid templates and compiles it all down to static html. This enables you to get some of the benefits of a scripted site but without the need to do any server side scripting. This allows you to run the site almost anywhere. What's even better is that if you run Jekyll within a GitHub repository then it will auto compile your site whenever you check something in.

###Setting up Jeykyll within Github

If you want to do this for yourself you are going to need to create a GitHub pages repository first. The easiest way to do this is create a repo from the website with the name &lt;username&gt;.github.io. Once this has setup you can access the site from the url http://&lt;username&gt;.github.io. It takes about 10 minutes or so to setup initially so don't get too hung up when it doesn't appear straight away. GitHub have also helpfully produced a [guide](http://pages.github.com/).

At this point if you have your own domain that you want to use instead then you can set that to point at your Github pages site. The way I did this was to set the CNAME on my domain to point to the Github pages url setup in the last step, and then create a file called CNAME wihin your github pages repository, with just the url of the domain that you are pointing at your account and again wait a few minutes and it will spring into life. If you don't add the CNAME file then you will just see the Github 404 page so it is essential you add this. For reference this is [my CNAME file](https://github.com/elliotstokes/elliotstokes.github.io/blob/master/CNAME)

Once that is all setup you can then install Jekyll into your repository. I found it easier to start with Jekyl Bootstrap as I was planning on using Boostrap anyway. This [guide](http://jekyllbootstrap.com/usage/jekyll-quick-start.html) will give you step by step instructions on how to do this. To summarise, it's just a matter of downloading the code from GitHub and then pushing it up to your pages repository.

Now Jekyll is setup you can customise it as you want. It's really easy to customise once you know how it all fits together. At the time of writing it was still running on Boostrap 2.x so I moved it up to 3.3 and customised the look a bit (for better or worse). It is also pretty useful to install Jekyll locally to test your site before you push it up to Github. Installation is done via Gem so if you are on a mac, Ruby should already be installed otherwise you will probably need to [install it](http://rubyinstaller.org/downloads/). Once installed just run:

	gem install Jekyll

Then from the folder your Jekyll site is located you can build it with:

	jekyll build

and you can test it with:
	
	jekyll serve

The site should then be accessible from <code>localhost:4000</code>. You then have a globally accessible site with a local environment for testing. 


