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

$lFile = 'LLL:EXT:location_manager/Resources/Private/Language/locallang.xlf:';
$lll = $lFile . 'model.location.';

$tx_locationmanager_domain_model_location = [
    'ctrl' => [
        'title' => $lFile . 'model.location',
        'label' => 'name',
        'hideAtCopy' => true,
        'dividers2tabs' => true,
        'languageField' => 'sys_language_uid',
        'transOrigPointerField' => 'l10n_parent',
        'transOrigDiffSourceField' => 'l10n_diffsource',
        'searchFields' => 'name, address, zip, city',
        'iconfile' => 'EXT:location_manager/Resources/Public/Icons/Location.png',
    ],
    'interface' => [
        'showRecordFieldList' => 'name',
    ],
    'columns' => [
        'sys_language_uid' => [
            'exclude' => 1,
            'label' => 'LLL:EXT:lang/locallang_general.xlf:LGL.language',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'special' => 'languages',
                'items' => [
                    [
                        'LLL:EXT:lang/locallang_general.xlf:LGL.allLanguages',
                        -1,
                        'flags-multiple'
                    ],
                ],
                'default' => 0,
            ]
        ],
        'l10n_parent' => [
            'displayCond' => 'FIELD:sys_language_uid:>:0',
            'exclude' => 1,
            'label' => 'LLL:EXT:lang/locallang_general.xlf:LGL.l18n_parent',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['', 0],
                ],
                'foreign_table' => 'tx_locationmanager_domain_model_location',
                'foreign_table_where' => 'AND tx_locationmanager_domain_model_location.pid=###CURRENT_PID### AND tx_locationmanager_domain_model_location.sys_language_uid IN (-1,0)',
                'showIconTable' => false
            ]
        ],
        'l10n_diffsource' => [
            'config' => [
                'type' => 'passthrough',
                'default' => ''
            ]
        ],
        'name' => [
            'label' => $lll . 'property.name',
            'config' => [
                'type' => 'input',
                'max' => 250,
                'eval' => 'trim,required',
            ],
        ],
        'address' => [
            'label' => $lll . 'property.address',
            'config' => [
                'type' => 'input',
                'max' => 250,
                'eval' => 'trim',
            ],
        ],
        'zip' => [
            'label' => $lll . 'property.zip',
            'config' => [
                'type' => 'input',
                'max' => 30,
                'eval' => 'trim',
            ],
        ],
        'city' => [
            'label' => $lll . 'property.city',
            'config' => [
                'type' => 'input',
                'max' => 100,
                'eval' => 'trim',
            ],
        ],
        'country' => [
            'label' => $lll . 'property.country',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'foreign_table' => 'static_countries',
                'foreign_table_where' => 'AND 1 = 1 ORDER BY cn_short_en ASC',
                'minitems' => 0,
                'maxitems' => 1,
            ],
        ],
        'latitude' => [
            'label' => $lll . 'property.latitude',
            'config' => [
                'type' => 'input',
                'readOnly' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::isLoaded('geocoding'),
                'eval' => \NIMIUS\LocationManager\Evaluation\LatitudeEvaluation::class
            ],
        ],
        'longitude' => [
            'label' => $lll . 'property.longitude',
            'config' => [
                'type' => 'input',
                'readOnly' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::isLoaded('geocoding'),
                'eval' => \NIMIUS\LocationManager\Evaluation\LongitudeEvaluation::class
            ],
        ],
        'email' => [
            'label' => $lll . 'property.email',
            'config' => [
                'type' => 'inline',
                'foreign_table' => 'tx_locationmanager_domain_model_email',
                'foreign_field' => 'location'
            ],
        ],
        'phone' => [
            'label' => $lll . 'property.phone',
            'config' => [
                'type' => 'inline',
                'foreign_table' => 'tx_locationmanager_domain_model_phone',
                'foreign_field' => 'location',
                'foreign_match_fields' => [
                    'foreign_type' => 'phone'
                ]
            ],
        ],
        'fax' => [
            'label' => $lll . 'property.fax',
            'config' => [
                'type' => 'inline',
                'foreign_table' => 'tx_locationmanager_domain_model_phone',
                'foreign_field' => 'location',
                'foreign_match_fields' => [
                    'foreign_type' => 'fax'
                ]
            ],
        ],
        'url' => [
            'label' => $lll . 'property.url',
            'config' => [
                'type' => 'input',
                'max' => 250,
                'eval' => 'trim',
                'wizards' => [
                    'link' => [
                        'type' => 'popup',
                        'title' => 'LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:header_link_formlabel',
                        'icon' => 'EXT:backend/Resources/Public/Images/FormFieldWizard/wizard_link.gif',
                        'module' => [
                            'name' => 'wizard_link'
                        ],
                        'JSopenParams' => 'height=800,width=600,status=0,menubar=0,scrollbars=1'
                    ]
                ],
                'softref' => 'typolink'
            ],
        ],
    ],
    'types' => [
        '0' => ['showitem' => '
        --div--;' . $lll . 'tab.address, sys_language_uid, l10n_parent, name, address, zip, city, country, latitude, longitude, 
        --div--;' . $lll . 'tab.contact, phone, fax, email, url,
        --div--;' . $lll . 'tab.categories, categories']
    ],
];

// enable filterCaterogies field, if the extension setting was enabled
if ((bool)\NIMIUS\LocationManager\Utility\ConfigurationUtility::getExtensionConfiguration()['enableFilterCategories']) {
    $tx_locationmanager_domain_model_location['types']['0']['showitem'] .= ', filter_categories';
}

// Add category relations.
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::makeCategorizable(
    'location_manager',
    'tx_locationmanager_domain_model_location',
    'categories',
    [
        'label' => 'LLL:EXT:location_manager/Resources/Private/Language/locallang.xlf:model.location.property.categories',
    ]
);

if ((bool)\NIMIUS\LocationManager\Utility\ConfigurationUtility::getExtensionConfiguration()['enableFilterCategories']) {
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::makeCategorizable(
        'location_manager',
        'tx_locationmanager_domain_model_location',
        'filter_categories',
        [
            'label' => 'LLL:EXT:location_manager/Resources/Private/Language/locallang.xlf:model.location.property.filterCategories',
        ]
    );
}

return $tx_locationmanager_domain_model_location;
