<?php
/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

// Register 'locations' plugin.
\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin(
    'NIMIUS.' . $_EXTKEY,
    'Locations',
    'Location manager: Locations'
);

// Add static extension TypoScript template.
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile($_EXTKEY, 'Configuration/TypoScript', 'Location Manager');

// Register datamap processing.
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_tcemain.php']['processDatamapClass']['EXT:NIMIUS.' . $_EXTKEY] = 'NIMIUS\\LocationManager\\Hook\\TceMainDataMapperHook';

// Add category relations.
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::makeCategorizable($_EXTKEY, 'tx_locationmanager_domain_model_location', 'categories', [
    'label' => 'LLL:EXT:location_manager/Resources/Private/Language/locallang.xlf:model.location.property.categories',
]);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::makeCategorizable($_EXTKEY, 'tx_locationmanager_domain_model_location', 'filter_categories', [
    'label' => 'LLL:EXT:location_manager/Resources/Private/Language/locallang.xlf:model.location.property.filterCategories',
]);
