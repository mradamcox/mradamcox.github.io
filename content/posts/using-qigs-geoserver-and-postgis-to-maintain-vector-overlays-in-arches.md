Title: Using QGIS, GeoServer, and PostGIS to Make and Maintain Arches Overlays
Date: 2016-03-23
Category: technical
Author: Adam Cox
Tags: Arches, GeoServer, QGIS, PostGIS
Description: Someone got in touch with me recently about using GeoServer to serve custom-made (and _maintainable_) vector overlays to the Arches MAP VIEW, in order to add specific study/research areas to the map. This can be achieved with a graceful integration of some solid open source technologies that Arches is primed to handle. Functionally, wouldn't it be great to edit your vector layers in Quantum GIS, and have the updates immediately visible in your Arches overlays?

Someone got in touch with me recently about using GeoServer to serve custom-made (and _maintainable_) vector overlays to the Arches MAP VIEW, in order to add specific study/research areas to the map. This can be achieved with a graceful integration of some solid open source technologies that Arches is primed to handle. Functionally, wouldn't it be great to edit your vector layers in Quantum GIS, and have the updates immediately visible in your Arches overlays?

Well, here are my thoughts: 

[![what's going on](/theme/img/qgis-geoserver-postgis-arches.png)](/theme/img/qgis-geoserver-postgis-arches.png)
_I'm using :XX where a port must be open to allow the appropriate connections. (It's pretty slick to re-route GeoServer to run through port :80 (instead of :8080) with all your other HTTP requests, but that's a detail beyond our needs here...)_

Or, narratively: Store your vector overlays in your existing PostGIS installation, and they can be directly edited there with QGIS (because it has great PostGIS support). These same tables can simultaneously published (and styled) by GeoServer as layers, which in turn can be fed to your custom app, and show up in the map.

Elements of this setup are already built into Arches, as you can read about [here](http://arches-hip.readthedocs.org/en/latest/loading-data/#optional-gis-layers-for-administrative-areas). There is already an "aux" schema within your app's PostGIS database, and with a little configuration you can create polygons whose name will be attributed to any newly created intersecting resource. This is a nice functionality, so you may want to use the following steps to just connect directly to these tables. The steps below will also cover the creation of a new database to hold your overlay tables, outside of the existing app db.

I followed these steps on an example Arches v3 installation. So in my case "Remote Server" is an Amazon EC2 instance (running Ubuntu), "Local Computer" is my laptop with QGIS on it, and "Client (Browser)" is anybody looking at the website. To follow along you must have some sort of similar setup (or at least can fill in the blanks where necessary), and you must have a running GeoServer instance on your server.

###SSH into your server, and create a new db to hold your tables###

_This is only if you want to create tables that are outside of your app's existing database. If you need to do reinstallations of your app, you may want to do follow this step because your app's database will be dropped and recreated blank on every reinstallation. If you want to make tables in the existing database, just skip to the next section (and substitute the database name accordingly)._

1.  Once logged onto the server, use these commands to make the db:

        ~$ psql -U postgres
        postgres=# CREATE DATABASE arches_overlays;
        postgres=# \connect arches_overlays
        postgres=# CREATE EXTENSION postgis;

2.  That's all the SQL you need (though you could do most of the next step with SQL if you want). Use `\q` to quit the psql console.
    
###Connect to the db with QGIS to make/edit the tables###

1.  Open QGIS, and begin by creating a connection to the db<br>_You'll need to make sure you can get to your server through port :5432 for this step, which may mean firewall configuration (this is [super easy](http://docs.aws.amazon.com/AmazonVPC/latest/GettingStartedGuide/getting-started-create-security-group.html) on AWS)_

3.  Open the "Add PostGIS Layer" dialog, click "New", and enter the following:

    Name = arches overlay db (or whatever you want)<br>
    Host = your IP address<br>
    Port = 5432<br>
    Database = arches_overlays<br>
    Username = postgres<br>
    Password = postgis<br>
    _this is the default username/password combo for a new Arches installation_
    
4.  Click "Test Connection", and once you get it working click "Ok".

    +  If you are going to use the existing "aux" schema tables in your app database, just find and add these now. You should see "parcels", "overlays", and "addresses". Be sure to refer back to the official Arches [documentation](http://arches-hip.readthedocs.org/en/latest/loading-data/#optional-gis-layers-for-administrative-areas) if you're doing this. When you're done editing in QGIS, just skip to the GeoServer section below.
    +  Otherwise, close the dialog box, and continue with steps 4-6.

5.  Now, go to _Database > DB Manager > DB Manager_

6.  Expand the PostGIS tab, expand your database, and go to _Table > Create Table_

    +  I made a simple polygon table, so my dialog looked like this:
    
    [![create table dialog](theme/img/make_postgis_table_qgis.png)](theme/img/make_postgis_table_qgis.png)
    
    +  Now that your table exists, you can add it as a PostGIS layer and begin to edit it.
    
7.  Re-open the "Add PostGIS Layer" dialog, and re-connect to your database.  You'll now be able to select the new table, and use all the normal QGIS editing tools to add features to it.

###Add your tables to GeoServer as PostGIS data sources###

1.  Log into your GeoServer instance, go to the "Stores" page, and click "Add new data source".

2.  Choose "PostGIS" under Vector Data Sources, and enter the information necessary to connect to your database.

    +  Now use `localhost` for the Host, because GeoServer and PostGIS are running on the same server
    +  Be sure to enter the name of your PostGIS database
    
3.  You'll now be able to publish any tables in your database.

    +  Most of the information is already ready, but be sure to at least compute the bounding boxes.
    
4.  Now you can style the layers all you like with GeoServer's SLD support.

###Add your GeoServer layers as overlays in your Arches app###

1.  Finally, the easy part. All you need to do is open your layers file, found here:
    
    /hipapp/hipapp/media/js/map/layers.js
    
    and make a new layer object that uses your GeoServer layer for the source. The relevant portion of your javascript will look something like this:
    
        layer: new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://XX.XX.XX.XX:8080/geoserver/workspacename/wms/',
                params: {
                    'LAYERS':'workspacename:layername',
                    'TILED':true,
                },
                serverType: 'geoserver'
            }),
        }),
    
2.  Full instructions on how to add overlays to your layers.js file can be found [here](http://arches-hip.readthedocs.org/en/latest/customization/#overlays) in the official Arches-HIP documention.
    
---

It's a lot of steps, but if you live in fantasy-land and don't run into any issues, it shouldn't take more than half an hour or so. And if you can get it to work once, the next time it will be more or less effortless.

We don't have comments on our blog yet, but feel free to contact me (address on footer below) with any problems or questions.  