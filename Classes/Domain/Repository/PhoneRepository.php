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

/**
 * Phone repository.
 */
class PhoneRepository extends \TYPO3\CMS\Extbase\Persistence\Repository
{
    /**
     * Find all phone records by given location, returning it raw.
     *
     * @param mixed  $location Either an array or a location object
     * @param string $type     Either 'phone' or 'fax'
     * @return array
     */
    public function findRawByLocationAndType($location, $type)
    {
        $uid = is_object($location) ? $location->getUid() : $location['uid'];
        $query = $this->createQuery();
        $query->matching(
            $query->logicalAnd(
                $query->equals('location', $uid),
                $query->equals('foreign_type', $type)
            )
        );
        return $query->execute(true);
    }
}
