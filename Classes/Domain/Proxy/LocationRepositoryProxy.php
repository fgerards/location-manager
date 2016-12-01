<?php
namespace NIMIUS\LocationManager\Domain\Proxy;

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
 * Location repository proxy class.
 */
class LocationRepositoryProxy
{
    /**
     * @var int Storage page id.
     */
    protected $pid;

    /**
     * @var bool If true, arrays are used instead of extbase objects.
     */
    protected $returnRawQueryResults = false;

    /**
     * @param array $settings
     *
     * @return void
     */
    public function initializeFromSettings($settings)
    {
        foreach ($settings as $key => $value) {
            if (property_exists($this, $key)) {
                $this->{$key} = $value;
            }
        }
    }

    /**
     * @return mixed
     */
    public function getPid()
    {
        return $this->pid;
    }

    /**
     * @param int $pid
     *
     * @return void
     */
    public function setPid($pid)
    {
        $this->pid = $pid;
    }

    /**
     * @return bool
     */
    public function getReturnRawQueryResults()
    {
        return $this->returnRawQueryResults;
    }

    /**
     * @param bool $returnRawQueryResults
     *
     * @return void
     */
    public function setReturnRawQueryResults($returnRawQueryResults)
    {
        $this->returnRawQueryResults = $returnRawQueryResults;
    }
}
