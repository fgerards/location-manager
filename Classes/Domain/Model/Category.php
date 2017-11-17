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
use NIMIUS\LocationManager\Utility\ObjectUtility;
use TYPO3\CMS\Extbase\Domain\Model\FileReference;
use TYPO3\CMS\Extbase\Persistence\ObjectStorage;
use TYPO3\CMS\Extbase\Service\ImageService;

/**
 * Category model.
 */
class Category extends \TYPO3\CMS\Extbase\Domain\Model\Category
{
    /**
     * @var \TYPO3\CMS\Extbase\Persistence\ObjectStorage<\TYPO3\CMS\Extbase\Domain\Model\FileReference>
     */
    protected $locationManagerImage;

    /**
     * Class constructor.
     */
    public function __construct()
    {
        $this->locationManagerImage = new ObjectStorage();
    }

    /**
     * @return ObjectStorage
     */
    public function getLocationManagerImage()
    {
        return $this->locationManagerImage;
    }

    /**
     * @param ObjectStorage $locationManagerImage
     */
    public function setLocationManagerImage($locationManagerImage)
    {
        $this->locationManagerImage = $locationManagerImage;
    }

    /**
     * Returns the path to the custom image set for the category. The image is resized
     * to 64x64 because that is roughly the size of the default google maps icon.
     * null is returned if no image was set.
     *
     * @return string
     */
    public function getMarkerImage()
    {
        $config = ConfigurationUtility::getExtensionConfiguration();
        if (!$config['categoryMarker']) {
            return null;
        }

        /** @var FileReference $image */
        if ($this->locationManagerImage) {
            $image = $this->locationManagerImage->toArray()[0];
        }
        if ($image) {
            /** @var ImageService $imageService */
            $imageService = ObjectUtility::get(ImageService::class);

            $processedFile = $imageService->applyProcessingInstructions($image->getOriginalResource(), [
                'width' => '64c',
                'height' => '64c',
                'minWidth' => null,
                'minHeight' => null,
                'maxWidth' => null,
                'maxHeight' => null,
                'crop' => null,
            ]);
            return $imageService->getImageUri($processedFile);
        }
        return null;
    }
}
