<?php
namespace NIMIUS\LocationManager\Utility;

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

use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * Utility class to simplify configurations.
 */
class ObjectUtility
{
    /**
     * Get object manager instance.
     *
     * @return \TYPO3\CMS\Extbase\Object\ObjectManager
     */
    protected static function getObjectManager()
    {
        return GeneralUtility::makeInstance('TYPO3\\CMS\\Extbase\\Object\\ObjectManager');
    }

    /**
     * Get configuration manager instance.
     *
     * @return \TYPO3\CMS\Extbase\Configuration\ConfigurationManager
     */
    public static function getConfigurationManager()
    {
        return self::get('TYPO3\\CMS\\Extbase\\Configuration\\ConfigurationManager');
    }

    /**
     * Get an instance of the given class.
     *
     * @param string $className
     *
     * @return mixed
     */
    public static function get($className)
    {
        return self::getObjectManager()->get($className);
    }
}
