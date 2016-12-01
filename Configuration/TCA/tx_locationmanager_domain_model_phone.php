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
$lll = $lFile . 'model.phone.';

return [
    'ctrl' => [
        'title' => $lFile . 'model.phone',
        'label' => 'name',
        'hideAtCopy' => true,
        'dividers2tabs' => true,
        'hideTable' => true,
        'languageField' => 'sys_language_uid',
        'transOrigDiffSourceField' => 'l10n_diffsource',
        'searchFields' => 'name, phone',
        'iconfile' => 'EXT:location_manager/Resources/Public/Icons/Phone.png'
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
                'eval' => 'trim',
            ],
        ],
        'phone' => [
            'label' => $lll . 'property.phone',
            'config' => [
                'type' => 'input',
                'max' => 50,
                'eval' => 'trim,required',
            ],
        ],
    ],
    'types' => [
        '0' => ['showitem' => 'sys_language_uid, l10n_parent, name, phone']
    ],
];
