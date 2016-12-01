<?php
namespace NIMIUS\LocationManager\Controller;

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
use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * Locations controller.
 */
class LocationsController extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController
{
    /**
     * @var \NIMIUS\LocationManager\Domain\Repository\LocationRepository
     * @inject
     */
    protected $locationRepository;

    /**
     * @var \NIMIUS\LocationManager\Domain\Repository\CategoryRepository
     * @inject
     */
    protected $categoryRepository;

    /**
     * Index action.
     *
     * Displays all locations.
     *
     * @return void
     */
    public function indexAction()
    {
        // TODO cleanup
        $extensionConfiguration = ConfigurationUtility::getExtensionConfiguration();
        $GLOBALS['TSFE']->additionalHeaderData['locationManager'] = '
			<script src="https://maps.googleapis.com/maps/api/js?libraries=geometry,places&key=' . $extensionConfiguration['googleMaps.']['apiKey'] . '"></script>
		';
        $contentObject = ObjectUtility::getConfigurationManager()->getContentObject()->data;
        $config = $this->buildConfiguration();

        // retrieve fixed records
        $fixed = [];
        $fixedUids = [];
        if (array_key_exists('content', $this->settings) && array_key_exists('fixed', $this->settings['content'])) {
            $fixedUids = GeneralUtility::intExplode(',', $this->settings['content']['fixed']);
            $fixed = $this->locationRepository->findByUids($fixedUids);
        }

        // retrieve all other locations
        $proxy = ObjectUtility::get(LocationRepositoryProxy::class);
        $proxy->initializeFromSettings((array)$extensionConfiguration['extbase.']);
        $locations = $this->locationRepository->findByProxy($proxy, $fixedUids);

        $this->view->assignMultiple([
            'locations' => $locations,
            'contentObject' => $contentObject,
            'ids' => $config['ids'],
            'configuration' => $config['configuration'],
            'fixed' => $fixed
        ]);

        if ($this->settings['filter']['enable']) {
            $preselect = GeneralUtility::intExplode(',', $this->settings['filter']['preselect']);
            if (count($preselect) !== 0 && $preselect[0] !== 0) {
                // there is a preselection
                $categories = $this->categoryRepository->findByUidsRecursive($preselect);
            } else {
                // there is no preselection
                $categories = $this->categoryRepository->findAllWithLocations();
            }
            $this->view->assign('categories', $categories);
        }
    }

    /**
     * Helper to build configuration.
     *
     * @return array
     */
    protected function buildConfiguration()
    {
        $contentObject = ObjectUtility::getConfigurationManager()->getContentObject()->data;

        // Id's that will be used in the frontend.
        $ids = [
            'map' => 'tx-locationmanager-' . $contentObject['uid'] . '-map',
            'searchForm' => 'tx-locationmanager-' . $contentObject['uid'] . '-search-form',
            'searchField' => 'tx-locationmanager-' . $contentObject['uid'] . '-search-field',
            'searchRadius' => 'tx-locationmanager-' . $contentObject['uid'] . '-search-radius',
            'markers' => 'tx-locationmanager-' . $contentObject['uid'] . '-markers',
            'lockEnabled' => 'tx-locationmanager-' . $contentObject['uid'] . '-lock-enabled',
            'lockDisabled' => 'tx-locationmanager-' . $contentObject['uid'] . '-lock-disabled',
            'tags' => 'tx-locationmanager-' . $contentObject['uid'] . '-tags',
            'resetTag' => 'tx-locationmanager-' . $contentObject['uid'] . '-tags-reset',
            'fixed' => 'tx-locationmanager-' . $contentObject['uid'] . '-fixed',
            'tagContainer' => 'tx-locationmanager-' . $contentObject['uid'] . '-tag-container',
        ];

        // Configuration of the javascript library. This is defined in PHP, because it is much cleaner
        // than using f:format.raw in the frontend.
        $locationManagerConfiguration = [
            'mapContainer' => '#' . $ids['map'],
            'mapOptions' => [
                'mapTypeId' => $this->settings['map']['mapTypeId'],
                'zoom' => (int)$this->settings['map']['zoom'],
                'zoomControl' => (bool)$this->settings['map']['zoomControl'],
                'streetViewControl' => false,
                'center' => [
                    'lat' => 0,  // these will be falsy and thus the map will be automatically aligned
                    'lng' => 0
                ]
            ],
            'markerElements' => '#' . $ids['markers'] . ' > li, #' . $ids['fixed'] . ' > li',
            'markerContainer' => '#' . $ids['markers'],
            'debug' => (bool)$this->settings['debug'],
            'controllerFactory' => [
                'refreshListOnMove' => [],
                'showOnClick' => [],
                'sortByDistance' => [],
                'dynamicMarkerImage' => [],
                'infoWindow' => []
            ]
        ];

        if (!empty($this->settings['map']['style'])) {
            $locationManagerConfiguration['mapOptions']['styles'] = json_decode($this->settings['map']['style']);
        }

        if ((bool)$this->settings['search']['enable']) {
            $locationManagerConfiguration['controllerFactory']['autocompletedSearch'] = [
                'field' => '#' . $ids['searchField'],
                'expand' => (int) $this->settings['search']['expand']
            ];
        }

        if ((bool)$this->settings['map']['center']['latitude'] && (bool)$this->settings['map']['center']['longitude']) {
            $locationManagerConfiguration['mapOptions']['center'] = [
                'lat' => (float)$this->settings['map']['center']['latitude'],
                'lng' => (float)$this->settings['map']['center']['longitude'],
            ];
        }

        if ($this->settings['filter']['enable']) {
            $locationManagerConfiguration['controllerFactory']['tagFilter'] = [
                'items' => '#' . $ids['tags'] . ' > *:not(#' . $ids['resetTag'] . ')',
                'reset' => '#' . $ids['resetTag'],
                'container' => '#' . $ids['tagContainer'],
                'combine' => $this->settings['filter']['combine']
            ];
        }

        if ($this->settings['map']['enableLocking']) {
            $locationManagerConfiguration['controllerFactory']['clickToEnable'] = [
                'enabled' => '#' . $ids['lockEnabled'],
                'disabled' => '#' . $ids['lockDisabled']
            ];
        }

        if ($this->settings['map']['hideOnMobile']) {
            $locationManagerConfiguration['controllerFactory']['hideMapOnMobile'] = [];
        }

        return [
            'configuration' => $locationManagerConfiguration,
            'ids' => $ids
        ];
    }
}
