#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Adam Cox'
SITENAME = u'Adam Cox'
SITEURL = 'https://mradamcox.github.io'

PATH = 'content'

TIMEZONE = 'America/Chicago'

DEFAULT_LANG = u'en'

THEME = "legion-theme"

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('Pelican', 'http://getpelican.com/'),
         ('Python.org', 'http://python.org/'),
         ('Jinja2', 'http://jinja.pocoo.org/'),
         ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)
          
MAP_GALLERY = (
    
    ("{}/theme/img/map_gallery/Gunthorp Farm.png".format(SITEURL), 'Food Producer Cluster map for Crossroads Resource Center'),
    ("{}/theme/img/map_gallery/CRC_ME_elevation.png".format(SITEURL), 'Phyiographic map for Crossroads Resource Center'),
    ("{}/theme/img/map_gallery/FullCounty_physiographic.png".format(SITEURL), 'Hazard Mitigation map for OCR West'),
    ("{}/theme/img/map_gallery/SanAugustineDetail.jpg".format(SITEURL), 'Hazard Mitigation map for MPTX'),
    ("{}/theme/img/map_gallery/viroqua_to_sidieFINAL (Morea) reduce.png".format(SITEURL), 'Virqua/Sidie Hollow area map for Vernon Trails'),
    ("{}/theme/img/map_gallery/CenturyRideMaps2015_draft3.png".format(SITEURL), 'Century Ride brochure map for Bike Natchitoches'),
    ("{}/theme/img/map_gallery/Walmsley Graves 11x17.jpg".format(SITEURL), 'American Cemetery map just for fun'),
    )

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
