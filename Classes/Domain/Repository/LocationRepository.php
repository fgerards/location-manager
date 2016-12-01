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

use NIMIUS\LocationManager\Domain\Proxy\LocationRepositoryProxy;
use NIMIUS\LocationManager\Utility\ConfigurationUtility;
use NIMIUS\LocationManager\Utility\ObjectUtility;
use TYPO3\CMS\Extbase\Persistence\Generic\Typo3QuerySettings;
use TYPO3\CMS\Extbase\Persistence\QueryInterface;

/**
 * Location repository.
 */
class LocationRepository extends \TYPO3\CMS\Extbase\Persistence\Repository
{
    /**
     * @var \NIMIUS\LocationManager\Domain\Repository\CategoryRepository
     * @inject
     */
    protected $categoryRepository;

    /**
     * @var \NIMIUS\LocationManager\Domain\Repository\PhoneRepository
     * @inject
     */
    protected $phoneRepository;

    /**
     * @var \NIMIUS\LocationManager\Domain\Repository\EmailRepository
     * @inject
     */
    protected $emailRepository;

    /**
     * @var \NIMIUS\LocationManager\Domain\Repository\CountryRepository
     * @inject
     */
    protected $countryRepository;

    /**
     * Find by proxy method.
     *
     * Builds a query based on the given proxy object.
     *
     * @param LocationRepositoryProxy $proxy
     * @param int[] $ignore array of uids that should be ignored
     * @return mixed
     */
    public function findByProxy(LocationRepositoryProxy $proxy, $ignore = [])
    {
        if ($proxy->getPid()) {
            $this->setStoragePageId($proxy->getPid());
        }

        $query = $this->createQuery();
        $query->setOrderings([
            'name' => QueryInterface::ORDER_ASCENDING
        ]);
        $query->matching($query->logicalNot($query->in('uid', $ignore)));
        $locations = $query->execute($proxy->getReturnRawQueryResults());

        // If returnRawQueryResults is set, substitution of child records has do be done manually.
        if ($proxy->getReturnRawQueryResults()) {
            foreach ($locations as $index => $location) {
                if ((int)$locations[$index]['categories']) {
                    $locations[$index]['categories'] = $this->categoryRepository->findRawByLocation($location);
                }

                if ((bool)ConfigurationUtility::getExtensionConfiguration()['enableFilterCategories']) {
                    if ((int)$locations[$index]['filter_categories']) {
                        $locations[$index]['filterCategories'] = $this->categoryRepository->findRawByLocation($location,
                            'filter_categories');
                        $locations[$index]['categoryUids'] = implode(',', array_map(
                            function ($c) {
                                return $c['uid'];
                            },
                            $locations[$index]['filterCategories']
                        ));
                    }
                } else {
                    $locations[$index]['categoryUids'] = implode(',', array_map(
                        function ($c) {
                            return $c['uid'];
                        },
                        $locations[$index]['categories']
                    ));
                }

                if ((int)$locations[$index]['email']) {
                    $locations[$index]['email'] = $this->emailRepository->findRawByLocation($location);
                } else {
                    $locations[$index]['email'] = [];
                }
                if ((int)$locations[$index]['phone']) {
                    $locations[$index]['phone'] = $this->phoneRepository->findRawByLocationAndType($location, 'phone');
                } else {
                    $locations[$index]['phone'] = [];
                }
                if ((int)$locations[$index]['fax']) {
                    $locations[$index]['fax'] = $this->phoneRepository->findRawByLocationAndType($location, 'fax');
                } else {
                    $locations[$index]['fax'] = [];
                }
                if ((int)$locations[$index]['country']) {
                    $locations[$index]['country'] = $this->countryRepository->findRawByUid($location['country']);
                } else {
                    $locations[$index]['country'] = [];
                }
            }
            $signalSlotDispatcher = ObjectUtility::get(\TYPO3\CMS\Extbase\SignalSlot\Dispatcher::class);
            $signalSlotDispatcher->dispatch(__CLASS__, 'locationRepositoryRawQueryResult', [&$locations, $proxy]);
        }
        return $locations;
    }

    /**
     * Finds locations by their uids
     *
     * @param int[] $uids
     * @return \TYPO3\CMS\Extbase\Persistence\QueryResultInterface
     */
    public function findByUids(array $uids)
    {
        $query = $this->createQuery();
        $query->matching($query->in('uid', $uids));
        return $query->execute();
    }

    /**
     * Helper method to set storage page id for query constraints.
     *
     * @param int $pid
     * @return void
     */
    protected function setStoragePageId($pid)
    {
        if ($pid) {
            $querySettings = $this->objectManager->get(Typo3QuerySettings::class);
            $querySettings->setStoragePageIds([$pid]);
            $this->setDefaultQuerySettings($querySettings);
        }
    }
}
