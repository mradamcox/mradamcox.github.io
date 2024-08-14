---
title: Moving to Pelican and GitHub Pages
date: 2016-09-09
category: news
author: Adam
slug: moving-the-website
tags: announcements, infrastructure, AWS
---

In an effort to consolidate my non-business activities and save some money, I've just finished transferring this website from AWS EC2 to GitHub pages. I had built the site by hand, a small collection of html/php and css files, which is to say it was very simple and didn't need an actual server. I'd recently become familiar with Pelican and GitHub pages, so this seemed like a natural solution. (I'd also taken a stab at using Pelican and AWS S3, which is how I ran my business website for a while, but after repeated issues with the windows S3 CLI, I've found the following setup to be easier to maintain.)

The most time-consuming part of the process was creating this theme to mimic the original website's style, which I had spent a good deal of time on originally. Now that's all done, and I've set up two repositories as described in [this Fedora Magazine article](https://fedoramagazine.org/make-github-pages-blog-with-pelican/). One repo, [mradamcox.github.io-src](https://github.com/mradamcox/mradamcox.github.io-src), is the full pelican project, with the theme and settings, while the second, [mradamcox.github.io](https://github.com/mradamcox/mradamcox.github.io), is a sub-module inside the first, "posing" as the Pelican output folder. It works great, and is similar to how I've come to host my business site as well.

Finally, I still wanted to use the original domain, www.adamcfcox.com. GitHub pages allows you to do this, by 1. saving a custom domain name in the mradamcox.github.io repo settings, and then 2. creating a CNAME record in the DNS that points back to mradamcox.github.io. Now when you go to [http://mradamcox.github.io](http://mradamcox.github.io) or [http://www.adamcfcox.com](http://www.adamcfcox.com), you are ending up at the same static site, served directly from the mradamcox.github.io repo.

All in all, I am now one step closer to being able to stop my only remaining personal EC2 instance. Transferring a GeoServer installation is the only task that remains...
