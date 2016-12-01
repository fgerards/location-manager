# Location Manager
A TYPO3 extension which provides features for handling, visualizing, and filtering locations.

[![Build Status](https://travis-ci.org/nimius/location_manager.svg?branch=master)](https://travis-ci.org/nimius/location_manager)


## What does it do?
Location Manager brings you a plugin to display stored locations on a map, together with filtering options. The shipped javascript is very extensible
and allows interchanging functionality with already shipped or custom methods to match your project requirements,


## Installation
Workshops requires some basic TypoScript to work properly. Include the static extension template into your template and you're set. 
If you don't include the static TypoScript, TYPO3 will not include the Javascript Library into the Frontend.


## Configuration

### Adding Locations

The base record of Location Manager is the Location. The list module can be used to add and edit them.
If the [geocoding](https://typo3.org/extensions/repository/view/geocoding) extension is installed, then the longitude and latitude data will
automatically be updated based on the given location.


### Frontend plugin

To display the map, the frontend plugin has to be included. The plugin allows the selection of static Locations, which will always
be rendered separately from the normal list and which will not be affected by any type of filtering.

### Optional Features

In order to keep everything as minimalistic as possible, advanced features are disabled by default. 
Have a look at the extension configuration inside the extension manager to enable/disable features.


## Credits
Developed and maintained by [NIMIUS](http://www.nimius.net)