<?php
namespace NIMIUS\LocationManager\Domain\Repository;

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

use NIMIUS\LocationManager\Domain\Model\Category;
use NIMIUS\LocationManager\Utility\ConfigurationUtility;
use TYPO3\CMS\Extbase\Persistence\ObjectStorage;

/**
 * Category repository.
 */
class CategoryRepository extends \TYPO3\CMS\Extbase\Domain\Repository\CategoryRepository
{
    /**
     * Find all categories used in all locations.
     *
     * @todo implement counter column in sys_category, reimplement without using statement()
     * @return ObjectStorage
     */
    public function findAllWithLocations()
    {
        $query = $this->createQuery();
        $fieldName = ((bool)ConfigurationUtility::getExtensionConfiguration()['enableFilterCategories']) ? 'filter_categories' : 'categories';
        $query->statement('
            SELECT DISTINCT
                *
            FROM
                sys_category
            JOIN
                sys_category_record_mm
                ON sys_category_record_mm.uid_local = sys_category.uid
            WHERE
                sys_category_record_mm.tablenames = "tx_locationmanager_domain_model_location" AND
                sys_category_record_mm.fieldname = "' . $fieldName . '"
            GROUP BY
                sys_category.uid
        ');
        return $query->execute();
    }

    /**
     * Flattens the category structure: Appends all children (and children of children) to the given ObjectStorage.
     * If no ObjectStorage is provided, a new one will be created.
     *
     * @param Category           $category
     * @param ObjectStorage|null $children
     * @return ObjectStorage
     */
    private function flattenCategory(Category $category, ObjectStorage $children = null)
    {
        if ($children === null) {
            $children = new ObjectStorage();
        }

        $query = $this->createQuery();
        $query->matching($query->equals('parent', $category->getUid()));
        $result = $query->execute();

        $children->attach($category);
        foreach ($result as $child) {
            $children->attach($child);
            $this->flattenCategory($child, $children);
        }

        return $children;
    }

    /**
     * Finds categories by an array of uid's and also flattens the structure.
     *
     * @example
     * If the following is the category structure
     * - 1
     * - 2
     *  \-> 3
     *  \-> 4
     *
     * $categories = $categoryRepository->findByUidsRecursive([1,2]);
     * // $categories contains the categories with uids 1,2,3,4
     *
     * @param array $uids
     * @return ObjectStorage
     */
    public function findByUidsRecursive(array $uids)
    {
        $query = $this->createQuery();
        $query->matching($query->in('uid', $uids));
        $result = $query->execute();
        $categories = new ObjectStorage();

        foreach ($result as $cat) {
            $this->flattenCategory($cat, $categories);
        }

        return $categories;
    }

    /**
     * Find all categories by given location, returning it raw.
     *
     * @param mixed $location Either an array or a location object
     * @return array
     */
    public function findRawByLocation($location, $fieldname = 'categories')
    {
        $uid = is_object($location) ? $location->getUid() : $location['uid'];
        $query = $this->createQuery();
        $query->statement('
            SELECT
                *
            FROM
                sys_category
            JOIN
                sys_category_record_mm
                ON sys_category_record_mm.uid_local = sys_category.uid
            WHERE
                sys_category_record_mm.tablenames = "tx_locationmanager_domain_model_location"
                AND sys_category_record_mm.fieldname = "' . $fieldname . '"
                AND sys_category_record_mm.uid_foreign = ' . (int)$uid
        );
        return $query->execute(true);
    }
}
