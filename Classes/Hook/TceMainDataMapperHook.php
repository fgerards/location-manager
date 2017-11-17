<?php
namespace NIMIUS\LocationManager\Hook;

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

use B13\Geocoding\Service\GeoService;
use NIMIUS\LocationManager\Utility\ConfigurationUtility;
use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

/**
 * TCEmain data mapper hook class.
 *
 * Contains functionality to hook into backend data processing.
 */
class TceMainDataMapperHook
{
    /**
     * Hook to update data after saving.
     *
     * @param string $status
     * @param string $table
     * @param int $id
     * @param array &$fieldArray
     * @param \TYPO3\CMS\Core\DataHandling\DataHandler &$dataHandler
     * @return void
     *
     * @codingStandardsIgnoreStart
     */
    public function processDatamap_afterDatabaseOperations($status, $table, $uid, &$fieldArray, &$dataHandler)
    {
        // @codingStandardsIgnoreEnd
        if (!ExtensionManagementUtility::isLoaded('geocoding')) {
            return;
        }
        if ($table != 'tx_locationmanager_domain_model_location') {
            return;
        }
        if (!$this->isAddressUpdate($fieldArray) || $this->isManualCoordinateUpdate($fieldArray)) {
            return;
        }

        if (!is_numeric($uid)) {
            $uid = $dataHandler->substNEWwithIDs[$uid];
        }

        $this->geocodeCoordinates($table, $uid);
    }

    /**
     * Returns true if the given fieldArray of a tx_workshops_domain_model_location record contains address updates.
     * Geocoding is only necessary, if the address has been updated
     *
     * @param array $fieldArr
     * @return bool
     */
    protected function isAddressUpdate(&$fieldArr)
    {
        return  array_key_exists('address', $fieldArr) ||
        array_key_exists('zip', $fieldArr) ||
        array_key_exists('city', $fieldArr) ||
        array_key_exists('country', $fieldArr);
    }

    /**
     * Returns true, if the given fieldArray of a tx_workshops_domain_model_location record contains manual coordinate
     * updates. Geocoding will not be used, if the user manually specified coordinates.
     *
     * @param array $fieldArr
     * @return bool
     */
    protected function isManualCoordinateUpdate(&$fieldArr)
    {
        return  array_key_exists('longitude', $fieldArr) ||
        array_key_exists('latitude', $fieldArr);
    }

    /**
     * Geocodes coordinates for record from given table and uid.
     *
     * @param string $table
     * @param int $uid
     * @return void
     */
    protected function geocodeCoordinates($table, $uid)
    {
        $record = $GLOBALS['TYPO3_DB']->exec_SELECTgetSingleRow(
            'name, address, zip, city, static_countries.cn_short_en AS country',
            $table . ' JOIN static_countries ON (' . $table . '.country = static_countries.uid)',
            $table . '.uid = ' . (int)$uid .
            ' AND address IS NOT NULL' .
            ' AND city IS NOT NULL' .
            ' AND country IS NOT NULL'
        );

        if (!$record) {
            return;
        }

        // Explicitly setting the API Key to `null`, if there is none configured.
        // This lets GeoService catch that and use it's configured API Key.
        $apiKey = ConfigurationUtility::getExtensionConfiguration()['googleMaps.']['apiKey'] ?: null;
        $geoService = new GeoService($apiKey);
        $street = $record['address'];
        if (!empty($record['name'])) {
            $street = $record['name'] . ', ' . $street;
        }

        $coordinates = $geoService->getCoordinatesForAddress(
            $street,
            $record['zip'],
            $record['city'],
            $record['country']
        );

        // If no results have been found, then try again without the Locations name.
        if (array_key_exists('status', $coordinates) && $coordinates['status'] === 'ZERO_RESULTS') {
            $coordinates = $geoService->getCoordinatesForAddress(
                $record['address'],
                $record['zip'],
                $record['city'],
                $record['country']
            );
        }

        if ($coordinates['latitude'] && $coordinates['longitude']) {
            $GLOBALS['TYPO3_DB']->exec_UPDATEquery(
                $table,
                'uid = ' . (int)$uid,
                $coordinates
            );
        }
    }
}
