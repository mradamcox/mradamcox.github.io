title: Consolidating Pelican Build and Deployment with GitHub Actions
date: 2023-02-27
category: tech
author: Adam
slug: consolidating-pelican-build-and-deployment-with-github-actions
tags: Pelican, GitHub Actions,

I've been reworking the structure of this site a bit, mostly just in how it is built and deployed (surely not adding any interesting content...), and mostly just for "fun". Just a quick post here to record two updates I've made over the last couple of weeks in quick succession.

## Getting Rid of the Output Submodule

A [long time ago](/moving-to-pelican-and-github-pages.html), I set this site up as two separate repos, one called `mradamcox.github.io-src` and another, which was setup as a submodule inside the first, called `mradamcox.github.io`. The structure was such that running `pelican content` in the `-src` repo would build the site directly into the submodule, which, as a separate repo with GitHub pages enabled, would automatically get built and deployed.

Recently, however, I learned that GitHub pages can now build from a top-level `docs` directory in your repo, where before it would only build from the root directory. This meant that I was able to completely get rid of the submodule (no one really likes those anyway) and delete that repo, rename the source repo to remove `-src` from the end, and then update the `pelicanconf.py` file to output the build to a `./docs` directory.

After that, running `pelican content` would build the site directly into `docs`, and then `git commit -s docs -m "rebuild site" && git push` would update the code on GitHub and trigger the Pages deployment.

## Using GitHub Actions

However, just today I was looking a bit further into Pelican for a work project, and found [this ticket](https://github.com/getpelican/pelican/issues/2993) about automatic deployment with GitHub Actions. The benefit of this, I realized, is that you don't need to have a local clone that you build and then commit and push... Editing a single markdown file directly in GitHub would trigger an update on the live website.

The ticket points to this GitHub Action, [rehanhaider/pelican-to-github-pages](https://github.com/rehanhaider/pelican-to-github-pages), and here it is in the [GitHub actions marketplace](https://github.com/marketplace/actions/pelican-to-github-pages).

I followed the simple deployment steps, leaving out the `CNAME` setting as I don't have one for this site at this time, so my `.github/workflows/pelican.yml` file looks like this:

```
name: Deploy

on:
  # Trigger the workflow on push on main branch,
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
      with: 
        submodules: 'true'
    - uses: rehanhaider/pelican-to-github-pages@v1.0.3
      env:
        GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
```

While this did immediately build the content using the settings in `publishconf.py` every time a push event hit the `master` branch, it wasn't yet deploying to the public pages website.

In the repo Settings, I realized GitHub pages was still trying to build off of the `./docs` directory in the master branch, but the new Action wasn't actually committing anything to that directory. Judging from the logs, it was actually committing and pushing the build to a new `gh-pages` branch (which I hadn't used at all in this repo yet), so I switch the GitHub Pages configuration to build from the root of that branch, and it worked as a charm.

---

One thing I found a little confusing at first is that GitHub Pages is listed as an Action in the repo already, so now there are two actions: 1) the one I just added, which runs on every push to `master`, and finishes by pushing to `gh-pages`, and 2) the default GitHub Pages action which, now, is triggered on any push to `gh-pages`, and finishes by publishing that content to this site.

Maybe this setup will last another seven years...
