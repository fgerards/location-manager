CREATE TABLE tx_locationmanager_domain_model_location (
	uid int(11) unsigned NOT NULL auto_increment,
	pid int(11) unsigned default '0' NOT NULL,
	sys_language_uid int(11) DEFAULT '0' NOT NULL,
	l10n_parent int(11) DEFAULT '0' NOT NULL,
	l10n_diffsource mediumtext,
	
	name varchar(250) default NULL,
	address varchar(250) default NULL,
	zip varchar(30) default NULL,
	city varchar(100) default NULL,
	country int(11) unsigned default '0' NOT NULL,
	email int(11) unsigned default '0' NOT NULL,
	url varchar(250) default NULL,

	phone int(11) default 0 NOT NULL,
	fax varchar(11) default 0 NOT NULL,
	
	latitude DECIMAL(10,8) signed NULL,
	longitude DECIMAL(11,8) signed NULL,
	
	categories int(11) unsigned default 0,
	filter_categories int(11) unsigned default 0,
	created_at int(11) default '0' NOT NULL,
	
	PRIMARY KEY (uid),
	KEY parent (pid),
	KEY language (sys_language_uid, l10n_parent),
	KEY country (country)
);

CREATE TABLE tx_locationmanager_domain_model_phone (
	uid int(11) unsigned NOT NULL auto_increment,
	pid int(11) unsigned default '0' NOT NULL,
	name varchar(255) default NULL,
	phone varchar(50) default NULL,

	location int(11) unsigned NOT NULL,

	sys_language_uid int(11) DEFAULT '0' NOT NULL,
	l10n_diffsource mediumtext,
	foreign_type varchar(20),

	PRIMARY KEY (uid),
	KEY location (location, foreign_type)
);

CREATE TABLE tx_locationmanager_domain_model_email (
	uid int(11) unsigned NOT NULL auto_increment,
	pid int(11) unsigned default '0' NOT NULL,
	name varchar(255) default NULL,
	email varchar(100) default NULL,
	location int(11) unsigned NOT NULL,
	sys_language_uid int(11) DEFAULT '0' NOT NULL,
	l10n_diffsource mediumtext,

	PRIMARY KEY (uid),
	KEY location (location)
);

CREATE TABLE sys_category (
	location_manager_image int(11) unsigned default NULL
);

#
# Add a uid field to the sys_category_record_mm table to resolve a bug where saving a category would delete all relations
# if a location had both a categories and a filter_categories relation to that category.
# The other half of this bugfix can be found in Configuration/TCA/Overrides/sys_category.php
#
CREATE TABLE sys_category_record_mm (
	uid int(11) unsigned NOT NULL auto_increment,
	PRIMARY KEY (uid)
);
