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
 * Email repository.
 */
class EmailRepository extends \TYPO3\CMS\Extbase\Persistence\Repository
{
    /**
     * Find all email records by given location, returning it raw.
     *
     * @param mixed $location Either an array or a location object
     *
     * @return array
     */
    public function findRawByLocation($location)
    {
        $uid = is_object($location) ? $location->getUid() : $location['uid'];
        $query = $this->createQuery();
        $query->matching(
            $query->equals('location', $uid)
        );
        return $query->execute(true);
    }
}
