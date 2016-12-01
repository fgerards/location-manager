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

\TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
    'NIMIUS.' . $_EXTKEY,
    'Locations',
    [
        'Locations' => 'index'
    ]
);

// Register custom TCE forms evaluators.
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['tce']['formevals'][\NIMIUS\LocationManager\Evaluation\LongitudeEvaluation::class] = '';
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['tce']['formevals'][\NIMIUS\LocationManager\Evaluation\LatitudeEvaluation::class] = '';
