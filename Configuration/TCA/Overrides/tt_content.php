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

// Modify tt_content for 'Locations' plugin.
$GLOBALS['TCA']['tt_content']['types']['list']['subtypes_addlist']['locationmanager_locations'] = 'pi_flexform';
$GLOBALS['TCA']['tt_content']['types']['list']['subtypes_excludelist']['locationmanager_locations'] = 'select_key';
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPiFlexFormValue(
    'locationmanager_locations',
    'FILE:EXT:location_manager/Configuration/FlexForm/Locations.xml'
);
