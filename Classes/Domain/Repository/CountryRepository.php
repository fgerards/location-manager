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
 * Country repository.
 */
class CountryRepository extends \SJBR\StaticInfoTables\Domain\Repository\CountryRepository
{
    /**
     * Find record by given uid, returning it raw.
     *
     * @param int $uid
     * @return array
     */
    public function findRawByUid($uid)
    {
        $query = $this->createQuery();
        $query->matching(
            $query->equals('uid', $uid)
        );
        $query->setLimit(1);
        return $query->execute(true)[0];
    }
}
