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

$configuration = \NIMIUS\LocationManager\Utility\ConfigurationUtility::getExtensionConfiguration();

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('sys_category', [
    'location_manager_image' => [
        'label' => 'LLL:EXT:location_manager/Resources/Private/Language/locallang.xlf:model.sys_category.location_manager_image',
        'config' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::getFileFieldTCAConfig('location_manager_image', [
            'minitems' => 0,
            'maxitems' => 1
        ], $GLOBALS['TYPO3_CONF_VARS']['GFX']['imagefile_ext'])
    ]
]);

if ($configuration['categoryMarker']) {
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes(
        'sys_category',
        '--div--;LLL:EXT:location_manager/Resources/Private/Language/locallang.xlf:model.sys_category.tab.location_manager, location_manager_image'
    );
}

/*
 * This fixes a bug where two behaviours would emerge if categories and filter_categories are used:
 *
 * 1. The fieldname field of the MM Table is cleared upon updating the relation from the category side (using the 'items' group field)
 *    in the sys_category edit view.
 * 2. If 2 or more relations from different fields point to the same category and that category is being updated in the backend, then
 *    both of those relations would be deleted. In some instances a new MM record without a fieldname would be generated.
 *
 * Both of these issues can be resolved by adding a uid field to the MM table (therefor making every MM Record identifiable) and
 * by allowing multiple equivalent items on the same group field.
 *
 * @see https://forge.typo3.org/issues/78722
 */
$GLOBALS['TCA']['sys_category']['columns']['items']['config']['multiple'] = true;
$GLOBALS['TCA']['sys_category']['columns']['items']['config']['MM_hasUidField'] = true;
