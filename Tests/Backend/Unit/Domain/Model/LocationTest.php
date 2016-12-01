<?php
namespace NIMIUS\LocationManager\Tests\Backend\Unit\Domain\Model;

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

// Manually requiring custom class as it is not autoloaded in the bootstrap process.
require_once __DIR__ . '/../../../AbstractUnitTestCase.php';

use NIMIUS\LocationManager\Domain\Model\Country;
use NIMIUS\LocationManager\Domain\Model\Location;
use TYPO3\CMS\Extbase\Persistence\ObjectStorage;

/**
 * Unit test case for Location model.
 */
class LocationTest extends \NIMIUS\LocationManager\Tests\Backend\AbstractUnitTestCase
{
    /**
     * @var Location
     */
    protected $subject;

    /**
     * Test getter/setter for properties.
     *
     * @test
     */
    public function testSettersAndGettersForProperties()
    {
        $this->_testGetterAndSetterForProperty('name', 'Store X');
        $this->_testGetterAndSetterForProperty('address', 'Somehwere 4');
        $this->_testGetterAndSetterForProperty('zip', 9000);
        $this->_testGetterAndSetterForProperty('zip', 'K1A0B1');
        $this->_testGetterAndSetterForProperty('city', 'Test city');
        $this->_testGetterAndSetterForProperty('country', (new Country));
        $this->_testGetterAndSetterForProperty('email', (new ObjectStorage));
        $this->_testGetterAndSetterForProperty('phone', (new ObjectStorage));
        $this->_testGetterAndSetterForProperty('fax', (new ObjectStorage));
        $this->_testGetterAndSetterForProperty('categories', (new ObjectStorage));
        $this->_testGetterAndSetterForProperty('filterCategories', (new ObjectStorage));
        $this->_testGetterAndSetterForProperty('url', 'http://www.example.com');
        $this->_testGetterAndSetterForProperty('sysLanguageUid', 1);
        $this->_testGetterAndSetterForProperty('l10nParent', 4);
        
    }

    /**
     * Set up the test case.
     */
    protected function setUp()
    {
        $this->subject = new Location;
    }
}
