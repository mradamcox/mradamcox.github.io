Title: Bar and Restaurant Ownership in the French Quarter and Marigny
Date: 2020-05-08
Category: projects
Author: Adam
Tags: New Orleans, OSM
Summary: This is a write-up for my final project in GEOG 4046. <a href="/geog4046/final/">View the Web Map</a> The goal with this web page project is to show bars, music clubs, and restaurants in downtown New Orleans--not just where they are, but who owns them. The map is focused on businesses located in the French Quarter and Marigny, and attempts to illustrate which establishments...

_This is a write-up for my final project in GEOG 4046. [View the Web Map](/geog4046/final/)_

## Introduction

The goal with this web page project is to show bars, music clubs, and restaurants in downtown New Orleans--not just where they are, but who owns them. The map is focused on businesses located in the French Quarter and Marigny, and attempts to illustrate which establishments are part of larger networks, and which ones are truly independent within the district. Visualizing this information may be especially important during this time, as the temporary closures due to the covid-19 pandemic will not be temporary for everyone.

[![Cover Image](/geog4046/final/assets/header image.png)](/geog4046/final/)

## Input Datasets

Two datasets were used to create the map, both of which are publicly available through the city of New Orleans open data initiatives.

### 1. Active Occupational Licenses

This is a feature layer served through the city's public ArcGIS server:

[https://gis.nola.gov/arcgis/rest/services/Revenue/ActiveOccupationalLicenses/FeatureServer](https://gis.nola.gov/arcgis/rest/services/Revenue/ActiveOccupationalLicenses/FeatureServer)

It is a point layer containing approximately 13,500 features, each representing the location and details about a single business license.

**Example Occupational License Record**

<pre class="limit-height">
BusinessAddress: 941 BOURBON ST
BusinessLicenseNumber: 240807
BusinessName: LAFITTE'S BLACKSMITH SHOP
BusinessPhone: 5045939761
BusinessStartDate: April 15, 1996
BusinessType: 1126 - DRINKING PLACES (ALCOHOLIC BEVERAGES)
CBD: Not In Central Business District
City: NEW ORLEANS
CleanZoneDates: June 25, 2017 (6 am) to July 3, 2016 (6 pm)
CleanZoneOrdinance: Cal. No. 31,900
CleanZoneTitle: Essence Festival
CouncilDistrict: C
CulturalProductsDistrictName: French Quarter
DDD: Not In Downtown Development District
FQTEDD: Within FQTEDD
FireDemandZone: 1130
FireEngine: E09
FoodTruckAuthorization: Prohibited
FoodTruckZone: Food Truck Prohibited Zone
LocalHistoricDistrictName: Vieux Carré
LocalHistoricDistrictOrdinance: New Orleans Code of Ordinances, Part II - Code, Chapter 166 - Vieux Carre, Sec. 166-2
LocationX: 3682900.95292
LocationY: 533555.780869
MailAddress: 941 BOURBON ST
MailCity: NEW ORLEANS
MailState: May 1, 2020
MailZip: 70116
MoratoriumTitle: NO ABO Moratorium
NOFDDistrict: 2
NOPDDistrict: 8
OBJECTID: 1068000
OwnerName: BLACKSMITH MANAGEMENT, INC.
RevenueZone: 7
State: May 1, 2020
StreetName: BOURBON
StreetNumber: 941
StreetSuffix: ST
TIFTitle: Not within a Tax Increment Finance (TIF) District
VieuxCarre: Vieux Carre
VieuxCarreOrdinance: New Orleans, Code of Ordinances, Part II - Code, Chapter 166 - Vieux Carre, Sec. 166-2
Zip: 70116
ZoneLabel: Vieux Carre
BusinessAddress: 941 BOURBON ST
BusinessLicenseNumber: 240807
BusinessName: LAFITTE'S BLACKSMITH SHOP
BusinessPhone: 5045939761
BusinessStartDate: April 15, 1996
BusinessType: 1126 - DRINKING PLACES (ALCOHOLIC BEVERAGES)
CBD: Not In Central Business District
City: NEW ORLEANS
CleanZoneDates: June 25, 2017 (6 am) to July 3, 2016 (6 pm)
CleanZoneOrdinance: Cal. No. 31,900
CleanZoneTitle: Essence Festival
CouncilDistrict: C
CulturalProductsDistrictName: French Quarter
DDD: Not In Downtown Development District
FQTEDD: Within FQTEDD
FireDemandZone: 1130
FireEngine: E09
FoodTruckAuthorization: Prohibited
FoodTruckZone: Food Truck Prohibited Zone
LocalHistoricDistrictName: Vieux Carré
LocalHistoricDistrictOrdinance: New Orleans Code of Ordinances, Part II - Code, Chapter 166 - Vieux Carre, Sec. 166-2
LocationX: 3682900.95292
LocationY: 533555.780869
MailAddress: 941 BOURBON ST
MailCity: NEW ORLEANS
MailState: May 1, 2020
MailZip: 70116
MoratoriumTitle: NO ABO Moratorium
NOFDDistrict: 2
NOPDDistrict: 8
OBJECTID: 1068000
OwnerName: BLACKSMITH MANAGEMENT, INC.
RevenueZone: 7
State: May 1, 2020
StreetName: BOURBON
StreetNumber: 941
StreetSuffix: ST
TIFTitle: Not within a Tax Increment Finance (TIF) District
VieuxCarre: Vieux Carre
VieuxCarreOrdinance: New Orleans, Code of Ordinances, Part II - Code, Chapter 166 - Vieux Carre, Sec. 166-2
Zip: 70116
ZoneLabel: Vieux CarreBusinessAddress: 941 BOURBON ST
BusinessLicenseNumber: 240807
BusinessName: LAFITTE'S BLACKSMITH SHOP
BusinessPhone: 5045939761
BusinessStartDate: April 15, 1996
BusinessType: 1126 - DRINKING PLACES (ALCOHOLIC BEVERAGES)
CBD: Not In Central Business District
City: NEW ORLEANS
CleanZoneDates: June 25, 2017 (6 am) to July 3, 2016 (6 pm)
CleanZoneOrdinance: Cal. No. 31,900
CleanZoneTitle: Essence Festival
CouncilDistrict: C
CulturalProductsDistrictName: French Quarter
DDD: Not In Downtown Development District
FQTEDD: Within FQTEDD
FireDemandZone: 1130
FireEngine: E09
FoodTruckAuthorization: Prohibited
FoodTruckZone: Food Truck Prohibited Zone
LocalHistoricDistrictName: Vieux Carré
LocalHistoricDistrictOrdinance: New Orleans Code of Ordinances, Part II - Code, Chapter 166 - Vieux Carre, Sec. 166-2
LocationX: 3682900.95292
LocationY: 533555.780869
MailAddress: 941 BOURBON ST
MailCity: NEW ORLEANS
MailState: May 1, 2020
MailZip: 70116
MoratoriumTitle: NO ABO Moratorium
NOFDDistrict: 2
NOPDDistrict: 8
OBJECTID: 1068000
OwnerName: BLACKSMITH MANAGEMENT, INC.
RevenueZone: 7
State: May 1, 2020
StreetName: BOURBON
StreetNumber: 941
StreetSuffix: ST
TIFTitle: Not within a Tax Increment Finance (TIF) District
VieuxCarre: Vieux Carre
VieuxCarreOrdinance: New Orleans, Code of Ordinances, Part II - Code, Chapter 166 - Vieux Carre, Sec. 166-2
Zip: 70116
ZoneLabel: Vieux Carre
</pre>

This layer can be easily added to QGIS as an *ArcGIS FeatureServer Layer* using the url above, and the first thing I did when I added it was save it out as a separate GeoPackage file, so it would be easier (and quicker) to manipulate.

### 2. Building Footprints

I downloaded the Building Footprint dataset from data.nola.gov:

[https://data.nola.gov/dataset/Building-Footprint/m3gg-u447](https://data.nola.gov/dataset/Building-Footprint/m3gg-u447)

This is a large file, approximately 160k features and 150mb on disk.

### Geospatial Data Processing

The overall goal was to create a building footprint layer with business information attached to each feature. This would provide a nice way to visualize the businesses and how they are distributed throughout the neighborhood. I didn't want to have the relevant buildings floating in space though, so I decided to make a Mapbox style from the full building footprint dataset, in order to layer it directly on the basemap.

#### Creating the Building Footprint Layer in Mapbox
    
In QGIS, I export the building footprint shapefile to GeoJSON (EPSG:4326), and exclude all fields from the export. The result is a GeoJSON file that only contains the geometry for every building in New Orleans, file size is ~54mb. Upload this file to Mapbox as a Tileset, called building-footprints-lite, and then create a new Style, starting with the blank template. Add the building-footprints-lite Tileset to the Style, and give it a simple uniform set of style rules: fill is white and 75% opaque, outline ("stroke") is 1pt, black, and 99% opaque. This style can now be added as a static overlay draped on the final map.

#### Creating the Data Layer

The actual data layer was created by performing a spatial join to attach the attributes from the Active Occupational License points to the polygons of the Building Footprints. I did this for the whole city, just out of curiosity (resulting in a buildings layer that only contained buildings with businesses) and then reduced the number of buildings further by creating an Area of Interest.

![Area of Interest shown in orange, Zillow Neighborhoods shown in red outlines, with green indicating the French Quarter and Marigny neighborhoods.](/geog4046/final/assets/illustration_of_aoi.jpg)

<figcaption>Area of Interest shown in orange, Zillow Neighborhoods shown in red outlines, with green indicating the French Quarter and Marigny neighborhoods.</figcaption>

When I had a reduced number of buildings and began to inspect the data more closely, I found that there were many cases where a building footprint would actually intersect with two or more license points. In these cases, the spatial join would only take attributes from one point, thereby losing information about an entire business.

To fix this I did some manual editing of the building footprints, using my best judgment to split them into pieces where necessary.

![before splitting the footprint to match the number of intersecting license points](/geog4046/final/assets/before_bldg_split.jpg)

<figcaption>before splitting the footprint to match the number of intersecting license points</figcaption>

![after splitting the footprint](/geog4046/final/assets/after_bldg_split.jpg)

<figcaption>after splitting the footprint</figcaption>

This splitting was performing for the entire area of interest, and in some cases occupational license points were manually placed on buildings, where initially they had not been positioned to intersect with anything.

Once a final spatial dataset was ready, I exported it to a CSV in order to use Python to inspect the qualitative information attached to each point (that's the important stuff, anyway!)

### Tabular Data Processing

I worked up a python script first helped me inspect the ownership information about all of the buildings, and later concatenated some values and enhanced the output CSV.

First, I found that there are 3 types of businesses licenses related to what I'm interested in. Here is a printout from the script showing the count of businesses within the area of interest for each relevant type.

```bash
---- BY BUSINESS TYPE ----
('1105 - FULL SVC RESTAURANTS (TABLE SERVICE)', 181)
('1126 - DRINKING PLACES (ALCOHOLIC BEVERAGES)', 146)
('2062 - LIMITED SVC RESTAURANTS(NO TABLE SVC)', 25)
```

Next, I the rows of the two different times to see if there were owner names that are repeated across multiple values. I did a good bit of sanitizing here (removing all of the `. / , -` etc. characters from the strings before comparing them. Doing so was a little disappointing... the most common owner name only had three different locations.

```bash
---- BY NORMALIZED OWNER NAME ----
CAFEBEIGNETLLC count: 3
   ('CAFE BEIGNET,LLC', 'CAFE BEIGNET DECATUR')
   ('CAFE BEIGNET LLC', 'CAFE BEIGNET')
   ('CAFE BEIGNET, LLC', 'CAFE BEIGNET IV')
BOURBONSALOONINC count: 3
   ('BOURBON SALOON, INC', '')
   ('BOURBON SALOON, INC', 'MANGOMANGO - AB               MANGO DAIQUIRI')
   ('BOURBON SALOON INC', 'MANGOMANGO - BE')
PATOBRIENSBARINC count: 2
   ("PAT O'BRIEN'S BAR INC", 'PAT OBRIENS BAR')
   ("PAT OBRIEN'S BAR        INC.", 'PAT O BRIENS BAR')
TOMMYPHAMINC count: 2
   ('TOMMY PHAM, INC', "HOTSY'S BURGER")
   ('TOMMY PHAM, INC', "T'S PIZZA & PASTA")
## and so on
```

Finally, instead of the owner name I tried the mailing address for the business. Much greater success.

```bash
---- BY MAILING ADDRESS ----
119 MULBERRY DR count: 13
   ('501-B BOURBON LLC', 'LE BAYOU')
   ('426 BOURBON LLC', 'PIER 424 SEAFOOD MARKET RESTAURANT')
   ('CONTI BC, LLC', 'BOMBAY CLUB')
   ('CAFE MASPERO DECATUR, LLC', 'CAFE MASPERO')
   ('CCRC 301 CHARTRES LLC', 'THE GOVERNOR')
   ('540 CHARTRES, LLC', 'CHARTRES HOUSE')
   ("BROUSSARD'S RESTAURANT LLC", "BROUSSARD'S RESTAURANT")
   ('301 ROYAL LLC', 'CURIO')
   ('925 DECATUR, LLC', 'CITY PIZZA WORKS')
   ('617 DECATUR LLC', 'BIG EASY OF WILKINSON')
   ('337 CHARTRES LLC', 'KINGFISH')
   ('218 NOBRUOB  LLC', 'BIG EASY DAIQUIRIS & FRY BAR')
   ('407 BOURBON, LLC', 'CRESCENT CITY PIZZA WORKS')
442 CANAL ST count: 5
   ('GOLDEN BOURBON INC', "WILLIE'S CHICKEN SHACK")
   ('CHARTERS CAFE, LLC', "WILLIE'S CHICKEN SHACK")
   ('VOODOO BAR & PIZZA LLC', "WILLIE'S PIZZA JOINT")
   ('DIAMOND BOURBON INC', 'BEERFEST I')
   ("WILLIE'S 707 CANAL LLC", "WILLIE'S CHICKEN SHACK")
P.O. BOX 57809 count: 5
   ('TEMPTATIONS INC.', "STILETTO'S/FAIS DEAUX DEAUX")
   ("BAMBOULA'S INC", "BAMBOULA'S")
   ('JAXX HOUSE INC', "D'LISH")
   ('SILVER BOURBON INC', 'SCORES')
   ('SWEET THINGS OF LOUISIANA, INC', 'FISHBOWLS SOLD HERE')
## and so on
```

Between the name matching and the mailing address matching I decided that I had enough to work with. I modifed the script a little bit to group license numbers (instead of business names as shown above) and then was ready to make my final addition to the script to create the export data.

I made three new fields, not knowing whether I would get a chance to use all of them or not (I didn't). They were

**DateCategory** - which stored a simple string like "1980s" for when the business was created

**OwnerCategory** - to store one of "LLC", "Corp.", "Inc." or "Other, as derived from the owner name

**RelatedLicenes** - to store a semi-colon delimited list of all the other business licenses associated with a given row, as determined by the name and address match logic described above.

The output of the script was a new CSV file, and then I headed back to QGIS to json the newly created fields to the Building Footprints layer.

[transform_business_csv.py](/geog4046/final/assets/transform_business_csv.py)

### Putting Together the Web Map

To use my enhanced building footprints in the web map I stripped away as much as possible during the export to geojson. Remember, I had already created a flat, geometry-only footprints style in Mapbox, which relieves this dataset of having to do anything put hold attributes for a select group of buildings, specifically, only the buildings that house businesses in any of the three categories shown above. Therefore, I was able to export a small amount of features and strip down the attributes to keep the file size as small as possible (in the end, 276kb). This GeoJSON layer is added to the map and styled very simply.

In then end, I have four layers, which hopefully blend together to look like less.

1. Stamen Watercolor (Open Street Map rendering)
2. Full Building Footprint Style published through Mapbox
3. The enhanced building footprint layer containing only relevant buildings
4. Stamen Terrain Labels

![Bar%20and%20Restaurant%20Ownership%20in%20the%20French%20Quarter%205ac36a41c70243e7b53fabb71ac02029/map_style_example.jpg](/geog4046/final/assets/map_style_example.jpg)

### Map Interactivity

The use of the map is very simple: click on a business, and its name, owner, and any other businesses owned by the same entity will pop up in the right-hand panel. [Enjoy!](https://mradamcox.github.io/geog4046/final/)