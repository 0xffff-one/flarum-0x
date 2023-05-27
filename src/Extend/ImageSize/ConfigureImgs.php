<?php

namespace Flarum0x\Extend\ImageSize;

use s9e\TextFormatter\Configurator;

class ConfigureImgs {
    public function __invoke(Configurator $configurator)
    {
        $configurator->templateNormalizer->append(
            function (\DOMElement $template)
            {
                foreach ($template->getElementsByTagName('IMG') as $a)
                {
                    $a->setAttribute('width', "{@width}");
                    $a->setAttribute('height', "{@height}");
                }
                foreach ($template->getElementsByTagName('UPL-IMAGE-PREVIEW') as $a)
                {
                    $a->setAttribute('width', "{@width}");
                    $a->setAttribute('height', "{@height}");
                }
            }
        );
    }
}
