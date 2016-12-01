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

use NIMIUS\LocationManager\Domain\Model\Email;
use TYPO3\CMS\Extbase\Persistence\ObjectStorage;

/**
 * Unit test case for Email model.
 */
class EmailTest extends \NIMIUS\LocationManager\Tests\Backend\AbstractUnitTestCase
{
    /**
     * @var Email
     */
    protected $subject;

    /**
     * Test getter/setter for properties.
     *
     * @test
     */
    public function testSettersAndGettersForProperties()
    {
        $this->_testGetterAndSetterForProperty('name', 'John Doe');
        $this->_testGetterAndSetterForProperty('email', 'foo@bar.com');
    }

    /**
     * Set up the test case.
     */
    protected function setUp()
    {
        $this->subject = new Email;
    }
}
