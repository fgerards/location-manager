<?php
namespace NIMIUS\LocationManager\ViewHelper\Format;

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

use TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper;

/**
 * JSON encodes an array or object.
 *
 * Can be useful to transfer data between PHP and frontend Javascript.
 *
 * The input object that should be encoded can be specified using either the parameter
 * 'input' or passing it as child content
 *
 * @example
 * <script>
 *  new LocationManager(JSON.parse('<n:format.json>{}</n:format.json>'));
 * <script>
 */
class JsonViewHelper extends AbstractViewHelper
{
    /**
     * @param array $input
     * @return string
     */
    public function render($input = null)
    {
        if ($input === null) {
            $input = $this->renderChildren();
        }
        return json_encode($input);
    }
}
