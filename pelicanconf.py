#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
from datetime import date

AUTHOR = u'Adam Cox'
SITENAME = u'Adam Cox'
SITEURL = r'https://mradamcox.github.io'

PATH = 'content'

STATIC_PATHS = [
    'extra',
    'maps',
    'geog4046',
]

EXTRA_PATH_METADATA = {
    'extra/favicon.ico': {'path': 'favicon.ico'},
}

READERS = {"html": None}

TIMEZONE = 'America/Chicago'

DEFAULT_LANG = u'en'

THEME = 'theme'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

PUBLISH_DATE = date.today().strftime("%B %-d, %Y")
DEFAULT_DATE_FORMAT = ("%B %d, %Y")

# Blogroll
LINKS = (
    ('GitHub', "https://github.com/mradamcox", "/theme/img/github.png"),
    ('Observable', "https://observablehq.com/@mradamcox", "/theme/img/observablehq.png"),
    ('Twitter', "https://www.twitter.com/mradamcox", "/theme/img/twitter.png"),
    ('LinkedIn', "https://www.linkedin.com/in/mradamcox", "/theme/img/li.png"),
)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
