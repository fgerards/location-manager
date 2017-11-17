<?php
namespace NIMIUS\LocationManager\Domain\Model;

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

use NIMIUS\LocationManager\Utility\ConfigurationUtility;
use TYPO3\CMS\Extbase\Persistence\ObjectStorage;

/**
 * Location model.
 */
class Location extends \TYPO3\CMS\Extbase\DomainObject\AbstractEntity
{
    /**
     * @var int
     */
    protected $sysLanguageUid;

    /**
     * @var int
     */
    protected $l10nParent;

    /**
     * @var string
     */
    protected $name;

    /**
     * @var string
     */
    protected $address;

    /**
     * @var string
     */
    protected $zip;

    /**
     * @var string
     */
    protected $city;

    /**
     * @var \NIMIUS\LocationManager\Domain\Model\Country
     */
    protected $country;

    /**
     * @var \TYPO3\CMS\Extbase\Persistence\ObjectStorage<\NIMIUS\LocationManager\Domain\Model\Email>
     */
    protected $email;

    /**
     * @var string
     */
    protected $url;

    /**
     * @var \TYPO3\CMS\Extbase\Persistence\ObjectStorage<\NIMIUS\LocationManager\Domain\Model\Phone>
     */
    protected $phone;

    /**
     * @var \TYPO3\CMS\Extbase\Persistence\ObjectStorage<\NIMIUS\LocationManager\Domain\Model\Phone>
     */
    protected $fax;

    /**
     * @var float
     */
    protected $latitude;

    /**
     * @var float
     */
    protected $longitude;

    /**
     * @var \TYPO3\CMS\Extbase\Persistence\ObjectStorage<\NIMIUS\LocationManager\Domain\Model\Category>
     */
    protected $categories;

    /**
     * @var \TYPO3\CMS\Extbase\Persistence\ObjectStorage<\NIMIUS\LocationManager\Domain\Model\Category>
     */
    protected $filterCategories;

    /**
     * Location constructor:
     * Initializes empty ObjectStorages
     */
    public function __construct()
    {
        $this->filterCategories = new ObjectStorage();
        $this->categories = new ObjectStorage();
        $this->fax = new ObjectStorage();
        $this->phone = new ObjectStorage();
        $this->email = new ObjectStorage();
    }

    /**
     * @param int $sysLanguageUid
     * @return void
     */
    public function setSysLanguageUid($sysLanguageUid)
    {
        $this->_languageUid = $sysLanguageUid;
    }

    /**
     * @return int
     */
    public function getSysLanguageUid()
    {
        return $this->_languageUid;
    }

    /**
     * @param int $l10nParent
     * @return void
     */
    public function setL10nParent($l10nParent)
    {
        $this->l10nParent = $l10nParent;
    }

    /**
     * @return int
     */
    public function getL10nParent()
    {
        return $this->l10nParent;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     *
     * @return void
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * @param string $address
     * @return void
     */
    public function setAddress($address)
    {
        $this->address = $address;
    }

    /**
     * @return string
     */
    public function getZip()
    {
        return $this->zip;
    }

    /**
     * @param string $zip
     *
     * @return void
     */
    public function setZip($zip)
    {
        $this->zip = $zip;
    }

    /**
     * @return string
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * @param string $city
     * @return void
     */
    public function setCity($city)
    {
        $this->city = $city;
    }

    /**
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * @param string $url
     *
     * @return void
     */
    public function setUrl($url)
    {
        $this->url = $url;
    }

    /**
     * @return float
     */
    public function getLatitude()
    {
        return $this->latitude;
    }

    /**
     * @param string $latitude
     * @return void
     */
    public function setLatitude($latitude)
    {
        $this->latitude = $latitude;
    }

    /**
     * @return float
     */
    public function getLongitude()
    {
        return $this->longitude;
    }

    /**
     * @param string $longitude
     * @return void
     */
    public function setLongitude($longitude)
    {
        $this->longitude = $longitude;
    }

    /**
     * @return \TYPO3\CMS\Extbase\Persistence\ObjectStorage
     */
    public function getCategories()
    {
        return $this->categories;
    }

    /**
     * @param \TYPO3\CMS\Extbase\Persistence\ObjectStorage $categories
     */
    public function setCategories($categories)
    {
        $this->categories = $categories;
    }

    /**
     * @return \SJBR\StaticInfoTables\Domain\Model\Country
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * @param \SJBR\StaticInfoTables\Domain\Model\Country $country
     */
    public function setCountry($country)
    {
        $this->country = $country;
    }

    /**
     * @return ObjectStorage
     */
    public function getFax()
    {
        return $this->fax;
    }

    /**
     * @param ObjectStorage $fax
     */
    public function setFax($fax)
    {
        $this->fax = $fax;
    }

    /**
     * @return ObjectStorage
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * @param ObjectStorage $phone
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;
    }

    /**
     * @return ObjectStorage
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param ObjectStorage $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * @return ObjectStorage
     */
    public function getFilterCategories()
    {
        if ((bool)ConfigurationUtility::getExtensionConfiguration()['enableFilterCategories']) {
            return $this->filterCategories;
        }
        return $this->categories;
    }

    /**
     * @param ObjectStorage $filterCategories
     */
    public function setFilterCategories($filterCategories)
    {
        $this->filterCategories = $filterCategories;
    }

    /**
     * Returns the custom marker image of the first category that has one or null if there is none
     *
     * @return string|null
     */
    public function getMarkerImage()
    {
        foreach ($this->categories as $category) {
            /** @var Category $category */
            $marker = $category->getMarkerImage();
            if ($marker) {
                return $marker;
            }
        }

        return null;
    }

    /**
     * Returns a comma separated list containing the uids of the caterories for the filter
     * The categories are filterCategories, if the enableFilterCategories setting is enabled
     * and normal categories, if not.
     *
     * @return string
     */
    public function getCategoryUids()
    {
        $uids = [];
        foreach ($this->getFilterCategories() as $category) {
            $uids[] = $category->getUid();
        }
        return implode(',', $uids);
    }
}
