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

/**
 * Extension update script: Copies all categories to filter_categories.
 */
class ext_update
{
    /**
     * Name of the location table
     */
    const TABLENAME = 'tx_locationmanager_domain_model_location';

    /**
     * Value used in column 'fieldname' for normal categories
     */
    const CATEGORIES_FIELDNAME = 'categories';

    /**
     * Value used in column 'fieldname' for filter categories
     */
    const FILTER_CATEGORIES_FIELDNAME = 'filter_categories';

    /**
     * @var \TYPO3\CMS\Core\Database\DatabaseConnection
     */
    private $db;

    /**
     * Checks wether or not a certain pair of filterCategories already exists
     *
     * @param int $uid_local
     * @param int $uid_foreign
     *
     * @return bool
     */
    private function filterCatogoryExists($uid_local, $uid_foreign)
    {
        $count = $this->db->exec_SELECTcountRows(
            '*',
            'sys_category_record_mm',
            '       tablenames="' . self::TABLENAME . '"
                AND fieldname="' . self::FILTER_CATEGORIES_FIELDNAME . '"
                AND uid_local=' . $uid_local . '
                AND uid_foreign=' . $uid_foreign . '
            ');
        return $count !== 0;
    }

    /**
     * Creates a new relation between categories and locations as filter_categories
     *
     * @param int $uid_local
     * @param int $uid_foreign
     * @param int $sorting
     * @param int $sorting_foreign
     */
    private function createFilterCategory($uid_local, $uid_foreign, $sorting = 0, $sorting_foreign = 0)
    {
        // create new sys_category_record_mm record
        $this->db->exec_INSERTquery('sys_category_record_mm', [
            'uid_local' => $uid_local,
            'uid_foreign' => $uid_foreign,
            'sorting' => $sorting,
            'sorting_foreign' => $sorting_foreign,
            'tablenames' => self::TABLENAME,
            'fieldname' => self::FILTER_CATEGORIES_FIELDNAME
        ]);

        // update count. This is done directly in SQL
        $this->db->exec_UPDATEquery(self::TABLENAME, 'uid=' . $uid_foreign, [
            'filter_categories' => '(filter_categories + 1)'
        ], ['filter_categories']);
    }

    public function __construct()
    {
        $this->db = $GLOBALS['TYPO3_DB'];
    }

    /**
     * Only show the extension update script, if enableFilterCategories is enabled
     *
     * @return bool
     */
    public function access()
    {
        return (bool)\NIMIUS\LocationManager\Utility\ConfigurationUtility::getExtensionConfiguration()['enableFilterCategories'];
    }

    /**
     * Main update script that is called by extension manager
     *
     * @return string
     */
    public function main()
    {
        $res = $this->db->exec_SELECTquery(
            'uid_local, uid_foreign, sorting, sorting_foreign',
            'sys_category_record_mm',
            '       tablenames="' . self::TABLENAME . '" 
                AND fieldname="' . self::CATEGORIES_FIELDNAME . '"
            ');
        $count = 0;

        while ($record = $this->db->sql_fetch_assoc($res)) {
            if (!$this->filterCatogoryExists($record['uid_local'], $record['uid_foreign'])) {
                // filter category does not exist - creating it
                $this->createFilterCategory($record['uid_local'], $record['uid_foreign'], $record['sorting'],
                    $record['sorting_foreign']);
                $count++;
            }
        }

        return 'Synchronized categories & filter_categories. Created ' . $count . ' additional filter_categories';
    }
}
